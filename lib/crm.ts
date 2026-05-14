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
  const productTags = (data.products ?? []).map((p) => `product-${p}`);

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    postalCode: data.zip,
    source: "sjbb-outdoors-website",
    tags: ["sjbb-outdoors", "web-lead", ...productTags],
    customFields: [
      { id: "preferred_contact", value: data.preferredContact },
      { id: "message", value: data.message ?? "" },
    ],
  };
}
