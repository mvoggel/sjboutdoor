"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import {
  BEAM,
  BLADE,
  POST,
  TRIM,
  frameColorById,
  lightColorById,
  screenColorById,
} from "./config";
import { getWoodTexture } from "./textures";
import type { FrameColor, PergolaConfig, ScreenSide } from "./types";

// Blender-authored detail props (geometry only — R3F applies the live frame
// material so color still swaps). Respect basePath for the static export.
const BASE = process.env.NODE_ENV === "production" ? "/sjboutdoor" : "";
const PROPS_URL = `${BASE}/experiments/pergola-builder/props/props.glb`;
useGLTF.preload(PROPS_URL);

/**
 * Fully procedural louvered-pergola mesh. Dimensions, bay count, blade count,
 * blade angle, screens, lights, and colors are all derived from `config` at
 * render time — nothing is baked, so it updates live.
 *
 * World units = feet. Origin centered on the footprint at ground level.
 * Multi-zone: the louvered roof repeats `bays` times along X, sharing posts.
 */
export function PergolaModel({ config }: { config: PergolaConfig }) {
  const {
    widthFt: bayW,
    depthFt: D,
    postHeightFt: H,
    bays,
    mount,
    bladeAngleDeg,
    screens,
    lightsOn,
  } = config;

  const frame = frameColorById(config.frameColorId);
  const screenColor = screenColorById(config.screenColorId);
  const lightColor = lightColorById(config.lightColorId);
  const woodTex = frame.id === "wood-grain" ? getWoodTexture() : null;

  // Blender detail-prop geometry
  const { nodes } = useGLTF(PROPS_URL);
  const baseGeo = (nodes.BasePlate as THREE.Mesh | undefined)?.geometry;
  const capGeo = (nodes.PostCap as THREE.Mesh | undefined)?.geometry;

  const post = POST.sizeFt;
  const beamH = BEAM.depthFt;
  const beamT = BEAM.thicknessFt;
  const topY = H;
  const ringY = topY + beamH / 2;

  const nBays = Math.max(1, Math.round(bays));
  const totalW = bayW * nBays;
  const hw = totalW / 2;
  const hd = D / 2;

  // Column gridlines (post + cross-beam lines), inset outer ones so nothing
  // overhangs the footprint.
  const columnLines = useMemo(
    () => Array.from({ length: nBays + 1 }, (_, i) => -hw + i * bayW),
    [nBays, hw, bayW],
  );
  const postX = columnLines.map((x, i) =>
    i === 0 ? x + post / 2 : i === nBays ? x - post / 2 : x,
  );
  const crossBeamX = columnLines.map((x, i) =>
    i === 0 ? x + beamT / 2 : i === nBays ? x - beamT / 2 : x,
  );
  const postRows = mount === "wall" ? [hd - post / 2] : [hd - post / 2, -hd + post / 2];

  // Blade array along depth (shared count across all bays).
  const blades = useMemo(() => {
    const pitch = BLADE.widthFt + BLADE.gapFt;
    const usableD = D - beamT * 2;
    const count = Math.max(1, Math.floor(usableD / pitch));
    const span = (count - 1) * pitch;
    const start = -span / 2;
    const y = topY + beamH / 2;
    return {
      count,
      y,
      positions: Array.from({ length: count }, (_, i) => start + i * pitch),
    };
  }, [D, beamT, topY, beamH]);

  const bladeRot = THREE.MathUtils.degToRad(bladeAngleDeg);
  const bladeLength = bayW - beamT * 2;
  const bayCenters = Array.from(
    { length: nBays },
    (_, b) => -hw + (b + 0.5) * bayW,
  );

  // Recessed downlights along front & back beams (scaled to total width).
  const recessedX = useMemo(() => {
    const n = Math.max(2, Math.round(totalW / 4));
    const innerW = totalW - beamT * 2;
    return Array.from(
      { length: n },
      (_, i) => -innerW / 2 + (innerW * (i + 0.5)) / n,
    );
  }, [totalW, beamT]);

  const mat = (key: string) => (
    <FrameMaterial key={key} frame={frame} woodTex={woodTex} />
  );

  const allPosts: [number, number][] = postX.flatMap((x) =>
    postRows.map((z) => [x, z] as [number, number]),
  );

  const activeScreens = (Object.keys(screens) as ScreenSide[]).filter(
    (s) => screens[s],
  );

  return (
    <group>
      {/* ── Posts ─────────────────────────────────────────────────────── */}
      {allPosts.map(([x, z], i) => (
        <mesh key={`post-${i}`} position={[x, H / 2, z]} castShadow>
          <boxGeometry args={[post, H, post]} />
          {mat(`post-m-${i}`)}
        </mesh>
      ))}

      {/* ── Front/back beams (span full width) ─────────────────────────── */}
      {[hd - beamT / 2, -hd + beamT / 2].map((z, i) => (
        <mesh key={`beam-x-${i}`} position={[0, ringY, z]} castShadow>
          <boxGeometry args={[totalW, beamH, beamT]} />
          {mat(`beam-x-m-${i}`)}
        </mesh>
      ))}
      {/* ── Cross beams along Z at every column (incl. shared interior) ─── */}
      {crossBeamX.map((x, i) => (
        <mesh key={`beam-z-${i}`} position={[x, ringY, 0]} castShadow>
          <boxGeometry args={[beamT, beamH, D]} />
          {mat(`beam-z-m-${i}`)}
        </mesh>
      ))}

      {/* ── Louver blades, per bay ────────────────────────────────────── */}
      {bayCenters.map((cx, b) =>
        blades.positions.map((z, i) => (
          <mesh
            key={`blade-${b}-${i}`}
            position={[cx, blades.y, z]}
            rotation={[bladeRot, 0, 0]}
            castShadow
          >
            <boxGeometry args={[bladeLength, BLADE.thicknessFt, BLADE.widthFt]} />
            {mat(`blade-m-${b}-${i}`)}
          </mesh>
        )),
      )}

      {/* ── Base plate covers (Blender glTF prop, instanced per post) ──── */}
      {allPosts.map(([x, z], i) =>
        baseGeo ? (
          <mesh key={`base-${i}`} geometry={baseGeo} position={[x, 0.11, z]} castShadow>
            {mat(`base-m-${i}`)}
          </mesh>
        ) : (
          // Fallback box if the prop hasn't loaded
          <mesh key={`base-${i}`} position={[x, TRIM.basePlateHeightFt / 2, z]}>
            <boxGeometry
              args={[TRIM.basePlateFt, TRIM.basePlateHeightFt, TRIM.basePlateFt]}
            />
            {mat(`base-m-${i}`)}
          </mesh>
        ),
      )}

      {/* ── Post capitals (Blender glTF prop) — flared post-to-beam cap ── */}
      {capGeo &&
        allPosts.map(([x, z], i) => (
          <mesh
            key={`cap-${i}`}
            geometry={capGeo}
            position={[x, topY - 0.09, z]}
            castShadow
          >
            {mat(`cap-m-${i}`)}
          </mesh>
        ))}

      {/* ── Cornice lip around the outer top ──────────────────────────── */}
      {(() => {
        const cy = topY + beamH + TRIM.corniceHeightFt / 2;
        const ot = beamT + TRIM.corniceOverhangFt;
        const ow = totalW + TRIM.corniceOverhangFt * 2;
        const od = D + TRIM.corniceOverhangFt * 2;
        return (
          <group key="cornice">
            {[od / 2 - ot / 2, -od / 2 + ot / 2].map((z, i) => (
              <mesh key={`cx-${i}`} position={[0, cy, z]}>
                <boxGeometry args={[ow, TRIM.corniceHeightFt, ot]} />
                {mat(`cx-m-${i}`)}
              </mesh>
            ))}
            {[ow / 2 - ot / 2, -ow / 2 + ot / 2].map((x, i) => (
              <mesh key={`cz-${i}`} position={[x, cy, 0]}>
                <boxGeometry args={[ot, TRIM.corniceHeightFt, od]} />
                {mat(`cz-m-${i}`)}
              </mesh>
            ))}
          </group>
        );
      })()}

      {/* ── Lighting: perimeter LED ramp + recessed downlights ────────── */}
      {lightsOn && (
        <group>
          {[hd - beamT - 0.03, -hd + beamT + 0.03].map((z, i) => (
            <mesh key={`led-x-${i}`} position={[0, topY + 0.05, z]}>
              <boxGeometry args={[totalW - beamT * 2, 0.03, 0.06]} />
              <Emissive color={lightColor.hex} />
            </mesh>
          ))}
          {[hw - beamT - 0.03, -hw + beamT + 0.03].map((x, i) => (
            <mesh key={`led-z-${i}`} position={[x, topY + 0.05, 0]}>
              <boxGeometry args={[0.06, 0.03, D - beamT * 2]} />
              <Emissive color={lightColor.hex} />
            </mesh>
          ))}
          {recessedX.flatMap((x) =>
            [hd - beamT * 0.5, -hd + beamT * 0.5].map((z, j) => (
              <mesh key={`puck-${x.toFixed(2)}-${j}`} position={[x, topY + 0.02, z]}>
                <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
                <Emissive color={lightColor.hex} />
              </mesh>
            )),
          )}
          <pointLight
            position={[0, topY - 0.5, 0]}
            color={lightColor.hex}
            intensity={totalW * D * 0.04}
            distance={Math.max(totalW, D) * 1.8}
            decay={2}
          />
        </group>
      )}

      {/* ── Privacy screens (outer perimeter) ─────────────────────────── */}
      {activeScreens.map((side) => (
        <Screen
          key={`screen-${side}`}
          side={side}
          W={totalW}
          D={D}
          H={H}
          inset={post}
          color={screenColor.hex}
          opacity={screenColor.opacity}
        />
      ))}

      {/* ── Wall + mounted TV centerpiece (wall-mount only) ───────────── */}
      {mount === "wall" && (
        <>
          <mesh position={[0, (H + beamH + 2) / 2, -hd - 0.05]} receiveShadow>
            <boxGeometry args={[totalW + 4, H + beamH + 2, 0.4]} />
            <meshStandardMaterial color="#d8d2c7" roughness={0.95} />
          </mesh>
          <WallTv wallZ={-hd - 0.05 + 0.2} y={H * 0.62} />
        </>
      )}
    </group>
  );
}

