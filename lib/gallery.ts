import manifest from "./gallery-manifest.json";
import {
  GALLERY_CATEGORIES,
  ALL_WORK,
  categoryBySlug,
  type GalleryCategory,
} from "./gallery-categories";

export { GALLERY_CATEGORIES, ALL_WORK, categoryBySlug };
export type { GalleryCategory };

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
  /** Category slug this photo belongs to. */
  category: string;
  /** Display label for the category (e.g. "Louvered Pergolas"). */
  categoryLabel: string;
};

type ManifestEntry = { src: string; caption?: string };
const MANIFEST = manifest as Record<string, ManifestEntry[]>;

function toPhoto(entry: ManifestEntry, cat: GalleryCategory): GalleryPhoto {
  return {
    src: entry.src,
    caption: entry.caption,
    category: cat.slug,
    categoryLabel: cat.label,
    alt: entry.caption
      ? `${cat.label} installation in ${entry.caption}, Florida`
      : `${cat.label} installation by SJB Outdoor`,
  };
}

/** Photos for a single category, in manifest (filename) order. */
export function getCategoryPhotos(slug: string): GalleryPhoto[] {
  const cat = categoryBySlug(slug);
  if (!cat) return [];
  return (MANIFEST[slug] ?? []).map((e) => toPhoto(e, cat));
}

/**
 * Every photo across all categories, interleaved round-robin so the "All Work"
 * view reads as a varied mosaic instead of long single-product runs.
 */
export function getAllPhotos(): GalleryPhoto[] {
  const buckets = GALLERY_CATEGORIES.map((cat) =>
    (MANIFEST[cat.slug] ?? []).map((e) => toPhoto(e, cat)),
  );
  const out: GalleryPhoto[] = [];
  const max = Math.max(0, ...buckets.map((b) => b.length));
  for (let i = 0; i < max; i++) {
    for (const bucket of buckets) {
      if (bucket[i]) out.push(bucket[i]);
    }
  }
  return out;
}

/** Count of photos per category slug (handy for hiding empty filters). */
export function getCategoryCounts(): Record<string, number> {
  return Object.fromEntries(
    GALLERY_CATEGORIES.map((c) => [c.slug, (MANIFEST[c.slug] ?? []).length]),
  );
}
