"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

export type PhoneMockupScreen = { key: string; content: ReactNode };

/**
 * A device frame cycling through illustrated screen mockups (not real app
 * screenshots — see content/products.ts). Reduced-motion visitors get the
 * first screen rendered plainly, with no timer and no cross-fade, so
 * there's nothing here that depends on a viewport trigger racing the
 * reduced-motion preference.
 */
export function PhoneMockup({
  screens,
  accent = "var(--color-tech-blue)",
  intervalMs = 3200,
}: {
  screens: PhoneMockupScreen[];
  accent?: string;
  intervalMs?: number;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || screens.length <= 1) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % screens.length), intervalMs);
    return () => clearInterval(id);
  }, [shouldReduceMotion, screens.length, intervalMs]);

  const activeIndex = shouldReduceMotion ? 0 : index;
  const active = screens[activeIndex];

  return (
    <div className="mx-auto w-[260px] sm:w-[290px]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.75rem] border-[10px] border-[var(--color-navy)] bg-[var(--color-navy)] shadow-[var(--shadow-elevated)]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-[var(--color-navy)]"
        />
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[var(--color-off-white)]">
          {shouldReduceMotion ? (
            <div className="absolute inset-0">{active.content}</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {active.content}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {screens.length > 1 && (
        <div className="mt-5 flex justify-center gap-1.5" role="tablist" aria-label="App screens">
          {screens.map((screen, screenIndex) => (
            <button
              key={screen.key}
              type="button"
              role="tab"
              aria-selected={screenIndex === activeIndex}
              aria-label={`Show screen ${screenIndex + 1} of ${screens.length}`}
              onClick={() => setIndex(screenIndex)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: screenIndex === activeIndex ? 20 : 6,
                backgroundColor: screenIndex === activeIndex ? accent : "var(--line)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
