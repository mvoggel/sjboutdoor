"use client";

import { Maximize2, Wind, Radio, Home } from "lucide-react";
import { ProductDetail, type ProductDetailConfig } from "@/components/products/ProductDetail";
import { SCREEN_COLORS, HOUSING_FINISHES } from "@/components/products/ScreenMaterials";

const config: ProductDetailConfig = {
  consultSlug: "exterior-shades",

  hero: {
    eyebrow: "Exterior Shades / Garage Door Screens",
    headline: "Turn your garage into a second living room.",
    descriptor:
      "Full-height motorized screens custom-fit any bay — single, double, or oversized — and roll up into a discreet header housing when you don't need them. Built on Progressive Screens and SunPro systems for a ventilated, bug-free workshop, gym, or hangout that still parks the car.",
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
        description: "Raise and lower from a remote, keychain fob, wall switch, or smart-home app.",
      },
      {
        icon: Wind,
        title: "Self-Correcting Track",
        description: "Patented MagnaTrack re-centers the screen and shrugs off Gulf breezes.",
      },
      {
        icon: Home,
        title: "Smart-Home Ready",
        description: "Works with Alexa, Google, and the systems you already run your home on.",
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
        title: "Self-Correcting MagnaTrack",
        description: "Patented magnetic track re-centers the screen — no zippers to jump or fray.",
        dot: { x: 84, y: 20 },
        label: { x: 96, y: 8 },
        align: "left",
      },
      {
        number: 4,
        title: "Insect & Solar Mesh",
        description: "Keeps bugs out while solar mesh softens the afternoon sun inside the bay.",
        dot: { x: 26, y: 54 },
        label: { x: 4, y: 52 },
        align: "right",
      },
      {
        number: 5,
        title: "Remote & Keychain Control",
        description: "Keychain fobs, wall switches, and voice operate one or several screens.",
        dot: { x: 50, y: 58 },
        label: { x: 90, y: 46 },
        align: "left",
      },
      {
        number: 6,
        title: "Lifetime Hardware Warranty",
        description: "Backed by up to a 15-year mesh and limited-lifetime hardware warranty.",
        dot: { x: 78, y: 66 },
        label: { x: 94, y: 86 },
        align: "left",
      },
    ],
  },

  specs: {
    eyebrow: "By the Numbers",
    heading: "Built for the way you actually use the garage.",
    intro:
      "Each screen is custom-fabricated to your opening on professional-grade Progressive Screens and SunPro systems.",
    stats: [
      { value: "30 ft", label: "Spans single, double & oversized bays" },
      { value: "98%", label: "Fewer service calls — self-correcting track" },
      { value: "1-Touch", label: "Remote, keychain fob & smart-home" },
      { value: "15 yr", label: "Mesh warranty · lifetime hardware" },
    ],
  },

  materials: {
    eyebrow: "Mesh & Color",
    heading: "Pick the mesh that fits how you use the bay.",
    intro:
      "More open mesh keeps the breeze and the view; tighter mesh adds shade and daytime privacy. The right half of the preview shows what you'd see through the selected mesh.",
    backdropSrc: "/img/products/garagescreen.jpg",
    backdropAlt: "Garage-bay view seen through different screen meshes",
    meshTypes: [
      {
        name: "Insect Mesh",
        fabric: "Phifer 16/14",
        openness: "Most open weave",
        uv: "Bugs, pollen & debris out",
        blurb: "Maximum airflow and visibility — the breezy, bug-free workshop or gym.",
        density: 0.16,
      },
      {
        name: "Solar Mesh",
        fabric: "SunTex 80–95",
        openness: "~5% open",
        uv: "Blocks up to 95% UV",
        blurb: "Cuts heat and glare so the bay stays usable through the afternoon.",
        density: 0.55,
      },
      {
        name: "Privacy Mesh",
        fabric: "Twitchell Nano / Sheerweave",
        openness: "1–3% open",
        uv: "Daytime privacy",
        blurb: "Deep shade and screening — see out to the driveway without showing the inside.",
        density: 0.78,
      },
    ],
    colors: SCREEN_COLORS,
    finishes: HOUSING_FINISHES,
  },

  vendor: {
    eyebrow: "Our Partners",
    heading: "Engineered with Progressive Screens & SunPro",
    body:
      "Our motorized garage screens are built on Progressive Screens' patented MagnaTrack self-correcting system and SunPro's professional-grade motorized screens — backed by their product warranties and our installation guarantee.",
  },

  gallery: {
    eyebrow: "The Gallery",
    heading: "Garage screens, installed.",
    intro: "Recent full-height garage-screen projects across Southwest Florida.",
    category: "exterior-shades-and-screens",
  },
};

export default function GarageDoorScreensPage() {
  return <ProductDetail config={config} />;
}
