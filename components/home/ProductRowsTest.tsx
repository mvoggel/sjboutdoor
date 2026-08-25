"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { assetPath } from "@/lib/asset-path";
import { mediaSrc } from "@/lib/media-src";

// ─── Data ─────────────────────────────────────────────────────────────────────

// TODO: replace stand-in images + assign real per-product videos when ready
const GALLERY_IMAGES = [
  { src: "/img/products/shades2.png", alt: "Exterior shades" },
  { src: "/img/products/awning.png", alt: "Retractable awning" },
  { src: "/img/products/pergolas.jpg", alt: "Louvered pergola" },
];

const PRODUCTS = [
  {
    slug: "exterior-shades",
    number: "01",
    category: "Shade",
    name: "Exterior Shades & Shutters",
    descriptor: "Motorized precision meets architectural elegance.",
    href: "/products/exterior-shades",
    videoSrc: "/video/extshades.MOV",
  },
  {
    slug: "retractable-awnings",
    number: "02",
    category: "Awning",
    name: "Retractable Awnings",
    descriptor: "Shade on demand. Style without compromise.",
    href: "/products/retractable-awnings",
    videoSrc: "/video/homepageloop1.MP4",
  },
  {
    slug: "louvered-pergolas",
    number: "03",
    category: "Pergola",
    name: "Louvered Pergolas",
    descriptor: "Transform your outdoor space into a year-round retreat.",
    href: "/products/louvered-pergolas",
    videoSrc: "/video/whyitmatters.MOV",
  },
];

// ─── Video lightbox ───────────────────────────────────────────────────────────

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      key="video-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Product video"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10, 18, 22, 0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <motion.div
        key="video-panel"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "880px",
          background: "#07101A",
          border: "1px solid rgba(184,146,74,0.18)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,146,74,0.06)",
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close video"
          style={{
            position: "absolute",
            top: "-2.75rem",
            right: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "none",
            border: "none",
            color: "rgba(252,251,247,0.55)",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
            padding: "0.4rem 0",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,251,247,0.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,251,247,0.55)";
          }}
        >
          <X size={13} strokeWidth={1.5} />
          Close
        </button>

        {/* Video */}
        <div style={{ position: "relative", aspectRatio: "16/9" }}>
          <video
            autoPlay
            muted
            controls
            playsInline
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <source src={mediaSrc(src)} type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Play icon overlay ────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="rgba(252,251,247,0.9)" strokeWidth="1.5" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="rgba(252,251,247,0.9)" />
    </svg>
  );
}

// ─── Product accordion row ────────────────────────────────────────────────────

function ProductRow({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [open, setOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div
        className="border-b border-[var(--rich-sand)]"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen((v) => !v)}
      >
        {/* ── Row header ── */}
        <div className="flex items-center gap-6 py-7">
          <span
            className="hidden sm:block shrink-0 w-28 text-right"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.8rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
            }}
          >
            {product.number} / {product.category}
          </span>

          <div className="flex-1 min-w-0">
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 550,
                letterSpacing: "0.04em",
                color: "var(--ink-primary)",
                lineHeight: 1.15,
              }}
            >
              {product.name}
            </h3>
            <p
              className="mt-1"
              style={{ fontSize: "1.25rem", color: "var(--ink-muted)", lineHeight: 1.5 }}
            >
              {product.descriptor}
            </p>
          </div>

          {/* + rotates to × when open */}
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
            style={{ color: "var(--ink-muted)" }}
          >
            <Plus size={20} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* ── Expandable gallery ── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="gallery"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ overflow: "hidden" }}
            >
              {/* Stop row-toggle click from firing inside the gallery */}
              <div className="pb-8" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {GALLERY_IMAGES.map((img, i) => (
                    <motion.button
                      key={img.src}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: prefersReducedMotion ? 0 : i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative overflow-hidden group"
                      style={{ aspectRatio: "4/3", border: "none", padding: 0, background: "none" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoSrc(product.videoSrc);
                      }}
                      aria-label={`Watch ${product.name} video`}
                    >
                      {/* Thumbnail */}
                      <Image
                        src={assetPath(img.src)}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 33vw, 28vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Play overlay — always slightly visible, full on hover */}
                      <div
                        className="group-hover:opacity-100"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(14,26,31,0.42)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0.55,
                          transition: "opacity 0.22s",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: "rgba(14,26,31,0.55)",
                            border: "1.5px solid rgba(252,251,247,0.65)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <PlayIcon />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Explore link */}
                <div className="mt-5 flex justify-end">
                  <Link
                    href={product.href}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      color: "var(--rich-warm)",
                      textDecoration: "none",
                    }}
                  >
                    Explore {product.name} →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Video modal ── */}
      <AnimatePresence>
        {videoSrc && (
          <VideoModal src={videoSrc} onClose={() => setVideoSrc(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProductRowsTest() {
  return (
    <section
      id="products-expand"
      className="pt-4 pb-14 md:pt-6 md:pb-20"
      style={{ background: "var(--bg-pure)" }}
    >
      <Container>
        <SectionHeading
          eyebrow="Our Products"
          heading="Crafted for Florida living."
          subheading="Each product is custom-fabricated to your space, your style, and the Florida climate. Click once to see the product line — click a photo to watch it in action."
        />

        <div className="mt-8 border-t border-[var(--rich-sand)]">
          {PRODUCTS.map((product) => (
            <ProductRow key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
