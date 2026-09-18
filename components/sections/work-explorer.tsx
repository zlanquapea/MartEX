"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/solutions";
import { services } from "@/content/services";
import { CaseStudyCard } from "@/components/cards";
import { EmptyState } from "@/components/ui/primitives";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

type FilterMode = "industry" | "service";

export function WorkExplorer() {
  const [mode, setMode] = useState<FilterMode>("industry");
  const [active, setActive] = useState<string>("All");
  const shouldReduceMotion = useIsReducedMotion();

  const serviceTitleBySlug = useMemo(() => new Map(services.map((service) => [service.slug, service.title])), []);
  const usedServiceSlugs = useMemo(() => Array.from(new Set(caseStudies.map((study) => study.serviceSlug))), []);

  const options = mode === "industry" ? ["All", ...industries] : ["All", ...usedServiceSlugs.map((slug) => serviceTitleBySlug.get(slug) ?? slug)];

  const filtered = useMemo(() => {
    if (active === "All") return caseStudies;
    if (mode === "industry") return caseStudies.filter((study) => study.industry === active);
    return caseStudies.filter((study) => serviceTitleBySlug.get(study.serviceSlug) === active);
  }, [active, mode, serviceTitleBySlug]);

  function switchMode(next: FilterMode) {
    setMode(next);
    setActive("All");
  }

  return (
    <div>
      <div className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 text-sm font-semibold">
        {(["industry", "service"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => switchMode(option)}
            aria-pressed={mode === option}
            className={`rounded-full px-4 py-2 transition-colors ${
              mode === option ? "bg-[var(--cta)] text-[var(--cta-ink)]" : "text-[var(--ink-muted)]"
            }`}
          >
            By {option}
          </button>
        ))}
      </div>

      <div role="group" aria-label={`Filter case studies by ${mode}`} className="mt-5 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActive(option)}
            aria-pressed={active === option}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === option
                ? "border-transparent bg-[var(--color-sky)]/20 text-[var(--cta)]"
                : "border-[var(--line)] text-[var(--ink-muted)] hover:border-[var(--color-sky)]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <motion.div layout={!shouldReduceMotion} className="mt-10 grid gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout={!shouldReduceMotion}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseStudyCard caseStudy={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-10">
          <EmptyState title="No case studies match this filter yet" description="Verified case studies are added as client engagements are completed and approved for publication." />
        </div>
      )}
    </div>
  );
}
