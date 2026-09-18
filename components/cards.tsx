import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Cog,
  Database,
  Layers,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";
import type { Solution } from "@/content/solutions";
import type { CaseStudy } from "@/content/case-studies";
import { Tag } from "@/components/ui/primitives";

const serviceIcons: Record<string, LucideIcon> = {
  "custom-software-development": Cog,
  "web-application-development": Layers,
  "mobile-application-development": Smartphone,
  "business-process-automation": Workflow,
  "information-management-systems": Database,
  "systems-integration": Boxes,
  "technology-consulting": BarChart3,
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[service.slug] ?? Cog;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)] focus-visible:-translate-y-1.5 focus-visible:border-[var(--color-sky)]"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-[var(--color-sky)]/12 text-[var(--cta)] transition-colors group-hover:bg-[var(--cta)] group-hover:text-[var(--cta-ink)]">
            <Icon size={22} aria-hidden="true" />
          </span>
          <span className="font-mono text-xs text-[var(--ink-muted)]">0{index + 1}</span>
        </div>
        <h3 className="mt-6 text-xl font-bold tracking-tight">{service.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-muted)]">{service.shortDescription}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cta)]">
        Learn more
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group flex h-full flex-col justify-between rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)]"
    >
      <div>
        <Tag>{solution.category}</Tag>
        <h3 className="mt-4 text-lg font-bold tracking-tight">{solution.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{solution.valueProposition}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {solution.industries.slice(0, 3).map((industry) => (
          <span key={industry} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--ink-muted)]">
            {industry}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group flex h-full flex-col justify-between rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)]"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="bg-[var(--color-tech-blue)]/15 text-[var(--color-navy)] dark:text-[var(--color-off-white)]">
            Concept solution
          </Tag>
          <span className="text-xs font-medium text-[var(--ink-muted)]">{caseStudy.industry}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold tracking-tight">{caseStudy.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-muted)]">{caseStudy.summary}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cta)]">
        View concept
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}

export function ValuePropCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7">
      <span className="grid size-11 place-items-center rounded-xl bg-[var(--color-sky)]/12 text-[var(--cta)]">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{description}</p>
    </div>
  );
}
