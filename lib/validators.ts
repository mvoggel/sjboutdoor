import { z } from "zod";

/**
 * Single-select product interest. This field routes the lead to a specific
 * calendar in GHL/Google (each salesperson covers a different product), so
 * it must be required and one-of-four.
 */
export const PRODUCT_SLUGS = [
  "exterior-shades",
  "exterior-shutters",
  "retractable-awnings",
  "louvered-pergolas",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const consultSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Please enter a valid US phone number"
    ),
  zip: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),
  productInterest: z.enum(PRODUCT_SLUGS, {
    message: "Please choose a product so we can route you to the right specialist",
  }),
  preferredContact: z.enum(["phone", "email", "text"], {
    message: "Please select a preferred contact method",
  }),
  message: z
    .string()
    .max(500, "Message must be 500 characters or less")
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must consent to continue"),
  // Honeypot — must be empty (bots fill any input). Named `hp_field` rather
  // than `website` so browser autofill (Chrome's "Website" profile field)
  // can't accidentally populate it on real users.
  hp_field: z.string().max(0).optional(),
});

export type ConsultFormData = z.infer<typeof consultSchema>;
