import Link from "next/link";
import { ViewTransitionLink } from "@/components/motion/view-transition-link";
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
import type { ProductSummary } from "@/content/products";
import { Tag } from "@/components/ui/primitives";
import { TiltCard } from "@/components/motion/tilt-card";
import { caseStudyTitleTransitionName } from "@/lib/view-transitions";
import { getServiceVisual } from "@/content/service-visuals";
import { categoryAccents } from "@/content/solutions";

const serviceIcons: Record<string, LucideIcon> = {
  "custom-software-development": Cog,
  "web-application-development": Layers,
  "mobile-application-development": Smartphone,
  "business-process-automation": Workflow,
  "information-management-systems": Database,
  "systems-integration": Boxes,
  "technology-consulting": BarChart3,
};

/** Thin left-edge "signal trace" that draws in on hover/focus — the shared
 * connector motif used across every card variant below. */
function SignalTrace() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-4 left-0 w-[3px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-[var(--color-tech-blue)] to-[var(--color-sky)] transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
    />
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[service.slug] ?? Cog;
  const { accent } = getServiceVisual(service.slug);
  return (
    <TiltCard>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-colors duration-300 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)] focus-visible:border-[var(--color-sky)]"
      >
        <SignalTrace />
        <div>
          <div className="flex items-start justify-between">
            <span
              className="grid size-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--cta-ink)] group-focus-visible:bg-[var(--accent)] group-focus-visible:text-[var(--cta-ink)]"
              style={{ "--accent": accent } as React.CSSProperties}
            >
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
    </TiltCard>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const accent = categoryAccents[solution.category] ?? "var(--color-tech-blue)";
  return (
    <TiltCard>
      <Link
        href={`/solutions/${solution.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)]"
      >
        <SignalTrace />
        <div>
          <Tag style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}>
            {solution.category}
          </Tag>
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
    </TiltCard>
  );
}

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <TiltCard>
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-colors duration-300 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)] focus-visible:border-[var(--color-sky)]"
      >
        <SignalTrace />
        <div>
          <Tag style={{ backgroundColor: `color-mix(in srgb, ${product.accent} 14%, transparent)`, color: product.accent }}>
            {product.category}
          </Tag>
          <h3 className="mt-4 text-2xl font-bold tracking-tight">{product.name}</h3>
          <p className="mt-2 text-sm font-semibold" style={{ color: product.accent }}>
            {product.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{product.summary}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cta)]">
          Explore {product.name}
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </TiltCard>
  );
}

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <TiltCard>
      <ViewTransitionLink
        href={`/work/${caseStudy.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-colors duration-300 hover:border-[var(--color-sky)] hover:shadow-[var(--shadow-elevated)]"
      >
        <SignalTrace />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="bg-[var(--color-tech-blue)]/15 text-[var(--color-navy)] dark:text-[var(--color-off-white)]">
              Concept solution
            </Tag>
            <span className="text-xs font-medium text-[var(--ink-muted)]">{caseStudy.industry}</span>
          </div>
          <h3
            className="mt-4 text-xl font-bold tracking-tight"
            style={{ viewTransitionName: caseStudyTitleTransitionName(caseStudy.slug) } as React.CSSProperties}
          >
            {caseStudy.title}
          </h3>
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
      </ViewTransitionLink>
    </TiltCard>
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
