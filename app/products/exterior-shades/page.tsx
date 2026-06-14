"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductHero } from "@/components/home/ProductHero";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import {
  LouveredPergolaExperience,
  type LouveredPergolaCallout,
} from "@/components/products/LouveredPergolaExperience";
// import { ShadeExplodeScroll } from "@/components/products/ShadeExplodeScroll"; // hidden for now — revisiting content separately
import { ScreenShowcase } from "@/components/products/ScreenShowcase";

// ─── Interactive infographic callouts ─────────────────────────────────────────
const SHADE_CALLOUTS: LouveredPergolaCallout[] = [
  {
    number: 1,
    title: "Custom-Fabricated Fit",
    description:
      "Built to your exact opening — spans up to 30 ft with no center post.",
    dot: { x: 24, y: 18 },
    label: { x: 4, y: 6 },
    align: "right",
  },
  {
    number: 2,
    title: "Smart-Home Ready",
    description:
      "Somfy motors with Alexa, Google, and one-touch remote control.",
    dot: { x: 62, y: 16 },
    label: { x: 60, y: 4 },
    align: "right",
  },
  {
    number: 3,
    title: "Florida-Engineered",
    description:
      "75 MPH wind-rated, with marine-grade aluminum and stainless hardware.",
    dot: { x: 84, y: 18 },
    label: { x: 96, y: 6 },
    align: "left",
  },
  {
    number: 4,
    title: "UV Protection",
    description:
      "Solar mesh blocks up to 95% of UV rays while keeping the view.",
    dot: { x: 24, y: 50 },
    label: { x: 4, y: 50 },
    align: "right",
  },
  {
    number: 5,
    title: "Climate Control",
    description:
      "Intercepts over half the sun's heat before it reaches the glass.",
    dot: { x: 46, y: 56 },
    label: { x: 90, y: 44 },
    align: "left",
  },
  {
    number: 6,
    title: "Auto Wind & Sun Sensors",
    description:
      "Screens deploy and retract on their own to protect themselves.",
    dot: { x: 78, y: 64 },
    label: { x: 94, y: 86 },
    align: "left",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExteriorShadesPage() {
  const prefersReducedMotion = useReducedMotion();
  const { openModal } = useConsultModal();

  const inView = (delay = 0): ComponentProps<typeof motion.div> => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <ProductHero
          eyebrow="Products / Exterior Shades"
          headline="Privacy, climate, and elegance — on demand."
          descriptor="From motorized roller shades to invisible patio and garage screens — our exterior shade systems are precision-fabricated to your home's exact measurements. Each is engineered for Florida's humidity, salt air, and wind loads, and retracts completely out of sight when you don't need it."
          videoSrc="/video/extshades.MOV"
          productSlug="exterior-shades"
          aiServiceLabel="Exterior Shades"
          aiContextKey="exterior-shades"
        />

        {/* ── 3. INTERACTIVE INFOGRAPHIC — "THE STANDARD" ──────────── */}
        <LouveredPergolaExperience
          imageSrc="/img/products/ext-shades.png"
          imageAlt="Three exterior shade panels mounted across a Florida lanai — left panel fully extended over a dark mesh, middle open to the indoor seating area, right panel partially lowered."
          eyebrow="The Standard"
          title="Architectural shade, engineered for Florida."
          callouts={SHADE_CALLOUTS}
        />

        {/* ── 4. SCROLL-DRIVEN EXPLODED VIEW ──────────────────────────── */}
        {/* Hidden for now — "Down to the last gear." content being reworked separately */}
        {/* <ShadeExplodeScroll /> */}

        {/* ── 5. PHANTOM SCREENS CALLOUT ──────────────────────────────── */}
        <section
          className="py-8 md:py-10"
          style={{
            background: "var(--near-black)",
            borderTop: "1px solid rgba(184,146,74,0.18)",
            borderBottom: "1px solid rgba(184,146,74,0.18)",
          }}
        >
          <Container>
            <motion.div
              {...inView(0)}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            >
              <div>
                <p
                  style={{
                    fontSize: "0.68rem", letterSpacing: "0.22em",
                    textTransform: "uppercase", color: "rgba(184,146,74,0.7)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Our Partners
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
                    fontWeight: 500, color: "rgba(252,251,247,0.95)",
                    letterSpacing: "0.01em", marginBottom: "0.6rem",
                  }}
                >
                  Engineered with Progressive Screens &amp; SunPro
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem", color: "rgba(252,251,247,0.55)",
                    maxWidth: "56ch", lineHeight: 1.75,
                  }}
                >
                  We build with Progressive Screens&rsquo; patented MagnaTrack
                  self-correcting system and SunPro&rsquo;s motorized screens —
                  marine-grade aluminum, Somfy smart-home motors, and
                  Textilene&reg; &amp; Phifer&reg; fabrics. Backed by warranties up
                  to a limited lifetime, plus our own workmanship guarantee.
                </p>
              </div>
              <button
                onClick={() => openModal("exterior-shades")}
                style={{
                  flexShrink: 0,
                  padding: "0.9rem 2.25rem",
                  border: "1px solid rgba(184,146,74,0.45)",
                  background: "transparent", color: "var(--rich-warm)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.875rem", fontWeight: 450,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  cursor: "pointer", transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--rich-warm)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--near-black)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--rich-warm)";
                }}
              >
                Ask About Our Products
              </button>
            </motion.div>
          </Container>
        </section>

        {/* ── 6. INTERACTIVE SCREEN SHOWCASE ──────────────────────────── */}
        <ScreenShowcase />

      </main>

      <Footer />
    </>
  );
}
