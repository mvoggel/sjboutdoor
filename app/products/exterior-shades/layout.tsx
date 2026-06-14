import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "exterior-shades",
  title: "Motorized Exterior Shades in Florida",
  name: "Motorized Exterior Shades",
  description:
    "Custom-fabricated motorized exterior solar shades that block up to 95% of UV and heat before it reaches the glass. Smart-home ready with wind and sun sensors. Free in-home consultations across Florida.",
  image: "/img/products/ext-shades.png",
  category: "Exterior Solar Shades",
  breadcrumbName: "Exterior Shades",
};

export const metadata: Metadata = productMetadata(seo);

export default function ExteriorShadesLayout({
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
