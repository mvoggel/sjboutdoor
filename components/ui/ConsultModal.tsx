"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ConsultForm } from "./ConsultForm";
import type { ProductSlug } from "@/lib/validators";

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: ProductSlug;
}

export function ConsultModal({ isOpen, onClose, preselectedProduct }: ConsultModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap + ESC to close
  useEffect(() => {
    if (!isOpen) return;

    // Move focus to close button when modal opens
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{
              background: "var(--overlay-shade)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[560px] p-6 sm:p-8 pointer-events-auto overflow-y-auto max-h-[90dvh]"
              style={{
                background: "var(--bg-pure)",
                borderTop: "3px solid var(--rich-warm)",
                boxShadow:
                  "0 24px 64px rgba(14, 26, 31, 0.3), 0 0 0 1px rgba(14,26,31,0.06)",
              }}
            >
              {/* Close button */}
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 transition-colors hover:bg-[var(--rich-sand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rich-deep)]"
                aria-label="Close modal"
              >
                <X size={20} style={{ color: "var(--ink-muted)" }} />
              </button>

              {/* Header */}
              <div className="mb-6 pr-8">
                <p className="text-eyebrow mb-2">Free Consultation</p>
                <h2
                  id="modal-title"
                  className="text-h3"
                  style={{ color: "var(--ink-primary)" }}
                >
                  Let&apos;s design your outdoor space.
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
                  We&apos;ll be in touch within one business day to schedule your
                  in-home consultation.
                </p>
              </div>

              <ConsultForm onSuccess={onClose} preselectedProduct={preselectedProduct} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