// ── Mounted outdoor TV ──────────────────────────────────────────────────────
function WallTv({ wallZ, y }: { wallZ: number; y: number }) {
  const w = 6.3; // ~75" outdoor TV — the centerpiece
  const h = 3.7;
  return (
    <group position={[0, y, wallZ + 0.05]}>
      {/* Bezel */}
      <mesh castShadow>
        <boxGeometry args={[w, h, 0.08]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.35} metalness={0.4} />
      </mesh>
      {/* Screen — glowing so it clearly reads as "on" */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[w - 0.2, h - 0.2]} />
        <meshStandardMaterial
          color="#1a3a63"
          emissive="#2f6db5"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {/* Soft screen light spill onto the wall */}
      <pointLight position={[0, 0, 1.2]} color="#3f7fd0" intensity={6} distance={9} decay={2} />
    </group>
  );
}

function Emissive({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={2.4}
      toneMapped={false}
    />
  );
}

function FrameMaterial({
  frame,
  woodTex,
}: {
  frame: FrameColor;
  woodTex: THREE.Texture | null;
}) {
  if (woodTex) {
    return (
      <meshPhysicalMaterial
        map={woodTex}
        roughness={0.7}
        metalness={0}
        clearcoat={0.15}
        clearcoatRoughness={0.5}
        envMapIntensity={0.6}
      />
    );
  }
  return (
    <meshPhysicalMaterial
      color={frame.hex}
      metalness={frame.metalness}
      roughness={frame.roughness}
      clearcoat={0.3}
      clearcoatRoughness={0.4}
      envMapIntensity={0.9}
    />
  );
}

function Screen({
  side,
  W,
  D,
  H,
  inset,
  color,
  opacity,
}: {
  side: ScreenSide;
  W: number;
  D: number;
  H: number;
  inset: number;
  color: string;
  opacity: number;
}) {
  const t = 0.04;
  const h = H - 0.1;
  const y = h / 2;
  const hw = W / 2 - inset / 2;
  const hd = D / 2 - inset / 2;

  let position: [number, number, number];
  let args: [number, number, number];
  if (side === "front" || side === "back") {
    const z = side === "front" ? hd : -hd;
    position = [0, y, z];
    args = [W - inset, h, t];
  } else {
    const x = side === "right" ? hw : -hw;
    position = [x, y, 0];
    args = [t, h, D - inset];
  }

  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
