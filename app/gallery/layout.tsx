import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation Gallery",
  description:
    "Browse real SJB Outdoor Living installations across Florida — louvered pergolas, retractable awnings, exterior shades, screens, and shutters on coastal and inland homes.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Installation Gallery — SJB Outdoor Living",
    description:
      "Real outdoor living installations across Florida — pergolas, awnings, shades, screens, and shutters.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
