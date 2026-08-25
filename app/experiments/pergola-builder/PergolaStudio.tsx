"use client";

import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ControlsPanel } from "./ControlsPanel";
import { PergolaModel } from "./PergolaModel";
import {
  DEFAULT_CONFIG,
  frameColorById,
  screenColorById,
  lightColorById,
} from "./config";
import type { PergolaConfig, ScreenSide } from "./types";
import { DesignBridge } from "../_shared/DesignBridge";
import { useDrawerScrollBridge } from "../_shared/useDrawerScrollBridge";
import type { DesignSummaryRow } from "@/lib/design-bridge";

const SCREEN_SIDES: ScreenSide[] = ["front", "back", "left", "right"];

/** Resolve the current config into human-readable spec rows for the PDF. */
function buildPergolaSummary(config: PergolaConfig): DesignSummaryRow[] {
  const frame = frameColorById(config.frameColorId);
  const enabledSides = SCREEN_SIDES.filter((s) => config.screens[s]);
  const screensValue = enabledSides.length
    ? `${enabledSides.map((s) => s[0].toUpperCase() + s.slice(1)).join(", ")} — ${screenColorById(config.screenColorId).name}`
    : "None";
  const span =
    config.bays > 1
      ? `${config.widthFt} ft × ${config.depthFt} ft (${config.bays} bays, ${config.widthFt * config.bays} ft total span)`
      : `${config.widthFt} ft × ${config.depthFt} ft`;
  return [
    { label: "Size", value: span },
    { label: "Post height", value: `${config.postHeightFt} ft` },
    { label: "Mount", value: config.mount === "wall" ? "Wall-attached" : "Freestanding" },
    { label: "Frame color", value: frame.name },
    { label: "Blade angle", value: `${config.bladeAngleDeg}°` },
    { label: "Screens", value: screensValue },
    {
      label: "Lights",
      value: config.lightsOn
        ? `Integrated — ${lightColorById(config.lightColorId).name}`
        : "Not included",
    },
  ];
}

export default function PergolaStudio() {
  const [config, setConfig] = useState<PergolaConfig>(DEFAULT_CONFIG);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const drawerBridge = useDrawerScrollBridge();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 860);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const update = useCallback(
    <K extends keyof PergolaConfig>(key: K, value: PergolaConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <div style={{ ...wrap, flexDirection: isMobile ? "column" : "row" }}>
      <div style={stage}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
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
            <DesignBridge
              product="louvered-pergolas"
              title="Louvered Pergola"
              getSummary={() => buildPergolaSummary(config)}
              getConfig={() => config}
            />
          </Suspense>
        </Canvas>
        <div style={hint}>Drag to orbit · scroll to zoom</div>
      </div>

      {/* Controls — side panel on desktop, collapsible bottom drawer on mobile */}
      {isMobile ? (
        <div
          ref={drawerBridge.ref}
          onTouchStart={drawerBridge.onTouchStart}
          onTouchMove={drawerBridge.onTouchMove}
          onTouchEnd={drawerBridge.onTouchEnd}
          style={{ ...drawer, maxHeight: drawerOpen ? "52vh" : 46 }}
        >
          <button style={drawerHandle} onClick={() => setDrawerOpen((o) => !o)}>
            <span style={handleBar} />
            {drawerOpen ? "Hide options" : "Customize"}
          </button>
          {drawerOpen && (
            <ControlsPanel config={config} update={update} embedded />
          )}
        </div>
      ) : (
        <ControlsPanel config={config} update={update} />
      )}
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

// Mobile bottom drawer (mirrors the awning builder)
const drawer: React.CSSProperties = {
  background: "#16181c",
  overflowY: "auto",
  overscrollBehavior: "contain",
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
  fontWeight: 650,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  zIndex: 2,
};

const handleBar: React.CSSProperties = {
  width: 38,
  height: 4,
  borderRadius: 2,
  background: "#ffffff33",
};
