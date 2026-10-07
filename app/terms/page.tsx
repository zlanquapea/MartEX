import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";
import { company, contact } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms governing use of the ${company.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="pb-24 pt-40">
      <div className="container-page max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-[var(--ink-muted)]">Last updated: October 7, 2026</p>

        <div className="prose-legal mt-10">
          <h2>Use of this website</h2>
          <p>
            This website is provided by {company.name} ({contact.officeLocation}) to share information about our
            services and to allow prospective clients to make inquiries and request consultations.
          </p>

          <h2>No guarantee of outcomes</h2>
          <p>
            Descriptions of services and solutions on this website are general in nature. Specific deliverables,
            timelines, and outcomes for any engagement are defined in a separate agreement between {company.name}
            and the client.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The content of this website, the {company.name} name and logo, and the names and logos of our products
            belong to {company.name}. You may share links to this website, but you may not copy or reuse its content
            or brand assets for commercial purposes without our written permission.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Republic of Liberia. Any dispute will first be discussed in
            good faith; if it cannot be resolved that way, it will be handled by the competent courts of Liberia.
          </p>

          <h2>Changes to these terms</h2>
          <p>{company.name} may update these terms from time to time. Material changes will be reflected by the &ldquo;last updated&rdquo; date above.</p>

          <h2>Contact</h2>
          <p>Questions about these terms can be directed to {contact.email}.</p>
        </div>
      </div>
    </div>
  );
}
