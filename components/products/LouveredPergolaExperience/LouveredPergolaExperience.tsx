"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./LouveredPergolaExperience.module.css";

type Coord = { x: number; y: number };

export type LouveredPergolaCallout = {
  number: number;
  title: string;
  description: string;
  dot: Coord;
  label: Coord;
  align: "left" | "right";
};

export type LouveredPergolaExperienceProps = {
  imageSrc: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  callouts?: LouveredPergolaCallout[];
};

const DEFAULT_CALLOUTS: LouveredPergolaCallout[] = [
  {
    number: 1,
    title: "On-Demand Climate Control",
    description:
      "Adjust louvers in seconds for sun, shade, airflow, or rain protection.",
    dot: { x: 40, y: 30 },
    label: { x: 32, y: 46 },
    align: "left",
  },
  {
    number: 2,
    title: "Weatherproof by Design",
    description:
      "Hidden drainage channels move rain through integrated gutters.",
    dot: { x: 76, y: 32 },
    label: { x: 96, y: 15 },
    align: "left",
  },
  {
    number: 3,
    title: "Year-Round Living Space",
    description:
      "Turn a patio, deck, or poolside area into a usable outdoor room.",
    dot: { x: 50, y: 72 },
    label: { x: 88, y: 86 },
    align: "left",
  },
  {
    number: 4,
    title: "Architectural Investment",
    description:
      "Powder-coated aluminum frames complement the home and add curb appeal.",
    dot: { x: 14, y: 30 },
    label: { x: 4, y: 12 },
    align: "right",
  },
  {
    number: 5,
    title: "Low Maintenance, Long Life",
    description:
      "Corrosion-resistant aluminum avoids rust, warping, and fading.",
    dot: { x: 22, y: 64 },
    label: { x: 4, y: 82 },
    align: "right",
  },
  {
    number: 6,
    title: "Smart Home Integration",
    description:
      "Add lighting, fans, heaters, sensors, and motorized privacy screens.",
    dot: { x: 52, y: 38 },
    label: { x: 92, y: 50 },
    align: "left",
  },
];

function groupPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

