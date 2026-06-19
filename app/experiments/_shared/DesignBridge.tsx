"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  DESIGN_REQUEST,
  DESIGN_RESPONSE,
  type DesignConfig,
  type DesignProduct,
  type DesignSummaryRow,
} from "@/lib/design-bridge";

interface DesignBridgeProps {
  product: DesignProduct;
  /** Display name used as the PDF heading, e.g. "Retractable Awning". */
  title: string;
  /** Reads the *current* selections into spec rows. Kept in a ref so the
   *  listener (registered once) always sees the latest config. */
  getSummary: () => DesignSummaryRow[];
  /** Reads the *current* raw config (for client-side ballpark pricing). */
  getConfig: () => DesignConfig;
}

/**
 * Rendered INSIDE the visualizer's `<Canvas>` so it can reach the WebGL
 * renderer via `useThree`. It answers DESIGN_REQUEST messages from the parent
 * page with the current selections + a PNG snapshot of the viewport.
 *
 * The snapshot only works because the Canvas is created with
 * `preserveDrawingBuffer: true` — without it `toDataURL()` returns a blank
 * frame. We also force one synchronous render right before capture so the image
 * matches what the user currently sees.
 */
export function DesignBridge({ product, title, getSummary, getConfig }: DesignBridgeProps) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);

  // Keep the latest getters in refs so the message listener (registered once)
  // always reads the current config without re-subscribing each change.
  const getSummaryRef = useRef(getSummary);
  const getConfigRef = useRef(getConfig);
  useEffect(() => {
    getSummaryRef.current = getSummary;
    getConfigRef.current = getConfig;
  });

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || data.type !== DESIGN_REQUEST || data.product !== product) {
        return;
      }

      let snapshot: string | null = null;
      try {
        gl.render(scene, camera);
        snapshot = gl.domElement.toDataURL("image/png");
      } catch {
        snapshot = null;
      }

      window.parent.postMessage(
        {
          type: DESIGN_RESPONSE,
          product,
          title,
          summary: getSummaryRef.current(),
          config: getConfigRef.current(),
          snapshot,
        },
        "*",
      );
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [gl, scene, camera, product, title]);

  return null;
}
