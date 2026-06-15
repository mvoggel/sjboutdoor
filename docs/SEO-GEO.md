# SEO & AI-Search (GEO) — Site Reference & Coordination Brief

This is the one-stop reference for how SJB Outdoors' website is set up for Google/traditional
SEO **and** AI search (ChatGPT, Google AI Overviews, Perplexity, Claude). It doubles as prep
for coordinating with the GEO consultant the marketing team brought on.

**Audience:** the site owner + the marketing/GEO team.
**Last updated:** see git history.

---

## TL;DR

The site is a statically-exported Next.js app (App Router) deployed to GitHub Pages today at
`mvoggel.github.io/sjboutdoor`, moving to the apex domain **`https://sjboutdoors.com`** (single-b).
All SEO identity — canonical URL, business name, address, phone — lives in **one file**:
[`lib/site.ts`](../lib/site.ts). Change it there and it propagates to metadata, sitemap, robots,
and every structured-data block.

The recent technical pass added: sitewide Organization/LocalBusiness schema, an AI-crawler-friendly
`robots.txt`, full per-page metadata + canonicals + Open Graph/Twitter cards, FAQ/Breadcrumb/Product
structured data, a real `/products` hub, and analytics/verification hooks. **Two values still need
real data before launch** (address + geo) — see "Action items."

---

## 1. Canonical facts (must stay consistent everywhere — site, GBP, citations, directories)

| Field | Value |
|---|---|
| Public brand name | **SJB Outdoors** (not "SJBB", not "South Jersey Blinds") |
| Legal entity | South Jersey Blinds & Beyond |
| Production domain | `https://sjboutdoors.com` (single-b, no www) |
| Phone | (352) 642-5839 |
| Email | contact@sjboutdoors.com |
| Hours | Mon–Fri 9 AM – 6 PM ET |
| Service area | 19 Florida cities (see [`lib/service-areas.ts`](../lib/service-areas.ts)) |

> **Why this matters for AI search:** answer engines build a single "entity" for the business by
> reconciling the name/address/phone across the website, Google Business Profile, and directories.
> Any mismatch (e.g. "SJBB" on the site but "South Jersey Blinds" in GBP) weakens that entity and
> makes the business less likely to be cited. **NAP consistency is the #1 coordination point.**

---

## 2. Current-state scorecard

| Area | Status | Notes |
|---|---|---|
| Dynamic XML sitemap | ✅ | 54 URLs, real blog `lastModified`, priorities set — [`app/sitemap.ts`](../app/sitemap.ts) |
| robots.txt + AI-crawler rules | ✅ | Explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc. — [`app/robots.ts`](../app/robots.ts) |
| Staging kept out of index | ✅ | github.io host auto-`noindex` so it doesn't compete with the apex domain |
| `metadataBase` + canonicals | ✅ | Set sitewide; every page has a self-referencing canonical |
| Per-page metadata | ✅ | All marketing pages (was missing on about, gallery, our-process, products, 6 product pages) |
| Title template | ✅ | `%s \| SJB Outdoors` applied once; per-page titles are brand-free |
| Open Graph + Twitter cards | ✅ | Default share image sitewide + per-page overrides |
| Organization + LocalBusiness schema | ✅ | Sitewide, in [`app/layout.tsx`](../app/layout.tsx); the canonical entity record |
| Product schema | ✅ | All 8 product pages |
| FAQPage schema | ✅ | Retractable awnings (8 Q&As); reuses on-page accordion data |
| BreadcrumbList schema | ✅ | Product, service-area, blog, and products-hub pages |
| BlogPosting / Article schema | ✅ | Upgraded with `dateModified`, publisher logo, absolute image URL |
| One H1 per page | ✅ | Homepage now has an (accessible, visually-hidden) H1 |
| `/products` hub | ✅ | Was a "Coming Soon" placeholder; now links all 8 products + ItemList schema |
| Web manifest + theme color | ✅ | [`app/manifest.ts`](../app/manifest.ts) |
| GA4 + Search Console hooks | ✅ (env-gated) | Wired in layout; supply `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GSC_VERIFICATION` to activate |
| Business address + geo in schema | ⚠️ TODO | Placeholders in [`lib/site.ts`](../lib/site.ts) — must match GBP exactly |
| Real apple-touch / hi-res icons + 1200×630 OG image | ⚠️ Nice-to-have | Manifest currently points at favicon.ico; a branded OG image would improve share previews |
| `/privacy` and `/terms` pages | ⚠️ Broken links | Linked in the footer but the pages don't exist (404). Add them or remove the links. |

