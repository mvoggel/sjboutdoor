"use client";

import { useMemo, useReducer, useRef } from "react";
import * as THREE from "three";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  HW,
  armCountFor,
  fabricById,
  fabricTextureUrl,
  finishById,
} from "./config";
import type { AwningConfig } from "./types";

// Downward bow of the canvas per foot of projection. Shared by the fabric panel
// and the arm placement so the arm always rides just under the (sagging) canvas.
const FABRIC_SAG = 0.06;

/**
 * Fully procedural SunPro-style TRADITIONAL (folding-arm) retractable awning.
 * World units = feet. The house wall is the X-Y plane at z=0; the awning
 * projects toward +z (the yard). Everything — width, projection, open amount,
 * fabric, finish, valance, lights — is derived from `config` at render time, so
 * it all updates live. The open/close motion is eased every frame.
 *
 * Geometry is procedural (so it can be parametric + animated); the detailed
 * hardware can later be swapped for a Blender-authored glTF prop, mirroring the
 * pergola builder. Reference: SunPro cassette / folding arm / front-bar photos.
 */
export function AwningModel({ config }: { config: AwningConfig }) {
  const fabric = fabricById(config.fabricId);
  const finish = finishById(config.frameFinishId);

  // ── Eased open/close ───────────────────────────────────────────────────────
  const openRef = useRef(config.open);
  const [, force] = useReducer((x) => x + 1, 0);
  useFrame((_, delta) => {
    const target = config.open;
    const cur = openRef.current;
    const d = target - cur;
    if (Math.abs(d) > 0.0015) {
      openRef.current = cur + d * Math.min(1, delta * 7);
      force();
    } else if (cur !== target) {
      openRef.current = target;
      force();
    }
  });
  const open = openRef.current;

  // ── Derived dimensions ──────────────────────────────────────────────────────
  const W = config.widthFt;
  const P = config.projectionFt;
  const reach = Math.max(0.05, P * open);
  const drop = reach * HW.pitchRatio;
  const mountY = HW.mountHeightFt;
  const frontBarY = mountY - drop;
  const frontZ = reach;

  // ── Fabric texture ──────────────────────────────────────────────────────────
  const tex = useTexture(fabricTextureUrl(fabric.id));
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    // Keep stripes a realistic ~2.5ft repeat across the width; tile down length.
    tex.repeat.set(Math.max(1, Math.round(W / 2.5)), Math.max(1, Math.round(P / 2.5)));
    tex.needsUpdate = true;
    return tex;
  }, [tex, W, P]);

  const fabricMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.86,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
    [tex],
  );

  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(finish.hex),
        metalness: finish.metalness,
        roughness: finish.roughness,
      }),
    [finish.hex, finish.metalness, finish.roughness],
  );

  // ── Fabric panel geometry (cassette roller → front bar, gentle sag) ─────────
  const fabricGeo = useMemo(() => {
    const nx = 28;
    const ny = 18;
    const backY = mountY + 0.02;
    const backZ = HW.cassetteD; // emerges from cassette front face
    const frontY = frontBarY + HW.frontBar * 0.35;
    const sag = FABRIC_SAG * reach; // shallow downward bow along the projection
    const g = new THREE.PlaneGeometry(1, 1, nx, ny);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) + 0.5; // 0..1 across width
      const v = pos.getY(i) + 0.5; // 0..1 along projection (0=back,1=front)
      const x = (u - 0.5) * W;
      const y = backY + (frontY - backY) * v - sag * Math.sin(Math.PI * v);
      const z = backZ + (frontZ - backZ) * v;
      pos.setXYZ(i, x, y, z);
    }
    g.computeVertexNormals();
    return g;
  }, [W, reach, frontZ, frontBarY, mountY]);

  // ── Valance geometry (hangs from front bar; straight or scalloped hem) ──────
  const valanceGeo = useMemo(() => {
    const nx = 96;
    const topY = frontBarY + HW.frontBar * 0.1;
    const botBase = topY - HW.valanceDrop;
    const z = frontZ + HW.frontBar * 0.5;
    const g = new THREE.PlaneGeometry(1, 1, nx, 1);
    const pos = g.attributes.position;
    const freq = Math.max(2, Math.round(HW.waveCount * W));
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) + 0.5;
      const top = pos.getY(i) > 0;
      const x = (u - 0.5) * W;
      let y = topY;
      if (!top) {
        const scallop =
          config.valance === "wave"
            ? HW.waveAmp * (0.5 - 0.5 * Math.cos(2 * Math.PI * freq * u))
            : 0;
        y = botBase + scallop;
      }
      pos.setXYZ(i, x, y, z);
    }
    g.computeVertexNormals();
    return g;
  }, [W, frontBarY, frontZ, config.valance]);

  // ── Folding arms ────────────────────────────────────────────────────────────
  // A real lateral folding arm runs just UNDER the fabric from the cassette out
  // to the front bar, with a gentle downward bow and a hinged elbow, and folds
  // INWARD beneath the fabric as it retracts (never drooping into a deep side V).
  //
  // Critically, the canvas SAGS between the cassette and front bar, so we can't
  // just draw a straight chord — at long projections (10–12') the sag dips below
  // a straight arm and the arm pokes up through the canvas. Instead we sample the
  // fabric underside and ride a fixed clearance BELOW it, with extra drop at the
  // elbow so the two straight segments also stay clear of the sag. Result: the
  // arm is always underneath (gently pushing up on) the canvas at every size.
  const arms = useMemo(() => {
    const n = armCountFor(W);
    const inset = 1.2;
    const span = W - inset * 2;
    const xs =
      n === 1
        ? [0]
        : Array.from({ length: n }, (_, i) => -span / 2 + (span * i) / (n - 1));

    // Fabric underside reference (mirrors the fabric panel geometry above).
    const backY = mountY + 0.02;
    const backZ = HW.cassetteD;
    const frontY = frontBarY + HW.frontBar * 0.35;
    const sag = FABRIC_SAG * reach;
    const fabY = (v: number) =>
      backY + (frontY - backY) * v - sag * Math.sin(Math.PI * v);
    const fabZ = (v: number) => backZ + (frontZ - backZ) * v;

    const clr = 0.14; // how far the arm rides beneath the canvas
    const vS = 0.04;
    const vE = 0.5;
    const vW = 0.96;

    return xs.map((ax) => {
      const S = new THREE.Vector3(ax, fabY(vS) - clr, fabZ(vS));
      const Wp = new THREE.Vector3(ax, fabY(vW) - clr, fabZ(vW));
      // Extra elbow drop keeps both straight segments below the sagging canvas.
      const E = new THREE.Vector3(
        ax,
        fabY(vE) - clr - (sag * 0.5 + 0.1),
        fabZ(vE),
      );
      return { ax, S, E, W: Wp };
    });
  }, [W, frontZ, frontBarY, mountY, reach]);

  const ledMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fff2da",
        emissive: new THREE.Color("#ffd9a0"),
        emissiveIntensity: config.lightsOn ? 1.5 + config.brightness * 2.5 : 0,
        toneMapped: false,
      }),
    [config.lightsOn, config.brightness],
  );

  return (
    <group>
      {/* ── Wall mounting plate + brackets ─────────────────────────────────── */}
      <RoundedBox
        args={[W + 0.5, HW.cassetteH * 0.7, 0.12]}
        radius={0.04}
        smoothness={3}
        position={[0, mountY, 0.06]}
        castShadow
      >
        <primitive object={metalMat} attach="material" />
      </RoundedBox>

      {/* ── Cassette housing + rounded end caps ────────────────────────────── */}
      <RoundedBox
        args={[W + 0.3, HW.cassetteH, HW.cassetteD]}
        radius={HW.cassetteH * 0.28}
        smoothness={4}
        position={[0, mountY, HW.cassetteD * 0.5 + 0.04]}
        castShadow
      >
        <primitive object={metalMat} attach="material" />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <RoundedBox
          key={s}
          args={[0.16, HW.cassetteH * 1.04, HW.cassetteD * 1.04]}
          radius={HW.cassetteH * 0.3}
          smoothness={4}
          position={[s * (W / 2 + 0.18), mountY, HW.cassetteD * 0.5 + 0.04]}
          castShadow
        >
          <primitive object={metalMat} attach="material" />
        </RoundedBox>
      ))}

      {/* ── Folding arms (upper arm + forearm) + elbow + LED strips ─────────── */}
      {arms.map((arm, i) => (
        <group key={i}>
          <Strut a={arm.S} b={arm.E} thick={HW.armThick} mat={metalMat} />
          <Strut a={arm.E} b={arm.W} thick={HW.armThick} mat={metalMat} />
          {/* elbow joint */}
          <mesh position={arm.E} castShadow>
            <sphereGeometry args={[HW.armThick * 0.7, 16, 12]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          {/* shoulder pivot */}
          <mesh position={arm.S} castShadow>
            <cylinderGeometry args={[HW.armThick * 0.6, HW.armThick * 0.6, HW.armThick * 1.4, 16]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          {/* LED strip along the underside of both segments */}
          {config.lightsOn && (
            <>
              <Strut a={ledOffset(arm.S)} b={ledOffset(arm.E)} thick={HW.armThick * 0.35} mat={ledMat} />
              <Strut a={ledOffset(arm.E)} b={ledOffset(arm.W)} thick={HW.armThick * 0.35} mat={ledMat} />
            </>
          )}
        </group>
      ))}

      {/* ── Front bar ──────────────────────────────────────────────────────── */}
      <RoundedBox
        args={[W + 0.2, HW.frontBar, HW.frontBar]}
        radius={HW.frontBar * 0.45}
        smoothness={4}
        position={[0, frontBarY, frontZ]}
        castShadow
      >
        <primitive object={metalMat} attach="material" />
      </RoundedBox>

      {/* ── Fabric panel ───────────────────────────────────────────────────── */}
      <mesh geometry={fabricGeo} material={fabricMat} castShadow receiveShadow />

      {/* ── Valance ────────────────────────────────────────────────────────── */}
      <mesh geometry={valanceGeo} material={fabricMat} castShadow />

      {/* ── Warm glow under the awning when the LEDs are on ────────────────── */}
      {config.lightsOn && (
        <pointLight
          position={[0, frontBarY - 0.3, frontZ * 0.5]}
          color="#ffcf8f"
          intensity={(2 + config.brightness * 6) * (reach * 0.12 + 1)}
          distance={Math.max(W, P) * 1.6}
          decay={2}
        />
      )}
    </group>
  );
}

/** Drop a point to the underside of the arm (where the LED strip sits). */
function ledOffset(p: THREE.Vector3) {
  return new THREE.Vector3(p.x, p.y - HW.armThick * 0.55, p.z + HW.armThick * 0.15);
}

/** A box strut spanning two points, oriented along the segment. */
function Strut({
  a,
  b,
  thick,
  depth,
  mat,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  thick: number;
  depth?: number;
  mat: THREE.Material;
}) {
  const { pos, quat, len } = useMemo(() => {
    const dir = b.clone().sub(a);
    const len = Math.max(dir.length(), 0.001);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    return { pos: a.clone().add(b).multiplyScalar(0.5), quat, len };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={quat} material={mat} castShadow>
      <boxGeometry args={[thick, len, depth ?? thick]} />
    </mesh>
  );
}
