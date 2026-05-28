"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductHero } from "@/components/home/ProductHero";
import { assetPath } from "@/lib/asset-path";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import {
  LouveredPergolaExperience,
  type LouveredPergolaCallout,
} from "@/components/products/LouveredPergolaExperience";

// ─── Interactive infographic callouts ─────────────────────────────────────────
const SHADE_CALLOUTS: LouveredPergolaCallout[] = [
  {
    number: 1,
    title: "Custom-Fabricated Fit",
    description:
      "Precision-built to your exact opening for a clean architectural finish.",
    dot: { x: 24, y: 18 },
    label: { x: 4, y: 6 },
    align: "right",
  },
  {
    number: 2,
    title: "Motorized or Manual",
    description:
      "Choose remote-controlled convenience or a lower-cost manual system.",
    dot: { x: 62, y: 16 },
    label: { x: 60, y: 4 },
    align: "right",
  },
  {
    number: 3,
    title: "Florida-Engineered",
    description:
      "Built for salt air, humidity, sun exposure, and storm-cycle wear.",
    dot: { x: 84, y: 18 },
    label: { x: 96, y: 6 },
    align: "left",
  },
  {
    number: 4,
    title: "UV Protection",
    description:
      "Block up to 90% of harmful UV rays while preserving outdoor comfort.",
    dot: { x: 24, y: 50 },
    label: { x: 4, y: 50 },
    align: "right",
  },
  {
    number: 5,
    title: "Climate Control",
    description:
      "Intercept heat before it enters and reduce cooling strain.",
    dot: { x: 46, y: 56 },
    label: { x: 90, y: 44 },
    align: "left",
  },
  {
    number: 6,
    title: "Privacy On Demand",
    description:
      "Keep the view open when you want it and screened when you need it.",
    dot: { x: 78, y: 64 },
    label: { x: 94, y: 86 },
    align: "left",
  },
];

// ─── Sub-products — horizontal rows with luxury pill specs ────────────────────
// TODO: Replace imageSrc values with product-specific photography when available.
const SUB_PRODUCTS = [
  {
    href: "/products/patio-screens",
    category: "Retractable Screen System",
    name: "Patio Screens",
    description:
      "The most architecturally invisible exterior screen on the market. Progressive Screens retractable patio screens vanish completely into a slim housing when not in use — no track, no frame visible from the exterior. Engineered for year-round Florida use.",
    specs: [
      "Progressive Screens System",
      "UV Block up to 90%",
      "Motorized or Manual",
      "Insect & Debris Barrier",
      "Multiple Mesh Opacities",
      "Custom Fabricated",
      "5-Year Warranty",
      "Invisible When Retracted",
    ],
    imageSrc: "/img/products/patioscreen.jpg",
    bg: "var(--bg-pure)",
    text: "var(--ink-primary)",
    imageOverlayBg: "rgba(14,26,31,0.55)",
  },
  {
    href: "/products/garage-door-screens",
    category: "Full-Height Motorized Screen",
    name: "Garage Door Screens",
    description:
      "Transform your garage bay into a seamlessly ventilated outdoor living room. Full-height retractable screens are custom-fitted to any opening — single, double, or oversized — and disappear into a discreet housing at the header when not in use.",
    specs: [
      "Full-Height Coverage",
      "Motorized Operation",
      "Wind-Sensor Auto-Retract",
      "Keychain & Multi-Channel Remote",
      "Custom-Fit to Any Opening",
      "10-Year Parts & Labor",
      "Insect & Light Filtration",
      "Smart Home Compatible",
    ],
    imageSrc: "/img/products/garage-screen.png",
    bg: "var(--bg-pure)",
    text: "var(--ink-primary)",
    imageOverlayBg: "rgba(14,26,31,0.5)",
  },
];

// ─── Pill component — slightly smaller than paragraph text (0.72rem vs 0.95rem body) ─
function SpecPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.38rem",
        padding: "0.28rem 0.8rem",
        borderRadius: "999px",
        border: "1px solid rgba(184,146,74,0.22)",
        background: "rgba(184,146,74,0.03)",
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "0.72rem",
        letterSpacing: "0.03em",
        color: "var(--ink-primary)",
        whiteSpace: "nowrap",
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          width: "3.5px",
          height: "3.5px",
          borderRadius: "50%",
          background: "var(--rich-warm)",
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

// ─── Horizontal product row ───────────────────────────────────────────────────
function ProductRow({
  p,
  imageRight,
  delay,
}: {
  p: (typeof SUB_PRODUCTS)[number];
  imageRight: boolean;
  delay: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${imageRight ? "md:flex-row-reverse" : "md:flex-row"}`}
      style={{ borderBottom: "2px solid rgba(184,146,74,0.35)" }}
    >
      {/* Image side */}
      <div
        className="relative overflow-hidden w-full md:flex-shrink-0 min-h-[140px] md:min-h-[285px]"
        style={{ flex: "0 0 42%" }}
      >
        <Image
          src={assetPath(p.imageSrc)}
          alt={p.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
        {/* Gold border inset overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            border: "2px solid var(--rich-warm)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${p.imageOverlayBg} 0%, transparent 55%)`,
          }}
        />
        {/* Category eyebrow only — no product name */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1.25rem 1.75rem",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(252,251,247,0.7)",
            }}
          >
            {p.category}
          </p>
        </div>
      </div>

      {/* Content side */}
      <div
        className="flex-1 flex flex-col justify-center px-6 py-8 md:px-14 md:py-10"
        style={{ gap: "1.5rem", background: "var(--bg-pure)" }}
      >
        {/* Product name — top of content area */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
            fontWeight: 500,
            color: "var(--ink-primary)",
            lineHeight: 1.1,
            letterSpacing: "0.01em",
          }}
        >
          {p.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "var(--ink-muted)",
            maxWidth: "52ch",
          }}
        >
          {p.description}
        </p>

        {/* Luxury pill specs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {p.specs.map((spec) => (
            <SpecPill key={spec} label={spec} />
          ))}
        </div>

        {/* CTA — Explore only */}
        <div>
          <Link
            href={p.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.75rem",
              background: "var(--ink-primary)",
              color: "var(--bg-pure)",
              border: "1px solid transparent",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.color = "var(--ink-primary)";
              el.style.borderColor = "var(--ink-primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--ink-primary)";
              el.style.color = "var(--bg-pure)";
              el.style.borderColor = "transparent";
            }}
          >
            Explore {p.name}
            <svg width="16" height="8" viewBox="0 0 20 10" fill="none">
              <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

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
                  Engineered with Progressive Screens &amp; Sunpro
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem", color: "rgba(252,251,247,0.55)",
                    maxWidth: "54ch", lineHeight: 1.75,
                  }}
                >
                  We partner with Progressive Screens and Sunpro — two of the industry&rsquo;s leading retractable screen manufacturers. Every installation is backed by their product warranty and our workmanship guarantee.
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

        {/* ── 6. HORIZONTAL PRODUCT ROWS ──────────────────────────────── */}
        <section id="products" style={{ background: "var(--bg-pure)" }}>
          <Container className="pt-16 md:pt-20 pb-0">
            <motion.div {...inView(0)} style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.3rem)",
                  fontWeight: 500, color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                }}
              >
                Two solutions. One standard of quality.
              </h2>
            </motion.div>
          </Container>

          {/* Full-bleed rows */}
          <div>
            {SUB_PRODUCTS.map((p, i) => (
              <ProductRow
                key={p.href}
                p={p}
                imageRight={i % 2 === 1}
                delay={0}
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
