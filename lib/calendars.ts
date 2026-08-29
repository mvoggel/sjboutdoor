import type { ProductSlug } from "./validators";

/**
 * We run two GHL calendar sets — one per sales region. Every "Schedule a
 * Consult" CTA asks which city the visitor is closer to, then routes them to
 * that region's calendar for the product they were looking at.
 *
 * In GHL these live in the "Web" calendar group (FUvbZVZsxYR2JHZlX33s) and
 * are named:
 *   panama-city → "Panhandle - Consultation/Web <Product>"
 *   gainesville → "SJB Outdoor - Consultation/Web <Product>"   (the original set)
 *
 * The Gainesville set is the older, unprefixed one — it predates the split, so
 * it never got a region prefix. If those calendars are ever renamed in GHL,
 * nothing here breaks: we address them by ID, not name.
 */
export const REGION_SLUGS = ["panama-city", "gainesville"] as const;

export type RegionSlug = (typeof REGION_SLUGS)[number];

export interface Region {
  slug: RegionSlug;
  /** Button label in the region picker. */
  label: string;
  /** Supporting line under the label — helps a visitor self-select. */
  hint: string;
}

export const REGIONS: readonly Region[] = [
  {
    slug: "panama-city",
    label: "Panama City, Florida",
    hint: "The Panhandle — Pensacola to Tallahassee",
  },
  {
    slug: "gainesville",
    label: "Gainesville, Florida",
    hint: "North & Central Florida — Ocala to Jacksonville",
  },
] as const;

export function isRegionSlug(value: string | undefined): value is RegionSlug {
  return !!value && (REGION_SLUGS as readonly string[]).includes(value);
}

/**
 * GHL booking widget IDs, by region and product. These are the calendar IDs
 * from GHL → Calendars → Share → Permanent link (we use Permanent, not
 * Scheduling, so slug renames inside GHL don't break embeds).
 *
 * `web-contact` is the regional catch-all, used on non-product pages
 * (Contact, About, Blog, service areas…) where the visitor hasn't picked a
 * product.
 */
const CALENDAR_IDS: Record<
  RegionSlug,
  Record<ProductSlug | "web-contact", string>
> = {
  "panama-city": {
    "exterior-shades": "S6OvowIPAzMXR1AhlSjm",
    "exterior-shutters": "FjBsTWbNhS07dt4ckDBI",
    "louvered-pergolas": "XFuN4vGY28089Yh5YMod",
    "retractable-awnings": "VxRJhoB3bahZ1zV6jrB6",
    "web-contact": "diasdoYD9Qu9rIC5IA3d",
  },
  gainesville: {
    "exterior-shades": "ycarn2W2UY5SZYSRT6SE",
    "exterior-shutters": "XGFAsoHOmDIr36pllDwn",
    "louvered-pergolas": "sysCuGprfMLYFQUOJFep",
    "retractable-awnings": "xj7aD1o2WTUU3GeQiIEq",
    "web-contact": "LJFb67v3zZK2bpuxiGie",
  },
};

const WIDGET_BASE = "https://api.leadconnectorhq.com/widget/booking";

export interface CalendarPrefill {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Returns the booking widget URL for a region + product, with name/email/phone
 * appended as query params so the GHL widget's in-iframe form arrives
 * pre-filled. Pass `null` for `product` to get the region's general-inquiry
 * "Web Contact" calendar.
 *
 * GHL booking widgets read `first_name`, `last_name`, `email`, `phone` from
 * the query string and pre-populate the corresponding form fields.
 *
 * NOTE: Prefilling the GHL custom checkbox field "Product Interest(s)" via URL
 * params (`?contact.product_interests=...` or `?product_interests=...`) does
 * NOT work on this widget version — GHL's calendar widget reliably prefills
 * only the built-in fields below. Product tagging is handled by a per-calendar
 * GHL Workflow instead (Settings → Workflows → on calendar booking → "Add
 * value to custom field" → Product Interest(s) = <slug>).
 */
export function buildCalendarUrl(
  region: RegionSlug,
  product: ProductSlug | null,
  prefill?: CalendarPrefill
): string {
  const base = `${WIDGET_BASE}/${CALENDAR_IDS[region][product ?? "web-contact"]}`;
  if (!prefill) return base;

  const params = new URLSearchParams({
    first_name: prefill.firstName,
    last_name: prefill.lastName,
    email: prefill.email,
    phone: prefill.phone,
  });
  return `${base}?${params.toString()}`;
}
