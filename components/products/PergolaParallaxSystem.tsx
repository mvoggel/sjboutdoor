"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { assetPath } from "@/lib/asset-path";

export interface PergolaSystem {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  body: string;
  specs: string[];
  /** TODO: replace with system-specific photography when available. */
  image: string;
  theme: "light" | "dark";
}

interface ParallaxSystemProps {
  system: PergolaSystem;
  index: number;
  total: number;
}

export function PergolaParallaxSystem({ system, index, total }: ParallaxSystemProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax: image shifts y as section scrolls past viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-16%", "16%"]
  );
  // Content drifts in the opposite direction by a smaller amount for a subtle counter-parallax.
  const yText = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["6%", "-6%"]
  );

  const imageRight = index % 2 === 1;
  const isDark = system.theme === "dark";

  return (
    <section
      ref={ref}
      aria-labelledby={`system-${system.slug}`}
      style={{
        position: "relative",
        overflow: "hidden",
        background: isDark ? "var(--near-black)" : "var(--bg-pure)",
        borderTop: "1px solid rgba(184,146,74,0.18)",
      }}
    >
      <div
        className={`flex flex-col ${
          imageRight ? "md:flex-row-reverse" : "md:flex-row"
        } md:min-h-[88vh]`}
      >
        {/* ── Image column with parallax ───────────────────────────── */}
        <div
          className="relative w-full aspect-[4/3] md:aspect-auto md:w-[52%] overflow-hidden"
          style={{ minHeight: "60vh" }}
        >
          <motion.div
            style={{
              y: yImg,
              position: "absolute",
              top: "-16%",
              bottom: "-16%",
              left: 0,
              right: 0,
              willChange: "transform",
            }}
          >
            <Image
              src={assetPath(system.image)}
              alt={`${system.name} — ${system.category}`}
              fill
              sizes="(max-width: 768px) 100vw, 52vw"
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>

          {/* Tonal overlay so the same image can read differently per panel */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(135deg, rgba(13,13,13,0.55), rgba(13,13,13,0.18))"
                : "linear-gradient(135deg, rgba(14,26,31,0.22), rgba(14,26,31,0.04))",
              pointerEvents: "none",
            }}
          />

          {/* Gold corner rule */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "1.25rem",
              left: imageRight ? "auto" : "1.25rem",
              right: imageRight ? "1.25rem" : "auto",
              width: "44px",
              height: "1px",
              background: "rgba(184,146,74,0.6)",
            }}
          />

          {/* Numerical marker */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: imageRight ? "auto" : "1.25rem",
              right: imageRight ? "1.25rem" : "auto",
              padding: "0.3rem 0.85rem",
              border: "1px solid rgba(184,146,74,0.5)",
              background: "rgba(252,251,247,0.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(252,251,247,0.92)",
              whiteSpace: "nowrap",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* ── Content column with subtle counter-drift ─────────────── */}
        <div
          className="flex flex-col justify-center w-full md:w-[48%] px-6 py-14 md:px-14 md:py-20"
        >
          <motion.div
            style={{ y: yText }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: isDark ? "rgba(184,146,74,0.95)" : "var(--rich-warm)",
                marginBottom: "1rem",
              }}
            >
              {system.category}
            </p>
            <h3
              id={`system-${system.slug}`}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.1rem)",
                fontWeight: 550,
                letterSpacing: "0.005em",
                lineHeight: 1.05,
                color: isDark ? "rgba(252,251,247,0.96)" : "var(--ink-primary)",
                marginBottom: "0.85rem",
              }}
            >
              {system.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
                fontStyle: "italic",
                color: isDark ? "rgba(252,251,247,0.7)" : "var(--ink-muted)",
                lineHeight: 1.4,
                marginBottom: "1.25rem",
              }}
            >
              {system.tagline}
            </p>
            <div
              style={{
                width: "2.5rem",
                height: "1.5px",
                background: "var(--rich-warm)",
                opacity: isDark ? 0.85 : 0.7,
                marginBottom: "1.25rem",
              }}
            />
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: isDark ? "rgba(252,251,247,0.72)" : "var(--ink-muted)",
                maxWidth: "52ch",
                marginBottom: "1.75rem",
              }}
            >
              {system.body}
            </p>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0.55rem 1.5rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {system.specs.map((spec) => (
                <li
                  key={spec}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.55rem",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--rich-warm)",
                      flexShrink: 0,
                      marginTop: "0.6rem",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.45,
                      color: isDark ? "rgba(252,251,247,0.82)" : "var(--ink-primary)",
                    }}
                  >
                    {spec}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
