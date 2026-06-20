"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { assetPath } from "@/lib/asset-path";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

// 720p H.264 re-encode (~45MB vs the 80MB 1080p source) for faster homepage
// load. Original kept at /video/homeheroloop.mp4 as a fallback.
const VIDEO_SRC = assetPath("/video/homeheroloop-720.mp4");
const POSTER_SRC = assetPath("/img/products/vidcover.jpeg");

export function HeroVideo() {
  const { openModal } = useConsultModal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{
        // Use the *small* viewport height so the hero stops at the address bar
        // instead of extending behind it (100svh = viewport with toolbars shown).
        height: "100svh",
        minHeight: "600px",
      }}
    >
      {/* Accessible, indexable page H1. Visually hidden so the cinematic video
          hero stays clean, but present for screen readers and search/AI crawlers. */}
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Luxury Outdoor Living in Florida — Louvered Pergolas, Retractable Awnings,
        Exterior Shades &amp; Shutters
      </h1>

      {/* Poster image — always present, prevents any flash before video plays */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${POSTER_SRC})` }}
        aria-hidden="true"
      />

      {/* Hero video — single looping file, poster shown by browser until playback starts */}
      {!prefersReducedMotion && (
        <video
          aria-hidden="true"
          autoPlay
          muted
          playsInline
          loop
          poster={POSTER_SRC}
          src={VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,26,31,0.25) 0%, rgba(14,26,31,0.25) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Scroll indicator — padded above home indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center"
        style={{
          zIndex: 2,
          paddingBottom:
            "calc(env(safe-area-inset-bottom) + clamp(1.5rem, 3vh, 2.5rem))",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <svg
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 11L21 1"
              stroke="rgba(252,251,247,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* CTA — padded above home indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center md:justify-start"
        style={{
          zIndex: 2,
          paddingBottom:
            "calc(env(safe-area-inset-bottom) + clamp(4rem, 10vh, 6rem))",
        }}
      >
        <div className="w-full md:max-w-7xl md:mx-auto px-4 sm:px-6 lg:px-8 flex justify-center md:justify-start">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <button
              onClick={() => openModal()}
              className="inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 sm:px-8 sm:py-4 whitespace-nowrap transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink-primary)]"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 450,
                fontSize: "clamp(0.82rem, 3.4vw, 1rem)",
                letterSpacing: "0.12em",
                background: "var(--ink-primary)",
                color: "var(--bg-pure)",
                border: "1px solid rgba(252, 251, 247, 0.65)",
              }}
            >
              Schedule a Consultation
            </button>

            {/* Subtle "or call us" line — gives form-averse visitors a direct path.
                Sits in a semi-opaque chip so it stays legible over the video and
                reads as a clear secondary path without becoming a second solid button. */}
            <p
              className="self-center text-center"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(0.82rem, 3vw, 0.95rem)",
                letterSpacing: "0.04em",
                color: "rgba(252, 251, 247, 0.95)",
                textShadow: "0 1px 8px rgba(14,26,31,0.45)",
                background: "rgba(14, 26, 31, 0.34)",
                border: "1px solid rgba(252, 251, 247, 0.28)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                padding: "0.5rem 1.1rem",
              }}
            >
              Prefer to talk?{" "}
              <a
                href={`tel:${PHONE_E164}`}
                className="whitespace-nowrap transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  color: "var(--bg-pure)",
                  fontWeight: 600,
                  borderBottom: "1px solid rgba(252,251,247,0.55)",
                  paddingBottom: "1px",
                }}
              >
                Call {PHONE_DISPLAY}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
