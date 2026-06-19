"use client";

import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { ControlsPanel } from "./ControlsPanel";
import { AwningModel } from "./AwningModel";
import { DEFAULT_CONFIG, HW, fabricById, finishById, VALANCES } from "./config";
import type { AwningConfig, AwningView } from "./types";
import { DesignBridge } from "../_shared/DesignBridge";
import type { DesignSummaryRow } from "@/lib/design-bridge";

/** Resolve the current config into human-readable spec rows for the PDF. */
function buildAwningSummary(config: AwningConfig): DesignSummaryRow[] {
  const fabric = fabricById(config.fabricId);
  const finish = finishById(config.frameFinishId);
  const valance = VALANCES.find((v) => v.id === config.valance)?.name ?? config.valance;
  return [
    { label: "Fabric", value: `${fabric.name} (${fabric.sku})` },
    { label: "Frame finish", value: finish.name },
    { label: "Width", value: `${config.widthFt} ft` },
    { label: "Projection", value: `${config.projectionFt} ft` },
    { label: "Valance", value: valance },
    { label: "Arm lights", value: config.lightsOn ? "Integrated LED — included" : "Not included" },
  ];
}

export default function AwningStudio() {
  const [config, setConfig] = useState<AwningConfig>(DEFAULT_CONFIG);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 860);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const update = useCallback(
    <K extends keyof AwningConfig>(key: K, value: AwningConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <div style={{ ...wrap, flexDirection: isMobile ? "column" : "row" }}>
      <div style={stage}>
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 2]}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ position: [9, 10, 18], fov: 42 }}
        >
          <color attach="background" args={["#cdd7e2"]} />
          <Suspense fallback={null}>
            <hemisphereLight args={["#eaf1ff", "#b9ad97", 0.7]} />
            <directionalLight
              position={[10, 18, 12]}
              intensity={2.6}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-26}
              shadow-camera-right={26}
              shadow-camera-top={26}
              shadow-camera-bottom={-26}
              shadow-camera-far={90}
            />

            <AwningModel config={config} />

            {/* House wall the awning mounts to */}
            <mesh position={[0, 11, -0.05]} receiveShadow>
              <planeGeometry args={[Math.max(config.widthFt * 2, 46), 24]} />
              <meshStandardMaterial color="#dcd5c8" roughness={0.95} />
            </mesh>
            {/* Ground / patio */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 6]} receiveShadow>
              <planeGeometry args={[120, 120]} />
              <meshStandardMaterial color="#b9b3a8" roughness={1} />
            </mesh>
            <ContactShadows
              position={[0, 0.02, 4]}
              opacity={0.4}
              scale={60}
              blur={2.4}
              far={26}
            />

            <Environment preset="park" environmentIntensity={0.85} />
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={6}
              maxDistance={70}
              maxPolarAngle={Math.PI / 2.02}
              target={[0, 4.5, 2]}
            />
            <CameraRig config={config} />
            <DesignBridge
              product="retractable-awnings"
              title="Retractable Awning"
              getSummary={() => buildAwningSummary(config)}
            />
          </Suspense>
        </Canvas>

        {/* Floating quick controls: view + extend/retract */}
        <div style={topBar}>
          <Segmented<AwningView>
            value={config.view}
            options={[
              { value: "outside", label: "Outside" },
              { value: "inside", label: "Inside" },
            ]}
            onChange={(v) => update("view", v)}
          />
          <button
            style={extendBtn}
            onClick={() => update("open", config.open > 0.5 ? 0 : 1)}
          >
            {config.open > 0.5 ? "↩ Retract" : "↪ Extend"}
          </button>
        </div>
        <div style={hint}>Drag to orbit · scroll to zoom</div>
      </div>

      {/* Controls — side panel on desktop, bottom drawer on mobile */}
      {isMobile ? (
        <div style={{ ...drawer, maxHeight: drawerOpen ? "52vh" : 46 }}>
          <button style={drawerHandle} onClick={() => setDrawerOpen((o) => !o)}>
            <span style={handleBar} />
            {drawerOpen ? "Hide options" : "Customize"}
          </button>
          {drawerOpen && <ControlsPanel config={config} update={update} embedded />}
        </div>
      ) : (
        <ControlsPanel config={config} update={update} />
      )}
    </div>
  );
}

/** Snaps the camera to an Outside / Inside preset when the view toggles. */
function CameraRig({ config }: { config: AwningConfig }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as
    | { target: THREE.Vector3; update: () => void }
    | null;
  const lastView = useRef<AwningView | null>(null);

  useEffect(() => {
    if (!controls) return;
    if (lastView.current === config.view) return;
    lastView.current = config.view;

    const W = config.widthFt;
    const P = config.projectionFt;
    const mY = HW.mountHeightFt;

    if (config.view === "outside") {
      camera.position.set(W * 0.5 + 4, mY * 1.18, P + W * 0.5 + 6);
      controls.target.set(0, mY * 0.5, P * 0.35);
    } else {
      // Sitting underneath, looking up & out toward the yard.
      camera.position.set(W * 0.05, 3.6, 0.6);
      controls.target.set(0, mY * 0.8, P + 12);
    }
    controls.update();
  }, [config.view, config.widthFt, config.projectionFt, camera, controls]);

  return null;
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div style={seg.wrap}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{ ...seg.btn, ...(o.value === value ? seg.btnOn : null) }}
        >
          {o.label}
        </button>
      ))}
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
  minHeight: 0,
};

const topBar: React.CSSProperties = {
  position: "absolute",
  top: 14,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 8,
  alignItems: "center",
};

const extendBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "#16181cdd",
  color: "#fff",
  border: "1px solid #ffffff2a",
  borderRadius: 9,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  backdropFilter: "blur(6px)",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
};

const hint: React.CSSProperties = {
  position: "absolute",
  bottom: 12,
  left: 14,
  fontSize: 11,
  color: "#1f2a37cc",
  background: "#ffffff66",
  padding: "4px 9px",
  borderRadius: 6,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  pointerEvents: "none",
};

const drawer: React.CSSProperties = {
  background: "#16181c",
  overflowY: "auto",
  transition: "max-height .25s ease",
  borderTop: "1px solid #ffffff1a",
};

const drawerHandle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  background: "#16181c",
  color: "#cfcabf",
  border: "none",
  padding: "9px 0 8px",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  zIndex: 2,
};

const handleBar: React.CSSProperties = {
  width: 38,
  height: 4,
  borderRadius: 2,
  background: "#ffffff33",
};

const seg = {
  wrap: {
    display: "flex",
    background: "#16181cdd",
    borderRadius: 9,
    padding: 3,
    gap: 3,
    backdropFilter: "blur(6px)",
    border: "1px solid #ffffff2a",
  } as React.CSSProperties,
  btn: {
    padding: "7px 14px",
    background: "transparent",
    color: "#cfcabf",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  } as React.CSSProperties,
  btnOn: { background: "#c9a35a", color: "#1b1206" } as React.CSSProperties,
};
