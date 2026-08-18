import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "patio-screens",
  title: "Retractable Patio Screens in Southwest Florida",
  name: "Retractable Motorized Patio Screens",
  description:
    "Motorized retractable patio & lanai screens custom-built to spans up to 30 ft with no center post. Insect, solar, privacy & hurricane mesh on Progressive MagnaTrack and SunPro systems. Free in-home consultations across North Florida, the Nature Coast & the Panhandle.",
  image: "/img/products/patioscreen.jpg",
  category: "Retractable Exterior Screens",
  brand: "Progressive Screens · SunPro",
  breadcrumbName: "Patio Screens",
};

export const metadata: Metadata = productMetadata(seo);

export default function PatioScreensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={productJsonLd(seo)} />
      {children}
    </>
  );
}
