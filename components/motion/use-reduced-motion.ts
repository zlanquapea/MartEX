"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors prefers-reduced-motion without branching the very first render.
 * The server (and the client's pre-hydration pass) always assume motion is
 * allowed; the real preference is applied in an effect immediately after
 * mount. Reading window.matchMedia synchronously during render would make
 * the client's first render diverge from the server-rendered markup and
 * trigger a hydration mismatch.
 */
export function useIsReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handleChange = () => setReduced(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
