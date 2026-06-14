import type { Metadata } from "next";
import { JsonLd, faqPage } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";
import { AWNING_FAQS } from "@/components/products/awning-faqs";

const seo: ProductSeo = {
  slug: "retractable-awnings",
  title: "Retractable Awnings in Florida",
  name: "Motorized Retractable Awnings",
  description:
    "Custom motorized retractable awnings with built-in LED lighting, EZ-Pitch adjustment, and integrated cassette housing. Sunbrella® fabric, 10-year warranty, free in-home consultations across Florida.",
  image: "/img/products/awnings.png",
  category: "Retractable Awnings",
  breadcrumbName: "Retractable Awnings",
};

export const metadata: Metadata = productMetadata(seo);

export default function RetractableAwningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[...productJsonLd(seo), faqPage(AWNING_FAQS)]} />
      {children}
    </>
  );
}
