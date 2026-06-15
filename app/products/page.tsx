import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import { SITE_URL, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — Outdoor Living Systems",
  description:
    "Explore SJB Outdoor Living product lines: louvered pergolas, retractable awnings, exterior shades, exterior shutters, Bahama shutters, storm shutters, and motorized patio & garage screens — custom-built for Florida homes.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — SJB Outdoor Living",
    description:
      "Louvered pergolas, retractable awnings, exterior shades, shutters, and motorized screens for Florida homes.",
    url: "/products",
    type: "website",
  },
};

const PRODUCTS = [
  {
    href: "/products/louvered-pergolas",
    name: "Louvered Pergolas",
    blurb: "Adjustable aluminum roof louvers for sun, shade, and rain on demand.",
  },
  {
    href: "/products/retractable-awnings",
    name: "Retractable Awnings",
    blurb: "Motorized fabric awnings with LED lighting and cassette housing.",
  },
  {
    href: "/products/exterior-shades",
    name: "Exterior Shades",
    blurb: "Motorized solar shades that stop heat and UV before the glass.",
  },
  {
    href: "/products/exterior-shutters",
    name: "Exterior Shutters",
    blurb: "Permanently mounted, adjustable-louver shutters with coastal character.",
  },
  {
    href: "/products/bahama-shutters",
    name: "Bahama Shutters",
    blurb: "Top-hinged shutters for passive sun control and storm-season readiness.",
  },
  {
    href: "/products/storm-shutters",
    name: "Storm Shutters",
    blurb: "Code-rated accordion, roll-up, and panel shutters that deploy in minutes.",
  },
  {
    href: "/products/patio-screens",
    name: "Patio Screens",
    blurb: "Motorized retractable lanai screens spanning up to 30 ft, no center post.",
  },
  {
    href: "/products/garage-door-screens",
    name: "Garage Door Screens",
    blurb: "Full-height motorized garage screens that roll into a discreet header.",
  },
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SJB Outdoor Living Products",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: absUrl(p.href),
  })),
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        <JsonLd
          data={[
            itemList,
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Products", url: absUrl("/products") },
            ]),
          ]}
        />

        <section
          className="pt-32 md:pt-40 pb-12 md:pb-16"
          style={{ borderBottom: "1px solid var(--rich-sand)" }}
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-eyebrow mb-4">Products</p>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.6rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.05,
                }}
              >
                Outdoor living systems, built for Florida.
              </h1>
              <p
                className="mt-6 text-base"
                style={{ color: "var(--ink-muted)", maxWidth: "60ch", lineHeight: 1.8 }}
              >
                Every line below is custom-measured, fabricated, and installed by our own
                crews. Explore each product to see features, fabrics, and our in-browser
                configurators.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-16">
          <Container>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--rich-sand)", border: "1px solid var(--rich-sand)" }}>
              {PRODUCTS.map((p) => (
                <li key={p.href} style={{ background: "var(--bg-pure)" }}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col justify-between gap-6 p-7 md:p-8 transition-colors hover:bg-[rgba(184,146,74,0.05)]"
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "1.5rem",
                          fontWeight: 500,
                          color: "var(--ink-primary)",
                          lineHeight: 1.2,
                          marginBottom: "0.6rem",
                        }}
                      >
                        {p.name}
                      </h2>
                      <p className="text-sm" style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>
                        {p.blurb}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.85rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--rich-warm)",
                      }}
                    >
                      Explore
                      <ArrowUpRight
                        aria-hidden
                        size={15}
                        strokeWidth={1.75}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}
