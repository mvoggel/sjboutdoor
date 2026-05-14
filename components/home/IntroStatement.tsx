"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const STATEMENT =
  "For over three decades, South Jersey Blinds has set the standard for custom craftsmanship. Now we're bringing that same uncompromising attention to detail - and a deep love of the outdoors - to Florida's most discerning homeowners.";

export function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  const words = STATEMENT.split(" ");

  return (
    <section
      className="py-14 md:py-20 overflow-hidden"
      style={{ background: "var(--bg-pure)" }}
    >
      <Container>
        <div ref={ref} className="max-w-4xl mx-auto text-center">

          {/* Section title — moves here from the old hero H1 */}
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.0rem, 4.5vw, 4.0rem)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-primary)",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Outdoor Living, Refined.
          </motion.h2>

          {/* Brass rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mb-10 origin-left"
            style={{ height: "1px", width: "3rem", background: "var(--rich-warm)" }}
          />

          {/* Word-by-word reveal */}
          <p
            aria-label={STATEMENT}
            className="leading-relaxed"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.15rem, 1.8vw, 1.65rem)",
              fontWeight: 400,
              color: "var(--ink-muted)",
              letterSpacing: "-0.01em",
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: prefersReducedMotion ? 0 : 0.5 + i * 0.028,
                }}
                className="inline-block mr-[0.27em]"
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Closing brass rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: prefersReducedMotion ? 0 : 0.4 + words.length * 0.028,
            }}
            className="mx-auto mt-10 origin-right"
            style={{ height: "1px", width: "3rem", background: "var(--rich-warm)" }}
          />
        </div>
      </Container>
    </section>
  );
}
