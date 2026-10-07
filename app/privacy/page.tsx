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
        <p className="mt-4 text-sm text-[var(--ink-muted)]">Last updated: October 7, 2026</p>

        <div className="prose-legal mt-10">
          <p>
            This Privacy Policy explains how {company.name} ({contact.officeLocation}) handles information you submit
            through this website, including the contact form and the consultation booking form.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Contact form: your name, email address, organization (optional), and message.</li>
            <li>
              Consultation booking form: your contact details, information about your project and its needs, your
              meeting preferences, and any document you choose to attach.
            </li>
            <li>
              This website does not use analytics, advertising, or tracking cookies. Your light/dark theme choice is
              saved in your own browser so the site remembers it; it is never sent to us.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your message and to schedule the consultation you requested.</li>
            <li>To understand and scope a potential project with you.</li>
            <li>We do not sell your information or add you to marketing lists.</li>
          </ul>

          <h2>How it is delivered and stored</h2>
          <p>
            Submissions are checked on our server and then delivered by email to the {company.name} team. Nothing you
            type into a form is stored in your browser. Submissions are kept in our email system only for as long as
            needed to respond to you and, if we work together, for the duration of that relationship.
          </p>

          <h2>Service providers</h2>
          <p>
            We use{" "}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Resend
            </a>{" "}
            to deliver form submissions by email, and our hosting provider to run this website. They process your
            information only to provide those services to us.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask us at any time to see, correct, or delete the information you sent us. Email{" "}
            {contact.email} and we will respond as soon as possible.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle information, we will update this page and the &ldquo;last updated&rdquo; date
            above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to {contact.email} or by phone/WhatsApp on {contact.phone}.
          </p>
        </div>
      </div>
    </div>
  );
}
