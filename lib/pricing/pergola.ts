import type { PergolaConfig, ScreenSide } from "@/app/experiments/pergola-builder/types";
import type { PriceQuote } from "./types";

/**
 * PERGOLA BALLPARK — Azenco R-Blade louvered roof, the model the visualizer
 * represents.
 *
 * Distilled from `pricing-source/Pergolas_pricing_table_V1.xlsx`. The R-Blade
 * base is priced per-bay by (per-division width 8–16ft) × (depth 8–23ft); the
 * table divides any span over 16ft evenly into bays (its note: "20×23 → 2 @
 * 10×23"). We mirror that with the visualizer's total span (widthFt × bays).
 *
 * Several options the visualizer exposes are NOT 1:1 in the table, so they use
 * documented representative figures (surfaced as `assumptions`):
 *  - Frame/louver color: white free; grey/black +$1,600/bay (800 louvers + 800
 *    frame); wood-grain +30%.
 *  - Integrated lights: ~4 recessed @ $275 = $1,100/bay.
 *  - Mesh shade per enabled side: motorized-shade size groups ($7.5k/$8.9k/$9.8k).
 *  - Mandatory electrical ($2,900 wire-mount min) + freight ($5,500).
 *  - Installation: 10% of subtotal (FL rate; the table only lists NE states).
 */

// R-Blade base selling grid: per-division width (ft) → depth (ft) → price.
// Verbatim from the Excel R-Blade rows.
const RBLADE_GRID: Record<number, Record<number, number>> = {
  8: { 8: 12453.44, 9: 14521.31, 10: 14521.31, 11: 15472.66, 12: 16146.53, 13: 17104.49, 14: 18135.12, 15: 19086.47, 16: 19568.75, 17: 21075.05, 18: 21557.34, 19: 23704.48, 20: 23704.48, 21: 24655.83, 22: 26096.07, 23: 26096.07 },
  9: { 8: 13087.67, 9: 15155.54, 10: 15155.54, 11: 16787.37, 12: 16787.37, 13: 17745.33, 14: 18769.35, 15: 19727.31, 16: 20209.59, 17: 21715.89, 18: 22198.18, 19: 24345.32, 20: 24345.32, 21: 25303.28, 22: 26743.52, 23: 26743.52 },
  10: { 8: 13087.67, 9: 15155.54, 10: 15155.54, 11: 16787.37, 12: 16787.37, 13: 17745.33, 14: 18769.35, 15: 19727.31, 16: 20209.59, 17: 21715.89, 18: 22198.18, 19: 24345.32, 20: 24345.32, 21: 25303.28, 22: 26743.52, 23: 26743.52 },
  11: { 8: 14560.95, 9: 16285.27, 10: 16285.27, 11: 17375.36, 12: 18115.3, 13: 19205.39, 14: 20302.08, 15: 21392.17, 16: 21940.52, 17: 23578.96, 18: 24127.3, 19: 26472.65, 20: 26472.65, 21: 27562.74, 22: 29207.78, 23: 29207.78 },
  12: { 8: 14560.95, 9: 16285.27, 10: 16285.27, 11: 17375.36, 12: 18115.3, 13: 19205.39, 14: 20302.08, 15: 21392.17, 16: 21940.52, 17: 23578.96, 18: 24127.3, 19: 26472.65, 20: 26472.65, 21: 27562.74, 22: 29207.78, 23: 29207.78 },
  13: { 8: 16040.82, 9: 18703.28, 10: 18703.28, 11: 20057.64, 12: 20929.71, 13: 22290.67, 14: 23519.5, 15: 24873.85, 16: 25554.33, 17: 27457.03, 18: 28144.12, 19: 30885.86, 20: 30885.86, 21: 32246.81, 22: 34288.25, 23: 34288.25 },
  14: { 8: 16040.82, 9: 18703.28, 10: 18703.28, 11: 20057.64, 12: 20929.71, 13: 22290.67, 14: 23519.5, 15: 24873.85, 16: 25554.33, 17: 27457.03, 18: 28144.12, 19: 30885.86, 20: 30885.86, 21: 32246.81, 22: 34288.25, 23: 34288.25 },
  15: { 8: 16040.82, 9: 18703.28, 10: 18703.28, 11: 20057.64, 12: 20929.71, 13: 22290.67, 14: 23519.5, 15: 24873.85, 16: 25554.33, 17: 27457.03, 18: 28144.12, 19: 30885.86, 20: 30885.86, 21: 32246.81, 22: 34288.25, 23: 34288.25 },
  16: { 8: 17484.5, 9: 20386.58, 10: 20386.58, 11: 21862.82, 12: 22813.38, 13: 24296.83, 14: 25636.25, 15: 27112.5, 16: 27854.22, 17: 29928.16, 18: 30677.09, 19: 33665.58, 20: 33665.58, 21: 35149.03, 22: 37374.2, 23: 37374.0 },
};

