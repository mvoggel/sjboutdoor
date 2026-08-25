"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { assetPath } from "@/lib/asset-path";
import {
  FABRICS,
  FABRIC_GROUPS,
  FRAME_FINISHES,
  VALANCES,
} from "@/app/experiments/retractable-awning/config";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const swatchUrl = (id: string) =>
  assetPath(`/experiments/retractable-awning/fabrics/${id}.png`);

export function AwningFabricGallery() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  // Horizontal nudge (px) applied to the active tooltip so edge-column swatches
  // don't push their label off-screen. Measured from the swatch's own tooltip.
  const [shift, setShift] = useState(0);

  const showTip = (el: HTMLElement, id: string) => {
    setActive(id);
    const tip = el.querySelector<HTMLElement>(".swatchTip");
    if (!tip) {
      setShift(0);
      return;
    }
    const rect = tip.getBoundingClientRect();
    const margin = 10;
    let s = 0;
    if (rect.left < margin) s = margin - rect.left;
    else if (rect.right > window.innerWidth - margin)
      s = window.innerWidth - margin - rect.right;
    setShift(Math.round(s));
  };

  return (
    <section
      style={{
        background: "var(--bg-pure)",
        borderTop: "1px solid var(--rich-sand)",
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
          style={{ marginBottom: "2.5rem", maxWidth: "56rem" }}
        >
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--rich-warm)",
              marginBottom: "1rem",
            }}
          >
            Color &amp; Fabric Options
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 550,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
              letterSpacing: "0.005em",
              marginBottom: "0.85rem",
            }}
          >
            Thirty in-stock Sunbrella fabrics. Hundreds more on request.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--ink-muted)",
              maxWidth: "62ch",
            }}
          >
            Every awning is wrapped in solution-dyed Sunbrella® acrylic — fade-, mold-, and
            mildew-resistant, and backed by a 10-year limited fabric warranty. Hover a swatch to
            see its name, or ask us about the 300+ custom fabrics not shown here.
          </p>
        </motion.div>

        {/* Swatch groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
          {FABRIC_GROUPS.map((group, gi) => {
            const swatches = FABRICS.filter((f) => f.group === group.id);
            return (
              <motion.div
                key={group.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: gi * 0.05, ease: EASE }}
              >
                <p
                  style={{
                    fontSize: "0.64rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginBottom: "0.95rem",
                  }}
                >
                  {group.label}
                </p>
                <div className="swatchWrap">
                  {swatches.map((f) => {
                    const isActive = active === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        className="swatchChip"
                        onMouseEnter={(e) => showTip(e.currentTarget, f.id)}
                        onMouseLeave={() => setActive((a) => (a === f.id ? null : a))}
                        onFocus={(e) => showTip(e.currentTarget, f.id)}
                        onBlur={() => setActive((a) => (a === f.id ? null : a))}
                        aria-label={`${f.name} — Sunbrella ${f.sku}`}
                      >
                        <span className="swatchCircle">
                          <Image
                            src={swatchUrl(f.id)}
                            alt={`${f.name} Sunbrella awning fabric`}
                            fill
                            sizes="56px"
                            style={{ objectFit: "cover" }}
                          />
                        </span>
                        <span
                          className="swatchTip"
                          aria-hidden="true"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive
                              ? `translate(calc(-50% + ${shift}px), 0)`
                              : "translate(-50%, 4px)",
                            ["--tip-shift" as string]: isActive ? `${shift}px` : "0px",
                          }}
                        >
                          <span className="swatchTipName">{f.name}</span>
                          <span className="swatchTipSku">Sunbrella {f.sku}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Frame finishes + valance */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="finishGrid"
        >
          <div>
            <p
              style={{
                fontSize: "0.64rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginBottom: "0.95rem",
              }}
            >
              Powder-Coated Frame Finishes
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
              {FRAME_FINISHES.map((fin) => (
                <span
                  key={fin.id}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "1.7rem",
                      height: "1.7rem",
                      borderRadius: "50%",
                      background: fin.hex,
                      border: "1px solid rgba(14,26,31,0.15)",
                      boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.25)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "0.95rem",
                      color: "var(--ink-primary)",
                    }}
                  >
                    {fin.name}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.64rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginBottom: "0.95rem",
              }}
            >
              Valance Profile
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {VALANCES.map((v) => (
                <span
                  key={v.id}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--rich-sand)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.88rem",
                    color: "var(--ink-primary)",
                    borderRadius: "999px",
                  }}
                >
                  {v.name}
                </span>
              ))}
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                }}
              >
                Both removable for easy cleaning
              </span>
            </div>
          </div>
        </motion.div>
      </Container>

      <style jsx>{`
        .swatchWrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }
        .swatchChip {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          line-height: 0;
        }
        .swatchCircle {
          position: relative;
          display: block;
          width: 3.25rem;
          height: 3.25rem;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(14, 26, 31, 0.12);
          box-shadow: 0 2px 6px rgba(14, 26, 31, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .swatchChip:hover .swatchCircle,
        .swatchChip:focus-visible .swatchCircle {
          transform: scale(1.12);
          box-shadow: 0 6px 16px rgba(14, 26, 31, 0.22);
          border-color: var(--rich-warm);
        }
        .swatchTip {
          position: absolute;
          bottom: calc(100% + 0.5rem);
          left: 50%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          padding: 0.5rem 0.75rem;
          background: var(--ink-primary);
          border-radius: 4px;
          white-space: nowrap;
          pointer-events: none;
          line-height: 1.2;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .swatchTip::after {
          content: "";
          position: absolute;
          top: 100%;
          /* Counter the tooltip's edge-nudge so the arrow stays on the swatch. */
          left: calc(50% - var(--tip-shift, 0px));
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--ink-primary);
        }
        .swatchTipName {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--bg-pure);
        }
        .swatchTipSku {
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(252, 251, 247, 0.6);
        }
        .finishGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 3rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--rich-sand);
        }
        @media (min-width: 768px) {
          .finishGrid {
            grid-template-columns: 1.2fr 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  );
}

export default AwningFabricGallery;
