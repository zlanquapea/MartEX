import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Could not read the submitted form data." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Some required fields are missing or invalid.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    // Honeypot tripped — respond as if successful without processing further.
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        message:
          "Contact submissions aren't connected to a delivery provider yet, so nothing was sent. Set CONTACT_WEBHOOK_URL to enable this form — see README.md.",
      },
      { status: 503 }
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(parsed.data),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ message: "The message could not be delivered. Please try again shortly." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ message: "The message could not be delivered. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
