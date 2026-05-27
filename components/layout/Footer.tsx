import Link from "next/link";
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

const SERVICE_AREAS = [
  // Southwest Florida
  { name: "Naples",            href: "/service-areas/naples",             coords: { x: 37.5, y: 127 } },
  { name: "Bonita Springs",    href: "/service-areas/bonita-springs",     coords: { x: 37,   y: 117 } },
  { name: "Fort Myers",        href: "/service-areas/fort-myers",         coords: { x: 37,   y: 107 } },
  // Central West / Nature Coast
  { name: "Crystal River",     href: "/service-areas/crystal-river",      coords: { x: 34,   y: 78  } },
  // Central Florida
  { name: "Ocala",             href: "/service-areas/ocala",              coords: { x: 56,   y: 72  } },
  { name: "Gainesville",       href: "/service-areas/gainesville",        coords: { x: 54,   y: 60  } },
  { name: "Newberry",          href: "/service-areas/newberry",           coords: { x: 48,   y: 58  } },
  // Southeast
  { name: "Palm Beach",        href: "/service-areas/palm-beach",         coords: { x: 82,   y: 136 } },
  // East Coast (north)
  { name: "Daytona",           href: "/service-areas/daytona",            coords: { x: 90,   y: 68  } },
  { name: "St Augustine Beach",href: "/service-areas/st-augustine-beach", coords: { x: 94,   y: 50  } },
  { name: "St Augustine",      href: "/service-areas/st-augustine",       coords: { x: 90,   y: 47  } },
  { name: "Jacksonville Beach",href: "/service-areas/jacksonville-beach", coords: { x: 93,   y: 41  } },
  { name: "Jacksonville",      href: "/service-areas/jacksonville",       coords: { x: 84,   y: 38  } },
  // North Florida / Panhandle
  { name: "Tallahassee",       href: "/service-areas/tallahassee",        coords: { x: 40,   y: 28  } },
  { name: "Panama City",       href: "/service-areas/panama-city",        coords: { x: 27,   y: 20  } },
  { name: "Destin",            href: "/service-areas/destin",             coords: { x: 17,   y: 15  } },
  { name: "Santa Rosa Beach",  href: "/service-areas/santa-rosa-beach",   coords: { x: 13,   y: 13  } },
  { name: "Navarre Beach",     href: "/service-areas/navarre-beach",      coords: { x: 9,    y: 12  } },
  { name: "Pensacola",         href: "/service-areas/pensacola",          coords: { x: 4,    y: 12  } },
];

// Split into two columns for the link grid
const COL_A = SERVICE_AREAS.slice(0, 10);
const COL_B = SERVICE_AREAS.slice(10);

function FloridaMap() {
  return (
    <svg
      viewBox="0 0 100 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Map of Florida service areas"
      style={{ width: "100%", maxWidth: "120px", display: "block" }}
    >
      {/* State outline */}
      <path
        d={[
          "M 2,12",
          "L 38,4",
          "L 100,6",
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
          "L 47,172",
          "L 43,166",
          "L 40,156",
          "L 38,143",
          "L 36,128",
          "L 35,110",
          "L 34,90",
          "L 35,70",
          "L 36,52",
          "L 38,36",
          "L 36,28",
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
          r="2"
          fill="var(--rich-warm)"
          opacity="0.85"
        />
      ))}
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

          {/* Service Areas — map + 2-column link grid — spans 2 cols */}
          <div className="md:col-span-2">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--rich-warm)" }}
            >
              Service Areas
            </p>

            <div className="flex items-start gap-5">
              {/* Florida map */}
              <div style={{ flexShrink: 0, width: "72px" }}>
                <FloridaMap />
              </div>

              {/* Two-column city link list */}
              <div style={{ display: "flex", gap: "1.25rem", flex: 1 }}>
                {[COL_A, COL_B].map((col, ci) => (
                  <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {col.map((area) => (
                      <Link
                        key={area.href}
                        href={area.href}
                        className="transition-colors hover:text-[var(--rich-warm)]"
                        style={{
                          color: "rgba(252,251,247,0.7)",
                          fontSize: "0.78rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {area.name}
                      </Link>
                    ))}
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
