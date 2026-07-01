/**
 * ============================================================================
 *  RETRACTABLE AWNING BUILDER — PRODUCT CONFIG  (v3, real-time 3D)
 * ============================================================================
 *
 *  Everything the configurator knows about the product lives here. The 3D
 *  model (`AwningModel.tsx`) and the controls UI (`ControlsPanel.tsx`) both read
 *  from these constants — to change product data you mostly edit THIS file.
 *
 *  Source: SunPro Motorized Awnings (Traditional folding-arm line).
 *   - Fabrics: the full 30 in-stock Sunbrella line, names + stock #s + real
 *     swatch textures cropped from the official fabric card
 *     (`public/experiments/retractable-awning/fabrics/<id>.png`). Hex values are
 *     sampled from those swatches; `stripe` is auto-classified from pixel
 *     variance. ~300+ custom fabrics also exist (not enumerated here).
 *   - Frame finishes: White / Black / Bronze / Beige (confirmed from the
 *     cassette-housing reference). TODO(real): true powder-coat RAL codes.
 *   - Valance: removable Straight or Sea-Wave.
 *   - Sizes: width 10'–40', projection 8' / 10' / 12'.
 *   - Integrated dimmable LED lights in the arms; motorized w/ remote.
 * ============================================================================
 */

import type { Fabric, FabricGroup, FrameFinish, AwningConfig } from "./types";

// ── Asset base path ─────────────────────────────────────────────────────────
// Mirror next.config.ts / assetPath: the base path is only set when the site is
// served from a sub-path (GitHub Pages staging sets NEXT_PUBLIC_BASE_PATH=
// /sjboutdoor). On the apex domain via Cloudflare it's unset → served from root.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const fabricTextureUrl = (id: string) =>
  `${BASE}/experiments/retractable-awning/fabrics/${id}.png`;

// ── Fabrics (30 in-stock Sunbrella, from the official fabric card) ───────────
export const FABRICS: Fabric[] = [
  // tan
  { id: "equate-cashmere", name: "Equate Cashmere", sku: "4709-0000", group: "tan", hex: "#D3CFC4", stripe: true },
  { id: "grey-beige-chip", name: "Grey Beige Chip Fancy", sku: "4777-0000", group: "tan", hex: "#C8CEB3", stripe: true },
  { id: "hogan-sparrow", name: "Hogan Sparrow", sku: "14615-0000", group: "tan", hex: "#7D746E", stripe: false },
  { id: "linen", name: "Linen", sku: "4633-0000", group: "tan", hex: "#D1C88D", stripe: false },
  { id: "putty-regimental", name: "Putty Regimental", sku: "4961-0000", group: "tan", hex: "#B1B08E", stripe: true },
  { id: "silica-dune", name: "Silica Dune", sku: "4859-0000", group: "tan", hex: "#A6996F", stripe: false },
  { id: "silica-silver", name: "Silica Silver", sku: "4862-0000", group: "tan", hex: "#D6D7B1", stripe: false },
  { id: "tresco-birch", name: "Tresco Birch", sku: "4696-0000", group: "tan", hex: "#796845", stripe: true },
  { id: "westfield-mushroom", name: "Westfield Mushroom", sku: "4817-0000", group: "tan", hex: "#A89873", stripe: true },
  // blue
  { id: "baycrest-sky", name: "Baycrest Sky", sku: "4992-0000", group: "blue", hex: "#7BB1CA", stripe: true },
  { id: "captain-navy", name: "Captain Navy Natural Classic", sku: "4902-0000", group: "blue", hex: "#565C77", stripe: true },
  { id: "colonnade-seaglass", name: "Colonnade Seaglass", sku: "4823-0000", group: "blue", hex: "#9FB4B7", stripe: true },
  { id: "hogan-admiral", name: "Hogan Admiral", sku: "14613-0000", group: "blue", hex: "#253042", stripe: false },
  { id: "marco-blue-grey", name: "Marco Blue Grey", sku: "4704-0000", group: "blue", hex: "#A0A4A6", stripe: true },
  { id: "marine-blue", name: "Marine Blue", sku: "4678-0000", group: "blue", hex: "#0C1D64", stripe: false },
  { id: "navy-taupe", name: "Navy Taupe Fancy", sku: "4916-0000", group: "blue", hex: "#A5AEAB", stripe: true },
  { id: "saxon-cascade", name: "Saxon Cascade", sku: "4884-0000", group: "blue", hex: "#4B899B", stripe: true },
  // green
  { id: "forest-green-beige", name: "Forest Green Beige Natural Fancy Stripe", sku: "4932-0000", group: "green", hex: "#A5BC99", stripe: true },
  { id: "kiawah-spa", name: "Kiawah Spa", sku: "4868-0000", group: "green", hex: "#8EAD7B", stripe: true },
  { id: "paxton-dew", name: "Paxton Dew", sku: "4712-0000", group: "green", hex: "#C5CCC2", stripe: true },
  // redbrown
  { id: "havelock-brick", name: "Havelock Brick", sku: "4985-0000", group: "redbrown", hex: "#A97958", stripe: true },
  { id: "hogan-carob", name: "Hogan Carob", sku: "14616-0000", group: "redbrown", hex: "#382E2C", stripe: false },
  { id: "hogan-flame", name: "Hogan Flame", sku: "14617-0000", group: "redbrown", hex: "#AC5240", stripe: false },
  // greyblack
  { id: "black", name: "Black", sku: "4608-0000", group: "greyblack", hex: "#1A1D1D", stripe: false },
  { id: "clinton-granite", name: "Clinton Granite", sku: "4888-0000", group: "greyblack", hex: "#819186", stripe: true },
  { id: "cooper-ash", name: "Cooper Ash", sku: "4835-0000", group: "greyblack", hex: "#807C79", stripe: true },
  { id: "cooper-black", name: "Cooper Black", sku: "4988-0000", group: "greyblack", hex: "#1E2017", stripe: true },
  { id: "silica-gravel", name: "Silica Gravel", sku: "4833-0000", group: "greyblack", hex: "#ABACA7", stripe: false },
  { id: "silica-stone", name: "Silica Stone", sku: "4861-0000", group: "greyblack", hex: "#6E7662", stripe: false },
  { id: "smoke", name: "Smoke", sku: "4615-0000", group: "greyblack", hex: "#75726F", stripe: false },
];

