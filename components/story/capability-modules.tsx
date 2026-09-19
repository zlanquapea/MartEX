import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

/**
 * Replaces a plain text-tile grid: each capability reads as a numbered
 * module wired to the others via a connector tick (the same signal motif
 * used on cards elsewhere), rather than an inert list.
 */
export function CapabilityModules({
  capabilities,
  accent = "var(--color-primary)",
}: {
  capabilities: string[];
  accent?: string;
}) {
  return (
    <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((capability, index) => (
        <StaggerItem key={capability} variant="resolve">
          <div className="group relative rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors duration-300 hover:border-[var(--color-sky)] focus-within:border-[var(--color-sky)]">
            <span
              aria-hidden="true"
              className="absolute -left-px top-1/2 hidden h-px w-4 -translate-x-full -translate-y-1/2 bg-[var(--line)] transition-colors duration-300 group-hover:bg-[var(--color-sky)] lg:block"
            />
            <span
              className="grid size-9 place-items-center rounded-lg text-xs font-bold"
              style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
            >
              0{index + 1}
            </span>
            <p className="mt-3.5 text-sm font-semibold leading-snug text-[var(--ink)]">{capability}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
