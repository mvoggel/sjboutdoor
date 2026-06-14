"use client";

import { Anchor, SunMedium, ShieldCheck, Wrench } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";

// NOTE: Placeholder copy — swap in client-provided copy when available.
const config: ProductDetailConfig = {
  consultSlug: "exterior-shutters",

  hero: {
    eyebrow: "Exterior Shutters / Bahama Shutters",
    headline: "The defining silhouette of coastal architecture.",
    descriptor:
      "Bahama shutters deliver permanent, passive sun control with a profile that elevates any façade — no motors, no moving systems, and year-round hurricane readiness. Built to weather salt air for decades.",
    imageSrc: "/img/products/bahamashutters.jpg",
    imageAlt: "Bahama shutters angled out over windows on a coastal Florida home.",
    caption: "Bahama Shutters · Florida",
  },

  valueProps: {
    eyebrow: "Why Bahama Shutters",
    heading: "Shade, privacy, and curb appeal in one.",
    items: [
      {
        icon: Anchor,
        title: "Coastal Character",
        description: "The classic island silhouette that defines Florida façades.",
      },
      {
        icon: SunMedium,
        title: "Passive Sun Control",
        description: "Angle the louvers to cut heat and glare — no power required.",
      },
      {
        icon: ShieldCheck,
        title: "Hurricane-Season Ready",
        description: "Fixed, impact-rated construction that meets Florida wind-load codes.",
      },
      {
        icon: Wrench,
        title: "Low Maintenance",
        description: "No motors or moving parts — built to last decades with little upkeep.",
      },
    ],
  },

  features: {
    eyebrow: "The Standard",
    title: "Architectural shade, engineered for the coast.",
    imageSrc: "/img/products/bahamashutters.jpg",
    imageAlt: "Bahama shutters propped open above windows on a Florida home exterior.",
    callouts: [
      {
        number: 1,
        title: "Permanent Façade Mount",
        description: "Mounted directly to the structure for a clean, integrated look.",
        dot: { x: 22, y: 20 },
        label: { x: 3, y: 8 },
        align: "right",
      },
      {
        number: 2,
        title: "Adjustable Louver Angle",
        description: "Tilt the louvers to control light, airflow, and privacy.",
        dot: { x: 58, y: 16 },
        label: { x: 52, y: 4 },
        align: "right",
      },
      {
        number: 3,
        title: "Hurricane-Rated Build",
        description: "Impact-rated construction that meets Florida wind-load and building codes.",
        dot: { x: 84, y: 22 },
        label: { x: 96, y: 10 },
        align: "left",
      },
      {
        number: 4,
        title: "Salt-Air Finishes",
        description: "Powder-coat and composite frames engineered for the coastal climate.",
        dot: { x: 20, y: 55 },
        label: { x: 3, y: 52 },
        align: "right",
      },
      {
        number: 5,
        title: "Year-Round Privacy",
        description: "Natural sun control and screening without any mechanical system.",
        dot: { x: 52, y: 60 },
        label: { x: 90, y: 48 },
        align: "left",
      },
      {
        number: 6,
        title: "Decades of Service",
        description: "No moving parts means minimal upkeep and a very long service life.",
        dot: { x: 78, y: 68 },
        label: { x: 93, y: 82 },
        align: "left",
      },
    ],
  },

  options: {
    eyebrow: "Configure Yours",
    heading: "Tailored to your façade.",
    intro:
      "Bahama shutters are custom-built per opening. These are the details we'll specify together.",
    items: [
      {
        name: "Material",
        description:
          "Marine-grade aluminum or composite, each finished to stand up to salt air, humidity, and sun.",
      },
      {
        name: "Louver Style",
        description:
          "Fixed or adjustable louver angles to dial in the exact balance of shade, airflow, and privacy.",
      },
      {
        name: "Color & Finish",
        description:
          "A full range of powder-coat colors to complement — or intentionally contrast — your exterior.",
      },
      {
        name: "Projection & Hardware",
        description:
          "Arm length and hardware sized to your windows for the right profile and storm performance.",
      },
    ],
  },

  vendor: {
    eyebrow: "Built to Code",
    heading: "Florida-rated, professionally installed.",
    body:
      "Every Bahama shutter is fabricated and installed to meet local wind-load and building-code requirements, and backed by our workmanship guarantee.",
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Bahama shutters in place.",
    intro: "Recent Bahama-shutter installations across Southwest Florida.",
    category: "bahama-shutters",
  },
};

export default function BahamaShuttersPage() {
  return <ProductDetail config={config} />;
}
