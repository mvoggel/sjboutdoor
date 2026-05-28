"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import { productSlugFromPath } from "@/lib/product-slug-from-path";

const PRODUCT_SUBLINKS = [
  { href: "/products/exterior-shades", label: "Exterior Shades" },
  { href: "/products/exterior-shutters", label: "Exterior Shutters" },
  { href: "/products/retractable-awnings", label: "Retractable Awnings" },
  { href: "/products/louvered-pergolas", label: "Louvered Pergolas" },
];

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/our-process", label: "Our Process" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openModal } = useConsultModal();
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset Products dropdown when menu closes
  useEffect(() => {
    if (!isOpen) setProductsOpen(false);
  }, [isOpen]);

  function handleConsult() {
    const preselect = productSlugFromPath(pathname);
    onClose();
    setTimeout(() => openModal(preselect), 150);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — slides in from right, not full-width */}
          <motion.div
            key="mobile-menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0, 0.67, 0] }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: "min(82vw, 340px)",
              background: "var(--near-black)",
              borderLeft: "1px solid rgba(184,146,74,0.22)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(184,146,74,0.14)" }}
            >
              <Link
                href="/"
                onClick={onClose}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  color: "rgba(252,251,247,0.88)",
                  textDecoration: "none",
                }}
              >
                SJB Outdoors
              </Link>
              <button
                onClick={onClose}
                className="p-1 transition-opacity hover:opacity-60"
                aria-label="Close menu"
              >
                <X size={18} style={{ color: "rgba(252,251,247,0.6)" }} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-7">
              <ul>
                {/* Products — expandable */}
                <motion.li
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.28 }}
                  style={{ borderBottom: productsOpen ? "none" : "1px solid rgba(184,146,74,0.11)" }}
                >
                  <button
                    onClick={() => setProductsOpen((o) => !o)}
                    className="w-full flex items-center justify-between py-4 transition-colors"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.9rem",
                      fontWeight: 500,
                      color: productsOpen ? "var(--rich-warm)" : "rgba(252,251,247,0.82)",
                      lineHeight: 1.15,
                      letterSpacing: "0.01em",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    aria-expanded={productsOpen}
                  >
                    Products
                    <ChevronDown
                      size={18}
                      style={{
                        color: "rgba(184,146,74,0.7)",
                        transition: "transform 0.25s ease",
                        transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)",
                        flexShrink: 0,
                        marginBottom: "2px",
                      }}
                    />
                  </button>

                  {/* Sub-links */}
                  <AnimatePresence initial={false}>
                    {productsOpen && (
                      <motion.ul
                        key="products-sub"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          overflow: "hidden",
                          paddingLeft: "0.25rem",
                          paddingBottom: "0.75rem",
                          borderBottom: "1px solid rgba(184,146,74,0.11)",
                        }}
                      >
                        {PRODUCT_SUBLINKS.map((sub, j) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={onClose}
                              className="flex items-center gap-2 py-2 transition-colors"
                              style={{
                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                fontSize: "1.15rem",
                                fontWeight: 400,
                                color: "rgba(252,251,247,0.62)",
                                textDecoration: "none",
                                letterSpacing: "0.03em",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.color = "var(--rich-warm)";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,251,247,0.62)";
                              }}
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  display: "inline-block",
                                  width: "16px",
                                  height: "1px",
                                  background: "rgba(184,146,74,0.45)",
                                  flexShrink: 0,
                                }}
                              />
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>

                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.28 }}
                    style={{ borderBottom: "1px solid rgba(184,146,74,0.11)" }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-4 transition-colors"
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.9rem",
                        fontWeight: 500,
                        color: "rgba(252,251,247,0.82)",
                        lineHeight: 1.15,
                        textDecoration: "none",
                        letterSpacing: "0.01em",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--rich-warm)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,251,247,0.82)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <div
              className="px-7 pb-8 pt-5"
              style={{ borderTop: "1px solid rgba(184,146,74,0.14)" }}
            >
              <button
                onClick={handleConsult}
                className="w-full py-3 transition-all"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--rich-warm)",
                  border: "1px solid rgba(184,146,74,0.45)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "var(--rich-warm)";
                  el.style.color = "var(--near-black)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "transparent";
                  el.style.color = "var(--rich-warm)";
                }}
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
