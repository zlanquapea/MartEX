"use client";

import { motion } from "motion/react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

const frames: { label: string; width: string }[] = [
  { label: "Desktop", width: "92%" },
  { label: "Tablet", width: "60%" },
  { label: "Mobile", width: "34%" },
];

/**
 * One interface reflowing across desktop/tablet/mobile widths — genuine
 * CSS flex-wrap reflow driven by an animating container width, not three
 * faked screenshots. Used for Web Application Development.
 */
export function ResponsiveCanvas({ rows, accent = "var(--color-tech-blue)" }: { rows: string[]; accent?: string }) {
  const shouldReduceMotion = useIsReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap items-end justify-center gap-5">
        {frames.map(({ label, width }) => (
          <div key={label} className="grid gap-2">
            <div
              className="mx-auto rounded-xl border-2 bg-[var(--surface)] p-2.5"
              style={{ width, borderColor: accent }}
            >
              <div className="flex flex-wrap gap-1.5">
                {rows.map((row) => (
                  <div
                    key={row}
                    className="min-w-[80%] flex-1 truncate rounded bg-[var(--color-sky)]/12 px-2 py-1.5 text-[10px] font-semibold text-[var(--ink-muted)]"
                  >
                    {row}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs font-semibold text-[var(--ink-muted)]">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4" role="img" aria-label="One interface reflowing across desktop, tablet, and mobile screen sizes">
      <motion.div
        className="overflow-hidden rounded-2xl border-2 bg-[var(--surface)] p-4 shadow-[var(--shadow-elevated)]"
        style={{ borderColor: accent }}
        aria-hidden="true"
        animate={{ width: ["94%", "94%", "58%", "58%", "32%", "32%", "94%"] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          times: [0, 0.22, 0.3, 0.52, 0.6, 0.82, 1],
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-wrap gap-2">
          {rows.map((row) => (
            <div
              key={row}
              className="min-w-[28%] flex-1 truncate rounded-lg bg-[var(--color-sky)]/12 px-3 py-2.5 text-xs font-semibold text-[var(--ink-muted)]"
            >
              {row}
            </div>
          ))}
        </div>
      </motion.div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ink-muted)]">One interface, every screen</p>
    </div>
  );
}
