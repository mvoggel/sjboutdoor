"use client";

import { Maximize2, Wind, Radio, Home } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";

// NOTE: Placeholder copy — swap in client-provided copy when available.
const config: ProductDetailConfig = {
  consultSlug: "exterior-shades",

  hero: {
    eyebrow: "Exterior Shades / Garage Door Screens",
    headline: "Turn your garage into a second living room.",
    descriptor:
      "Full-height retractable screens custom-fit any bay — single, double, or oversized — and disappear into a discreet header housing when not in use. Ventilated, bug-free, and finished to match your home.",
    imageSrc: "/img/products/garage-screen.png",
    imageAlt: "Motorized garage-door screen lowered across an open garage bay.",
    caption: "Motorized Garage Screens · Florida",
  },

  valueProps: {
    eyebrow: "Why Garage Screens",
    heading: "All the airflow. None of the bugs.",
    items: [
      {
        icon: Maximize2,
        title: "Full-Height Coverage",
        description: "Screens the entire opening — single, double, or oversized bays.",
      },
      {
        icon: Radio,
        title: "Motorized Operation",
        description: "Raise and lower from a remote, keychain fob, or smart-home app.",
      },
      {
        icon: Wind,
        title: "Wind-Sensor Auto-Retract",
        description: "Optional sensors pull the screen up automatically in high wind.",
      },
      {
        icon: Home,
        title: "Smart-Home Ready",
        description: "Integrates with the systems you already use to run your home.",
      },
    ],
  },

  features: {
    eyebrow: "The Standard",
    title: "A garage that breathes.",
    imageSrc: "/img/products/garagescreen.jpg",
    imageAlt: "Garage bay with a full-height motorized screen lowered across the opening.",
    callouts: [
      {
        number: 1,
        title: "Discreet Header Housing",
        description: "The screen rolls up into a slim cassette at the top of the opening.",
        dot: { x: 26, y: 16 },
        label: { x: 4, y: 6 },
        align: "right",
      },
      {
        number: 2,
        title: "Custom-Fit to Any Bay",
        description: "Built to the exact width and height of single, double, or oversized openings.",
        dot: { x: 60, y: 18 },
        label: { x: 58, y: 4 },
        align: "right",
      },
      {
        number: 3,
        title: "Wind-Sensor Retract",
        description: "Automatically raises in high wind to protect the screen and track.",
        dot: { x: 84, y: 20 },
        label: { x: 96, y: 8 },
        align: "left",
      },
      {
        number: 4,
        title: "Insect & Light Filtration",
        description: "Keeps bugs out while softening the afternoon sun inside the bay.",
        dot: { x: 26, y: 54 },
        label: { x: 4, y: 52 },
        align: "right",
      },
      {
        number: 5,
        title: "Multi-Channel Remotes",
        description: "Keychain fobs and wall switches operate one or several screens.",
        dot: { x: 50, y: 58 },
        label: { x: 90, y: 46 },
        align: "left",
      },
      {
        number: 6,
        title: "10-Year Parts & Labor",
        description: "Backed by a long-term parts-and-labor warranty on the system.",
        dot: { x: 78, y: 66 },
        label: { x: 94, y: 86 },
        align: "left",
      },
    ],
  },

  options: {
    eyebrow: "Configure Yours",
    heading: "Sized and finished to your home.",
    intro:
      "Every garage screen is fabricated to order. Here's what we'll specify together at your consultation.",
    items: [
      {
        name: "Opening Size",
        description:
          "Single, double, or custom oversized bays — each screen is measured and built to the exact opening.",
      },
      {
        name: "Mesh Type",
        description:
          "Standard insect mesh, solar mesh for heat and glare control, or a denser privacy weave.",
      },
      {
        name: "Controls & Automation",
        description:
          "Multi-channel remotes, keychain fobs, wall switches, and optional wind-sensor auto-retract.",
      },
      {
        name: "Housing & Track Color",
        description:
          "Powder-coated housings and side tracks finished to blend with your door, trim, and façade.",
      },
    ],
  },

  vendor: {
    eyebrow: "Our Partners",
    heading: "Engineered with Progressive Screens & Sunpro",
    body:
      "Our motorized garage screens are built on professional-grade systems from Progressive Screens and Sunpro, backed by their product warranty and our installation guarantee.",
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Garage screens, installed.",
    intro: "Recent full-height garage-screen projects across Southwest Florida.",
    category: "garage-door-screens",
  },
};

export default function GarageDoorScreensPage() {
  return <ProductDetail config={config} />;
}
