import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { getAllPosts, getPost, categoryLabel } from "@/lib/blog";
import { JsonLd, breadcrumbList, faqPage } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  BRAND_NAME,
  absUrl,
  LOGO_PATH,
  OWNER_PERSON_JSONLD,
} from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  // metaTitle lets a post target keyword phrasing that differs from the
  // visible headline; the root template appends the brand suffix either way.
  const title = post.metaTitle ?? post.title;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Up to two more recent posts to suggest at the end
  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const postUrl = absUrl(`/blog/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    // Author = the business entity (per the content-series publishing notes),
    // tied to the sitewide LocalBusiness @id. If a post sets a personal
    // `author:` in frontmatter, fall back to a plain Person node.
    author:
      post.author === BRAND_NAME
        ? {
            "@type": "Organization",
            "@id": `${SITE_URL}/#business`,
            name: BRAND_NAME,
            url: absUrl("/about"),
          }
        : { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      "@id": `${SITE_URL}/#business`,
      logo: { "@type": "ImageObject", url: absUrl(LOGO_PATH) },
    },
    ...(post.cover ? { image: absUrl(post.cover) } : {}),
    mainEntityOfPage: postUrl,
    url: postUrl,
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)" }}>
        <JsonLd
          data={[
            jsonLd,
            OWNER_PERSON_JSONLD,
            // Per-post FAQ schema (frontmatter `faqs`) — the highest-value
            // block for AI answer-engine citation. Q&As must match the body.
            ...(post.faqs?.length ? [faqPage(post.faqs)] : []),
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Field Notebook", url: absUrl("/blog") },
              { name: post.title, url: postUrl },
            ]),
          ]}
        />

        {/* ── Header ──────────────────────────────────────── */}
        <section
          className="pt-32 md:pt-40 pb-10 md:pb-14"
          style={{ borderBottom: "1px solid var(--rich-sand)" }}
        >
          <Container>
            <div className="max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                }}
              >
                <span aria-hidden>←</span> Field Notebook
              </Link>

              <p
                className="mb-4"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--rich-warm)",
                }}
              >
                {categoryLabel(post.category)}
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                  fontWeight: 500,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.08,
                }}
              >
                {post.title}
              </h1>

              {/* Visible author byline — matches the BlogPosting author schema
                  and links to the About page (the entity's `url`). */}
              <p
                className="mt-6"
                style={{ fontSize: "0.8rem", color: "var(--ink-muted)", letterSpacing: "0.04em", lineHeight: 1.6 }}
              >
                By{" "}
                <Link
                  href="/about"
                  style={{
                    color: "var(--ink-primary)",
                    borderBottom: "1px solid rgba(184,146,74,0.5)",
                  }}
                >
                  {post.author}
                </Link>
              </p>
              <p
                className="mt-2"
                style={{ fontSize: "0.8rem", color: "var(--ink-muted)", letterSpacing: "0.04em" }}
              >
                {formatDate(post.date)} · {post.readTime} read
              </p>
            </div>
          </Container>
        </section>

        {/* ── Cover image (optional) ──────────────────────── */}
        {post.cover && (
          <section className="pt-10 md:pt-14">
            <Container>
              <div className="max-w-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover}
                  alt={post.coverAlt ?? post.title}
                  style={{ width: "100%", height: "auto", borderRadius: "2px" }}
                />
              </div>
            </Container>
          </section>
        )}

        {/* ── Body ────────────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <Container>
            <article
              className="blog-prose max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Container>
        </section>

        {/* ── Keep reading ────────────────────────────────── */}
        {more.length > 0 && (
          <section
            className="py-14 md:py-20"
            style={{ borderTop: "1px solid var(--rich-sand)" }}
          >
            <Container>
              <p className="text-eyebrow mb-8">Keep reading</p>
              <ul className="grid md:grid-cols-2 gap-8">
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group block">
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "0.7rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--rich-warm)",
                        }}
                      >
                        {categoryLabel(p.category)}
                      </span>
                      <span
                        className="block mt-2 group-hover:text-[var(--rich-warm)]"
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                          color: "var(--ink-primary)",
                          lineHeight: 1.25,
                          transition: "color 0.2s",
                        }}
                      >
                        {p.title}
                      </span>
                      <span
                        className="block mt-2 text-sm"
                        style={{ color: "var(--ink-muted)", lineHeight: 1.6 }}
                      >
                        {p.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}
