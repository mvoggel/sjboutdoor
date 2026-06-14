import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "exterior-shutters",
  title: "Exterior Shutters in Florida",
  name: "Exterior Shutters",
  description:
    "Permanently mounted exterior shutters with adjustable louvers for year-round privacy, shade, and coastal character. Salt-air-resistant finishes engineered for Florida homes. Free in-home consultations.",
  image: "/img/products/st-shutter.png",
  category: "Exterior Shutters",
  breadcrumbName: "Exterior Shutters",
};

export const metadata: Metadata = productMetadata(seo);

export default function ExteriorShuttersLayout({
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
