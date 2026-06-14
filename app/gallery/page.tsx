"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { assetPath } from "@/lib/asset-path";
import {
  GALLERY_CATEGORIES,
  ALL_WORK,
  getAllPhotos,
  getCategoryPhotos,
  getCategoryCounts,
} from "@/lib/gallery";

export default function GalleryPage() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState<string>(ALL_WORK.slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const counts = useMemo(() => getCategoryCounts(), []);

  // Deep-link: /gallery?filter=<category-slug> (used from product pages).
  // Read once on mount — a useState initializer can't see the query string
  // during static prerender, so syncing here avoids a hydration mismatch.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("filter");
    if (f && (f === ALL_WORK.slug || GALLERY_CATEGORIES.some((c) => c.slug === f))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL on mount
      setActive(f);
    }
  }, []);

  // Keep the URL in sync so a filtered view is shareable/bookmarkable.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (active === ALL_WORK.slug) url.searchParams.delete("filter");
    else url.searchParams.set("filter", active);
    window.history.replaceState(null, "", url);
  }, [active]);

  const tiles = useMemo(
    () => (active === ALL_WORK.slug ? getAllPhotos() : getCategoryPhotos(active)),
    [active],
  );

  // Lightbox keyboard nav.
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % tiles.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + tiles.length) % tiles.length));
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, tiles.length]);

  const filters = [
    { slug: ALL_WORK.slug, label: ALL_WORK.label, count: tilesCount(counts) },
    ...GALLERY_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label, count: counts[c.slug] ?? 0 })),
  ];

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
          className="py-4 sticky top-0 z-20"
          style={{
            borderTop: "1px solid var(--rich-sand)",
            borderBottom: "1px solid var(--rich-sand)",
            background: "var(--bg-pure)",
            backdropFilter: "saturate(1.1)",
          }}
        >
          <Container>
            <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar">
              {filters.map((f) => {
                const isActive = f.slug === active;
                return (
                  <button
                    key={f.slug}
                    type="button"
                    onClick={() => setActive(f.slug)}
                    className="flex-shrink-0 px-4 py-1.5 text-xs uppercase tracking-widest transition-colors"
                    style={{
                      border: "1px solid var(--rich-warm)",
                      color: isActive ? "var(--bg-pure)" : "var(--rich-warm)",
                      background: isActive ? "var(--rich-warm)" : "transparent",
                      fontFamily: "var(--font-cormorant), serif",
                      whiteSpace: "nowrap",
                      opacity: f.count === 0 ? 0.45 : 1,
                    }}
                  >
                    {f.label}
                    {f.count > 0 && (
                      <span style={{ marginLeft: "0.5em", opacity: 0.6 }}>{f.count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── Mosaic grid ────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <Container>
            {tiles.length === 0 ? (
              <p
                className="py-16 text-center text-base"
                style={{
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                }}
              >
                Photos for this category are coming soon — check back shortly.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <AnimatePresence mode="popLayout">
                  {tiles.map((tile, i) => (
                    <motion.button
                      key={tile.src}
                      layout
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: prefersReducedMotion ? 0 : Math.min(i * 0.03, 0.4),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => setLightbox(i)}
                      className={`group relative overflow-hidden text-left ${
                        i === 0 ? "md:col-span-2 md:row-span-2" : ""
                      }`}
                      style={{
                        aspectRatio: i === 0 ? "1 / 1" : "4 / 5",
                        border: "1px solid rgba(184,146,74,0.18)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      aria-label={`View ${tile.alt}`}
                    >
                      <Image
                        src={assetPath(tile.src)}
                        alt={tile.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {/* Caption overlay */}
                      <span
                        className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-end justify-between gap-3 transition-opacity"
                        style={{
                          background:
                            "linear-gradient(0deg, rgba(14,26,31,0.85) 0%, rgba(14,26,31,0) 100%)",
                          color: "var(--bg-pure)",
                        }}
                      >
                        <span className="min-w-0 block">
                          <span
                            className="block"
                            style={{
                              fontSize: "0.66rem",
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              color: "var(--rich-warm)",
                              fontFamily: "var(--font-cormorant), serif",
                            }}
                          >
                            {tile.categoryLabel}
                          </span>
                          {tile.caption && (
                            <span
                              className="block"
                              style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "0.95rem",
                                letterSpacing: "0.02em",
                              }}
                            >
                              {tile.caption}, FL
                            </span>
                          )}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "0.78rem",
                            opacity: 0.7,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <p
              className="mt-10 text-center text-sm"
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
              }}
            >
              New installs added regularly. Drop fresh photos into{" "}
              <code style={{ fontStyle: "normal" }}>public/img/gallery/</code> and they appear here
              automatically.
            </p>
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />

      {/* ── Lightbox ───────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && tiles[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(7,12,14,0.94)" }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              aria-label="Close"
              className="absolute top-5 right-5 p-2 transition-opacity hover:opacity-60"
              style={{ color: "rgba(252,251,247,0.8)" }}
            >
              <X size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i - 1 + tiles.length) % tiles.length));
              }}
              aria-label="Previous image"
              className="absolute left-3 md:left-8 p-3 transition-opacity hover:opacity-60"
              style={{ color: "rgba(252,251,247,0.8)" }}
            >
              <ArrowLeft size={26} strokeWidth={1.4} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ width: "min(90vw, 1100px)", height: "min(82vh, 760px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={assetPath(tiles[lightbox].src)}
                alt={tiles[lightbox].alt}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: "-2.25rem",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(252,251,247,0.65)",
                }}
              >
                {tiles[lightbox].categoryLabel}
                {tiles[lightbox].caption ? ` · ${tiles[lightbox].caption}, FL` : ""}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i + 1) % tiles.length));
              }}
              aria-label="Next image"
              className="absolute right-3 md:right-8 p-3 transition-opacity hover:opacity-60"
              style={{ color: "rgba(252,251,247,0.8)" }}
            >
              <ArrowRight size={26} strokeWidth={1.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function tilesCount(counts: Record<string, number>): number {
  return Object.values(counts).reduce((n, c) => n + c, 0);
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
