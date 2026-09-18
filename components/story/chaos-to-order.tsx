"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * The manual, scattered version of a process resolving into its organized
 * counterpart — used where the real story is consolidation or automation
 * (Business Process Automation, Information Management Systems). Items
 * are paired by index: messyItems[i] becomes orderedItems[i].
 */
export function ChaosToOrder({
  messyItems,
  orderedItems,
  accent = "var(--color-primary)",
}: {
  messyItems: string[];
  orderedItems: string[];
  accent?: string;
}) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
      <div className="grid gap-3">
        {messyItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -12 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            animate={shouldReduceMotion ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ rotate: ((index % 3) - 1) * 3 }}
            className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink-muted)] line-through decoration-[var(--ink-muted)]/50"
          >
            {item}
          </motion.div>
        ))}
      </div>

      <motion.div
        aria-hidden="true"
        className="flex justify-center text-[var(--ink-muted)]"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.3 }}
      >
        <ArrowRight size={28} className="rotate-90 sm:rotate-0" />
      </motion.div>

      <div className="grid gap-3">
        {orderedItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            animate={shouldReduceMotion ? { opacity: 1, x: 0, scale: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.35 + index * 0.08, ease: [0.16, 1, 0.3, 1] }
            }
            className="flex items-center gap-2.5 rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--ink)]"
            style={{ borderColor: accent }}
          >
            <CheckCircle2 size={16} aria-hidden="true" style={{ color: accent }} className="shrink-0" />
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
