import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { productMetadata, productJsonLd, type ProductSeo } from "@/lib/product-seo";

const seo: ProductSeo = {
  slug: "hurricane-screens",
  title: "Hurricane Screens in Florida",
  name: "Defender Hurricane Screens",
  description:
    "Motorized roll-down hurricane screens that meet Miami-Dade and Florida Building Code — Florida Product Approval FL30798, design pressure to ±200 PSF, spans to 30 ft. Progressive Screens' patented MagnaTrack system. Free in-home consultations.",
  image: "/img/products/shades2.png",
  category: "Hurricane Protection Screens",
  brand: "Progressive Screens",
  breadcrumbName: "Hurricane Screens",
  service: {
    name: "Hurricane Screen Installation Florida",
    serviceType: "Hurricane Screen Installation",
    description:
      "SJB Outdoor Living installs Progressive Screens Defender motorized hurricane screens across Florida. The Defender system meets or exceeds Miami-Dade and Florida Building Code requirements for roll-down hurricane screens, carries Florida Product Approval FL30798, and is rated to design pressures up to ±200 PSF on spans to 30 feet. Year-round protection from storms, insects, sun, and glare on a single screen. FL-licensed installers. Free in-home consultation.",
    brand: "Progressive Screens",
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
    offer: "Free in-home consultation. Permit and engineering handled by our team.",
  },
};

export const metadata: Metadata = productMetadata(seo);

export default function HurricaneScreensLayout({
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
