/**
 * Testimonial display component — intentionally not rendered anywhere yet.
 * No client quotation has been verified or approved for publication. Wire
 * this into a page only after MartEX supplies an attributed, consented
 * quotation (see CONTENT_INVENTORY.md).
 */
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
