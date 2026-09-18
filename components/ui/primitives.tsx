import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Inbox, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--cta)] text-[var(--cta-ink)] border-transparent hover:brightness-110 active:brightness-95",
  secondary:
    "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--color-sky)]",
  ghost: "bg-transparent text-[var(--ink)] border-transparent hover:bg-[var(--surface)]",
};

const baseButtonClasses =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-offset-4";

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  icon = true,
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  icon?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseButtonClasses, buttonVariants[variant], className)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseButtonClasses, buttonVariants[variant], className)} {...props}>
      {content}
    </Link>
  );
}

export function SubmitButton({
  children,
  loading,
  className,
}: {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(baseButtonClasses, buttonVariants.primary, "disabled:opacity-60", className)}
    >
      {loading && <Loader2 size={16} aria-hidden="true" className="animate-spin" />}
      <span>{children}</span>
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--cta)]">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "split",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "split" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6",
        align === "split" ? "md:flex-row md:items-end md:justify-between" : "items-center text-center"
      )}
    >
      <div className={cn("max-w-xl", align === "center" && "max-w-2xl")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05] tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className={cn("max-w-md text-base text-[var(--ink-muted)]", align === "center" && "max-w-2xl")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-[var(--color-sky)]/12 px-2.5 py-1 text-xs font-bold text-[var(--cta)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 text-sm text-[var(--ink-muted)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--cta)]">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[var(--ink)]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
}: {
  title: string;
  description: string;
  icon?: typeof Inbox;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-[var(--line)] px-8 py-16 text-center">
      <Icon size={28} aria-hidden="true" className="text-[var(--ink-muted)]" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-[var(--ink-muted)]">{description}</p>
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-[var(--ink-muted)]">
      <Loader2 size={20} aria-hidden="true" className="animate-spin" />
      <span>{label}…</span>
    </div>
  );
}

export function Field({
  label,
  children,
  error,
  hint,
  required,
  htmlFor,
}: {
  label: string;
  children: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[var(--ink)]">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {!required && <span className="ml-1 font-normal text-[var(--ink-muted)]">(optional)</span>}
      </label>
      {hint && <p className="text-xs text-[var(--ink-muted)]">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-[#c4453a]">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-muted)]/70 focus:border-[var(--color-sky)] aria-[invalid=true]:border-[#c4453a]";
