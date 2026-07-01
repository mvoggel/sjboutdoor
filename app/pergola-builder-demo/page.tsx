"use client";

import { useState } from "react";

// basePath-aware (matches next.config.ts) so the live iframe works in dev & prod.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const EMBED_PATH = `${BASE}/embed/pergola-builder`;

const SNIPPET = `<iframe
  src="https://YOUR-SITE.com/embed/pergola-builder"
  width="100%"
  height="680"
  style="border:0;border-radius:14px;max-width:1100px"
  title="Louvered Pergola Builder"
  loading="lazy"
  allowfullscreen
></iframe>`;

export default function PergolaBuilderDemoPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — user can select manually */
    }
  };

  return (
    <main style={s.page}>
      <header style={s.head}>
        <h1 style={s.h1}>Louvered Pergola Builder — Embed Preview</h1>
        <p style={s.sub}>
          This is exactly how the configurator looks dropped into any page via a
          single <code>&lt;iframe&gt;</code>. Chrome-free, self-contained.
        </p>
      </header>

      {/* Live embed */}
      <div style={s.frameWrap}>
        <iframe
          src={EMBED_PATH}
          style={s.iframe}
          title="Louvered Pergola Builder"
          allowFullScreen
        />
      </div>

      {/* Snippet */}
      <section style={s.snippetSection}>
        <div style={s.snippetHead}>
          <span style={s.snippetLabel}>Embed code</span>
          <button style={s.copyBtn} onClick={copy}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <pre style={s.pre}>
          <code>{SNIPPET}</code>
        </pre>
        <p style={s.note}>
          Replace <code>YOUR-SITE.com</code> with your domain. The builder lives
          at <code>/embed/pergola-builder</code>.
        </p>
      </section>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ef",
    color: "#1c1d20",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
    padding: "48px 24px 80px",
    maxWidth: 1180,
    margin: "0 auto",
  },
  head: { marginBottom: 24 },
  h1: { fontSize: 30, fontWeight: 600, margin: "0 0 8px" },
  sub: { fontSize: 15, color: "#5c5b57", margin: 0, maxWidth: 640, lineHeight: 1.5 },
  frameWrap: {
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 18px 50px -18px rgba(0,0,0,0.4)",
    background: "#0e0f12",
  },
  iframe: { width: "100%", height: 680, border: 0, display: "block" },
  snippetSection: { marginTop: 36 },
  snippetHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  snippetLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#8a8884",
  },
  copyBtn: {
    background: "#1c1d20",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    cursor: "pointer",
  },
  pre: {
    margin: 0,
    background: "#16181c",
    color: "#e8e6e1",
    padding: 18,
    borderRadius: 12,
    fontSize: 13,
    lineHeight: 1.5,
    overflowX: "auto",
  },
  note: { fontSize: 13, color: "#5c5b57", marginTop: 12 },
};
