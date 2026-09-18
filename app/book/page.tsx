import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";
import { BookingForm } from "@/components/forms/booking-form";
import { company, contact } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Book a Consultation",
  description: `Book a consultation with ${company.name} to discuss your business challenge, timeline, and budget.`,
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Book a Consultation", href: "/book" }])),
        }}
      />
      <div className="container-page max-w-2xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book a Consultation" }]} />
        <Eyebrow>Book a consultation</Eyebrow>
        <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] tracking-tight">
          Let&rsquo;s talk about your business challenge.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--ink-muted)]">
          Four short steps: contact details, project needs, meeting preference, and a final review before you
          submit. No sensitive information is stored in your browser.
        </p>
      </div>

      <div className="container-page mt-14 max-w-3xl">
        <BookingForm />
        <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
          Prefer another way to reach us? Contact {contact.email} or visit the{" "}
          <a href="/contact" className="font-semibold text-[var(--cta)]">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
