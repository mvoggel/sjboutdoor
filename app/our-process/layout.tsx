import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From consultation and design to measurement, custom fabrication, and professional installation — how SJB Outdoor Living brings your outdoor living project to life, backed by a lifetime warranty.",
  alternates: { canonical: "/our-process" },
  openGraph: {
    title: "Our Process — SJB Outdoor Living",
    description:
      "Consultation, measurement, custom fabrication, and install by FL-licensed crews — start to finish.",
    url: "/our-process",
    type: "website",
  },
};

export default function OurProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
