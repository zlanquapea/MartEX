"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

export type PhoneMockupScreen = { src: string; alt: string };

/**
 * A device frame cycling through real captured app screens. Reduced-motion
 * visitors get the first screen as a plain static image — no timer, no
 * cross-fade — rather than a paused-but-still-mounted carousel, so there's
 * nothing here that depends on a `whileInView`/viewport trigger racing the
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

  const active = screens[shouldReduceMotion ? 0 : index];

  return (
    <div className="mx-auto w-[260px] sm:w-[290px]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.75rem] border-[10px] border-[var(--color-navy)] bg-[var(--color-navy)] shadow-[var(--shadow-elevated)]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-[var(--color-navy)]"
        />
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
          {shouldReduceMotion ? (
            <Image src={active.src} alt={active.alt} fill sizes="290px" className="object-cover object-top" />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={active.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={active.src} alt={active.alt} fill sizes="290px" className="object-cover object-top" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {screens.length > 1 && (
        <div className="mt-5 flex justify-center gap-1.5" role="tablist" aria-label="App screens">
          {screens.map((screen, screenIndex) => (
            <button
              key={screen.src}
              type="button"
              role="tab"
              aria-selected={screenIndex === index}
              aria-label={`Show screen ${screenIndex + 1} of ${screens.length}`}
              onClick={() => setIndex(screenIndex)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: screenIndex === (shouldReduceMotion ? 0 : index) ? 20 : 6,
                backgroundColor: screenIndex === (shouldReduceMotion ? 0 : index) ? accent : "var(--line)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
