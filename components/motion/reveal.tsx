"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "./use-reduced-motion";

type RevealVariant = "resolve" | "rise";

/**
 * "Resolve" is the brand's signature entrance: content arrives slightly
 * unsettled — soft blur, a touch of scale, a small drift — and snaps into
 * crisp focus, echoing the "scattered signal becomes one clear system"
 * concept everywhere else on the site. Reserved for headline-weight
 * moments (section intros, hero copy, CTA panels).
 *
 * "Rise" is the plain, cheap fade-up used for dense repeating grids (card
 * lists) where a busier per-item effect would feel noisy rather than
 * premium. Both fully disable under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  variant = "resolve",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
  variant?: RevealVariant;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const Component = motion[as];

  const hidden =
    variant === "resolve" ? { opacity: 0, y, scale: 0.96, filter: "blur(8px)" } : { opacity: 0, y };
  const shown =
    variant === "resolve" ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 1, y: 0 };

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? undefined : hidden}
      whileInView={shouldReduceMotion ? undefined : shown}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: variant === "resolve" ? 0.7 : 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const container: Variants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion ? undefined : { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  variant?: RevealVariant;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const hidden = variant === "resolve" ? { opacity: 0, y, scale: 0.96, filter: "blur(6px)" } : { opacity: 0, y };
  const shown =
    variant === "resolve"
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      : { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } };

  const item: Variants = {
    hidden: shouldReduceMotion ? {} : hidden,
    show: shouldReduceMotion ? {} : shown,
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
