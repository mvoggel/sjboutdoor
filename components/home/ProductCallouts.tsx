"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { assetPath } from "@/lib/asset-path";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type MediaItem = { src: string; alt: string };

type Product = {
  slug: string;
  name: string;
  descriptor: string;
  href: string;
  media: MediaItem[];
};

const PRODUCTS: Product[] = [
  {
    slug: "retractable-awnings",
    name: "Retractable Awnings",
    descriptor:
      "Shade on demand — extend your living space into the Florida outdoors.",
    href: "/products/retractable-awnings",
    media: [
      { src: "/img/products/awnings.png", alt: "Retractable awning on a Florida home" },
      { src: "/img/gallery/retractable-awnings/Awning-Crossarm-BronzeHousing-PuttyRegimentalFabric-DSC05979.jpg", alt: "Retractable awning with bronze housing and putty regimental fabric" },
      { src: "/img/gallery/retractable-awnings/awningwscreen.jpg", alt: "Retractable awning paired with an exterior screen" },
    ],
  },
  {
    slug: "exterior-shades",
    name: "Exterior Shades",
    descriptor:
      "Motorized, custom-fabricated retractable screens for patios, lanais, and garage openings.",
    href: "/products/exterior-shades",
    media: [
      { src: "/img/products/ext-shades.png", alt: "Three exterior shade panels on a Florida lanai" },
      { src: "/img/gallery/exterior-shades/screensimage.jpg", alt: "Motorized exterior screen on a Florida patio" },
      { src: "/img/gallery/patio-shades/screens3.jpg", alt: "Retractable patio screens lowered across a lanai" },
    ],
  },
  {
    slug: "louvered-pergolas",
    name: "Louvered Pergolas",
    descriptor:
      "Adjustable louvers and full climate control for a year-round retreat.",
    href: "/products/louvered-pergolas",
    media: [
      { src: "/img/products/pergolas.jpg", alt: "Modern louvered pergola in Florida" },
      { src: "/img/products/louvered-callout.png", alt: "Louvered pergola detail" },
      { src: "/img/products/pergola-carousel.jpg", alt: "Luxury outdoor living with louvered pergola" },
    ],
  },
  {
    slug: "exterior-shutters",
    name: "Exterior Shutters",
    descriptor:
      "From coastal Bahama shutters to hurricane-rated storm protection systems.",
    href: "/products/exterior-shutters",
    media: [
      { src: "/img/products/bahamashutters.jpg", alt: "Bahama shutters on a Florida coastal home" },
      { src: "/img/products/st-shutter.png", alt: "Storm shutters protecting a Florida home" },
      { src: "/img/products/stormshutters.jpg", alt: "Accordion hurricane shutters" },
    ],
  },
];

export function ProductCallouts() {
  const reduced = useReducedMotion();

  return (
    <section id="products" className="pt-7 md:pt-10 pb-14 md:pb-20" style={{ background: "var(--bg-pure)" }}>
      {/* Hide the horizontal scrollbar on the gallery tracks */}
      <style>{`.pc-track{scrollbar-width:none;-webkit-overflow-scrolling:touch;}.pc-track::-webkit-scrollbar{display:none;}`}</style>
      <Container>
        <SectionHeading
          eyebrow="Our Products"
          heading="Crafted for Florida living."
          subheading="Each product is custom-fabricated to your space, your style, and the Florida climate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 lg:gap-y-16">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: reduced ? 0 : (i % 2) * 0.08 }}
            >
              <ProductGalleryCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── A single product = a browsable mini-gallery + prominent CTA ──────────────
