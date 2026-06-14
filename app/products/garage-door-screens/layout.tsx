import type { Metadata } from "next";

const title =
  "Motorized Garage Door Screens in Southwest Florida | SJB Outdoors";
const description =
  "Full-height motorized garage screens custom-fit to single, double & oversized bays — roll up into a discreet header housing. Insect, solar & privacy mesh on Progressive MagnaTrack and SunPro systems. Free in-home consultations across Naples, Bonita Springs & Marco Island.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products/garage-door-screens" },
  openGraph: {
    title,
    description,
    url: "/products/garage-door-screens",
    type: "website",
    images: [{ url: "/img/products/garage-screen.png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Motorized Garage Door Screens",
  description,
  category: "Retractable Exterior Screens",
  brand: { "@type": "Brand", name: "Progressive Screens · SunPro" },
  image: "https://sjboutdoors.com/img/products/garage-screen.png",
  areaServed: "Southwest Florida",
  manufacturer: { "@type": "Organization", name: "SJB Outdoors" },
};

export default function GarageDoorScreensLayout({
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
