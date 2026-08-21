"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
import { ProductGallery } from "./ProductGallery";
import {
  ScreenSpecBand,
  ScreenMeshExplorer,
  type ScreenStat,
  type MeshType,
  type ScreenColor,
  type ScreenFinish,
} from "./ScreenMaterials";

export type ProductOption = {
  name: string;
  description: string;
};

export type ProductLineupItem = {
  name: string;
  /** Short category line above the name, e.g. "Entry, sliding & French doors". */
  category?: string;
  blurb: string;
  /** Scannable spec bullets — keep to 3-4 short lines. */
  points: string[];
  /** Manufacturer's own product page. Renders an outbound link when set. */
  href?: string;
  linkLabel?: string;
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

  /** Optional icon-led value-prop strip. */
  valueProps?: {
    eyebrow?: string;
    heading?: string;
    items: ValueProp[];
  };

  /** Optional annotated feature infographic. */
  features?: {
    eyebrow?: string;
    title: string;
    imageSrc: string;
    imageAlt?: string;
    callouts: LouveredPergolaCallout[];
  };

  /**
   * Optional 3-up product lineup. Used where a partner brand's range is the
   * story (e.g. Mirage) rather than one system's anatomy — each card can link
   * out to the manufacturer's own product page.
   */
  lineup?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    items: ProductLineupItem[];
  };

  /** Optional "by the numbers" proof strip (dark band). */
  specs?: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    stats: ScreenStat[];
  };

  /** Optional interactive mesh + color + finish explorer. */
  materials?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    backdropSrc: string;
    backdropAlt?: string;
    meshTypes: MeshType[];
    colors: ScreenColor[];
    finishes: ScreenFinish[];
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
    /** When set, the CTA becomes an outbound link instead of the consult modal. */
    ctaHref?: string;
    /**
     * Where the band renders. "after-hero" leads with the partner story — used
     * where the manufacturer is the reason to read on; defaults to sitting
     * below the product detail.
     */
    position?: "after-hero" | "default";
  };

  gallery: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    /** Gallery category slug — photos are pulled from lib/gallery. */
    category: string;
  };
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Shared styling for the vendor-band CTA (button or outbound link). */
const VENDOR_CTA: React.CSSProperties = {
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
};

