"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  consultSchema,
  type ConsultFormData,
  type ProductSlug,
} from "@/lib/validators";
import { Button } from "./Button";
import { GhlBookingFrame } from "./GhlBookingFrame";
import { EMAIL } from "@/lib/site";

const PRODUCTS: { value: ProductSlug; label: string }[] = [
  { value: "exterior-shades",     label: "Exterior Shades" },
  { value: "exterior-shutters",   label: "Exterior Shutters" },
  { value: "retractable-awnings", label: "Retractable Awnings" },
  { value: "louvered-pergolas",   label: "Louvered Pergolas" },
];

interface ConsultFormProps {
  onSuccess?: () => void;
  /** Slug of the product to preselect (driven by hero CTA / product-page nav). */
  preselectedProduct?: ProductSlug;
}

export function ConsultForm({
  onSuccess: _onSuccess,
  preselectedProduct,
}: ConsultFormProps) {
  const [bookedData, setBookedData] = useState<ConsultFormData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const startTimeRef = useRef(Date.now());

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultFormData>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      productInterest: preselectedProduct,
      preferredContact: "phone",
      consent: false,
    },
  });

  const selectedProduct = watch("productInterest");

  async function onSubmit(data: ConsultFormData) {
    setServerError(null);
    try {
      const payload = {
        ...data,
        _submitTime: startTimeRef.current,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Submission failed");
      }

      // Hand off to step 2 (GHL calendar) even if the CRM call failed —
      // their info is logged server-side and the booking widget will
      // create the contact itself on completion. Don't punish the user
      // for our infra hiccup.
      setBookedData(data);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (bookedData) {
    const productLabel = PRODUCTS.find(
      (p) => p.value === bookedData.productInterest
    )?.label;
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-h3" style={{ color: "var(--ink-primary)" }}>
            Pick a time that works.
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--ink-muted)" }}
          >
            You&apos;re booking with our{" "}
            <strong style={{ color: "var(--ink-primary)" }}>{productLabel}</strong>{" "}
            specialist. Your details are pre-filled — just choose a slot.
          </p>
        </div>
        <GhlBookingFrame
          product={bookedData.productInterest}
          prefill={{
            firstName: bookedData.firstName,
            lastName: bookedData.lastName,
            email: bookedData.email,
            phone: bookedData.phone,
          }}
        />
        <p
          className="text-xs text-center"
          style={{ color: "var(--ink-muted)" }}
        >
          Trouble loading the calendar?{" "}
          <a
            href="tel:+18888888888"
            className="underline"
            style={{ color: "var(--rich-deep)" }}
          >
            Give us a call
          </a>{" "}
          and we&apos;ll book you in.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      {/* Honeypot — hidden from real users. No aria-hidden (causes a
          focus-warning when autofillers do reach it); tabIndex={-1} keeps
          keyboard users out. The off-screen positioning + obscure name is
          what stops both bots and Chrome's "Website" autofill. */}
      <input
        type="text"
        {...register("hp_field")}
        tabIndex={-1}
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        autoComplete="off"
      />

      {/* Product interest — first, because it routes the calendar */}
      <fieldset>
        <legend
          className="text-sm font-medium mb-2"
          style={{ color: "var(--ink-primary)" }}
        >
          Product interest{" "}
          <span style={{ color: "var(--rich-warm)" }} aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {PRODUCTS.map((p) => {
            const checked = selectedProduct === p.value;
            return (
              <label
                key={p.value}
                className="flex items-center gap-2 cursor-pointer text-sm px-3 py-2 border transition-colors"
                style={{
                  borderColor: checked ? "var(--rich-warm)" : "var(--rich-sand)",
                  background: checked ? "rgba(184,146,74,0.08)" : "transparent",
                  color: checked ? "var(--ink-primary)" : "var(--ink-muted)",
                  borderRadius: "8px",
                }}
              >
                <input
                  type="radio"
                  value={p.value}
                  {...register("productInterest")}
                  className="accent-[var(--rich-deep)]"
                />
                {p.label}
              </label>
            );
          })}
        </div>
        {errors.productInterest && (
          <p className="mt-1 text-xs text-red-600">
            {errors.productInterest.message}
          </p>
        )}
        <p
          className="mt-2 text-xs"
          style={{ color: "var(--ink-muted)", fontStyle: "italic" }}
        >
          Routes you to the specialist who installs this product day-in, day-out.
        </p>
      </fieldset>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" error={errors.firstName?.message} required>
          <input
            {...register("firstName")}
            type="text"
            autoComplete="given-name"
            className={inputCls(!!errors.firstName)}
          />
        </Field>
        <Field label="Last name" error={errors.lastName?.message} required>
          <input
            {...register("lastName")}
            type="text"
            autoComplete="family-name"
            className={inputCls(!!errors.lastName)}
          />
        </Field>
      </div>

      {/* Email */}
      <Field label="Email" error={errors.email?.message} required>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className={inputCls(!!errors.email)}
        />
      </Field>

      {/* Phone */}
      <Field label="Phone" error={errors.phone?.message} required>
        <input
          {...register("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="(555) 555-5555"
          className={inputCls(!!errors.phone)}
        />
      </Field>

      {/* ZIP */}
      <Field label="ZIP code" error={errors.zip?.message} required>
        <input
          {...register("zip")}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          className={inputCls(!!errors.zip)}
        />
      </Field>

      {/* Preferred contact */}
      <fieldset>
        <legend className="text-sm font-medium mb-2" style={{ color: "var(--ink-primary)" }}>
          Preferred contact <span style={{ color: "var(--rich-warm)" }}>*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {(["phone", "email", "text"] as const).map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 cursor-pointer text-sm capitalize"
              style={{ color: "var(--ink-muted)" }}
            >
              <input
                type="radio"
                value={method}
                {...register("preferredContact")}
                className="accent-[var(--rich-deep)]"
              />
              {method}
            </label>
          ))}
        </div>
        {errors.preferredContact && (
          <p className="mt-1 text-xs text-red-600">{errors.preferredContact.message}</p>
        )}
      </fieldset>

      {/* Message */}
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Anything else we should know? (optional)"
          className={inputCls(!!errors.message) + " resize-none"}
        />
      </Field>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 accent-[var(--rich-deep)] flex-shrink-0"
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span className="text-xs leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            By checking this box, you consent to receive SMS messages and calls
            from SJB Outdoor Living at the phone number provided. Message and data
            rates may apply. Reply STOP to opt out.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1 text-xs text-red-600">
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="rounded-lg p-3 bg-red-50 text-sm text-red-700">
          {serverError}{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="underline font-medium"
          >
            Email us directly
          </a>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Schedule a time"}
      </Button>
    </form>
  );
}

/* ─── Field wrapper ─────────────────────────────────────────────────── */
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{ color: "var(--ink-primary)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--rich-warm)" }} aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      <div id={id}>{children}</div>
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg px-4 py-2.5 text-sm",
    "border transition-colors",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-[var(--rich-sand)] focus:ring-[var(--rich-deep)] focus:border-[var(--rich-deep)]",
  ].join(" ");
}