export function LouveredPergolaExperience({
  imageSrc,
  imageAlt = "Louvered pergola installation with adjustable aluminum louvers, integrated lighting, and a fan over an outdoor living area",
  eyebrow,
  title,
  callouts = DEFAULT_CALLOUTS,
}: LouveredPergolaExperienceProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState<number | null>(null);
  const pairs = useMemo(() => groupPairs(callouts), [callouts]);
  const [visiblePairs, setVisiblePairs] = useState<Set<number>>(
    () => new Set(),
  );
  const [sectionVisible, setSectionVisible] = useState(false);
  const pairRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const PAIR_STAGGER_MS = 220;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisiblePairs((prev) => {
          let next = prev;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const idxAttr = entry.target.getAttribute("data-pair-index");
            if (idxAttr === null) continue;
            const idx = Number(idxAttr);
            if (!next.has(idx)) {
              if (next === prev) next = new Set(prev);
              next.add(idx);
            }
            observer.unobserve(entry.target);
          }
          return next;
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    for (const node of pairRefs.current) {
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [pairs]);

  useEffect(() => {
    const targets = [headerRef.current, stageRef.current].filter(
      (n): n is HTMLDivElement => n !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    for (const t of targets) observer.observe(t);
    return () => observer.disconnect();
  }, []);

  const handleToggle = useCallback((n: number) => {
    setActiveId((current) => (current === n ? null : n));
  }, []);

  const handleDotClick = useCallback((n: number) => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 820px)").matches;
    if (isMobile) {
      const card = cardRefs.current.get(n);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setActiveId(n);
      return;
    }
    setActiveId((current) => (current === n ? null : n));
  }, []);

  return (
    <section className={styles.section} aria-labelledby={`${baseId}-title`}>
      <div className={styles.inner}>
        {(eyebrow || title) && (
          <div
            ref={headerRef}
            className={`${styles.header} ${styles.reveal} ${styles.revealHeader} ${
              sectionVisible ? styles.revealVisible : ""
            }`}
          >
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h2 id={`${baseId}-title`} className={styles.title}>
              {title}
            </h2>
            <span className={styles.rule} aria-hidden="true" />
          </div>
        )}

        <div
          ref={stageRef}
          className={`${styles.stage} ${styles.reveal} ${styles.revealStage} ${
            sectionVisible ? styles.revealVisible : ""
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 820px) 100vw, (max-width: 1280px) 90vw, 1280px"
            priority={false}
          />
          <div className={styles.imageScrim} aria-hidden="true" />

          <svg
            className={styles.connectorLayer}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {callouts.map((c) => {
              const isActive = activeId === c.number;
              const pairIndex = Math.floor((c.number - 1) / 2);
              const delayStyle = {
                "--reveal-delay": `${pairIndex * PAIR_STAGGER_MS}ms`,
              } as CSSProperties;
              return (
                <line
                  key={c.number}
                  x1={c.dot.x}
                  y1={c.dot.y}
                  x2={c.label.x}
                  y2={c.label.y}
                  style={delayStyle}
                  className={`${styles.connectorLine} ${
                    sectionVisible ? styles.connectorLineVisible : ""
                  } ${isActive ? styles.connectorLineActive : ""}`}
                />
              );
            })}
          </svg>

          <div className={styles.callouts}>
            {callouts.map((c) => {
              const isActive = activeId === c.number;
              const tooltipId = `${baseId}-tip-${c.number}`;
              const pairIndex = Math.floor((c.number - 1) / 2);
              const delayVar = `${pairIndex * PAIR_STAGGER_MS}ms`;
              const dotStyle = {
                left: `${c.dot.x}%`,
                top: `${c.dot.y}%`,
                "--reveal-delay": delayVar,
              } as CSSProperties;
              const labelStyle = {
                left: `${c.label.x}%`,
                top: `${c.label.y}%`,
                "--reveal-delay": delayVar,
              } as CSSProperties;
              return (
                <div key={c.number} className={styles.callout}>
                  <span className={styles.dotWrap} style={dotStyle}>
                    <button
                      type="button"
                      className={`${styles.dot} ${
                        sectionVisible ? styles.dotVisible : ""
                      } ${isActive ? styles.dotActive : styles.dotPulse}`}
                      aria-expanded={isActive}
                      aria-controls={tooltipId}
                      aria-label={`${c.number}. ${c.title}`}
                      onClick={() => handleDotClick(c.number)}
                      onMouseEnter={() => setActiveId(c.number)}
                      onMouseLeave={() =>
                        setActiveId((curr) => (curr === c.number ? null : curr))
                      }
                      onFocus={() => setActiveId(c.number)}
                      onBlur={() =>
                        setActiveId((curr) => (curr === c.number ? null : curr))
                      }
                    >
                      {c.number}
                    </button>
                  </span>

                  <div
                    id={tooltipId}
                    role="button"
                    tabIndex={-1}
                    aria-label={`${c.title}: ${c.description}`}
                    className={`${styles.label} ${
                      c.align === "left"
                        ? styles.labelAlignLeft
                        : styles.labelAlignRight
                    } ${sectionVisible ? styles.labelVisible : ""} ${
                      isActive ? styles.labelActive : ""
                    }`}
                    style={labelStyle}
                    onClick={() => handleToggle(c.number)}
                    onMouseEnter={() => setActiveId(c.number)}
                    onMouseLeave={() =>
                      setActiveId((curr) => (curr === c.number ? null : curr))
                    }
                  >
                    <span className={styles.labelTitle}>{c.title}</span>
                    <span className={styles.labelDescription}>
                      {c.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.mobileWrap}>
          <ul className={styles.mobileList}>
            {pairs.map((pair, pairIdx) => (
              <li key={pairIdx}>
                <div
                  ref={(node) => {
                    pairRefs.current[pairIdx] = node;
                  }}
                  data-pair-index={pairIdx}
                  className={`${styles.mobileGroup} ${
                    visiblePairs.has(pairIdx) ? styles.mobileGroupVisible : ""
                  }`}
                >
                  {pair.map((c) => (
                    <div
                      key={c.number}
                      ref={(node) => {
                        if (node) cardRefs.current.set(c.number, node);
                        else cardRefs.current.delete(c.number);
                      }}
                      id={`${baseId}-card-${c.number}`}
                      className={`${styles.mobileCard} ${
                        activeId === c.number ? styles.mobileCardHighlight : ""
                      }`}
                    >
                      <span className={styles.mobileBadge} aria-hidden="true">
                        {c.number}
                      </span>
                      <div className={styles.mobileBody}>
                        <span className={styles.mobileTitle}>{c.title}</span>
                        <span className={styles.mobileDescription}>
                          {c.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LouveredPergolaExperience;
