import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { SERVICE_AREA_DOTS } from "@/components/layout/FloridaMap";
import { ServiceAreasMap } from "@/components/service-areas/ServiceAreasMap";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "SJB Outdoor Living installs custom outdoor living systems across 19 Florida cities — from Pensacola and Tallahassee to Naples, Fort Myers, and Palm Beach.",
};

const REGIONS = [
  { label: "Panhandle", cityNames: ["Pensacola", "Navarre Beach", "Destin", "Santa Rosa Beach", "Panama City", "Tallahassee"] },
  { label: "North Florida & First Coast", cityNames: ["Jacksonville", "Jacksonville Beach", "St Augustine", "St Augustine Beach", "Daytona"] },
  { label: "Central & Nature Coast", cityNames: ["Gainesville", "Newberry", "Ocala", "Crystal River"] },
  { label: "Southwest Florida", cityNames: ["Fort Myers", "Bonita Springs", "Naples"] },
  { label: "Southeast Coast", cityNames: ["Palm Beach"] },
];

export default function ServiceAreasPage() {
  const cityByName = Object.fromEntries(SERVICE_AREA_DOTS.map((c) => [c.name, c]));

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-20" style={{ borderBottom: "1px solid var(--rich-sand)" }}>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <div>
                <p className="text-eyebrow mb-4">Service Areas</p>
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3.75rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.05,
                    maxWidth: "16ch",
                  }}
                >
                  Nineteen Florida towns. One standard of craft.
                </h1>
                <p
                  className="mt-5 text-base"
                  style={{ color: "var(--ink-muted)", maxWidth: "54ch", lineHeight: 1.7 }}
                >
                  From the Panhandle&apos;s sugar-white beaches to the cypress canals of
                  Naples, our installation crews bring the same hand-fit detail to
                  every coastline. Pick a city below to see local install photos,
                  product fit notes, and what we&apos;ve learned about the weather there.
                </p>
                <div className="mt-7">
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontSize: "0.7rem",
                      color: "var(--rich-warm)",
                    }}
                  >
                    19 Cities · 5 Regions · One Family
                  </p>
                </div>
              </div>

              {/* Right: static map */}
              <div>
                <ServiceAreasMap />
              </div>
            </div>
          </Container>
        </section>

        {/* ── Region directory ─────────────────────────────── */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="mb-12 md:mb-16 max-w-2xl">
              <p className="text-eyebrow mb-3">Directory</p>
              <h2 className="text-h2" style={{ color: "var(--ink-primary)" }}>
                Find your coastline.
              </h2>
              <p className="mt-4 text-base" style={{ color: "var(--ink-muted)" }}>
                Each region carries its own quirks — salt spray, wind load,
                afternoon sun lines. Click through for the local detail.
              </p>
            </div>

            <div className="space-y-12 md:space-y-16">
              {REGIONS.map((region) => (
                <div key={region.label}>
                  <div className="flex items-baseline justify-between gap-6 mb-6 pb-3" style={{ borderBottom: "1px solid var(--rich-sand)" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                        fontWeight: 500,
                        color: "var(--ink-primary)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {region.label}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--rich-warm)",
                      }}
                    >
                      {region.cityNames.length} {region.cityNames.length === 1 ? "City" : "Cities"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1">
                    {region.cityNames.map((name) => {
                      const c = cityByName[name];
                      if (!c) return null;
                      return (
                        <Link
                          key={name}
                          href={c.href}
                          className="group inline-flex items-center gap-2 py-0.5 w-fit transition-colors hover:text-[var(--rich-warm)]"
                          style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "1.05rem",
                            color: "var(--ink-primary)",
                            letterSpacing: "0.01em",
                            borderBottom: "1px solid rgba(184,146,74,0.45)",
                            paddingBottom: "1px",
                          }}
                        >
                          <span>{name}</span>
                          <ArrowUpRight
                            aria-hidden="true"
                            size={14}
                            strokeWidth={1.75}
                            className="flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                            style={{ color: "var(--rich-warm)" }}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}
