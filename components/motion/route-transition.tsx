"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * A short fade-up as each new route arrives, so navigating feels like moving
 * to the next scene rather than an instant swap.
 *
 * This is deliberately enter-only and pure CSS. The previous version wrapped
 * the page in `AnimatePresence mode="wait"` keyed by pathname, which does not
 * work with the App Router: by the time the pathname changes, `children`
 * already renders the *new* route, so the "exiting" element faded the new
 * page out to opacity 0 and the entering element never mounted — leaving a
 * blank page until a manual refresh. A keyed div with a CSS animation has no
 * exit phase to get stuck in, and its end state is the element's natural
 * visible state, so content can never be left hidden.
 *
 * The very first page load is skipped so server-rendered content is visible
 * immediately; reduced-motion visitors get an instant swap via the global
 * prefers-reduced-motion rule in globals.css.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstPathname = useRef(pathname);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (pathname !== firstPathname.current) hasNavigated.current = true;
  }, [pathname]);

  const animate = hasNavigated.current || pathname !== firstPathname.current;

  return (
    <div key={pathname} className={animate ? "route-enter" : undefined}>
      {children}
    </div>
  );
}
