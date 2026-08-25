"use client";

import { useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  requestDesign,
  type DesignProduct,
  type DesignSummaryRow,
} from "@/lib/design-bridge";
import { priceDesign, formatRange, type PriceQuote } from "@/lib/pricing";

interface QuoteDesignButtonProps {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  product: DesignProduct;
}

interface QuoteResult {
  quote: PriceQuote;
  selections: DesignSummaryRow[];
}

/**
 * "Quote this design" — sibling to the Download button. Reads the live config
 * from the visualizer (shared `requestDesign`), prices it client-side, and
 * expands a Zillow-style ballpark breakdown below the buttons. The panel uses
 * `flexBasis: 100%` so it wraps onto its own full-width line within the
 * flex-wrap sub-CTA row. No backend.
 */
export function QuoteDesignButton({ iframeRef, product }: QuoteDesignButtonProps) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);

  async function handleClick() {
    if (busy) return;
    if (result) {
      setResult(null); // toggle the panel closed
      return;
    }
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;
    setBusy(true);
    try {
      const design = await requestDesign(frame.contentWindow, product);
      const quote = priceDesign(product, design.config);
      setResult({ quote, selections: design.summary });
    } catch (err) {
      console.error("[QuoteDesignButton] failed to build estimate:", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={busy}
        style={{
          padding: "0.75rem 1.75rem",
          background: result ? "rgba(184,146,74,0.14)" : "rgba(184,146,74,0.9)",
          color: result ? "rgba(184,146,74,0.95)" : "#1b1206",
          border: "1px solid rgba(184,146,74,0.85)",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "0.82rem",
          fontWeight: 550,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          cursor: busy ? "wait" : "pointer",
          transition: "background 0.2s, color 0.2s",
          whiteSpace: "nowrap",
          flexShrink: 0,
          opacity: busy ? 0.8 : 1,
        }}
      >
        {busy ? "Calculating…" : result ? "Hide estimate" : "Quote this design"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            key="quote-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ flexBasis: "100%", width: "100%", overflow: "hidden" }}
          >
            <QuotePanel result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QuotePanel({ result }: { result: QuoteResult }) {
  const { quote, selections } = result;
  return (
    <div
      style={{
        marginTop: "1.25rem",
        padding: "1.75rem",
        borderRadius: 12,
        border: "1px solid rgba(184,146,74,0.35)",
        background: "rgba(255,255,255,0.035)",
      }}
    >
      <p
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(184,146,74,0.9)",
          marginBottom: "0.4rem",
        }}
      >
        Estimated ballpark
      </p>
      <p
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 550,
          color: "#fcfbf7",
          lineHeight: 1.1,
          marginBottom: "1.25rem",
        }}
      >
        {formatRange(quote)}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem 1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        {selections.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.4rem 0",
              borderBottom: "1px solid rgba(252,251,247,0.08)",
              fontSize: "0.85rem",
            }}
          >
            <span style={{ color: "rgba(252,251,247,0.5)" }}>{row.label}</span>
            <span style={{ color: "rgba(252,251,247,0.9)", textAlign: "right" }}>{row.value}</span>
          </div>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "grid", gap: "0.35rem" }}>
        {quote.assumptions.map((a, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.78rem",
              color: "rgba(252,251,247,0.45)",
              lineHeight: 1.55,
              paddingLeft: "1rem",
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", left: 0, color: "rgba(184,146,74,0.7)" }}>·</span>
            {a}
          </li>
        ))}
      </ul>

      <p
        style={{
          fontSize: "0.72rem",
          color: "rgba(252,251,247,0.4)",
          fontStyle: "italic",
          borderTop: "1px solid rgba(252,251,247,0.1)",
          paddingTop: "0.85rem",
        }}
      >
        This is a ballpark estimate, not a binding quote. Final pricing is confirmed
        after a free in-home measurement and consultation.
      </p>
    </div>
  );
}
