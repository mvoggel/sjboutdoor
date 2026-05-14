import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

// TODO: confirm FL location addresses before launch
const LOCATIONS = [
  {
    name: "Naples",
    address: "TBD — Naples, FL",
    phone: "(239) 555-0100",
  },
  {
    name: "Bonita Springs",
    address: "TBD — Bonita Springs, FL",
    phone: "(239) 555-0101",
  },
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
              SJB Outdoors
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(252,251,247,0.65)" }}
            >
              South Jersey Blinds — bringing refined outdoor living
              to Southwest Florida.
            </p>
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

          {/* Locations */}
          {LOCATIONS.map((loc) => (
            <div key={loc.name}>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-4"
                style={{ color: "var(--rich-warm)" }}
              >
                {loc.name}
              </p>
              <address className="not-italic space-y-2">
                <p
                  className="text-sm"
                  style={{ color: "rgba(252,251,247,0.75)" }}
                >
                  {loc.address}
                </p>
                <a
                  href={`tel:${loc.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--rich-warm)]"
                  style={{ color: "rgba(252,251,247,0.75)" }}
                >
                  <Phone size={14} />
                  {loc.phone}
                </a>
                <a
                  href="mailto:info@sjboutdoors.com"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--rich-warm)]"
                  style={{ color: "rgba(252,251,247,0.75)" }}
                >
                  <Mail size={14} />
                  info@sjboutdoors.com
                </a>
              </address>
              <p
                className="mt-3 text-xs"
                style={{ color: "rgba(252,251,247,0.45)" }}
              >
                Mon–Fri 8am–6pm · Sat 9am–3pm
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "var(--stone-dark)" }}>
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(252,251,247,0.45)" }}>
            © {new Date().getFullYear()} South Jersey Blinds. All rights reserved.
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
