export type ClientTestimonial = {
  quote: string;
  /** Name, role, and organization exactly as the client approved, e.g. "Jane Doe, Director, Acme Ltd". */
  attribution: string;
};

/**
 * Client quotations shown on the home page under "Built, shipped, and running".
 * Add only real quotes the client has approved for publication — the section
 * stays hidden while this list is empty.
 */
export const testimonials: ClientTestimonial[] = [];