---

## 3. How to change SEO data (for whoever maintains the site)

- **Business identity / NAP / domain:** edit [`lib/site.ts`](../lib/site.ts). One place.
- **A page's title/description/OG:** edit that page's `metadata` export (or its `layout.tsx` for
  client-component pages like the product pages, gallery, about, our-process).
- **Add a product to schema + the hub:** product SEO is generated from a small config object via
  [`lib/product-seo.ts`](../lib/product-seo.ts); the hub list is in [`app/products/page.tsx`](../app/products/page.tsx).
- **Environment values** (set in the GitHub Actions deploy env or `.env.local`):
  `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`. See [`.env.example`](../.env.example).

---

## 4. Coordination with the GEO consultant — answers to their four topics

### 1) Google Business Profile
They own GBP optimization. The **only hard requirement** from the website side: GBP must match the
canonical facts in section 1 **exactly** — same name spelling ("SJB Outdoors"), same phone format,
same address once we finalize it. Once the real address/hours are set in `lib/site.ts`, the
`LocalBusiness` JSON-LD and GBP should be identical. Recommend they also link the GBP/Maps URL so we
can add it to the schema `sameAs` list (strengthens the entity).

### 2) Kadence WordPress landing pages
Main risk to flag: **keyword cannibalization / duplicate content.** Separate WP pages targeting the
same terms as our existing Next.js pages (e.g. "louvered pergolas Naples") split ranking signals and
can confuse both Google and AI engines about which page is authoritative. Recommended guardrails:
- Put the WP content on a **clearly separated path or subdomain**, not overlapping our URL structure.
- Target **different intent** — informational/long-tail/educational ("how do louvered pergolas handle
  hurricanes?") rather than duplicating our conversion-focused product/city pages.
- **Cross-link** WP content to the main site's product and service-area pages (passes authority and
  keeps the main site as the conversion destination).
- For any genuine overlap, agree on which URL is canonical and point `rel=canonical` at it.

### 3) Blog content workflow
Our blog is **file-based in the repo**, not a CMS:
- Posts are Markdown files in [`content/blog/`](../content/blog/) with YAML frontmatter.
- Frontmatter fields: `title`, `excerpt`, `category`, `author`, `date` (ISO `YYYY-MM-DD`),
  `readTime`, `cover` (optional image path), `draft` (boolean).
- Valid `category` values: `field-notes`, `buying-guides`, `product-lines`, `maintenance`, `company-news`.
- `draft: true` keeps a post out of the public site, sitemap, and feeds until flipped to `false`.
- Merging to `main` auto-deploys via GitHub Actions — **publishing = merging the file.**
- BlogPosting + Breadcrumb schema is generated automatically; authors don't add markup.

If the consultant prefers to draft in WordPress, that's fine — but the two blogs should target
different topics to avoid duplication, and we should agree on a publishing calendar so nothing goes
out of sequence.

### 4) Technical request channel (schema, links, page tweaks)
Best path: a **GitHub issue per request** (or a shared doc) containing the target URL + the exact
markup/links wanted. Most common asks are already handled site-wide, so before requesting, note that
these already exist: XML sitemap, robots/AI-crawler rules, per-page metadata + canonicals, Open
Graph/Twitter, and Organization/LocalBusiness/Product/FAQ/Breadcrumb/Article schema. New schema types
or page-level changes are quick to add through the helpers in `components/seo/` and `lib/`.

---

## 5. Action items before / around launch

1. **Fill real NAP** in [`lib/site.ts`](../lib/site.ts): `ADDRESS.streetAddress`, `postalCode`, and
   `GEO` lat/lng — and confirm hours. Must match GBP. (If service-area only with no public address,
   drop `streetAddress` and rely on `areaServed`.)
2. **Confirm the apex domain spelling** one more time at DNS cutover: `sjboutdoors.com` (single-b).
   It's already the default; just verify the env/deploy uses it.
3. **Set analytics envs** if desired: `NEXT_PUBLIC_GA_ID` (GA4) and `NEXT_PUBLIC_GSC_VERIFICATION`.
4. **Add `sameAs` profiles** (Instagram, Facebook, GBP/Maps) in `lib/site.ts` once URLs are confirmed.
5. **Add `/privacy` + `/terms` pages** (or remove the footer links).
6. *(Optional)* Add a branded 1200×630 OG image and a proper icon set.
7. At DNS cutover, submit `https://sjboutdoors.com/sitemap.xml` in Google Search Console and confirm
   `robots.txt` resolves at the apex root (it only takes effect at a domain root, not the github.io path).
