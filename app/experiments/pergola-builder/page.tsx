"use client";

import dynamic from "next/dynamic";

// R3F's Canvas can't server-render — load the whole studio client-only.
// This also keeps the heavy three.js bundle out of the initial payload.
const PergolaStudio = dynamic(() => import("./PergolaStudio"), {
  ssr: false,
  loading: () => (
    <div style={loading}>Loading builder…</div>
  ),
});

export default function PergolaBuilderPage() {
  return (
    <main style={shell}>
      <PergolaStudio />
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
