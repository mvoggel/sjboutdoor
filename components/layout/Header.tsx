"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { productSlugFromPath } from "@/lib/product-slug-from-path";
import { MobileMenu } from "./MobileMenu";

const LEFT_LINKS = [
  { href: "/about", label: "About" },
  { href: "/our-process", label: "Our Process" },
  { href: "/contact", label: "Contact" },
];

const RIGHT_LINKS = [
  { href: "/service-areas", label: "Service Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
];

type ProductLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const PRODUCT_LINKS: ProductLink[] = [
  {
    href: "/products/exterior-shades",
    label: "Exterior Shades",
    children: [
      { href: "/products/patio-screens", label: "Patio Screens" },
      { href: "/products/garage-door-screens", label: "Garage Door Screens" },
    ],
  },
  {
    href: "/products/exterior-shutters",
    label: "Exterior Shutters",
    children: [
      { href: "/products/bahama-shutters", label: "Bahama Shutters" },
      { href: "/products/storm-shutters", label: "Storm Shutters" },
    ],
  },
  { href: "/products/retractable-awnings", label: "Retractable Awnings" },
  { href: "/products/louvered-pergolas", label: "Louvered Pergolas" },
];

const LOGO_FONT: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
  fontWeight: 600,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  textDecoration: "none",
};

const LINK_BASE: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
  // Fluid: shrinks between the desktop breakpoint (1120px) and ~1300px so the
  // row never scrunches/overlaps before snapping to the mobile menu.
  fontSize: "clamp(0.9rem, 1.44vw - 0.11rem, 1.0625rem)",
  fontWeight: 450,
  letterSpacing: "0.08em",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

