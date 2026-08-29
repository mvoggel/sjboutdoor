"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { REGIONS, type RegionSlug } from "@/lib/calendars";

interface RegionPickerProps {
  onSelect: (region: RegionSlug) => void;
}

/**
 * Step 1 of the consult flow. Our two sales regions run separate GHL
 * calendars, so we have to know which team the visitor belongs to before we
 * can show a calendar at all.
 */
export function RegionPicker({ onSelect }: RegionPickerProps) {
  return (
    <div className="flex flex-col gap-3">
      {REGIONS.map((region) => (
        <button
          key={region.slug}
          type="button"
          onClick={() => onSelect(region.slug)}
          className="group flex items-center gap-4 w-full text-left px-5 py-4 border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rich-deep)] focus-visible:ring-offset-2 hover:bg-[rgba(184,146,74,0.07)]"
          style={{
            borderColor: "var(--rich-sand)",
            background: "transparent",
          }}
        >
          <MapPin
            size={20}
            strokeWidth={1.6}
            className="flex-shrink-0"
            style={{ color: "var(--rich-warm)" }}
            aria-hidden="true"
          />
          <span className="flex-1">
            <span
              className="block text-base font-medium"
              style={{ color: "var(--ink-primary)" }}
            >
              {region.label}
            </span>
            <span
              className="block mt-0.5 text-xs leading-relaxed"
              style={{ color: "var(--ink-muted)" }}
            >
              {region.hint}
            </span>
          </span>
          <ArrowRight
            size={18}
            strokeWidth={1.6}
            className="flex-shrink-0 transition-transform group-hover:translate-x-1"
            style={{ color: "var(--ink-muted)" }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
