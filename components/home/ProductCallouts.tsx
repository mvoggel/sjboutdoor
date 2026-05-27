"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { assetPath } from "@/lib/asset-path";

type MediaItem = { src: string; alt: string };

type Product = {
  slug: string;
  eyebrow: string;
  name: string;
  descriptor: string;
  href: string;
  media: MediaItem[];
};

const PRODUCTS: Product[] = [
  {
    slug: "exterior-shades",
    eyebrow: "01 / Shade",
    name: "Exterior Shades",
    descriptor:
      "Motorized precision meets architectural elegance. Custom-fabricated retractable screens for patios, lanais, and garage openings.",
    href: "/products/exterior-shades",
    media: [
      { src: "/img/products/shades2.png", alt: "Exterior roller shade on a Florida home" },
      { src: "/img/products/ext-shades.png", alt: "Three exterior shade panels on a Florida lanai" },
      { src: "/img/products/patioscreen.jpg", alt: "Phantom retractable patio screen" },
    ],
  },
  {
    slug: "exterior-shutters",
    eyebrow: "02 / Shutter",
    name: "Exterior Shutters",
    descriptor:
      "Florida's defining architectural detail — from coastal Bahama shutters to hurricane-rated storm protection systems.",
    href: "/products/exterior-shutters",
    media: [
      { src: "/img/products/bahamashutters.jpg", alt: "Bahama shutters on a Florida coastal home" },
      { src: "/img/products/st-shutter.png", alt: "Storm shutters protecting a Florida home" },
      { src: "/img/products/stormshutters.jpg", alt: "Accordion hurricane shutters" },
    ],
  },
  {
    slug: "retractable-awnings",
    eyebrow: "03 / Awning",
    name: "Retractable Awnings",
    descriptor:
      "Shade on demand. Style without compromise — extend your living space into the Florida outdoors.",
    href: "/products/retractable-awnings",
    media: [
      { src: "/img/products/awning.png", alt: "Elegant outdoor terrace with retractable awning" },
      { src: "/img/products/awnings.png", alt: "Retractable awning on a Florida home" },
      { src: "/img/products/ext-shades.png", alt: "Luxury outdoor living space" },
    ],
  },
  {
    slug: "louvered-pergolas",
    eyebrow: "04 / Pergola",
    name: "Louvered Pergolas",
    descriptor:
      "Transform your outdoor space into a year-round retreat with adjustable louvers and full climate control.",
    href: "/products/louvered-pergolas",
    media: [
      { src: "/img/products/pergolas.jpg", alt: "Modern louvered pergola in Florida" },
      { src: "/img/products/louvered-callout.png", alt: "Louvered pergola detail" },
      { src: "/img/products/vidcover.jpeg", alt: "Luxury outdoor living with louvered pergola" },
    ],
  },
];

type LightboxState = { item: MediaItem; productName: string } | null;

export function ProductCallouts() {
  const prefersReducedMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  return (
    <>
      <section
        id="products"
        className="py-14 md:py-20"
        style={{ background: "var(--bg-pure)" }}
      >
        <Container>
          <SectionHeading
            eyebrow="Our Products"
            heading="Crafted for Florida living."
            subheading="Each product is custom-fabricated to your space, your style, and the Florida climate."
          />

          <div
            style={{
              borderTop: "1px solid var(--rich-sand)",
              borderBottom: "1px solid var(--rich-sand)",
            }}
          >
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: prefersReducedMotion ? 0 : i * 0.07,
                }}
                className="py-8 md:py-10"
                style={
                  i < PRODUCTS.length - 1
                    ? { borderBottom: "1px solid var(--rich-sand)" }
                    : undefined
                }
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-eyebrow mb-1.5">{product.eyebrow}</p>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                        fontWeight: 500,
                        color: "var(--ink-primary)",
                        letterSpacing: "0.01em",
                        lineHeight: 1.15,
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm mt-1.5 max-w-lg"
                      style={{ color: "var(--ink-muted)", lineHeight: 1.65 }}
                    >
                      {product.descriptor}
                    </p>
                  </div>

                  {/* Desktop CTA */}
                  <Link
                    href={product.href}
                    className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium flex-shrink-0 mt-1 transition-all duration-200 hover:gap-2.5"
                    style={{ color: "var(--rich-warm)" }}
                  >
                    Explore
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* 3-image strip — 1-col on mobile, 3-col on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                  {product.media.map((item, j) => (
                    <MediaTile
                      key={j}
                      item={item}
                      onExpand={() =>
                        setLightbox({ item, productName: product.name })
                      }
                    />
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-4 md:hidden">
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: "var(--rich-warm)" }}
                  >
                    Explore {product.name}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={18} style={{ color: "rgba(252,251,247,0.9)" }} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ width: "min(92vw, 900px)", height: "min(88vh, 640px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={assetPath(lightbox.item.src)}
                alt={lightbox.item.alt}
                fill
                className="object-contain"
                sizes="92vw"
              />
            </motion.div>

            {/* Mobile product label — bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5 pointer-events-none md:hidden"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.05rem",
                  color: "rgba(252,251,247,0.88)",
                  letterSpacing: "0.04em",
                }}
              >
                {lightbox.productName}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MediaTile({
  item,
  onExpand,
}: {
  item: MediaItem;
  onExpand: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: "3/2", borderRadius: "6px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
    >
      <Image
        src={assetPath(item.src)}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 33vw, 22vw"
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{
          background: "rgba(14,26,31,0.32)",
          opacity: hovered ? 1 : 0,
        }}
      >
        {/* Expand icon */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(252,251,247,0.14)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(252,251,247,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      </div>
    </div>
  );
}
