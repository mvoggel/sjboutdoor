/**
 * postMessage contract between a product page (parent) and the embedded 3D
 * visualizer iframe (`/embed/...`). Pure data — no React/three imports — so it
 * can be shared by the in-iframe bridge, the parent-side download button, and
 * the PDF builder.
 *
 * Flow: the parent posts a DESIGN_REQUEST into the iframe; the iframe replies on
 * `window.parent` with a DESIGN_RESPONSE carrying the current selections + a
 * rendered snapshot. Same-origin (the iframe src is `assetPath("/embed/...")`),
 * so this is just a clean decoupling layer, not a security boundary.
 */

export const DESIGN_REQUEST = "sjbb:request-design" as const;
export const DESIGN_RESPONSE = "sjbb:design" as const;

export type DesignProduct = "retractable-awnings" | "louvered-pergolas";

/** One human-readable spec line shown in the PDF, e.g. { label: "Fabric",
 *  value: "Tresco Birch (4696-0000)" }. */
export interface DesignSummaryRow {
  label: string;
  value: string;
}

/** Sent by the parent to ask the iframe for its current design. */
export interface DesignRequestMessage {
  type: typeof DESIGN_REQUEST;
  product: DesignProduct;
}

/** Sent by the iframe back to the parent with the captured design. */
export interface DesignResponseMessage {
  type: typeof DESIGN_RESPONSE;
  product: DesignProduct;
  /** Display name of the product, e.g. "Retractable Awning". */
  title: string;
  summary: DesignSummaryRow[];
  /** PNG data URL of the 3D viewport, or null if capture failed. */
  snapshot: string | null;
}
