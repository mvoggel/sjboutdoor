import { PRODUCT_SLUGS, type ProductSlug } from "./validators";

/**
 * If the visitor is currently on a product page (e.g. `/products/exterior-shades`),
 * return that product's slug — so the consult modal can preselect it when the
 * site-wide "Schedule Consultation" button is clicked.
 *
 * Returns undefined on any other route (homepage, about, etc.) so the form
 * stays unselected and forces the visitor to choose.
 */
export function productSlugFromPath(pathname: string | null): ProductSlug | undefined {
  if (!pathname) return undefined;
  const match = pathname.match(/^\/products\/([^/]+)/);
  if (!match) return undefined;
  const slug = match[1];
  return (PRODUCT_SLUGS as readonly string[]).includes(slug)
    ? (slug as ProductSlug)
    : undefined;
}
