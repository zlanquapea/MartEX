# Deploying the MartEX website on Railway

The site is a standard Next.js app that runs as **one Railway service**, with no
database and no volume. `railway.json` in the repository sets the build and start
commands, a health check (`/api/health`), and the restart policy, so there's
nothing to configure for the build itself. Booking requests and contact messages
arrive by email through Resend. Allow about 30 minutes, most of it waiting for DNS.

## 1. Create the service

1. In [Railway](https://railway.com), click **New Project → Deploy from GitHub repo** and
   pick `zlanquapea/MartEX`. If Railway can't see the repository, click **Configure
   GitHub App** and grant it access.
2. Railway detects `railway.json` and builds the site. Every push to `main` redeploys it
   automatically.

## 2. Generate a public address

In the service, go to **Settings → Networking → Generate Domain**. Railway gives you an
address like `martex-production.up.railway.app`, so you can check the site before the
real domain is connected.

## 3. Turn on booking and contact delivery (Resend)

Without this, both forms tell visitors that online booking is unavailable and show the
MartEX email and phone number instead. Nothing is ever silently lost.

1. Create a free account at [resend.com](https://resend.com) **using the same email
   address that should receive the bookings**. Until a domain
   is verified (step 5), Resend can only deliver to the account owner's address.
2. In Resend, go to **API Keys → Create API key** (permission: *Sending access*) and copy it.
3. In the Railway service, open **Variables → Raw Editor**, paste the following, and
   fill in the key:

   ```env
   RESEND_API_KEY=re_...
   FORMS_INBOX_EMAIL=the-inbox@example.com
   NEXT_PUBLIC_SITE_URL=https://martex.com.lr
   ```

   Until the domain in step 4 is connected, you can use
   `NEXT_PUBLIC_SITE_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}` instead, then change it to
   `https://martex.com.lr` afterwards. `NEXT_PUBLIC_SITE_URL` is read at build time, so
   Railway redeploys automatically when you change it.
4. Click **Deploy**. When it's live, open `/book` on the Railway address, submit a test
   booking, and confirm it arrives in the inbox. Each booking email has every answer
   from the form, the attached document (if any), and a reference like `MX-…`.
   **Replying to the email replies to the client directly.**

## 4. Connect the domain

1. In the service, go to **Settings → Networking → Custom Domain** and add
   `martex.com.lr`, then add `www.martex.com.lr` too. Railway shows a **CNAME** record
   (and a TXT verification record) for each.
2. Add those records at your domain's DNS provider:
   - **`www.martex.com.lr`** works with an ordinary CNAME record at any DNS provider.
   - **`martex.com.lr`** (the root domain) needs a DNS provider that supports
     **CNAME flattening or ALIAS records**. Many registrars don't. If yours doesn't,
     move the domain's DNS to [Cloudflare](https://www.cloudflare.com) (free): add the
     site there, then change the domain's nameservers at the `.lr` registrar to the two
     Cloudflare gives you. Cloudflare flattens a root CNAME automatically.
3. Railway issues the HTTPS certificate on its own once DNS resolves (usually minutes,
   occasionally a few hours).

See [Railway: working with domains](https://docs.railway.com/networking/domains/working-with-domains)
for screenshots.

## 5. Send confirmation emails to clients (recommended)

Once a domain is verified with Resend, every visitor who books also receives an
automatic "we received your request" email with their reference and requested
time, and bookings can go to any inbox (not just the Resend account owner).

1. Resend → **Domains → Add domain** → `martex.com.lr`.
2. Add the DNS records Resend lists (SPF, DKIM, and optionally DMARC) at the same DNS
   provider as step 4, then click **Verify**.
3. In Railway, add the variable `EMAIL_FROM=MartEX <bookings@martex.com.lr>`. Railway
   redeploys automatically.

## 6. Final checks after going live

- [ ] `https://martex.com.lr/api/health` returns `{"ok":true}`.
- [ ] Submit a test booking and a test contact message; both arrive in the inbox.
- [ ] With `EMAIL_FROM` set, the test booking's email address receives the confirmation.
- [ ] Click through the menu on desktop and phone; every page loads without a refresh.
- [ ] Share a page link in WhatsApp or Facebook and check the preview image and title.
- [ ] Submit `https://martex.com.lr/sitemap.xml` in Google Search Console.

If a deploy fails, open the deployment in Railway and check **Build Logs** (the build
runs `npm run build`, which also lints and type-checks) or **Deploy Logs** (form
delivery errors are logged there as `Booking delivery failed` or
`Contact delivery failed`, with the reason).

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
