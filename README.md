# MartEX website

Production-oriented Next.js (App Router) website for MartEX, a software development and
technology solutions company based in Monrovia, Liberia. Content is intentionally factual:
unverified contact details, clients, results, products, pricing, and testimonials are never
invented. Anything missing is left as a clearly labeled, centrally tracked placeholder — see
[`CONTENT_INVENTORY.md`](./CONTENT_INVENTORY.md).

## Stack

- **Next.js 15** (App Router, Server Components by default) + **TypeScript** (strict)
- **Tailwind CSS v4** for styling, with the brand palette defined as CSS variables in
  `app/globals.css` (supports light, dark, and system themes)
- **Motion** (`motion/react`) for interface transitions, scroll reveals, and the hero animation
- **GSAP + ScrollTrigger** for the one sequence that genuinely needs scroll-linked timeline
  control: the desktop process narrative (`components/motion/process-scroll.tsx`)
- **React Hook Form + Zod** for the booking and contact forms, validated on both client and server
- **Radix UI primitives** (Dialog, Accordion, NavigationMenu, DropdownMenu) for accessible
  interactive components
- **Lucide** icons

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Requires Node.js 20+. Open http://localhost:3000.

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

Before considering a change complete, run `npm run lint`, `npm run typecheck`, and
`npm run build` — all three must pass cleanly.

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request into `main` and on every push to
`main`: install with `npm ci`, then `npm run lint`, `npm run typecheck`, and `npm run build`
(with a placeholder `NEXT_PUBLIC_SITE_URL` so the build has a valid canonical URL to render
metadata against). Configure this workflow as a required status check in the repository's
branch protection settings once the team is ready to enforce it on `main`.

## Project structure

```
app/                 Route segments (one folder per route). Layouts, metadata, and
                      structured data (JSON-LD) live alongside each page.
components/
  layout/            Header, mega menu, mobile menu, footer, theme provider/toggle
  ui/                 Reusable primitives: Button, SectionHeading, FaqAccordion, Field, etc.
  cards.tsx           ServiceCard, SolutionCard, CaseStudyCard, ValuePropCard
  motion/             Reveal/stagger helpers, magnetic button, hero visualization,
                      GSAP process narrative, the reduced-motion hook
  sections/           Composed page sections (home page, solution/work explorers)
  forms/              Booking wizard, contact form, shared form UI (progress bar, honeypot)
content/              Structured TypeScript content: company info, services, solutions,
                      case studies, process stages, values. This is the single source of
                      truth — see "Editing content" below.
lib/                  SEO metadata builder, structured-data (JSON-LD) builders, Zod
                      validation schemas, small utilities
```

## Editing content

All copy that varies by item (services, solutions, case studies, process stages, values,
company info, navigation, contact placeholders) lives in `content/*.ts` as plain,
strongly-typed data — not scattered through JSX. Page templates read from this data, so
editing a service's description or adding a solution does not require touching any route
file.

- `content/company.ts` — company profile, contact placeholders, audiences, nav/footer links
- `content/services.ts` — the seven services and the "Maintenance & Support" capability
- `content/solutions.ts` — solution categories, shown as "Concept solution" pages
- `content/case-studies.ts` — case studies (currently concept demonstrations only)
- `content/process.ts` — the six-stage delivery process
- `content/values.ts` — core values, quality commitments, differentiators

### Adding a new service

Add an entry to the `services` array in `content/services.ts` following the existing
`Service` shape (problems, who it's for, capabilities, use cases, approach, deliverables,
FAQs). The services index, service cards, the mega menu, the sitemap, and the
`/services/[slug]` detail page (hero, FAQ JSON-LD, related services) are all generated from
this array automatically — no new route file is needed.

### Adding a new solution / product

Add an entry to the `solutions` array in `content/solutions.ts`. Every field described in
the `Solution` type is required, including `industries` (used by the solution explorer's
filters) and `faqs`. New entries automatically appear in the solutions index, the solution
explorer's category/industry filters, the mega menu, the sitemap, and get a full
`/solutions/[slug]` landing page.

**Every current solution is marked `isConcept: true` and uses "Request pricing."** Once
MartEX finalizes a real, named product (with real features, pricing, and screenshots),
either update that solution's fields directly or extend the `Solution` type with a
`screenshots: string[]` field and render them in `app/solutions/[slug]/page.tsx` in place of
the "Interface preview coming soon" placeholder.

### Adding a new case study

Add an entry to `content/case-studies.ts`. All narrative fields (`clientContext`,
`challenge`, `discovery`, `solution`, `uxTechnicalApproach`, `implementation`, `outcomes`,
`clientQuote`) are optional — the detail template (`app/work/[slug]/page.tsx`) hides any
section with no data rather than rendering an empty block. Once a real, client-approved case
study is available, remove `isConcept: true` and the "Concept solution" labeling in
`components/cards.tsx` / the detail page for that entry only (or add a boolean flag if some
case studies are real and others are still concepts).

## Forms and delivery adapters

Both the booking wizard (`/book`) and the contact form (`/contact`) validate with Zod in the
browser (`lib/validations.ts`) **and again** in their Route Handlers
(`app/api/booking/route.ts`, `app/api/contact/route.ts`) — never trust client-side validation
alone. Both include a hidden honeypot field for basic spam prevention. No form data is ever
written to `localStorage`/`sessionStorage`.

Neither route has a real delivery backend wired up, by design — no credentials were
available at build time:

