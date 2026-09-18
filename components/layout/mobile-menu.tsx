"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/company";
import { ThemeToggle } from "./theme";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] lg:hidden"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[var(--color-navy)]/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-sm flex-col gap-8 bg-[var(--surface)] p-7 shadow-[var(--shadow-elevated)] duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-bold uppercase tracking-widest text-[var(--ink-muted)]">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3.5 text-2xl font-bold tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--cta)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-4">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-full bg-[var(--cta)] px-6 text-sm font-semibold text-[var(--cta-ink)]"
            >
              Book a Consultation
            </Link>
            <div className="flex items-center justify-between rounded-2xl border border-[var(--line)] px-4 py-3">
              <span className="text-sm font-semibold text-[var(--ink-muted)]">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
