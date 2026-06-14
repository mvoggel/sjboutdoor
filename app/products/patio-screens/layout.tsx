import type { Metadata } from "next";

const title =
  "Retractable Patio Screens in Southwest Florida | SJB Outdoors";
const description =
  "Motorized retractable patio & lanai screens custom-built to spans up to 30 ft with no center post. Insect, solar, privacy & hurricane mesh on Progressive MagnaTrack and SunPro systems. Free in-home consultations across Naples, Bonita Springs & Marco Island.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products/patio-screens" },
  openGraph: {
    title,
    description,
    url: "/products/patio-screens",
    type: "website",
    images: [{ url: "/img/products/patioscreen.jpg" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Retractable Motorized Patio Screens",
  description,
  category: "Retractable Exterior Screens",
  brand: { "@type": "Brand", name: "Progressive Screens · SunPro" },
  image: "https://sjboutdoors.com/img/products/patioscreen.jpg",
  areaServed: "Southwest Florida",
  manufacturer: { "@type": "Organization", name: "SJB Outdoors" },
};

export default function PatioScreensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
