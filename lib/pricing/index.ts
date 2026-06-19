import type { DesignProduct } from "@/lib/design-bridge";
import type { AwningConfig } from "@/app/experiments/retractable-awning/types";
import type { PergolaConfig } from "@/app/experiments/pergola-builder/types";
import type { PriceQuote } from "./types";
import { priceAwning } from "./awning";
import { pricePergola } from "./pergola";

export type { PriceQuote } from "./types";

/**
 * Ballpark a design from its raw config. Pure + client-side — the breakdown
 * panel calls this with whatever the visualizer postMessage'd up.
 */
export function priceDesign(
  product: DesignProduct,
  config: AwningConfig | PergolaConfig,
): PriceQuote {
  return product === "retractable-awnings"
    ? priceAwning(config as AwningConfig)
    : pricePergola(config as PergolaConfig);
}

/** Round to the nearest $100 and format as a whole-dollar USD string. */
export function formatUsd(amount: number): string {
  const rounded = Math.round(amount / 100) * 100;
  return rounded.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

/** "$8,400 – $10,300" style range, both ends rounded to $100. */
export function formatRange(quote: PriceQuote): string {
  return `${formatUsd(quote.lowUsd)} – ${formatUsd(quote.highUsd)}`;
}
