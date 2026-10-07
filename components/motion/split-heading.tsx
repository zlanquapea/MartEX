"use client";

import { motion, type Variants } from "motion/react";
import { Fragment, type ElementType } from "react";
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

  // The in-view check must observe the (unclipped) word container, not the
  // words themselves: each word starts translated fully below its
  // overflow-hidden mask, so an IntersectionObserver on the word sees zero
  // visible area and never fires — leaving every heading permanently hidden.
  const word: Variants = {
    hidden: { y: shouldReduceMotion ? "0%" : "115%" },
    show: (index: number) => ({
      y: "0%",
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.75, delay: delayStart + index * stagger, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden="true" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        {words.map((w, index) => (
          // The space between words sits outside the inline-block mask:
          // trailing whitespace inside an inline-block collapses away.
          <Fragment key={`${w}-${index}`}>
            <span className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span className={cn("inline-block will-change-transform", wordClassName)} variants={word} custom={index}>
                {w}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