// Nav link that handles hero (not-scrolled) vs scrolled styles, including hover
function NavLink({
  href,
  label,
  scrolled,
}: {
  href: string;
  label: string;
  scrolled: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const heroStyle: React.CSSProperties = hovered
    ? {
        background: "var(--ink-primary)",
        color: "var(--bg-pure)",
        border: "1px solid rgba(14, 26, 31, 0.65)",
      }
    : {
        background: "rgba(255,255,255,0.50)",
        color: "var(--ink-primary)",
        border: "1px solid rgba(14, 26, 31, 0.2)",
      };

  return (
    <Link
      href={href}
      className={
        scrolled
          ? "px-2 py-1.5 lg:px-3 transition-all text-[var(--ink-primary)] hover:bg-[var(--ink-primary)] hover:text-[var(--bg-pure)]"
          : "px-2 py-1 lg:px-4 transition-all"
      }
      style={scrolled ? LINK_BASE : { ...LINK_BASE, ...heroStyle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

// Products dropdown trigger + panel
function ProductsDropdown({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const heroStyle: React.CSSProperties = hovered || open
    ? {
        background: "var(--ink-primary)",
        color: "var(--bg-pure)",
        border: "1px solid rgba(14, 26, 31, 0.65)",
      }
    : {
        background: "rgba(255,255,255,0.50)",
        color: "var(--ink-primary)",
        border: "1px solid rgba(14, 26, 31, 0.2)",
      };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        className={
          scrolled
            ? "flex items-center gap-1 px-2 py-1.5 lg:px-3 transition-all text-[var(--ink-primary)] hover:bg-[var(--ink-primary)] hover:text-[var(--bg-pure)]"
            : "flex items-center gap-1 px-2 py-1 lg:px-4 transition-all"
        }
        style={scrolled ? LINK_BASE : { ...LINK_BASE, ...heroStyle }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Products
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronDown size={13} strokeWidth={1.5} />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-1 min-w-[220px]"
            style={{
              background: "var(--bg-pure)",
              border: "1px solid var(--rich-sand)",
              boxShadow: "0 8px 24px rgba(14,26,31,0.1)",
              zIndex: 20,
            }}
          >
            {PRODUCT_LINKS.map((link) => (
              <div key={link.href} style={{ borderBottom: "1px solid var(--rich-sand)" }}>
                <Link
                  href={link.href}
                  className="block px-5 py-3 transition-colors hover:bg-[var(--rich-sand)]"
                  style={{
                    ...LINK_BASE,
                    fontSize: "0.875rem",
                    color: "var(--ink-primary)",
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div style={{ paddingBottom: "0.4rem" }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-5 py-2 transition-colors hover:bg-[var(--rich-sand)]"
                        style={{
                          ...LINK_BASE,
                          fontSize: "0.78rem",
                          color: "var(--ink-muted)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display: "inline-block",
                            width: "12px",
                            height: "1px",
                            background: "rgba(184,146,74,0.55)",
                            flexShrink: 0,
                          }}
                        />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const { openModal } = useConsultModal();
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On non-home pages the nav always looks like the scrolled/white state
  const es = !isHome || scrolled; // es = effectivelyScrolled

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Large hero logo — homepage only, fades out on scroll ── */}
      {isHome && (
        <Link
          href="/"
          aria-label="SJB Outdoors — home"
          className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-opacity duration-300"
          style={{
            ...LOGO_FONT,
            top: "50dvh",
            zIndex: 5,
            fontSize: "clamp(1.1rem, 6vw, 2.5rem)",
            color: "var(--bg-pure)",
            textShadow: "0 2px 12px rgba(14,26,31,0.4)",
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? "none" : "auto",
          }}
        >
          SJB Outdoors
        </Link>
      )}

      <header
        className="w-full top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          es
            ? {
                position: "fixed",
                background: "var(--bg-pure)",
                borderBottom: "1px solid var(--rich-sand)",
                boxShadow: "0 1px 8px rgba(14,26,31,0.06)",
              }
            : { position: "absolute" }
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Desktop nav row ──
              3-column grid (1fr · auto · 1fr) keeps the logo IN FLOW so its
              width is reserved and the left/right nav can never slide under it. */}
          <div
            className="hidden min-[1120px]:grid items-center py-5"
            style={{ gridTemplateColumns: "1fr auto 1fr", columnGap: "1rem" }}
          >

            {/* Left nav */}
            <nav className="flex items-center gap-1 xl:gap-2 justify-self-start" aria-label="Main navigation">
              <ProductsDropdown scrolled={es} />
              {LEFT_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} scrolled={es} />
              ))}
            </nav>

            {/* Compact logo — always visible on non-home, fades in on home when scrolled */}
            <Link
              href="/"
              className="justify-self-center whitespace-nowrap transition-opacity duration-300"
              style={{
                ...LOGO_FONT,
                fontSize: "clamp(0.92rem, 0.6rem + 0.5vw, 1.05rem)",
                color: "var(--ink-primary)",
                opacity: es ? 1 : 0,
                pointerEvents: es ? "auto" : "none",
              }}
            >
              SJB Outdoors
            </Link>

            {/* Right nav */}
            <nav className="flex items-center gap-1 xl:gap-2 justify-self-end" aria-label="Secondary navigation">
              {RIGHT_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} scrolled={es} />
              ))}

              <button
                onClick={() => openModal(productSlugFromPath(pathname))}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                className={
                  es
                    ? "px-4 py-1.5 border transition-all"
                    : "px-4 py-1 transition-all"
                }
                style={{
                  ...LINK_BASE,
                  ...(es
                    ? {
                        color: ctaHovered ? "var(--bg-pure)" : "var(--ink-primary)",
                        background: ctaHovered ? "var(--ink-primary)" : undefined,
                        borderColor: "var(--ink-primary)",
                      }
                    : ctaHovered
                    ? {
                        background: "var(--ink-primary)",
                        color: "var(--bg-pure)",
                        border: "1px solid rgba(14, 26, 31, 0.65)",
                      }
                    : {
                        background: "rgba(255,255,255,0.50)",
                        color: "var(--ink-primary)",
                        border: "1px solid rgba(14, 26, 31, 0.2)",
                      }),
                }}
              >
                Schedule Consultation
              </button>
            </nav>
          </div>

          {/* ── Mobile row ── */}
          <div className="flex min-[1120px]:hidden items-center justify-between py-4">
            <Link
              href="/"
              className="transition-opacity duration-300"
              style={{
                ...LOGO_FONT,
                fontSize: "1rem",
                color: "var(--ink-primary)",
                opacity: es ? 1 : 0,
                pointerEvents: es ? "auto" : "none",
              }}
            >
              SJB Outdoors
            </Link>
            <button
              className="p-2 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu
                size={20}
                style={{ color: es ? "var(--ink-primary)" : "var(--bg-pure)" }}
              />
            </button>
          </div>

        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
