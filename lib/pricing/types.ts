/**
 * Client-side ballpark pricing types. The numbers are *retail-facing* only
 * (the module ships in the browser bundle) — never internal cost or margin.
 *
 * Source of truth: the company's pricing Excels in the gitignored
 * `pricing-source/` folder, distilled by hand into the per-product modules.
 * Every figure that isn't a direct grid lookup is surfaced as an `assumption`
 * string so the breakdown panel can show the buyer (and the rep can sanity
 * check) exactly what went into the estimate.
 */

export interface PriceLineItem {
  label: string;
  /** Retail dollars this line contributes to the point estimate. */
  amountUsd: number;
}

export interface PriceQuote {
  /** Low / high bounds of the ballpark range (point estimate ± spread). */
  lowUsd: number;
  highUsd: number;
  /** Internal point estimate before the ± spread (not shown as a single price
   *  per product decision — we surface a range, not one number). */
  pointUsd: number;
  /** Drivers behind the estimate (base unit, options, install, etc.). Dollar
   *  amounts are kept internal; the panel shows the *labels* as the selections
   *  list, not per-line prices. */
  lineItems: PriceLineItem[];
  /** Documented baseline assumptions shown to the buyer for transparency. */
  assumptions: string[];
}
