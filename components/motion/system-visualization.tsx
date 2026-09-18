"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useIsReducedMotion } from "./use-reduced-motion";

type Node = { id: string; x: number; y: number; label: string };

const nodes: Node[] = [
  { id: "files", x: 62, y: 78, label: "Files" },
  { id: "records", x: 332, y: 58, label: "Records" },
  { id: "requests", x: 344, y: 302, label: "Requests" },
  { id: "tasks", x: 66, y: 316, label: "Tasks" },
];

const center = { x: 200, y: 190 };

/**
 * Hero system visualization: scattered operational inputs resolve into a
 * single connected dashboard. Built with SVG + Motion for a controlled,
 * performant sequence. Pointer parallax is restrained and mouse-only;
 * touch devices and prefers-reduced-motion both get a calm, static result.
 */
export function SystemVisualization() {
  const shouldReduceMotion = useIsReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotateX = useTransform(springY, [-40, 40], [4, -4]);
  const rotateY = useTransform(springX, [-40, 40], [-4, 4]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 80);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 80);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const animate = !shouldReduceMotion;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="img"
      aria-label="Diagram showing scattered files, records, requests, and tasks connecting into one unified MartEX operational dashboard"
      className="relative aspect-square w-full max-w-[520px] justify-self-center rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-elevated)]"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-70 [background-size:36px_36px]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          maskImage: "radial-gradient(circle at 50% 40%, black, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <motion.svg
        viewBox="0 0 400 380"
        className="relative h-full w-full"
        style={animate ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
        aria-hidden="true"
      >
        {nodes.map((node, index) =>
          animate ? (
            <motion.line
              key={`line-${node.id}`}
              x1={node.x}
              y1={node.y}
              x2={center.x}
              y2={center.y}
              stroke="var(--color-sky)"
              strokeWidth={1.5}
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.12, ease: "easeOut" }}
            />
          ) : (
            <line
              key={`line-${node.id}`}
              x1={node.x}
              y1={node.y}
              x2={center.x}
              y2={center.y}
              stroke="var(--color-sky)"
              strokeWidth={1.5}
              strokeDasharray="4 5"
              opacity={0.7}
            />
          )
        )}

        {animate &&
          nodes.map((node, index) => (
            <motion.circle
              key={`pulse-${node.id}`}
              r={3.5}
              fill="var(--color-tech-blue)"
              initial={{ cx: node.x, cy: node.y, opacity: 0 }}
              animate={{ cx: [node.x, center.x], cy: [node.y, center.y], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 1.4,
                delay: 1.6 + index * 0.35,
                ease: "easeInOut",
              }}
            />
          ))}

        {nodes.map((node, index) =>
          animate ? (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <NodeCard node={node} />
            </motion.g>
          ) : (
            <g key={node.id}>
              <NodeCard node={node} />
            </g>
          )
        )}

        {animate ? (
          <motion.g
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardPanel animate />
          </motion.g>
        ) : (
          <g>
            <DashboardPanel animate={false} />
          </g>
        )}
      </motion.svg>
    </div>
  );
}

function NodeCard({ node }: { node: Node }) {
  return (
    <>
      <rect x={node.x - 34} y={node.y - 18} width={68} height={36} rx={10} fill="var(--surface)" stroke="var(--line)" />
      <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--ink-muted)">
        {node.label}
      </text>
    </>
  );
}

const barWidths = [100, 78, 60];

function DashboardPanel({ animate }: { animate: boolean }) {
  return (
    <>
      <rect x={center.x - 66} y={center.y - 56} width={132} height={112} rx={18} fill="var(--color-navy)" />
      <text x={center.x - 50} y={center.y - 30} fontSize={8} fontWeight={700} letterSpacing="0.1em" fill="var(--color-pale)">
        CONNECTED SYSTEM
      </text>
      {barWidths.map((width, row) =>
        animate ? (
          <motion.rect
            key={row}
            x={center.x - 50}
            y={center.y - 14 + row * 16}
            height={7}
            rx={3.5}
            fill={row === 0 ? "var(--color-sky)" : row === 1 ? "var(--color-tech-blue)" : "var(--color-pale)"}
            initial={{ width: 0 }}
            animate={{ width }}
            transition={{ duration: 0.5, delay: 1.5 + row * 0.15 }}
          />
        ) : (
          <rect
            key={row}
            x={center.x - 50}
            y={center.y - 14 + row * 16}
            width={width}
            height={7}
            rx={3.5}
            fill={row === 0 ? "var(--color-sky)" : row === 1 ? "var(--color-tech-blue)" : "var(--color-pale)"}
          />
        )
      )}
    </>
  );
}
