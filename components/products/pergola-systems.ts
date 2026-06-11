// ─── Azenco pergola systems — content model + data ───────────────────────────
// Source copy provided by client. Tile + detail imagery lives in /img/component.

export interface PergolaSwatch {
  name: string;
  /** A CSS color or gradient used to render the swatch chip. */
  swatch: string;
  /** Renders a dashed "your choice" ring instead of a solid fill. */
  custom?: boolean;
  /** Adds a hairline border (for near-white chips). */
  outlined?: boolean;
}

export interface PergolaColorGroup {
  label?: string;
  note?: string;
  swatches: PergolaSwatch[];
}

export interface PergolaStat {
  kind: "snow" | "wind";
  label: string;
  value: string;
}

export interface PergolaFeatureGroup {
  heading: string;
  items: string[];
}

export interface PergolaEdition {
  name: string;
  detail?: string;
}

export interface PergolaSystem {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  /** Short teaser used on the tile / collapsed state. */
  body: string;
  /** Tile + detail photography. */
  image: string;
  theme: "light" | "dark";

  // ── Expanded detail content ──
  intro: string[];
  colorGroups?: PergolaColorGroup[];
  stats?: PergolaStat[];
  editions?: PergolaEdition[];
  featureGroups?: PergolaFeatureGroup[];
  configurations?: string[];
}

// ── Reusable swatch palettes ──
const SW = {
  white: { name: "White", swatch: "#FCFBF7", outlined: true },
  fullWhite: { name: "Full White", swatch: "#FCFBF7", outlined: true },
  blackWhite: {
    name: "Black/White",
    swatch: "linear-gradient(135deg,#15181b 0 50%,#FCFBF7 50% 100%)",
    outlined: true,
  },
  black: { name: "Black", swatch: "#15181b" },
  darkGray: { name: "Dark Gray", swatch: "#4A4A4A" },
  bronze: { name: "Bronze", swatch: "#6E5A43" },
  wood: {
    name: "Wood Grain",
    swatch: "linear-gradient(135deg,#8a5a2c,#b5803f 45%,#7c5126)",
  },
  custom: { name: "Custom", swatch: "transparent", custom: true },
} satisfies Record<string, PergolaSwatch>;

const POWDER_NOTE = "AAMA 2604 Powder-Coating";

