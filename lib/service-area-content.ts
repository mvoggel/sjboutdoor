/**
 * City-aware copy generator for the Service Area SEO pages.
 *
 * The goal is genuinely distinct text per city (not find-and-replace clones),
 * so each block has a few variants selected deterministically by city index,
 * with city-specific tokens (county, setting, climate, locales) woven in.
 *
 * Scope is intentionally limited to our four EXTERIOR systems:
 *   Louvered Pergolas · Exterior Shades · Exterior Shutters · Retractable Awnings
 */

import { SERVICE_CITIES, type ServiceCity } from "@/lib/service-areas";
import type { ProductSlug } from "@/lib/validators";

const BRAND = "SJB Outdoor Living";

/** Stable index for a city so variant selection is deterministic per page. */
function cityIndex(city: ServiceCity): number {
  return SERVICE_CITIES.findIndex((c) => c.slug === city.slug);
}

function pick<T>(variants: T[], city: ServiceCity, offset = 0): T {
  const i = (cityIndex(city) + offset) % variants.length;
  return variants[i];
}

export interface ProductSection {
  slug: ProductSlug;
  eyebrow: string;
  title: string;
  body: string;
  /** Path to the marketing product page for "learn more" links */
  href: string;
}

export interface CityContent {
  /** <h1> hero headline */
  heroTitle: string;
  /** Short hero sub-descriptor */
  heroTagline: string;
  /** Opening "About" paragraphs */
  intro: string[];
  /** The four exterior product sections */
  products: ProductSection[];
  /** "Why choose us" bullet list */
  whyChoose: string[];
  /** Closing paragraph above the CTA */
  closing: string;
}

