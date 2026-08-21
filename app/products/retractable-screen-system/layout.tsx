import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "retractable-screen-system",
  title: "Retractable Screen Doors & Systems in Florida",
  name: "Retractable Screen Systems",
  description:
    "Mirage retractable screen doors, large-opening screens, and motorized screens for entry, sliding, French, bi-fold, and garage openings — spans to 28 ft. Retained-mesh options for pets and kids. Limited lifetime warranty. Free in-home consultations across Florida.",
  image: "/img/products/ext-shades.png",
  category: "Retractable Screen Doors",
  brand: "Mirage Screen Systems",
  breadcrumbName: "Retractable Screen Systems",
  service: {
    name: "Retractable Screen Door Installation Florida",
    serviceType: "Retractable Screen Door Installation",
    description:
      "SJB Outdoor Living installs Mirage retractable screen systems throughout Florida — retractable screen doors for entry, sliding, and French openings; large-opening retractable screens for bi-fold and multi-panel doors up to 28 feet; and motorized screens for garages, lanais, and patios up to 25 feet wide. Custom-fit to the opening, hidden in a slim housing when not in use, and covered by Mirage's limited lifetime warranty on components. FL-licensed installers. Free in-home consultation.",
    brand: "Mirage Screen Systems",
    cities: [
      "Gainesville, FL",
      "Jacksonville, FL",
      "Tallahassee, FL",
      "Pensacola, FL",
      "Destin, FL",
      "Ocala, FL",
      "Daytona, FL",
      "St Augustine, FL",
    ],
  },
};

export const metadata: Metadata = productMetadata(seo);

export default function RetractableScreenSystemLayout({
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
