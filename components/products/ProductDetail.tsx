"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { ProductHero } from "@/components/home/ProductHero";
import {
  LouveredPergolaExperience,
  type LouveredPergolaCallout,
} from "@/components/products/LouveredPergolaExperience";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { ValuePropsStrip, type ValueProp } from "./ValuePropsStrip";
import { FilmstripGallery, type GalleryImage } from "./FilmstripGallery";

export type ProductOption = {
  name: string;
  description: string;
};

export type ProductDetailConfig = {
  /** Parent product slug used to preselect the consult modal
   *  (must be one of the four PRODUCT_SLUGS — e.g. "exterior-shades"). */
  consultSlug: string;

  hero: {
    eyebrow: string;
    headline: string;
    descriptor: string;
    imageSrc: string;
    imageAlt?: string;
    caption?: string;
  };

  valueProps: {
    eyebrow?: string;
    heading?: string;
    items: ValueProp[];
  };

  features: {
    eyebrow?: string;
    title: string;
    imageSrc: string;
    imageAlt?: string;
    callouts: LouveredPergolaCallout[];
  };

  options?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    items: ProductOption[];
  };

  vendor?: {
    eyebrow?: string;
    heading: string;
    body: string;
    ctaLabel?: string;
  };

  gallery: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    images: GalleryImage[];
  };
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProductDetail({ config }: { config: ProductDetailConfig }) {
  const { openModal } = useConsultModal();
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: EASE },
  });

  return (
    <>
      <Header />

      <main id="main-content">
        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <ProductHero
          eyebrow={config.hero.eyebrow}
          headline={config.hero.headline}
          descriptor={config.hero.descriptor}
          imageSrc={config.hero.imageSrc}
          imageAlt={config.hero.imageAlt}
          caption={config.hero.caption}
          productSlug={config.consultSlug}
          exploreHref="#features"
          exploreLabel="See the Details"
        />

        {/* ── 2. VALUE PROPS ──────────────────────────────────────── */}
        <ValuePropsStrip
          eyebrow={config.valueProps.eyebrow}
          heading={config.valueProps.heading}
          items={config.valueProps.items}
        />

        {/* ── 3. FEATURE INFOGRAPHIC ──────────────────────────────── */}
        <div id="features" style={{ scrollMarginTop: "90px" }}>
          <LouveredPergolaExperience
            imageSrc={config.features.imageSrc}
            imageAlt={config.features.imageAlt}
            eyebrow={config.features.eyebrow}
            title={config.features.title}
            callouts={config.features.callouts}
          />
        </div>

        {/* ── 4. OPTIONS ──────────────────────────────────────────── */}
        {config.options && (
          <section
            id="options"
            className="py-16 md:py-24"
            style={{ background: "var(--bg-pure)", scrollMarginTop: "90px" }}
          >
            <Container>
              <motion.div {...reveal()} style={{ marginBottom: "2.75rem", maxWidth: "54ch" }}>
                {config.options.eyebrow && (
                  <p
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(184,146,74,0.85)",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {config.options.eyebrow}
                  </p>
                )}
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {config.options.heading}
                </h2>
                {config.options.intro && (
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                      marginTop: "0.9rem",
                    }}
                  >
                    {config.options.intro}
                  </p>
                )}
              </motion.div>

              {/* Editorial definition rows — label left, description right */}
              <div>
                {config.options.items.map((opt, i) => (
                  <motion.div
                    key={opt.name}
                    {...reveal(i * 0.06)}
                    className="grid grid-cols-1 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-2 md:gap-10 py-6"
                    style={{ borderTop: "1px solid rgba(184,146,74,0.22)" }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "0.8rem",
                          color: "var(--rich-warm)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                          fontWeight: 500,
                          color: "var(--ink-primary)",
                          lineHeight: 1.2,
                          letterSpacing: "0.01em",
                        }}
                      >
                        {opt.name}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "var(--ink-muted)",
                        maxWidth: "52ch",
                      }}
                    >
                      {opt.description}
                    </p>
                  </motion.div>
                ))}
                <div style={{ borderTop: "1px solid rgba(184,146,74,0.22)" }} />
              </div>
            </Container>
          </section>
        )}

        {/* ── 5. VENDOR / PARTNER BAND ────────────────────────────── */}
        {config.vendor && (
          <section
            className="py-12 md:py-16"
            style={{
              background: "var(--near-black)",
              borderTop: "1px solid rgba(184,146,74,0.18)",
              borderBottom: "1px solid rgba(184,146,74,0.18)",
            }}
          >
            <Container>
              <motion.div
                {...reveal()}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
              >
                <div>
                  {config.vendor.eyebrow && (
                    <p
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(184,146,74,0.7)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {config.vendor.eyebrow}
                    </p>
                  )}
                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
                      fontWeight: 500,
                      color: "rgba(252,251,247,0.95)",
                      letterSpacing: "0.01em",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {config.vendor.heading}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "rgba(252,251,247,0.55)",
                      maxWidth: "58ch",
                      lineHeight: 1.75,
                    }}
                  >
                    {config.vendor.body}
                  </p>
                </div>
                <button
                  onClick={() => openModal(config.consultSlug)}
                  style={{
                    flexShrink: 0,
                    padding: "0.9rem 2.25rem",
                    border: "1px solid rgba(184,146,74,0.45)",
                    background: "transparent",
                    color: "var(--rich-warm)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.875rem",
                    fontWeight: 450,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--rich-warm)";
                    e.currentTarget.style.color = "var(--near-black)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--rich-warm)";
                  }}
                >
                  {config.vendor.ctaLabel ?? "Ask About Our Products"}
                </button>
              </motion.div>
            </Container>
          </section>
        )}

        {/* ── 6. GALLERY ──────────────────────────────────────────── */}
        <FilmstripGallery
          eyebrow={config.gallery.eyebrow}
          heading={config.gallery.heading}
          intro={config.gallery.intro}
          images={config.gallery.images}
        />

        {/* ── 7. CLOSING CTA ──────────────────────────────────────── */}
        <CtaBand inverted />
      </main>

      <Footer />
    </>
  );
}

export default ProductDetail;
