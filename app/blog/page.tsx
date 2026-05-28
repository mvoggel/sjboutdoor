"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";

const UPCOMING = [
  {
    no: "01",
    cat: "Buying Guides",
    title: "How to pick a motorized screen that actually survives Florida.",
    read: "8 min",
  },
  {
    no: "02",
    cat: "Field Notes",
    title: "What we learned installing 40 louvered pergolas in Naples.",
    read: "6 min",
  },
  {
    no: "03",
    cat: "Maintenance",
    title: "Salt, sun, and shutters: a no-fluff care guide.",
    read: "5 min",
  },
  {
    no: "04",
    cat: "Design",
    title: "Lighting your lanai for sunset (without ruining the view).",
    read: "7 min",
  },
];

export default function BlogPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)", minHeight: "80vh" }}>
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16 relative overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
              <div>
                <p className="text-eyebrow mb-4">Field Notebook</p>
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 5.5vw, 4rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.05,
                    maxWidth: "18ch",
                  }}
                >
                  Notes from the truck, the workshop, and the lanai.
                </h1>
                <p
                  className="mt-5 text-base"
                  style={{ color: "var(--ink-muted)", maxWidth: "52ch", lineHeight: 1.7 }}
                >
                  Buying guides, install field notes, and small lessons we&apos;ve
                  learned the hard way — written by the people doing the work.
                </p>
              </div>

              {/* Live counter — signature touch */}
              <div className="hidden lg:flex items-end justify-end">
                <div className="text-right">
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--rich-warm)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    First issue
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(2.5rem, 4vw, 4rem)",
                      color: "var(--ink-primary)",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Spring &rsquo;26
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── In the works ───────────────────────────────── */}
        <section className="pb-24 md:pb-32 pt-4">
          <Container>
            <div className="flex items-baseline justify-between gap-4 pb-4 mb-8" style={{ borderBottom: "1px solid var(--rich-sand)" }}>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                }}
              >
                In the works
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                Coming Soon
              </p>
            </div>

            <ul>
              {UPCOMING.map((p, i) => (
                <motion.li
                  key={p.no}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_8rem_1fr_4rem] gap-4 md:gap-8 items-baseline py-6 md:py-7 cursor-default"
                  style={{ borderBottom: "1px solid var(--rich-sand)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.5rem",
                      color: "var(--rich-warm)",
                      letterSpacing: "0.05em",
                      opacity: 0.85,
                    }}
                  >
                    {p.no}
                  </span>
                  <span
                    className="hidden md:block"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      fontFamily: "var(--font-cormorant), serif",
                    }}
                  >
                    {p.cat}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(1.15rem, 2vw, 1.6rem)",
                      color: "var(--ink-primary)",
                      letterSpacing: "0.01em",
                      lineHeight: 1.25,
                      transition: "color 0.2s",
                    }}
                    className="group-hover:text-[var(--rich-warm)]"
                  >
                    {p.title}
                  </span>
                  <span
                    className="hidden md:block text-right"
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {p.read}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 text-center">
              <p
                className="text-sm"
                style={{
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                }}
              >
                We&apos;d rather publish something useful late than something filler on time.
              </p>
            </div>
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}
