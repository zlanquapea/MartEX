# Deploying the MartEX website

The site is a standard Next.js app. These steps take it live on **Vercel** with
booking requests and contact messages arriving by email. Allow about 30 minutes,
most of it waiting for DNS.

## 1. Create the Vercel project

1. Sign in at [vercel.com](https://vercel.com) with GitHub and choose **Add New → Project**.
2. Import the `zlanquapea/MartEX` repository. Vercel detects Next.js; keep the default
   build settings (`npm run build`, Node 20+).
3. Don't deploy yet — add the environment variables from step 2 first (you can also add
   them later and redeploy).

## 2. Turn on booking and contact delivery (Resend)

Without this, both forms tell visitors that online booking is unavailable and show the
MartEX email and phone number instead. Nothing is ever silently lost.

1. Create a free account at [resend.com](https://resend.com) **using the same email
   address that should receive the bookings**. Until a domain is verified (step 4),
   Resend can only deliver to the account owner's address.
2. In Resend, go to **API Keys → Create API key** (permission: *Sending access*) and copy it.
3. In Vercel → Project → **Settings → Environment Variables**, add for *Production*
   (and *Preview* if you want test deployments to send too):

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | the key from step 2 |
   | `FORMS_INBOX_EMAIL` | the inbox that receives bookings and messages |
   | `NEXT_PUBLIC_SITE_URL` | `https://martex.com.lr` |

4. Deploy. Then open `/book` on the live site, submit a test booking, and confirm it
   arrives in the inbox. Each booking email has every answer from the form, the
   attached document (if any), and a reference like `MX-…`. **Replying to the email
   replies to the client directly.**

## 3. Connect the domain

1. Vercel → Project → **Settings → Domains → Add** `martex.com.lr` (and `www.martex.com.lr`,
   redirecting to the apex).
2. At the `.lr` domain registrar, add the DNS records Vercel shows (an `A` record for the
   apex and a `CNAME` for `www`). HTTPS is issued automatically once DNS resolves.

## 4. Send confirmation emails to clients (recommended)

Once a domain is verified, every visitor who books also receives an automatic
"we received your request" email with their reference and requested time, and
bookings can go to any inbox (not just the Resend account owner).

1. Resend → **Domains → Add domain** → `martex.com.lr`.
2. Add the DNS records Resend lists (SPF, DKIM, and optionally DMARC) at the registrar,
   then click **Verify**.
3. In Vercel, add `EMAIL_FROM` = `MartEX <bookings@martex.com.lr>` and redeploy.

## 5. Final checks after going live

- [ ] Submit a test booking and a test contact message; both arrive in the inbox.
- [ ] With `EMAIL_FROM` set, the test booking's email address receives the confirmation.
- [ ] Click through the menu on desktop and phone; every page loads without a refresh.
- [ ] Share a page link in WhatsApp/LinkedIn and check the preview image and title.
- [ ] Submit `https://martex.com.lr/sitemap.xml` in Google Search Console.

## How bookings work, end to end

1. The visitor completes the four-step form at `/book` (contact details → project needs
   → preferred date, time, and meeting format → review). Answers are validated in the
   browser and again on the server.
2. `app/api/booking/route.ts` checks the honeypot and a per-connection rate limit
   (5 submissions per 10 minutes), validates the optional attachment (PDF/Word/text,
   up to 4MB), and generates a reference.
3. The full request is emailed to `FORMS_INBOX_EMAIL` with the client as reply-to.
4. If `EMAIL_FROM` is set, the client gets a confirmation email.
5. The team replies to confirm the meeting time (or propose another) and sends the
   video-call link or meeting details.

The contact form at `/contact` works the same way, without the attachment or
confirmation email.

Optional: set `BOOKING_WEBHOOK_URL` / `CONTACT_WEBHOOK_URL` to also forward every
submission to a CRM, Zapier/Make, or Google Sheets automation. Email and webhook
delivery can run together.
