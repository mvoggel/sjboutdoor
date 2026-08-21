import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "patio-screens",
  title: "Retractable Lanai & Patio Screens in Florida",
  name: "Retractable Motorized Lanai & Patio Screens",
  description:
    "Motorized retractable lanai screens that enclose a lanai, covered porch, or patio at the touch of a button — spans up to 30 ft with no center post. Insect, solar, privacy & hurricane mesh on Progressive MagnaTrack and SunPro systems. Free in-home consultations across North Florida, the Nature Coast & the Panhandle.",
  image: "/img/products/patioscreen.jpg",
  category: "Retractable Exterior Screens",
  brand: "Progressive Screens · SunPro",
  breadcrumbName: "Patio Screens",
  service: {
    name: "Lanai Screen Installation Florida",
    serviceType: "Lanai & Patio Screen Installation",
    description:
      "SJB Outdoor Living installs motorized retractable lanai screens across Florida — enclosing lanais, screened porches, covered patios, pool cages, and outdoor kitchens. Screens span up to 30 feet with no center post, retract fully into a slim header housing, and are available in insect, solar, privacy, and hurricane-rated mesh on Progressive MagnaTrack and SunPro systems. FL-licensed installers. Free in-home consultation.",
    brand: "Progressive Screens · SunPro",
    cities: [
      "Gainesville, FL",
      "Jacksonville, FL",
      "Tallahassee, FL",
      "Pensacola, FL",
      "Destin, FL",
      "Panama City, FL",
      "Ocala, FL",
      "Daytona, FL",
      "St Augustine, FL",
    ],
  },
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
