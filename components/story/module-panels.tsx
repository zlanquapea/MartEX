import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Tag } from "@/components/ui/primitives";
import type { LichenModuleGroup } from "@/content/products";

/**
 * The three-panel module breakdown from Lichen MD's own brochure, rendered
 * as connected cards instead of a flat feature list — each panel keeps its
 * grouping, tag codes, and the note/highlight callouts the brochure ties to
 * specific panels.
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
                  <div className="flex flex-wrap gap-1.5">
                    {module.tags.map((tag) => (
                      <Tag
                        key={tag}
                        style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <p className="mt-2.5 text-sm font-semibold text-[var(--ink)]">{module.title}</p>
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
