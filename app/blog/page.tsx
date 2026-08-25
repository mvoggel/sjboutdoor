import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts, getActiveCategories, categoryLabel } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notebook: Outdoor Living Guides & Notes",
  description:
    "Buying guides, install field notes, maintenance tips, and company news from the SJB Outdoor Living crew. Outdoor living for Florida homes.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "SJB Outdoor Living Field Notebook",
    description:
      "Buying guides, install field notes, and company news, written by the people doing the work.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getActiveCategories();

  const cards = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    categoryLabel: categoryLabel(p.category),
    author: p.author,
    date: p.date,
    readTime: p.readTime,
  }));

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: "var(--bg-pure)", minHeight: "80vh" }}>
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="pt-32 pb-12 md:pb-16 relative overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
              <div>
                <p
                  className="text-eyebrow mb-3"
                  style={{ color: "var(--rich-deep)", fontWeight: 700 }}
                >
                  Field Notebook
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(2rem, 5.5vw, 4rem)",
                    fontWeight: 500,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.05,
                    maxWidth: "18ch",
                  }}
                >
                  Notes from the truck, the workshop, and the lanai.
                </h1>
                <p
                  className="mt-5 text-base"
                  style={{ color: "var(--ink-muted)", maxWidth: "52ch", lineHeight: 1.7 }}
                >
                  Buying guides, install field notes, and small lessons we&apos;ve
                  learned the hard way, written by the people doing the work.
                </p>
              </div>

              {/* Hero image */}
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/products/blog-hero.png"
                  alt="Open field notebook and pen on a table overlooking a covered Florida lanai at sunset."
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 2",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "8px",
                    border: "1px solid var(--rich-sand)",
                    boxShadow: "0 18px 40px -24px rgba(14, 26, 31, 0.45)",
                  }}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* ── Posts ───────────────────────────────────────── */}
        <section className="pb-24 md:pb-32 pt-4">
          <Container>
            <BlogList posts={cards} categories={categories} />
          </Container>
        </section>

        <CtaBand inverted />
      </main>
      <Footer />
    </>
  );
}
