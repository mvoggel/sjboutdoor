"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lightbulb, SlidersHorizontal, Box, Radio, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Standard premium features (collapsed teaser + expandable detail) ─────────
type Feature = {
  id: string;
  Icon: LucideIcon;
  title: string;
  teaser: string;
  body: string;
  spec: string;
};

const FEATURES: Feature[] = [
  {
    id: "led",
    Icon: Lightbulb,
    title: "Built-In Dimmable LED Lights",
    teaser: "Remote-controlled ambiance, hidden in the arms.",
    body: "A standard feature on every awning — warm LED lights are engineered cleverly into the folding arms, so there are no cords, posts, or fixtures to add. Dim them up for an evening gathering or down to a subtle glow, all from the same wireless remote that drives the awning.",
    spec: "Standard · Remote dimmable",
  },
  {
    id: "pitch",
    Icon: SlidersHorizontal,
    title: "EZ-Pitch Adjustment",
    teaser: "Dial in the exact slope yourself — no service call.",
    body: "Adjust the pitch of your awning at any time using the included crank to turn the pitch pin on either side. Steepen it to shed an afternoon shower, or flatten it for maximum overhead shade. You stay in control of the angle without ever waiting on a technician.",
    spec: "Owner-adjustable both sides",
  },
  {
    id: "cassette",
    Icon: Box,
    title: "Integrated Cassette Housing",
    teaser: "The fabric folds fully away, protected from the elements.",
    body: "When retracted, the fabric and arms fold completely inside a sleek aluminum cassette that shields them from UV, rain, salt air, and debris. It dramatically extends fabric life, keeps the awning looking new, and leaves a clean architectural profile against your home when it's closed.",
    spec: "Fully enclosed · Weather-sealed",
  },
  {
    id: "motor",
    Icon: Radio,
    title: "Motorized with Wireless Remote",
    teaser: "Extend, stop anywhere, or retract at the touch of a button.",
    body: "Every awning is motorized and operated by a wireless remote — extend it fully, stop it at any midpoint, or retract it completely on your schedule. Add a wind sensor or smart-home hub and it can even respond to weather and voice commands automatically.",
    spec: "Standard · Smart-home ready",
  },
];

// ─── Awning styles (from \"Our Motorized Awnings\") ─────────────────────────────
const STYLES: { name: string; note: string; body: string }[] = [
  {
    name: "Traditional",
    note: "Folding-Arm",
    body: "The classic retractable — strong folding arms reach out over patios and decks for wide, post-free shade.",
  },
  {
    name: "Cross Arm",
    note: "Compact Projection",
    body: "A space-savvy arm design for windows, doors, and tighter façades where a steeper, controlled drop is ideal.",
  },
  {
    name: "Custom Built",
    note: "Made to Measure",
    body: "Built to your exact dimensions, style, and functionality — for spaces a standard size simply can't cover.",
  },
];

export function AwningPremiumFeatures() {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState<string | null>("led");

  return (
    <section
      style={{
        background: "var(--near-black)",
        borderTop: "1px solid rgba(184,146,74,0.18)",
        padding: "5rem 0 5.5rem",
      }}
    >
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "2.75rem", maxWidth: "52rem" }}
        >
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(184,146,74,0.9)",
              marginBottom: "1rem",
            }}
          >
            Customizable Features You'll Love
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 500,
              color: "rgba(252,251,247,0.96)",
              lineHeight: 1.15,
              letterSpacing: "0.005em",
              marginBottom: "0.9rem",
            }}
          >
            Premium features. No extra charge.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(252,251,247,0.55)",
              maxWidth: "60ch",
            }}
          >
            Tap any feature to see how it works. Each one ships standard on every awning we
            build — refined comfort, custom built to your exact space.
          </p>
        </motion.div>

        {/* Expandable feature rows */}
        <div
          style={{
            borderTop: "1px solid rgba(184,146,74,0.18)",
          }}
        >
          {FEATURES.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <motion.div
                key={f.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                style={{ borderBottom: "1px solid rgba(184,146,74,0.18)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  className="featRow"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.6rem 0.25rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="featIcon"
                    style={{
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      border: "1px solid rgba(184,146,74,0.35)",
                      background: isOpen ? "rgba(184,146,74,0.12)" : "transparent",
                      color: "rgba(184,146,74,0.95)",
                      transition: "background 0.25s",
                    }}
                  >
                    <f.Icon size={20} strokeWidth={1.5} />
                  </span>

                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                        fontWeight: 500,
                        color: "rgba(252,251,247,0.96)",
                        lineHeight: 1.2,
                      }}
                    >
                      {f.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: "0.2rem",
                        fontSize: "0.9rem",
                        color: "rgba(252,251,247,0.5)",
                      }}
                    >
                      {f.teaser}
                    </span>
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
                    <Plus size={20} strokeWidth={1.6} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          paddingLeft: "4.25rem",
                          paddingRight: "1rem",
                          paddingBottom: "1.75rem",
                          maxWidth: "62ch",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.97rem",
                            lineHeight: 1.8,
                            color: "rgba(252,251,247,0.7)",
                            marginBottom: "1rem",
                          }}
                        >
                          {f.body}
                        </p>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "0.66rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(184,146,74,0.9)",
                            border: "1px solid rgba(184,146,74,0.3)",
                            padding: "0.4rem 0.85rem",
                            borderRadius: "999px",
                          }}
                        >
                          {f.spec}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Awning styles row */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginTop: "3.25rem" }}
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
            Three Ways to Build It
          </p>
          <div className="styleGrid">
            {STYLES.map((s) => (
              <div
                key={s.name}
                className="styleCard"
                style={{
                  border: "1px solid rgba(184,146,74,0.2)",
                  padding: "1.5rem 1.5rem 1.75rem",
                  transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.4rem",
                      fontWeight: 500,
                      color: "rgba(252,251,247,0.95)",
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(184,146,74,0.85)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.note}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "rgba(252,251,247,0.55)",
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>

      <style jsx>{`
        .featRow:hover .featIcon {
          background: rgba(184, 146, 74, 0.12);
        }
        .styleGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        @media (min-width: 768px) {
          .styleGrid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .styleCard:hover {
          border-color: rgba(184, 146, 74, 0.5);
          background: rgba(184, 146, 74, 0.04);
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}

export default AwningPremiumFeatures;
