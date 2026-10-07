import { NextResponse } from "next/server";
import { bookingSubmissionSchema } from "@/lib/validations";
import { canEmailVisitors, getInboxAddresses, isEmailDeliveryConfigured, renderFields, sendEmail } from "@/lib/email";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { company, contact } from "@/content/company";

export const runtime = "nodejs";

/** Keeps booking emails (and their attachment) a reasonable size; mirrored in the booking form. */
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt"];

function generateReference() {
  return `MX-${Date.now().toString(36).toUpperCase()}`;
}

const UNDELIVERABLE = "The consultation request could not be delivered. Please try again shortly.";

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request, "booking"))) {
    return NextResponse.json(
      { message: "Too many requests from your connection. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Could not read the submitted form data." }, { status: 400 });
  }

  const website = formData.get("website");
  if (typeof website === "string" && website.length > 0) {
    // Honeypot tripped — respond as if successful without processing further.
    return NextResponse.json({ reference: generateReference() }, { status: 200 });
  }

  const values = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => key !== "requirementsDocument")
  );

  const parsed = bookingSubmissionSchema.safeParse(values);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Some required fields are missing or invalid.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const upload = formData.get("requirementsDocument");
  const file = upload instanceof File && upload.size > 0 ? upload : null;
  if (file) {
    const name = file.name.toLowerCase();
    if (file.size > MAX_UPLOAD_BYTES || !ALLOWED_EXTENSIONS.some((extension) => name.endsWith(extension))) {
      return NextResponse.json(
        { message: "The attached document must be a PDF, Word, or text file smaller than 4MB." },
        { status: 422 }
      );
    }
  }

  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
  if (!isEmailDeliveryConfigured() && !webhookUrl) {
    console.error("Booking received but no delivery is configured (RESEND_API_KEY + FORMS_INBOX_EMAIL, or BOOKING_WEBHOOK_URL).");
    return NextResponse.json(
      {
        message: `Online booking is temporarily unavailable, so nothing was sent. Please contact us directly at ${contact.email} or ${contact.phone}.`,
      },
      { status: 503 }
    );
  }

  const reference = generateReference();
  const data = parsed.data;

  try {
    if (isEmailDeliveryConfigured()) {
      const { text, html } = renderFields(`New consultation request ${reference}`, [
        ["Reference", reference],
        ["Name", data.fullName],
        ["Work email", data.workEmail],
        ["Phone / WhatsApp", data.phone],
        ["Organization", data.organization],
        ["Job title", data.jobTitle],
        ["Service needed", data.serviceNeeded],
        ["Business challenge", data.businessChallenge],
        ["Project description", data.projectDescription],
        ["Target users", data.targetUsers],
        ["Launch timeframe", data.launchTimeframe],
        ["Budget range", data.budgetRange],
        ["Starting point", data.startingPoint],
        ["Preferred date", data.preferredDate],
        ["Preferred time", data.preferredTime],
        ["Time zone", data.timeZone],
        ["Meeting format", data.meetingFormat],
        ["Attached document", file?.name],
      ], "Reply to this email to respond to the client directly.");

      await sendEmail({
        to: getInboxAddresses(),
        subject: `Consultation request ${reference}: ${data.organization} (${data.fullName})`,
        text,
        html,
        replyTo: data.workEmail,
        attachments: file ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }] : undefined,
      });
    }

    if (webhookUrl) {
      formData.set("reference", reference);
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        // Forwarding the parsed FormData directly (including the file, if any)
        // preserves multipart/form-data with its boundary automatically.
        body: formData,
        headers: process.env.BOOKING_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.BOOKING_WEBHOOK_TOKEN}` }
          : undefined,
      });
      if (!webhookResponse.ok) throw new Error(`Booking webhook responded ${webhookResponse.status}`);
    }
  } catch (error) {
    console.error("Booking delivery failed", reference, error);
    return NextResponse.json({ message: UNDELIVERABLE }, { status: 502 });
  }

  // The request is safely with MartEX at this point; a failed courtesy
  // confirmation must not turn it into an error for the visitor.
  if (canEmailVisitors()) {
    const { text, html } = renderFields(
      `We received your consultation request`,
      [
        ["Reference", reference],
        ["Service", data.serviceNeeded],
        ["Preferred date", data.preferredDate],
        ["Preferred time", `${data.preferredTime} (${data.timeZone})`],
        ["Meeting format", data.meetingFormat],
      ],
      `Hi ${data.fullName}, thank you for contacting ${company.name}. Our team will review your request and confirm the meeting time with you shortly. You can reply to this email if anything changes.`
    );
    try {
      await sendEmail({
        to: [data.workEmail],
        subject: `${company.name} consultation request received (${reference})`,
        text,
        html,
        replyTo: getInboxAddresses()[0],
      });
    } catch (error) {
      console.error("Booking confirmation email failed", reference, error);
    }
  }

  return NextResponse.json({ reference }, { status: 200 });
}
