import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { getInboxAddresses, isEmailDeliveryConfigured, renderFields, sendEmail } from "@/lib/email";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { contact } from "@/content/company";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request, "contact"))) {
    return NextResponse.json(
      { message: "Too many messages from your connection. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

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
  if (!isEmailDeliveryConfigured() && !webhookUrl) {
    console.error("Contact message received but no delivery is configured (RESEND_API_KEY + FORMS_INBOX_EMAIL, or CONTACT_WEBHOOK_URL).");
    return NextResponse.json(
      {
        message: `The contact form is temporarily unavailable, so nothing was sent. Please reach us directly at ${contact.email} or ${contact.phone}.`,
      },
      { status: 503 }
    );
  }

  const data = parsed.data;
  try {
    if (isEmailDeliveryConfigured()) {
      const { text, html } = renderFields(
        `New website message from ${data.name}`,
        [
          ["Name", data.name],
          ["Email", data.email],
          ["Organization", data.organization],
          ["Message", data.message],
        ],
        "Reply to this email to respond directly."
      );
      await sendEmail({
        to: getInboxAddresses(),
        subject: `Website message: ${data.name}${data.organization ? ` (${data.organization})` : ""}`,
        text,
        html,
        replyTo: data.email,
      });
    }

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(data),
      });
      if (!webhookResponse.ok) throw new Error(`Contact webhook responded ${webhookResponse.status}`);
    }
  } catch (error) {
    console.error("Contact delivery failed", error);
    return NextResponse.json({ message: "The message could not be delivered. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
