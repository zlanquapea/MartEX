"use client";

import { motion } from "motion/react";
import { CheckCircle2, Cloud, Smartphone, WifiOff } from "lucide-react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * Field work captured offline, syncing the moment a connection returns —
 * used for Mobile Application Development.
 */
export function ConnectivitySync({
  offlineActions,
  onlineResult,
  accent = "var(--color-sky)",
}: {
  offlineActions: string[];
  onlineResult: string;
  accent?: string;
}) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <div
      className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-4"
      role="img"
      aria-label={`Field device capturing ${offlineActions.join(", ")} offline, then syncing: ${onlineResult}`}
    >
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">
          <Smartphone size={16} aria-hidden="true" />
          Field device
          <WifiOff size={14} aria-hidden="true" className="ml-auto" />
        </div>
        <ul className="mt-4 grid gap-2">
          {offlineActions.map((action, index) => (
            <motion.li
              key={action}
              initial={{ opacity: 0, x: -8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              animate={shouldReduceMotion ? { opacity: 1, x: 0 } : undefined}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }
              }
              className="flex items-center gap-2 rounded-lg bg-[var(--color-sky)]/10 px-3 py-2 text-sm text-[var(--ink)]"
            >
              <CheckCircle2 size={14} aria-hidden="true" style={{ color: accent }} className="shrink-0" />
              {action}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative hidden h-1 w-16 justify-self-center rounded-full bg-[var(--line)] sm:block" aria-hidden="true">
        {!shouldReduceMotion &&
          [0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full"
              style={{ background: accent }}
              initial={{ left: "0%", opacity: 0 }}
              whileInView={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.6, delay: 1 + index * 0.3, ease: "easeInOut" }}
            />
          ))}
      </div>

      <div className="rounded-2xl border-2 bg-[var(--surface)] p-5 text-center" style={{ borderColor: accent }}>
        <Cloud size={28} aria-hidden="true" className="mx-auto" style={{ color: accent }} />
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-60px" }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 1.5 }}
          className="mt-3 text-sm font-bold text-[var(--ink)]"
        >
          {onlineResult}
        </motion.p>
      </div>
    </div>
  );
}
