import { AlertCircle, ArrowRight, Cog, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Scenario } from "@/content/services";

const beats = [
  { key: "situation", label: "Situation", icon: AlertCircle },
  { key: "whatChanges", label: "What changes", icon: TrendingUp },
  { key: "howItOperates", label: "How it operates", icon: Cog },
  { key: "result", label: "Result", icon: TrendingUp },
] as const;

/**
 * A real-world scenario told in four beats — situation, what changes, how
 * it operates, result — instead of a single paragraph. Shared across every
 * service page; only the content and accent change.
 */
export function ScenarioStory({ scenario, accent = "var(--color-primary)" }: { scenario: Scenario; accent?: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {beats.map((beat, index) => {
        const Icon = beat.icon;
        return (
          <div key={beat.key} className="relative">
            <Reveal delay={index * 0.08} variant="resolve" className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <span
                  className="grid size-10 place-items-center rounded-xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                  {beat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{scenario[beat.key]}</p>
              </div>
            </Reveal>
            {index < beats.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                size={18}
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[var(--ink-muted)] lg:block"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
