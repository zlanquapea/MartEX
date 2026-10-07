/** A single client quotation; fed from content/testimonials.ts. */
export function Testimonial({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
      <blockquote className="text-lg leading-relaxed text-[var(--ink)]">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-[var(--ink-muted)]">{attribution}</figcaption>
    </figure>
  );
}
