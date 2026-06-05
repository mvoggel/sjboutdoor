"use client";

import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useCallback, useState } from "react";
import { ControlsPanel } from "./ControlsPanel";
import { PergolaModel } from "./PergolaModel";
import { DEFAULT_CONFIG } from "./config";
import type { PergolaConfig } from "./types";

export default function PergolaStudio() {
  const [config, setConfig] = useState<PergolaConfig>(DEFAULT_CONFIG);

  const update = useCallback(
    <K extends keyof PergolaConfig>(key: K, value: PergolaConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <div style={wrap}>
      <div style={stage}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [20, 14, 24], fov: 42 }}
        >
          <Suspense fallback={null}>
            <hemisphereLight args={["#dfe7ff", "#b8a98f", 0.6]} />
            <directionalLight
              position={[14, 20, 8]}
              intensity={2.4}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-22}
              shadow-camera-right={22}
              shadow-camera-top={22}
              shadow-camera-bottom={-22}
              shadow-camera-far={70}
            />
            {/* Auto-frames when the footprint changes (size/bays/mount),
                but not on color/light/tilt — those don't change the bbox. */}
            <Bounds fit observe margin={1.15}>
              <PergolaModel config={config} />
            </Bounds>

            {/* Ground + soft contact shadow */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
              receiveShadow
            >
              <planeGeometry args={[120, 120]} />
              <meshStandardMaterial color="#c8c4bc" roughness={1} />
            </mesh>
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={0.45}
              scale={50}
              blur={2.2}
              far={20}
            />

            {/* Outdoor backyard backdrop + realistic reflections.
                Swap preset (park/forest/sunset) or a custom HDRI later. */}
            <Environment
              preset="park"
              background
              backgroundBlurriness={0.55}
              environmentIntensity={1}
            />
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={6}
              maxDistance={80}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Suspense>
        </Canvas>
        <div style={hint}>Drag to orbit · scroll to zoom</div>
      </div>

      <ControlsPanel config={config} update={update} />
    </div>
  );
}

const wrap: React.CSSProperties = {
  display: "flex",
  width: "100%",
  height: "100%",
  minHeight: 0,
  background: "#0e0f12",
};

const stage: React.CSSProperties = {
  position: "relative",
  flex: 1,
  minWidth: 0,
  // Soft studio backdrop — swap for a photo/gradient or make user-adjustable.
  background:
    "radial-gradient(120% 100% at 50% 0%, #d9dee6 0%, #aeb4bd 45%, #7f8893 100%)",
};

const hint: React.CSSProperties = {
  position: "absolute",
  bottom: 12,
  left: 14,
  fontSize: 11,
  color: "#ffffffcc",
  background: "#00000040",
  padding: "4px 9px",
  borderRadius: 6,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  pointerEvents: "none",
};
