"use client";

import { motion } from "motion/react";
import {
  Activity,
  BarChart3,
  Boxes,
  FolderKanban,
  LayoutDashboard,
  MapPin,
  Plug,
  Receipt,
  ShoppingCart,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { SolutionCategory } from "@/content/solutions";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

const categoryIcons: Record<SolutionCategory, LucideIcon> = {
  "Sales & CRM": Users,
  "Inventory & Procurement": Boxes,
  "Finance & Billing": Receipt,
  "HR & Workforce": UserCog,
  "Records & Workflow": FolderKanban,
  "Analytics & Reporting": BarChart3,
  "Customer Portals": LayoutDashboard,
  "E-commerce": ShoppingCart,
  "Field Operations": MapPin,
  "Program Monitoring": Activity,
  Integrations: Plug,
};

const rowWidths = [92, 74, 84, 62];

/**
 * A themed, animated dashboard mock replacing a static "coming soon"
 * placeholder — still honestly labeled "Concept," but it now shows the
 * shape of the solution instead of an empty box.
 */
export function SolutionPreview({
  category,
  features,
  accent = "var(--color-tech-blue)",
}: {
  category: SolutionCategory;
  features: string[];
  accent?: string;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const Icon = categoryIcons[category] ?? LayoutDashboard;
  const rows = features.slice(0, 4);

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-5 py-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[var(--line)]" />
          <span className="size-2 rounded-full bg-[var(--line)]" />
          <span className="size-2 rounded-full bg-[var(--line)]" />
        </span>
        <span className="ml-2 flex items-center gap-1.5 text-xs font-bold text-[var(--ink-muted)]">
          <Icon size={14} aria-hidden="true" style={{ color: accent }} />
          {category}
        </span>
        <span
          className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}
        >
          Concept
        </span>
      </div>
      <div className="grid gap-4 p-6">
        {rows.map((feature, index) => {
          const width = `${rowWidths[index % rowWidths.length]}%`;
          return (
            <div key={feature} className="grid gap-1.5">
              {shouldReduceMotion ? (
                <div
                  className="h-2.5 rounded-full"
                  style={{ width, backgroundColor: accent, opacity: 0.16 + index * 0.05 }}
                />
              ) : (
                <motion.div
                  className="h-2.5 rounded-full"
                  style={{ backgroundColor: accent, opacity: 0.16 + index * 0.05 }}
                  initial={{ width: "0%" }}
                  whileInView={{ width }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <p className="truncate text-xs font-medium text-[var(--ink-muted)]">{feature}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
