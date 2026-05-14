"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultSchema, type ConsultFormData } from "@/lib/validators";
import { Button } from "./Button";
import { CheckCircle } from "lucide-react";

const PRODUCTS = [
  { value: "exterior-shades", label: "Exterior Shades & Shutters" },
  { value: "retractable-awnings", label: "Retractable Awnings" },
  { value: "louvered-pergolas", label: "Louvered Pergolas" },
];

interface ConsultFormProps {
  onSuccess?: () => void;
  preselectedProducts?: string[];
}

export function ConsultForm({ onSuccess: _onSuccess, preselectedProducts = [] }: ConsultFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const startTimeRef = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsultFormData>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      products: preselectedProducts,
      preferredContact: "phone",
      consent: false,
    },
  });

  async function onSubmit(data: ConsultFormData) {
    setServerError(null);
    try {
      const payload = {
        ...data,
        _submitTime: startTimeRef.current,
      };

      // TODO: wire to /api/lead once GHL keys arrive
      console.log("[ConsultForm] Submission payload:", payload);

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle
          size={48}
          style={{ color: "var(--rich-deep)" }}
          strokeWidth={1.5}
        />
        <h3 className="text-h3" style={{ color: "var(--ink-primary)" }}>
          We&apos;ll be in touch.
        </h3>
        <p style={{ color: "var(--ink-muted)" }}>
          Expect a call from our team within one business day to confirm your
          free in-home consultation.
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
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        {...register("website")}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        autoComplete="off"
      />

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

      {/* Product interest */}
      <fieldset>
        <legend className="text-sm font-medium mb-2" style={{ color: "var(--ink-primary)" }}>
          Product interest <span style={{ color: "var(--ink-muted)" }}>(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {PRODUCTS.map((p) => (
            <label
              key={p.value}
              className="flex items-center gap-2 cursor-pointer text-sm px-3 py-1.5 rounded-full border transition-colors"
              style={{ borderColor: "var(--rich-sand)", color: "var(--ink-muted)" }}
            >
              <input
                type="checkbox"
                value={p.value}
                {...register("products")}
                className="accent-[var(--rich-deep)]"
              />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

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
            from SJBB Outdoors at the phone number provided. Message and data
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
            href="mailto:info@sjbboutdoors.com"
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
        {isSubmitting ? "Sending…" : "Request My Consultation"}
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
