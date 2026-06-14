"use client";

import type { ComponentProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { ProcessTimeline, type ProcessStep } from "@/components/process/ProcessTimeline";

// TODO: swap each videoSrc for the real per-step footage when available.
// Using existing site videos as placeholders so the design reads correctly today.
const STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Consultation & Design",
    body: "In-home meeting to assess your space and sun angles — then fabric, frame color, pitch, and projection width tailored to your home.",
    videoSrc: "/video/our-process/process-consult.mov",
  },
  {
    n: "02",
    title: "Measurement",
    body: "Precise on-site measurements and structural review before anything is ordered.",
    videoSrc: "/video/homepageloop3.MP4",
  },
  {
    n: "03",
    title: "Installation",
    body: "Certified installation by experienced technicians, typically completed in a single day.",
    videoSrc: "/video/our-process/process-install.mov",
  },
  {
    n: "04",
    title: "Walkthrough",
    body: "Full demonstration of motorized controls, pitch adjustment, and care instructions.",
    videoSrc: "/video/our-process/process-walkthroughpergola.MOV",
  },
];

const TRUST_BADGES = [
  {
    title: "Custom Fabricated",
    body: "Every product is built to your exact specifications — no off-the-shelf compromises.",
  },
  {
    title: "Lifetime Warranty",
    body: "We stand behind our work with a comprehensive lifetime warranty on materials and installation.",
  },
  {
    title: "FL-Licensed Installers",
    body: "Our crews are fully licensed, insured, and trained on Florida building codes.",
  },
];

export default function OurProcessPage() {
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

        {/* ── 1. INTRO / REASSURANCE ─────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-pure)",
            paddingTop: "9rem",
            paddingBottom: "4rem",
          }}
        >
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                {...inView(0)}
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1.5rem",
                }}
              >
                Our Process
              </motion.p>

              <motion.h1
                {...inView(0.05)}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2.1rem, 4.4vw, 3.8rem)",
                  fontWeight: 400,
                  color: "var(--ink-primary)",
                  lineHeight: 1.1,
                  letterSpacing: "0.005em",
                  marginBottom: "1.6rem",
                }}
              >
                We&apos;ve got this. You don&apos;t have to worry about a thing.
              </motion.h1>

              {/* Brass rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto origin-center"
                style={{
                  height: "1px",
                  width: "3rem",
                  background: "var(--rich-warm)",
                  marginBottom: "1.75rem",
                }}
              />

              <motion.p
                {...inView(0.15)}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  maxWidth: "60ch",
                  margin: "0 auto",
                }}
              >
                For more than three decades, we&apos;ve been making sure custom installs land exactly the way our clients pictured them — down to the last fabric weave, louver pitch, and panel of trim. No matter the product, we run the same proven four-step process to get you there with zero surprises.
              </motion.p>
            </div>
          </Container>
        </section>

        {/* ── 2. PROCESS TIMELINE ────────────────────────────────────── */}
        <section
          aria-labelledby="process-heading"
          style={{
            background: "var(--bg-pure)",
            paddingTop: "3rem",
            paddingBottom: "6rem",
          }}
        >
          <Container>
            <motion.div
              {...inView(0)}
              className="max-w-3xl mx-auto text-center"
              style={{ marginBottom: "3.5rem" }}
            >
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                  marginBottom: "1rem",
                }}
              >
                Tailored Design · Expert Installation
              </p>
              <h2
                id="process-heading"
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
                Built once. Built right.
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--ink-muted)",
                  maxWidth: "62ch",
                  margin: "0 auto",
                }}
              >
                From the first design consultation to the final functionality test, every system we install is engineered to integrate seamlessly with your home — and to grow with you in the future.
              </p>
            </motion.div>

            <ProcessTimeline steps={STEPS} />
          </Container>
        </section>

        {/* ── 3. TRUST BADGES ────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--near-black)",
            color: "var(--bg-pure)",
            padding: "5rem 0",
          }}
        >
          <Container>
            <motion.div
              {...inView(0)}
              className="max-w-2xl mx-auto text-center"
              style={{ marginBottom: "3rem" }}
            >
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(184,146,74,0.9)",
                  marginBottom: "1rem",
                }}
              >
                What you can count on
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.55rem, 2.6vw, 2.2rem)",
                  fontWeight: 500,
                  color: "rgba(252,251,247,0.96)",
                  letterSpacing: "0.005em",
                  lineHeight: 1.2,
                }}
              >
                Three things we promise, every install.
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-px"
              style={{ background: "rgba(184,146,74,0.18)" }}
            >
              {TRUST_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.title}
                  {...inView(i * 0.08)}
                  style={{
                    background: "var(--near-black)",
                    padding: "2.25rem 1.75rem",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="block"
                    style={{
                      width: "32px",
                      height: "1px",
                      background: "var(--rich-warm)",
                      marginBottom: "1.25rem",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.35rem",
                      fontWeight: 500,
                      color: "rgba(252,251,247,0.96)",
                      marginBottom: "0.6rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {badge.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      color: "rgba(252,251,247,0.62)",
                    }}
                  >
                    {badge.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 4. CLOSING CTA ─────────────────────────────────────────── */}
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
                Ready when you are
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
                Start with a no-pressure consultation.
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--ink-muted)",
                  marginBottom: "2rem",
                }}
              >
                We&apos;ll bring samples to your home, walk your space, and put together a tailored plan — at your pace, on your timeline.
              </p>
              <button
                onClick={() => openModal()}
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
            </motion.div>
          </Container>
        </section>

      </main>

      <Footer />
    </>
  );
}
