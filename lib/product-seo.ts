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
  /**
   * Optional Service JSON-LD block (Mader Marketing AEO package, July 2026).
   * Emitted alongside the Product schema — the Service entity is what AI
   * answer engines match to "who installs X in Florida" queries. `provider`
   * links back to the sitewide business entity via its `@id`.
   */
  service?: ProductService;
}

export interface ProductService {
  /** Service name, e.g. "Motorized Louvered Pergola Installation Florida" */
  name: string;
  /** schema.org serviceType, e.g. "Louvered Pergola Installation" */
  serviceType: string;
  description: string;
  /** Product brand installed (e.g. "Azenco") — omitted when not brand-specific */
  brand?: string;
  /** Featured cities for this service's areaServed ("Florida" is always appended) */
  cities: string[];
  /** Offer line (defaults to the free-consultation offer) */
  offer?: string;
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
    ...(p.service ? [serviceJsonLd(p.slug, p.service)] : []),
    breadcrumbList([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Products", url: absUrl("/products") },
      { name: p.breadcrumbName, url },
    ]),
  ];
}

function serviceJsonLd(
  slug: string,
  s: ProductService
): Record<string, unknown> {
  const url = absUrl(`/products/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    ...(s.brand ? { brand: { "@type": "Brand", name: s.brand } } : {}),
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BRAND_NAME,
    },
    areaServed: [
      ...s.cities.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: "Florida" },
    ],
    url,
    offers: {
      "@type": "Offer",
      description: s.offer ?? "Free in-home consultation.",
    },
  };
}
