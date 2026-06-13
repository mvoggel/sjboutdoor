"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Headset, Truck, ShieldCheck, Gem, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WHY: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Headset,
    title: "Unmatched Support",
    body: "Local design, install, and service — one team that owns your project start to finish.",
  },
  {
    Icon: Truck,
    title: "Industry-Leading Speed",
    body: "Factory turnaround and delivery that's among the fastest in the awning industry.",
  },
  {
    Icon: Gem,
    title: "Exclusive Components",
    body: "Premium motors, hardware, and Sunbrella® fabric built to last in Florida's climate.",
  },
  {
    Icon: ShieldCheck,
    title: "10-Year Warranty",
    body: "Backed by a 10-year limited warranty on the awning, with manufacturer fabric coverage.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I maintain my awning?",
    a: "Very little is required. Retract the awning when it's not in use so the cassette can protect the fabric, and rinse the fabric occasionally with mild soap and water. Sunbrella® acrylic resists mold and mildew, so it stays cleaner longer than most outdoor fabrics.",
  },
  {
    q: "What does the warranty cover?",
    a: "Your awning carries a 10-year limited warranty, and the Sunbrella® fabric is covered by the manufacturer's own multi-year limited warranty against fading. We walk you through the specifics on your estimate so there are no surprises.",
  },
  {
    q: "How fast can it be installed?",
    a: "Turnaround is among the fastest in the industry. After your in-home measurement and fabric selection, your awning is custom-built and scheduled for a professional installation — typically completed in a single visit.",
  },
  {
    q: "What are my mounting options?",
    a: "Awnings can be mounted to the wall, the soffit, or the roofline using bay-mount or roof-mount brackets when needed. During your consultation we assess your structure and recommend the strongest, cleanest mounting method for your home.",
  },
  {
    q: "Does it work with smart home systems?",
    a: "Yes. Every awning is motorized, and with a Bond Bridge or Somfy TaHoma hub you can control it from your phone, set schedules, and use voice assistants like Alexa and Google Home. Add a wind sensor and it can retract automatically.",
  },
  {
    q: "What sizes are available?",
    a: "Awnings span widths from roughly 10 to 40 feet, with projections of 8, 10, or 12 feet. Because each one is custom-built to your measurements, we size it to your exact space rather than the nearest stock dimension.",
  },
  {
    q: "How does it handle weather?",
    a: "An awning is built for sun and light rain, not storms. EZ-Pitch lets you steepen the slope to shed water, and an optional wind sensor retracts it automatically in gusts. In severe weather, simply retract it into the protective cassette.",
  },
  {
    q: "Can I get a custom fabric?",
    a: "Absolutely. Beyond the 30 in-stock Sunbrella® fabrics, more than 300 additional colors, patterns, and stripes are available on request — so you can match your home's exact look.",
  },
];

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
        {/* Why us strip */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "1.75rem" }}
        >
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(184,146,74,0.9)",
              marginBottom: "0.9rem",
            }}
          >
            Why Choose Us
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 500,
              color: "rgba(252,251,247,0.96)",
              lineHeight: 1.15,
              letterSpacing: "0.005em",
            }}
          >
            Engineered well. Backed even better.
          </h2>
        </motion.div>

        <div className="whyGrid">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="whyCard"
            >
              <span aria-hidden="true" className="whyIcon">
                <w.Icon size={22} strokeWidth={1.4} />
              </span>
              <h3 className="whyTitle">{w.title}</h3>
              <p className="whyBody">{w.body}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ accordion */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginTop: "3.5rem" }}
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

      <style jsx>{`
        .whyGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(184, 146, 74, 0.18);
          border: 1px solid rgba(184, 146, 74, 0.18);
        }
        @media (min-width: 768px) {
          .whyGrid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .whyCard {
          background: var(--near-black);
          padding: 1.75rem 1.4rem;
          transition: background 0.25s ease;
        }
        .whyCard:hover {
          background: rgba(184, 146, 74, 0.05);
        }
        .whyIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          border: 1px solid rgba(184, 146, 74, 0.35);
          color: rgba(184, 146, 74, 0.95);
          margin-bottom: 1rem;
        }
        .whyTitle {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: rgba(252, 251, 247, 0.95);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .whyBody {
          font-size: 0.86rem;
          line-height: 1.65;
          color: rgba(252, 251, 247, 0.55);
        }
      `}</style>
    </section>
  );
}

export default AwningFaqWhy;
