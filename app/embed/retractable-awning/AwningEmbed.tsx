"use client";

import dynamic from "next/dynamic";

// Reuse the same studio as the experiments demo.
const AwningStudio = dynamic(
  () => import("../../experiments/retractable-awning/AwningStudio"),
  {
    ssr: false,
    loading: () => <div style={loading}>Loading builder…</div>,
  },
);

export default function AwningEmbed() {
  return (
    <main style={shell}>
      <AwningStudio />
    </main>
  );
}

const shell: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
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
