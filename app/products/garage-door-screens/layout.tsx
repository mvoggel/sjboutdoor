import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "garage-door-screens",
  title: "Motorized Garage Door Screens in Southwest Florida",
  name: "Motorized Garage Door Screens",
  description:
    "Full-height motorized garage screens custom-fit to single, double & oversized bays — roll up into a discreet header housing. Insect, solar & privacy mesh on Progressive MagnaTrack and SunPro systems. Free in-home consultations across Naples, Bonita Springs & Marco Island.",
  image: "/img/products/garage-screen.png",
  category: "Retractable Exterior Screens",
  brand: "Progressive Screens · SunPro",
  breadcrumbName: "Garage Door Screens",
};

export const metadata: Metadata = productMetadata(seo);

export default function GarageDoorScreensLayout({
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