const COLOR_PER_BAY = 1600; // grey / black: 800 louvers + 800 frame
const WOODGRAIN_PCT = 0.3; // wood-grain louver upcharge
const LIGHTS_PER_BAY = 1100; // ~4 recessed @ $275
const ELECTRICAL = 2900; // mandatory wire-mount minimum
const FREIGHT = 5500; // mandatory flat
const INSTALL_RATE = 0.1; // FL install assumption (table lists only NE states)
export const RANGE_SPREAD = 0.12; // slightly wider — more estimated options

/** Motorized mesh shade per side, by run length → size group. */
function shadePrice(runFt: number): number {
  if (runFt <= 12) return 7500;
  if (runFt <= 18) return 8900;
  return 9800;
}

function gridPrice(perDivWidth: number, depth: number): number {
  const w = clamp(perDivWidth, 8, 16);
  const d = clamp(depth, 8, 23);
  return RBLADE_GRID[w][d];
}

export function pricePergola(config: PergolaConfig): PriceQuote {
  const totalWidth = Math.round(config.widthFt * config.bays);
  const depth = Math.round(config.depthFt);

  // Mirror the table's even-division rule for spans over 16ft.
  const divisions = Math.max(1, Math.ceil(totalWidth / 16));
  const perDivWidth = clamp(Math.round(totalWidth / divisions), 8, 16);
  const base = gridPrice(perDivWidth, depth) * divisions;

  // Frame/louver color.
  let colorUp = 0;
  let colorLabel = "White frame & louvers (standard)";
  if (config.frameColorId === "dark-gray" || config.frameColorId === "black") {
    colorUp = COLOR_PER_BAY * divisions;
    colorLabel = `${config.frameColorId === "black" ? "Black" : "Dark gray"} frame & louvers`;
  } else if (config.frameColorId === "wood-grain") {
    colorUp = base * WOODGRAIN_PCT;
    colorLabel = "Wood-grain finish";
  }

  const lights = config.lightsOn ? LIGHTS_PER_BAY * divisions : 0;

  // Mesh shades — one per enabled side, sized by that side's run.
  const enabledSides = (Object.keys(config.screens) as ScreenSide[]).filter(
    (s) => config.screens[s],
  );
  let screens = 0;
  for (const side of enabledSides) {
    const run = side === "front" || side === "back" ? totalWidth : depth;
    screens += shadePrice(run);
  }

  const subtotal = base + colorUp + lights + screens + ELECTRICAL + FREIGHT;
  const install = subtotal * INSTALL_RATE;
  const point = subtotal + install;

  const lineItems = [
    { label: `${totalWidth}ft × ${depth}ft louvered roof${divisions > 1 ? ` (${divisions} bays)` : ""}`, amountUsd: base },
  ];
  if (colorUp > 0) lineItems.push({ label: colorLabel, amountUsd: colorUp });
  if (lights > 0) lineItems.push({ label: "Integrated LED lighting", amountUsd: lights });
  if (screens > 0)
    lineItems.push({ label: `Motorized mesh shades (${enabledSides.length} side${enabledSides.length > 1 ? "s" : ""})`, amountUsd: screens });
  lineItems.push({ label: "Electrical + freight", amountUsd: ELECTRICAL + FREIGHT });
  lineItems.push({ label: "Professional installation", amountUsd: install });

  return {
    pointUsd: point,
    lowUsd: point * (1 - RANGE_SPREAD),
    highUsd: point * (1 + RANGE_SPREAD),
    lineItems,
    assumptions: [
      "Includes the R-Blade louvered roof, motor, and standard frame. Mandatory electrical (wire-mount minimum) and freight are included.",
      "Color, lighting, and shade figures are representative; final pricing depends on exact spec and site conditions.",
      "Installation estimated at 10% of the system; cornices, heaters, fans, privacy walls, and permit/site work are quoted on-site.",
    ],
  };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}
