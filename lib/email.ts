/**
 * Minimal transactional email delivery through Resend's HTTP API
 * (https://resend.com/docs/api-reference/emails/send-email). Plain fetch, no
 * SDK, so there's no extra dependency to keep up to date.
 *
 * Configuration (all server-side only):
 * - RESEND_API_KEY      API key from the Resend dashboard.
 * - FORMS_INBOX_EMAIL   Where booking requests and contact messages are sent.
 *                       Comma-separate several addresses if needed.
 * - EMAIL_FROM          Sender, e.g. "MartEX <bookings@martex.com.lr>". Must use
 *                       a domain verified in Resend. Until one is verified,
 *                       leave it unset: Resend's shared "onboarding@resend.dev"
 *                       sender is used, which can only deliver to the email
 *                       address that owns the Resend account.
 */

export type EmailAttachment = { filename: string; content: Buffer };

type SendEmailInput = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

const FALLBACK_FROM = "MartEX Website <onboarding@resend.dev>";

export function getInboxAddresses() {
  return (process.env.FORMS_INBOX_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

export function isEmailDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY) && getInboxAddresses().length > 0;
}

/** Confirmation emails to visitors need a verified sending domain, not the shared test sender. */
export function canEmailVisitors() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail({ to, subject, text, html, replyTo, attachments }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || FALLBACK_FROM,
      to,
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(attachments?.length
        ? {
            attachments: attachments.map((attachment) => ({
              filename: attachment.filename,
              content: attachment.content.toString("base64"),
            })),
          }
        : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders label/value rows as both a plain-text body and a simple HTML table. */
export function renderFields(title: string, rows: [string, string | undefined][], intro?: string) {
  const present = rows.filter((row): row is [string, string] => Boolean(row[1]?.trim()));

  const text = [title, intro, "", ...present.map(([label, value]) => `${label}: ${value}`)]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#0d172d;max-width:640px">
<h2 style="margin:0 0 12px;font-size:20px">${escapeHtml(title)}</h2>
${intro ? `<p style="margin:0 0 16px;line-height:1.5">${escapeHtml(intro)}</p>` : ""}
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
${present
  .map(
    ([label, value]) =>
      `<tr><td style="border-bottom:1px solid #e3e8ef;font-weight:bold;vertical-align:top;width:34%">${escapeHtml(label)}</td><td style="border-bottom:1px solid #e3e8ef;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>
</div>`;

  return { text, html };
}
