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

/** Public-facing brand name — matches the Google Business Profile + logo. Use
 * everywhere (not "SJBB", "SJB Outdoors", or "South Jersey Blinds"). */
export const BRAND_NAME = "SJB Outdoor Living";

/** Legal entity name for copyright / legal pages (as registered with the EIN). */
export const LEGAL_NAME = "South Jersey Blinds and Beyond LLC";

export const PHONE_DISPLAY = "(352) 642-5839";
export const PHONE_E164 = "+13526425839";
export const EMAIL = "contact@sjboutdoors.com";

/**
 * Business address + geo. Matches the Google Business Profile physical address.
 * Keep these verbatim-consistent with GBP (same street/city/ZIP formatting).
 *
 * NOTE: intentionally NOT emitted in JSON-LD. Per the Mader Marketing AEO
 * package (July 2026), SJB Outdoor Living is marked up as a Service Area
 * Business — `areaServed` defines the territory and no street address goes in
 * the schema. Kept here as the canonical GBP record only.
 */
export const ADDRESS = {
  streetAddress: "5079 SR-121",
  addressLocality: "Lake Butler",
  addressRegion: "FL",
  postalCode: "32054",
  addressCountry: "US",
} as const;

/** Coordinates of 5079 SR-121, Lake Butler, FL 32054 (from the Google Maps pin). */
export const GEO = {
  latitude: "29.952014",
  longitude: "-82.425649",
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
  "https://www.instagram.com/sjboutdoorliving/",
  "https://www.facebook.com/sjboutdoorliving",
  // "https://www.google.com/maps/place/...",  // GBP / Google Maps listing
];

/** Default Open Graph / Twitter share image (absolute path under the site origin). */
export const DEFAULT_OG_IMAGE = "/img/products/vidcover.jpeg";
export const LOGO_PATH = "/img/products/florida-outline.svg";

/** Absolute-URL helper for schema fields that require fully-qualified URLs. */
export function absUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ── AEO / entity-graph identity (Mader Marketing schema package, July 2026) ──

/**
 * Parent company — links SJB Outdoor Living to South Jersey Blinds & Beyond in
 * the knowledge graph so AI engines understand the relationship (same family
 * ownership, 35+ years, 528 five-star reviews earned under the parent brand).
 */
export const PARENT_ORG = {
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://southjerseyblindsandbeyond.com/#business",
  name: "South Jersey Blinds & Beyond LLC",
} as const;

/** Owner identity — used as founder/employee on the business schema and as the
 * author Person block on every blog post. */
export const OWNER = {
  name: "Ron Rosso",
  jobTitle: "Owner",
  description:
    "Ron Rosso is the owner of SJB Outdoor Living and South Jersey Blinds & Beyond LLC. With over 35 years in the outdoor living and window treatment industry, Ron brings the same craftsmanship and attention to detail that earned his family business 528 five-star reviews to Florida homeowners.",
} as const;

/** Topics the business is authoritative on — schema `knowsAbout`. */
export const KNOWS_ABOUT = [
  "Motorized Pergolas",
  "Louvered Pergolas",
  "Retractable Awnings",
  "Motorized Exterior Shades",
  "Bahama Shutters",
  "Hurricane Shutters",
  "Hurricane Screens",
  "Retractable Screen Doors",
  "Azenco Pergolas",
  "Hurricane Protection",
  "Outdoor Living",
] as const;

/** Credentials line — schema `hasCredential`. */
export const CREDENTIALS =
  "Florida Licensed Contractors, Azenco Authorized Dealer";

/**
 * Aggregate rating. The 528 five-star Google reviews were earned by the parent
 * company (South Jersey Blinds & Beyond) — the description states that
 * explicitly so the markup stays honest for AI engines and validators.
 */
export const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "5",
  reviewCount: "528",
  bestRating: "5",
  worstRating: "1",
  description:
    "528 verified 5-star Google reviews for South Jersey Blinds & Beyond, the parent company of SJB Outdoor Living.",
} as const;

/** Ron Rosso Person entity (Schema 7) — emitted on every blog post page. */
export const OWNER_PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#ron-rosso`,
  name: OWNER.name,
  jobTitle: OWNER.jobTitle,
  worksFor: {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND_NAME,
  },
  description: OWNER.description,
  url: `${SITE_URL}/about`,
  sameAs: ["https://www.facebook.com/sjboutdoorliving", SITE_URL],
} satisfies Record<string, unknown>;
