"use client";

import { useState } from "react";

// REPLACE: swap simulateSummarize with a real API call.
// Endpoint: POST /api/chat  body: { context: "louvered-pergolas", action: "summarize" }
// Response: { bullets: string[] }
const SUMMARY_BULLETS: Record<string, string[]> = {
  "louvered-pergolas": [
    "Six premium louvered roof systems engineered for Florida's climate — from the smart-home–integrated R-BLADE™ motorized pergola to the architectural R-BREEZE™ fixed pergola, the modular K-BANA™, the cantilevered K-NOPY™ awning, the insulated R-SHADE™ patio cover, and the luxury R-CAR™ carport.",
    "Built from high-grade powder-coated aluminum — corrosion- and salt-air-resistant, engineered for hurricane-zone wind loads, and warranted for the conditions Florida actually produces.",
    "On-demand control of sun, shade, rain, and airflow. The R-BLADE™ adds integrated rain and wind sensors, hidden gutter drainage, and optional lighting, heating, and privacy screens — all controlled by remote or smartphone.",
    "Each system arrives custom-fabricated to your space, with a tailored design consultation, structural planning, certified installation, and a 10-year parts and labor warranty.",
    "Free in-home consultation, transparent pricing, 0% financing options, and three decades of installation expertise — now bringing the same craftsmanship to Southwest Florida homeowners.",
  ],
};

function SparkleIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill="#B8924A"
        fillOpacity="0.9"
      />
    </svg>
  );
}

interface AISummaryBarProps {
  /** Display label for the service, e.g. "Louvered Pergolas". */
  serviceLabel?: string;
  /** Key into the SUMMARY_BULLETS map. */
  contextKey?: keyof typeof SUMMARY_BULLETS;
}

export function AISummaryBar({
  serviceLabel = "this page",
  contextKey = "louvered-pergolas",
}: AISummaryBarProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const bullets = SUMMARY_BULLETS[contextKey] ?? [];

  async function handleClick() {
    if (loading) return;
    if (open) { setOpen(false); return; }
    setLoading(true);
    // REPLACE: call real AI API with page context
    await new Promise((r) => setTimeout(r, 1100 + Math.random() * 500));
    setLoading(false);
    setOpen(true);
  }

  return (
    <div
      aria-label="AI-powered page summary"
      style={{
        background: "#12151E",
        border: "1px solid rgba(184,146,74,0.35)",
        padding: "1rem 1.25rem",
        maxWidth: "1080px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold radial wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, right: 0,
          width: "260px", height: "110px",
          background: "radial-gradient(ellipse at top right, rgba(184,146,74,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Single horizontal bar ─────────────────────────────────────── */}
      <div
        className="flex flex-col md:flex-row md:items-center"
        style={{ gap: "0.85rem", position: "relative", zIndex: 1 }}
      >
        {/* Left: pulse + ASK label */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}>
          <div
            style={{
              width: "22px", height: "22px", borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 8px rgba(34,197,94,0.35)",
              animation: "aiPulse 3s ease-in-out infinite",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(184,146,74,0.85)",
              fontWeight: 500,
            }}
          >
            Ask SJBB AI
          </span>
        </div>

        {/* Middle: contextual prompt */}
        <span
          className="hidden md:inline"
          style={{ color: "rgba(252,251,247,0.15)", fontSize: "0.85rem" }}
          aria-hidden="true"
        >
          ·
        </span>
        <span
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "rgba(252,251,247,0.82)",
            flex: 1,
            minWidth: 0,
            lineHeight: 1.4,
          }}
        >
          Get the gist of {serviceLabel} in five bullets — no scrolling required.
        </span>

        {/* Right: the single action */}
        <button
          onClick={handleClick}
          disabled={loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            background: open ? "rgba(184,146,74,0.18)" : "rgba(184,146,74,0.08)",
            border: `1px solid ${open ? "rgba(184,146,74,0.6)" : "rgba(184,146,74,0.3)"}`,
            color: open ? "#D9B070" : "rgba(184,146,74,0.85)",
            padding: "0.55rem 1.2rem",
            fontSize: "0.92rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            cursor: loading ? "default" : "pointer",
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            transition: "all 0.18s",
            whiteSpace: "nowrap",
            opacity: loading ? 0.75 : 1,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (loading || open) return;
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(184,146,74,0.16)";
            el.style.borderColor = "rgba(184,146,74,0.5)";
            el.style.color = "#D9B070";
          }}
          onMouseLeave={(e) => {
            if (open) return;
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(184,146,74,0.08)";
            el.style.borderColor = "rgba(184,146,74,0.3)";
            el.style.color = "rgba(184,146,74,0.85)";
          }}
          aria-expanded={open}
        >
          <SparkleIcon size={11} />
          {loading ? "Reading the page…" : open ? "Hide summary" : "Summarize with AI"}
        </button>
      </div>

      {/* ── Response area ─────────────────────────────────────────────── */}
      {(loading || open) && (
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <SparkleIcon />
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0, 0.22, 0.44].map((delay) => (
                  <span
                    key={delay}
                    style={{
                      display: "inline-block",
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "rgba(184,146,74,0.6)",
                      animation: `typingBounce 1.3s infinite ${delay}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && open && (
            <div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant, Georgia, serif)",
                  fontSize: "0.74rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(184,146,74,0.8)",
                  marginBottom: "0.85rem",
                }}
              >
                Page Summary
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#B8924A",
                        flexShrink: 0,
                        marginTop: "0.6rem",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant, Georgia, serif)",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        lineHeight: 1.65,
                        color: "rgba(252,251,247,0.95)",
                      }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
