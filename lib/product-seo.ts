import type { Metadata } from "next";
import { SITE_URL, BRAND_NAME, absUrl } from "@/lib/site";
import { breadcrumbList } from "@/components/seo/JsonLd";

/**
 * Per-product SEO config consumed by each product route's layout.tsx to produce
 * (1) page metadata (title/description/canonical/OG) and (2) the Product +
 * BreadcrumbList JSON-LD. One shape so every product page is consistent.
 */
export interface ProductSeo {
  /** URL slug under /products */
  slug: string;
  /** Document <title> — brand is appended by the root title template */
  title: string;
  /** Product name used in Product schema */
  name: string;
  description: string;
  /** Image path under the site origin, e.g. /img/products/awnings.png */
  image: string;
  /** schema.org Product category */
  category: string;
  /** Brand/manufacturer line for schema (defaults to BRAND_NAME) */
  brand?: string;
  /** Short label shown in the breadcrumb trail */
  breadcrumbName: string;
}

export function productMetadata(p: ProductSeo): Metadata {
  const url = `/products/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      type: "website",
      images: [{ url: p.image }],
    },
  };
}

export function productJsonLd(p: ProductSeo): Record<string, unknown>[] {
  const url = absUrl(`/products/${p.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      description: p.description,
      category: p.category,
      brand: { "@type": "Brand", name: p.brand ?? BRAND_NAME },
      image: absUrl(p.image),
      areaServed: "Florida",
      manufacturer: { "@type": "Organization", name: BRAND_NAME },
      url,
    },
    breadcrumbList([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Products", url: absUrl("/products") },
      { name: p.breadcrumbName, url },
    ]),
  ];
}
