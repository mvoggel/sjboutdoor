// Cloudflare Pages Function — handles POST /api/lead in production.
//
// Next.js `output: export` drops Route Handlers from the static build (they
// "rely on Request", which a static export can't run — see app/api/lead/route.ts,
// kept only for local `next dev` parity). On Cloudflare Pages this Function
// serves that same path at the edge, holding the GoHighLevel token as an
// encrypted env var that never ships to the browser or the repo.
//
// Logic mirrors app/api/lead/route.ts and reuses the same validator + payload
// builder so the two can't drift.
import { consultSchema } from "../../lib/validators";
import { buildGhlPayload } from "../../lib/crm";

interface Env {
  GHL_API_KEY?: string;
  GHL_LOCATION_ID?: string;
}

// v2 upsert — creates a contact, or updates the existing one if the email/phone
// already exists in the location. Avoids duplicate-contact errors on resubmits.
const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Time-to-submit spam check (field injected by the client on mount).
    const submitTime = Number(body._submitTime ?? 0);
    if (submitTime && Date.now() - submitTime < 2000) {
      return json({ error: "Submission too fast" }, 400);
    }

    // Honeypot — bots fill any input; renamed from `website` to dodge autofill.
    if (body.hp_field) {
      return json({ ok: true }); // silently succeed
    }

    const parsed = consultSchema.safeParse(body);
    if (!parsed.success) {
      return json({ error: "Validation failed", issues: parsed.error.issues }, 422);
    }

    const apiKey = env.GHL_API_KEY;
    const locationId = env.GHL_LOCATION_ID;

    // Dev / misconfig fallback: succeed without creds so the UI flow still works
    // (the booking widget creates the contact itself on completion).
    if (!apiKey || !locationId) {
      console.log("[functions/lead] GHL credentials missing — payload only:", parsed.data);
      return json({ ok: true, stub: true });
    }

    const payload = buildGhlPayload(parsed.data, locationId);

    const ghlRes = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify(payload),
    });

    if (!ghlRes.ok) {
      const text = await ghlRes.text();
      console.error("[functions/lead] GHL error:", ghlRes.status, text);
      // Don't block the user — they've handed over their info, so let the UI
      // proceed to the calendar step. Logged for manual follow-up.
      return json({ ok: true, crmFailed: true });
    }

    const result = (await ghlRes.json().catch(() => ({}))) as {
      contact?: { id?: string };
    };

    return json({ ok: true, contactId: result.contact?.id ?? null });
  } catch (err) {
    console.error("[functions/lead] Unexpected error:", err);
    return json({ error: "Internal error" }, 500);
  }
};
