import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow } from "@/components/ui/primitives";
import { ProcessScrollNarrative } from "@/components/motion/process-scroll";
import { company } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Our Process",
  description: `How ${company.name} moves from a business problem to a supported digital system: discovery, planning, design, development, deployment, and support.`,
  path: "/process",
});

export default function ProcessPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Process", href: "/process" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Process" }]} />
        <Eyebrow>How we work</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          A clear path from business problem to supported digital system.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          Every engagement follows the same six stages, with review points along the way so decisions and progress
          stay visible to everyone involved.
        </p>
      </div>

      <div className="container-page mt-16">
        <ProcessScrollNarrative />
      </div>

      <div className="container-page mt-20 flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ready to start with discovery?</h2>
          <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
            Book a consultation to walk through your business challenge and see how this process would apply.
          </p>
        </div>
        <Button href="/book">Book a Consultation</Button>
      </div>
    </div>
  );
}