export function ProductDetail({ config }: { config: ProductDetailConfig }) {
  const { openModal } = useConsultModal();
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: EASE },
  });

  /** Partner band — rendered either right after the hero or in its default slot. */
  const vendorBand = config.vendor ? (

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
              {config.vendor.ctaHref ? (
                <a
                  href={config.vendor.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...VENDOR_CTA, textDecoration: "none" }}
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
                </a>
              ) : (
                <button
                  onClick={() => openModal(config.consultSlug)}
                  style={VENDOR_CTA}
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
              )}
            </motion.div>
          </Container>
        </section>
  ) : null;

  const exploreHref = config.features
    ? "#features"
    : config.lineup
    ? "#lineup"
    : config.options
    ? "#options"
    : "#materials";

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
          exploreHref={exploreHref}
          exploreLabel="See the Details"
        />

        {/* ── 1b. PARTNER BAND (lead position) ────────────────────── */}
        {vendorBand && config.vendor?.position === "after-hero" && vendorBand}

        {/* ── 2. VALUE PROPS ──────────────────────────────────────── */}
        {config.valueProps && (
          <ValuePropsStrip
            eyebrow={config.valueProps.eyebrow}
            heading={config.valueProps.heading}
            items={config.valueProps.items}
          />
        )}

        {/* ── 3. FEATURE INFOGRAPHIC ──────────────────────────────── */}
        {config.features && (
          <div id="features" style={{ scrollMarginTop: "90px" }}>
            <LouveredPergolaExperience
              imageSrc={config.features.imageSrc}
              imageAlt={config.features.imageAlt}
              eyebrow={config.features.eyebrow}
              title={config.features.title}
              callouts={config.features.callouts}
            />
          </div>
        )}

        {/* ── 3a. PARTNER PRODUCT LINEUP (3-up cards) ─────────────── */}
        {config.lineup && (
          <section
            id="lineup"
            className="py-16 md:py-24"
            style={{
              background: "var(--bg-pure)",
              borderTop: "1px solid var(--rich-sand)",
              scrollMarginTop: "90px",
            }}
          >
            <Container>
              <motion.div {...reveal()} style={{ marginBottom: "2.75rem", maxWidth: "54ch" }}>
                {config.lineup.eyebrow && (
                  <p
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(184,146,74,0.85)",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {config.lineup.eyebrow}
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
                  {config.lineup.heading}
                </h2>
                {config.lineup.intro && (
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                      marginTop: "0.9rem",
                    }}
                  >
                    {config.lineup.intro}
                  </p>
                )}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {config.lineup.items.map((item, i) => {
                  const CardTag = item.href ? motion.a : motion.div;
                  const linkProps = item.href
                    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                    : {};
                  return (
                    <CardTag
                      key={item.name}
                      {...reveal(i * 0.08)}
                      {...linkProps}
                      className="group flex h-full flex-col p-7 md:p-8 transition-colors hover:bg-[rgba(184,146,74,0.08)]"
                      style={{
                        background: "var(--bg-pure)",
                        border: "1.5px solid rgba(184,146,74,0.28)",
                        textDecoration: "none",
                        cursor: item.href ? "pointer" : "default",
                      }}
                    >
                      {item.category && (
                        <p
                          style={{
                            fontSize: "0.64rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                            color: "var(--rich-warm)",
                            marginBottom: "0.7rem",
                          }}
                        >
                          {item.category}
                        </p>
                      )}
                      <h3
                        className="group-hover:underline"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "clamp(1.25rem, 1.9vw, 1.55rem)",
                          fontWeight: 600,
                          color: "var(--ink-primary)",
                          lineHeight: 1.2,
                          marginBottom: "0.7rem",
                          textUnderlineOffset: "0.18em",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: 1.7,
                          fontWeight: 500,
                          color: "var(--ink-muted)",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {item.blurb}
                      </p>

                      <ul style={{ marginBottom: "1.5rem", listStyle: "none", padding: 0 }}>
                        {item.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex items-baseline gap-2.5"
                            style={{
                              fontSize: "0.84rem",
                              lineHeight: 1.6,
                              fontWeight: 500,
                              color: "var(--ink-primary)",
                              paddingTop: "0.5rem",
                              borderTop: "1px solid rgba(184,146,74,0.18)",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "1px",
                                background: "rgba(184,146,74,0.7)",
                                flexShrink: 0,
                                transform: "translateY(-4px)",
                              }}
                            />
                            {pt}
                          </li>
                        ))}
                      </ul>

                      {item.href && (
                        <span
                          className="mt-auto inline-flex items-center gap-2 group-hover:underline"
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "var(--rich-warm)",
                            textUnderlineOffset: "0.22em",
                          }}
                        >
                          {item.linkLabel ?? "View Specs"}
                          <ArrowUpRight aria-hidden size={14} strokeWidth={1.75} />
                        </span>
                      )}
                    </CardTag>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        {/* ── 3b. SPEC BAND ───────────────────────────────────────── */}
        {config.specs && (
          <ScreenSpecBand
            eyebrow={config.specs.eyebrow}
            heading={config.specs.heading}
            intro={config.specs.intro}
            stats={config.specs.stats}
          />
        )}

        {/* ── 3c. MESH & COLOR EXPLORER ───────────────────────────── */}
        {config.materials && (
          <div id="materials" style={{ scrollMarginTop: "90px" }}>
            <ScreenMeshExplorer
              eyebrow={config.materials.eyebrow}
              heading={config.materials.heading}
              intro={config.materials.intro}
              backdropSrc={config.materials.backdropSrc}
              backdropAlt={config.materials.backdropAlt}
              meshTypes={config.materials.meshTypes}
              colors={config.materials.colors}
              finishes={config.materials.finishes}
            />
          </div>
        )}

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
        {vendorBand && config.vendor?.position !== "after-hero" && vendorBand}

        {/* ── 6. GALLERY ──────────────────────────────────────────── */}
        <ProductGallery
          category={config.gallery.category}
          eyebrow={config.gallery.eyebrow}
          heading={config.gallery.heading}
          intro={config.gallery.intro}
        />

        {/* ── 7. CLOSING CTA ──────────────────────────────────────── */}
        <CtaBand inverted />
      </main>

      <Footer />
    </>
  );
}

export default ProductDetail;
