import { cn } from "@/lib/utils";

/**
 * Placeholder brand mark. No approved MartEX logo asset was supplied to this
 * build (see CONTENT_INVENTORY.md). This SVG wordmark uses the confirmed
 * brand palette and is intentionally simple so it can be swapped for the
 * approved logo file without touching layout code — replace the contents of
 * this component (or point it at /public/logo.svg via next/image) once the
 * asset is provided. Never stretch, recolor, or crop the approved mark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect width="34" height="34" rx="9" fill="var(--color-navy)" />
        <path
          d="M8 24V10l6.2 8.4L20.4 10v14"
          stroke="url(#martex-logo-gradient)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="10" r="2.4" fill="var(--color-sky)" />
        <defs>
          <linearGradient id="martex-logo-gradient" x1="8" y1="10" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-tech-blue)" />
            <stop offset="1" stopColor="var(--color-sky)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-extrabold tracking-tight text-[var(--ink)]">
        Mart<span className="text-[var(--cta)]">EX</span>
      </span>
    </span>
  );
}
