import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "bahama-shutters",
  title: "Bahama Shutters in Florida",
  name: "Bahama Shutters",
  description:
    "Top-hinged Bahama shutters that deliver passive sun control, year-round privacy, and hurricane-season readiness with classic coastal character. Salt-air finishes built for Florida. Free in-home consultations.",
  image: "/img/products/bahamashutters.jpg",
  category: "Bahama Shutters",
  breadcrumbName: "Bahama Shutters",
};

export const metadata: Metadata = productMetadata(seo);

export default function BahamaShuttersLayout({
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
