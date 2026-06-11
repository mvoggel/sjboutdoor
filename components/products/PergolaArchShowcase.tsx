"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Snowflake, Wind, X, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { assetPath } from "@/lib/asset-path";
import {
  PERGOLA_SYSTEMS,
  type PergolaSystem,
  type PergolaSwatch,
} from "./pergola-systems";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const ARCH = "120px"; // arch corner radius

type ShowcaseProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function PergolaArchShowcase({
  eyebrow = "The Collection",
  title = "Six systems. One standard of craftsmanship.",
  intro = "They share aluminum bones and Azenco engineering — but each is built for a different way of living outdoors. Select a system to explore its details.",
}: ShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const systems = PERGOLA_SYSTEMS;
  const open = systems.find((s) => s.slug === openSlug) ?? null;

  // Lock body scroll while the mobile sheet is up.
  useEffect(() => {
    if (!openSlug) return;
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openSlug]);

  // Escape closes.
  useEffect(() => {
    if (!openSlug) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenSlug(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSlug]);

  // Desktop arch: left column = first 3 systems, right column = last 3.
  const rows = [0, 1, 2].map((r) => ({
    left: systems[r],
    right: systems[r + 3],
  }));

  return (
    <section
      id="systems"
      style={{
        background: "var(--bg-pure)",
        borderTop: "1px solid var(--rich-sand)",
        padding: "5rem 0 5.5rem",
      }}
    >
      <Container>
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
          style={{ marginBottom: "2.75rem" }}
        >
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--rich-warm)",
              marginBottom: "1.25rem",
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
              fontWeight: 500,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
              letterSpacing: "0.005em",
              marginBottom: "1rem",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--ink-muted)",
              maxWidth: "62ch",
            }}
          >
            {intro}
          </p>
        </motion.div>

        {/* ── Desktop arch grid (collapses into an in-flow detail box) ─ */}
        <div className="archDesktop">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key={`detail-${open.slug}`}
                className="archDetailFlow"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.99, y: 8 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <DetailContent system={open} onClose={() => setOpenSlug(null)} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="archGrid">
                  {rows.map((row, r) => (
                    <div key={r} className="archRow" style={{ display: "contents" }}>
                      <GutterLabel
                        system={row.left}
                        align="right"
                        onOpen={() => setOpenSlug(row.left.slug)}
                      />
                      <Tile
                        system={row.left}
                        corner={r === 0 ? "tl" : undefined}
                        onOpen={() => setOpenSlug(row.left.slug)}
                        reduced={!!prefersReducedMotion}
                      />
                      <Tile
                        system={row.right}
                        corner={r === 2 ? "br" : undefined}
                        onOpen={() => setOpenSlug(row.right.slug)}
                        reduced={!!prefersReducedMotion}
                      />
                      <GutterLabel
                        system={row.right}
                        align="left"
                        onOpen={() => setOpenSlug(row.right.slug)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile alternating cards ───────────────────────────── */}
        <div className="archMobile">
          {systems.map((s, i) => (
            <MobileCard
              key={s.slug}
              system={s}
              flip={i % 2 === 1}
              corner={i === 0 ? "tl" : i === systems.length - 1 ? "br" : undefined}
              onOpen={() => setOpenSlug(s.slug)}
              reduced={!!prefersReducedMotion}
            />
          ))}
        </div>
      </Container>

      {/* ── Mobile detail sheet (fixed) ──────────────────────────── */}
      <div className="mobileSheetWrap">
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="sheetBackdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpenSlug(null)}
              />
              <motion.div
                className="sheetPanel"
                initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
                animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
                transition={{ duration: 0.4, ease: EASE }}
                role="dialog"
                aria-modal="true"
                aria-label={`${open.name} details`}
              >
                <DetailContent system={open} onClose={() => setOpenSlug(null)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .archDesktop {
          display: none;
        }
        .archMobile {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mobileSheetWrap {
          display: block;
        }
        @media (min-width: 1024px) {
          .archDesktop {
            display: block;
            position: relative;
          }
          .archMobile {
            display: none;
          }
          .mobileSheetWrap {
            display: none;
          }
        }
        .archGrid {
          display: grid;
          grid-template-columns:
            minmax(150px, 1fr)
            minmax(0, 2.5fr)
            minmax(0, 2.5fr)
            minmax(150px, 1fr);
          gap: 10px;
          align-items: stretch;
        }
      `}</style>

      {/* Detail-box arch shape (reads ARCH constant) */}
      <style jsx>{`
        :global(.archDetailFlow) {
          position: relative;
          min-height: 480px;
          background: var(--bg-pure);
          border: 1px solid rgba(184, 146, 74, 0.25);
          border-top-left-radius: ${ARCH};
          border-bottom-right-radius: ${ARCH};
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(14, 26, 31, 0.12);
        }
        /* motion.div elements aren't auto-scoped by styled-jsx — use :global */
        :global(.sheetBackdrop) {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: rgba(7, 12, 14, 0.55);
        }
        :global(.sheetPanel) {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          top: 4.5rem;
          z-index: 91;
          background: var(--bg-pure);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}

// ─── Desktop gutter label ────────────────────────────────────────────────────
function GutterLabel({
  system,
  align,
  onOpen,
}: {
  system: PergolaSystem;
  align: "left" | "right";
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="gutterLabel"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: align === "right" ? "flex-end" : "flex-start",
        textAlign: align,
        gap: "0.4rem",
        padding: align === "right" ? "0 1.25rem 0 0" : "0 0 0 1.25rem",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.3rem, 1.9vw, 1.9rem)",
          fontWeight: 600,
          letterSpacing: "0.01em",
          lineHeight: 1.05,
          color: "var(--ink-primary)",
        }}
      >
        {system.name}
      </span>
      <span
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          lineHeight: 1.3,
          maxWidth: "16ch",
        }}
      >
        {system.category}
      </span>
    </button>
  );
}

