"use client";

import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";

/**
 * Mirage retractable screen systems — our door-screen partner line.
 *
 * Deliberately short: hero, the partner band, the three-product lineup, and the
 * manufacturer stat strip — each card links out to Mirage's own site. Product specs
 * below come from Mirage's published product pages; the May 2026 dealer
 * brochures (1750 / 3500 / H4500) carry the full size and color matrices.
 */
const MIRAGE = "https://www.miragescreensystems.com/";

const config: ProductDetailConfig = {
  consultSlug: "exterior-shades",

  hero: {
    eyebrow: "Exterior Shades / Retractable Screen Systems",
    headline: "The screen door you forget is there.",
    descriptor:
      "Mirage retractable screens disappear into a slim housing beside your door frame and glide out only when you want them. Brass bushings and Teflon-infused guides make them the smoothest-running screens on the market — custom-fit to entry doors, sliders, French doors, and openings up to 28 feet.",
    imageSrc: "/img/gallery/exterior-shades-and-screens/Retractable-Screens-For-Patio.jpg",
    imageAlt: "Retractable screens drawn across wide covered lanai openings on a Florida home.",
    caption: "Mirage Screen Systems · Florida",
  },

  vendor: {
    eyebrow: "A Proud Partner",
    heading: "Engineered with Mirage Screen Systems",
    body:
      "Backed with a limited lifetime warranty, and a trained dealer network they treat as an extension of the company. We measure, install, and service their screens right here in Florida.",
    ctaLabel: "Explore Mirage Screen Systems",
    ctaHref: MIRAGE,
    position: "after-hero",
  },

  lineup: {
    eyebrow: "The Range",
    heading: "Three systems. Every opening in the house.",
    intro:
      "Mirage builds three families of retractable screen. They share the same rolling mechanism and the same warranty — what changes is how wide they go and how the mesh is held. We will tell you which one your opening calls for.",
    items: [
      {
        category: "Entry · Sliding · French",
        name: "Retractable Screen Doors",
        blurb:
          "The everyday door screen. Mounts to the frame, rides on top and bottom guides, and rolls away into the housing when you are done with it.",
        points: [
          "Up to 5 ft wide × 9 ft tall",
          "Floating or retained mesh",
          "8 standard + 18 Diamond Series colors",
          "Standard, PivotPro & recessed handles",
        ],
        href: "https://www.miragescreensystems.com/products/retractable-screen-doors/",
        linkLabel: "View at Mirage",
      },
      {
        category: "Bi-fold · Multi-panel · Patio",
        name: "Large Opening Retractable Screens",
        blurb:
          "The wide-span system, with retained mesh as standard. One screen crosses the opening, or two meet in the middle on a double configuration.",
        points: [
          "Up to 14 ft wide × 10 ft tall",
          "28 ft in a double configuration",
          "Retained mesh stops blow-out",
          "Four standard colors",
        ],
        href: "https://www.miragescreensystems.com/products/large-opening-retractable-screen-doors/",
        linkLabel: "View at Mirage",
      },
      {
        category: "Garages · Lanais · Patios",
        name: "Motorized Screens",
        blurb:
          "For the openings too big to pull by hand. A motor drops the screen across a garage bay or lanai at the touch of a button and sends it back into the header when you are done.",
        points: [
          "Up to 25 ft wide × 16 ft tall",
          "Somfy or Alpha motor & remote",
          "Auto-stop obstacle detection",
          "Insect, solar, privacy & blackout mesh",
        ],
        href: "https://www.miragescreensystems.com/products/motorized-screens/",
        linkLabel: "View at Mirage",
      },
    ],
  },

  specs: {
    eyebrow: "The Manufacturer",
    heading: "An industry leader since 1997.",
    intro:
      "Mirage manufactures and distributes its own retractable screen systems, building every door to order from high-quality raw materials. Their install-partner network across North America is trained through Mirage's own academy — we are that partner in Florida.",
    stats: [
      { value: "1997", label: "Manufacturing retractable screens since" },
      { value: "25+ yrs", label: "Of long-term thinking and responsive service" },
      { value: "28 ft", label: "Widest opening · double configuration" },
      { value: "Lifetime", label: "Limited component warranty · excludes mesh" },
    ],
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Screen systems, installed.",
    intro: "Recent retractable screen installations across our Florida service area.",
    category: "exterior-shades-and-screens",
  },
};

export default function RetractableScreenSystemPage() {
  return <ProductDetail config={config} />;
}
