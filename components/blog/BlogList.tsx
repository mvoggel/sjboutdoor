"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  author: string;
  date: string;
  readTime: string;
}

interface Props {
  posts: PostCard[];
  categories: { slug: string; label: string; count: number }[];
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogList({ posts, categories }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState<string>("all");

  const visible = active === "all" ? posts : posts.filter((p) => p.category === active);

  const chip = (slug: string, label: string, count?: number) => {
    const on = active === slug;
    return (
      <button
        key={slug}
        onClick={() => setActive(slug)}
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "0.72rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          border: "1px solid",
          borderColor: on ? "var(--rich-warm)" : "var(--rich-sand)",
          background: on ? "var(--rich-warm)" : "transparent",
          color: on ? "var(--bg-pure)" : "var(--ink-muted)",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
      >
        {label}
        {typeof count === "number" && (
          <span style={{ opacity: 0.6, marginLeft: "0.4rem" }}>{count}</span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* ── Category filter ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {chip("all", "All", posts.length)}
        {categories.map((c) => chip(c.slug, c.label, c.count))}
      </div>

      {/* ── Post list ───────────────────────────────────── */}
      <ul>
        {visible.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderBottom: "1px solid var(--rich-sand)" }}
          >
            <Link
              href={`/blog/${p.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[1fr_5rem] gap-2 md:gap-8 items-baseline py-7 md:py-8"
            >
              <span>
                {/* Category tag: sits with the title rather than in its own column */}
                <span
                  className="inline-block mb-2.5"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "0.66rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--rich-deep)",
                    background: "rgba(11, 61, 46, 0.07)",
                    border: "1px solid rgba(11, 61, 46, 0.14)",
                    borderRadius: "999px",
                    padding: "0.28rem 0.7rem",
                    lineHeight: 1.2,
                  }}
                >
                  {p.categoryLabel}
                </span>
                <span
                  className="block group-hover:text-[var(--rich-warm)] group-hover:underline underline-offset-[6px] decoration-1"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
                    color: "var(--ink-primary)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.25,
                    transition: "color 0.2s",
                  }}
                >
                  {p.title}
                </span>
                <span
                  className="block mt-2 text-sm"
                  style={{ color: "var(--ink-muted)", lineHeight: 1.6, maxWidth: "60ch" }}
                >
                  {p.excerpt}
                </span>
                <span
                  className="block mt-2"
                  style={{ fontSize: "0.72rem", color: "var(--ink-muted)", opacity: 0.8 }}
                >
                  {p.author} · {formatDate(p.date)}
                </span>
              </span>
              <span
                className="hidden md:block text-right"
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                {p.readTime}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p
          className="py-16 text-center"
          style={{
            color: "var(--ink-muted)",
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
          }}
        >
          No posts in this category yet. Check back soon.
        </p>
      )}
    </>
  );
}