// ─── Hover-outline tile ──────────────────────────────────────────────────────
const outlineVariants: Variants = {
  rest: { pathLength: 0, opacity: 0 },
  hover: { pathLength: 1, opacity: 1 },
};
const hintVariants: Variants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0 },
};

function Tile({
  system,
  corner,
  onOpen,
  reduced,
}: {
  system: PergolaSystem;
  corner?: "tl" | "br";
  onOpen: () => void;
  reduced: boolean;
}) {
  const radius =
    corner === "tl"
      ? { borderTopLeftRadius: ARCH }
      : corner === "br"
      ? { borderBottomRightRadius: ARCH }
      : undefined;
  const outlineRx = corner === "tl" || corner === "br" ? 18 : 2;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Explore ${system.name} — ${system.category}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      className="tile"
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        border: "none",
        padding: 0,
        cursor: "pointer",
        background: "var(--rich-sand)",
        ...radius,
      }}
    >
      <Image
        src={assetPath(system.image)}
        alt={`${system.name} — ${system.category}`}
        fill
        sizes="(max-width: 1024px) 0px, 36vw"
        style={{ objectFit: "cover" }}
      />
      {/* Tonal hover wash */}
      <motion.span
        aria-hidden="true"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(14,26,31,0) 40%, rgba(14,26,31,0.45) 100%)",
        }}
      />
      {/* Drawn outline */}
      <svg
        className="tileOutline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <motion.rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx={outlineRx}
          fill="none"
          stroke="var(--rich-warm)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          variants={outlineVariants}
          transition={{
            pathLength: { duration: reduced ? 0 : 0.6, ease: EASE },
            opacity: { duration: 0.15 },
          }}
        />
      </svg>
      {/* Explore hint */}
      <motion.span
        variants={hintVariants}
        transition={{ duration: 0.25, ease: EASE }}
        style={{
          position: "absolute",
          bottom: "0.9rem",
          right: "0.9rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.35rem 0.7rem",
          background: "rgba(252,251,247,0.92)",
          color: "var(--ink-primary)",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <Plus size={12} strokeWidth={1.6} />
        Explore
      </motion.span>
    </motion.button>
  );
}

