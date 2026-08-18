/**
 * Service-area editorial data — one entry per Florida city we serve.
 *
 * Positions (cx/cy) are kept in sync with SERVICE_AREA_DOTS in
 * components/layout/FloridaMap.tsx (viewBox 0 0 800 680). The city page reads
 * cx/cy from here to drive the zoomed-in hero map.
 *
 * The editorial fields (county, setting, climate, locales) exist to give each
 * SEO page genuinely distinct copy rather than 15 find-and-replace clones.
 */

export interface ServiceCity {
  /** Display name, e.g. "Crystal River" */
  name: string;
  /** URL slug under /service-areas, e.g. "crystal-river" */
  slug: string;
  /** County name without the word "County", e.g. "Citrus" */
  county: string;
  /** Broad region label used in the hero + metadata */
  region: string;
  /** True for Gulf/Atlantic coastal towns, false for inland */
  coastal: boolean;
  /** Map center in the 800×680 Florida viewBox */
  cx: number;
  cy: number;
  /** One-line "where this is" descriptor woven into the intro */
  setting: string;
  /** Local landmarks / neighborhoods used for local-SEO texture */
  locales: string;
  /** The dominant weather trait these treatments are built around */
  climate: string;
}

export const SERVICE_CITIES: ServiceCity[] = [
  // ── Central & Nature Coast ────────────────────────────────────────
  {
    name: "Crystal River",
    slug: "crystal-river",
    county: "Citrus",
    region: "Florida's Nature Coast",
    coastal: true,
    cx: 522,
    cy: 301,
    setting: "a spring-fed Nature Coast town famous for its manatees and Kings Bay",
    locales: "Kings Bay, Three Sisters Springs, and the waterfront communities off Fort Island Trail",
    climate: "humid Gulf air, salt-marsh moisture, and bright open sun",
  },
  {
    name: "Gainesville",
    slug: "gainesville",
    county: "Alachua",
    region: "North Central Florida",
    coastal: false,
    cx: 608,
    cy: 192,
    setting: "the oak-canopied home of the University of Florida",
    locales: "Haile Plantation, Duckpond, the Historic District, and Tioga",
    climate: "hot, humid summers and sudden afternoon thunderstorms",
  },
  {
    name: "Newberry",
    slug: "newberry",
    county: "Alachua",
    region: "North Central Florida",
    coastal: false,
    cx: 578,
    cy: 190,
    setting: "a fast-growing town west of Gainesville with deep agricultural and equestrian roots",
    locales: "Historic downtown Newberry, Jonesville, and the Country Way communities",
    climate: "wide-open sun exposure and humid inland summers",
  },
  {
    name: "Ocala",
    slug: "ocala",
    county: "Marion",
    region: "North Central Florida",
    coastal: false,
    cx: 620,
    cy: 242,
    setting: "the Horse Capital of the World, set among rolling pastures and live oaks",
    locales: "Golden Hills, the Historic District, On Top of the World, and the World Equestrian Center",
    climate: "intense inland sun, sandy soil, and humid summer heat",
  },
  // ── East Coast (north) ────────────────────────────────────────────
  {
    name: "Daytona",
    slug: "daytona",
    county: "Volusia",
    region: "Florida's Atlantic Coast",
    coastal: true,
    cx: 732,
    cy: 264,
    setting: "an Atlantic beach city known for its hard-packed shoreline and the World Center of Racing",
    locales: "Daytona Beach Shores, Ormond Beach, Ponce Inlet, and the Halifax River",
    climate: "salt air, ocean breezes, and bright, unobstructed beachfront sun",
  },
  {
    name: "St Augustine Beach",
    slug: "st-augustine-beach",
    county: "St. Johns",
    region: "Florida's First Coast",
    coastal: true,
    cx: 715,
    cy: 238,
    setting: "a laid-back barrier-island beach town on Anastasia Island",
    locales: "Anastasia Island, Crescent Beach, and the communities along A1A Beach Boulevard",
    climate: "salt spray, steady ocean wind, and strong coastal sun",
  },
  {
    name: "St Augustine",
    slug: "st-augustine",
    county: "St. Johns",
    region: "Florida's First Coast",
    coastal: true,
    cx: 709,
    cy: 230,
    setting: "the nation's oldest city, rich with Spanish-colonial architecture and historic homes",
    locales: "the Historic District, Lincolnville, Davis Shores, and Anastasia Island",
    climate: "coastal humidity, salt air, and bright sun on historic and waterfront homes",
  },
  {
    name: "Jacksonville Beach",
    slug: "jacksonville-beach",
    county: "Duval",
    region: "Florida's First Coast",
    coastal: true,
    cx: 668,
    cy: 152,
    setting: "an active Atlantic beach community among Jacksonville's coastal towns",
    locales: "Neptune Beach, Atlantic Beach, Ponte Vedra, and the oceanfront blocks off 1st Street",
    climate: "salt air, ocean breezes, and intense beachfront sun",
  },
  {
    name: "Jacksonville",
    slug: "jacksonville",
    county: "Duval",
    region: "Florida's First Coast",
    coastal: true,
    cx: 659,
    cy: 131,
    setting: "Florida's largest city, spread along the wide St. Johns River",
    locales: "Riverside, Avondale, San Marco, Mandarin, and the Beaches",
    climate: "humid river air, summer storms, and coastal wind exposure",
  },
  // ── Panhandle ─────────────────────────────────────────────────────
  {
    name: "Tallahassee",
    slug: "tallahassee",
    county: "Leon",
    region: "Florida Panhandle",
    coastal: false,
    cx: 378,
    cy: 68,
    setting: "the state capital, known for its canopy roads and gently rolling hills",
    locales: "Midtown, Killearn, SouthWood, and the Historic Capitol district",
    climate: "hot, humid summers and frequent afternoon thunderstorms",
  },
  {
    name: "Panama City",
    slug: "panama-city",
    county: "Bay",
    region: "Florida Panhandle",
    coastal: true,
    cx: 218,
    cy: 56,
    setting: "a Gulf-coast city set along St. Andrews Bay and the Emerald Coast",
    locales: "St. Andrews, Cove, Panama City Beach, and the bayfront neighborhoods",
    climate: "salt air, powerful Gulf sun, and serious hurricane-season wind loads",
  },
  {
    name: "Destin",
    slug: "destin",
    county: "Okaloosa",
    region: "Florida's Emerald Coast",
    coastal: true,
    cx: 123,
    cy: 54,
    setting: "an Emerald Coast destination famous for its sugar-white sand and turquoise water",
    locales: "Crystal Beach, Kelly Plantation, Destin Harbor, and Holiday Isle",
    climate: "brilliant Gulf sun, salt air, and strong coastal wind",
  },
  {
    name: "Santa Rosa Beach",
    slug: "santa-rosa-beach",
    county: "Walton",
    region: "Florida's Emerald Coast",
    coastal: true,
    cx: 149,
    cy: 58,
    setting: "the heart of Scenic 30A, dotted with beach towns and coastal-dune lakes",
    locales: "Seaside, WaterColor, Blue Mountain Beach, and Dune Allen",
    climate: "intense 30A sun, salt air, and steady Gulf breezes",
  },
  {
    name: "Navarre Beach",
    slug: "navarre-beach",
    county: "Santa Rosa",
    region: "Florida's Emerald Coast",
    coastal: true,
    cx: 65,
    cy: 57,
    setting: "a quiet barrier-island beach bordered by Gulf Islands National Seashore",
    locales: "Navarre Beach, Holley by the Sea, and the Sound-side communities",
    climate: "open Gulf sun, salt spray, and exposed coastal wind",
  },
  {
    name: "Pensacola",
    slug: "pensacola",
    county: "Escambia",
    region: "Florida Panhandle",
    coastal: true,
    cx: 37,
    cy: 56,
    setting: "Florida's westernmost city, with deep naval history and white-sand Gulf beaches",
    locales: "East Hill, North Hill, Pensacola Beach, and the Historic District",
    climate: "salt air, strong Gulf sun, and hurricane-season wind exposure",
  },
];

export const SERVICE_CITIES_BY_SLUG: Record<string, ServiceCity> =
  Object.fromEntries(SERVICE_CITIES.map((c) => [c.slug, c]));

export function getServiceCity(slug: string): ServiceCity | undefined {
  return SERVICE_CITIES_BY_SLUG[slug];
}
