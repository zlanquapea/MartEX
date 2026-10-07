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

- [x] Direct telephone / WhatsApp number (+231 771 9111 95, from the Lichen MD brochure)
- [x] Primary email address (info@orith.tech, from the Lichen MD brochure)
- [x] Canonical website URL: martex.com.lr (set `NEXT_PUBLIC_SITE_URL=https://martex.com.lr`)
- [ ] Precise, publishable street address for the Monrovia office
- [ ] Business hours
- [ ] Social profile URLs (LinkedIn, X, Facebook, Instagram) — only the platforms MartEX
      actually maintains should be filled in; others should stay blank rather than linking to
      a placeholder
- [ ] Map embed URL/coordinates for the `/contact` page map placeholder

## Legal (`app/privacy/page.tsx`, `app/terms/page.tsx`)

- [ ] Legal entity name and registration details
- [x] Governing law / jurisdiction: Republic of Liberia (on /terms — confirm with counsel)
- [x] Data retention and storage location for form submissions (MartEX email inbox, kept as long as needed — stated on /privacy)
- [x] No analytics, cookies, or other automatic data collection (stated on /privacy; no
      consent banner needed)
- [x] Third-party processors listed on /privacy (Resend for email delivery, the hosting provider)
- [x] Data-subject rights process (email request to info@orith.tech — stated on /privacy)
- [x] Intellectual-property and brand-usage terms (on /terms)
- [ ] Legal review and sign-off on both pages before publishing as final (not placeholder)
      content
- [x] "Last updated" dates for both pages (October 7, 2026)

## Forms and integrations

- [x] Booking delivery: emailed via Resend to `FORMS_INBOX_EMAIL`, with the uploaded file and
      a visitor confirmation once `EMAIL_FROM` is set (see DEPLOYMENT.md). Webhook
      forwarding remains optional.
- [x] Contact delivery: emailed via Resend to `FORMS_INBOX_EMAIL`
- [ ] Confirm the confirmation-email wording and the `EMAIL_FROM` sender address
- [ ] Availability rules / calendar source of truth for consultation scheduling
- [ ] Time-zone policy (the form currently offers a fixed list of common zones, defaulting
      conceptually to Monrovia/GMT)
- [x] Per-connection rate limiting (5 submissions / 10 minutes) on top of the honeypot field;
      add a CAPTCHA only if spam becomes a problem
- [x] Uploaded documents are not stored by the website; they arrive as an email attachment (max 4MB)
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
