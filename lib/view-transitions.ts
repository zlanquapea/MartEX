/** Shared naming so the case-study card and its detail page's heading agree
 * on the same view-transition-name without duplicating the string. */
export function caseStudyTitleTransitionName(slug: string) {
  return `case-title-${slug}`;
}
