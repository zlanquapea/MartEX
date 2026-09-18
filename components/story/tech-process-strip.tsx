import { Reveal } from "@/components/motion/reveal";

/**
 * A condensed, connected version of the delivery approach — replacing a
 * plain numbered text list with the same spine-and-dot language used by
 * the site's main process page, scoped to this one service.
 */
export function TechProcessStrip({ steps, accent = "var(--color-primary)" }: { steps: string[]; accent?: string }) {
  return (
    <ol className="grid gap-6 border-l-2 border-[var(--line)] pl-7">
      {steps.map((step, index) => (
        <Reveal key={step} as="li" delay={index * 0.06} y={12} className="relative">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 bg-[var(--bg)]"
            style={{ borderColor: accent }}
          />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            Step 0{index + 1}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-muted)]">{step}</p>
        </Reveal>
      ))}
    </ol>
  );
}
