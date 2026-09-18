"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * A slim gradient bar under the header showing how far down the current
 * page the visitor is. Purely transform-based (scaleX), so it's cheap and
 * runs happily even with prefers-reduced-motion (it's a static-feeling
 * progress indicator, not a "motion effect" that needs disabling).
 */
export function HeaderProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[var(--color-tech-blue)] to-[var(--color-sky)]"
      aria-hidden="true"
    />
  );
}

const railStops = [
  { id: "hero", label: "Start" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "cta", label: "Contact" },
];

/**
 * A fixed side "signal rail" that runs the length of the page on large
 * screens, tying otherwise-stacked sections into one visible thread. Each
 * stop lights up as its section is in view (see useActiveSection). Desktop
 * only — on smaller screens it would just cover content.
 */
export function ScrollSignalRail({ activeId }: { activeId: string }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.3 });

  return (
    <div
      aria-hidden="true"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-center xl:gap-0"
    >
      <div className="relative h-64 w-px bg-[var(--line)]">
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--color-tech-blue)] to-[var(--color-sky)]"
        />
        {railStops.map((stop, index) => (
          <span
            key={stop.id}
            className={`absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
              activeId === stop.id
                ? "scale-150 bg-[var(--color-sky)] shadow-[0_0_0_4px_var(--color-sky)]/25"
                : "bg-[var(--line)]"
            }`}
            style={{ top: `${(index / (railStops.length - 1)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export { railStops };
