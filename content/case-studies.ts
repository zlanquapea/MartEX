export type CaseStudy = {
  slug: string;
  title: string;
  industry: import("./solutions").Industry;
  serviceSlug: string;
  solutionSlug: string;
  summary: string;
  clientContext?: string;
  challenge?: string;
  discovery?: string;
  solution?: string;
  uxTechnicalApproach?: string;
  implementation?: string;
  outcomes?: string;
  technologyUsed?: string[];
  clientQuote?: { quote: string; attribution: string };
  isConcept: true;
};

/**
 * No verified client case studies exist yet. These entries are explicitly
 * labeled "Concept solution" capability demonstrations — no client names,
 * results, or quotations are invented. Replace with verified case studies
 * (with client consent) once available; unset optional fields are hidden
 * automatically by the case-study template.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "concept-records-workflow-modernization",
    title: "Modernizing a paper-based records and case workflow",
    industry: "Government",
    serviceSlug: "information-management-systems",
    solutionSlug: "records-case-workflow",
    summary:
      "A concept demonstration of how MartEX would approach replacing a paper-based case and records process with a structured, searchable digital workflow.",
    challenge:
      "A public institution's case files are tracked entirely on paper, spread across several offices. Finding the status of a case takes days, and there is no reliable way to report on caseload across the organization.",
    discovery:
      "Discovery would map the case lifecycle end to end, identify every point a file changes hands, and confirm which information must be captured, retained, and reported at each stage.",
    solution:
      "A structured case-management application replacing paper files, with defined stages, role-based access, document attachments, and status reporting.",
    uxTechnicalApproach:
      "Interfaces would be designed around the existing case stages case officers already use, so the system matches familiar language and steps rather than introducing new terminology.",
    technologyUsed: ["Web application", "Role-based access control", "Structured case data model"],
    isConcept: true,
  },
  {
    slug: "concept-field-data-modernization",
    title: "Bringing field data collection online for a monitoring program",
    industry: "NGOs",
    serviceSlug: "mobile-application-development",
    solutionSlug: "field-data-collection",
    summary:
      "A concept demonstration of how MartEX would replace paper-based field forms with an offline-capable mobile data-collection tool.",
    challenge:
      "Field officers complete paper monitoring forms across multiple sites with limited connectivity. Compiling results into a program report currently takes weeks after each collection cycle.",
    discovery:
      "Discovery would confirm the indicators being tracked, the conditions field officers work under, and how compiled data currently reaches program managers and funders.",
    solution:
      "An offline-ready mobile data-collection application that syncs to a central dashboard once connectivity is available, replacing manual compilation.",
    outcomes:
      "As a concept, the expected outcome is significantly faster reporting turnaround and more consistent data quality across sites — to be verified against a real deployment.",
    technologyUsed: ["Mobile application", "Offline data sync", "Reporting dashboard"],
    isConcept: true,
  },
  {
    slug: "concept-billing-payment-visibility",
    title: "Giving a growing business visibility into billing and payments",
    industry: "SMEs",
    serviceSlug: "custom-software-development",
    solutionSlug: "billing-invoicing-payments",
    summary:
      "A concept demonstration of how MartEX would replace spreadsheet-based invoicing with a connected billing and payment-tracking workflow.",
    challenge:
      "A growing service business tracks invoices and payments in spreadsheets maintained by different staff, making it hard to know which accounts are overdue.",
    solution:
      "A billing and payment-tracking application generating invoices, recording payments, and surfacing outstanding balances in one shared view.",
    uxTechnicalApproach:
      "The interface would prioritize the two most frequent tasks — issuing an invoice and checking outstanding balances — so daily use requires minimal training.",
    technologyUsed: ["Web application", "Payment gateway integration point"],
    isConcept: true,
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
