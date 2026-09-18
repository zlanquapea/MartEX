"use client";

import { motion } from "motion/react";
import { useIsReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * A branching set of dead ends resolving into one clear, milestoned path —
 * used for Technology Consulting.
 */
export function RoadmapPath({
  deadEnds,
  milestones,
  accent = "var(--color-sky)",
}: {
  deadEnds: string[];
  milestones: string[];
  accent?: string;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const width = 600;
  const height = 220;
  const startX = 50;
  const endX = width - 50;
  const pathY = height - 46;

  const milestonePoints = milestones.map((label, index) => ({
    label,
    x: startX + (index * (endX - startX)) / (milestones.length - 1),
    y: pathY,
  }));

  const deadEndPaths = deadEnds.map((label, index) => {
    const dropY = pathY - 66 - index * 24;
    const controlX = startX + 55 + index * 26;
    const tipX = startX + 120 + index * 36;
    return {
      label,
      d: `M ${startX} ${pathY} Q ${controlX} ${dropY} ${tipX} ${dropY}`,
      tipX,
      tipY: dropY,
    };
  });

  const linePath = `M ${milestonePoints.map((point) => `${point.x} ${point.y}`).join(" L ")}`;

  return (
    <div
      role="img"
      aria-label={`Roadmap moving past unclear options — ${deadEnds.join(", ")} — to a clear path: ${milestones.join(", then ")}`}
      className="w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-hidden="true">
        {deadEndPaths.map((path) => (
          <g key={path.label} opacity={0.5}>
            <path d={path.d} fill="none" stroke="var(--ink-muted)" strokeWidth={1.5} strokeDasharray="3 5" />
            <circle cx={path.tipX} cy={path.tipY} r={3} fill="var(--ink-muted)" />
            <text x={path.tipX} y={path.tipY - 8} fontSize={9} fontWeight={600} textAnchor="middle" fill="var(--ink-muted)">
              {path.label}
            </text>
          </g>
        ))}

        {shouldReduceMotion ? (
          <path d={linePath} fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" />
        ) : (
          <motion.path
            d={linePath}
            fill="none"
            stroke={accent}
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        )}

        {milestonePoints.map((point, index) => (
          <motion.g
            key={point.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.4, delay: 0.3 + index * 0.22, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <circle cx={point.x} cy={point.y} r={8} fill="var(--surface)" stroke={accent} strokeWidth={3} />
            <text x={point.x} y={point.y + 26} fontSize={11} fontWeight={700} textAnchor="middle" fill="var(--ink)">
              {point.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
