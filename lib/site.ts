/**
 * Single source of truth for site-wide SEO / business identity.
 *
 * Everything that needs the canonical URL, brand name, or NAP (Name / Address /
 * Phone) — metadataBase, sitemap, robots, and every JSON-LD block — imports
 * from here. Changing the production domain or any business detail is a one-line
 * edit, and the GBP listing the marketing team manages must match these values
 * EXACTLY (same name spelling, same phone format).
 *
 * Cutover note: the site is currently served from GitHub Pages at
 * mvoggel.github.io/sjboutdoor and moves to the apex domain below. Set
 * NEXT_PUBLIC_SITE_URL in the deploy env to override the fallback.
 */

/** Canonical production origin — no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sjboutdoors.com"
).replace(/\/$/, "");

/**
 * True while the site is served from a non-production host (e.g. the GitHub
 * Pages staging URL). Used to keep staging out of the index so it doesn't
 * compete with the apex domain as duplicate content.
 */
export const IS_STAGING = /github\.io/i.test(SITE_URL);

/** Public-facing brand name — use this everywhere (not "SJBB", not "South Jersey Blinds"). */
export const BRAND_NAME = "SJB Outdoors";

/** Legal entity name for copyright / legal pages. */
export const LEGAL_NAME = "South Jersey Blinds & Beyond";

export const PHONE_DISPLAY = "(352) 642-5839";
export const PHONE_E164 = "+13526425839";
export const EMAIL = "contact@sjboutdoors.com";

/**
 * Business address + geo.
 *
 * TODO(NAP): confirm the exact public address, hours, and lat/lng with the
 * marketing team and make these match the Google Business Profile verbatim. If
 * the business publishes no street address (service-area only), drop `streetAddress`
 * and rely on `areaServed` — but keep city/region/phone consistent with GBP.
 */
export const ADDRESS = {
  streetAddress: "TODO: street address",
  addressLocality: "Naples",
  addressRegion: "FL",
  postalCode: "TODO: ZIP",
  addressCountry: "US",
} as const;

/** TODO(NAP): real coordinates of the storefront / service hub. */
export const GEO = {
  latitude: "TODO: lat",
  longitude: "TODO: lng",
} as const;

/** Schema.org openingHoursSpecification. Matches the contact page ("Weekdays, 9 AM – 6 PM ET"). */
export const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
] as const;

export const PRICE_RANGE = "$$$";

/** Short tagline used in the web app manifest. */
export const DESCRIPTION_SHORT =
  "Custom exterior shades, retractable awnings, louvered pergolas, and shutters across Florida.";

/**
 * Social / authoritative profiles for schema `sameAs`. Helps search + AI engines
 * tie the website to the same entity across the web.
 * TODO(NAP): replace with the real profile URLs the marketing team maintains.
 */
export const SAME_AS: string[] = [
  // "https://www.instagram.com/...",
  // "https://www.facebook.com/...",
  // "https://www.google.com/maps/place/...",  // GBP / Google Maps listing
];

/** Default Open Graph / Twitter share image (absolute path under the site origin). */
export const DEFAULT_OG_IMAGE = "/img/products/vidcover.jpeg";
export const LOGO_PATH = "/img/products/florida-outline.svg";

/** Absolute-URL helper for schema fields that require fully-qualified URLs. */
export function absUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** A value is a real value (not a yet-to-be-filled placeholder) if it isn't a TODO. */
const isReal = (v: string) => Boolean(v) && !v.startsWith("TODO");

/**
 * PostalAddress for schema, omitting any field still set to a TODO placeholder.
 * A service-area business with only locality/region/country is valid and useful,
 * so we emit what we have now and the street/ZIP fill in automatically later.
 */
export function getPostalAddress(): Record<string, string> {
  const out: Record<string, string> = { "@type": "PostalAddress" };
  if (isReal(ADDRESS.streetAddress)) out.streetAddress = ADDRESS.streetAddress;
  if (isReal(ADDRESS.addressLocality)) out.addressLocality = ADDRESS.addressLocality;
  if (isReal(ADDRESS.addressRegion)) out.addressRegion = ADDRESS.addressRegion;
  if (isReal(ADDRESS.postalCode)) out.postalCode = ADDRESS.postalCode;
  if (isReal(ADDRESS.addressCountry)) out.addressCountry = ADDRESS.addressCountry;
  return out;
}

/** GeoCoordinates for schema, or null while the coordinates are still placeholders. */
export function getGeo(): Record<string, string> | null {
  if (!isReal(GEO.latitude) || !isReal(GEO.longitude)) return null;
  return {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  };
}
