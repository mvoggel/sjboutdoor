import { z } from "zod";

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
  products: z.array(z.string()).optional(),
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
  // Honeypot — must be empty (bots fill it)
  website: z.string().max(0).optional(),
});

export type ConsultFormData = z.infer<typeof consultSchema>;
