"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { HeaderProgressBar } from "@/components/motion/scroll-progress";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled && "border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl"
      )}
    >
      <div className="container-page flex h-[76px] items-center gap-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="ml-4 hidden lg:block">
          <MegaMenu />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <Link
            href="/book"
            className="hidden min-h-11 items-center rounded-full bg-[var(--cta)] px-5 text-sm font-semibold text-[var(--cta-ink)] transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            Book a Consultation
          </Link>
          <MobileMenu />
        </div>
      </div>
      <HeaderProgressBar />
    </header>
  );
}
