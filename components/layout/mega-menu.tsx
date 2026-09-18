"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { services } from "@/content/services";
import { solutions, solutionCategories } from "@/content/solutions";

const triggerClasses =
  "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-[var(--ink)] outline-none transition-colors hover:text-[var(--cta)] data-[state=open]:text-[var(--cta)]";

export function MegaMenu() {
  return (
    <NavigationMenu.Root className="relative" delayDuration={80}>
      <NavigationMenu.List className="flex items-center gap-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerClasses}>
            Services
            <ChevronDown size={14} aria-hidden="true" className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0 data-[motion=from-start]:slide-in-from-left-4">
            <div className="grid w-[560px] grid-cols-2 gap-1 p-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-xl p-3 transition-colors hover:bg-[var(--color-sky)]/10"
                >
                  <p className="text-sm font-bold text-[var(--ink)]">{service.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--ink-muted)] line-clamp-2">
                    {service.shortDescription}
                  </p>
                </Link>
              ))}
              <Link
                href="/services"
                className="col-span-2 mt-1 flex items-center justify-between rounded-xl border border-[var(--line)] p-3 text-sm font-semibold text-[var(--cta)] hover:border-[var(--color-sky)]"
              >
                View all services
              </Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerClasses}>
            Solutions
            <ChevronDown size={14} aria-hidden="true" className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0 data-[motion=from-start]:slide-in-from-left-4">
            <div className="w-[620px] p-4">
              <div className="grid grid-cols-3 gap-1.5">
                {solutionCategories.map((category) => {
                  const match = solutions.find((solution) => solution.category === category);
                  if (!match) return null;
                  return (
                    <Link
                      key={category}
                      href={`/solutions/${match.slug}`}
                      className="rounded-xl border border-transparent p-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--line)] hover:bg-[var(--color-sky)]/10"
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/solutions"
                className="mt-3 flex items-center justify-between rounded-xl border border-[var(--line)] p-3 text-sm font-semibold text-[var(--cta)] hover:border-[var(--color-sky)]"
              >
                Explore all solutions
              </Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {[
          { label: "Work", href: "/work" },
          { label: "About", href: "/about" },
          { label: "Process", href: "/process" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <Link href={link.href} className={triggerClasses}>
                {link.label}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}

        <NavigationMenu.Indicator className="top-full z-10 flex h-2 items-end justify-center overflow-hidden transition-[width,transform] duration-300 data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in">
          <div className="relative top-[2px] size-2.5 rotate-45 rounded-tl-sm bg-[var(--surface)]" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center pt-3">
        <NavigationMenu.Viewport className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-elevated)] transition-[width,height] duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95" />
      </div>
    </NavigationMenu.Root>
  );
}
