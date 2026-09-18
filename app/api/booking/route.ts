import { NextResponse } from "next/server";
import { bookingSubmissionSchema } from "@/lib/validations";

export const runtime = "nodejs";

function generateReference() {
  return `MX-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request: Request) {
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

  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        message:
          "Booking submissions aren't connected to a delivery provider yet, so nothing was sent. Set BOOKING_WEBHOOK_URL to enable this form — see README.md.",
      },
      { status: 503 }
    );
  }

  const reference = generateReference();
  formData.set("reference", reference);

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      // Forwarding the parsed FormData directly (including the file, if any)
      // preserves multipart/form-data with its boundary automatically.
      body: formData,
      headers: process.env.BOOKING_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.BOOKING_WEBHOOK_TOKEN}` }
        : undefined,
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { message: "The consultation request could not be delivered. Please try again shortly." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "The consultation request could not be delivered. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ reference }, { status: 200 });
}
