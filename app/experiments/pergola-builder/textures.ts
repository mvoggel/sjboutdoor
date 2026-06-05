import * as THREE from "three";

/**
 * Procedurally-generated wood-grain texture (canvas, no asset files — so it's
 * static-export / basePath safe). It's a stylized stand-in; swap for a real
 * tileable wood photo + normal map when you have product imagery.
 *
 * Cached at module scope so all wood-grain meshes share one GPU texture.
 */
let cached: THREE.CanvasTexture | null = null;

export function getWoodTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null; // SSR guard
  if (cached) return cached;

  const w = 512;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return null;

  // Base tone
  ctx.fillStyle = "#8a5f34";
  ctx.fillRect(0, 0, w, h);

  // Vertical grain lines with gentle wobble + tonal variation
  const lines = 60;
  for (let i = 0; i < lines; i++) {
    const x = (i / lines) * w + (Math.random() - 0.5) * 4;
    const shade = 90 + Math.random() * 70; // brown variation
    const r = Math.round(shade * 0.95);
    const g = Math.round(shade * 0.66);
    const b = Math.round(shade * 0.38);
    ctx.strokeStyle = `rgba(${r},${g},${b},${0.35 + Math.random() * 0.4})`;
    ctx.lineWidth = 0.6 + Math.random() * 2.2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    for (let y = 0; y <= h; y += 16) {
      const wobble = Math.sin(y * 0.015 + i) * 3 + (Math.random() - 0.5) * 2;
      ctx.lineTo(x + wobble, y);
    }
    ctx.stroke();
  }

  // A few darker knots/streaks for realism
  for (let i = 0; i < 6; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const rad = 6 + Math.random() * 18;
    const grad = ctx.createRadialGradient(x, y, 1, x, y, rad);
    grad.addColorStop(0, "rgba(60,38,18,0.55)");
    grad.addColorStop(1, "rgba(60,38,18,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  cached = tex;
  return tex;
}
