"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductHero } from "@/components/home/ProductHero";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";

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

// ─── Key features ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    title: "Built-In Dimmable LED Lights",
    body: "A standard feature on all our awnings — LED lights built cleverly into the arms give you remote-controlled ambiance. Dim them up for evening gatherings or down for a subtle glow.",
  },
  {
    title: "EZ-Pitch Adjustment",
    body: "Easily adjust the slope of your awning yourself using the included crank to turn the pitch pin on either side. No service call needed — just the right angle for sun or rain.",
  },
  {
    title: "Integrated Cassette Housing",
    body: "When retracted, the fabric folds away inside a protective cassette housing that shields it from weather, UV, and debris. Extends fabric life and keeps the profile clean when not in use.",
  },
  {
    title: "Motorized with Wireless Remote",
    body: "Every awning is motorized and operated by wireless remote. Extend it fully, stop it halfway, or retract it completely — on your schedule and at your exact preference.",
  },
];

// ─── Design options ───────────────────────────────────────────────────────────
const DESIGN_OPTIONS = [
  {
    title: "Three Frame Colors",
    body: "Choose from white, bronze, or beige powder-coated frames. Each finish is engineered to resist corrosion and complement the most common Florida home exteriors.",
  },
  {
    title: "Straight or Sea-Wave Valance",
    body: "Select either a tailored straight valance or a flowing sea-wave profile. Both are high-quality and customer-removable for easy cleaning or seasonal swaps.",
  },
  {
    title: "Multi-Use Front Bar",
    body: "Every awning includes a premium multi-use front bar as a standard feature, ready to accommodate optional accessories — from wind sensors to decorative lighting rails.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RetractableAwningsPage() {
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
          eyebrow="Products / Retractable Awnings"
          headline="Shade on your terms, style on every façade."
          descriptor="Motorized retractable awnings that extend over patios, decks, and outdoor living spaces at the touch of a button. Every awning ships with built-in LED lighting, EZ-Pitch adjustment, and integrated cassette housing — as standard."
          videoSrc="/video/awning-animatino.mp4"
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

        {/* ── 3. DESCRIPTION ──────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-pure)",
            padding: "5rem 0",
          }}
        >
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <motion.div {...inView(0)}>
                <p
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "var(--rich-warm)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Details
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    lineHeight: 1.15,
                    letterSpacing: "0.005em",
                    marginBottom: "1.25rem",
                  }}
                >
                  Versatile shade for every outdoor space.
                </h2>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    color: "var(--ink-muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Retractable awnings offer versatile shade solutions for outdoor spaces, effortlessly extending and retracting with the touch of a button or crank. Available in various sizes, colors, and materials, they cater to different architectural styles and personal preferences — providing protection from the sun and light rain alike.
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    color: "var(--ink-muted)",
                  }}
                >
                  Perfect for creating comfortable outdoor living areas, our awnings can cover patios, decks, and entryways — enhancing both relaxation and entertainment. When not in use, they fold away neatly inside the cassette housing, preserving your views and maintaining an open atmosphere.
                </p>
              </motion.div>

              <motion.div {...inView(0.1)}>
                <div
                  style={{
                    background: "var(--rich-sand)",
                    padding: "1rem 1rem 2.5rem 1rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "4/3",
                      background: "var(--ink-primary)",
                      opacity: 0.08,
                    }}
                  />
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
            </div>
          </Container>
        </section>

        {/* ── 4. FEATURES ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--near-black)",
            borderTop: "1px solid rgba(184,146,74,0.18)",
            padding: "5rem 0",
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
                Standard on Every Awning
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  fontWeight: 500,
                  color: "rgba(252,251,247,0.96)",
                  lineHeight: 1.15,
                  letterSpacing: "0.005em",
                }}
              >
                Premium features. No extra charge.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px"
              style={{ background: "rgba(184,146,74,0.18)" }}
            >
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  {...inView(i * 0.07)}
                  style={{
                    background: "var(--near-black)",
                    padding: "2rem 1.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "1.75rem",
                      height: "1.5px",
                      background: "rgba(184,146,74,0.7)",
                      marginBottom: "1.25rem",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "rgba(252,251,247,0.95)",
                      marginBottom: "0.65rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.93rem",
                      lineHeight: 1.7,
                      color: "rgba(252,251,247,0.58)",
                    }}
                  >
                    {feature.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 5. DESIGN OPTIONS ───────────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-pure)",
            borderTop: "1px solid var(--rich-sand)",
            padding: "5rem 0",
          }}
        >
          <Container>
            <motion.div {...inView(0)} style={{ marginBottom: "3rem" }}>
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1rem",
                }}
              >
                Design Options
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  lineHeight: 1.15,
                  letterSpacing: "0.005em",
                  marginBottom: "0.75rem",
                }}
              >
                Beautiful form, beautiful function.
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--ink-muted)",
                  maxWidth: "58ch",
                }}
              >
                Whether it&apos;s the right color for your façade or the perfect valance profile for your style, every detail is yours to choose.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
              style={{ background: "var(--rich-sand)" }}
            >
              {DESIGN_OPTIONS.map((option, i) => (
                <motion.div
                  key={option.title}
                  {...inView(i * 0.07)}
                  style={{
                    background: "var(--bg-pure)",
                    padding: "2rem 1.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "1.75rem",
                      height: "1.5px",
                      background: "var(--rich-warm)",
                      marginBottom: "1.25rem",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.2rem",
                      fontWeight: 500,
                      color: "var(--ink-primary)",
                      marginBottom: "0.65rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {option.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.93rem",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                    }}
                  >
                    {option.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 6. FINANCING CALLOUT ────────────────────────────────────── */}
        <section
          style={{
            background: "var(--near-black)",
            borderTop: "1px solid rgba(184,146,74,0.18)",
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
                    color: "rgba(184,146,74,0.7)",
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
                    color: "rgba(252,251,247,0.95)",
                    letterSpacing: "0.01em",
                    marginBottom: "0.6rem",
                  }}
                >
                  We offer 0% financing for 6 months.
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(252,251,247,0.5)",
                    maxWidth: "52ch",
                    lineHeight: 1.75,
                  }}
                >
                  With our partners at Synchrony Bank, we offer multiple financing options — including loans from 1–12 years starting at $0 down.
                </p>
              </div>
              <button
                onClick={() => openModal("retractable-awnings")}
                style={{
                  flexShrink: 0,
                  padding: "0.9rem 2.25rem",
                  border: "1px solid rgba(184,146,74,0.45)",
                  background: "transparent",
                  color: "var(--rich-warm)",
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
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--rich-warm)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--near-black)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--rich-warm)";
                }}
              >
                Find Out More
              </button>
            </motion.div>
          </Container>
        </section>

        {/* ── 8. CLOSING CTA ──────────────────────────────────────────── */}
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
                We&apos;ll bring samples to your home, measure your space, and put together a personalized quote. Call (609) 445-3593 or book online.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => openModal("retractable-awnings")}
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
