import type { ProductSlug } from "./validators";

/**
 * GHL booking widget permanent links, one per product slug.
 *
 * These are the calendar-specific Permanent Links from GHL → Calendars →
 * Share. We use Permanent (not Scheduling) so slug renames inside GHL don't
 * break embeds.
 *
 * To get a new link: GHL → Calendars → <calendar> → Share icon → Permanent
 * link → Copy.
 */
export const PRODUCT_CALENDARS: Record<ProductSlug, string> = {
  "exterior-shades":
    "https://api.leadconnectorhq.com/widget/booking/ycarn2W2UY5SZYSRT6SE",
  "exterior-shutters":
    "https://api.leadconnectorhq.com/widget/booking/XGFAsoHOmDIr36pllDwn",
  "louvered-pergolas":
    "https://api.leadconnectorhq.com/widget/booking/sysCuGprfMLYFQUOJFep",
  "retractable-awnings":
    "https://api.leadconnectorhq.com/widget/booking/xj7aD1o2WTUU3GeQiIEq",
};

/**
 * Fallback calendar for non-product pages (Contact, About, Blog, etc.) where
 * the visitor hasn't picked a product. Routes to "SJB Outdoor - Web Contact"
 * — a round-robin general-inquiry calendar in GHL.
 */
export const WEB_CONTACT_CALENDAR =
  "https://api.leadconnectorhq.com/widget/booking/LJFb67v3zZK2bpuxiGie";

/**
 * Helper for the web-contact calendar URL with prefill, mirroring
 * `buildCalendarUrl` but without the product-slug constraint.
 */
export function buildWebContactCalendarUrl(prefill?: CalendarPrefill): string {
  if (!prefill) return WEB_CONTACT_CALENDAR;
  const params = new URLSearchParams({
    first_name: prefill.firstName,
    last_name: prefill.lastName,
    email: prefill.email,
    phone: prefill.phone,
  });
  return `${WEB_CONTACT_CALENDAR}?${params.toString()}`;
}

export interface CalendarPrefill {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Returns the calendar URL for a product with name/email/phone appended as
 * query params, so the GHL widget's in-iframe form arrives pre-filled.
 *
 * GHL booking widgets read `first_name`, `last_name`, `email`, `phone` from
 * the query string and pre-populate the corresponding form fields.
 */
export function buildCalendarUrl(
  product: ProductSlug,
  prefill?: CalendarPrefill
): string {
  const base = PRODUCT_CALENDARS[product];
  const params = new URLSearchParams();

  // NOTE: Prefilling the GHL custom checkbox field "Product Interest(s)"
  // via URL params (`?contact.product_interests=...` or `?product_interests=...`)
  // does NOT work on this widget version — GHL's calendar widget reliably
  // prefills only the built-in fields below. Product tagging is handled by
  // a per-calendar GHL Workflow instead (Settings → Workflows → on calendar
  // booking → "Add value to custom field" → Product Interest(s) = <slug>).
  if (prefill) {
    params.set("first_name", prefill.firstName);
    params.set("last_name", prefill.lastName);
    params.set("email", prefill.email);
    params.set("phone", prefill.phone);
  }

  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
