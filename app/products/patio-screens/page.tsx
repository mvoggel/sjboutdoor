"use client";

import { EyeOff, Sun, Bug, Settings2 } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";
import { SCREEN_COLORS, HOUSING_FINISHES } from "@/components/products/ScreenMaterials";

const config: ProductDetailConfig = {
  consultSlug: "exterior-shades",

  hero: {
    eyebrow: "Exterior Shades / Patio Screens",
    headline: "The screen that disappears when you don't need it.",
    descriptor:
      "Motorized retractable patio screens glide down to enclose your lanai at the touch of a button — then vanish into a slim housing when you want the open air back. Custom-fabricated to spans up to 30 feet with no center post, and engineered by Progressive Screens and SunPro for year-round Florida living.",
    imageSrc: "/img/products/patioscreen.jpg",
    imageAlt: "Retractable patio screen lowered across a covered Florida lanai.",
    caption: "Retractable Motorized Screens · Florida",
  },

  valueProps: {
    eyebrow: "Why Patio Screens",
    heading: "Open-air living, on your terms.",
    items: [
      {
        icon: EyeOff,
        title: "Invisible When Open",
        description: "Retracts fully into a slim cassette — nothing to see when the screen is up.",
      },
      {
        icon: Bug,
        title: "Bugs & Debris Out",
        description: "A clean barrier against insects, pollen, and wind-blown debris.",
      },
      {
        icon: Sun,
        title: "Up to 95% UV Block",
        description: "Solar mesh cuts heat and glare while keeping your view and breeze.",
      },
      {
        icon: Settings2,
        title: "Smart-Home Motorized",
        description: "Somfy motors with remote, wall switch, Alexa, Google, and sun/wind sensors.",
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
        description: "The screen and roller retract into a slim header cassette, hidden from view.",
        dot: { x: 24, y: 18 },
        label: { x: 4, y: 6 },
        align: "right",
      },
      {
        number: 2,
        title: "Self-Correcting Track",
        description: "Progressive's patented MagnaTrack re-centers the screen — no pocketing, no baggy sag.",
        dot: { x: 62, y: 16 },
        label: { x: 60, y: 4 },
        align: "right",
      },
      {
        number: 3,
        title: "Spans Up to 30 ft",
        description: "A single screen covers the whole opening — no center post in your view.",
        dot: { x: 84, y: 18 },
        label: { x: 96, y: 6 },
        align: "left",
      },
      {
        number: 4,
        title: "UV & Glare Control",
        description: "Solar mesh blocks up to 95% of UV rays while you keep the view and airflow.",
        dot: { x: 24, y: 50 },
        label: { x: 4, y: 50 },
        align: "right",
      },
      {
        number: 5,
        title: "Sun & Wind Sensors",
        description: "Optional sensors deploy and retract the screen automatically to protect it.",
        dot: { x: 46, y: 56 },
        label: { x: 90, y: 44 },
        align: "left",
      },
      {
        number: 6,
        title: "Florida-Engineered",
        description: "Marine-grade aluminum and anti-corrosion hardware built for salt air and sun.",
        dot: { x: 78, y: 64 },
        label: { x: 94, y: 86 },
        align: "left",
      },
    ],
  },

  specs: {
    eyebrow: "By the Numbers",
    heading: "Performance you can quote to your neighbor.",
    intro:
      "Every patio screen is custom-built to your exact opening on professional-grade Progressive Screens and SunPro systems.",
    stats: [
      { value: "30 ft", label: "Single-screen span — no center post" },
      { value: "95%", label: "Of UV rays blocked by solar mesh" },
      { value: "1-Touch", label: "Somfy motor · Alexa & Google ready" },
      { value: "Lifetime", label: "Hardware warranty · up to 15-yr mesh" },
    ],
  },

  materials: {
    eyebrow: "Mesh & Color",
    heading: "Choose your balance of view, airflow, and shade.",
    intro:
      "Mesh openness sets the tradeoff between an open view and full shade and privacy. Hover or click to explore the mesh options below and see how it could look in your home.",
    backdropSrc: "/img/products/patioscreen.jpg",
    backdropAlt: "Lanai view seen through different retractable screen meshes",
    meshTypes: [
      {
        name: "Insect Mesh",
        fabric: "Phifer 16/14",
        openness: "Most open weave",
        uv: "Bugs, pollen & debris out",
        blurb: "Maximum view and airflow with a clean barrier against insects.",
        density: 0.16,
      },
      {
        name: "Solar Mesh",
        fabric: "SunTex 80–95",
        openness: "~5% open",
        uv: "Blocks up to 95% UV",
        blurb: "Cuts heat, glare, and fade while you keep the breeze and the view out.",
        density: 0.55,
      },
      {
        name: "Privacy Mesh",
        fabric: "Twitchell Nano / Sheerweave",
        openness: "1–3% open",
        uv: "Daytime privacy",
        blurb: "Deep shade and soft, even light — see out without being seen in.",
        density: 0.78,
      },
      {
        name: "Hurricane Screen",
        fabric: "OmegaTex · Defender",
        openness: "Miami-Dade / FBC",
        uv: "75 MPH wind-rated",
        blurb: "Storm- and debris-rated fabric for year-round protection. Permit required.",
        density: 0.9,
      },
    ],
    colors: SCREEN_COLORS,
    finishes: HOUSING_FINISHES,
  },

  vendor: {
    eyebrow: "Our Partners",
    heading: "Engineered with Progressive Screens & SunPro",
    body:
      "We build on Progressive Screens' patented MagnaTrack self-correcting system and SunPro's motorized screens — marine-grade aluminum, Somfy motors, and Phifer® and Twitchell® fabrics. Backed by warranties up to a limited lifetime, plus our own workmanship guarantee.",
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Patio screens in the wild.",
    intro: "Recent retractable patio-screen installations across Southwest Florida.",
    category: "exterior-shades-and-screens",
  },
};

export default function PatioScreensPage() {
  return <ProductDetail config={config} />;
}
