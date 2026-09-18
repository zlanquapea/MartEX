"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsReducedMotion } from "./use-reduced-motion";

/**
 * Wraps a card with a subtle cursor-follow 3D tilt plus lift, replacing a
 * plain CSS hover transform so both effects compose through one transform
 * pipeline instead of fighting a Tailwind hover class. Mouse-only — touch
 * devices and prefers-reduced-motion get the plain card with no tilt.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useIsReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 26, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 26, mass: 0.5 });
  const springLift = useSpring(lift, { stiffness: 300, damping: 26, mass: 0.5 });

  const disabled = shouldReduceMotion || isTouch;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }

  function handlePointerEnter() {
    if (disabled) return;
    lift.set(-6);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={
        disabled
          ? undefined
          : { rotateX: springRotateX, rotateY: springRotateY, y: springLift, transformPerspective: 900 }
      }
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}
