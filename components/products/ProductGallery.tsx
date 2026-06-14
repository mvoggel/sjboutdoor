"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FilmstripGallery } from "./FilmstripGallery";
import { Container } from "@/components/ui/Container";
import { getCategoryPhotos, categoryBySlug } from "@/lib/gallery";

type ProductGalleryProps = {
  /** Gallery category slug (see lib/gallery-categories.ts). */
  category: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
};

/**
 * The "The Gallery" strip on a product page. Pulls its photos from the shared
 * gallery source (lib/gallery) filtered to one category, so it always matches
 * what's tagged for that product on the /gallery page. Renders nothing when the
 * category has no photos yet.
 */
export function ProductGallery({
  category,
  eyebrow = "The Gallery",
  heading = "Recent installations",
  intro,
}: ProductGalleryProps) {
  const images = getCategoryPhotos(category);
  if (images.length === 0) return null;
  const label = categoryBySlug(category)?.label ?? "work";

  return (
    <>
      <FilmstripGallery
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        images={images}
      />
      {/* Bridge to the full gallery, pre-filtered to this product. */}
      <div style={{ background: "var(--near-black)" }} className="pb-16 md:pb-24">
        <Container>
          <Link
            href={`/gallery?filter=${category}`}
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rich-warm)",
            }}
          >
            See all {label.toLowerCase()} in the gallery
            <ArrowUpRight size={15} strokeWidth={1.6} />
          </Link>
        </Container>
      </div>
    </>
  );
}

export default ProductGallery;
