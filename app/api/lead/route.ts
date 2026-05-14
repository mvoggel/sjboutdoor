import { NextRequest, NextResponse } from "next/server";
import { consultSchema } from "@/lib/validators";
import { buildGhlPayload } from "@/lib/crm";

const GHL_API_URL =
  "https://services.leadconnectorhq.com/contacts/";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Time-to-submit spam check (field injected by client)
    const submitTime = Number(body._submitTime ?? 0);
    if (submitTime && Date.now() - submitTime < 2000) {
      return NextResponse.json({ error: "Submission too fast" }, { status: 400 });
    }

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ ok: true }); // silently succeed
    }

    const parsed = consultSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 422 }
      );
    }

    const payload = buildGhlPayload(parsed.data);

    // TODO: wire to GHL once keys arrive
    if (!process.env.GHL_API_KEY) {
      console.log("[lead/route] GHL_API_KEY not set — logging payload:", payload);
      return NextResponse.json({ ok: true, stub: true });
    }

    const ghlRes = await fetch(GHL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify(payload),
    });

    if (!ghlRes.ok) {
      const text = await ghlRes.text();
      console.error("[lead/route] GHL error:", ghlRes.status, text);
      return NextResponse.json(
        { error: "CRM submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead/route] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