// ─── Mobile alternating card ─────────────────────────────────────────────────
function MobileCard({
  system,
  flip,
  corner,
  onOpen,
  reduced,
}: {
  system: PergolaSystem;
  flip: boolean;
  corner?: "tl" | "br";
  onOpen: () => void;
  reduced: boolean;
}) {
  const radius =
    corner === "tl"
      ? { borderTopLeftRadius: "64px" }
      : corner === "br"
      ? { borderBottomRightRadius: "64px" }
      : undefined;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Explore ${system.name} — ${system.category}`}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{
        display: "flex",
        flexDirection: flip ? "row-reverse" : "row",
        alignItems: "stretch",
        width: "100%",
        minHeight: "118px",
        border: "1px solid rgba(184,146,74,0.22)",
        background: "var(--bg-pure)",
        padding: 0,
        cursor: "pointer",
        overflow: "hidden",
        ...radius,
      }}
    >
      <div
        style={{
          position: "relative",
          flex: "0 0 52%",
          minHeight: "118px",
          overflow: "hidden",
          ...radius,
        }}
      >
        <Image
          src={assetPath(system.image)}
          alt={`${system.name} — ${system.category}`}
          fill
          sizes="52vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.35rem",
          padding: "1rem 1.1rem",
          textAlign: flip ? "right" : "left",
          alignItems: flip ? "flex-end" : "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--ink-primary)",
            lineHeight: 1.05,
          }}
        >
          {system.name}
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            lineHeight: 1.3,
          }}
        >
          {system.category}
        </span>
        <span
          style={{
            marginTop: "0.35rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--rich-warm)",
          }}
        >
          <Plus size={11} strokeWidth={1.8} />
          Tap to explore
        </span>
      </div>
    </motion.button>
  );
}

// ─── Expanded detail content (shared desktop overlay + mobile sheet) ──────────
function DetailContent({
  system,
  onClose,
}: {
  system: PergolaSystem;
  onClose: () => void;
}) {
  return (
    <div className="detailRoot">
      {/* Close */}
      <button onClick={onClose} aria-label="Close" className="detailClose">
        <X size={20} strokeWidth={1.5} />
      </button>

      {/* Header */}
      <div className="detailHead">
        <h3
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 600,
            color: "var(--ink-primary)",
            lineHeight: 1.05,
          }}
        >
          {system.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "var(--rich-warm)",
            marginTop: "0.25rem",
          }}
        >
          — {system.category}
        </p>
      </div>

      {/* Two-column intro + image */}
      <div className="detailGrid">
        <div className="detailIntro">
          {system.intro.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--ink-muted)",
                marginBottom: "0.9rem",
              }}
            >
              {para}
            </p>
          ))}

          {system.stats && system.stats.length > 0 && (
            <div className="statRow">
              {system.stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <span className="statIcon" aria-hidden="true">
                    {stat.kind === "snow" ? (
                      <Snowflake size={18} strokeWidth={1.5} />
                    ) : (
                      <Wind size={18} strokeWidth={1.5} />
                    )}
                  </span>
                  <span>
                    <span className="statLabel">{stat.label}</span>
                    <span className="statValue">{stat.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {system.editions && system.editions.length > 0 && (
            <div className="editionRow">
              {system.editions.map((ed) => (
                <div key={ed.name} className="editionChip">
                  <span className="editionName">{ed.name}</span>
                  {ed.detail && <span className="editionDetail">{ed.detail}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="detailMediaCol">
          <div className="detailImage">
            <Image
              src={assetPath(system.image)}
              alt={`${system.name} — ${system.category}`}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {system.colorGroups && system.colorGroups.length > 0 && (
            <div className="colorBlock">
              {system.colorGroups.map((group, gi) => (
                <div key={gi} className="colorGroup">
                  {(group.label || group.note) && (
                    <div className="colorGroupHead">
                      {group.label && <span className="colorGroupLabel">{group.label}</span>}
                      {group.note && <span className="colorGroupNote">{group.note}</span>}
                    </div>
                  )}
                  <div className="swatchRow">
                    {group.swatches.map((sw) => (
                      <Swatch key={sw.name} sw={sw} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Feature groups */}
      {system.featureGroups && system.featureGroups.length > 0 && (
        <div className="featureGrid">
          {system.featureGroups.map((g) => (
            <div key={g.heading}>
              <p className="featureHeading">{g.heading}</p>
              <ul className="featureList">
                {g.items.map((it) => (
                  <li key={it}>
                    <span className="dot" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Configurations */}
      {system.configurations && system.configurations.length > 0 && (
        <div className="configBlock">
          <p className="featureHeading">Configurations</p>
          <div className="configRow">
            {system.configurations.map((c) => (
              <span key={c} className="configChip">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .detailRoot {
          position: relative;
          height: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 2.25rem 1.5rem 2.5rem;
        }
        @media (min-width: 1024px) {
          .detailRoot {
            padding: 2.75rem 3rem 3rem;
          }
        }
        .detailClose {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          border: 1px solid rgba(184, 146, 74, 0.4);
          background: var(--bg-pure);
          color: var(--ink-primary);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .detailClose:hover {
          background: var(--ink-primary);
          color: var(--bg-pure);
        }
        .detailHead {
          margin-bottom: 1.75rem;
          padding-right: 3rem;
        }
        .detailGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 900px) {
          .detailGrid {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 2.75rem;
            align-items: start;
          }
        }
        .statRow {
          display: flex;
          flex-wrap: wrap;
          gap: 1.75rem;
          margin-top: 1.25rem;
        }
        .stat {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .statIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          border: 1px solid rgba(184, 146, 74, 0.35);
          background: rgba(184, 146, 74, 0.05);
          color: var(--rich-warm);
          flex-shrink: 0;
        }
        .statLabel {
          display: block;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ink-primary);
          line-height: 1.2;
        }
        .statValue {
          display: block;
          font-size: 0.8rem;
          color: var(--ink-muted);
        }
        .editionRow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .editionChip {
          padding: 0.6rem 0.95rem;
          border: 1px solid rgba(184, 146, 74, 0.3);
          background: rgba(184, 146, 74, 0.04);
        }
        .editionName {
          display: block;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink-primary);
          line-height: 1.2;
        }
        .editionDetail {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-top: 0.15rem;
        }
        .detailMediaCol {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .detailImage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-top-left-radius: 64px;
          border: 1px solid rgba(184, 146, 74, 0.2);
        }
        .colorBlock {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .colorGroupHead {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
        }
        .colorGroupLabel {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ink-primary);
        }
        .colorGroupNote {
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--ink-muted);
        }
        .swatchRow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem 1.1rem;
        }
        .featureGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.5rem 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(184, 146, 74, 0.22);
        }
        .featureHeading {
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--rich-warm);
          margin-bottom: 0.85rem;
          font-weight: 600;
        }
        .featureList {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .featureList li {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.95rem;
          line-height: 1.4;
          color: var(--ink-primary);
        }
        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--rich-warm);
          flex-shrink: 0;
          margin-top: 0.55rem;
        }
        .configBlock {
          margin-top: 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(184, 146, 74, 0.22);
        }
        .configRow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .configChip {
          padding: 0.5rem 1rem;
          border: 1px solid rgba(184, 146, 74, 0.35);
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 0.85rem;
          color: var(--ink-primary);
          background: rgba(184, 146, 74, 0.03);
        }
      `}</style>
    </div>
  );
}

// ─── Color swatch chip ───────────────────────────────────────────────────────
function Swatch({ sw }: { sw: PergolaSwatch }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        aria-hidden="true"
        style={{
          width: "1.6rem",
          height: "1.6rem",
          borderRadius: "50%",
          background: sw.custom ? "transparent" : sw.swatch,
          border: sw.custom
            ? "1.5px dashed rgba(184,146,74,0.7)"
            : sw.outlined
            ? "1px solid rgba(14,26,31,0.18)"
            : "1px solid rgba(14,26,31,0.08)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "0.85rem",
          color: "var(--ink-primary)",
        }}
      >
        {sw.name}
      </span>
    </span>
  );
}

export default PergolaArchShowcase;
