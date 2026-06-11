"use client";

import { ShieldCheck, Timer, Layers, BadgePercent } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";

// NOTE: Placeholder copy — swap in client-provided copy when available.
const config: ProductDetailConfig = {
  consultSlug: "exterior-shutters",

  hero: {
    eyebrow: "Exterior Shutters / Storm Shutters",
    headline: "Code-rated protection that disappears between storms.",
    descriptor:
      "Florida building-code protection that deploys in minutes and tucks away when the sky clears. Available in accordion, roll-up, and panel styles — each engineered to your property's specific wind-load and impact requirements.",
    imageSrc: "/img/products/st-shutter.png",
    imageAlt: "Accordion storm shutters partially closed across a window opening.",
    caption: "Hurricane Protection · Florida",
  },

  valueProps: {
    eyebrow: "Why Storm Shutters",
    heading: "Peace of mind, ready when you need it.",
    items: [
      {
        icon: ShieldCheck,
        title: "Code-Rated Protection",
        description: "Meets Florida building-code wind-load and impact requirements.",
      },
      {
        icon: Timer,
        title: "Deploys in Minutes",
        description: "Secure your home fast when a storm is on the way.",
      },
      {
        icon: Layers,
        title: "Three Styles",
        description: "Accordion, roll-up, and panel systems to fit any opening.",
      },
      {
        icon: BadgePercent,
        title: "Insurance Discounts",
        description: "Eligible for windstorm-mitigation premium savings.",
      },
    ],
  },

  features: {
    eyebrow: "The Standard",
    title: "Storm-ready in minutes, invisible the rest of the year.",
    imageSrc: "/img/products/stormshutters.jpg",
    imageAlt: "Storm shutters installed across the windows of a Florida home.",
    callouts: [
      {
        number: 1,
        title: "Florida Building-Code Rated",
        description: "Tested and approved to the wind-load and impact standards for your zone.",
        dot: { x: 22, y: 20 },
        label: { x: 3, y: 8 },
        align: "right",
      },
      {
        number: 2,
        title: "Fast Deployment",
        description: "Most systems close in under ten minutes when a storm approaches.",
        dot: { x: 58, y: 16 },
        label: { x: 52, y: 4 },
        align: "right",
      },
      {
        number: 3,
        title: "Accordion · Roll-Up · Panel",
        description: "Three system styles, each matched to the opening and budget.",
        dot: { x: 84, y: 22 },
        label: { x: 96, y: 10 },
        align: "left",
      },
      {
        number: 4,
        title: "Manual or Motorized",
        description: "Hand-crank simplicity or motorized convenience for large openings.",
        dot: { x: 20, y: 55 },
        label: { x: 3, y: 52 },
        align: "right",
      },
      {
        number: 5,
        title: "PE-Stamp Available",
        description: "Engineer-stamped documentation available for permitting and insurance.",
        dot: { x: 52, y: 60 },
        label: { x: 90, y: 48 },
        align: "left",
      },
      {
        number: 6,
        title: "Disappears Between Storms",
        description: "Retracts or stores away cleanly so it's there only when you need it.",
        dot: { x: 78, y: 68 },
        label: { x: 93, y: 82 },
        align: "left",
      },
    ],
  },

  options: {
    eyebrow: "Configure Yours",
    heading: "The right system for every opening.",
    intro:
      "We match the style and rating to each window, door, and budget. Here's what we'll specify together.",
    items: [
      {
        name: "System Style",
        description:
          "Accordion for permanent, fold-away coverage; roll-up for one-touch operation; removable panels for the most economical protection.",
      },
      {
        name: "Operation",
        description:
          "Manual hand-crank and pull systems, or motorized operation with remote and smart-home control on roll-up systems.",
      },
      {
        name: "Wind-Load Rating",
        description:
          "Each opening is engineered to the impact and pressure requirements for your address — PE-stamp documentation available.",
      },
      {
        name: "Finish & Color",
        description:
          "Powder-coated housings and slats in colors selected to blend with your home's exterior.",
      },
    ],
  },

  vendor: {
    eyebrow: "Built to Code",
    heading: "Engineered, permitted, and insurance-ready.",
    body:
      "Every storm-shutter installation is engineered to local code, eligible for windstorm-mitigation insurance discounts, and backed by our workmanship guarantee. PE-stamped documentation is available on request.",
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Storm shutters, installed.",
    intro: "Recent hurricane-protection installations across Southwest Florida.",
    images: [
      { src: "/img/products/stormshutters.jpg", alt: "Storm shutters across home windows.", caption: "Naples" },
      { src: "/img/products/st-shutter.png", alt: "Accordion storm shutter detail.", caption: "Bonita Springs" },
      { src: "/img/products/bahamashutters.jpg", alt: "Exterior shutters on a façade.", caption: "Marco Island" },
      { src: "/img/products/family.jpg", alt: "Protected home exterior.", caption: "Fort Myers" },
      { src: "/img/products/vidcover.jpeg", alt: "Home at dusk with shutters closed.", caption: "Estero" },
    ],
  },
};

export default function StormShuttersPage() {
  return <ProductDetail config={config} />;
}
