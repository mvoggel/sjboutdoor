import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FloridaMap, SERVICE_AREA_DOTS } from "@/components/layout/FloridaMap";
import { BRAND_NAME, LEGAL_NAME, PHONE_DISPLAY, PHONE_E164, EMAIL } from "@/lib/site";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/our-process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      style={{ background: "var(--near-black)", color: "var(--bg-pure)" }}
    >
      {/* Main footer grid */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-1">
            <p
              className="text-lg font-medium mb-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {BRAND_NAME}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(252,251,247,0.65)" }}
            >
              Refined outdoor living for Florida homes — custom shades, awnings,
              pergolas, and shutters.
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <a
                href={`tel:${PHONE_E164}`}
                className="transition-colors hover:text-[var(--rich-warm)]"
                style={{ color: "rgba(252,251,247,0.75)" }}
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="transition-colors hover:text-[var(--rich-warm)]"
                style={{ color: "rgba(252,251,247,0.75)", wordBreak: "break-word" }}
              >
                {EMAIL}
              </a>
            </div>
            <div className="flex gap-3 mt-5">
              {/* Instagram */}
              <a
                href="#"
                aria-label="SJB Outdoors on Instagram"
                className="p-2 rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.4)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="SJB Outdoors on Facebook"
                className="p-2 rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.4)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--rich-warm)" }}
            >
              Navigate
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--rich-warm)]"
                    style={{ color: "rgba(252,251,247,0.75)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas — map + 2-column link list — spans 2 cols */}
          <div className="md:col-span-2">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--rich-warm)" }}
            >
              Service Areas
            </p>

            {/* Map + cities — stacks vertically on mobile, side-by-side from sm+ */}
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-5">
              {/* Florida SVG map */}
              <div className="mx-auto sm:mx-0" style={{ flexShrink: 0 }}>
                <FloridaMap />
              </div>

              {/* Two-column city link list — uses CSS columns so it always fills
                  the available width without forcing a horizontal scroll */}
              <div
                className="w-full"
                style={{
                  columnCount: 2,
                  columnGap: "1.25rem",
                }}
              >
                {SERVICE_AREA_DOTS.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    className="block transition-colors hover:text-[var(--rich-warm)]"
                    style={{
                      color: "rgba(252,251,247,0.7)",
                      fontSize: "0.78rem",
                      lineHeight: 1.65,
                      breakInside: "avoid",
                      paddingBottom: "0.15rem",
                    }}
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "var(--stone-dark)" }}>
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(252,251,247,0.45)" }}>
            © {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs" style={{ color: "rgba(252,251,247,0.45)" }}>
            <Link href="/privacy" className="hover:text-[var(--rich-warm)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--rich-warm)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
