import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/home/CtaBand";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts, getActiveCategories, categoryLabel } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notebook — Outdoor Living Guides & Notes",
  description:
    "Buying guides, install field notes, maintenance tips, and company news from the SJB Outdoor Living crew — outdoor living for Florida homes.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "SJB Outdoor Living — Field Notebook",
    description:
      "Buying guides, install field notes, and company news — written by the people doing the work.",
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
        <section className="pt-32 md:pt-40 pb-12 md:pb-16 relative overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
              <div>
                <p className="text-eyebrow mb-4">Field Notebook</p>
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
                  learned the hard way — written by the people doing the work.
                </p>
              </div>

              {/* Count — signature touch */}
              <div className="hidden lg:flex items-end justify-end">
                <div className="text-right">
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--rich-warm)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    In the notebook
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(2.5rem, 4vw, 4rem)",
                      color: "var(--ink-primary)",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {String(posts.length).padStart(2, "0")}
                    <span style={{ fontSize: "0.4em", color: "var(--ink-muted)" }}>
                      {" "}
                      {posts.length === 1 ? "post" : "posts"}
                    </span>
                  </p>
                </div>
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
