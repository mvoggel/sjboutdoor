"use client";

import { useState, type RefObject } from "react";
import { requestDesign, type DesignProduct } from "@/lib/design-bridge";
import { buildDesignPdf } from "@/lib/design-pdf";

interface DownloadDesignButtonProps {
  /** Ref to the visualizer `<iframe>` whose current design we capture. */
  iframeRef: RefObject<HTMLIFrameElement | null>;
  product: DesignProduct;
}

/**
 * Replaces the old "Talk to a Designer" sub-CTA. Asks the embedded visualizer
 * (same-origin iframe) for its current selections + a 3D snapshot via
 * postMessage, builds a branded PDF client-side, and downloads it. No backend.
 */
export function DownloadDesignButton({ iframeRef, product }: DownloadDesignButtonProps) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (busy) return;
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;
    setBusy(true);

    try {
      const design = await requestDesign(frame.contentWindow, product);
      const bytes = await buildDesignPdf(design);
      triggerDownload(bytes, `sjb-${product}-design.pdf`);
    } catch (err) {
      console.error("[DownloadDesignButton] failed to build design PDF:", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      style={{
        padding: "0.75rem 1.75rem",
        background: "transparent",
        color: "rgba(184,146,74,0.9)",
        border: "1px solid rgba(184,146,74,0.4)",
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "0.82rem",
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: busy ? "wait" : "pointer",
        transition: "background 0.2s, border-color 0.2s",
        whiteSpace: "nowrap",
        flexShrink: 0,
        opacity: busy ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (busy) return;
        const el = e.currentTarget;
        el.style.background = "rgba(184,146,74,0.1)";
        el.style.borderColor = "rgba(184,146,74,0.7)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "transparent";
        el.style.borderColor = "rgba(184,146,74,0.4)";
      }}
    >
      {busy ? "Preparing PDF…" : "Download this design"}
    </button>
  );
}

function triggerDownload(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
