"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & { children: ReactNode };

/**
 * A drop-in replacement for next/link that, where the browser supports the
 * View Transitions API and the visitor hasn't asked for reduced motion,
 * wraps the navigation in document.startViewTransition so elements sharing
 * a view-transition-name (see lib/view-transitions.ts) morph smoothly
 * between the two pages instead of hard-cutting. Everywhere else — no
 * support, reduced motion, modified clicks (new tab, etc.) — it behaves
 * exactly like a normal Link, so this never gets in the way of navigation.
 *
 * The callback passed to startViewTransition must not resolve until the
 * new route has actually committed to the DOM — otherwise the browser
 * captures its "after" snapshot while the old page is still showing,
 * crossfades between two near-identical screenshots, and then hands back
 * a live document that's still catching up, which reads as "the page
 * didn't load" until a manual refresh. flushSync forces router.push's
 * resulting re-render to commit synchronously before the callback
 * returns, so the snapshot is accurate whenever the target route is
 * already prefetched (the common case for on-screen links); a rAF-based
 * guess had no such guarantee.
 */
export function ViewTransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) return;

    event.preventDefault();
    const target = href.toString();

    document.startViewTransition(() => {
      flushSync(() => {
        router.push(target);
      });
    });
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
