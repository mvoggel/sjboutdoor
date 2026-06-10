"use client";

import dynamic from "next/dynamic";

// Client-only so the studio's image preloading / blend compositing runs in the
// browser; also keeps the route out of the SSR pass for the static export.
const AwningStudio = dynamic(() => import("./AwningStudio"), {
  ssr: false,
  loading: () => <div style={loading}>Loading builder…</div>,
});

export default function AwningBuilderPage() {
  return (
    <main style={shell}>
      <AwningStudio />
    </main>
  );
}

const shell: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
};

const loading: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  background: "#0e0f12",
  color: "#9b968c",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
};
