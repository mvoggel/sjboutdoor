"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { DownloadDesignButton } from "@/components/products/DownloadDesignButton";
import { QuoteDesignButton } from "@/components/products/QuoteDesignButton";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductHero } from "@/components/home/ProductHero";
import { assetPath } from "@/lib/asset-path";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { LouveredPergolaExperience } from "@/components/products/LouveredPergolaExperience";
import { PergolaArchShowcase } from "@/components/products/PergolaArchShowcase";
import { ProductGallery } from "@/components/products/ProductGallery";

// ─── Page ────────────────────────────────────────────────────────────────
export default function LouveredPergolasPage() {
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
          eyebrow="Products / Louvered Pergolas"
          headline="Privacy, climate, and elegance — on demand."
          descriptor="From smart-home–integrated motorized pergolas to architectural fixed louvers and insulated patio covers — our Azenco-engineered systems are precision-fabricated to your home's exact measurements. Each is built for Florida's humidity, salt air, and wind loads, and gives you complete control of sun, shade, and rain."
          videoSrc="/video/homepageloop1.MP4"
          productSlug="louvered-pergolas"
          aiServiceLabel="Louvered Pergolas"
          aiContextKey="louvered-pergolas"
        />

        {/* ── 2. INTERACTIVE INFOGRAPHIC — "ELEVATE YOUR OUTDOOR LIVING" ─ */}
        <LouveredPergolaExperience
          imageSrc="/img/products/louvered-callout.png"
          eyebrow="Elevate Your Outdoor Living"
          title="A smarter outdoor room, engineered into your home."
        />

        {/* ── 4. SYSTEMS COLLECTION — INTERACTIVE ARCH SHOWCASE ──────── */}
        <PergolaArchShowcase />

        {/* ── 6. PERGOLA VISUALIZER ───────────────────────────────────── */}
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
                  fontWeight: 550,
                  color: "rgba(252,251,247,0.96)",
                  letterSpacing: "0.005em",
                  marginBottom: "0.75rem",
                  lineHeight: 1.15,
                }}
              >
                Design your pergola in your browser.
              </h2>
              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  color: "rgba(252,251,247,0.55)",
                  maxWidth: "58ch",
                }}
              >
                Pick a system, dimensions, and finish — see a live render before you book a consultation.
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
                src={assetPath("/embed/pergola-builder")}
                width="100%"
                height="700"
                style={{ border: "none", display: "block" }}
                allow="fullscreen"
                title="R-BLADE™ Pergola Builder"
                loading="lazy"
              />
            </motion.div>

            {/* Sub-CTA below visualizer — download a PDF or ballpark the design */}
            <motion.div
              {...inView(0.15)}
              style={{
                marginTop: "1.75rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  flex: "1 1 220px",
                  fontSize: "0.9rem",
                  color: "rgba(252,251,247,0.45)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  letterSpacing: "0.04em",
                }}
              >
                Love your design? Take it with you, or get a ballpark estimate.
              </p>
              <DownloadDesignButton iframeRef={builderRef} product="louvered-pergolas" />
              <QuoteDesignButton iframeRef={builderRef} product="louvered-pergolas" />
            </motion.div>
          </Container>
        </section>

        {/* ── 8. AZENCO PARTNERSHIP CALLOUT ──────────────────────────── */}
        <section
          className="py-10 md:py-12"
          style={{
            background: "var(--bg-pure)",
            borderTop: "1px solid var(--rich-sand)",
            borderBottom: "1px solid var(--rich-sand)",
          }}
        >
          <Container>
            <motion.div
              {...inView(0)}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
                    fontWeight: 550,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Engineered with Azenco. Backed by Breslow.
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--ink-muted)",
                    maxWidth: "58ch",
                    lineHeight: 1.75,
                  }}
                >
                  We partner with Azenco — a leading louvered roof systems manufacturer — and with certified Azenco dealer Breslow Home Design to bring the world&apos;s most advanced outdoor structures to Southwest Florida. Every installation carries the manufacturer&apos;s warranty plus our 10-year parts and labor guarantee.
                </p>
              </div>
              <a
                href="https://breslow.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flexShrink: 0,
                  padding: "0.9rem 2.25rem",
                  border: "1px solid var(--ink-primary)",
                  background: "transparent",
                  color: "var(--ink-primary)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--ink-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg-pure)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-primary)";
                }}
              >
                Explore Breslow Home Design
              </a>
            </motion.div>
          </Container>
        </section>

        {/* ── 9. CLOSING CTA ─────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-pure)",
            padding: "5rem 0 6rem",
            textAlign: "center",
          }}
        >
          <Container>
            <motion.div {...inView(0)} className="max-w-2xl mx-auto">
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1rem",
                }}
              >
                Ready to enhance your outdoors?
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.9rem)",
                  fontWeight: 550,
                  color: "var(--ink-primary)",
                  lineHeight: 1.15,
                  marginBottom: "1.5rem",
                }}
              >
                Free consultation. Expert advice. No pressure.
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--ink-muted)",
                  marginBottom: "2rem",
                }}
              >
                We&apos;ll bring samples to your home, walk your space, and put together a personalized quote. Call (352) 642-5839 or book online.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => openModal("louvered-pergolas")}
                  style={{
                    padding: "0.95rem 2.25rem",
                    background: "var(--ink-primary)",
                    color: "var(--bg-pure)",
                    border: "1px solid var(--ink-primary)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
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
                <Link
                  href="/products"
                  style={{
                    padding: "0.95rem 2rem",
                    background: "transparent",
                    color: "var(--ink-primary)",
                    border: "1px solid var(--rich-sand)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
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
                  Explore Other Products
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>

        <ProductGallery
          category="louvered-pergolas"
          heading="Louvered pergolas, built."
          intro="Recent louvered-pergola installations across Southwest Florida."
        />

      </main>

      <Footer />
    </>
  );
}
