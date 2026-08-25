"use client";

/**
 * ScreenMaterials — shared, data-driven building blocks for the retractable
 * motorized-screen product pages (Patio Screens, Garage Door Screens).
 *
 * Two exports, both rendered from a config object on each page:
 *   • ScreenSpecBand   — a compact "by the numbers" proof strip.
 *   • ScreenMeshExplorer — an interactive mesh + color + finish explorer.
 *       Selecting a mesh type updates a "view-through" preview (a CSS overlay
 *       over the page's backdrop image) plus its openness / UV / best-for copy,
 *       so visitors can *feel* the tradeoff between view, airflow, and shade.
 *
 * Specs and material facts are sourced from our two manufacturers —
 * Progressive Screens (patented MagnaTrack) and SunPro motorized screens.
 *
 * Visuals are pure CSS (no new image assets): mesh "weave" is rendered with
 * layered repeating-linear-gradients, and screen colors are flat / two-tone
 * swatches. Mobile collapses the explorer to a stacked, tap-friendly layout.
 */

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { assetPath } from "@/lib/asset-path";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Types ────────────────────────────────────────────────────────────────────
export type ScreenStat = { value: string; label: string };

export type MeshType = {
  /** Short display name, e.g. "Solar Mesh". */
  name: string;
  /** Vendor fabric tag, e.g. "Phifer SunTex 90". */
  fabric: string;
  /** Openness factor copy, e.g. "~5% open". */
  openness: string;
  /** UV / glare block copy, e.g. "Blocks up to 95% UV". */
  uv: string;
  /** One-line "best for" benefit. */
  blurb: string;
  /**
   * Visual density 0–1 used to drive the view-through overlay
   * (0 = barely-there insect mesh, 1 = near-opaque privacy / hurricane).
   */
  density: number;
};

export type ScreenColor = {
  name: string;
  /** Primary hex. */
  hex: string;
  /** Optional second hex for two-tone (e.g. Black/Tan) weaves. */
  hex2?: string;
};

export type ScreenFinish = { name: string; hex: string };

// ─── Shared material presets ────────────────────────────────────────────────────
/** Progressive / SunPro screen-mesh colors. Two-tone weaves carry a second hex. */
export const SCREEN_COLORS: ScreenColor[] = [
  { name: "Black", hex: "#1c1d1f" },
  { name: "Charcoal", hex: "#3f4347" },
  { name: "Bronze", hex: "#4a3b2a" },
  { name: "Granite", hex: "#6f6b63" },
  { name: "Black / Tan", hex: "#1c1d1f", hex2: "#b9a585" },
  { name: "White / Tan", hex: "#efe9dc", hex2: "#c9b896" },
  { name: "White", hex: "#f3efe6" },
];

/** Powder-coated housing & hardware finishes (Ivory not offered on awnings). */
export const HOUSING_FINISHES: ScreenFinish[] = [
  { name: "White", hex: "#f4f1ea" },
  { name: "Ivory", hex: "#e9e0cb" },
  { name: "Beige", hex: "#cdbfa6" },
  { name: "Bronze", hex: "#4a3c2c" },
  { name: "Black", hex: "#1d1e20" },
];

