import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-[var(--color-sky)]/12 text-[var(--cta)]">
        <Compass size={30} aria-hidden="true" />
      </span>
      <p className="mt-6 font-mono text-sm font-bold tracking-widest text-[var(--cta)]">ERROR 404</p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] tracking-tight">This page took a wrong turn.</h1>
      <p className="mt-4 max-w-md text-[var(--ink-muted)]">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back to something useful.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button href="/">Return home</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
      <p className="mt-10 text-sm text-[var(--ink-muted)]">
        Looking for something specific? Try{" "}
        <Link href="/services" className="font-semibold text-[var(--cta)]">
          Services
        </Link>{" "}
        or{" "}
        <Link href="/work" className="font-semibold text-[var(--cta)]">
          Work
        </Link>
        .
      </p>
    </div>
  );
}
