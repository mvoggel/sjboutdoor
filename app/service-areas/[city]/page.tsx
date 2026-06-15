import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { CityHeroMap } from "@/components/service-areas/CityHeroMap";
import { ConsultButton } from "@/components/service-areas/ConsultButton";
import { SERVICE_CITIES, getServiceCity } from "@/lib/service-areas";
import { buildCityContent } from "@/lib/service-area-content";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import { SITE_URL, BRAND_NAME, absUrl } from "@/lib/site";

export function generateStaticParams() {
  return SERVICE_CITIES.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getServiceCity(slug);
  if (!city) return {};

  const title = `Louvered Pergolas, Shades, Shutters & Awnings in ${city.name}, FL`;
  const description = `Custom louvered pergolas, exterior shades, exterior shutters, and retractable awnings for ${city.name}, FL homes. Free in-home consultations across ${city.county} County. Built for ${city.region}.`;

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `/service-areas/${city.slug}`,
      type: "website",
    },
  };
}

export default async function CityServiceAreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getServiceCity(slug);
  if (!city) notFound();

  const content = buildCityContent(city);

  const cityUrl = absUrl(`/service-areas/${city.slug}`);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Outdoor living systems — louvered pergolas, exterior shades, exterior shutters, retractable awnings",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BRAND_NAME,
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, FL`,
    },
    description: content.intro[0],
    url: cityUrl,
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        <JsonLd
          data={[
            serviceJsonLd,
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Service Areas", url: absUrl("/service-areas") },
              { name: city.name, url: cityUrl },
            ]),
          ]}
        />

        {/* ── Hero: title left, zoomed map right ───────────────────── */}
        <section
          className="pt-32 md:pt-40 pb-16 md:pb-20"
          style={{ borderBottom: "1px solid var(--rich-sand)" }}
        >
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <div>
                <p className="text-eyebrow mb-4">Service Area</p>
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3.6rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.05,
                    maxWidth: "18ch",
                  }}
                >
                  {content.heroTitle}
                </h1>
                <p
                  className="mt-5"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontSize: "0.72rem",
                    color: "var(--rich-warm)",
                  }}
                >
                  {content.heroTagline}
                </p>
                <p
                  className="mt-6 text-base"
                  style={{ color: "var(--ink-muted)", maxWidth: "52ch", lineHeight: 1.7 }}
                >
                  Louvered pergolas · Exterior shades · Exterior shutters · Retractable awnings —
                  designed, measured, and installed for {city.name} homes.
                </p>
                <div className="mt-8">
                  <ConsultButton label={`Free ${city.name} Consultation`} />
                </div>
              </div>

              {/* Right: zoomed map */}
              <div className="relative">
                <CityHeroMap cx={city.cx} cy={city.cy} cityName={city.name} />
                <p
                  className="mt-3 text-center"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--rich-warm)",
                  }}
                >
                  {city.name} · {city.region}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Intro / About ────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <p className="text-eyebrow mb-3">About</p>
              <h2 className="text-h2 mb-6" style={{ color: "var(--ink-primary)" }}>
                Outdoor living, built for {city.name}.
              </h2>
              <div className="space-y-5">
                {content.intro.map((para, i) => (
                  <p key={i} className="text-base" style={{ color: "var(--ink-muted)", lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Product sections ─────────────────────────────────────── */}
        <section
          className="pb-8"
          style={{ borderTop: "1px solid var(--rich-sand)" }}
        >
          <Container>
            <div className="divide-y" style={{ borderColor: "var(--rich-sand)" }}>
              {content.products.map((product, i) => (
                <div
                  key={product.slug}
                  className="py-12 md:py-16 grid md:grid-cols-12 gap-6 md:gap-10"
                  style={{ borderColor: "var(--rich-sand)" }}
                >
                  <div className="md:col-span-4">
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--rich-warm)",
                      }}
                    >
                      0{i + 1} · {product.eyebrow}
                    </span>
                    <h3
                      className="mt-3"
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                        fontWeight: 500,
                        color: "var(--ink-primary)",
                        lineHeight: 1.15,
                      }}
                    >
                      {product.title}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-base" style={{ color: "var(--ink-muted)", lineHeight: 1.8 }}>
                      {product.body}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href={product.href}
                        className="group inline-flex items-center gap-2"
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "0.95rem",
                          color: "var(--ink-primary)",
                          letterSpacing: "0.02em",
                          borderBottom: "1px solid rgba(184,146,74,0.45)",
                          paddingBottom: "1px",
                        }}
                      >
                        <span>Explore {product.eyebrow}</span>
                        <ArrowUpRight
                          aria-hidden
                          size={15}
                          strokeWidth={1.75}
                          className="flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                          style={{ color: "var(--rich-warm)" }}
                        />
                      </Link>
                      <ConsultButton
                        productSlug={product.slug}
                        variant="outline"
                        label="Get a Quote"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Why choose us ────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ background: "var(--rich-deep)" }}>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <p
                  className="mb-3"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--rich-warm)",
                  }}
                >
                  Why SJB Outdoor Living
                </p>
                <h2 className="text-h2" style={{ color: "var(--bg-pure)" }}>
                  Local craft, handled start to finish.
                </h2>
                <p className="mt-5 text-base" style={{ color: "rgba(252,251,247,0.8)", lineHeight: 1.8 }}>
                  We&apos;re not a national chain. We design, measure, and install every system
                  in-house, and we stand behind the work long after the crew leaves {city.name}.
                </p>
                <div className="mt-8">
                  <ConsultButton label="Schedule a Consultation" />
                </div>
              </div>
              <ul className="space-y-4">
                {content.whyChoose.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span aria-hidden style={{ color: "var(--rich-warm)", lineHeight: 1.6 }}>
                      ✦
                    </span>
                    <span className="text-base" style={{ color: "rgba(252,251,247,0.88)", lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* ── Closing ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <p className="text-eyebrow mb-3">Get in touch</p>
              <h2 className="text-h2 mb-6" style={{ color: "var(--ink-primary)" }}>
                Let&apos;s design your {city.name} outdoor space.
              </h2>
              <p className="text-base" style={{ color: "var(--ink-muted)", lineHeight: 1.8 }}>
                {content.closing}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ConsultButton label="Schedule Consultation" />
                <Link
                  href="/service-areas"
                  style={{
                    padding: "0.95rem 2rem",
                    background: "transparent",
                    color: "var(--ink-primary)",
                    border: "1px solid var(--rich-sand)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.85rem",
                    fontWeight: 450,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  All Service Areas
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}