// ─── Spec band ────────────────────────────────────────────────────────────────
export function ScreenSpecBand({
  eyebrow,
  heading,
  intro,
  stats,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  stats: ScreenStat[];
}) {
  const reduced = useReducedMotion();
  return (
    <section style={{ background: "var(--near-black)", padding: "3.5rem 0 3.75rem" }}>
      <Container>
        {(eyebrow || heading || intro) && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: "2.25rem", maxWidth: "52ch" }}
          >
            {eyebrow && (
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "rgba(184,146,74,0.8)",
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
                  fontWeight: 550,
                  color: "rgba(252,251,247,0.96)",
                  lineHeight: 1.12,
                }}
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "rgba(252,251,247,0.55)",
                  marginTop: "0.85rem",
                }}
              >
                {intro}
              </p>
            )}
          </motion.div>
        )}

        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            gap: "1px",
            background: "rgba(184,146,74,0.22)",
            border: "1px solid rgba(184,146,74,0.22)",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              style={{
                background: "var(--near-black)",
                padding: "1.5rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)",
                  fontWeight: 550,
                  lineHeight: 1,
                  color: "var(--rich-warm)",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  lineHeight: 1.45,
                  color: "rgba(252,251,247,0.6)",
                }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Mesh "weave" + view-through preview ────────────────────────────────────────
/** Builds a layered CSS background that fakes a woven mesh at a given density. */
function meshOverlay(density: number): string {
  // Darker + tighter grid as density climbs.
  const alpha = 0.12 + density * 0.62; // 0.12 → 0.74
  const gap = `${Math.round(3 - density * 1.4)}px`; // looser → tighter weave
  const line = density > 0.85 ? "0.6px" : "0.5px";
  return [
    `repeating-linear-gradient(0deg, rgba(12,18,16,${alpha}) 0, rgba(12,18,16,${alpha}) ${line}, transparent ${line}, transparent ${gap})`,
    `repeating-linear-gradient(90deg, rgba(12,18,16,${alpha}) 0, rgba(12,18,16,${alpha}) ${line}, transparent ${line}, transparent ${gap})`,
    `linear-gradient(rgba(12,18,16,${density * 0.22}), rgba(12,18,16,${density * 0.22}))`,
  ].join(",");
}

export function ScreenMeshExplorer({
  eyebrow,
  heading,
  intro,
  backdropSrc,
  backdropAlt,
  meshTypes,
  colors,
  finishes,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** Image shown "behind" the mesh in the view-through preview. */
  backdropSrc: string;
  backdropAlt?: string;
  meshTypes: MeshType[];
  colors: ScreenColor[];
  finishes: ScreenFinish[];
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const mesh = meshTypes[active];

  return (
    <section style={{ background: "var(--bg-pure)", borderTop: "1px solid var(--rich-sand)", padding: "5rem 0 5.5rem" }}>
      <Container>
        {/* Header */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "2.75rem", maxWidth: "60ch" }}
        >
          {eyebrow && (
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--rich-warm)", marginBottom: "1rem" }}>
              {eyebrow}
            </p>
          )}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 550,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
              marginBottom: intro ? "0.85rem" : 0,
            }}
          >
            {heading}
          </h2>
          {intro && (
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-muted)", maxWidth: "62ch" }}>
              {intro}
            </p>
          )}
        </motion.div>

        {/* Mesh explorer — preview (left) + selectable list (right) */}
        <div className="sm-explorer">
          {/* View-through preview */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="sm-preview"
          >
            <Image
              src={assetPath(backdropSrc)}
              alt={backdropAlt ?? "View through the screen mesh"}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              style={{ objectFit: "cover" }}
            />
            {/* Animated mesh overlay — only the right portion is "screened" so
                visitors can compare screened vs. open view side by side. */}
            <motion.span
              aria-hidden
              className="sm-mesh"
              animate={{ background: meshOverlay(mesh.density) }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <span aria-hidden className="sm-divider" />
            <span className="sm-tag sm-tag-open">Open view</span>
            <span className="sm-tag sm-tag-screened">{mesh.name}</span>
          </motion.div>

          {/* Mesh selector */}
          <div className="sm-meshlist" role="tablist" aria-label="Mesh types">
            {meshTypes.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.name}
                  role="tab"
                  aria-selected={on}
                  className="sm-meshrow"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    borderColor: on ? "var(--rich-warm)" : "rgba(184,146,74,0.22)",
                    background: on ? "rgba(184,146,74,0.06)" : "transparent",
                  }}
                >
                  <span className="sm-meshrow-top">
                    <span
                      className="sm-meshname"
                      style={{ color: on ? "var(--rich-warm)" : "var(--ink-primary)" }}
                    >
                      {m.name}
                    </span>
                    <span className="sm-meshfabric">{m.fabric}</span>
                  </span>
                  <span className="sm-meshblurb">{m.blurb}</span>
                  <span className="sm-meshmeta">
                    <span>{m.openness}</span>
                    <span aria-hidden>·</span>
                    <span>{m.uv}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Colors + finishes */}
        <div className="sm-finishgrid">
          <div>
            <p className="sm-sublabel">Screen Mesh Colors</p>
            <div className="sm-swatchwrap">
              {colors.map((c) => (
                <span key={c.name} className="sm-swatch-item">
                  <span
                    aria-hidden
                    className="sm-swatch"
                    style={{
                      background: c.hex2
                        ? `repeating-linear-gradient(45deg, ${c.hex} 0, ${c.hex} 4px, ${c.hex2} 4px, ${c.hex2} 8px)`
                        : c.hex,
                    }}
                  />
                  <span className="sm-swatch-name">{c.name}</span>
                </span>
              ))}
            </div>
            <p className="sm-note">Mesh availability varies by fabric line. Two-tone weaves read one color from inside, another from the street.</p>
          </div>

          <div>
            <p className="sm-sublabel">Powder-Coated Housing &amp; Track</p>
            <div className="sm-swatchwrap">
              {finishes.map((f) => (
                <span key={f.name} className="sm-swatch-item">
                  <span
                    aria-hidden
                    className="sm-swatch sm-swatch-finish"
                    style={{ background: f.hex }}
                  />
                  <span className="sm-swatch-name">{f.name}</span>
                </span>
              ))}
            </div>
            <p className="sm-note">Anti-corrosion cassette and side tracks, color-matched to blend into your trim, beam, or door.</p>
          </div>
        </div>
      </Container>

      {/* Plain (non-scoped) <style> — styled-jsx class scoping does not reliably
          apply to framer-motion elements (.sm-preview / .sm-mesh / .sm-tag),
          so aspect-ratio and overlay positioning would silently drop. All
          selectors are `sm-` prefixed to avoid global collisions. */}
      <style>{`
        .sm-explorer {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: stretch;
        }
        .sm-preview {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          overflow: hidden;
          border-radius: 4px;
          background: var(--rich-sand);
          isolation: isolate;
        }
        .sm-mesh {
          position: absolute;
          inset: 0;
          left: 50%;
          z-index: 2;
          pointer-events: none;
        }
        .sm-divider {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          z-index: 3;
          background: rgba(252, 251, 247, 0.65);
          box-shadow: 0 0 0 1px rgba(12, 18, 16, 0.2);
        }
        .sm-tag {
          position: absolute;
          bottom: 0.85rem;
          z-index: 4;
          padding: 0.32rem 0.7rem;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: var(--font-cormorant), Georgia, serif;
          background: rgba(252, 251, 247, 0.92);
          color: var(--ink-primary);
        }
        .sm-tag-open {
          left: 0.85rem;
        }
        .sm-tag-screened {
          right: 0.85rem;
          background: var(--ink-primary);
          color: var(--bg-pure);
        }
        .sm-meshlist {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .sm-meshrow {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          text-align: left;
          padding: 0.95rem 1.1rem;
          border: 1px solid rgba(184, 146, 74, 0.22);
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .sm-meshrow-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .sm-meshname {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.1;
          transition: color 0.2s ease;
        }
        .sm-meshfabric {
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-muted);
          white-space: nowrap;
        }
        .sm-meshblurb {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--ink-muted);
        }
        .sm-meshmeta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--rich-warm);
        }
        .sm-finishgrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          margin-top: 3rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--rich-sand);
        }
        .sm-sublabel {
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 1.1rem;
        }
        .sm-swatchwrap {
          display: flex;
          flex-wrap: wrap;
          gap: 1.1rem 1.35rem;
        }
        .sm-swatch-item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 3.6rem;
        }
        .sm-swatch {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50%;
          border: 1px solid rgba(14, 26, 31, 0.14);
          box-shadow: 0 2px 6px rgba(14, 26, 31, 0.1);
        }
        .sm-swatch-finish {
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.22), 0 2px 6px rgba(14, 26, 31, 0.1);
        }
        .sm-swatch-name {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.8rem;
          line-height: 1.15;
          text-align: center;
          color: var(--ink-primary);
        }
        .sm-note {
          font-size: 0.8rem;
          line-height: 1.55;
          color: var(--ink-muted);
          margin-top: 1.1rem;
          max-width: 46ch;
        }
        @media (min-width: 768px) {
          .sm-explorer {
            grid-template-columns: 1.15fr 1fr;
            gap: 2.25rem;
          }
          .sm-finishgrid {
            grid-template-columns: 1.1fr 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
