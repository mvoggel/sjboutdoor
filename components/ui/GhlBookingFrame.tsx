"use client";

import type { ProductSlug } from "@/lib/validators";
import {
  buildCalendarUrl,
  type CalendarPrefill,
  type RegionSlug,
} from "@/lib/calendars";

interface GhlBookingFrameProps {
  /** Which regional calendar set to book against. */
  region: RegionSlug;
  /** Product slug → routes to that region's calendar for the product. `null`
   *  → routes to the region's general-inquiry "Web Contact" calendar. */
  product: ProductSlug | null;
  /** Optional. When omitted, the GHL widget collects name/email/phone in its
   *  own form step (current default since we removed our prefacing form). */
  prefill?: CalendarPrefill;
}

/**
 * Embedded GHL booking widget. Renders the widget at a fixed reasonable
 * height with native iframe scrolling — simpler and more reliable than
 * trying to auto-size via postMessage (GHL's resize event ships in shapes
 * we'd have to reverse-engineer per widget version).
 *
 * Cross-origin (api.leadconnectorhq.com) — no CSS we write reaches inside.
 * Styling adjustments must be made in GHL → Calendar → Widget appearance.
 */
export function GhlBookingFrame({ region, product, prefill }: GhlBookingFrameProps) {
  return (
    <iframe
      // Re-key on region/product so switching regions remounts the widget
      // instead of leaving a stale booking flow mid-step.
      key={`${region}:${product ?? "web-contact"}`}
      src={buildCalendarUrl(region, product, prefill)}
      title="Schedule your consultation"
      style={{
        width: "100%",
        height: "min(75dvh, 760px)",
        border: "none",
        display: "block",
      }}
    />
  );
}
