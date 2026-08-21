"use client";

/**
 * ScreenShowcase — replaces the old image-left / image-right product rows on
 * the Exterior Shades page with a more animated, shape-cropped presentation.
 *
 * Desktop: arch-cropped cards, two per row. Hovering a card zooms the image, draws a
 * gold arch frame, and reveals an "Explore" hint.
 * Mobile: feature chips become a swipeable, scroll-snap carousel under each
 * cropped image.
 *
 * Specs/value props are sourced from our manufacturers:
 *   • Progressive Screens (patented MagnaTrack self-correcting system,
 *     plus the code-rated Defender hurricane series)
 *   • SunPro motorized screens
 *   • Mirage Screen Systems (retractable screen doors)
 *
 * Layout uses Tailwind utilities for responsive behavior + inline styles for
 * visuals; styled-jsx is avoided because its class scoping does not reliably
 * apply to framer-motion elements.
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { assetPath } from "@/lib/asset-path";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Vendor-accurate proof points ────────────────────────────────────────────
const STATS: { value: string; label: string }[] = [
  { value: "98%", label: "Fewer service calls vs. zipper-track systems" },
  { value: "175 MPH", label: "Up to · wind-rated tension · Cat-5 Defender option" },
  { value: "95%", label: "Of UV blocked by solar mesh" },
  { value: "15 yr", label: "Fabric warranty · limited-lifetime hardware" },
];

type Feature = { label: string; detail: string };

interface Screen {
  href: string;
  vendor: string;
  name: string;
  category: string;
  valueProp: string;
  image: string;
  alt: string;
  features: Feature[];
}

const SCREENS: Screen[] = [
  {
    href: "/products/patio-screens",
    vendor: "Progressive Screens · MagnaTrack",
    name: "Patio Screens",
    category: "Retractable Motorized Screen",
    valueProp:
      "The world's best-performing exterior screen — it disappears into a slim housing the moment you don't need it.",
    image: "/img/products/patioscreen.jpg",
    alt: "Motorized retractable patio screen lowered across a Florida lanai",
    features: [
      { label: "Self-Correcting MagnaTrack", detail: "Patented magnets cut 98% of service calls" },
      { label: "Spans up to 30 ft", detail: "Single screen, no center post" },
      { label: "Smart-Home Ready", detail: "Somfy, Alexa & Google · wind sensors" },
      { label: "Blocks 90%+ UV", detail: "Textilene solar mesh" },
      { label: "Invisible When Retracted", detail: "Hidden in a slim cassette" },
    ],
  },
  {
    href: "/products/garage-door-screens",
    vendor: "Full-Height Motorized Screen",
    name: "Garage Door Screens",
    category: "Full-Bay Retractable Screen",
    valueProp:
      "Turn the garage into a breezy, bug-free outdoor room — then send the screen back into the header at the touch of a button.",
    image: "/img/products/garage-screen.png",
    alt: "Full-height motorized screen across an open garage bay",
    features: [
      { label: "Full-Height Coverage", detail: "Single, double or oversized bays" },
      { label: "Wind-Sensor Auto-Retract", detail: "Protects itself automatically" },
      { label: "Insect & Solar Mesh", detail: "Phifer & Textilene fabrics" },
      { label: "Voice & Remote Control", detail: "Smart-home compatible" },
      { label: "10-Year Parts & Labor", detail: "On the full system" },
    ],
  },
  {
    href: "/products/hurricane-screens",
    vendor: "Progressive Screens · Defender",
    name: "Hurricane Screens",
    category: "Roll-Down Hurricane Screen",
    valueProp:
      "Code-rated storm protection on the same track that handles bugs, sun, and glare the rest of the year.",
    image: "/img/products/shades2.png",
    alt: "Defender hurricane screens deployed across a poolside lanai",
    features: [
      { label: "Miami-Dade & FBC Rated", detail: "Florida Product Approval FL30798" },
      { label: "Design Pressure ±200 PSF", detail: "Cat-5 winds exceeding 156 mph" },
      { label: "Spans up to 30 ft", detail: "Up to 20 ft tall · limitations apply" },
      { label: "Magnetic MagnaTrack", detail: "No zippers to jam or re-wrap" },
      { label: "Gaposa Motors", detail: "App control · Lutron, Control4, Crestron" },
    ],
  },
  {
    href: "/products/retractable-screen-system",
    vendor: "Mirage Screen Systems",
    name: "Retractable Screen Systems",
    category: "Retractable Screen Doors",
    valueProp:
      "Screen doors that vanish into a slim housing beside the frame — for entry doors, sliders, and openings to 28 ft.",
    image: "/img/products/ext-shades.png",
    alt: "Retractable screen drawn across a wide patio door opening",
    features: [
      { label: "Three Systems", detail: "1750 · 1750R retained mesh · 3500 wide" },
      { label: "Spans to 28 ft", detail: "Double configuration on the 3500" },
      { label: "Pet & Kid Safe", detail: "Retained mesh locks into the track" },
      { label: "26 Frame Colors", detail: "8 standard + 18 Diamond Series" },
      { label: "Limited Lifetime Warranty", detail: "All components except mesh" },
    ],
  },
];

// ─── Stat band ────────────────────────────────────────────────────────────────
function StatBand() {
  const reduced = useReducedMotion();
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 mb-14"
      style={{
        gap: "1px",
        background: "rgba(184,146,74,0.22)",
        border: "1px solid rgba(184,146,74,0.22)",
      }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.value}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
          style={{
            background: "var(--bg-pure)",
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)",
              fontWeight: 500,
              lineHeight: 1,
              color: "var(--rich-warm)",
            }}
          >
            {s.value}
          </span>
          <span style={{ fontSize: "0.78rem", lineHeight: 1.4, color: "var(--ink-muted)" }}>
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Single product card ──────────────────────────────────────────────────────
function ScreenCard({ screen, index }: { screen: Screen; index: number }) {
  const reduced = useReducedMotion();

  const frameVariants: Variants = {
    rest: { opacity: 0, scale: 1.02 },
    hover: { opacity: 1, scale: 1 },
  };
  const hintVariants: Variants = {
    rest: { opacity: 0, x: -6 },
    hover: { opacity: 1, x: 0 },
  };
  const zoomVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: reduced ? 1 : 1.06 },
  };

  return (
    <motion.article
      className="flex flex-col"
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      {/* Shape-cropped media — this wrapper owns the hover state so its
          variant label propagates to the zoom / frame / hint children. */}
      <motion.div initial="rest" animate="rest" whileHover="hover" whileFocus="hover">
        <Link
          href={screen.href}
          aria-label={`Explore ${screen.name}`}
          className="relative block w-full overflow-hidden aspect-[16/11] lg:aspect-[4/3.4] rounded-tl-[56px] rounded-br-[56px] lg:rounded-tl-[92px] lg:rounded-br-[92px]"
          style={{ background: "var(--rich-sand)", isolation: "isolate" }}
        >
          <motion.div
            className="absolute inset-0"
            variants={zoomVariants}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Image
              src={assetPath(screen.image)}
              alt={screen.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          {/* Bottom gradient */}
          <span
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(11,26,22,0.80) 0%, rgba(11,26,22,0.30) 34%, transparent 60%)",
            }}
          />

          {/* Gold arch frame — fades in on hover */}
          <motion.span
            aria-hidden
            className="absolute z-[2] pointer-events-none rounded-tl-[44px] rounded-br-[44px] lg:rounded-tl-[72px] lg:rounded-br-[72px]"
            variants={frameVariants}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ inset: "12px", border: "1.5px solid rgba(184,146,74,0.85)" }}
          />

          {/* Title block */}
          <span className="absolute left-0 bottom-0 z-[3] flex flex-col gap-1.5" style={{ padding: "1.5rem 1.75rem" }}>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(184,146,74,0.95)" }}>
              {screen.vendor}
            </span>
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)",
                fontWeight: 500,
                lineHeight: 1.05,
                color: "var(--bg-pure)",
              }}
            >
              {screen.name}
            </span>
            <span style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(252,251,247,0.7)" }}>
              {screen.category}
            </span>
          </span>

          {/* Explore hint */}
          <motion.span
            className="absolute z-[3] inline-flex items-center"
            variants={hintVariants}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              top: "1.5rem",
              right: "1.75rem",
              gap: "0.45rem",
              padding: "0.4rem 0.85rem",
              background: "rgba(252,251,247,0.94)",
              color: "var(--ink-primary)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Explore
            <svg width="18" height="9" viewBox="0 0 20 10" fill="none">
              <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </Link>
      </motion.div>

      {/* Value prop */}
      <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "var(--ink-primary)", margin: "1.5rem 0 1.25rem", maxWidth: "46ch" }}>
        {screen.valueProp}
      </p>

      {/* Feature chips — wrap on desktop, swipe on mobile */}
      <div className="sc-chiptrack flex gap-2.5 flex-nowrap overflow-x-auto lg:flex-wrap lg:overflow-visible pb-2.5 mb-5" style={{ scrollSnapType: "x mandatory" }} role="list">
        {screen.features.map((f, i) => (
          <motion.div
            key={f.label}
            role="listitem"
            className="flex items-start"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
            style={{
              scrollSnapAlign: "start",
              flex: "0 0 auto",
              gap: "0.5rem",
              padding: "0.6rem 0.9rem",
              maxWidth: "17rem",
              border: "1px solid rgba(184,146,74,0.28)",
              background: "rgba(184,146,74,0.04)",
            }}
          >
            <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--rich-warm)", flexShrink: 0, marginTop: "0.45rem" }} />
            <span className="flex flex-col" style={{ gap: "0.12rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--ink-primary)",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </span>
              <span style={{ fontSize: "0.72rem", lineHeight: 1.35, color: "var(--ink-muted)" }}>
                {f.detail}
              </span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={screen.href}
        className="self-start inline-flex items-center transition-colors"
        style={{
          gap: "0.5rem",
          padding: "0.8rem 1.75rem",
          background: "var(--ink-primary)",
          color: "var(--bg-pure)",
          border: "1px solid transparent",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "transparent";
          el.style.color = "var(--ink-primary)";
          el.style.borderColor = "var(--ink-primary)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "var(--ink-primary)";
          el.style.color = "var(--bg-pure)";
          el.style.borderColor = "transparent";
        }}
      >
        Explore {screen.name}
        <svg width="16" height="8" viewBox="0 0 20 10" fill="none">
          <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ScreenShowcase() {
  const reduced = useReducedMotion();

  return (
    <section id="products" style={{ background: "var(--bg-pure)", padding: "5rem 0 5.5rem" }}>
      {/* Hide the horizontal scrollbar on the mobile chip carousel */}
      <style>{`.sc-chiptrack{scrollbar-width:none;-webkit-overflow-scrolling:touch;}.sc-chiptrack::-webkit-scrollbar{display:none;}`}</style>
      <Container>
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
          style={{ marginBottom: "2.5rem" }}
        >
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--rich-warm)", marginBottom: "1rem" }}>
            The Systems
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 500,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Four systems. One standard of quality.
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "60ch" }}>
            Each is custom-fabricated to your exact opening and built for salt
            air, sun, and storm-cycle wind. Hover to explore — or swipe the
            feature highlights on mobile.
          </p>
        </motion.div>

        <StatBand />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
          {SCREENS.map((s, i) => (
            <ScreenCard key={s.href} screen={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ScreenShowcase;
