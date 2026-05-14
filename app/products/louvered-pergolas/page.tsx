"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductHero } from "@/components/home/ProductHero";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import {
  PergolaParallaxSystem,
  type PergolaSystem,
} from "@/components/products/PergolaParallaxSystem";
import { LouveredPergolaExperience } from "@/components/products/LouveredPergolaExperience";

// ─── The Six Azenco Systems ──────────────────────────────────────────────
// TODO: replace `image` per system with system-specific photography when available.
const SYSTEMS: PergolaSystem[] = [
  {
    slug: "r-blade",
    name: "R-BLADE™",
    category: "Motorized Louvered Pergola",
    tagline: "Engineered comfort, at the touch of a button.",
    body: "Our flagship system. Adjustable, dual-walled aluminum louvers rotate to invite the sun, cast cool shade, or close completely for a fully waterproof roof. Integrated sensors respond automatically to rain and wind; hidden gutters channel water out of sight.",
    specs: [
      "Smartphone & Remote Control",
      "Rain & Wind Auto-Sensors",
      "Hidden Gutter Drainage",
      "Lighting · Heating · Privacy Screens",
      "Attached, Freestanding, or Rooftop",
      "Custom Powder-Coat Finishes",
    ],
    image: "/img/products/pergolas.jpg",
    theme: "light",
  },
  {
    slug: "r-breeze",
    name: "R-BREEZE™",
    category: "Fixed Louvered Pergola",
    tagline: "Architectural shade. No moving parts.",
    body: "When you want permanent overhead shade with clean lines and zero maintenance, R-BREEZE™ delivers. Its fixed aluminum louvers are precisely angled to block direct overhead sun while letting cool breezes flow underneath.",
    specs: [
      "Fixed Louver Geometry",
      "Maintenance-Free Aluminum",
      "Freestanding or Attached",
      "Corrosion- & Fade-Resistant",
      "Ideal for Pool Decks & Courtyards",
      "Minimalist Profile",
    ],
    image: "/img/products/pergolas.jpg",
    theme: "dark",
  },
  {
    slug: "k-bana",
    name: "K-BANA™",
    category: "Manual Modular Pergola",
    tagline: "Plug-and-play outdoor living.",
    body: "K-BANA™ arrives pre-engineered — no trenching, no concrete, often no permits. Manually adjustable louvers, an optional enclosed base, and customizable wall panels in glass, aluminum, wood, or screen make it the most flexible structure we sell.",
    specs: [
      "No-Permit Friendly (in most jurisdictions)",
      "Pre-Fabricated Modules",
      "Manually Adjustable Louvers",
      "Custom Wall Panels",
      "Enclosed Base Option",
      "Spas · Bars · Cabanas",
    ],
    image: "/img/products/pergolas.jpg",
    theme: "light",
  },
  {
    slug: "k-nopy",
    name: "K-NOPY™",
    category: "Cantilevered Aluminum Awning",
    tagline: "Suspended elegance for the modern façade.",
    body: "A premium fixed awning with a cantilevered, hardware-free silhouette. No visible posts or brackets — just a clean horizontal plane that floats over a balcony, entryway, or storefront and delivers weather-rated protection.",
    specs: [
      "Cantilevered, Zero-Post Design",
      "Wind & Rain Rated",
      "Hidden Mounting Hardware",
      "Custom Projection Depth",
      "Powder-Coat Color Selection",
      "Balconies · Storefronts · Windows",
    ],
    image: "/img/products/pergolas.jpg",
    theme: "dark",
  },
  {
    slug: "r-shade",
    name: "R-SHADE™",
    category: "Insulated Patio Cover",
    tagline: "Full overhead protection. Year-round comfort.",
    body: "A solid-roof system with insulated sandwich panels that block heat and noise. Built-in gutters, optional skylights, and roof-load capacity for solar arrays — R-SHADE™ is what you choose when you want the look of a pergola with the protection of a roof.",
    specs: [
      "Insulated Sandwich Panels",
      "Thermal & Acoustic Insulation",
      "Integrated Gutter System",
      "Solar-Panel Ready",
      "Optional Skylight Panels",
      "Year-Round Use",
    ],
    image: "/img/products/pergolas.jpg",
    theme: "light",
  },
  {
    slug: "r-car",
    name: "R-CAR™",
    category: "Luxury Insulated Carport",
    tagline: "Protect what's parked outside — in style.",
    body: "An architectural carport that complements modern homes while shielding vehicles from sun, hail, and storms. Optional side walls add privacy or storage; custom sizing scales from a single car to an expansive driveway, or adapts as a covered workspace.",
    specs: [
      "Insulated Roof Panels",
      "Optional Side Enclosures",
      "Custom Size & Layout",
      "Hail- & Storm-Rated",
      "Pairs With Modern Architecture",
      "Adapts to Workspace or Shelter",
    ],
    image: "/img/products/pergolas.jpg",
    theme: "dark",
  },
];

