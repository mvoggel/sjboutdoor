"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { assetPath } from "@/lib/asset-path";
import { AboutBoard } from "@/components/about/AboutBoard";
import { Hammer, Compass, HandHeart, Sparkles } from "lucide-react";

const BELIEFS = [
  {
    icon: Hammer,
    title: "Custom or nothing.",
    body: "Box-store blinds leave gaps. We build to your exact opening, every time.",
  },
  {
    icon: Compass,
    title: "We come to you.",
    body: "Free in-home consult. Real swatches, real measurements, real conversation.",
  },
  {
    icon: HandHeart,
    title: "Family-run, on purpose.",
    body: "No call centers, no commission carousel. You talk to the same crew start to finish.",
  },
  {
    icon: Sparkles,
    title: "Quietly modern.",
    body: "Motorization, smart-home integration, voice control — when it fits, never just because.",
  },
];

const TIMELINE = [
  { year: "1990s", label: "Tony Rosso starts a window-treatment shop in South Jersey." },
  { year: "2000s", label: "Word of mouth turns a small business into the region's go-to." },
  { year: "2010s", label: "Motorization arrives. We learn it inside-out before we sell it." },
  { year: "2020s", label: "Same family. Same standards. New coastline." },
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Header />

      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="pt-32 md:pt-40 pb-20 md:pb-28 relative overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-end">
              <div>
                <p className="text-eyebrow mb-4">About SJB</p>
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 6vw, 4.5rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.0,
                  }}
                >
                  Thirty&nbsp;years of detail.
                  <br />
                  <span style={{ fontStyle: "italic", color: "var(--rich-warm)" }}>
                    Now on a sunnier coast.
                  </span>
                </h1>
                <p
                  className="mt-6 text-lg"
                  style={{ color: "var(--ink-muted)", maxWidth: "56ch", lineHeight: 1.65 }}
                >
                  We started as a small South Jersey shop that cared a little too
                  much about how the corners of a roller shade lined up. Three
                  decades and a few thousand homes later, the Rosso family is
                  doing the same work in Florida — same crew, same standards,
                  same handshake.
                </p>
              </div>

              {/* Year marquee — signature design touch */}
              <YearMarquee />
            </div>
          </Container>
        </section>

        {/* ── The Family Story ───────────────────────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--rich-sand)" }}
        >
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              {/* Photo */}
              <div className="md:col-span-5 relative">
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/5] w-full overflow-hidden"
                  style={{ borderRadius: "8px", boxShadow: "0 24px 60px rgba(14,26,31,0.18)" }}
                >
                  <Image
                    src={assetPath("/img/products/family.jpg")}
                    alt="The Rosso family — three decades of custom window treatments"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </motion.div>
                {/* Tag */}
                <p
                  className="mt-3 text-center md:text-left"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--rich-warm)",
                    fontFamily: "var(--font-cormorant), serif",
                  }}
                >
                  The Rosso family · Est. 1990s
                </p>
              </div>

              {/* Copy */}
              <div className="md:col-span-7">
                <p className="text-eyebrow mb-3">The story, briefly</p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.15,
                  }}
                >
                  It started in a garage, with a tape measure and a stubborn streak.
                </h2>
                <div
                  className="mt-6 space-y-5"
                  style={{ color: "var(--ink-muted)", fontSize: "1.02rem", lineHeight: 1.75 }}
                >
                  <p>
                    Tony Rosso opened South Jersey Blinds because he kept noticing
                    the same thing in friends&apos; houses: beautiful homes, sloppy
                    window treatments. Crooked headrails. Gappy slats. Off-the-rack
                    shades on bay windows that deserved better.
                  </p>
                  <p>
                    Thirty years later, the shop is still family-run — and still
                    obsessive about the half-inch most installers wave off. We
                    treat every job the way Tony treated his very first one:
                    measure twice, fabricate to the exact opening, and don&apos;t
                    leave until the homeowner is genuinely happy.
                  </p>
                  <p>
                    Florida is our newest chapter. Same family. Same trucks.
                    More sunshine.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── What we believe ────────────────────────────── */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-2xl mb-12 md:mb-16">
              <p className="text-eyebrow mb-3">What we believe</p>
              <h2 className="text-h2" style={{ color: "var(--ink-primary)" }}>
                Four convictions, written on the truck.
              </h2>
              <p className="mt-4 text-base" style={{ color: "var(--ink-muted)" }}>
                If we had a mission statement, it would be these four lines —
                shorter than your warranty, longer than our patience for shortcuts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {BELIEFS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                      delay: prefersReducedMotion ? 0 : i * 0.08,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.22em",
                        color: "var(--rich-warm)",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div
                      className="w-12 h-12 mt-3 mb-4 flex items-center justify-center"
                      style={{
                        background: "var(--rich-sand)",
                        borderRadius: "10px",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} style={{ color: "var(--rich-deep)" }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.25rem",
                        fontWeight: 500,
                        color: "var(--ink-primary)",
                        letterSpacing: "0.01em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-base" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
                      {b.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── Image collage / personality strip ──────────── */}
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--near-black)", color: "var(--bg-pure)" }}
        >
          <Container>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <p
                  className="text-eyebrow mb-3"
                  style={{ color: "var(--rich-warm)" }}
                >
                  On the job
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 500,
                    color: "var(--bg-pure)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  Not a showroom. A workshop.
                </h2>
                <p
                  className="mt-5"
                  style={{
                    color: "rgba(252,251,247,0.7)",
                    fontSize: "1rem",
                    lineHeight: 1.75,
                  }}
                >
                  We&apos;d rather be measuring a tricky bay window than standing
                  around behind a counter. Here&apos;s a small slice of what an
                  average week looks like — hands on fabric, eyes on the corners,
                  trucks pointed at the next install.
                </p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 mt-7 text-sm transition-colors hover:text-[var(--rich-warm)]"
                  style={{
                    color: "var(--bg-pure)",
                    fontFamily: "var(--font-cormorant), serif",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid var(--rich-warm)",
                    paddingBottom: "0.25rem",
                  }}
                >
                  See the full gallery →
                </Link>
              </div>

              {/* Photo grid */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-3 md:gap-4">
                <PhotoTile src="/img/products/family.jpg" alt="Family at work" span="row-span-2" />
                <PhotoTile src="/img/products/vidcover.jpeg" alt="Outdoor space" />
                <PhotoTile src="/img/products/vidcover.jpeg" alt="Outdoor space" />
                <PhotoTile src="/img/products/family.jpg" alt="Install detail" />
                <PhotoTile src="/img/products/vidcover.jpeg" alt="Outdoor space" span="col-span-2" />
              </div>
            </div>
          </Container>
        </section>

        {/* ── Behind-the-scenes board ─────────────────────── */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-2xl mb-10 md:mb-14">
              <p className="text-eyebrow mb-3">Behind the scenes</p>
              <h2 className="text-h2" style={{ color: "var(--ink-primary)" }}>
                The people, the trucks, the half-inch.
              </h2>
              <p className="mt-4 text-base" style={{ color: "var(--ink-muted)" }}>
                Less a corporate &ldquo;About Us,&rdquo; more a peek at our week —
                clips and snapshots of the crew doing what they do best.
              </p>
            </div>

            <AboutBoard />
          </Container>
        </section>

        <CtaBand inverted />
      </main>

      <Footer />
    </>
  );
}

/* ── Components ─────────────────────────────────────────── */

function YearMarquee() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      className="relative w-full"
      style={{
        height: 360,
        overflow: "hidden",
        borderTop: "1px solid var(--rich-sand)",
        borderBottom: "1px solid var(--rich-sand)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, var(--bg-pure) 0%, transparent 18%, transparent 82%, var(--bg-pure) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <motion.ul
        aria-hidden="true"
        initial={{ y: 0 }}
        animate={prefersReducedMotion ? { y: 0 } : { y: "-50%" }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-8 px-8 py-8"
        style={{ willChange: "transform" }}
      >
        {[...TIMELINE, ...TIMELINE, ...TIMELINE].map((t, i) => (
          <li key={i} className="flex gap-5 items-baseline">
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "2.25rem",
                fontWeight: 400,
                color: "var(--rich-warm)",
                letterSpacing: "0.02em",
                lineHeight: 1,
                minWidth: "5.5rem",
              }}
            >
              {t.year}
            </span>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.05rem",
                color: "var(--ink-primary)",
                lineHeight: 1.45,
                opacity: 0.85,
              }}
            >
              {t.label}
            </span>
          </li>
        ))}
      </motion.ul>
      {/* Vertical brass guide */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "calc(2rem + 5rem)",
          width: 1,
          background: "rgba(184,146,74,0.35)",
          zIndex: 1,
        }}
      />
    </div>
  );
}

function PhotoTile({
  src,
  alt,
  span = "",
}: {
  src: string;
  alt: string;
  span?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${span}`}
      style={{
        aspectRatio: span.includes("row-span-2") ? "1 / 2" : "1 / 1",
        borderRadius: "6px",
        border: "1px solid rgba(184,146,74,0.18)",
      }}
    >
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
    </div>
  );
}
