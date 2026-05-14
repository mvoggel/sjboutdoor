"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";

// ─── AI summary data ─────────────────────────────────────────────────────────
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
        fill="currentColor"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function LoadingDots() {
  return (
    <span style={{ display: "inline-flex", gap: "3px", alignItems: "center", marginLeft: "2px" }}>
      {[0, 0.22, 0.44].map((delay) => (
        <span
          key={delay}
          style={{
            display: "inline-block",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "currentColor",
            opacity: 0.7,
            animation: `typingBounce 1.3s infinite ${delay}s`,
          }}
        />
      ))}
    </span>
  );
}

interface ProductHeroProps {
  eyebrow: string;
  headline: string;
  descriptor: string;
  videoSrc?: string;
  productSlug?: string;
  /** When provided, swaps "Explore Products" for the AI summary button */
  aiServiceLabel?: string;
  aiContextKey?: string;
}

export function ProductHero({
  eyebrow,
  headline,
  descriptor,
  videoSrc = "/video/homepageloop1.MP4",
  productSlug,
  aiServiceLabel,
  aiContextKey,
}: ProductHeroProps) {
  const { openModal } = useConsultModal();
  const prefersReducedMotion = useReducedMotion();

  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // For desktop connector positioning
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [connectorLeft, setConnectorLeft] = useState<number | null>(null);

  const updateConnector = useCallback(() => {
    if (!aiButtonRef.current || !heroContainerRef.current) return;
    const btnRect = aiButtonRef.current.getBoundingClientRect();
    const containerRect = heroContainerRef.current.getBoundingClientRect();
    setConnectorLeft(btnRect.left + btnRect.width / 2 - containerRect.left);
  }, []);

  useEffect(() => {
    updateConnector();
    window.addEventListener("resize", updateConnector);
    return () => window.removeEventListener("resize", updateConnector);
  }, [updateConnector]);

  // Re-measure when AI panel appears
  useEffect(() => {
    updateConnector();
  }, [aiOpen, aiLoading, updateConnector]);

  const bullets = aiContextKey ? (SUMMARY_BULLETS[aiContextKey] ?? []) : [];

  async function handleAiClick() {
    if (aiLoading) return;
    if (aiOpen) {
      setAiOpen(false);
      return;
    }
    setAiLoading(true);
    await new Promise((r) => setTimeout(r, 1100 + Math.random() * 500));
    setAiLoading(false);
    setAiOpen(true);
  }

  const showAiPanel = aiContextKey && (aiLoading || aiOpen);

  return (
    <section
      style={{
        background: "var(--bg-pure)",
        paddingTop: "calc(80px + 3.5rem)",
        paddingBottom: "4rem",
      }}
    >
      <div ref={heroContainerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/*
          DOM order = mobile order: [1] eyebrow+h1 → [2] video → [3] rule+descriptor+CTAs
          Desktop: CSS grid places [1] col1/row1, [2] col2/rows1-2, [3] col1/row2
        */}
        <div className="flex flex-col md:grid md:grid-cols-[55fr_45fr] lg:grid-cols-[55fr_45fr] md:gap-x-10 lg:gap-x-16 md:items-start">

          {/* ── [1] Eyebrow + Headline ── */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-start-1 md:row-start-1 mb-5 md:mb-0"
          >
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--ink-primary)",
                opacity: 0.55,
                marginBottom: "1.25rem",
              }}
            >
              {eyebrow}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.85rem, 3.2vw, 3.25rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--ink-primary)",
                maxWidth: "20ch",
              }}
            >
              {headline}
            </h1>
          </motion.div>

          {/* ── [2] Framed video — col 2, spans both rows on desktop ── */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-start-2 md:row-start-1 md:row-span-2 my-6 md:my-0"
          >
            <div
              style={{
                background: "var(--rich-sand)",
                padding: "1rem 1rem 2.5rem 1rem",
                position: "relative",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <video
                  autoPlay muted loop playsInline
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </div>
              <p
                style={{
                  position: "absolute",
                  bottom: "0.85rem",
                  right: "1rem",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  opacity: 0.7,
                }}
              >
                Custom Installation · Florida
              </p>
            </div>
          </motion.div>

          {/* ── [3] Gold rule + Descriptor + CTAs ── */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-start-1 md:row-start-2"
          >
            <div
              style={{
                width: "2.5rem",
                height: "1.5px",
                background: "var(--rich-warm)",
                marginBottom: "1.5rem",
                marginTop: "1.5rem",
              }}
            />

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--ink-muted)",
                maxWidth: "44ch",
                marginBottom: "2.25rem",
              }}
            >
              {descriptor}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openModal(productSlug)}
                style={{
                  padding: "0.875rem 2rem",
                  background: "var(--ink-primary)",
                  color: "var(--bg-pure)",
                  border: "1px solid var(--ink-primary)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.85rem",
                  fontWeight: 450,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "transparent";
                  el.style.color = "var(--ink-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "var(--ink-primary)";
                  el.style.color = "var(--bg-pure)";
                }}
              >
                Schedule a Consultation
              </button>

              {/* AI button (when aiContextKey provided) or Explore Products link */}
              {aiContextKey ? (
                <button
                  ref={aiButtonRef}
                  onClick={handleAiClick}
                  disabled={aiLoading}
                  style={{
                    padding: "0.875rem 1.75rem",
                    background: aiOpen ? "rgba(184,146,74,0.12)" : "transparent",
                    color: aiOpen ? "#D9B070" : "var(--ink-primary)",
                    border: `1px solid ${aiOpen ? "rgba(184,146,74,0.55)" : "var(--rich-sand)"}`,
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.85rem",
                    fontWeight: 450,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    cursor: aiLoading ? "default" : "pointer",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    opacity: aiLoading ? 0.85 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (aiLoading || aiOpen) return;
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.borderColor = "rgba(184,146,74,0.5)";
                    el.style.color = "#D9B070";
                  }}
                  onMouseLeave={(e) => {
                    if (aiOpen) return;
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.borderColor = "var(--rich-sand)";
                    el.style.color = "var(--ink-primary)";
                  }}
                  aria-expanded={aiOpen}
                >
                  {aiLoading ? (
                    <>
                      <SparkleIcon size={11} />
                      Reading the page
                      <LoadingDots />
                    </>
                  ) : (
                    <>
                      <SparkleIcon size={11} />
                      {aiOpen ? "Hide Summary" : "Summarize with AI"}
                    </>
                  )}
                </button>
              ) : (
                <a
                  href="#products"
                  style={{
                    padding: "0.875rem 1.75rem",
                    background: "transparent",
                    color: "var(--ink-primary)",
                    border: "1px solid var(--rich-sand)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.85rem",
                    fontWeight: 450,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--ink-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--rich-sand)";
                  }}
                >
                  Explore Products
                </a>
              )}
            </div>

            {/* ── Mobile AI dropdown ── */}
            {aiContextKey && (
              <div
                className="md:hidden"
                style={{
                  maxHeight: showAiPanel ? "600px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                  opacity: showAiPanel ? 1 : 0,
                  marginTop: showAiPanel ? "1.25rem" : "0",
                }}
                aria-hidden={!showAiPanel}
              >
                <div
                  style={{
                    background: "#12151E",
                    border: "1px solid rgba(184,146,74,0.35)",
                    padding: "1.25rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Gold radial wash */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", top: 0, right: 0,
                      width: "200px", height: "90px",
                      background: "radial-gradient(ellipse at top right, rgba(184,146,74,0.10) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  {aiLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <SparkleIcon size={12} />
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
                  ) : (
                    <AiSummaryContent bullets={bullets} serviceLabel={aiServiceLabel} />
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* ── [4] Desktop AI panel — spans both columns, row 3 ── */}
          {aiContextKey && (
            <div
              className="hidden md:block md:col-start-1 md:col-span-2 md:row-start-3"
              style={{
                overflow: "hidden",
                maxHeight: showAiPanel ? "500px" : "0",
                opacity: showAiPanel ? 1 : 0,
                transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
              }}
              aria-hidden={!showAiPanel}
            >
              {/* Connector + panel wrapper */}
              <div style={{ position: "relative", paddingTop: "18px" }}>
                {/* Vertical connector line from button to panel */}
                {connectorLeft !== null && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: `${connectorLeft}px`,
                      width: "1px",
                      height: "18px",
                      background: "rgba(184,146,74,0.45)",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}

                {/* Horizontal top border: left half (open at connector notch) + right half */}
                {connectorLeft !== null && (
                  <>
                    {/* Left segment: from 0 to connector - 8px */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: 0,
                        width: `${Math.max(0, connectorLeft - 8)}px`,
                        height: "1px",
                        background: "rgba(184,146,74,0.35)",
                      }}
                    />
                    {/* Right segment: from connector + 8px to right */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: `${connectorLeft + 8}px`,
                        right: 0,
                        height: "1px",
                        background: "rgba(184,146,74,0.35)",
                      }}
                    />
                  </>
                )}

                {/* The panel itself */}
                <div
                  style={{
                    background: "#12151E",
                    borderLeft: "1px solid rgba(184,146,74,0.35)",
                    borderRight: "1px solid rgba(184,146,74,0.35)",
                    borderBottom: "1px solid rgba(184,146,74,0.35)",
                    padding: "1.75rem 2rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Gold radial wash */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", top: 0, right: 0,
                      width: "320px", height: "130px",
                      background: "radial-gradient(ellipse at top right, rgba(184,146,74,0.09) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  {aiLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <SparkleIcon size={12} />
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
                  ) : (
                    <AiSummaryContent bullets={bullets} serviceLabel={aiServiceLabel} />
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

function AiSummaryContent({
  bullets,
  serviceLabel,
}: {
  bullets: string[];
  serviceLabel?: string;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-cormorant, Georgia, serif)",
          fontSize: "0.74rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(184,146,74,0.8)",
          marginBottom: "0.9rem",
        }}
      >
        {serviceLabel ? `${serviceLabel} — ` : ""}Page Summary
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
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
                fontSize: "1.0rem",
                fontWeight: 500,
                lineHeight: 1.65,
                color: "rgba(252,251,247,0.92)",
              }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