export const PERGOLA_SYSTEMS: PergolaSystem[] = [
  // ── 1. R-BLADE ──────────────────────────────────────────────────────────
  {
    slug: "r-blade",
    name: "R-BLADE™",
    category: "Motorized Louvered Pergola",
    tagline: "Engineered comfort, at the touch of a button.",
    body: "Our flagship bioclimatic pergola. Motorized, dual-walled aluminum louvers rotate for sun, shade, or a fully waterproof roof — with whisper-quiet motors and hidden gutter drainage.",
    image: "/img/component/R-Blade1.jpg",
    theme: "light",
    intro: [
      "Introducing R-BLADE™ by Azenco Outdoor — a top-tier solution providing a unique outdoor experience, come rain or shine.",
      "As a bioclimatic pergola, R-BLADE™ offers precise control over sunlight and shade with its innovative motorized adjustable louvers. The dual-wall engineering and gapless design ensure enhanced insulation and superior drainage, making our louvered roofs reliable in any weather. Powered by whisper-quiet motors, every adjustment is effortless, preserving the tranquility of your outdoor moments.",
      "Whether you're seeking the comforting warmth of the sun or require protection for yourself, your guests, or your furniture, R-BLADE™ adapts effortlessly to your needs.",
    ],
    colorGroups: [
      {
        note: POWDER_NOTE,
        swatches: [SW.white, SW.black, SW.darkGray, SW.wood, SW.custom],
      },
    ],
    stats: [
      { kind: "snow", label: "Snow Load Capacity", value: "Up to 100 lbs/sq. ft" },
      { kind: "wind", label: "Wind Load Capacity", value: "Up to 190 mph" },
    ],
    featureGroups: [
      {
        heading: "R-BLADE™ Features",
        items: ["Motorized Louvered Roof", "Built-in Gutter System", "Extruded Aluminum"],
      },
      {
        heading: "Accessories",
        items: ["Corbel", "Cornice", "Accessory Beam", "Base Plate Cover"],
      },
      {
        heading: "Lighting",
        items: ["LED Ramps", "LED Strips", "Recessed Lights", "Solar-Powered Lights"],
      },
      {
        heading: "Privacy",
        items: [
          "Fixed Privacy Wall",
          "Operable Privacy Wall",
          "Integrated Screen",
          "Sliding Glass Door",
        ],
      },
      {
        heading: "Dimensions",
        items: ["Up to 22'10\" x 16' Single Zone", "6.5\" x 6.5\" – 8\" x 8\" Posts"],
      },
    ],
    configurations: ["Wall Mounted", "Free Standing", "Multi-zones", "Special Cuts & Angles"],
  },

  // ── 2. R-BREEZE ─────────────────────────────────────────────────────────
  {
    slug: "r-breeze",
    name: "R-BREEZE™",
    category: "Fixed Louvered Pergola",
    tagline: "Architectural shade. No moving parts.",
    body: "Fixed aluminum louvers create a delicate interplay of light and shadow — partial shade with an open, airy feel. Choose the 55 Edition for angled shade or the 90 Edition for vertical-slat privacy.",
    image: "/img/component/R-Breeze1.jpg",
    theme: "dark",
    intro: [
      "R-BREEZE™ prioritizes partial shade while seamlessly enhancing the visual appeal of any space.",
      "Designed to create a delicate interplay of light and shadow, its lattice design provides just the right amount of shade while maintaining an open and airy feel. The 55 Edition features slats angled at 55 degrees for optimal shade, while the 90 Edition offers vertical slats for enhanced privacy and bold design.",
      "Effectively delineating areas for any exterior space, this sculptural element adds a new dimension, creating distinct volumes and defining the character of each outdoor zone.",
    ],
    stats: [{ kind: "wind", label: "Wind Load Capacity", value: "Up to 190 mph" }],
    editions: [
      { name: "R-BREEZE™ — 90 Edition", detail: "Vertical Slats" },
      { name: "R-BREEZE™ — 55 Edition", detail: "Angled Slats" },
    ],
    featureGroups: [
      {
        heading: "R-BREEZE™ Features",
        items: ["Fixed Louvered Roof", "Patented System", "Support Beam", "Extruded Aluminum"],
      },
      { heading: "Accessories", items: ["Base Plate Cover"] },
      { heading: "Privacy", items: ["Fixed Privacy Wall", "Operable Privacy Wall"] },
      {
        heading: "Lighting",
        items: ["LED Ramps", "Recessed Lights", "Solar-Powered Lights"],
      },
      {
        heading: "Dimensions",
        items: ["Up to 22'10\" x 22'10\" Single Zone", "6.5\" x 6.5\" – 8\" x 8\" Posts"],
      },
    ],
  },

  // ── 3. K-BANA ───────────────────────────────────────────────────────────
  {
    slug: "k-bana",
    name: "K-BANA™",
    category: "Manual Louvered Pergola",
    tagline: "Plug-and-play outdoor living.",
    body: "A four-time award-winning manual louvered pergola. Louvers rotate up to 90° by hand, an integrated gutter system keeps you dry, and no electrical connection means it installs almost anywhere — often without a permit.",
    image: "/img/component/K-Bana.jpg",
    theme: "light",
    intro: [
      "K-BANA™ by Azenco Outdoor is a four-time award-winning manual louvered pergola that redefines intimate accommodations. Its ingenious engineering integrates a gutter system and a manually operable roof giving control over sunlight and privacy.",
      "Versatile, with lighter features, its modularity serves various applications. Combined, they are a perfect outdoor retreat. Freestanding, it is a stylish poolside lounge, or a cozy entertainment space. With no electrical connection required, K-BANA™ can be installed almost anywhere — often without a permit depending on the configuration and location.",
      "Our manual louvered roof pergola is way more than a simple cabana; it's a transformative addition to your outdoor lifestyle, suitable for both residential and commercial settings.",
    ],
    colorGroups: [
      {
        note: POWDER_NOTE,
        swatches: [SW.fullWhite, SW.blackWhite],
      },
    ],
    stats: [
      { kind: "snow", label: "Snow Load Capacity", value: "Up to 25 lbs/sq. ft" },
      { kind: "wind", label: "Wind Load Capacity", value: "Up to 105 mph" },
    ],
    featureGroups: [
      {
        heading: "K-BANA™ Features",
        items: [
          "Manual Louvered Roof",
          "Integrated Gutter System",
          "Louvers Rotate Up to 90°",
          "Extruded Aluminum",
        ],
      },
      { heading: "Lighting", items: ["Solar-Powered Lights"] },
      { heading: "Accessories", items: ["Base Plate Cover"] },
      { heading: "Privacy", items: ["Fixed Privacy Wall"] },
      {
        heading: "Dimensions",
        items: ["10' W x 10' L x 8' H", "12' W x 12' L x 8' H", "4.5\" x 4.5\" Posts"],
      },
    ],
    configurations: ["Platform Edition", "Anchored Edition", "Multi-zones", "Combined"],
  },

  // ── 4. K-NOPY ───────────────────────────────────────────────────────────
  {
    slug: "k-nopy",
    name: "K-NOPY™",
    category: "Premium Aluminum Awning",
    tagline: "Suspended elegance for the modern façade.",
    body: "A premium cantilevered aluminum awning with an integrated tie-back system and zero vertical posts — elegant storefront and residential coverage where unobstructed access matters.",
    image: "/img/component/K-NOPY.jpg",
    theme: "dark",
    intro: [
      "K-NOPY™ is a premium aluminum awning designed for unmatched durability and sleek design. Its integrated tie-back system ensures reliable support, while the cantilevered structure eliminates the need for vertical posts, making it a practical choice for various applications.",
      "Ideal for high-traffic areas, it serves as an elegant storefront canopy where unobstructed access is essential. In residential settings, K-NOPY™ provides seamless coverage over doors and windows, enhancing functionality and curb appeal.",
      "With its clean lines and high-quality materials, K-NOPY™ is more than an awning — it's the perfect solution for those seeking a sophisticated, space-efficient, and versatile outdoor cover.",
    ],
    stats: [
      { kind: "snow", label: "Snow Load Capacity", value: "Up to 100 lbs/sq. ft" },
      { kind: "wind", label: "Wind Load Capacity", value: "Up to 175 mph" },
    ],
    editions: [
      { name: "K-NOPY™ Louvered Edition" },
      { name: "K-NOPY™ Insulated Edition" },
    ],
  },

  // ── 5. R-SHADE ──────────────────────────────────────────────────────────
  {
    slug: "r-shade",
    name: "R-SHADE™",
    category: "Premium Insulated Patio Cover",
    tagline: "Full overhead protection. Year-round comfort.",
    body: "An insulated solid-roof cover that minimizes heat transfer for all-season comfort. Integrate screens, heaters, or fans for a fully enclosed, climate-controlled outdoor room — 365 days a year.",
    image: "/img/component/R-Shade.jpg",
    theme: "light",
    intro: [
      "Experience ultimate weather protection with R-SHADE™ by Azenco Outdoor. Say farewell to weather constraints with our insulated roof patio cover, offering maximum comfort in case of rain, snow, cold or heat.",
      "Designed for all-season use, the insulated roof minimizes heat transfer, ensuring a cool and comfortable space. R-SHADE™ allows screens, heaters, or fans to be integrated to create a fully enclosed, climate-controlled environment.",
      "Whether you're hosting gatherings, relaxing, or working outdoors, R-SHADE™ transforms patios into versatile extensions of your living space, regardless of the weather.",
      "Experience comfort, style, and flexibility, making your outdoor area truly yours, 365 days a year.",
    ],
    colorGroups: [
      {
        label: "Frame Colors",
        note: POWDER_NOTE,
        swatches: [SW.white, SW.black, SW.darkGray, SW.wood, SW.custom],
      },
      {
        label: "Panel Colors",
        swatches: [SW.white, SW.bronze, SW.wood],
      },
    ],
    stats: [
      { kind: "snow", label: "Snow Load Capacity", value: "Up to 80 lbs/sq. ft" },
      { kind: "wind", label: "Wind Load Capacity", value: "Up to 175 mph" },
    ],
    featureGroups: [
      {
        heading: "R-SHADE™ Features",
        items: ["Insulated Panels", "Built-in Gutter System", "Extruded Aluminum"],
      },
      {
        heading: "Accessories",
        items: ["Corbel", "Cornice", "Accessory Beam", "Base Plate Cover"],
      },
      {
        heading: "Privacy",
        items: [
          "Fixed Privacy Wall",
          "Operable Privacy Wall",
          "Integrated Screen",
          "Sliding Glass Door",
        ],
      },
      {
        heading: "Lighting",
        items: ["LED Ramps", "LED Strips", "Recessed Lights", "Solar-Powered Lights"],
      },
      {
        heading: "Dimensions",
        items: ["Up to 22'10\" x 22'10\" Single Zone", "6.5\" x 6.5\" – 8\" x 8\" Posts"],
      },
    ],
    configurations: ["Wall Mounted", "Free Standing", "Multi-zones", "Special Cuts & Angles"],
  },

  // ── 6. R-CAR ────────────────────────────────────────────────────────────
  {
    slug: "r-car",
    name: "R-CAR™",
    category: "Luxury Insulated Carport",
    tagline: "Protect what's parked outside — in style.",
    body: "An insulated carport with the same engineering as our pergolas. Extended pillars shelter multiple vehicles or a boat, integrate into your home or stand freestanding, and can carry solar panels for EV charging.",
    image: "/img/component/R-Car.jpg",
    theme: "dark",
    intro: [
      "Protect your vehicle from the elements — the innovative R-CAR™ lets you experience the convenience of driving into a carport. Boasting the same benefits as our pergolas, it is a sophisticated design that effortlessly complements any architectural style.",
      "Whether it's rain, snow, or intense sunlight causing wear and tear on your vehicle, our carport provides a reliable solution. The extended pillars not only alleviate concerns about accommodating multiple vehicles or even a boat, but also provide a robust cover for shielding your valuable assets.",
      "Tailored to your preferences, our carports can be integrated into your existing structure or installed as a freestanding, drive-through shelter. Choose the perfect color to harmonize with your house or restaurant, from the frame to the roof. Take it a step further by incorporating solar panels to generate environmentally friendly power for your electric vehicle, ensuring a sustainable and eco-friendly solution.",
    ],
    stats: [
      { kind: "snow", label: "Snow Load Capacity", value: "Up to 80 lbs/sq. ft" },
      { kind: "wind", label: "Wind Load Capacity", value: "Up to 175 mph" },
    ],
    featureGroups: [
      {
        heading: "R-CAR™ Features",
        items: ["Insulated Panels", "Built-in Gutter System", "Extruded Aluminum"],
      },
      {
        heading: "Accessories",
        items: ["Corbel", "Cornice", "Accessory Beam", "Base Plate Cover"],
      },
      { heading: "Privacy", items: ["Fixed Privacy Wall", "Operable Privacy Wall"] },
      {
        heading: "Lighting",
        items: ["LED Ramps", "LED Strips", "Recessed Lights", "Solar-Powered Lights"],
      },
      {
        heading: "Dimensions",
        items: ["Up to 22'10\" x 22'10\" Single Zone", "6.5\" x 6.5\" – 8\" x 8\" Posts"],
      },
    ],
    configurations: ["Wall Mounted", "Free Standing", "Multi-zones", "Special Cuts & Angles"],
  },
];
