"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { MobileMenu } from "./MobileMenu";

const LEFT_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const RIGHT_LINKS = [
  { href: "/service-areas", label: "Service Areas" },
];

const PRODUCT_LINKS = [
  { href: "/products/exterior-shades", label: "Exterior Shades & Shutters" },
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
  fontSize: "1rem",
  fontWeight: 450,
  letterSpacing: "0.1em",
  textDecoration: "none",
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
              <Link
                key={link.href}
                href={link.href}
                className="block px-5 py-3 transition-colors hover:bg-[var(--rich-sand)]"
                style={{
                  ...LINK_BASE,
                  fontSize: "0.875rem",
                  color: "var(--ink-primary)",
                  borderBottom: "1px solid var(--rich-sand)",
                }}
              >
                {link.label}
              </Link>
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
            fontSize: "2.5rem",
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

          {/* ── Desktop nav row ── */}
          <div className="hidden md:flex items-center justify-between py-5 relative">

            {/* Left nav */}
            <nav className="flex items-center gap-0.5 lg:gap-2" aria-label="Main navigation">
              <ProductsDropdown scrolled={es} />
              {LEFT_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} scrolled={es} />
              ))}
            </nav>

            {/* Compact logo — always visible on non-home, fades in on home when scrolled */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-300"
              style={{
                ...LOGO_FONT,
                fontSize: "1.05rem",
                color: "var(--ink-primary)",
                opacity: es ? 1 : 0,
                pointerEvents: es ? "auto" : "none",
              }}
            >
              SJB Outdoors
            </Link>

            {/* Right nav */}
            <nav className="flex items-center gap-0.5 lg:gap-2" aria-label="Secondary navigation">
              {RIGHT_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} scrolled={es} />
              ))}

              <button
                onClick={() => openModal()}
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
          <div className="flex md:hidden items-center justify-between py-4">
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
