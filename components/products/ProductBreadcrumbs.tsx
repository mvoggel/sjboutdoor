"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import { absUrl } from "@/lib/site";

/**
 * Breadcrumb trail for product pages.
 *
 * Product configs already carry the trail as a display string on
 * `hero.eyebrow` — e.g. "Exterior Shades / Hurricane Screens". This parses
 * that string into real links rather than making every page config repeat
 * the same path as structured data.
 *
 * The last segment is the current page, so it renders as plain text with
 * `aria-current` instead of a link. Any segment without a known route also
 * degrades to plain text, so an unmapped label can never produce a dead link.
 *
 * The BreadcrumbList JSON-LD is built from the same `buildCrumbs` output as
 * the visible trail, so the structured data can never drift from what a
 * reader actually sees on the page.
 */

const ROUTES: Record<string, string> = {
  Products: "/products",
  "Exterior Shades": "/products/exterior-shades",
  "Exterior Shutters": "/products/exterior-shutters",
};

interface Crumb {
  label: string;
  href?: string;
}

export function buildCrumbs(path: string): Crumb[] {
  const segments = path
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);

  const crumbs: Crumb[] = [{ label: "Products", href: "/products" }];

  segments.forEach((label, i) => {
    // The config string sometimes leads with "Products"; the trail above
    // already covers it.
    if (label === "Products") return;
    const isCurrent = i === segments.length - 1;
    crumbs.push({ label, href: isCurrent ? undefined : ROUTES[label] });
  });

  return crumbs;
}

export function ProductBreadcrumbs({ path }: { path: string }) {
  const pathname = usePathname();
  const crumbs = buildCrumbs(path);

  // The current page has no href of its own, so it resolves to this route.
  const currentPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const schema = breadcrumbList(
    crumbs.map((c) => ({ name: c.label, url: absUrl(c.href ?? currentPath) })),
  );

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
      <JsonLd data={schema} />
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.4,
        }}
      >
        {crumbs.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {i > 0 && (
              <span aria-hidden="true" style={{ color: "var(--ink-muted)", opacity: 0.5, fontWeight: 550 }}>
                /
              </span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                style={{ color: "var(--rich-deep)", textDecoration: "none" }}
                className="hover:underline underline-offset-[5px] decoration-1"
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: "var(--rich-deep)", opacity: 0.7 }}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