function ProductGalleryCard({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const count = product.media.length;

  const goTo = (i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const clamped = ((i % count) + count) % count;
    t.scrollTo({ left: clamped * t.clientWidth, behavior: reduced ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    const i = Math.round(t.scrollLeft / t.clientWidth);
    if (i !== activeRef.current) {
      activeRef.current = i;
      setActive(i);
    }
  };

  // Mobile: native scroll-snap dead-ends at the first/last slide. Detect a
  // swipe past either edge on touchend and wrap around to the other end.
  const touchStartX = useRef<number | null>(null);
  const SWIPE_WRAP_THRESHOLD = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_WRAP_THRESHOLD) return;
    // Swipe left (dx < 0) = "next"; at the last slide, wrap to the first.
    if (dx < 0 && activeRef.current >= count - 1) goTo(0);
    // Swipe right (dx > 0) = "prev"; at the first slide, wrap to the last.
    else if (dx > 0 && activeRef.current <= 0) goTo(count - 1);
  };

  return (
    <article className="flex flex-col">
      {/* ── Gallery ─────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden aspect-[16/11] lg:aspect-[4/3] rounded-tl-[44px] rounded-br-[44px] lg:rounded-tl-[72px] lg:rounded-br-[72px]"
        style={{ background: "var(--rich-sand)", isolation: "isolate" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Scroll-snap track — native swipe on mobile, programmatic on desktop */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="pc-track flex h-full w-full overflow-x-auto overflow-y-hidden"
          style={{ scrollSnapType: "x mandatory", touchAction: "pan-x" }}
        >
          {product.media.map((item, j) => (
            <div
              key={j}
              className="relative h-full flex-none"
              style={{ flexBasis: "100%", width: "100%", scrollSnapAlign: "start" }}
            >
              <Image
                src={assetPath(item.src)}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{
                  transform: hovered && !reduced ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Top gradient — legibility for the name */}
        <span
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,26,22,0.74) 0%, rgba(11,26,22,0.18) 30%, transparent 54%)",
          }}
        />

        {/* Bottom gradient — legibility for the dots */}
        <span
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(11,26,22,0.55) 0%, transparent 32%)",
          }}
        />

        {/* Gold arch frame — visible at rest, frames in tighter on hover */}
        <span
          aria-hidden
          className="absolute z-[2] pointer-events-none rounded-tl-[32px] rounded-br-[32px] lg:rounded-tl-[56px] lg:rounded-br-[56px]"
          style={{
            inset: "11px",
            border: "1.5px solid rgba(184,146,74,0.85)",
            opacity: hovered ? 1 : 0.55,
            transform: hovered ? "scale(1)" : "scale(1.02)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        />

        {/* Name overlay — pinned to the top, fixed while images scroll behind it */}
        <div className="absolute left-0 top-0 z-[3] pointer-events-none" style={{ padding: "1.4rem 1.6rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              color: "var(--bg-pure)",
              letterSpacing: "0.01em",
            }}
          >
            {product.name}
          </h3>
        </div>

        {/* Prev / next — desktop hover only */}
        {count > 1 && (
          <>
            <GalleryArrow side="left" visible={hovered} onClick={() => goTo(activeRef.current - 1)} />
            <GalleryArrow side="right" visible={hovered} onClick={() => goTo(activeRef.current + 1)} />
          </>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="absolute z-[4] flex items-center gap-1.5" style={{ right: "1.4rem", bottom: "1.5rem" }}>
            {product.media.map((_, j) => (
              <button
                key={j}
                aria-label={`View image ${j + 1} of ${count}`}
                onClick={() => goTo(j)}
                style={{
                  width: active === j ? "20px" : "7px",
                  height: "7px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: active === j ? "var(--rich-warm)" : "rgba(252,251,247,0.6)",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Below: descriptor + prominent CTA ───────────────────── */}
      <p
        className="mt-5 mb-5"
        style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "46ch" }}
      >
        {product.descriptor}
      </p>

      <Link
        href={product.href}
        className="group self-start inline-flex items-center transition-colors"
        style={{
          gap: "0.6rem",
          padding: "0.9rem 2rem",
          background: "var(--ink-primary)",
          color: "var(--bg-pure)",
          border: "1px solid transparent",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "0.82rem",
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
        <span className="hidden sm:inline">Explore {product.name}</span>
        <span className="sm:hidden">Explore</span>
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

// ─── Hover arrow ──────────────────────────────────────────────────────────────
function GalleryArrow({
  side,
  visible,
  onClick,
}: {
  side: "left" | "right";
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={side === "left" ? "Previous image" : "Next image"}
      onClick={onClick}
      className="absolute z-[4] hidden lg:flex items-center justify-center"
      style={{
        top: "50%",
        [side]: "1rem",
        transform: `translateY(-50%) translateX(${visible ? "0" : side === "left" ? "-6px" : "6px"})`,
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "50%",
        border: "1px solid rgba(252,251,247,0.5)",
        background: "rgba(14,26,31,0.35)",
        backdropFilter: "blur(6px)",
        color: "var(--bg-pure)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease, transform 0.25s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(184,146,74,0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(14,26,31,0.35)";
      }}
    >
      {side === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}

export default ProductCallouts;
