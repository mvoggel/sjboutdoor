"use client";

import type { ProductSlug } from "@/lib/validators";
import {
  buildCalendarUrl,
  buildWebContactCalendarUrl,
  type CalendarPrefill,
} from "@/lib/calendars";

interface GhlBookingFrameProps {
  /** Product slug → routes to that product's calendar. `null` → routes to
   *  the general-inquiry "Web Contact" calendar (for non-product pages). */
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
export function GhlBookingFrame({ product, prefill }: GhlBookingFrameProps) {
  const src = product
    ? buildCalendarUrl(product, prefill)
    : buildWebContactCalendarUrl(prefill);

  return (
    <iframe
      src={src}
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
