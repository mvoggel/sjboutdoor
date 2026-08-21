import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "hurricane-shutters",
  title: "Hurricane Shutters in Florida",
  name: "Hurricane Shutters",
  description:
    "Florida building-code-rated hurricane shutters — accordion, roll-up, and panel styles — that deploy in minutes and may qualify for insurance discounts. Manual or motorized. Free in-home consultations.",
  image: "/img/products/stormshutters.jpg",
  category: "Hurricane Shutters",
  breadcrumbName: "Hurricane Shutters",
};

export const metadata: Metadata = productMetadata(seo);

export default function HurricaneShuttersLayout({
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
