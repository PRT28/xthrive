import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  source?: unknown;
  page?: unknown;
};

const MAX_FIELD_LENGTH = 1000;

const cleanField = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, MAX_FIELD_LENGTH);
};

export async function POST(request: NextRequest) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const lead = {
    name: cleanField(payload.name),
    phone: cleanField(payload.phone),
    interest: cleanField(payload.interest),
    message: cleanField(payload.message),
    source: cleanField(payload.source) || "website",
    page: cleanField(payload.page),
    submittedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.phone || !lead.interest) {
    return NextResponse.json({ error: "Name, phone, and interest are required." }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: "Google Sheets webhook is not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Google Sheets rejected the lead submission." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save lead to Google Sheets." }, { status: 502 });
  }
}
