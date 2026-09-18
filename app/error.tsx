"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-[var(--color-sky)]/12 text-[var(--cta)]">
        <AlertTriangle size={30} aria-hidden="true" />
      </span>
      <p className="mt-6 font-mono text-sm font-bold tracking-widest text-[var(--cta)]">SOMETHING WENT WRONG</p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] tracking-tight">An unexpected error occurred.</h1>
      <p className="mt-4 max-w-md text-[var(--ink-muted)]">
        This has been logged. You can try again, or head back to the homepage.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--cta)] px-6 text-sm font-semibold text-[var(--cta-ink)]"
        >
          Try again
        </button>
        <Button href="/" variant="secondary">
          Return home
        </Button>
      </div>
    </div>
  );
}
