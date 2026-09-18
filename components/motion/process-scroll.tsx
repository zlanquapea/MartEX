"use client";

import { useEffect, useRef, useState } from "react";
import { processStages } from "@/content/process";
import { Reveal } from "./reveal";

/**
 * Desktop: a pinned, scroll-linked narrative driven by GSAP ScrollTrigger —
 * the one sequence in this build that genuinely needs timeline control tied
 * to scroll position. Mobile and reduced-motion users get a simple vertical
 * list instead of pinned/hijacked scrolling.
 */
export function ProcessScrollNarrative() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const connectorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReducedMotion || !isDesktop || !wrapperRef.current) return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const panels = panelRefs.current.filter((el): el is HTMLDivElement => Boolean(el));

        gsap.set(panels, { opacity: 0.25, y: 16 });
        gsap.set(panels[0], { opacity: 1, y: 0 });

        if (connectorRef.current) {
          gsap.set(connectorRef.current, { scaleY: 0 });
          gsap.to(connectorRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
        }

        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });

          gsap.to(panel, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
              end: "top 35%",
              scrub: true,
            },
          });
        });
      }, wrapperRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* Desktop: pinned scroll-linked narrative */}
      <div ref={wrapperRef} className="relative hidden lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div className="sticky top-32 h-fit">
          <ol className="grid gap-4">
            {processStages.map((stage, index) => (
              <li
                key={stage.stage}
                className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition-colors duration-300 ${
                  activeIndex === index
                    ? "border-[var(--color-sky)] bg-[var(--color-sky)]/10"
                    : "border-transparent"
                }`}
              >
                <span
                  className={`font-mono text-sm transition-colors ${
                    activeIndex === index ? "text-[var(--cta)]" : "text-[var(--ink-muted)]"
                  }`}
                >
                  {stage.number}
                </span>
                <span className={activeIndex === index ? "font-bold text-[var(--ink)]" : "text-[var(--ink-muted)]"}>
                  {stage.stage}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative grid gap-32 py-8">
          <div
            aria-hidden="true"
            className="absolute -left-8 top-0 h-full w-px origin-top bg-gradient-to-b from-[var(--color-tech-blue)] to-[var(--color-sky)]"
            ref={connectorRef}
          />
          {processStages.map((stage, index) => (
            <div
              key={stage.stage}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-10"
            >
              <span className="font-mono text-sm text-[var(--cta)]">{stage.number}</span>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">{stage.stage}</h3>
              <p className="mt-3 max-w-lg text-[var(--ink-muted)]">{stage.summary}</p>
              <ul className="mt-6 grid gap-2.5">
                {stage.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5 text-sm text-[var(--ink-muted)]">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-sky)]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / reduced motion: simple vertical sequence */}
      <ol className="grid gap-6 lg:hidden">
        {processStages.map((stage, index) => (
          <Reveal key={stage.stage} delay={index * 0.05} as="li">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
              <span className="font-mono text-sm text-[var(--cta)]">{stage.number}</span>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{stage.stage}</h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">{stage.summary}</p>
              <ul className="mt-4 grid gap-2">
                {stage.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-[var(--ink-muted)]">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-sky)]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  );
}
