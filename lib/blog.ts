import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog data layer.
 *
 * Posts live as Markdown files in `content/blog/*.md`. Each file has a
 * frontmatter block (the `--- ... ---` section at the top) with metadata,
 * followed by the post body written in Markdown.
 *
 * To add a post: drop a new `.md` file in `content/blog/`. That's it — the
 * blog index, category filters, and the post page all pick it up automatically.
 * See `content/blog/README.md` for the authoring guide.
 */

// ── Categories ─────────────────────────────────────────────
// The fixed set of categories a post can belong to. The `slug` is used in
// frontmatter (`category: product-lines`) and in URLs (?category=product-lines).
export const BLOG_CATEGORIES = [
  { slug: "product-lines", label: "Product Lines" },
  { slug: "buying-guides", label: "Buying Guides" },
  { slug: "field-notes", label: "Field Notes" },
  { slug: "maintenance", label: "Maintenance" },
  { slug: "company-news", label: "Company News" },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]["slug"];

export function categoryLabel(slug: string): string {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

// ── Types ──────────────────────────────────────────────────
export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  author: string;
  /** ISO date string, e.g. "2026-05-12" */
  date: string;
  /** e.g. "6 min" — optional; estimated from word count if omitted */
  readTime: string;
  /** Optional path under /public, e.g. "/img/blog/my-cover.jpg" */
  cover?: string;
  draft: boolean;
}

export interface BlogPost extends BlogPostMeta {
  /** Rendered HTML body */
  html: string;
}

// ── File access ────────────────────────────────────────────
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function postFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md");
}

function estimateReadTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function parseFile(file: string): BlogPost {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const category = (data.category as string) ?? "field-notes";
  if (!BLOG_CATEGORIES.some((c) => c.slug === category)) {
    throw new Error(
      `Blog post "${file}" has unknown category "${category}". ` +
        `Valid categories: ${BLOG_CATEGORIES.map((c) => c.slug).join(", ")}`,
    );
  }

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    category: category as BlogCategorySlug,
    author: data.author ?? "SJB Outdoor Living",
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    readTime: data.readTime ?? estimateReadTime(content),
    cover: data.cover ?? undefined,
    draft: data.draft === true,
    html: marked.parse(content, { async: false }) as string,
  };
}

// ── Public API ─────────────────────────────────────────────
const isDev = process.env.NODE_ENV !== "production";

/** All published posts, newest first. Drafts are hidden outside dev. */
export function getAllPosts(): BlogPost[] {
  return postFiles()
    .map(parseFile)
    .filter((p) => isDev || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Categories that actually have at least one published post, with counts. */
export function getActiveCategories(): { slug: string; label: string; count: number }[] {
  const posts = getAllPosts();
  return BLOG_CATEGORIES.map((c) => ({
    ...c,
    count: posts.filter((p) => p.category === c.slug).length,
  })).filter((c) => c.count > 0);
}
