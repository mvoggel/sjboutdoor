"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useConsultModal } from "@/components/ui/ConsultModalProvider";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openModal } = useConsultModal();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function handleConsult() {
    onClose();
    setTimeout(openModal, 150);
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
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.28 }}
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
