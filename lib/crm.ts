import type { ConsultFormData } from "./validators";

/**
 * Payload shape for GHL v2 `/contacts/upsert`. Upsert (vs. create) prevents
 * duplicate-email errors when a repeat visitor re-submits — GHL matches on
 * email + phone within the location.
 */
export interface GhlUpsertPayload {
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  source: string;
  tags: string[];
  customFields: Array<{ key: string; field_value: string }>;
}

export function buildGhlPayload(
  data: ConsultFormData,
  locationId: string
): GhlUpsertPayload {
  // productInterest drives the per-product calendar routing in GHL.
  const productTag = `product-${data.productInterest}`;

  return {
    locationId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    postalCode: data.zip,
    source: "sjbb-outdoors-website",
    tags: ["sjbb-outdoors", "web-lead", productTag],
    // NOTE: these use field "keys" (the slugified custom-field name in GHL).
    // If you create matching custom fields, GHL will route them automatically.
    // Until those fields exist, GHL silently ignores unknown keys — no error.
    customFields: [
      { key: "product_interest", field_value: data.productInterest },
      { key: "preferred_contact", field_value: data.preferredContact },
      { key: "message", field_value: data.message ?? "" },
    ],
  };
}
