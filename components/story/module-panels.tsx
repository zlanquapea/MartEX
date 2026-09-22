import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { LichenModuleGroup } from "@/content/products";

/**
 * The three-panel breakdown of what Lichen MD does, in plain language —
 * each panel keeps its grouping and the note/highlight callouts the
 * brochure ties to specific panels, without the internal module codes.
 */
export function ModulePanels({ groups, accent = "var(--color-primary)" }: { groups: LichenModuleGroup[]; accent?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {groups.map((group, groupIndex) => (
        <div key={group.title} className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            0{groupIndex + 1}
          </p>
          <h3 className="mt-2 text-lg font-bold tracking-tight">{group.title}</h3>
          <StaggerGroup className="mt-5 grid gap-3.5">
            {group.modules.map((module) => (
              <StaggerItem key={module.title} variant="rise">
                <div className="rounded-2xl border border-[var(--line)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">{module.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--ink-muted)]">{module.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          {group.note && (
            <p
              className="mt-4 rounded-xl p-3.5 text-xs leading-relaxed text-[var(--ink-muted)]"
              style={{ backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }}
            >
              {group.note}
            </p>
          )}
          {group.highlight && (
            <div className="mt-4 rounded-xl border p-4" style={{ borderColor: accent }}>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                Built for speed
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">{group.highlight.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ink-muted)]">{group.highlight.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