// ─── Installation Process ────────────────────────────────────────────────
const PROCESS_STEPS = [
  { n: "01", title: "Consultation", body: "In-home meeting to understand your goals, site, and lifestyle." },
  { n: "02", title: "Custom Design", body: "Material selection, finish, and configuration tailored to your architecture." },
  { n: "03", title: "Site Planning", body: "Structural review, permit strategy, and engineered drawings." },
  { n: "04", title: "Installation", body: "Certified install by experienced technicians, on your timeline." },
  { n: "05", title: "Walkthrough", body: "Hands-on demonstration and functionality testing before we leave." },
];

// ─── Page ────────────────────────────────────────────────────────────────
export default function LouveredPergolasPage() {
  const prefersReducedMotion = useReducedMotion();
  const { openModal } = useConsultModal();

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

        {/* ── 4. SYSTEMS COLLECTION — INTRO ──────────────────────────── */}
        <section
          id="systems"
          style={{
            background: "var(--bg-pure)",
            borderTop: "1px solid var(--rich-sand)",
            padding: "5rem 0 3rem",
          }}
        >
          <Container>
            <motion.div {...inView(0)} className="max-w-3xl">
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1.25rem",
                }}
              >
                The Collection
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  lineHeight: 1.15,
                  letterSpacing: "0.005em",
                  marginBottom: "1rem",
                }}
              >
                Six systems. One standard of craftsmanship.
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--ink-muted)",
                  maxWidth: "60ch",
                }}
              >
                Scroll through each system below. They share aluminum bones and Azenco engineering — but each is built for a different way of living outdoors.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* ── 5. PARALLAX SYSTEMS SHOWCASE ───────────────────────────── */}
        <div>
          {SYSTEMS.map((system, i) => (
            <PergolaParallaxSystem
              key={system.slug}
              system={system}
              index={i}
              total={SYSTEMS.length}
            />
          ))}
        </div>

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
                  fontWeight: 500,
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
                src="https://luxury-pergola-visualizer.replit.app"
                width="100%"
                height="700"
                style={{ border: "none", display: "block" }}
                allow="fullscreen"
                title="R-BLADE™ Pergola Visualizer"
                loading="lazy"
              />
            </motion.div>

            {/* Sub-CTA below visualizer */}
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
                Prefer a guided walkthrough? Our designers bring samples to your home.
              </p>
              <button
                onClick={() => openModal("louvered-pergolas")}
                style={{
                  padding: "0.75rem 1.75rem",
                  background: "transparent",
                  color: "rgba(184,146,74,0.9)",
                  border: "1px solid rgba(184,146,74,0.4)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.82rem",
                  fontWeight: 450,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(184,146,74,0.1)";
                  el.style.borderColor = "rgba(184,146,74,0.7)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(184,146,74,0.4)";
                }}
              >
                Talk to a Designer
              </button>
            </motion.div>
          </Container>
        </section>

        {/* ── 7. PROCESS STRIP ───────────────────────────────────────── */}
        <section
          style={{
            background: "var(--near-black)",
            color: "var(--bg-pure)",
            padding: "5rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container>
            <motion.div {...inView(0)} style={{ marginBottom: "3rem", maxWidth: "48rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(184,146,74,0.9)",
                  marginBottom: "1rem",
                }}
              >
                Tailored Design · Expert Installation
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  fontWeight: 500,
                  color: "rgba(252,251,247,0.96)",
                  lineHeight: 1.15,
                  letterSpacing: "0.005em",
                  marginBottom: "0.9rem",
                }}
              >
                Built once. Built right.
              </h2>
              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.75,
                  color: "rgba(252,251,247,0.65)",
                  maxWidth: "58ch",
                }}
              >
                From the first design consultation to the final functionality test, every louvered roof system we install is engineered to integrate seamlessly with your home and to grow with you in the future.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px"
              style={{ background: "rgba(184,146,74,0.18)" }}
            >
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  {...inView(i * 0.08)}
                  style={{
                    background: "var(--near-black)",
                    padding: "1.75rem 1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "rgba(184,146,74,0.95)",
                      letterSpacing: "0.05em",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {step.n}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      color: "rgba(252,251,247,0.95)",
                      marginBottom: "0.55rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      lineHeight: 1.65,
                      color: "rgba(252,251,247,0.6)",
                    }}
                  >
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
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
                <p
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--ink-primary)",
                    opacity: 0.45,
                    marginBottom: "0.75rem",
                  }}
                >
                  Our Systems
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Engineered with Azenco.
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--ink-muted)",
                    maxWidth: "58ch",
                    lineHeight: 1.75,
                  }}
                >
                  We partner with Azenco — a leading European manufacturer of louvered roof systems — to bring the world&apos;s most advanced outdoor structures to Southwest Florida. Every installation is backed by the manufacturer&apos;s product warranty and our 10-year parts and labor guarantee.
                </p>
              </div>
              <button
                onClick={() => openModal("louvered-pergolas")}
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
                Book a Consultation
              </button>
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
                  fontWeight: 500,
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
                We&apos;ll bring samples to your home, walk your space, and put together a personalized quote. Call (609) 445-3593 or book online.
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
                    fontWeight: 450,
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
                    fontWeight: 450,
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

      </main>

      <Footer />
    </>
  );
}
