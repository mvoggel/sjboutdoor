"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/asset-path";

type BoardItem = {
  kind: "video" | "image";
  src: string;
  alt: string;
  caption: string;
  tag: string;
};

// Behind-the-scenes board — personality, crew life, and social-style posts.
// Drop more clips/photos in here as they come in. The video is the real one;
// the images are placeholders pulled from the gallery until BTS shots arrive.
const BOARD: BoardItem[] = [
  {
    kind: "video",
    src: "/video/about/about-family.MOV",
    alt: "The SJB crew behind the scenes",
    caption: "Family first — the people behind every install.",
    tag: "Behind the scenes",
  },
  {
    kind: "image",
    src: "/img/gallery/retractable-awnings/awningpic.jpg",
    alt: "An awning install in progress",
    caption: "Dialing in the projection on a coastal awning.",
    tag: "On site",
  },
  {
    kind: "image",
    src: "/img/products/family.jpg",
    alt: "The Rosso family",
    caption: "Three decades, same handshake.",
    tag: "Our crew",
  },
  {
    kind: "image",
    src: "/img/gallery/louvered-pergolas/12.jpg",
    alt: "A finished louvered pergola",
    caption: "The reveal — louvers open, shade on demand.",
    tag: "Finished work",
  },
  {
    kind: "image",
    src: "/img/gallery/exterior-shades/screensimage.jpg",
    alt: "Exterior shades on a lanai",
    caption: "Measuring twice before anything is ordered.",
    tag: "On site",
  },
  {
    kind: "image",
    src: "/img/gallery/bahama-shutters/Naples__bahama-2.jpg",
    alt: "Bahama shutters in Naples",
    caption: "Bahama shutters, hung level to the half-inch.",
    tag: "Finished work",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function AboutBoard() {
  const reduced = useReducedMotion();

  return (
    <div
      // Pinterest-style masonry: items flow down balanced columns.
      className="[column-fill:_balance] columns-2 lg:columns-3 gap-3 md:gap-4"
    >
      {BOARD.map((item, i) => (
        <motion.figure
          key={item.src}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : (i % 3) * 0.07 }}
          className="group relative mb-3 md:mb-4 break-inside-avoid overflow-hidden"
          style={{
            borderRadius: "10px",
            border: "1px solid rgba(184,146,74,0.22)",
            background: "var(--near-black)",
          }}
        >
          {item.kind === "video" ? (
            <video
              src={assetPath(item.src)}
              autoPlay
              muted
              loop
              playsInline
              className="block w-full h-auto object-cover"
              aria-label={item.alt}
            />
          ) : (
            <div className="relative w-full" style={{ aspectRatio: i % 2 === 0 ? "4 / 5" : "1 / 1" }}>
              <Image
                src={assetPath(item.src)}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* Legibility gradient + caption — the "social post" feel */}
          <figcaption
            className="absolute inset-x-0 bottom-0 p-3 md:p-4 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(11,26,22,0.82) 0%, rgba(11,26,22,0.35) 55%, transparent 100%)",
            }}
          >
            <span
              className="inline-block mb-1.5"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(184,146,74,0.95)",
              }}
            >
              {item.tag}
            </span>
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.95rem",
                lineHeight: 1.35,
                color: "rgba(252,251,247,0.96)",
              }}
            >
              {item.caption}
            </p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

export default AboutBoard;
