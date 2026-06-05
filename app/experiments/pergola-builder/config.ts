/**
 * ============================================================================
 *  PERGOLA BUILDER — PRODUCT CONFIG  (⚠️ STUBBED / PLACEHOLDER DATA)
 * ============================================================================
 *
 *  Everything the configurator knows about the product lives here. To go from
 *  this demo to the real thing, you only edit THIS file — the 3D scene and the
 *  controls UI both read from these constants.
 *
 *  Each block is tagged with what needs swapping. Search for "TODO(real)".
 *
 *  Source so far: R-Blade spec page + your pricing table (sizes/colors).
 *  Still needed from you: screen swatch names+hex, exact blade profile,
 *  light fixture type(s)+photo, true frame paint hex/RAL codes.
 * ============================================================================
 */

import type {
  FrameColor,
  LightOption,
  PergolaConfig,
  ScreenColor,
} from "./types";

// ── Frame / blade finishes ──────────────────────────────────────────────────
// CONFIRMED from the 2025 collection PDF (p9): the R-Blade palette is
// AAMA 2604 powder-coat in White / Black / Dark Gray / Wood Grain / Custom.
// (Bronze is a K-Nopy/R-Shade color, not R-Blade — so it's intentionally out.)
// TODO(real): replace hex with actual powder-coat codes; give Wood Grain a real
// texture instead of the flat brown; wire "Custom" to a color picker.
export const FRAME_COLORS: FrameColor[] = [
  { id: "white", name: "White", hex: "#E9E9E6", metalness: 0.25, roughness: 0.55 },
  { id: "black", name: "Black", hex: "#1E1F22", metalness: 0.45, roughness: 0.45 },
  { id: "dark-gray", name: "Dark Gray", hex: "#3C4044", metalness: 0.45, roughness: 0.45 },
  { id: "wood-grain", name: "Wood Grain", hex: "#946A3D", metalness: 0.1, roughness: 0.7 },
];

// ── Privacy screen fabrics ──────────────────────────────────────────────────
// TODO(real): these are invented. Need your actual screen swatch names + hex +
// how opaque each reads.
export const SCREEN_COLORS: ScreenColor[] = [
  { id: "sand", name: "Sand", hex: "#C7B391", opacity: 0.62 },
  { id: "stone", name: "Stone", hex: "#9B958A", opacity: 0.62 },
  { id: "charcoal", name: "Charcoal", hex: "#34373B", opacity: 0.68 },
  { id: "bronze-mesh", name: "Bronze Mesh", hex: "#5A4632", opacity: 0.6 },
];

// ── Lighting ────────────────────────────────────────────────────────────────
// CONFIRMED fixture families from PDF (p10): R-Blade offers LED Ramps,
// LED Strips, Recessed Lights, and Solar-Powered Lights. In the night photo the
// glow is a PERIMETER cornice strip (LED ramp) plus recessed downlights — that's
// what the 3D now mimics. These two swatches are color temperature, applied to
// whichever fixtures are on.
// TODO(real): expose the 4 fixture families as their own toggles + the warm-
// white spec/temperature.
export const LIGHT_OPTIONS: LightOption[] = [
  { id: "warm", name: "Warm White", hex: "#FFD49B" },
  { id: "neutral", name: "Neutral White", hex: "#FFF1DC" },
];

/** Real R-Blade lighting families (PDF p10) — for future per-type toggles. */
export const LIGHT_FIXTURES = [
  "LED Ramps",
  "LED Strips",
  "Recessed Lights",
  "Solar-Powered Lights",
] as const;

// ── Size envelope ───────────────────────────────────────────────────────────
// Ranges from the R-Blade pricing table (single zone up to 22'10" × 16').
// Width = span across the front; Depth = how far it projects.
export const SIZE = {
  width: { min: 8, max: 23, step: 1, default: 14 },
  depth: { min: 8, max: 16, step: 1, default: 12 },
  postHeight: { min: 8, max: 12, step: 0.5, default: 9 },
} as const;

// Multi-zone: repeat the louvered roof across the width, sharing posts.
// Pricing table treats e.g. 20×20 as 2 bays — this mirrors that.
export const BAYS = { min: 1, max: 3, default: 1 } as const;

// ── Blade / louver profile (world units = feet) ─────────────────────────────
// TODO(real): confirm blade face width, thickness, and gap. Count auto-scales
// with depth using these numbers.
export const BLADE = {
  widthFt: 6 / 12, // 6" face
  thicknessFt: 1.5 / 12, // 1.5" thick
  gapFt: 0.5 / 12, // spacing between blades when open
} as const;

// ── Structural members (world units = feet) ─────────────────────────────────
// CONFIRMED (PDF p10): R-Blade posts are 6.5"×6.5" up to 8"×8".
export const POST = { sizeFt: 6.5 / 12 } as const; // 6.5" square posts (min spec)
export const BEAM = { depthFt: 9 / 12, thicknessFt: 6.5 / 12 } as const; // perimeter frame

// Detail trims pulled from the PDF exploded view (p10). Simple procedural
// stand-ins now; swap for Blender-authored glTF later (Corbel, Cornice, etc.).
export const TRIM = {
  basePlateFt: 11 / 12, // base plate cover footprint at each post foot
  basePlateHeightFt: 1.5 / 12,
  corniceOverhangFt: 2 / 12, // decorative cap lip on top of the beam ring
  corniceHeightFt: 2 / 12,
} as const;

// ── Defaults the tool boots into ────────────────────────────────────────────
export const DEFAULT_CONFIG: PergolaConfig = {
  widthFt: SIZE.width.default,
  depthFt: SIZE.depth.default,
  postHeightFt: SIZE.postHeight.default,
  bays: BAYS.default,
  mount: "freestanding",
  frameColorId: "dark-gray",
  bladeAngleDeg: 35,
  screens: { front: false, back: false, left: false, right: false },
  screenColorId: "charcoal",
  lightsOn: true,
  lightColorId: "warm",
};

// ── Lookups ─────────────────────────────────────────────────────────────────
export const frameColorById = (id: string): FrameColor =>
  FRAME_COLORS.find((c) => c.id === id) ?? FRAME_COLORS[0];

export const screenColorById = (id: string): ScreenColor =>
  SCREEN_COLORS.find((c) => c.id === id) ?? SCREEN_COLORS[0];

export const lightColorById = (id: string): LightOption =>
  LIGHT_OPTIONS.find((c) => c.id === id) ?? LIGHT_OPTIONS[0];
