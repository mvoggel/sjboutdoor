import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "louvered-pergolas",
  title: "Louvered Pergolas in Florida",
  name: "Louvered Pergolas",
  description:
    "Custom aluminum louvered pergolas with adjustable, rotating roof louvers for on-demand sun, shade, and rain protection. Engineered for Florida sun, wind, and salt air. Free in-home consultations.",
  image: "/img/products/pergolas.jpg",
  category: "Louvered Pergolas",
  breadcrumbName: "Louvered Pergolas",
};

export const metadata: Metadata = productMetadata(seo);

export default function LouveredPergolasLayout({
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
