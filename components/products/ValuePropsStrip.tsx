"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

export type ValueProp = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type ValuePropsStripProps = {
  eyebrow?: string;
  heading?: string;
  items: ValueProp[];
};

/**
 * Short, icon-led value props. Renders a responsive row (2-up mobile,
 * up-to-4-up desktop) with a hairline gold divider between cells on desktop.
 */
export function ValuePropsStrip({ eyebrow, heading, items }: ValuePropsStripProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="py-14 md:py-20"
      style={{ background: "var(--bg-pure)", borderTop: "1px solid var(--rich-sand)" }}
    >
      <Container>
        {(eyebrow || heading) && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "2.75rem", maxWidth: "46ch" }}
          >
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
            {heading && (
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.1,
                }}
              >
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "0" }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="value-prop-cell py-5 pr-4 sm:px-6 lg:px-7"
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.6rem",
                    height: "2.6rem",
                    borderRadius: "50%",
                    border: "1px solid rgba(184,146,74,0.35)",
                    background: "rgba(184,146,74,0.05)",
                    color: "var(--rich-warm)",
                    marginBottom: "1.1rem",
                  }}
                >
                  <Icon size={20} strokeWidth={1.4} />
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--ink-muted)",
                    maxWidth: "30ch",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <style jsx>{`
        /* Vertical gold hairline dividers between cells, per breakpoint.
           2-up on mobile: divider before the 2nd cell in each pair.
           4-up on desktop: divider before cells 2,3,4 of each row. */
        .value-prop-cell {
          position: relative;
        }
        .value-prop-cell:nth-child(2n)::before {
          content: "";
          position: absolute;
          left: 0;
          top: 1.25rem;
          bottom: 1.25rem;
          width: 1px;
          background: rgba(184, 146, 74, 0.18);
        }
        @media (min-width: 1024px) {
          .value-prop-cell:nth-child(2n)::before {
            display: none;
          }
          .value-prop-cell:not(:nth-child(4n + 1))::before {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 1.25rem;
            bottom: 1.25rem;
            width: 1px;
            background: rgba(184, 146, 74, 0.18);
          }
        }
      `}</style>
    </section>
  );
}

export default ValuePropsStrip;
