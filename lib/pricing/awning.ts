import type { AwningConfig } from "@/app/experiments/retractable-awning/types";
import type { PriceQuote } from "./types";

/**
 * AWNING BALLPARK — SunPro 704 retractable (folding-arm), the model the
 * visualizer represents.
 *
 * Distilled from `pricing-source/Awnings_pricing_table_V3.xlsx` (sheet
 * SJB_Selling_V1 — selling prices). Key finding: every option the visualizer
 * exposes — all 30 standard-book fabrics, all 4 hardware finishes, both valance
 * profiles, and the integrated arm lights — is a STANDARD INCLUSION on the 704.
 * So the only consumer-facing price driver is the width × projection base grid,
 * plus the mandatory installation fee.
 *
 * Price = grid[width][projection] × (1 + INSTALL_RATE).
 */

// Base selling grid: width (ft) → projection (ft) → price. Verbatim from the
// 704 grid in the Excel. Small widths have fewer projection options (size
// rules); width 31 / proj 10 is a known source gap (handled by lookup below).
const AWNING_704_GRID: Record<number, Record<number, number>> = {
  10: { 8: 4391.76 },
  11: { 8: 5189.13 },
  12: { 8: 5217.02, 10: 5109.36 },
  13: { 8: 6401.43, 10: 6625.53 },
  14: { 8: 5829.36, 10: 6028.56, 12: 6837.5 },
  15: { 8: 6714.63, 10: 6936.03, 12: 7368.03 },
  16: { 8: 6107.76, 10: 6304.56, 12: 6688.56 },
  17: { 8: 7616.43, 10: 7837.83, 12: 8423.73 },
  18: { 8: 6906.96, 10: 7106.16, 12: 7626.96 },
  19: { 8: 7926.93, 10: 8151.03, 12: 8736.93 },
  20: { 8: 7046.16, 10: 7382.16, 12: 7905.36 },
  21: { 8: 8250.93, 10: 8423.73, 12: 9105.93 },
  22: { 8: 8399.43, 10: 8572.23, 12: 9344.43 },
  23: { 8: 8809.83, 10: 9193.93, 12: 9582.03 },
  24: { 8: 8809.83, 10: 9195.93, 12: 9730.53 },
  25: { 8: 9822.33, 10: 10208.43, 12: 10594.53 },
  26: { 8: 10832.13, 10: 11218.23, 12: 11604.33 },
  27: { 8: 11844.63, 10: 12230.73, 12: 12616.83 },
  28: { 8: 12854.43, 10: 13240.53, 12: 13626.63 },
  29: { 8: 13866.93, 10: 14253.03, 12: 14639.13 },
  30: { 8: 15011.73, 10: 14884.57, 12: 15783.93 },
  31: { 8: 16026.93, 12: 16758.63 },
  32: { 8: 17036.73, 10: 17422.83, 12: 17808.93 },
  33: { 8: 18049.23, 10: 18435.33, 12: 18821.43 },
  34: { 8: 19059.03, 10: 19445.13, 12: 19831.23 },
  35: { 8: 20071.53, 10: 20457.63, 12: 20843.73 },
  36: { 8: 21081.33, 10: 21467.43, 12: 21853.53 },
  37: { 8: 22093.83, 10: 22479.23, 12: 22866.03 },
  38: { 8: 23103.63, 10: 23489.73, 12: 23875.83 },
  39: { 8: 24116.13, 10: 24502.23, 12: 24888.33 },
  40: { 8: 25125.93, 10: 25512.03, 12: 25898.13 },
};

// Mandatory installation: 10% of the sale (Excel: "Installation — base fee").
const INSTALL_RATE = 0.1;
// Ballpark spread applied around the point estimate to form the shown range —
// absorbs site conditions / accessories not captured in the visualizer.
export const RANGE_SPREAD = 0.1;

/** Nearest base price for a width/projection, tolerating the grid's holes. */
function lookupBase(widthFt: number, projectionFt: number): number {
  const width = clamp(Math.round(widthFt), 10, 40);
  const row = AWNING_704_GRID[width];
  if (row[projectionFt] != null) return row[projectionFt];
  // Projection not offered at this width (or the 31/10 gap) — use the closest
  // available projection in the same row.
  const offered = Object.keys(row).map(Number);
  const nearest = offered.reduce((a, b) =>
    Math.abs(b - projectionFt) < Math.abs(a - projectionFt) ? b : a,
  );
  return row[nearest];
}

export function priceAwning(config: AwningConfig): PriceQuote {
  const base = lookupBase(config.widthFt, config.projectionFt);
  const install = base * INSTALL_RATE;
  const point = base + install;

  return {
    pointUsd: point,
    lowUsd: point * (1 - RANGE_SPREAD),
    highUsd: point * (1 + RANGE_SPREAD),
    lineItems: [
      { label: `${config.widthFt}ft × ${config.projectionFt}ft awning`, amountUsd: base },
      { label: "Professional installation", amountUsd: install },
    ],
    assumptions: [
      "Includes the full semi-cassette housing, your valance, integrated LED arm lights, motor, remote, and wind sensor — all standard on the 704.",
      "Standard-book fabric and hardware finish (no upcharge). Custom Sunbrella fabric outside the book adds ~10%.",
      "Assumes a standard wall mount with adequate clearance. Specialty mounts, added drop screens, extra remotes, or siding modification are quoted on-site.",
    ],
  };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}
