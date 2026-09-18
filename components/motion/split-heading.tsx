"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { useIsReducedMotion } from "./use-reduced-motion";

/**
 * The site's signature headline treatment: each word sits inside a masked
 * (overflow-hidden) box and slides up into view as its own reveal, rather
 * than the heading simply fading in as one block. Reads as text "settling
 * into place," matching the resolve motif used elsewhere, at effectively
 * no extra cost (pure transform/opacity).
 *
 * Accessible by construction: the real text is present as a normal text
 * node for screen readers and search engines; the per-word animation runs
 * over an aria-hidden duplicate.
 */
export function SplitHeading({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delayStart = 0,
  stagger = 0.05,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delayStart?: number;
  stagger?: number;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span
              className={cn("inline-block will-change-transform", wordClassName)}
              initial={shouldReduceMotion ? undefined : { y: "115%" }}
              whileInView={shouldReduceMotion ? undefined : { y: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: delayStart + index * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
