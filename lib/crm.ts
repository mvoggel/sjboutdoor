import type { ConsultFormData } from "./validators";

export interface GhlContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  source: string;
  tags: string[];
  customFields: Array<{ id: string; value: string }>;
}

export function buildGhlPayload(data: ConsultFormData): GhlContactPayload {
  // productInterest drives the per-product calendar routing in GHL.
  const productTag = `product-${data.productInterest}`;

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    postalCode: data.zip,
    source: "sjbb-outdoors-website",
    tags: ["sjbb-outdoors", "web-lead", productTag],
    customFields: [
      { id: "product_interest", value: data.productInterest },
      { id: "preferred_contact", value: data.preferredContact },
      { id: "message", value: data.message ?? "" },
    ],
  };
}
