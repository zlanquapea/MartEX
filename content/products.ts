export type ProductSummary = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  accent: string;
};

/**
 * MartEX's own shipped products — distinct from the conceptual /solutions
 * demonstrations. Real products, real content, no "concept" labeling.
 */
export const products: ProductSummary[] = [
  {
    slug: "lichen-md",
    name: "Lichen MD",
    category: "Health Information System",
    tagline: "One record. Every department. The whole stay, start to finish.",
    summary:
      "A unified HIS/HMS platform built so a patient record survives the handoff between registration, orders, labs, pharmacy, beds, and billing.",
    accent: "var(--color-primary)",
  },
  {
    slug: "liberia360",
    name: "LIBERIA360",
    category: "Travel & Tourism Platform",
    tagline: "Discover. Experience. Share.",
    summary:
      "A digital discovery and booking platform giving travelers one place to find destinations, plan trips, and connect directly with hotels, restaurants, tour operators, and local creators across Liberia.",
    accent: "var(--color-tech-blue)",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export type LichenModule = { title: string; description: string; tags: string[] };
export type LichenModuleGroup = {
  title: string;
  modules: LichenModule[];
  note?: string;
  highlight?: { title: string; description: string };
};
export type LichenReportStat = { value: string; label: string };

/**
 * Sourced directly from the approved "Lichen MD Trifold Brochure" —
 * MartEX's own printed collateral for its flagship product. No figures or
 * claims beyond what the brochure states.
 */
export const lichenMD = {
  name: "Lichen MD",
  eyebrow: "Unified HIS/HMS Platform",
  heroStatement: "One record. Every department. The whole stay, start to finish.",
  whyEyebrow: "Why Lichen MD",
  whyStatement: "Built so the record survives the handoff, every time.",
  whyDescription:
    "Registration, orders, labs, pharmacy, beds, billing — one continuous patient record instead of five disconnected systems.",
  overview:
    "MartEX builds systems hospitals can run their whole stay on — Lichen MD is our flagship health information system.",
  stats: [
    { value: "15", label: "Clinical, administrative & financial modules on one record." },
    { value: "27", label: "Steps in the golden-path journey, appointment to follow-up." },
    { value: "30/17", label: "Print formats and operational reports, built in." },
  ] satisfies LichenReportStat[],
  moduleGroups: [
    {
      title: "Front office & clinical care",
      modules: [
        {
          title: "Patient administration",
          description: "Duplicate matching and a full audit trail, per patient.",
          tags: ["PAT", "REG"],
        },
        {
          title: "Appointment & scheduling",
          description: "Wait-lists managed across providers and locations.",
          tags: ["APT"],
        },
        {
          title: "Pre-admission & admission",
          description: "Eligibility, consent and order sets built into intake.",
          tags: ["ADM"],
        },
        {
          title: "Clinical assessment",
          description: "Vitals, history and diagnosis on the right encounter.",
          tags: ["ENC", "VIT", "DIA"],
        },
      ],
    },
    {
      title: "Orders, diagnostics & pharmacy",
      modules: [
        {
          title: "Order entry system",
          description: "Lab, imaging, medication, procedure & referral orders.",
          tags: ["ORD"],
        },
        {
          title: "Nursing & inpatient care",
          description: "Care plans and tasks that survive shift handoffs.",
          tags: ["NUR"],
        },
      ],
      note: "LAB · RAD · MED · PRO · INV — specimen tracking, imaging, prescribing, procedures and warehouse-tracked stock, each with a full audit trail.",
      highlight: { title: "One search, everything", description: "Ctrl+G reaches every record, list and workspace." },
    },
    {
      title: "Beds, discharge & revenue",
      modules: [
        {
          title: "Beds & discharge",
          description: "Atomic transfers; discharge closes the record, printable.",
          tags: ["BED", "TRF", "DIS"],
        },
        {
          title: "Billing & revenue cycle",
          description: "Charges generated straight from chargeable events.",
          tags: ["BIL", "CLM", "PAY"],
        },
      ],
    },
  ] satisfies LichenModuleGroup[],
  reporting: {
    stats: [
      { value: "30", label: "print formats, ready on demand" },
      { value: "17", label: "operational reports, live data" },
    ] satisfies LichenReportStat[],
    note: "Every hand-off document and every operations report, reconciled to live data and audited end to end.",
  },
  journey: {
    steps: ["PAT", "ORD", "LAB", "BED", "BIL"],
    caption: "one continuous record — every module reads & writes the same chart",
  },
  trustPoints: [
    "Corrections use reversal, not deletion",
    "Access control enforced server-side",
    "Every high-risk action is audited",
  ],
  contact: {
    web: "martex.com.lr",
    email: "info@orith.tech",
    phone: "+231 771 9111 95",
  },
  screen: {
    src: "/products/lichen-md/screen-carecenter.png",
    alt: "Lichen MD Carecenter dashboard showing doctors on duty, active cases, admissions, today's appointments, bed occupancy, admissions vs. discharges, cases needing attention, and module shortcuts",
    width: 980,
    height: 650,
  },
  brochureHref: "/products/lichen-md/lichen-md-brochure.pdf",
};

export type Liberia360FeatureArea = { area: string; capabilities: string };
export type Liberia360Screen = { src: string; alt: string };

/**
 * Sourced from the LIBERIA360 repository's own README feature table and
 * real screens captured from the running application (see PR description).
 * No invented features or metrics.
 */
export const liberia360 = {
  name: "LIBERIA360",
  tagline: "Discover. Experience. Share.",
  subtagline: "Everything Liberia. One place.",
  overview:
    "A digital discovery and booking platform for Liberia's tourism and hospitality sector. LIBERIA360 gives travelers — Liberians, the diaspora, expats, and international visitors — a single place to discover destinations, plan trips, and connect directly with hotels, restaurants, tour operators, and local creators.",
  platformNote: "A Progressive Web App: installs to a home screen like a native app, with offline access to saved places and push notifications.",
  website: "https://liberia360.net",
  featureAreas: [
    {
      area: "Catalog",
      capabilities:
        "Places, categories, counties, and activities; full-text search; filtering and sorting; radius (\"Near Me\") search.",
    },
    {
      area: "Accounts",
      capabilities:
        "JWT authentication, email verification, password reset, two-factor authentication (TOTP), session revocation, account deletion.",
    },
    {
      area: "Content",
      capabilities:
        "Reviews with rating aggregation, business self-claim and management, business-authored posts, creator profiles, and events.",
    },
    {
      area: "Trip planning",
      capabilities: "\"Build My Liberia Trip\" itinerary planning with collaborative multi-user trip editing.",
    },
    {
      area: "Marketplace",
      capabilities:
        "Request-to-book bookings, in-booking messaging, restaurant menus with in-platform ordering, and business/creator analytics dashboards.",
    },
    {
      area: "Events & ticketing",
      capabilities:
        "Event listings, manual-payment ticket orders with individually numbered QR passes, door scanning, and organizer sales metrics.",
    },
    {
      area: "Customer support",
      capabilities:
        "In-app tickets with image attachments, threaded conversations, status and priority tracking, and satisfaction ratings.",
    },
    {
      area: "Help Center",
      capabilities: "Self-serve articles by category with search, a FAQ accordion, and a Blog/Updates section.",
    },
  ] satisfies Liberia360FeatureArea[],
  screens: [
    {
      src: "/products/liberia360/screen-welcome.png",
      alt: "LIBERIA360 welcome screen reading Discover Liberia, Everything Liberia. One place.",
    },
    {
      src: "/products/liberia360/screen-explore.png",
      alt: "LIBERIA360 Explore Liberia screen with a map of nearby places and a results list including Providence Island and the National Museum of Liberia",
    },
    {
      src: "/products/liberia360/screen-search.png",
      alt: "LIBERIA360 search results for \"beach\" showing ELWA Beach in Paynesville, Montserrado",
    },
    {
      src: "/products/liberia360/screen-place-detail.png",
      alt: "LIBERIA360 place detail screen for Ducor Hill in Monrovia, Montserrado County",
    },
  ] satisfies Liberia360Screen[],
  logo: "/products/liberia360/logo.png",
  notYetImplemented:
    "Live payment capture (bookings are request-to-book only; MTN Mobile Money is schema-ready but not integrated) and a self-service external-stakeholder account system for the B2B analytics product.",
};