- **Booking** (`BOOKING_WEBHOOK_URL`): when unset, `POST /api/booking` returns **HTTP 503**
  with a message stating nothing was submitted (the UI surfaces this clearly — it never fakes
  a success). When set, the route re-validates the submission server-side, generates a
  reference number, and forwards the entire multipart `FormData` (including the uploaded
  requirements file, if any) directly to that URL via `fetch`, optionally with a
  `BOOKING_WEBHOOK_TOKEN` bearer token.
- **Contact** (`CONTACT_WEBHOOK_URL` / `CONTACT_WEBHOOK_TOKEN`): same pattern, as JSON.

### Connecting the booking form to a real provider

1. Stand up (or choose) an endpoint that accepts a `multipart/form-data` POST — for example a
   small serverless function that writes to a CRM, sends a Slack/email notification, and
   triggers a confirmation email using the submitted `reference` field.
2. Set `BOOKING_WEBHOOK_URL` (and `BOOKING_WEBHOOK_TOKEN` if the endpoint requires auth) in
   your deployment environment.
3. If the requirements-document upload should be persisted, have that endpoint stream the
   `requirementsDocument` file part to your object storage of choice (S3-compatible storage,
   etc.) — this app intentionally does not depend on a specific storage provider.
4. Confirm the confirmation-email copy, sender address, and reply-to address with MartEX
   before enabling this in production.

Connect the contact form the same way with `CONTACT_WEBHOOK_URL`.

## Theming

Light, dark, and system themes are supported with no flash of incorrect theme:
`lib/theme-script.ts` runs synchronously in `<head>` before hydration to set
`data-theme` on `<html>`, and `components/layout/theme.tsx` provides the React-side
`ThemeProvider`/`useTheme`/`ThemeToggle`. The preference is stored in `localStorage` under
`martex-theme`. All theme-dependent colors are CSS variables defined once in
`app/globals.css` (`:root` for light, `[data-theme="dark"]` for dark) and consumed through
Tailwind's `@theme` mapping — there is no per-component light/dark branching.

## Accessibility & motion

- Skip-to-content link, semantic landmarks, labelled form fields, visible focus states,
  keyboard-operable navigation (including the mega menu and mobile menu, both built on Radix
  primitives)
- `prefers-reduced-motion` is respected throughout via
  `components/motion/use-reduced-motion.ts`, a hook deliberately written to default to "motion
  allowed" on the very first render (matching the server) and only apply the user's real
  preference in an effect after mount — this avoids hydration mismatches while still fully
  disabling the hero animation loop, magnetic pointer effects, and scroll-linked GSAP sequence
  for users who need it. The hero visualization and process narrative each render a genuinely
  static alternative, not just a frozen mid-animation frame.
- Pointer-only effects (magnetic buttons, hero parallax) are disabled on touch devices

## SEO

`lib/seo.ts` builds consistent per-route metadata (title template, description, canonical URL,
Open Graph, Twitter card). `lib/structured-data.ts` builds JSON-LD for Organization,
Service, SoftwareApplication (solutions), FAQPage, and BreadcrumbList, injected per route.
`app/sitemap.ts` and `app/robots.ts` are generated from the same content arrays used to render
the pages, so they never drift out of sync. `app/icon.png`, `app/apple-icon.png`, and
`app/opengraph-image.png` are static files derived from the approved logo — see the logo note
below — and are picked up automatically by Next's file conventions (no manual `<head>` wiring
needed).

## Brand logo

The approved MartEX logo is at `public/brand/martex-logo-mark.png` — trimmed to the wordmark
(tagline cropped off, since the tagline is rendered separately in copy) with its white
background made transparent; the mark itself is otherwise untouched (no stretching,
distortion, or recoloring). `app/icon.png`, `app/apple-icon.png`, and
`app/opengraph-image.png` are derived from the same source file (the favicon uses the "X"
glyph on the brand navy; the OG image places the full mark on a light card).

Because the mark's "Mart" glyphs are dark navy, `components/logo.tsx` renders it on a small,
fixed off-white chip (`var(--color-off-white)`, not the theme-flipping `--surface` variable)
so it stays legible in dark mode. In light mode the chip is the same color as the page
background, so it's invisible. If MartEX later supplies a true light/reversed variant for
dark surfaces, swap that in and drop the chip.

## Deployment

Designed for Vercel (or any Next.js-compatible Node host):

1. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin.
2. Set the booking/contact webhook variables once real providers are chosen (forms stay in
   "not yet connected" mode otherwise — they will not silently fail).
3. Run `npm run build` and deploy.
4. Complete legal review of `/privacy` and `/terms` (both are structural placeholders — see
   `CONTENT_INVENTORY.md`) before launch.
5. Run Lighthouse and an automated accessibility check, and manually verify keyboard-only
   navigation and screen-reader labeling.

## Replacing placeholders

Every piece of unverified business information (contact details, logo, legal copy, pricing,
case studies, analytics/consent requirements) is centralized and searchable:

- Contact details: `content/company.ts` → `contact`
- Legal copy: `app/privacy/page.tsx`, `app/terms/page.tsx` (each has an inline "editable
  configuration notice")
- Logo: `components/logo.tsx`
- Everything else: [`CONTENT_INVENTORY.md`](./CONTENT_INVENTORY.md)

No cookie/analytics consent banner is included because no analytics or tracking integration
is currently configured — add one (and the corresponding consent UI) only once a specific
provider is selected.
