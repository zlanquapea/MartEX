# Content inventory — required before launch

This file tracks every piece of business information this website needs from MartEX before
it can go live with confidence. Nothing listed here has been invented in the codebase —
placeholders are used instead, clearly marked, wherever a value is missing.

## Brand assets

- [x] Approved MartEX logo received and integrated (`public/brand/martex-logo-mark.png`,
      trimmed from the supplied file, background made transparent, otherwise unmodified —
      `components/logo.tsx`). Because the mark's "Mart" glyphs are dark navy, it renders on a
      fixed, theme-independent off-white chip so it stays legible in dark mode without
      recoloring the approved asset; in light mode the chip is visually identical to the page
      background. If MartEX later supplies a true reversed/light variant for dark
      surfaces, that can replace the chip approach.
  - [ ] A vector (SVG) source file, if MartEX has one, would allow crisper scaling than the
        current raster crop — not required, but nice to have.
- [x] Favicon / web-app icons derived from the approved logo's "X" mark (`app/icon.png`,
      `app/apple-icon.png`), composited on the brand navy per the original brief's
      "derived from the approved logo" instruction.
- [x] Open Graph / social share image generated from the approved logo (`app/opengraph-image.png`).

## Contact information (`content/company.ts` → `contact`)

- [ ] Direct telephone / WhatsApp number
- [ ] Primary email address
- [ ] Canonical website URL (also needed for `NEXT_PUBLIC_SITE_URL`)
- [ ] Precise, publishable street address for the Monrovia office
- [ ] Business hours
- [ ] Social profile URLs (LinkedIn, X, Facebook, Instagram) — only the platforms MartEX
      actually maintains should be filled in; others should stay blank rather than linking to
      a placeholder
- [ ] Map embed URL/coordinates for the `/contact` page map placeholder

## Legal (`app/privacy/page.tsx`, `app/terms/page.tsx`)

- [ ] Legal entity name and registration details
- [ ] Governing law / jurisdiction for disputes
- [ ] Data retention periods and storage location for form submissions
- [ ] Confirmation of whether analytics, cookies, or other automatic data collection will be
      used (none is currently implemented — no consent banner exists because nothing needs
      consent yet)
- [ ] List of any approved third-party data processors (email delivery, CRM, booking
      provider) once selected
- [ ] Data-subject rights process (access/correction/deletion requests)
- [ ] Intellectual-property and brand-usage terms
- [ ] Legal review and sign-off on both pages before publishing as final (not placeholder)
      content
- [ ] "Last updated" dates for both pages

## Forms and integrations

- [ ] Booking delivery provider (`BOOKING_WEBHOOK_URL` / `BOOKING_WEBHOOK_TOKEN`) — receives
      validated JSON + the uploaded requirements file and should schedule the meeting and
      send a confirmation email
- [ ] Contact delivery provider (`CONTACT_WEBHOOK_URL` / `CONTACT_WEBHOOK_TOKEN`)
- [ ] Confirmation email copy and sender/reply-to addresses
- [ ] Availability rules / calendar source of truth for consultation scheduling
- [ ] Time-zone policy (the form currently offers a fixed list of common zones, defaulting
      conceptually to Monrovia/GMT)
- [ ] Rate limiting and bot-protection strategy beyond the honeypot field already implemented
      (e.g. a CAPTCHA or a provider-level rate limit) if submission volume warrants it
- [ ] File-storage policy for uploaded requirements documents (retention period, access
      control, provider)
- [ ] Analytics/consent provider, if any is selected (currently none — no cookie banner
      exists)

## Products / solutions (`content/solutions.ts`)

Every current entry is explicitly marked `isConcept: true` and displayed as a "Concept
solution" with "Request pricing." Before naming and launching a real product:

- [ ] Finalized product name and one-sentence value proposition
- [ ] Real feature list, benefits, and workflow description
- [ ] Actual integrations supported
- [ ] Accurate security/data-handling statement (the current copy is a general placeholder
      per solution)
- [ ] Real interface screenshots or a working demo (the current pages show a labeled
      "Interface preview coming soon" placeholder instead of a screenshot)
- [ ] Pricing model, if MartEX moves away from "Request pricing" for a given product

## Case studies (`content/case-studies.ts`)

All three current entries are labeled "Concept solution" capability demonstrations with no
real client involved. Before publishing a real case study:

- [ ] Written client consent to be named and quoted
- [ ] Verified challenge, discovery, solution, and outcome narrative
- [ ] Approved screenshots
- [ ] Technology list
- [ ] An attributed client quotation (only publish once consent and attribution are
      confirmed)
- [ ] Remove the "Concept solution" labeling and `isConcept` flag for that specific entry only

## Team / company

- [ ] Team member names, titles, and bios, if MartEX wants to introduce individual staff
      (none are currently listed — the About page focuses on the company, mission, and
      values rather than fabricated personnel)
- [ ] Any certifications, awards, or partnerships MartEX has actually received (none are
      currently claimed)

## Testimonials

- [ ] At least one verified, attributed, consented client quotation. The `Testimonial`
      component (`components/ui/testimonial.tsx`) exists but is intentionally not rendered
      anywhere until this exists.
