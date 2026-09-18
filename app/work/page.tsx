import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow } from "@/components/ui/primitives";
import { WorkExplorer } from "@/components/sections/work-explorer";
import { company } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: `Explore ${company.name}'s case studies and concept solution demonstrations across industries and services.`,
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Work", href: "/work" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work" }]} />
        <Eyebrow>Work</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          Evidence, without invention.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          No verified client case studies are published yet. The entries below are clearly labeled concept
          demonstrations showing how MartEX would approach real operational challenges — client names, results, and
          quotations will only appear once verified and approved.
        </p>
      </div>

      <div className="container-page mt-16">
        <WorkExplorer />
      </div>

      <div className="container-page mt-16 flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Have a similar challenge?</h2>
          <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
            Book a consultation to talk through your specific situation.
          </p>
        </div>
        <Button href="/book">Book a Consultation</Button>
      </div>
    </div>
  );
}