export function buildCityContent(city: ServiceCity): CityContent {
  const { name, county, setting, locales, climate, coastal } = city;
  const exposure = coastal ? "coastal" : "inland";

  const intro: string[] = [
    `${name} is ${setting} — and that same ${exposure} character is exactly why outdoor living here demands products built to last. At ${BRAND}, we help ${name} homeowners extend their living space outdoors with custom louvered pergolas, exterior shades, exterior shutters, and retractable awnings engineered for ${climate}.`,
    pick(
      [
        `Whether you're shading a lanai in ${locales}, covering a poolside patio, or finishing a new build, we bring the products, expertise, and hand-fit installation to match both your design vision and the way you actually use your space.`,
        `From homes throughout ${locales} to brand-new construction, every project starts with an in-home consultation, exact measurements, and an installation crew that treats your property like its own.`,
        `Across ${locales} and the surrounding ${county} County area, we deliver individualized design guidance, precise installation, and dependable follow-up service — all from a team that knows this stretch of Florida.`,
      ],
      city,
    ),
    `Ready to upgrade your outdoor space? Contact ${BRAND} today to schedule a free in-home consultation in ${name}, FL.`,
  ];

  const products: ProductSection[] = [
    {
      slug: "louvered-pergolas",
      href: "/products/louvered-pergolas",
      eyebrow: "Louvered Pergolas",
      title: `Louvered Pergolas in ${name}, FL`,
      body: pick(
        [
          `A louvered pergola turns an exposed patio into a true outdoor room you can use almost year-round. With adjustable aluminum louvers, ${name} homeowners get full control over sun, shade, and rain at the touch of a button — open the roof for a breeze, then close it tight when a ${coastal ? "Gulf squall" : "afternoon storm"} rolls through. Built from powder-coated, corrosion-resistant aluminum and engineered for ${climate}, our motorized systems add integrated lighting, screens, and heaters so your space works from morning coffee to late-night entertaining.`,
          `Designed for ${name}'s ${exposure} climate, our louvered pergolas give you precise command over light and weather. The motorized louvers tilt to dial in shade through the hottest part of the day, then close fully to shed rain and protect your furniture. Fabricated from marine-grade, powder-coated aluminum to stand up to ${climate}, each pergola is custom-sized to your patio and can be fitted with LED lighting, retractable screens, and heaters for comfort in every season.`,
        ],
        city,
      ),
    },
    {
      slug: "exterior-shades",
      href: "/products/exterior-shades",
      eyebrow: "Exterior Shades",
      title: `Exterior Shades in ${name}, FL`,
      body: pick(
        [
          `Exterior shades are one of the smartest upgrades for a ${name} patio, lanai, or porch. Mounted on the outside of your opening, they stop heat and glare before it ever reaches the glass — keeping interiors cooler and protecting furnishings from fading. Our motorized zip-track shades seal at the edges to hold up against ${climate}, block insects, and create a comfortable, usable space even at midday. Choose from a range of openness factors and colors to keep your view while cutting the sun.`,
          `In a place with ${climate}, exterior shades do the heavy lifting that interior blinds can't. Because they block the sun on the outside, ${name} homeowners see real relief from heat and glare on screened porches, lanais, and west-facing patios. Our heavy-duty zip-track systems track in side channels so wind and bugs stay out, and they roll away cleanly when you want the open view back. Manual or motorized, with solar-screen fabrics in multiple openness levels.`,
        ],
        city,
      ),
    },
    {
      slug: "exterior-shutters",
      href: "/products/exterior-shutters",
      eyebrow: "Exterior Shutters",
      title: `Exterior Shutters in ${name}, FL`,
      body: pick(
        [
          `Exterior shutters bring lasting character and real protection to ${name} homes. Whether you're after the classic look of Bahama shutters for shade and curb appeal or storm-rated shutters that lock down ahead of a ${coastal ? "hurricane" : "severe storm"}, we offer durable, exterior-rated options built for ${climate}. Each set is custom-fabricated from corrosion-resistant materials, professionally installed with weather-tested hardware, and designed to complement your home's architecture.`,
          `For ${name} properties facing ${climate}, exterior shutters add both style and resilience. Bahama and colonial styles deliver shade, privacy, and instant curb appeal, while storm-rated systems give you serious protection when the weather turns. We build every shutter from heavy-gauge, corrosion-resistant materials and install with hardware tested for ${exposure} conditions, so they look sharp and perform for decades.`,
        ],
        city,
      ),
    },
    {
      slug: "retractable-awnings",
      href: "/products/retractable-awnings",
      eyebrow: "Retractable Awnings",
      title: `Retractable Awnings in ${name}, FL`,
      body: pick(
        [
          `A retractable awning extends your outdoor living area on demand — shade when you want it, open sky when you don't. Ideal for ${name} patios and decks, our manual and motorized awnings unfurl to beat the ${coastal ? "Gulf" : "midday"} sun, then retract out of the way to protect the fabric from ${climate}. Add wind and sun sensors for hands-free operation, and choose from a wide range of Sunbrella colors and patterns to match your home.`,
          `When the ${name} sun gets intense, a retractable awning gives you instant shade over a patio or deck without the commitment of a permanent structure. Our motorized awnings glide out at the press of a button and tuck away neatly when not in use — a smart approach in a climate defined by ${climate}. Optional sun and wind sensors retract the awning automatically to protect it, and dozens of fade-resistant fabric options let you tailor the look.`,
        ],
        city,
      ),
    },
  ];

  const whyChoose: string[] = [
    `Locally focused service across ${name} and ${county} County`,
    "Free in-home consultations with samples brought to you",
    `Systems engineered for ${climate}`,
    "Certified installers and professional, in-house project management",
    "Motorized and smart-home–integrated options",
    "Dedicated post-installation support and warranty coverage",
  ];

  const closing = `${name} homes deserve outdoor systems that do more than look good — they should stand up to ${climate} and perform for years. At ${BRAND}, we design, measure, and install every louvered pergola, exterior shade, exterior shutter, and retractable awning in-house, so your project is handled start to finish by people who stand behind the work. Don't wait to transform your outdoor space — call ${BRAND} today to begin with a free consultation and quote in ${name}, FL.`;

  return {
    heroTitle: `Outdoor Living Systems in ${name}, FL`,
    heroTagline: `${county} County · ${city.region}`,
    intro,
    products,
    whyChoose,
    closing,
  };
}
