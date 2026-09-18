"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "./use-reduced-motion";

/**
 * Wraps a whole home-page section so it arrives like the next scene in one
 * connected sequence — a soft clip-path wipe plus a short rise — rather
 * than simply appearing below the previous section. One-shot on scroll
 * into view (not continuously scroll-scrubbed), so it stays cheap even on
 * large sections.
 */
export function Scene({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? undefined : { clipPath: "inset(6% 0% 0% 0%)", opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
