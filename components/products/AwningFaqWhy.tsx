"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AWNING_FAQS } from "@/components/products/awning-faqs";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FAQS = AWNING_FAQS;

export function AwningFaqWhy() {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      style={{
        background: "var(--near-black)",
        borderTop: "1px solid rgba(184,146,74,0.18)",
        padding: "5rem 0 5.5rem",
      }}
    >
      <Container>
        {/* FAQ accordion */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p
            style={{
              fontSize: "0.66rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(252,251,247,0.4)",
              marginBottom: "1.25rem",
            }}
          >
            Frequently Asked
          </p>

          <div style={{ borderTop: "1px solid rgba(184,146,74,0.18)" }}>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} style={{ borderBottom: "1px solid rgba(184,146,74,0.18)" }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.3rem 0.25rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.05rem, 1.7vw, 1.3rem)",
                        fontWeight: 500,
                        color: "rgba(252,251,247,0.94)",
                        lineHeight: 1.3,
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        color: "rgba(184,146,74,0.9)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <Plus size={18} strokeWidth={1.6} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontSize: "0.95rem",
                            lineHeight: 1.8,
                            color: "rgba(252,251,247,0.65)",
                            paddingBottom: "1.4rem",
                            paddingRight: "2rem",
                            maxWidth: "70ch",
                          }}
                        >
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>

    </section>
  );
}

export default AwningFaqWhy;
