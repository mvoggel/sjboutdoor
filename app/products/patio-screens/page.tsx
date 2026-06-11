"use client";

import { EyeOff, Sun, Bug, Settings2 } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";

// NOTE: Placeholder copy — swap in client-provided copy when available.
const config: ProductDetailConfig = {
  consultSlug: "exterior-shades",

  hero: {
    eyebrow: "Exterior Shades / Patio Screens",
    headline: "The screen that disappears when you don't need it.",
    descriptor:
      "Retractable patio screens vanish completely into a slim architectural housing — no visible track, no frame, no compromise on your view. Custom-fabricated to your exact opening and engineered for year-round Florida living.",
    imageSrc: "/img/products/patioscreen.jpg",
    imageAlt: "Retractable patio screen lowered across a covered Florida lanai.",
    caption: "Retractable Screens · Florida",
  },

  valueProps: {
    eyebrow: "Why Patio Screens",
    heading: "Open-air living, on your terms.",
    items: [
      {
        icon: EyeOff,
        title: "Invisible When Open",
        description: "Retracts fully into a slim housing — nothing to see when the screen is up.",
      },
      {
        icon: Bug,
        title: "Bugs & Debris Out",
        description: "A clean barrier against insects, pollen, and wind-blown debris.",
      },
      {
        icon: Sun,
        title: "Up to 90% UV Block",
        description: "Cuts heat and glare while keeping your view and breeze intact.",
      },
      {
        icon: Settings2,
        title: "Motorized or Manual",
        description: "Remote-controlled convenience or a simple, lower-cost manual system.",
      },
    ],
  },

  features: {
    eyebrow: "The Standard",
    title: "Engineered to vanish — built to last.",
    imageSrc: "/img/products/ext-shades.png",
    imageAlt: "Exterior screen panels across a Florida lanai with the seating area visible behind.",
    callouts: [
      {
        number: 1,
        title: "Invisible Housing",
        description: "The screen and track retract into a slim header cassette, hidden from view.",
        dot: { x: 24, y: 18 },
        label: { x: 4, y: 6 },
        align: "right",
      },
      {
        number: 2,
        title: "Motorized Control",
        description: "Lower and raise at the touch of a remote, wall switch, or smart-home app.",
        dot: { x: 62, y: 16 },
        label: { x: 60, y: 4 },
        align: "right",
      },
      {
        number: 3,
        title: "Florida-Engineered",
        description: "Built for salt air, humidity, sun exposure, and storm-cycle wear.",
        dot: { x: 84, y: 18 },
        label: { x: 96, y: 6 },
        align: "left",
      },
      {
        number: 4,
        title: "UV Protection",
        description: "Block up to 90% of harmful UV rays while preserving outdoor comfort.",
        dot: { x: 24, y: 50 },
        label: { x: 4, y: 50 },
        align: "right",
      },
      {
        number: 5,
        title: "Multiple Mesh Opacities",
        description: "Choose your balance of view, airflow, shade, and privacy.",
        dot: { x: 46, y: 56 },
        label: { x: 90, y: 44 },
        align: "left",
      },
      {
        number: 6,
        title: "Custom-Fabricated Fit",
        description: "Precision-built to your exact opening for a clean architectural finish.",
        dot: { x: 78, y: 64 },
        label: { x: 94, y: 86 },
        align: "left",
      },
    ],
  },

  options: {
    eyebrow: "Configure Yours",
    heading: "Every opening is a little different.",
    intro:
      "Patio screens are built to order. These are the choices we'll walk through during your in-home consultation.",
    items: [
      {
        name: "Mesh Opacity",
        description:
          "From near-transparent insect mesh to dense solar and privacy weaves — select how much view, light, and airflow you want to keep.",
      },
      {
        name: "Operation",
        description:
          "Motorized with remote, wall switch, and smart-home integration, or a crank-operated manual system for a lower-cost option.",
      },
      {
        name: "Housing & Frame Color",
        description:
          "Powder-coated finishes that blend into your soffit, beam, or column line so the system reads as part of the architecture.",
      },
      {
        name: "Wind Sensors & Automation",
        description:
          "Optional wind and sun sensors automatically retract or deploy the screen to protect it and keep you comfortable.",
      },
    ],
  },

  vendor: {
    eyebrow: "Our Partners",
    heading: "Engineered with Progressive Screens & Sunpro",
    body:
      "We partner with Progressive Screens and Sunpro — two of the industry's leading retractable-screen manufacturers. Every installation is backed by their product warranty and our workmanship guarantee.",
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Patio screens in the wild.",
    intro: "Recent retractable patio-screen installations across Southwest Florida.",
    images: [
      { src: "/img/products/patioscreen.jpg", alt: "Patio screen lowered over a lanai.", caption: "Naples · Lanai" },
      { src: "/img/products/ext-shades.png", alt: "Exterior shade panels on a covered patio.", caption: "Bonita Springs" },
      { src: "/img/products/shades2.png", alt: "Motorized shade over an outdoor seating area.", caption: "Marco Island" },
      { src: "/img/products/family.jpg", alt: "Family enjoying a screened outdoor space.", caption: "Fort Myers" },
      { src: "/img/products/vidcover.jpeg", alt: "Screened patio at dusk.", caption: "Estero" },
    ],
  },
};

export default function PatioScreensPage() {
  return <ProductDetail config={config} />;
}
