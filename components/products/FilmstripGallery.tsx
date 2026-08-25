"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { assetPath } from "@/lib/asset-path";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type FilmstripGalleryProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  images: GalleryImage[];
};

/**
 * A horizontal, drag-to-scroll filmstrip. Native swipe + snap on touch, and
 * click-drag with momentum on desktop. Each frame opens a full-screen lightbox
 * with keyboard + arrow navigation.
 */
export function FilmstripGallery({
  eyebrow = "The Gallery",
  heading = "Recent installations",
  intro,
  images,
}: FilmstripGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // ── Drag-to-scroll (desktop) ──────────────────────────────────────────────
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    // Only hijack for mouse — let touch use native momentum scrolling.
    if (e.pointerType === "touch") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    el.style.cursor = "grab";
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer may already be released */
    }
  }, []);

  // ── Arrow-button paging ───────────────────────────────────────────────────
  const page = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 560);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  // ── Lightbox keyboard nav ─────────────────────────────────────────────────
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, images.length]);

  return (
    <section
      id="gallery"
      className="py-16 md:py-24"
      style={{ background: "var(--near-black)", overflow: "hidden" }}
    >
      <Container>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          style={{ marginBottom: "2.5rem" }}
        >
          <div style={{ maxWidth: "52ch" }}>
            {eyebrow && (
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(184,146,74,0.85)",
                  marginBottom: "0.85rem",
                }}
              >
                {eyebrow}
              </p>
            )}
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)",
                fontWeight: 550,
                color: "rgba(252,251,247,0.95)",
                letterSpacing: "0.01em",
                lineHeight: 1.1,
              }}
            >
              {heading}
            </h2>
            {intro && (
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "rgba(252,251,247,0.55)",
                  marginTop: "0.9rem",
                }}
              >
                {intro}
              </p>
            )}
          </div>

          {/* Desktop paging arrows + hint */}
          <div className="hidden md:flex items-center gap-3">
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(252,251,247,0.4)",
              }}
            >
              Drag to explore
            </span>
            <ArrowButton onClick={() => page(-1)} aria-label="Previous">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </ArrowButton>
            <ArrowButton onClick={() => page(1)} aria-label="Next">
              <ChevronRight size={18} strokeWidth={1.5} />
            </ArrowButton>
          </div>
        </motion.div>
      </Container>

      {/* Full-bleed filmstrip */}
      <div
        ref={trackRef}
        className="filmstrip-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="list"
      >
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            role="listitem"
            className="filmstrip-frame"
            onClick={() => {
              // Suppress click that ends a drag.
              if (drag.current.moved) return;
              setLightbox(i);
            }}
            aria-label={`Open image: ${img.alt}`}
          >
            <Image
              src={assetPath(img.src)}
              alt={img.alt}
              fill
              draggable={false}
              sizes="(max-width: 768px) 78vw, 38vw"
              style={{ objectFit: "cover", pointerEvents: "none" }}
            />
            <span className="filmstrip-frame-border" aria-hidden="true" />
            {img.caption && (
              <span className="filmstrip-caption">{img.caption}</span>
            )}
          </button>
        ))}
        {/* Trailing spacer so the last frame can rest centered-ish */}
        <span aria-hidden="true" style={{ flex: "0 0 1px" }} />
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
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
                setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
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
                src={assetPath(images[lightbox].src)}
                alt={images[lightbox].alt}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
              {images[lightbox].caption && (
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
                  {images[lightbox].caption}
                </p>
              )}
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i + 1) % images.length));
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

      <style jsx>{`
        .filmstrip-track {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0.5rem max(1rem, calc((100vw - 80rem) / 2 + 1rem));
          cursor: grab;
        }
        .filmstrip-track::-webkit-scrollbar {
          display: none;
        }
        .filmstrip-frame {
          position: relative;
          flex: 0 0 78%;
          aspect-ratio: 4 / 3;
          scroll-snap-align: center;
          overflow: hidden;
          border: none;
          padding: 0;
          background: var(--rich-sand);
          cursor: pointer;
        }
        .filmstrip-frame-border {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(184, 146, 74, 0.45);
          pointer-events: none;
          z-index: 2;
        }
        .filmstrip-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 1.5rem 1.25rem 1rem;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(252, 251, 247, 0.9);
          background: linear-gradient(
            to top,
            rgba(7, 12, 14, 0.78) 0%,
            transparent 100%
          );
          text-align: left;
        }
        @media (min-width: 768px) {
          .filmstrip-frame {
            flex-basis: 38%;
          }
        }
        @media (min-width: 1280px) {
          .filmstrip-frame {
            flex-basis: 30%;
          }
        }
      `}</style>
    </section>
  );
}

function ArrowButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex items-center justify-center transition-colors"
      style={{
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "50%",
        border: "1px solid rgba(184,146,74,0.45)",
        background: "transparent",
        color: "var(--rich-warm)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--rich-warm)";
        el.style.color = "var(--near-black)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "transparent";
        el.style.color = "var(--rich-warm)";
      }}
    >
      {children}
    </button>
  );
}

export default FilmstripGallery;
