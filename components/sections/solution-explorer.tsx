"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { solutions, solutionCategories, industries } from "@/content/solutions";
import { SolutionCard } from "@/components/cards";

type FilterMode = "category" | "industry";

export function SolutionExplorer() {
  const [mode, setMode] = useState<FilterMode>("category");
  const [active, setActive] = useState<string>("All");

  const options = mode === "category" ? ["All", ...solutionCategories] : ["All", ...industries];

  const filtered = useMemo(() => {
    if (active === "All") return solutions;
    if (mode === "category") return solutions.filter((solution) => solution.category === active);
    return solutions.filter((solution) => solution.industries.includes(active as (typeof industries)[number]));
  }, [active, mode]);

  function switchMode(next: FilterMode) {
    setMode(next);
    setActive("All");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 text-sm font-semibold">
          {(["category", "industry"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => switchMode(option)}
              aria-pressed={mode === option}
              className={`rounded-full px-4 py-2 transition-colors ${
                mode === option ? "bg-[var(--cta)] text-[var(--cta-ink)]" : "text-[var(--ink-muted)]"
              }`}
            >
              By {option === "category" ? "business challenge" : "industry"}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label={`Filter solutions by ${mode}`} className="mt-5 flex flex-wrap gap-2">
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

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((solution) => (
          <motion.div key={solution.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SolutionCard solution={solution} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-[var(--ink-muted)]">No solutions match this filter yet.</p>
      )}
    </div>
  );
}
