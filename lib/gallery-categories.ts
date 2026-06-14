/**
 * The single source of truth for gallery categories.
 *
 * - `slug`     → the folder name under `public/img/gallery/<slug>/` AND the
 *                manifest key. Don't rename without moving the folder.
 * - `label`    → what shows on the /gallery filter bar and product headings.
 * - `route`    → the product page this category maps to (used to deep-link the
 *                /gallery filters from a product page, and vice-versa).
 *
 * Order here is the order filters/sections render in.
 */
export type GalleryCategory = {
  slug: string;
  label: string;
  route: string;
};

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { slug: "louvered-pergolas", label: "Louvered Pergolas", route: "/products/louvered-pergolas" },
  { slug: "retractable-awnings", label: "Retractable Awnings", route: "/products/retractable-awnings" },
  { slug: "exterior-shutters", label: "Exterior Shutters", route: "/products/exterior-shutters" },
  { slug: "bahama-shutters", label: "Bahama Shutters", route: "/products/bahama-shutters" },
  { slug: "storm-shutters", label: "Storm Shutters", route: "/products/storm-shutters" },
  { slug: "exterior-shades", label: "Exterior Shades", route: "/products/exterior-shades" },
  { slug: "patio-shades", label: "Patio Shades", route: "/products/patio-screens" },
  { slug: "garage-door-screens", label: "Garage Door Screens", route: "/products/garage-door-screens" },
];

/** The virtual "everything" filter shown first on the /gallery page. */
export const ALL_WORK = { slug: "all", label: "All Work" } as const;

export function categoryBySlug(slug: string): GalleryCategory | undefined {
  return GALLERY_CATEGORIES.find((c) => c.slug === slug);
}
