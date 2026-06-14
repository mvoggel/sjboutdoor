/**
 * Renders a JSON-LD <script> block. One typed helper for every structured-data
 * type on the site (Organization, LocalBusiness, Product, FAQPage,
 * BreadcrumbList, BlogPosting) so we stop hand-writing dangerouslySetInnerHTML.
 *
 * Works in both server and client components.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject; no user-controlled HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Builds a BreadcrumbList from an ordered list of { name, url } crumbs.
 * `url` should be an absolute URL (use absUrl from lib/site).
 */
export function breadcrumbList(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Builds a FAQPage from question/answer pairs. */
export function faqPage(
  faqs: { q: string; a: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
