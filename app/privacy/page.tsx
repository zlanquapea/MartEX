import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";
import { company, contact } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses, and protects information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="pb-24 pt-40">
      <div className="container-page max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[var(--ink-muted)]">Last updated: [Date to be confirmed before publication]</p>

        <div className="prose-legal mt-10">
          <p>
            This Privacy Policy explains how {company.name} ({contact.officeLocation}) handles information submitted
            through this website, including the contact and consultation booking forms.
          </p>
          <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-5 text-sm">
            <strong>Editable configuration notice:</strong> this policy is a structural placeholder. It must be
            reviewed and completed by {company.name} and, where appropriate, qualified legal counsel before launch.
            Do not publish this page as final legal content without that review. See CONTENT_INVENTORY.md for the
            specific details required.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Contact details you provide through the contact form (name, email, organization, message).</li>
            <li>
              Booking details you provide through the consultation form (contact details, project needs, meeting
              preferences, and any uploaded file).
            </li>
            <li>[Confirm whether analytics, cookies, or other automatic collection will be used before launch.]</li>
          </ul>

          <h2>How information is used</h2>
          <ul>
            <li>To respond to inquiries and schedule requested consultations.</li>
            <li>To evaluate and scope potential engagements.</li>
            <li>[Confirm any additional agreed uses, such as newsletters, before launch.]</li>
          </ul>

          <h2>How information is protected</h2>
          <p>
            Form submissions are validated on the server and are not stored in browser storage. Delivery to
            {" "}{company.name}&rsquo;s systems depends on the integration configured for each form — see
            README.md for details. [Confirm data retention periods, storage location, and access controls before
            launch.]
          </p>

          <h2>Third parties</h2>
          <p>
            [List any approved third-party processors — such as email delivery, CRM, or booking providers — once
            selected. No third-party integrations are active in this build until the relevant environment variables
            are configured.]
          </p>

          <h2>Your rights</h2>
          <p>
            [Confirm applicable data-subject rights and how a person can request access to, correction of, or
            deletion of their information.]
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be directed to {contact.email} or {contact.officeLocation}.
          </p>
        </div>
      </div>
    </div>
  );
}
