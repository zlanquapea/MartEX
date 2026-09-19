import { CheckCircle2 } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/cards";
import { EmptyState } from "@/components/ui/primitives";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

/**
 * Proof without invented numbers: what a client walks away with (the real
 * deliverables), plus any concept case studies already linked to this
 * service — never a fabricated stat.
 */
export function ProofStrip({
  serviceSlug,
  deliverables,
  accent = "var(--color-primary)",
}: {
  serviceSlug: string;
  deliverables: string[];
  accent?: string;
}) {
  const related = caseStudies.filter((study) => study.serviceSlug === serviceSlug);

  return (
    <div className="grid gap-10">
      <StaggerGroup className="flex flex-wrap gap-2.5">
        {deliverables.map((item) => (
          <StaggerItem key={item}>
            <span
              className="inline-flex items-center gap-2 rounded-full border bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink)]"
              style={{ borderColor: `color-mix(in srgb, ${accent} 30%, var(--line))` }}
            >
              <CheckCircle2 size={15} aria-hidden="true" style={{ color: accent }} />
              {item}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {related.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((study) => (
            <CaseStudyCard key={study.slug} caseStudy={study} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Case study coming soon"
          description="Verified results for this service will appear here once a client engagement is completed and approved for publication."
        />
      )}
    </div>
  );
}
