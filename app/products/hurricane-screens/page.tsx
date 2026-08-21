"use client";

import { ShieldCheck, Wind, CalendarCheck, Magnet } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";

/**
 * Defender hurricane screens by Progressive Screens — our hurricane-rated
 * partner system. Specs below come from Progressive's published Defender
 * documentation (Florida Product Approval FL30798). Verify approval numbers
 * against the current NOA before quoting them in print.
 */
const PROGRESSIVE = "https://www.progressivescreens.com/";

const config: ProductDetailConfig = {
  consultSlug: "exterior-shades",

  hero: {
    eyebrow: "Exterior Shades / Hurricane Screens",
    headline: "One screen. Every line of defense.",
    descriptor:
      "Defender hurricane screens roll down to shield your lanai, garage, or window openings from category-five winds — then keep working the other 360 days a year against insects, sun, and glare. Built on Progressive Screens' patented MagnaTrack system and rated to the strictest hurricane codes in the country.",
    imageSrc: "/img/gallery/exterior-shades-and-screens/Magnatrack_Hurricane_Slide_2.jpeg",
    imageAlt: "MagnaTrack hurricane screen deployed across a poolside lanai opening.",
    caption: "Defender Hurricane Screens · Florida",
  },

  vendor: {
    eyebrow: "Industry Leaders",
    heading: "Engineered with Progressive Screens",
    body:
      "In 2021 Hunter Douglas added Progressive Screens to its suite of product lines. Each one is custom-fabricated by skilled craftsmen in Sarasota, Florida and Dallas, Texas, and carries alimited lifetime warranty. We install, permit, and service them across Florida.",
    ctaLabel: "Explore Progressive Screens",
    ctaHref: PROGRESSIVE,
    position: "after-hero",
  },

  valueProps: {
    eyebrow: "Why Hurricane Screens",
    heading: "Storm protection that earns its keep year-round.",
    items: [
      {
        icon: ShieldCheck,
        title: "Miami-Dade Rated",
        description: "Meets or exceeds Florida Building Code for roll-down hurricane screens.",
      },
      {
        icon: Wind,
        title: "Category 5 Winds",
        description: "Engineered for impact absorption from winds exceeding 156 mph.",
      },
      {
        icon: Magnet,
        title: "Patented MagnaTrack",
        description: "Magnetic dual-pull track eliminates 98% of common screen service issues.",
      },
      {
        icon: CalendarCheck,
        title: "365-Day Use",
        description: "The same screen handles bugs, sun, glare, and privacy between storms.",
      },
    ],
  },



  lineup: {
    eyebrow: "The MagnaTrack Range",
    heading: "Three parts, one system.",
    intro:
      "Defender is the hurricane-rated end of Progressive's MagnaTrack platform. The track and the controls are the same ones under their solar and insect screens — which is why one house can mix code-rated storm protection with everyday shade and share the same hardware.",
    items: [
      {
        category: "Code-rated storm protection",
        name: "Defender Hurricane Screens",
        blurb:
          "The storm-rated screen. Meets or exceeds Miami-Dade and Florida Building Code for roll-down hurricane screens, and keeps working against bugs and glare the rest of the year.",
        points: [
          "Florida Product Approval FL30798",
          "Design pressure to ±200 PSF",
          "Spans to 30 ft wide × 20 ft tall",
          "ASTM E330, E1886 & E1996 tested",
        ],
        href: "https://www.progressivescreens.com/products/defender-hurricane-screens/",
        linkLabel: "View at Progressive",
      },
      {
        category: "US Patent No. 9,719,292",
        name: "The MagnaTrack System",
        blurb:
          "The patented dual-pull magnetic track the whole platform is built on. Rare-earth magnets dampen wind load and flying debris while holding the screen flat and uniform.",
        points: [
          "10× the pulling force of any other track",
          "Eliminates 98% of common service issues",
          "No zippers — cannot jam or snag",
          "No hang-ups and no re-wraps",
        ],
        href: "https://www.progressivescreens.com/products/magnatrack-system/",
        linkLabel: "View at Progressive",
      },
      {
        category: "Gaposa smart control",
        name: "Motors & Integrations",
        blurb:
          "Gaposa motors and controls, so the screens behave like the rest of a modern smart home instead of a switch on the wall you forget about.",
        points: [
          "Built-in obstacle detection",
          "App control for up to 32 screens",
          "Up to 10 daily schedules",
          "Lutron, Savant, Control4 & Crestron",
        ],
        href: "https://www.progressivescreens.com/products/motors-and-integrations/",
        linkLabel: "View at Progressive",
      },
    ],
  },

  specs: {
    eyebrow: "Certified System",
    heading: "The numbers that matter when the wind arrives.",
    intro:
      "The Defender system meets or exceeds Miami-Dade and Florida Building Code requirements for roll-down hurricane screens — the strictest hurricane codes on earth — and is tested to ASTM E330, E1886, and E1996 alongside the Miami-Dade TAS impact protocols. Hurricane screens are a permitted installation; we handle the product-approval paperwork your building department requires.",
    stats: [
      { value: "FL30798", label: "Florida Product Approval number" },
      { value: "±200 PSF", label: "Design pressure rating" },
      { value: "156+ mph", label: "Category 5 wind impact absorption" },
      { value: "30 ft", label: "Maximum span · up to 20 ft tall" },
    ],
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Hurricane screens, installed.",
    intro: "Recent motorized screen installations across our Florida service area.",
    category: "exterior-shades-and-screens",
  },
};

export default function HurricaneScreensPage() {
  return <ProductDetail config={config} />;
}
