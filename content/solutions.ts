import type { Faq } from "./services";

export type SolutionCategory =
  | "Sales & CRM"
  | "Inventory & Procurement"
  | "Finance & Billing"
  | "HR & Workforce"
  | "Records & Workflow"
  | "Analytics & Reporting"
  | "Customer Portals"
  | "E-commerce"
  | "Field Operations"
  | "Program Monitoring"
  | "Integrations";

export type Industry =
  | "SMEs"
  | "Corporate"
  | "Government"
  | "NGOs"
  | "Education"
  | "Healthcare"
  | "Startups"
  | "Retail";

export type Solution = {
  slug: string;
  name: string;
  category: SolutionCategory;
  businessChallenge: string;
  valueProposition: string;
  industries: Industry[];
  targetAudience: string[];
  coreFeatures: string[];
  benefits: string[];
  workflow: string[];
  integrations: string[];
  security: string;
  pricingModel: "request-pricing";
  faqs: Faq[];
  isConcept: true;
};

export const solutionCategories: SolutionCategory[] = [
  "Sales & CRM",
  "Inventory & Procurement",
  "Finance & Billing",
  "HR & Workforce",
  "Records & Workflow",
  "Analytics & Reporting",
  "Customer Portals",
  "E-commerce",
  "Field Operations",
  "Program Monitoring",
  "Integrations",
];

/** Cycles through the brand palette so each category reads distinctly
 * without introducing an off-brand hue. */
export const categoryAccents: Record<SolutionCategory, string> = {
  "Sales & CRM": "var(--color-primary)",
  "Inventory & Procurement": "var(--color-tech-blue)",
  "Finance & Billing": "var(--color-sky)",
  "HR & Workforce": "var(--color-primary)",
  "Records & Workflow": "var(--color-slate)",
  "Analytics & Reporting": "var(--color-tech-blue)",
  "Customer Portals": "var(--color-sky)",
  "E-commerce": "var(--color-primary)",
  "Field Operations": "var(--color-tech-blue)",
  "Program Monitoring": "var(--color-sky)",
  Integrations: "var(--color-slate)",
};

export const industries: Industry[] = [
  "SMEs",
  "Corporate",
  "Government",
  "NGOs",
  "Education",
  "Healthcare",
  "Startups",
  "Retail",
];

/**
 * Solution landing pages are conceptual capability demonstrations, not
 * finalized MartEX products. Every page is clearly labeled "Concept
 * solution" and uses "Request pricing" rather than invented figures.
 */
