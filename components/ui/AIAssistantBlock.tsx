"use client";

import { useState } from "react";

// ─── Hardcoded responses ──────────────────────────────────────────────────────
// REPLACE: swap all simulate* functions with real API calls to GPT-4o mini / Claude.
// Endpoint: POST /api/chat  body: { message: string, context: "exterior-shades" }
// Response: { reply: string }

const CHIP_RESPONSES: Record<string, string> = {
  "Compare to other packages":
    "Exterior Shades mount directly to your façade and retract fully — leaving your view completely unobstructed. Louvered Pergolas build a permanent overhead structure. Retractable Awnings focus on overhead coverage, not perimeter privacy. For targeted UV control and privacy along a wall or lanai edge, Exterior Shades are typically the right choice.",
  "What's included?":
    "Every system includes: a complimentary in-home site assessment, precision custom fabrication to your exact measurements, certified installation, and our five-year workmanship guarantee. All Phantom Screens systems carry the manufacturer's product warranty, and we finish every install with a hands-on walkthrough.",
  "Is this right for me?":
    "A strong fit if you want to reduce heat gain without losing natural light, need privacy on demand for a lanai or covered porch, or are protecting south- or west-facing windows. Our systems are engineered specifically for Florida's humidity, salt air, and wind loads — so if that matches your situation, this is likely your strongest option.",
};

// REPLACE: generate this dynamically by passing page HTML/text to the AI API.
const PAGE_SUMMARY_BULLETS = [
  "Custom-fabricated exterior shade and shutter systems — motorized roller shades, retractable patio screens, Bahama shutters, and storm shutters — all precision-made to your home's exact measurements.",
  "Every product is engineered for Florida's climate: rated for humidity, salt air, and local wind loads, built exclusively on the Phantom Screens platform.",
  "Key benefits: UV protection up to 90%, passive heat reduction, on-demand privacy, and complete architectural invisibility when retracted.",
  "All installations include a free site assessment, professional installation, and a five-year workmanship guarantee alongside the manufacturer's product warranty.",
  "Available in motorized (remote & smart-home compatible) or manual operation, custom-fabricated to any opening size or architectural configuration.",
];

type ChipKey = keyof typeof CHIP_RESPONSES;
type ActiveKey = ChipKey | "summarize" | null;

const CHIPS: ChipKey[] = [
  "Compare to other packages",
  "What's included?",
  "Is this right for me?",
];

async function simulateChipResponse(chip: ChipKey): Promise<string> {
  await new Promise((r) => setTimeout(r, 850 + Math.random() * 500));
  return CHIP_RESPONSES[chip];
}

async function simulateSummarize(): Promise<true> {
  await new Promise((r) => setTimeout(r, 1100 + Math.random() * 600));
  return true;
}

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

