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
  /**
   * "product": a product MartEX designed, built, and runs itself — real work,
   * described from the product's own documentation.
   * "concept": a labeled capability demonstration with no real client.
   */
  kind: "product" | "concept";
  /** The product's page on this site, for "product" case studies. */
  productHref?: string;
};

/**
 * The first three entries are MartEX's own products, written from their
 * documentation and repositories — no metrics, clients, or quotations are
 * invented. The rest are explicitly labeled "Concept solution" capability
 * demonstrations. Add verified client case studies (with client consent) as
 * they become available; unset optional fields are hidden automatically by
 * the case-study template.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "lichen-md-hospital-management",
    title: "Lichen MD: one patient file for the whole hospital",
    industry: "Healthcare",
    serviceSlug: "custom-software-development",
    solutionSlug: "records-case-workflow",
    kind: "product",
    productHref: "/products/lichen-md",
    summary:
      "How MartEX built a hospital management system that follows each patient from check-in to discharge and billing, so every department works from the same up-to-date file.",
    clientContext:
      "Hospitals and clinics where the front desk, consulting rooms, laboratory, pharmacy, wards, and billing office each keep their own records — often on paper, sometimes in separate systems.",
    challenge:
      "A patient's information gets scattered across departments. Results arrive late or go missing between handoffs, beds are tracked on whiteboards, and bills are rebuilt by hand from paper slips — slow for staff, risky for patients, and costly for the hospital.",
    discovery:
      "We mapped a patient's visit end to end and found 27 distinct steps where information is created or handed over, and 15 everyday hospital tasks that were being handled across several tools. We also catalogued the 30 printed forms and 17 management reports hospitals already rely on, so the system would produce them rather than replace them.",
    solution:
      "Lichen MD covers registration and patient records, appointments, admissions, doctor and nurse notes, ordering of lab tests, imaging, medicine and procedures, nursing care plans, bed management and discharge, and billing built automatically from the care a patient actually received.",
    uxTechnicalApproach:
      "Every screen is organized around the patient's visit rather than around departments, using the words staff already use. Access is role-based so people only see what they should, mistakes are corrected with a visible history instead of being silently deleted, and every important action is recorded.",
    implementation:
      "The 30 standard forms and 17 management reports are built in and generated from the same live information, so nothing has to be recreated by hand. A Carecenter dashboard gives managers doctors on duty, active cases, admissions, appointments, and bed occupancy at a glance.",
    outcomes:
      "One file per patient from arrival to departure, with every sample, scan, prescription, and procedure tracked from request to result. Lichen MD is MartEX's flagship product and is available to hospitals and clinics today.",
    technologyUsed: ["Web application", "Role-based access control", "Audit trail", "Printable forms & reports"],
  },
  {
    slug: "liberia360-travel-platform",
    title: "LIBERIA360: putting a whole country's travel scene in one app",
    industry: "SMEs",
    serviceSlug: "web-application-development",
    solutionSlug: "customer-portals-booking",
    kind: "product",
    productHref: "/products/liberia360",
    summary:
      "How MartEX designed and built a discovery and booking platform that connects travelers with Liberia's hotels, restaurants, tour guides, events, and local creators.",
    clientContext:
      "Liberians at home, the diaspora, expats, and international visitors — and the small hotels, restaurants, tour operators, and creators who want to reach them.",
    challenge:
      "Information about where to go in Liberia is scattered across social media posts and word of mouth. Travelers can't easily compare options or book, and small businesses have no simple way to be found, take requests, or share news.",
    discovery:
      "We designed for two audiences at once: travelers who need to discover, plan, and book, and businesses who need to manage listings, respond to requests, and see how they are doing. Connectivity shaped every decision, since many users are on mobile data with patchy coverage.",
    solution:
      "A single platform with searchable places by category, county, and distance; reviews and creator profiles; collaborative day-by-day trip planning; request-to-book bookings with in-app messaging; restaurant menus with food ordering; event ticketing with numbered QR passes and door scanning; and in-app customer support with a help center.",
    uxTechnicalApproach:
      "LIBERIA360 is a progressive web app: it installs on a phone's home screen without an app store, and saved places keep working offline. Business posts and events are reviewed before going public, and accounts are protected with email verification and optional two-step sign-in.",
    implementation:
      "Built as a Next.js web app and a NestJS API on PostgreSQL, sharing TypeScript types between them, with business and creator dashboards, an admin moderation and verification workspace, and an audit log.",
    outcomes:
      "LIBERIA360 is live at liberia360.net. Bookings currently work as requests that businesses confirm directly; Mobile Money payment is the next milestone.",
    technologyUsed: ["Next.js", "NestJS", "PostgreSQL", "Progressive Web App", "QR ticketing"],
  },
  {
    slug: "kuu-team-workspace",
    title: "Küü: one workspace instead of scattered tools",
    industry: "Corporate",
    serviceSlug: "web-application-development",
    solutionSlug: "dashboards-reporting",
    kind: "product",
    productHref: "/products/kuu",
    summary:
      "How MartEX built a team workspace that brings chat, tasks, projects, documents, and meetings together — designed to stay fast on phones and slow connections.",
    clientContext:
      "Teams from 3 to 300 people who coordinate work across group chats, email threads, spreadsheets, and shared folders, and who pay for software by mobile money or bank transfer.",
    challenge:
      "Work gets lost between tools. Decisions made in meetings never become tasks, nobody is sure who owns what, and the big global workspace tools are priced per person in a way that doesn't fit local budgets or payment methods.",
    discovery:
      "We started from three questions every team member should be able to answer at a glance: what matters today, who owns it, and what was decided. Every feature had to serve one of them, and every page had to stay light enough for a slow connection.",
    solution:
      "Channels and direct messages where any message can become a task with one clear owner; projects with boards, tables, calendars, timelines, and a workload view; documents the team edits together live; meetings with agendas, transcripts, decisions, and follow-up tasks; dashboards and goals; and \u201cAsk Küü\u201d, which answers questions with links to its sources.",
    uxTechnicalApproach:
      "Küü installs on Android and iPhone home screens and keeps recently viewed information readable offline. Every permission rule lives in one place and applies everywhere — search, notifications, and exports included — with single sign-on, two-step sign-in, and an audit log.",
    implementation:
      "A React web app and an Express API in TypeScript, with real-time updates over WebSockets and conflict-free live co-editing built on Yjs. Pricing is one flat amount per workspace, with a free plan for up to 5 people and payment by mobile money or bank transfer.",
    outcomes:
      "Küü is live at kuuuu.app, where any team can start a free 14-day trial.",
    technologyUsed: ["React", "Express", "WebSockets", "Yjs live collaboration", "Progressive Web App"],
  },
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
    kind: "concept",
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
    kind: "concept",
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
    kind: "concept",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
