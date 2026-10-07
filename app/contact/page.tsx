import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, contactPointJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/contact-form";
import { company, contact, contactLinks } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${company.name} in ${contact.officeLocation}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-24 pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointJsonLd()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          Tell us about your organization&rsquo;s challenge.
        </h1>
      </div>

      <div className="container-page mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-6">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7">
            <div className="grid gap-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--ink)]">Office</p>
                  <p className="text-sm text-[var(--ink-muted)]">{contact.officeLocation}</p>
                  {contact.addressLine && <p className="text-sm text-[var(--ink-muted)]">{contact.addressLine}</p>}
                </div>
              </div>
              {contact.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                  <div>
                    <p className="text-sm font-bold text-[var(--ink)]">Phone / WhatsApp</p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      <a href={contactLinks.phone} className="hover:text-[var(--cta)]">
                        {contact.phone}
                      </a>
                      {" · "}
                      <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--cta)]">
                        Chat on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {contact.email && (
                <div className="flex items-start gap-3">
                  <Mail size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                  <div>
                    <p className="text-sm font-bold text-[var(--ink)]">Email</p>
                    <a href={contactLinks.email} className="text-sm text-[var(--ink-muted)] hover:text-[var(--cta)]">
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}
              {contact.hours && (
                <div className="flex items-start gap-3">
                  <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                  <div>
                    <p className="text-sm font-bold text-[var(--ink)]">Business hours</p>
                    <p className="text-sm text-[var(--ink-muted)]">{contact.hours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {contact.mapEmbedUrl && (
            <iframe
              title={`Map of the ${company.name} office`}
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-3xl border border-[var(--line)]"
            />
          )}

          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7">
            <p className="text-sm font-bold text-[var(--ink)]">Prefer to schedule directly?</p>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">
              Use the consultation booking form for a structured, multi-step request.
            </p>
            <div className="mt-4">
              <Button href="/book" variant="secondary">
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 sm:p-9">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
