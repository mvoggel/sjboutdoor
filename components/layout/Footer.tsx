import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/our-process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

// TODO: confirm exact addresses before launch
const SERVICE_AREAS = [
  {
    name: "Naples",
    href: "/service-areas/naples",
    coords: { x: 37.5, y: 127 },
  },
  {
    name: "Bonita Springs",
    href: "/service-areas/bonita-springs",
    coords: { x: 37, y: 117 },
  },
  {
    name: "Fort Myers",
    href: "/service-areas/fort-myers",
    coords: { x: 37, y: 107 },
  },
];

// Minimal Florida outline — viewBox "0 0 100 170"
// Clockwise from NW panhandle corner
function FloridaMap() {
  return (
    <svg
      viewBox="0 0 100 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Map of Southwest Florida service areas"
      style={{ width: "100%", maxWidth: "120px", display: "block" }}
    >
      {/* State outline */}
      <path
        d={[
          "M 2,12",          // NW panhandle
          "L 38,4",
          "L 100,6",         // NE (Atlantic)
          "L 98,20",
          "L 96,30",
          "L 95,52",
          "L 93,76",
          "L 90,99",
          "L 86,118",
          "L 80,134",
          "L 72,148",
          "L 62,159",
          "L 52,166",
          "L 47,172",        // SE tip
          "L 43,166",
          "L 40,156",
          "L 38,143",
          "L 36,128",
          "L 35,110",
          "L 34,90",
          "L 35,70",
          "L 36,52",
          "L 38,36",
          "L 36,28",         // peninsula-panhandle junction
          "L 22,18",
          "L 6,14",
          "Z",
        ].join(" ")}
        fill="rgba(184,146,74,0.07)"
        stroke="rgba(184,146,74,0.38)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Service area dots */}
      {SERVICE_AREAS.map((area) => (
        <circle
          key={area.name}
          cx={area.coords.x}
          cy={area.coords.y}
          r="3"
          fill="var(--rich-warm)"
          opacity="0.9"
        />
      ))}

      {/* Connector lines between dots */}
      <line
        x1={SERVICE_AREAS[0].coords.x}
        y1={SERVICE_AREAS[0].coords.y}
        x2={SERVICE_AREAS[2].coords.x}
        y2={SERVICE_AREAS[2].coords.y}
        stroke="rgba(184,146,74,0.25)"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

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

          {/* Locations — map + links — spans 2 cols */}
          <div className="md:col-span-2">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--rich-warm)" }}
            >
              Service Areas
            </p>

            <div className="flex items-start gap-8">
              {/* Florida map */}
              <div style={{ flexShrink: 0, width: "80px" }}>
                <FloridaMap />
              </div>

              {/* Location links */}
              <div className="flex flex-col gap-5">
                {SERVICE_AREAS.map((area) => (
                  <div key={area.name}>
                    <Link
                      href={area.href}
                      className="text-sm font-medium transition-colors hover:text-[var(--rich-warm)]"
                      style={{
                        color: "rgba(252,251,247,0.88)",
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "0.95rem",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {area.name}, FL
                    </Link>
                    <div className="mt-1 flex flex-col gap-1">
                      <a
                        href="tel:+12395550100"
                        className="flex items-center gap-1.5 transition-colors hover:text-[var(--rich-warm)]"
                        style={{ color: "rgba(252,251,247,0.5)", fontSize: "0.78rem" }}
                      >
                        <Phone size={11} />
                        (239) 555-0100
                      </a>
                      <a
                        href="mailto:info@sjboutdoors.com"
                        className="flex items-center gap-1.5 transition-colors hover:text-[var(--rich-warm)]"
                        style={{ color: "rgba(252,251,247,0.5)", fontSize: "0.78rem" }}
                      >
                        <Mail size={11} />
                        info@sjboutdoors.com
                      </a>
                    </div>
                  </div>
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
