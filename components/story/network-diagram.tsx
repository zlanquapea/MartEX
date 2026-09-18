"use client";

import { motion } from "motion/react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * Disconnected sources wiring themselves into one connected center. Used
 * for services whose real story is integration or consolidation (Custom
 * Software Development, Systems Integration) — the node labels and count
 * come from content/service-visuals.ts per service.
 */
export function NetworkDiagram({
  nodes,
  centerLabel,
  accent = "var(--color-primary)",
}: {
  nodes: string[];
  centerLabel: string;
  accent?: string;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 118;

  const points = nodes.map((label, index) => {
    const angle = (2 * Math.PI * index) / nodes.length - Math.PI / 2;
    return {
      label,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <div
      role="img"
      aria-label={`Diagram showing ${nodes.join(", ")} connecting into ${centerLabel}`}
      className="relative aspect-square w-full max-w-sm justify-self-center"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden="true">
        {points.map((point, index) =>
          shouldReduceMotion ? (
            <line
              key={`line-${point.label}`}
              x1={point.x}
              y1={point.y}
              x2={cx}
              y2={cy}
              stroke={accent}
              strokeWidth={1.5}
              strokeDasharray="4 5"
              opacity={0.6}
            />
          ) : (
            <motion.line
              key={`line-${point.label}`}
              x1={point.x}
              y1={point.y}
              x2={cx}
              y2={cy}
              stroke={accent}
              strokeWidth={1.5}
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15 * index, ease: "easeOut" }}
            />
          )
        )}

        {!shouldReduceMotion &&
          points.map((point, index) => (
            <motion.circle
              key={`pulse-${point.label}`}
              r={3}
              fill={accent}
              initial={{ cx: point.x, cy: point.y, opacity: 0 }}
              whileInView={{
                cx: [point.x, cx],
                cy: [point.y, cy],
                opacity: [0, 1, 0],
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 1.6,
                delay: 1 + index * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

        {points.map((point, index) => (
          <motion.g
            key={point.label}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <rect
              x={point.x - 46}
              y={point.y - 16}
              width={92}
              height={32}
              rx={9}
              fill="var(--surface)"
              stroke="var(--line)"
            />
            <text x={point.x} y={point.y + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--ink-muted)">
              {point.label}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={{ opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-60px" }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x={cx - 58} y={cy - 26} width={116} height={52} rx={14} fill="var(--color-navy)" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="white">
            {centerLabel}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
