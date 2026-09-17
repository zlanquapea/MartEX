# MartEX website

Production-oriented Next.js App Router website for MartEX. Content is intentionally factual: unverified contact details, clients, results, products, pricing, and testimonials are never invented.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Use Node.js 20 or newer. For production, run `npm run build` and deploy to Vercel or another Next.js-compatible host. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin.

## Content and routes

- Company configuration, services, solutions, audiences, values, and process data live in `content/site.ts`.
- Adding an item to `services` or `solutions` automatically creates its index card, detail route, metadata, and sitemap entry.
- Reusable interface components are in `components/`; route templates are in `app/`.
- Case-study data should be moved to a structured array or CMS when verified work is approved. Optional sections must render only when fields contain data.
- No testimonial is rendered because none has been verified. Add the component only after approved quotation, attribution, and publication consent are available.

## Forms and delivery adapters

Both forms validate in the browser and again in Route Handlers using Zod. Honeypot fields provide a basic spam signal. Add rate limiting and bot protection appropriate to the chosen hosting environment before launch.

- Set `BOOKING_WEBHOOK_URL` to a server-to-server endpoint that accepts validated JSON, handles file uploads through an approved secure provider, schedules the meeting, and sends the reference confirmation email.
- Set `CONTACT_WEBHOOK_URL` to an approved CRM, email, or ticketing adapter.
- Without these variables the APIs intentionally return HTTP 503 and the interface explicitly states that nothing was submitted.
- Never expose provider secrets with a `NEXT_PUBLIC_` prefix. Review retention, access, deletion, and incident procedures with MartEX.

## Theme and accessibility

The light/dark/system preference is stored locally, but form data never is. An inline theme bootstrap prevents a theme flash. The site includes a skip link, semantic landmarks, visible focus, reduced-motion rules, keyboard-friendly navigation, labelled controls, and live form status.

## Deployment checklist

Run `npm run typecheck` and `npm run build`. Validate all configured integrations in staging, complete legal review, use automated accessibility and Lighthouse checks, and manually test keyboard use and responsive widths before launch.

## Content inventory — required before launch

- Approved original MartEX logo asset in suitable light/dark raster or SVG variants; none was present in the repository, so the site currently uses a text wordmark rather than pretending to reproduce it.
- Verified telephone, email, canonical website URL, business hours, social URLs, and precise publishable office/map address.
- Company registration/legal entity information, privacy contact, governing law, retention periods, approved data processors, and reviewed Privacy/Terms copy.
- Booking/contact delivery provider credentials, recipient rules, confirmation-email copy, availability rules, time-zone policy, rate limiting, CAPTCHA/bot strategy, and file-storage policy.
- Approved product names, positioning, features, screenshots, integrations, security statements, pricing model, and FAQs if MartEX launches named products.
- Approved case studies: client consent, context, challenge, approach, screenshots, technology, measurable outcomes, quotations, and attribution.
- Approved analytics/consent requirements. No analytics or cookie banner is installed because no tracking integration was selected.
- Favicon and web-app icon derived from the approved logo. These are intentionally not fabricated.
