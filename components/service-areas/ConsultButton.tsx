"use client";

import { useConsultModal } from "@/components/ui/ConsultModalProvider";
import type { ProductSlug } from "@/lib/validators";

/**
 * Small consult-modal trigger used inside the (server-rendered) Service Area
 * pages. Two visual variants match the existing product-page button styles.
 */
export function ConsultButton({
  productSlug,
  label = "Schedule a Consultation",
  variant = "solid",
}: {
  productSlug?: ProductSlug;
  label?: string;
  variant?: "solid" | "outline";
}) {
  const { openModal } = useConsultModal();

  const base: React.CSSProperties = {
    padding: variant === "solid" ? "0.95rem 2.25rem" : "0.75rem 1.75rem",
    fontFamily: "var(--font-cormorant), Georgia, serif",
    fontSize: variant === "solid" ? "0.85rem" : "0.82rem",
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s, border-color 0.2s",
    whiteSpace: "nowrap",
  };

  const solid: React.CSSProperties = {
    ...base,
    background: "var(--ink-primary)",
    color: "var(--bg-pure)",
    border: "1px solid var(--ink-primary)",
  };

  const outline: React.CSSProperties = {
    ...base,
    background: "transparent",
    color: "var(--rich-warm)",
    border: "1px solid rgba(184,146,74,0.5)",
  };

  return (
    <button
      onClick={() => openModal(productSlug)}
      style={variant === "solid" ? solid : outline}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (variant === "solid") {
          el.style.background = "transparent";
          el.style.color = "var(--ink-primary)";
        } else {
          el.style.background = "rgba(184,146,74,0.1)";
          el.style.borderColor = "rgba(184,146,74,0.8)";
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        if (variant === "solid") {
          el.style.background = "var(--ink-primary)";
          el.style.color = "var(--bg-pure)";
        } else {
          el.style.background = "transparent";
          el.style.borderColor = "rgba(184,146,74,0.5)";
        }
      }}
    >
      {label}
    </button>
  );
}