export const solutions: Solution[] = [
  {
    slug: "sales-customer-management",
    name: "Sales & Customer Management",
    category: "Sales & CRM",
    businessChallenge:
      "Customer relationships, follow-ups, and service history live across notebooks, phones, and someone's memory — making it hard to track leads or maintain consistent service.",
    valueProposition: "Organize every customer relationship, follow-up, and service history in one connected system.",
    industries: ["SMEs", "Corporate", "Startups", "Retail"],
    targetAudience: ["Sales teams", "Customer service teams", "Business owners managing client relationships directly"],
    coreFeatures: [
      "Centralized customer records",
      "Pipeline and follow-up tracking",
      "Interaction and service history",
      "Task reminders for staff",
      "Exportable customer reports",
    ],
    benefits: [
      "A single, shared view of every customer",
      "Fewer missed follow-ups",
      "Clearer visibility into sales activity",
      "Easier handovers between staff",
    ],
    workflow: [
      "A lead or customer is added or imported into the system",
      "Interactions and notes are logged against the record",
      "Follow-up tasks are assigned and tracked to completion",
      "Managers review pipeline and service reports",
    ],
    integrations: ["Email", "WhatsApp/SMS notification providers", "Accounting or billing tools"],
    security:
      "Access is role-based, so staff see only the records relevant to them. Data handling practices are agreed with each client before implementation.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can this replace a spreadsheet we already use?", answer: "Yes — existing customer data can typically be migrated in during implementation." },
      { question: "Can different teams have different access levels?", answer: "Yes, access is configured by role so teams only see what's relevant to them." },
    ],
    isConcept: true,
  },
  {
    slug: "inventory-purchasing",
    name: "Inventory & Purchasing",
    category: "Inventory & Procurement",
    businessChallenge:
      "Stock levels are tracked manually or not at all, making it hard to know what's available, what to reorder, and where inventory is moving.",
    valueProposition: "See stock movement clearly and coordinate purchasing before shortages happen.",
    industries: ["Retail", "Healthcare", "SMEs"],
    targetAudience: ["Warehouse and store staff", "Procurement teams", "Operations managers"],
    coreFeatures: [
      "Real-time stock records",
      "Purchase order workflows",
      "Low-stock alerts",
      "Movement and usage reports",
      "Multi-location tracking",
    ],
    benefits: [
      "Fewer stockouts and overstocking",
      "Faster, better-informed purchasing decisions",
      "A clear audit trail of stock movement",
    ],
    workflow: [
      "Items are received and recorded into inventory",
      "Stock levels update automatically as items move",
      "Low-stock thresholds trigger purchase requests",
      "Reports show usage trends across locations",
    ],
    integrations: ["Accounting systems", "Point-of-sale platforms", "Supplier ordering tools"],
    security: "Inventory data is protected with role-based access, with adjustments tracked to the user who made them.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can it handle multiple warehouses or branches?", answer: "Yes, multi-location tracking is a core capability." },
    ],
    isConcept: true,
  },
  {
    slug: "billing-invoicing-payments",
    name: "Billing, Invoicing & Payment Tracking",
    category: "Finance & Billing",
    businessChallenge:
      "Invoices, payments, and outstanding balances are tracked across documents and memory, making it hard to know who owes what.",
    valueProposition: "Bring invoicing and payment status into one clear, always up-to-date workflow.",
    industries: ["SMEs", "Corporate", "Government", "NGOs"],
    targetAudience: ["Finance teams", "Account managers", "Business owners"],
    coreFeatures: [
      "Invoice generation and tracking",
      "Payment status and history",
      "Outstanding balance reports",
      "Automated payment reminders",
      "Account statements",
    ],
    benefits: [
      "Clear visibility into what is owed and paid",
      "Fewer overdue accounts",
      "Consistent, professional invoicing",
    ],
    workflow: [
      "An invoice is generated from agreed pricing or a service record",
      "The invoice is sent and its status tracked",
      "Payments are recorded against the invoice",
      "Reports show outstanding balances by client or period",
    ],
    integrations: ["Approved payment gateways", "Accounting software", "Email delivery providers"],
    security: "Financial records are access-controlled, and payment integrations use approved, secure providers rather than storing raw payment details directly.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can it connect to a payment gateway?", answer: "Yes, integration with approved payment providers is available where required." },
    ],
    isConcept: true,
  },
  {
    slug: "hr-attendance-staff-management",
    name: "HR, Attendance & Staff Management",
    category: "HR & Workforce",
    businessChallenge:
      "Staff records, attendance, and requests are scattered across paper forms and spreadsheets, slowing down routine HR work.",
    valueProposition: "Support attendance, staff records, and everyday HR requests in one dependable system.",
    industries: ["Corporate", "NGOs", "Government", "Education"],
    targetAudience: ["HR teams", "Department managers", "Staff submitting requests"],
    coreFeatures: [
      "Employee records",
      "Attendance and time tracking",
      "Leave and request workflows",
      "Approval routing",
      "HR reporting",
    ],
    benefits: [
      "Consistent, centralized staff records",
      "Faster approvals for routine requests",
      "Clearer attendance and leave visibility",
    ],
    workflow: [
      "Staff records are created and maintained centrally",
      "Attendance is logged daily",
      "Requests (leave, expenses, etc.) are submitted and routed for approval",
      "HR reviews reports across the organization",
    ],
    integrations: ["Payroll systems", "Email and calendar tools"],
    security: "Employee data is access-controlled by role, with sensitive HR information restricted to authorized staff.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can approval chains match our organizational structure?", answer: "Yes, approval routing is configured to match your reporting lines." },
    ],
    isConcept: true,
  },
  {
    slug: "records-case-workflow",
    name: "Document, Records & Case Workflow",
    category: "Records & Workflow",
    businessChallenge:
      "Documents, cases, and decisions are disconnected across files and folders, making retrieval and tracking difficult.",
    valueProposition: "Keep documents, cases, and decisions connected, searchable, and retrievable.",
    industries: ["Government", "NGOs", "Healthcare", "Corporate"],
    targetAudience: ["Case workers", "Records officers", "Program administrators"],
    coreFeatures: [
      "Structured case and document records",
      "Status tracking through defined stages",
      "Search and retrieval",
      "Access permissions and retention rules",
      "Audit history",
    ],
    benefits: [
      "Faster retrieval of records and case history",
      "Clear visibility into case status",
      "Improved accountability through audit trails",
    ],
    workflow: [
      "A case or document is created and classified",
      "It moves through defined stages with assigned owners",
      "Related documents and notes are attached",
      "Reports track caseload and status across the organization",
    ],
    integrations: ["Document storage providers", "Identity and access systems"],
    security: "Access follows defined permission levels and retention rules agreed with the client, particularly for sensitive case information.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can retention rules match our regulatory requirements?", answer: "Retention and access rules are configured to match the policies your organization must follow." },
    ],
    isConcept: true,
  },
  {
    slug: "dashboards-reporting",
    name: "Dashboards & Reporting",
    category: "Analytics & Reporting",
    businessChallenge:
      "Decision-makers lack a clear, current view of operational data because it's spread across disconnected sources.",
    valueProposition: "Turn scattered operational information into decision-ready views.",
    industries: ["SMEs", "Corporate", "Government", "NGOs", "Healthcare", "Education"],
    targetAudience: ["Executives and managers", "Program officers", "Operations teams"],
    coreFeatures: [
      "Role-based dashboards",
      "Configurable reports and exports",
      "Data quality and completeness views",
      "Trend and comparison views",
    ],
    benefits: [
      "Faster, better-informed decisions",
      "Less time spent compiling manual reports",
      "A shared, consistent view of performance",
    ],
    workflow: [
      "Data is connected from source systems or manual entry",
      "Dashboards present it by role and priority",
      "Reports can be exported for meetings or funders",
    ],
    integrations: ["Existing operational or field-data systems", "Spreadsheet exports"],
    security: "Dashboard access is scoped by role so users see only the data relevant to their responsibilities.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can dashboards pull from multiple existing systems?", answer: "Yes, where those systems provide accessible data or an API." },
    ],
    isConcept: true,
  },
  {
    slug: "customer-portals-booking",
    name: "Customer Portals & Booking Platforms",
    category: "Customer Portals",
    businessChallenge:
      "Customers have no self-service way to book, track, or manage their interactions with the organization.",
    valueProposition: "Give customers a self-service portal for booking, tracking, and managing their requests.",
    industries: ["SMEs", "Corporate", "Healthcare", "Government"],
    targetAudience: ["Customers or clients", "Front-desk and service staff"],
    coreFeatures: [
      "Self-service account and booking",
      "Appointment or service scheduling",
      "Status tracking for requests",
      "Notifications and reminders",
    ],
    benefits: [
      "Reduced front-desk workload",
      "Fewer missed appointments",
      "A more convenient experience for customers",
    ],
    workflow: [
      "A customer creates an account or request",
      "Available slots or services are presented",
      "The booking is confirmed and tracked",
      "Reminders are sent ahead of the scheduled time",
    ],
    integrations: ["Calendar systems", "SMS/email notification providers", "Payment gateways"],
    security: "Customer accounts are protected with standard authentication practices, and access to personal data is limited to authorized staff.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can this integrate with our existing calendar?", answer: "Calendar integration is available where the underlying platform supports it." },
    ],
    isConcept: true,
  },
  {
    slug: "ecommerce-applications",
    name: "E-commerce Applications",
    category: "E-commerce",
    businessChallenge:
      "The business has no reliable online channel to list products, take orders, and manage fulfillment.",
    valueProposition: "Sell online with a platform that connects listings, orders, and fulfillment.",
    industries: ["Retail", "SMEs", "Startups"],
    targetAudience: ["Business owners", "Store and fulfillment staff", "Online customers"],
    coreFeatures: [
      "Product catalog management",
      "Order and fulfillment tracking",
      "Payment integration",
      "Customer accounts and order history",
    ],
    benefits: [
      "A dependable online sales channel",
      "Clearer order and fulfillment visibility",
      "Reduced manual order handling",
    ],
    workflow: [
      "Products are listed with pricing and stock levels",
      "Customers browse and place orders",
      "Orders are tracked through fulfillment",
      "Sales and inventory reports are reviewed",
    ],
    integrations: ["Payment gateways", "Delivery/logistics providers", "Inventory systems"],
    security: "Payment handling uses approved, secure providers, and customer data is protected with standard access controls.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can it connect to our existing inventory system?", answer: "Yes, where inventory data is accessible through the source system." },
    ],
    isConcept: true,
  },
  {
    slug: "field-data-collection",
    name: "Field Data Collection",
    category: "Field Operations",
    businessChallenge:
      "Field teams collect data on paper, which is slow to compile, error-prone, and disconnected from central systems.",
    valueProposition: "Capture field data digitally, even offline, and sync it back to a central system.",
    industries: ["NGOs", "Government", "Healthcare"],
    targetAudience: ["Field officers", "Program managers", "Monitoring and evaluation teams"],
    coreFeatures: [
      "Offline-ready mobile data capture",
      "Structured forms with validation",
      "Automatic sync when connectivity returns",
      "Central data review and export",
    ],
    benefits: [
      "Faster, more accurate field data",
      "Less time spent manually compiling paper forms",
      "A central, current view of field activity",
    ],
    workflow: [
      "Field officers complete structured forms on mobile devices",
      "Data is stored locally when offline",
      "Records sync to the central system once connected",
      "Program teams review and report on the data",
    ],
    integrations: ["Program monitoring and reporting platforms", "GIS/mapping tools"],
    security: "Field data is protected in transit and at rest, with access limited to authorized program staff.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Does it work in areas with poor connectivity?", answer: "Yes, data capture is designed to work offline and sync once a connection is available." },
    ],
    isConcept: true,
  },
  {
    slug: "monitoring-program-management",
    name: "Monitoring & Program Management",
    category: "Program Monitoring",
    businessChallenge:
      "Programs struggle to track activities, indicators, and outcomes consistently across sites and reporting periods.",
    valueProposition: "Track program activities and indicators consistently across every site and reporting period.",
    industries: ["NGOs", "Government", "Healthcare", "Education"],
    targetAudience: ["Program managers", "Monitoring and evaluation officers", "Funders and reporting teams"],
    coreFeatures: [
      "Indicator and activity tracking",
      "Site- and period-based reporting",
      "Beneficiary or case tracking where applicable",
      "Exportable reports for funders",
    ],
    benefits: [
      "Consistent tracking across sites",
      "Faster, more reliable funder reporting",
      "Clearer visibility into program progress",
    ],
    workflow: [
      "Program indicators and activities are defined in the system",
      "Field and site teams log progress against them",
      "Reports are generated by period, site, or indicator",
    ],
    integrations: ["Field data collection tools", "Reporting and dashboard platforms"],
    security: "Program and beneficiary data is access-controlled, with sensitivity-appropriate handling agreed with the client.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can it match our funder's specific reporting format?", answer: "Reports can be configured to match common funder reporting requirements." },
    ],
    isConcept: true,
  },
  {
    slug: "apis-third-party-integrations",
    name: "APIs & Third-Party Integrations",
    category: "Integrations",
    businessChallenge:
      "Existing systems can't exchange information, forcing manual re-entry and creating inconsistent records.",
    valueProposition: "Connect the systems you already use so information flows between them automatically.",
    industries: ["SMEs", "Corporate", "Government", "NGOs", "Startups"],
    targetAudience: ["IT and operations teams", "Organizations with multiple existing systems"],
    coreFeatures: [
      "Custom API development",
      "Third-party platform connectors",
      "Data synchronization",
      "Integration monitoring and alerts",
    ],
    benefits: [
      "Less manual data entry",
      "Consistent information across systems",
      "Faster, more reliable handoffs between tools",
    ],
    workflow: [
      "Systems and data flows requiring connection are identified",
      "Integration points are designed and built",
      "Connections are tested and monitored after launch",
    ],
    integrations: ["Approved third-party APIs and platforms specified by the client"],
    security: "Integrations follow the security requirements of each connected platform, with credentials handled through approved secret-management practices.",
    pricingModel: "request-pricing",
    faqs: [
      { question: "Can you integrate with a system that has no public API?", answer: "This is assessed case by case — some platforms offer alternative approved integration methods even without a public API." },
    ],
    isConcept: true,
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
