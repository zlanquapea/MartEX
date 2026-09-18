import Image from "next/image";
import { cn } from "@/lib/utils";
import logoMark from "@/public/brand/martex-logo-mark.png";

/**
 * Official MartEX wordmark, trimmed from the approved brand asset (no
 * redrawing, distortion, or recoloring). The mark's "Mart" glyphs are dark
 * navy, which disappears against the dark theme's navy surfaces — rather
 * than recolor the approved file, it sits on a fixed, theme-independent
 * off-white chip so it stays legible in both themes without altering the
 * asset itself. In light mode the chip is visually identical to the page
 * background, so it reads as no chip at all.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl border border-[var(--line)] bg-[var(--color-off-white)] px-2.5 py-1.5",
        className
      )}
    >
      <Image src={logoMark} alt="MartEX" priority className="h-7 w-auto" />
    </span>
  );
}
