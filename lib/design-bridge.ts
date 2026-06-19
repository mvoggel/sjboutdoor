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

import type { AwningConfig } from "@/app/experiments/retractable-awning/types";
import type { PergolaConfig } from "@/app/experiments/pergola-builder/types";

export const DESIGN_REQUEST = "sjbb:request-design" as const;
export const DESIGN_RESPONSE = "sjbb:design" as const;

export type DesignProduct = "retractable-awnings" | "louvered-pergolas";

/** Raw visualizer selections — the single source of truth read by the PDF
 *  builder and the ballpark pricing module. */
export type DesignConfig = AwningConfig | PergolaConfig;

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

// The visualizer is a lazily-loaded 3D iframe, so on a cold request its bridge
// may not be listening yet. We re-post on an interval until it answers, giving
// up only after a generous overall window.
const RESPONSE_TIMEOUT_MS = 12000;
const RETRY_INTERVAL_MS = 500;

/**
 * Parent-side helper: ask the visualizer iframe for its current design and
 * resolve with the reply. Shared by the Download and Quote buttons. Browser
 * only — call from an event handler, not during render.
 */
export function requestDesign(
  target: Window,
  product: DesignProduct,
): Promise<DesignResponseMessage> {
  return new Promise((resolve, reject) => {
    const post = () => target.postMessage({ type: DESIGN_REQUEST, product }, "*");
    const retry = window.setInterval(post, RETRY_INTERVAL_MS);
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Visualizer did not respond in time"));
    }, RESPONSE_TIMEOUT_MS);

    function cleanup() {
      window.clearInterval(retry);
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
    }

    function onMessage(e: MessageEvent) {
      const data = e.data as DesignResponseMessage | undefined;
      if (!data || data.type !== DESIGN_RESPONSE || data.product !== product) return;
      cleanup();
      resolve(data);
    }

    window.addEventListener("message", onMessage);
    post();
  });
}

/** Sent by the iframe back to the parent with the captured design. */
export interface DesignResponseMessage {
  type: typeof DESIGN_RESPONSE;
  product: DesignProduct;
  /** Display name of the product, e.g. "Retractable Awning". */
  title: string;
  summary: DesignSummaryRow[];
  /** Raw selections, for client-side ballpark pricing. */
  config: DesignConfig;
  /** PNG data URL of the 3D viewport, or null if capture failed. */
  snapshot: string | null;
}
