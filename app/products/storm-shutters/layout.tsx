import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "storm-shutters",
  title: "Hurricane & Storm Shutters in Florida",
  name: "Storm Shutters",
  description:
    "Florida building-code-rated storm shutters — accordion, roll-up, and panel styles — that deploy in minutes and may qualify for insurance discounts. Manual or motorized. Free in-home consultations.",
  image: "/img/products/stormshutters.jpg",
  category: "Hurricane Storm Shutters",
  breadcrumbName: "Storm Shutters",
};

export const metadata: Metadata = productMetadata(seo);

export default function StormShuttersLayout({
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
