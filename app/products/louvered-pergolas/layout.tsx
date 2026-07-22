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
  service: {
    name: "Motorized Louvered Pergola Installation Florida",
    serviceType: "Louvered Pergola Installation",
    description:
      "SJB Outdoor Living installs motorized louvered pergolas throughout Florida. As an authorized Azenco dealer, we install aerospace-grade aluminum pergola systems with adjustable motorized louvers, 190 mph wind rating, 25-year structural warranty, and PE-stamped engineering drawings. Custom-fabricated for your space. FL-licensed installers. Free in-home consultation.",
    brand: "Azenco",
    cities: [
      "Gainesville, FL",
      "Jacksonville, FL",
      "Tallahassee, FL",
      "Pensacola, FL",
      "Destin, FL",
      "Panama City, FL",
      "Ocala, FL",
      "Palm Beach, FL",
      "Naples, FL",
    ],
    offer: "Free in-home consultation. Custom pricing based on project scope.",
  },
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
