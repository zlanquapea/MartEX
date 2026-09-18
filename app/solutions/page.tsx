import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow } from "@/components/ui/primitives";
import { SolutionExplorer } from "@/components/sections/solution-explorer";
import { company } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description: `Explore ${company.name}'s adaptable solution categories, from sales and inventory to records management and program monitoring.`,
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
        <Eyebrow>Solutions</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          Adaptable solution categories, shaped to your operation.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          These are conceptual capability demonstrations, not finalized products — every engagement is scoped
          through discovery and agreed requirements before anything is built.
        </p>
      </div>

      <div className="container-page mt-16">
        <SolutionExplorer />
      </div>

      <div className="container-page mt-16 flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Don&rsquo;t see your exact challenge?</h2>
          <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
            Most solutions start as a custom conversation. Book a consultation and we&rsquo;ll help define the right
            approach.
          </p>
        </div>
        <Button href="/book">Book a Consultation</Button>
      </div>
    </div>
  );
}
