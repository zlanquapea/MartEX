"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/services";

export function FaqAccordion({ items }: { items: Faq[] }) {
  if (items.length === 0) return null;

  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
      {items.map((item, index) => (
        <Accordion.Item value={`faq-${index}`} key={item.question}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-[var(--ink)] outline-none focus-visible:text-[var(--cta)]">
              {item.question}
              <ChevronDown
                size={18}
                aria-hidden="true"
                className="shrink-0 text-[var(--ink-muted)] transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-[var(--ink-muted)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="pb-5 leading-relaxed">{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
