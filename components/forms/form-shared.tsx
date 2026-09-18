"use client";

import { CheckCircle2, CircleAlert } from "lucide-react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export function ProgressBar({ current, total, labels }: { current: number; total: number; labels: string[] }) {
  return (
    <div className="mb-10">
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}: ${labels[current - 1]}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--line)]"
      >
        <div
          className="h-full rounded-full bg-[var(--cta)] transition-all duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <ol className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        {labels.map((label, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber < current;
          const isActive = stepNumber === current;
          return (
            <li
              key={label}
              className={
                isActive
                  ? "text-[var(--cta)]"
                  : isDone
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-muted)]"
              }
            >
              {isDone ? (
                <CheckCircle2 size={14} aria-hidden="true" className="mr-1.5 inline -translate-y-px" />
              ) : (
                <span className="mr-1.5 font-mono text-xs">{stepNumber}.</span>
              )}
              {label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function FormStatusBanner({ status, message }: { status: "error" | "success"; message: string }) {
  const Icon = status === "success" ? CheckCircle2 : CircleAlert;
  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${
        status === "success"
          ? "border-[var(--color-sky)]/40 bg-[var(--color-sky)]/10 text-[var(--ink)]"
          : "border-[#c4453a]/30 bg-[#c4453a]/10 text-[var(--ink)]"
      }`}
    >
      <Icon size={18} aria-hidden="true" className={status === "success" ? "text-[var(--cta)]" : "text-[#c4453a]"} />
      <p>{message}</p>
    </div>
  );
}

/** Honeypot field: hidden from sighted and screen-reader users, never focusable via keyboard. */
export function Honeypot<T extends FieldValues>({ register }: { register: UseFormRegister<T> }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website" as Path<T>)} />
    </div>
  );
}