export const FABRIC_GROUPS: { id: FabricGroup; label: string }[] = [
  { id: "tan", label: "Tan / Beige" },
  { id: "blue", label: "Blues" },
  { id: "green", label: "Greens" },
  { id: "redbrown", label: "Reds / Browns" },
  { id: "greyblack", label: "Grey / Black" },
];

// ── Frame finishes (powder-coat) ────────────────────────────────────────────
// CONFIRMED set from the cassette-housing reference: White / Black / Bronze /
// Beige. TODO(real): swap hex for true powder-coat RAL codes.
export const FRAME_FINISHES: FrameFinish[] = [
  { id: "white", name: "White", hex: "#ECEAE4", metalness: 0.2, roughness: 0.5 },
  { id: "beige", name: "Beige", hex: "#AEA48F", metalness: 0.2, roughness: 0.5 },
  { id: "bronze", name: "Bronze", hex: "#4A3B2C", metalness: 0.35, roughness: 0.45 },
  { id: "black", name: "Black", hex: "#1C1C1E", metalness: 0.4, roughness: 0.42 },
];

// ── Valance ─────────────────────────────────────────────────────────────────
export const VALANCES: { id: "straight" | "wave"; name: string }[] = [
  { id: "wave", name: "Sea-Wave" },
  { id: "straight", name: "Straight" },
];

// ── Size envelope (world units = feet) ──────────────────────────────────────
// Traditional line: widths 10'–40', projection 8' / 10' / 12'.
export const SIZE = {
  width: { min: 10, max: 40, step: 1, default: 16 },
  projection: { options: [8, 10, 12] as const, default: 10 },
} as const;

// ── Hardware dimensions (world units = feet) ────────────────────────────────
// Reasoned proportions matched to the SunPro reference photos. These drive the
// procedural geometry; swap for a Blender-authored glTF prop later for finer
// detail (the pergola-builder pattern).
export const HW = {
  mountHeightFt: 9, // cassette centerline height on the wall
  cassetteH: 0.55, // cassette cross-section height
  cassetteD: 0.42, // cassette depth off the wall
  frontBar: 0.34, // front bar diameter-ish
  armThick: 0.18, // folding-arm bar thickness
  pitchRatio: 0.18, // front-bar drop per foot of projection (≈10°)
  valanceDrop: 0.65, // how far the valance hangs below the front bar
  waveAmp: 0.16, // sea-wave scallop depth
  waveCount: 1.1, // scallops per foot of width
} as const;

// One arm pair per ~13' of width (2 arms standard, +1 every 13').
export const armCountFor = (widthFt: number) =>
  Math.max(2, Math.ceil(widthFt / 13));

// ── Defaults the tool boots into ────────────────────────────────────────────
export const DEFAULT_CONFIG: AwningConfig = {
  view: "outside",
  fabricId: "tresco-birch",
  valance: "wave",
  frameFinishId: "bronze",
  widthFt: SIZE.width.default,
  projectionFt: SIZE.projection.default,
  open: 1,
  lightsOn: false,
  brightness: 0.8,
};

// ── Lookups ─────────────────────────────────────────────────────────────────
export const fabricById = (id: string): Fabric =>
  FABRICS.find((f) => f.id === id) ?? FABRICS[0];

export const finishById = (id: string): FrameFinish =>
  FRAME_FINISHES.find((f) => f.id === id) ?? FRAME_FINISHES[0];
