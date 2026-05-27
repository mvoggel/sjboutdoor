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
const SHUTTER_CALLOUTS: LouveredPergolaCallout[] = [
  {
    number: 1,
    title: "Permanent Facade Installation",
    description:
      "Mounted directly to the structure for a clean, integrated architectural look.",
    dot: { x: 22, y: 20 },
    label: { x: 3, y: 8 },
    align: "right",
  },
  {
    number: 2,
    title: "Adjustable Louver Angles",
    description:
      "Tilt the louvers to control light, airflow, and privacy at any angle.",
    dot: { x: 58, y: 16 },
    label: { x: 52, y: 4 },
    align: "right",
  },
  {
    number: 3,
    title: "Hurricane-Season Ready",
    description:
      "Fixed, impact-rated construction that meets Florida wind-load and building codes.",
    dot: { x: 84, y: 22 },
    label: { x: 96, y: 10 },
    align: "left",
  },
  {
    number: 4,
    title: "Salt-Air Resistant Finishes",
    description:
      "Powder-coat and composite frames engineered for Florida's coastal climate.",
    dot: { x: 20, y: 55 },
    label: { x: 3, y: 52 },
    align: "right",
  },
  {
    number: 5,
    title: "Year-Round Privacy & Shade",
    description:
      "Natural sun control and visual screening without mechanical systems.",
    dot: { x: 52, y: 60 },
    label: { x: 90, y: 48 },
    align: "left",
  },
  {
    number: 6,
    title: "Low Maintenance",
    description:
      "No moving parts, no motors — designed to last decades with minimal upkeep.",
    dot: { x: 78, y: 68 },
    label: { x: 93, y: 82 },
    align: "left",
  },
];

// ─── Sub-products ─────────────────────────────────────────────────────────────
const SUB_PRODUCTS = [
  {
    href: "/products/bahama-shutters",
    category: "Permanent Exterior Shutter",
    name: "Bahama Shutters",
    description:
      "The defining motif of Florida coastal architecture. Bahama shutters provide permanent, passive sun control with a silhouette that elevates any façade — no mechanical parts, no moving system, and year-round hurricane readiness.",
    specs: [
      "Permanent Facade Installation",
      "Adjustable Louver Angles",
      "Hurricane-Season Ready",
      "Coastal Architecture Silhouette",
      "Year-Round Shade & Privacy",
      "Low Maintenance",
      "Multiple Material Finishes",
      "No Mechanical Parts",
    ],
    imageSrc: "/img/products/bahamashutters.jpg",
    bg: "var(--bg-pure)",
    text: "var(--ink-primary)",
    imageOverlayBg: "rgba(14,26,31,0.5)",
  },
  {
    href: "/products/storm-shutters",
    category: "Hurricane Protection System",
    name: "Storm Shutters",
    description:
      "Florida building-code rated protection that deploys in minutes and disappears when the sky clears. Available in accordion, roll-up, and panel styles — each engineered to the specific wind-load and impact requirements of your property.",
    specs: [
      "Florida Building Code Rated",
      "Hurricane-Force Wind Rated",
      "Deploys in Under 10 Min",
      "Accordion · Roll-Up · Panel",
      "PE-Stamp Available",
      "Insurance Discount Eligible",
      "Manual or Motorized",
      "Disappears Between Storms",
    ],
    imageSrc: "/img/products/st-shutter.png",
    bg: "var(--bg-pure)",
    text: "var(--ink-primary)",
    imageOverlayBg: "rgba(14,26,31,0.55)",
  },
];

// ─── Pill component ───────────────────────────────────────────────────────────
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
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            border: "2px solid var(--rich-warm)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${p.imageOverlayBg} 0%, transparent 55%)`,
          }}
        />
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {p.specs.map((spec) => (
            <SpecPill key={spec} label={spec} />
          ))}
        </div>
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
export default function ExteriorShuttersPage() {
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
          eyebrow="Products / Exterior Shutters"
          headline="Storm-ready. Architecturally timeless."
          descriptor="From iconic Bahama shutters to hurricane-rated accordion systems — our exterior shutters are precision-built for Florida's façades. Each is engineered to meet local wind-load codes and redefine your home's curb appeal at the same time."
          videoSrc="/video/extshades.MOV"
          productSlug="exterior-shutters"
          aiServiceLabel="Exterior Shutters"
          aiContextKey="exterior-shutters"
        />

        {/* ── 2. INTERACTIVE INFOGRAPHIC ───────────────────────────────── */}
        <LouveredPergolaExperience
          imageSrc="/img/products/bahamashutters.jpg"
          imageAlt="Bahama shutters installed on a Florida coastal home — adjustable louvers angled for shade and privacy."
          eyebrow="The Standard"
          title="Permanent protection, permanent elegance."
          callouts={SHUTTER_CALLOUTS}
        />

        {/* ── 3. FLORIDA STORM CALLOUT ─────────────────────────────────── */}
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
                  Florida Building Code
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
                    fontWeight: 500, color: "rgba(252,251,247,0.95)",
                    letterSpacing: "0.01em", marginBottom: "0.6rem",
                  }}
                >
                  Hurricane-rated. Permit-ready.
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem", color: "rgba(252,251,247,0.55)",
                    maxWidth: "54ch", lineHeight: 1.75,
                  }}
                >
                  Every shutter system we install carries the proper Florida product approvals, PE-stamp documentation where required, and can qualify your home for insurance discounts under the state&rsquo;s wind mitigation program.
                </p>
              </div>
              <button
                onClick={() => openModal()}
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
                Ask About Our Shutters
              </button>
            </motion.div>
          </Container>
        </section>

        {/* ── 4. HORIZONTAL PRODUCT ROWS ──────────────────────────────── */}
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
                Two systems. One standard of protection.
              </h2>
            </motion.div>
          </Container>

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
