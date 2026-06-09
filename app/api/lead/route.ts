import { NextRequest, NextResponse } from "next/server";
import { consultSchema } from "@/lib/validators";
import { buildGhlPayload } from "@/lib/crm";

// v2 upsert endpoint — creates a contact, or updates the existing one if the
// email/phone already exists in the location. Avoids duplicate-contact errors
// on repeat submissions.
const GHL_UPSERT_URL =
  "https://services.leadconnectorhq.com/contacts/upsert";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Time-to-submit spam check (field injected by client)
    const submitTime = Number(body._submitTime ?? 0);
    if (submitTime && Date.now() - submitTime < 2000) {
      return NextResponse.json({ error: "Submission too fast" }, { status: 400 });
    }

    // Honeypot check (field renamed from `website` to dodge Chrome autofill)
    if (body.hp_field) {
      return NextResponse.json({ ok: true }); // silently succeed
    }

    const parsed = consultSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 422 }
      );
    }

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    // Dev fallback: log + succeed so the UI flow is testable without creds
    if (!apiKey || !locationId) {
      console.log(
        "[lead/route] GHL credentials missing — logging payload only:",
        parsed.data
      );
      return NextResponse.json({ ok: true, stub: true });
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
      console.error("[lead/route] GHL error:", ghlRes.status, text);
      // Don't block the user — they've given us their info, so let the UI
      // proceed to the calendar step. The lead is logged for manual follow-up.
      return NextResponse.json({ ok: true, crmFailed: true });
    }

    const json = (await ghlRes.json().catch(() => ({}))) as {
      contact?: { id?: string };
    };

    return NextResponse.json({
      ok: true,
      contactId: json.contact?.id ?? null,
    });
  } catch (err) {
    console.error("[lead/route] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
