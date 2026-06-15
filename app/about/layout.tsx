import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Thirty years of custom window treatments and outdoor living, now serving Florida homeowners. Family-run, design-led, and installed by our own crews.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SJB Outdoor Living",
    description:
      "Thirty years of detail, now on a sunnier coast — family-run outdoor living for Florida homes.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
