"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { assetPath } from "@/lib/asset-path";

const FILTERS = [
  "All work",
  "Louvered Pergolas",
  "Motorized Screens",
  "Exterior Shutters",
  "Retractable Awnings",
  "Solar Films",
];

// Placeholder tiles — when real gallery images land, swap into this array.
const TILES = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  city: ["Naples", "Fort Myers", "Bonita Springs", "Palm Beach", "Destin", "Tallahassee", "Ocala", "Jacksonville", "Pensacola"][i],
  product: [
    "Louvered Pergola",
    "Motorized Screen",
    "Bahama Shutter",
    "Retractable Awning",
    "Solar Film",
    "Louvered Pergola",
    "Motorized Screen",
    "Bahama Shutter",
    "Retractable Awning",
  ][i],
  src: i % 2 === 0 ? "/img/products/vidcover.jpeg" : "/img/products/family.jpg",
}));

export default function GalleryPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)", minHeight: "80vh" }}>
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="pt-32 md:pt-40 pb-10 md:pb-14">
          <Container>
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-end">
              <div>
                <p className="text-eyebrow mb-4">The Gallery</p>
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
                  Every install, in its own light.
                </h1>
                <p
                  className="mt-5 text-base"
                  style={{ color: "var(--ink-muted)", maxWidth: "52ch", lineHeight: 1.7 }}
                >
                  Pergolas at golden hour. Screens dropping at sunset. Shutters
                  in the salt air. Our finished work, photographed in the homes
                  it was built for.
                </p>
              </div>

              {/* Stat block — signature touch */}
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <Stat n="2,400+" l="Installs" />
                <Stat n="19" l="Cities" />
                <Stat n="30 yrs" l="On the job" />
              </div>
            </div>
          </Container>
        </section>

        {/* ── Filter bar ────────────────────────────────── */}
        <section
          className="py-4"
          style={{
            borderTop: "1px solid var(--rich-sand)",
            borderBottom: "1px solid var(--rich-sand)",
          }}
        >
          <Container>
            <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  className="flex-shrink-0 px-4 py-1.5 text-xs uppercase tracking-widest transition-colors"
                  style={{
                    border: "1px solid var(--rich-warm)",
                    color: i === 0 ? "var(--bg-pure)" : "var(--rich-warm)",
                    background: i === 0 ? "var(--rich-warm)" : "transparent",
                    fontFamily: "var(--font-cormorant), serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Mosaic grid ────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {TILES.map((tile, i) => (
                <motion.figure
                  key={tile.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion ? 0 : i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative overflow-hidden ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{
                    aspectRatio: i === 0 ? "1 / 1" : "4 / 5",
                    border: "1px solid rgba(184,146,74,0.18)",
                    borderRadius: "4px",
                  }}
                >
                  <Image
                    src={assetPath(tile.src)}
                    alt={`${tile.product} install in ${tile.city}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Caption overlay */}
                  <figcaption
                    className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center justify-between gap-3 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(14,26,31,0.85) 0%, rgba(14,26,31,0) 100%)",
                      color: "var(--bg-pure)",
                    }}
                  >
                    <div className="min-w-0">
                      <p
                        style={{
                          fontSize: "0.66rem",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--rich-warm)",
                          fontFamily: "var(--font-cormorant), serif",
                        }}
                      >
                        {tile.product}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "0.95rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {tile.city}, FL
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.78rem",
                        opacity: 0.7,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            <p
              className="mt-10 text-center text-sm"
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
              }}
            >
              New installs added weekly. Real photography of our finished work is
              coming in March — these placeholders are about to look very out of place.
            </p>
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div
      className="text-center px-2 py-3"
      style={{ borderLeft: "1px solid var(--rich-sand)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
          fontWeight: 500,
          color: "var(--ink-primary)",
          letterSpacing: "0.01em",
          lineHeight: 1.1,
        }}
      >
        {n}
      </p>
      <p
        className="mt-1"
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--rich-warm)",
        }}
      >
        {l}
      </p>
    </div>
  );
}
