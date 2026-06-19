"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { DownloadDesignButton } from "@/components/products/DownloadDesignButton";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductHero } from "@/components/home/ProductHero";
import { assetPath } from "@/lib/asset-path";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { AwningPremiumFeatures } from "@/components/products/AwningPremiumFeatures";
import { AwningFabricGallery } from "@/components/products/AwningFabricGallery";
// import { AwningAccessories } from "@/components/products/AwningAccessories"; // hidden per content audit
import { AwningFaqWhy } from "@/components/products/AwningFaqWhy";
import { ProductGallery } from "@/components/products/ProductGallery";

// ─── Benefit icons ────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="26" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.34" y1="6.34" x2="9.17" y2="9.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22.83" y1="22.83" x2="25.66" y2="25.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25.66" y1="6.34" x2="22.83" y2="9.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.17" y1="22.83" x2="6.34" y2="25.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4C11 4 7 8 7 13C7 18 10 20 16 20C22 20 25 18 25 13C25 8 21 4 16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="10" y1="24" x2="8" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="24" x2="14" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="24" x2="20" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShadeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 10 L16 4 L28 10 L28 12 L4 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="16" y1="12" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="12" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="12" x2="28" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RetractableAwningsPage() {
  const prefersReducedMotion = useReducedMotion();
  const { openModal } = useConsultModal();
  const builderRef = useRef<HTMLIFrameElement>(null);

  const inView = (delay = 0): ComponentProps<typeof motion.div> => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <ProductHero
          eyebrow="Products / Retractable Awnings"
          headline="Shade on your terms, style on every façade."
          descriptor="Motorized retractable awnings that extend over patios, decks, and outdoor living spaces at the touch of a button. Every awning ships with built-in LED lighting, EZ-Pitch adjustment, and integrated cassette housing — as standard."
          videoSrc="/video/awning-main.mp4"
          productSlug="retractable-awnings"
          aiServiceLabel="Retractable Awnings"
          aiContextKey="retractable-awnings"
        />

        {/* ── 2. BENEFIT ICONS STRIP ──────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-pure)",
            borderTop: "1px solid var(--rich-sand)",
            borderBottom: "1px solid var(--rich-sand)",
            padding: "3rem 0",
          }}
        >
          <Container>
            <motion.div
              {...inView(0)}
              className="grid grid-cols-3 gap-6 md:gap-10 max-w-2xl mx-auto text-center"
            >
              {[
                { Icon: SunIcon, label: "Sun Protection" },
                { Icon: RainIcon, label: "Rain Protection" },
                { Icon: ShadeIcon, label: "Flexible Shade" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <span style={{ color: "var(--rich-warm)" }}>
                    <Icon />
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      color: "var(--ink-primary)",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* ── 4. PREMIUM FEATURES (expandable) + AWNING STYLES ────────── */}
        <AwningPremiumFeatures />

        {/* ── 5. COLOR & FABRIC OPTIONS (swatch gallery) ──────────────── */}
        <AwningFabricGallery />

        {/* ── 6. AWNING VISUALIZER ────────────────────────────────────── */}
        <section
          aria-labelledby="design-tool-heading"
          style={{
            background: "var(--near-black)",
            borderTop: "1px solid rgba(184,146,74,0.18)",
            padding: "5rem 0 6rem",
          }}
        >
          <Container>
            <motion.div {...inView(0)} style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(184,146,74,0.85)",
                  marginBottom: "1rem",
                }}
              >
                Interactive Configurator
              </p>
              <h2
                id="design-tool-heading"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.55rem, 2.6vw, 2.2rem)",
                  fontWeight: 500,
                  color: "rgba(252,251,247,0.96)",
                  letterSpacing: "0.005em",
                  marginBottom: "0.75rem",
                  lineHeight: 1.15,
                }}
              >
                Design your awning in your browser.
              </h2>
              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  color: "rgba(252,251,247,0.55)",
                  maxWidth: "58ch",
                }}
              >
                Choose your fabric, frame finish, valance, and size — then spin the awning in real-time
                3D to see exactly how it comes together before you book a consultation.
              </p>
            </motion.div>

            {/* Visualizer embed */}
            <motion.div
              {...inView(0.1)}
              style={{
                position: "relative",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "0 0 0 1px rgba(184,146,74,0.25), 0 32px 64px rgba(0,0,0,0.55)",
                background: "#0e1018",
              }}
            >
              {/* Decorative corner notches */}
              {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                <span
                  key={corner}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: "14px",
                    height: "14px",
                    borderColor: "rgba(184,146,74,0.6)",
                    borderStyle: "solid",
                    top: corner.startsWith("t") ? "10px" : "auto",
                    bottom: corner.startsWith("b") ? "10px" : "auto",
                    left: corner.endsWith("l") ? "10px" : "auto",
                    right: corner.endsWith("r") ? "10px" : "auto",
                    borderWidth:
                      corner === "tl"
                        ? "1px 0 0 1px"
                        : corner === "tr"
                        ? "1px 1px 0 0"
                        : corner === "bl"
                        ? "0 0 1px 1px"
                        : "0 1px 1px 0",
                    pointerEvents: "none",
                  }}
                />
              ))}

              <iframe
                ref={builderRef}
                src={assetPath("/embed/retractable-awning")}
                width="100%"
                height="700"
                style={{ border: "none", display: "block" }}
                allow="fullscreen"
                title="Retractable Awning Builder"
                loading="lazy"
              />
            </motion.div>

            {/* Sub-CTA below visualizer — download the current design as a PDF */}
            <motion.div
              {...inView(0.15)}
              style={{
                marginTop: "1.75rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(252,251,247,0.45)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  letterSpacing: "0.04em",
                }}
              >
                Love your design? Take it with you — download a PDF of your selections.
              </p>
              <DownloadDesignButton iframeRef={builderRef} product="retractable-awnings" />
            </motion.div>
          </Container>
        </section>

        {/* ── 7. OPTIONAL ACCESSORIES ─────────────────────────────────── */}
        {/* Temporarily hidden per content audit — restore by uncommenting */}
        {/* <AwningAccessories /> */}

        {/* ── 8. FINANCING CALLOUT ────────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-pure)",
            borderTop: "1px solid var(--rich-sand)",
            borderBottom: "1px solid var(--rich-sand)",
            padding: "4rem 0",
          }}
        >
          <Container>
            <motion.div
              {...inView(0)}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <p
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--rich-warm)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Financing Available
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.35rem, 2.4vw, 2rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    marginBottom: "0.6rem",
                  }}
                >
                  We offer 0% financing for 6 months.
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--ink-muted)",
                    maxWidth: "52ch",
                    lineHeight: 1.75,
                  }}
                >
                  With our partners at Synchrony Bank, we offer multiple financing options —
                  including loans from 1–12 years starting at $0 down.
                </p>
              </div>
              <button
                onClick={() => openModal("retractable-awnings")}
                style={{
                  flexShrink: 0,
                  padding: "0.9rem 2.25rem",
                  border: "1px solid var(--ink-primary)",
                  background: "transparent",
                  color: "var(--ink-primary)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: 450,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--ink-primary)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--bg-pure)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-primary)";
                }}
              >
                Find Out More
              </button>
            </motion.div>
          </Container>
        </section>

        {/* ── 9. WHY US + FAQ ─────────────────────────────────────────── */}
        <AwningFaqWhy />

        <ProductGallery
          category="retractable-awnings"
          heading="Retractable awnings, installed."
          intro="Recent retractable-awning installations across Southwest Florida."
        />

      </main>

      <Footer />
    </>
  );
}
