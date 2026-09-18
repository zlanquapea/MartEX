"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "./use-reduced-motion";

/**
 * A short, deliberate cross-fade between routes so navigating feels like
 * moving to the next scene rather than an instant swap. `initial={false}`
 * keeps this out of the very first page load — it only plays on actual
 * client-side navigations. Reduced-motion visitors get an untouched,
 * instant swap; nothing here delays data that's already ready to show.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useIsReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
