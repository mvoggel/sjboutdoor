"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { GhlBookingFrame } from "./GhlBookingFrame";
import { RegionPicker } from "./RegionPicker";
import { REGIONS, type RegionSlug } from "@/lib/calendars";
// import { ConsultForm } from "./ConsultForm";
// ConsultForm is dormant — we used to render a custom step 1 here before
// handing off to the GHL iframe, but the duplicated fields between our form
// and GHL's in-iframe form created friction. Revive by swapping the iframe
// below for <ConsultForm onSuccess={onClose} region={region} preselectedProduct={...} />.
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
            <ConsultModalPanel
              onClose={onClose}
              closeBtnRef={closeBtnRef}
              preselectedProduct={preselectedProduct}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * The modal's contents. Split out from ConsultModal so it mounts fresh on
 * every open — which resets the region step, rather than silently reusing
 * whichever region the visitor picked last time.
 */
function ConsultModalPanel({
  onClose,
  closeBtnRef,
  preselectedProduct,
}: {
  onClose: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
  preselectedProduct?: ProductSlug;
}) {
  // Step 1 is the region picker; picking one advances to that region's calendar.
  const [region, setRegion] = useState<RegionSlug | null>(null);
  const stepTwoRef = useRef<HTMLDivElement>(null);

  // Advancing to step 2 unmounts the button that had focus, which would drop
  // keyboard users onto <body>. Move focus into the new step instead.
  useEffect(() => {
    if (region) stepTwoRef.current?.focus();
  }, [region]);

  return (
    <div
      className="relative w-full max-w-[640px] p-6 sm:p-8 pointer-events-auto overflow-y-auto max-h-[90dvh]"
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
      <div className="mb-4 pr-8">
        <p className="text-eyebrow mb-2">Free Consultation</p>
        <h2 id="modal-title" className="text-h3" style={{ color: "var(--ink-primary)" }}>
          {region
            ? "Let\u2019s design your outdoor space."
            : "Which city are you closer to?"}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
          {region
            ? "Pick a time and we\u2019ll be in touch to confirm your in-home consultation."
            : "We run two design teams. Tell us which one is closer and we\u2019ll show you their calendar."}
        </p>
      </div>

      {region ? (
        <div ref={stepTwoRef} tabIndex={-1} className="focus:outline-none">
          {/* Chosen region + a way back to step 1 */}
          <div
            className="flex items-center justify-between gap-3 mb-3 pb-3"
            style={{ borderBottom: "1px solid var(--rich-sand)" }}
          >
            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
              Booking with{" "}
              <strong style={{ color: "var(--ink-primary)" }}>
                {REGIONS.find((r) => r.slug === region)?.label}
              </strong>
            </p>
            <button
              type="button"
              onClick={() => setRegion(null)}
              className="inline-flex items-center gap-1 text-xs underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rich-deep)]"
              style={{ color: "var(--rich-deep)" }}
            >
              <ChevronLeft size={14} strokeWidth={1.8} aria-hidden="true" />
              Change city
            </button>
          </div>

          {/* When opened from a product page, route to that region's calendar
              for that product. Otherwise route to the region's Web Contact
              calendar (general inquiry). */}
          <GhlBookingFrame region={region} product={preselectedProduct ?? null} />
        </div>
      ) : (
        <RegionPicker onSelect={setRegion} />
      )}
    </div>
  );
}
