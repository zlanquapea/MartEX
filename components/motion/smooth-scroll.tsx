"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide inertia scrolling. Deliberately skipped for touch pointers
 * (native momentum scroll already feels right there and Lenis fights it)
 * and for prefers-reduced-motion (native instant scroll instead). Wired
 * into GSAP's own ticker so ScrollTrigger-driven sequences (the process
 * narrative, the connector lines) stay perfectly in sync with the
 * smoothed scroll position rather than the raw one.
 */
export function SmoothScroll() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 0,
      syncTouch: false,
    });

    let rafId: number;
    let cleanupGsap: (() => void) | undefined;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      ScrollTrigger.refresh();

      cleanupGsap = () => lenis.off("scroll", onScroll);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      cleanupGsap?.();
      lenis.destroy();
    };
  }, []);

  return null;
}
