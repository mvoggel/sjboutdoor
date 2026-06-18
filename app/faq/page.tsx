import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd, faqPage } from "@/components/seo/JsonLd";
import { BRAND_NAME, PHONE_DISPLAY, PHONE_E164, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about ${BRAND_NAME} — consultations, products, installation, warranties, and service across Florida.`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `Frequently Asked Questions | ${BRAND_NAME}`,
    description: `Common questions about consultations, products, installation, and warranties.`,
    url: "/faq",
    type: "website",
  },
};

// Generic starter set — edit/extend as real questions come in from customers.
const FAQS: { q: string; a: string }[] = [
  {
    q: "What areas do you serve?",
    a: "We provide free in-home consultations and installation to homeowners across Florida. If you're not sure whether you're in our service area, just reach out and we'll let you know.",
  },
  {
    q: "How does the consultation process work?",
    a: "It starts with a free, no-pressure in-home visit. We assess your space, sun angles, and goals, bring real swatches, take exact measurements, and provide honest pricing — all before you commit to anything.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. The in-home consultation, measurement, and quote are completely free, with no obligation to purchase.",
  },
  {
    q: "What products do you offer?",
    a: "Exterior shades and patio screens, retractable awnings, louvered pergolas, and exterior shutters (including Bahama and storm shutters), along with garage-door screens. Everything is built to your exact opening.",
  },
  {
    q: "Are your products custom-made?",
    a: "Yes. We fabricate to your exact measurements rather than forcing off-the-shelf sizes, so the fit and finish are right for your home.",
  },
  {
    q: "How long does installation take?",
    a: "Most installations are completed in a single day by our own crew, though larger or multi-product projects may take longer. We'll give you a clear timeline with your quote.",
  },
  {
    q: "Do your products come with a warranty?",
    a: "Yes. Warranty coverage varies by product and is detailed in your written quote and accompanying manufacturer documentation. We're happy to walk you through it during your consultation.",
  },
  {
    q: "Can your shades and awnings be motorized?",
    a: "Many of our products offer motorization and smart-home integration. We'll recommend it when it fits your setup — never just for the sake of it.",
  },
  {
    q: "How do I get started?",
    a: `The easiest way is to schedule a consultation through our site, or call us at ${PHONE_DISPLAY}. You can also email ${EMAIL} and a real person will get back to you.`,
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPage(FAQS)} />
      <Header />

      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="pt-32 md:pt-40 pb-16 md:pb-20"
          style={{ borderBottom: "1px solid var(--rich-sand)" }}
        >
          <Container>
            <div style={{ maxWidth: "60ch" }}>
              <p className="text-eyebrow mb-4">Questions, answered</p>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.05,
                }}
              >
                Frequently asked questions
              </h1>
              <p
                className="mt-5 text-base"
                style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}
              >
                The things homeowners ask us most. Don&apos;t see your question?{" "}
                <a
                  href={`tel:${PHONE_E164}`}
                  style={{
                    color: "var(--ink-primary)",
                    borderBottom: "1px solid rgba(184,146,74,0.5)",
                  }}
                >
                  Call us
                </a>{" "}
                or{" "}
                <a
                  href="/contact"
                  style={{
                    color: "var(--ink-primary)",
                    borderBottom: "1px solid rgba(184,146,74,0.5)",
                  }}
                >
                  send a message
                </a>
                .
              </p>
            </div>
          </Container>
        </section>

        {/* ── Q&A list ─────────────────────────────────────────── */}
        <section className="py-14 md:py-20">
          <Container>
            <div style={{ maxWidth: "70ch" }}>
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group"
                  style={{ borderBottom: "1px solid var(--rich-sand)" }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 cursor-pointer list-none py-5"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)",
                      fontWeight: 500,
                      color: "var(--ink-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                      style={{
                        fontSize: "1.6rem",
                        lineHeight: 1,
                        color: "var(--rich-warm)",
                        fontWeight: 300,
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="pb-6 -mt-1"
                    style={{
                      color: "var(--ink-muted)",
                      fontSize: "1rem",
                      lineHeight: 1.75,
                      maxWidth: "62ch",
                    }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <CtaBand />
      </main>

      <Footer />
    </>
  );
}