export function AIAssistantBlock({ serviceLabel = "this service" }: { serviceLabel?: string }) {
  const [activeKey, setActiveKey] = useState<ActiveKey>(null);
  const [chipResponse, setChipResponse] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChip(chip: ChipKey) {
    if (isLoading) return;
    if (activeKey === chip) { setActiveKey(null); setChipResponse(null); return; }
    setActiveKey(chip);
    setChipResponse(null);
    setShowSummary(false);
    setIsLoading(true);
    // REPLACE: call real AI API here
    const reply = await simulateChipResponse(chip);
    setIsLoading(false);
    setChipResponse(reply);
  }

  async function handleSummarize() {
    if (isLoading) return;
    if (activeKey === "summarize") { setActiveKey(null); setShowSummary(false); return; }
    setActiveKey("summarize");
    setChipResponse(null);
    setShowSummary(false);
    setIsLoading(true);
    // REPLACE: call real AI API here, passing page content for summarization
    await simulateSummarize();
    setIsLoading(false);
    setShowSummary(true);
  }

  const hasResponse = chipResponse || showSummary || isLoading;

  return (
    <div
      aria-label="AI-powered quick answers"
      style={{
        background: "#12151E",
        border: "1px solid rgba(184,146,74,0.35)",
        boxShadow: "none",
        padding: "1.75rem 2.25rem",
        maxWidth: "1080px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, right: 0,
          width: "220px", height: "110px",
          background: "radial-gradient(ellipse at top right, rgba(184,146,74,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Header row ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.55rem", marginBottom: "1.25rem" }}>
        {/* Green "live" indicator */}
        <div
          style={{
            width: "22px", height: "22px", borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 8px rgba(34,197,94,0.35)",
            animation: "aiPulse 3s ease-in-out infinite",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
        </div>
        <span style={{
          fontFamily: "var(--font-cormorant, Georgia, serif)",
          fontSize: "0.72rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(184,146,74,0.85)", fontWeight: 550,
        }}>
          Ask SJB AI
        </span>
        <span style={{ color: "rgba(252,251,247,0.15)", fontSize: "0.8rem" }}>·</span>
        <span style={{
          fontFamily: "var(--font-cormorant, Georgia, serif)",
          fontSize: "1.1rem", fontWeight: 550, color: "rgba(252,251,247,0.82)",
        }}>
          Get answers about {serviceLabel} immediately.
        </span>
      </div>

      {/* ── Chips + Summarize button ────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
        {/* Summarize button — first, visually distinct to signal it's a different action */}
        <button
          onClick={handleSummarize}
          disabled={isLoading && activeKey !== "summarize"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: activeKey === "summarize" ? "rgba(184,146,74,0.15)" : "rgba(184,146,74,0.08)",
            border: `1px solid ${activeKey === "summarize" ? "rgba(184,146,74,0.55)" : "rgba(184,146,74,0.28)"}`,
            color: activeKey === "summarize" ? "#B8924A" : "rgba(184,146,74,0.75)",
            padding: "0.45rem 1.1rem",
            fontSize: "1.1rem", fontWeight: 550, letterSpacing: "0.05em",
            cursor: isLoading && activeKey !== "summarize" ? "default" : "pointer",
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            transition: "all 0.18s",
            opacity: isLoading && activeKey !== "summarize" ? 0.4 : 1,
          }}
          onMouseEnter={(e) => {
            if (isLoading || activeKey === "summarize") return;
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(184,146,74,0.14)";
            el.style.borderColor = "rgba(184,146,74,0.45)";
            el.style.color = "#B8924A";
          }}
          onMouseLeave={(e) => {
            if (activeKey === "summarize") return;
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(184,146,74,0.08)";
            el.style.borderColor = "rgba(184,146,74,0.28)";
            el.style.color = "rgba(184,146,74,0.75)";
          }}
        >
          <SparkleIcon size={10} />
          Summarize this page
        </button>

        {/* Divider pip */}
        <span style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.9rem", userSelect: "none" }}>|</span>

        {/* Q&A chips */}
        {CHIPS.map((chip) => {
          const isActive = activeKey === chip;
          return (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              disabled={isLoading && !isActive}
              style={{
                background: isActive ? "rgba(184,146,74,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isActive ? "rgba(184,146,74,0.5)" : "rgba(255,255,255,0.12)"}`,
                color: isActive ? "#B8924A" : "rgba(252,251,247,0.85)",
                padding: "0.45rem 1rem",
                fontSize: "1.1rem", fontWeight: 550, letterSpacing: "0.03em",
                cursor: isLoading && !isActive ? "default" : "pointer",
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                transition: "all 0.18s",
                opacity: isLoading && !isActive ? 0.4 : 1,
              }}
              onMouseEnter={(e) => {
                if (isLoading || isActive) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(184,146,74,0.08)";
                el.style.borderColor = "rgba(184,146,74,0.3)";
                el.style.color = "rgba(252,251,247,0.9)";
              }}
              onMouseLeave={(e) => {
                if (isActive) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(255,255,255,0.05)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.color = "rgba(252,251,247,0.65)";
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* ── Response area ───────────────────────────────────────────── */}
      {hasResponse && (
        <div style={{
          marginTop: "1.1rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "1.1rem",
        }}>
          {/* Typing indicator */}
          {isLoading && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <SparkleIcon />
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0, 0.22, 0.44].map((delay) => (
                  <span key={delay} style={{
                    display: "inline-block", width: "5px", height: "5px",
                    borderRadius: "50%", background: "rgba(184,146,74,0.6)",
                    animation: `typingBounce 1.3s infinite ${delay}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Q&A chip response */}
          {!isLoading && chipResponse && (
            <p style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "0.9rem", fontWeight: 550, lineHeight: 1.75,
              color: "rgba(252,251,247,0.95)",
            }}>
              {chipResponse}
            </p>
          )}

          {/* Summary bullets */}
          {!isLoading && showSummary && (
            <div>
              <p style={{
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "0.78rem", fontWeight: 550, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "rgba(184,146,74,0.8)",
                marginBottom: "0.75rem",
              }}>
                Page Summary
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {PAGE_SUMMARY_BULLETS.map((bullet, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "#B8924A", flexShrink: 0, marginTop: "0.55rem",
                    }} />
                    <span style={{
                      fontFamily: "var(--font-cormorant, Georgia, serif)",
                      fontSize: "1.2rem", fontWeight: 550, lineHeight: 1.7,
                      color: "rgba(252,251,247,0.95)",
                    }}>
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
