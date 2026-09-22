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
    category: "For Hospitals & Clinics",
    tagline: "One patient file that never gets lost.",
    summary:
      "Software that follows a patient from check-in to check-out, so every department — front desk, doctors, pharmacy, billing — is working from the same up-to-date file.",
    accent: "var(--color-primary)",
  },
  {
    slug: "liberia360",
    name: "LIBERIA360",
    category: "Travel App for Liberia",
    tagline: "Discover. Experience. Share.",
    summary:
      "One app to find places to go in Liberia, plan a trip, and book directly with hotels, restaurants, tour guides, and local creators.",
    accent: "var(--color-tech-blue)",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export type LichenModule = { title: string; description: string };
export type LichenModuleGroup = {
  title: string;
  modules: LichenModule[];
  note?: string;
  highlight?: { title: string; description: string };
};
export type LichenReportStat = { value: string; label: string };

/**
 * Sourced from the approved "Lichen MD Trifold Brochure" — MartEX's own
 * printed collateral for its flagship product — but written in plain
 * language instead of the brochure's internal module names and codes.
 * The facts and figures are unchanged.
 */
export const lichenMD = {
  name: "Lichen MD",
  eyebrow: "For Hospitals & Clinics",
  heroStatement: "One patient file that never gets lost.",
  whyEyebrow: "The problem it solves",
  whyStatement: "Today, a patient's information gets scattered.",
  whyDescription:
    "The front desk, the lab, the pharmacy, the ward, and the billing office often each keep their own paper or system. Lichen MD puts all of it — registration, doctor's orders, lab results, medicine, hospital beds, and the bill — into one file that everyone works from.",
  overview:
    "Lichen MD is MartEX's software for running a hospital, from the moment a patient walks in to the moment they're billed and go home.",
  stats: [
    { value: "15", label: "Everyday hospital tasks handled in one system, not five." },
    { value: "27", label: "Steps of a patient's visit tracked automatically, start to finish." },
    { value: "30/17", label: "Ready-made forms and reports staff can print in seconds." },
  ] satisfies LichenReportStat[],
  moduleGroups: [
    {
      title: "Getting checked in and seen",
      modules: [
        {
          title: "Front desk & patient records",
          description: "Every patient is checked in accurately, so their file never gets mixed up with someone else's.",
        },
        {
          title: "Booking appointments",
          description: "Patients get scheduled with the right doctor, in the right place, without double-booking.",
        },
        {
          title: "Getting admitted",
          description: "Paperwork and permissions are handled as part of check-in, not chased down afterward.",
        },
        {
          title: "Doctor & nurse notes",
          description: "Vital signs, history, and diagnosis are recorded against the correct visit, every time.",
        },
      ],
    },
    {
      title: "Tests, medicine & nursing care",
      modules: [
        {
          title: "Ordering tests, scans & medicine",
          description: "A doctor can order lab work, imaging, medication, or a procedure from one place.",
        },
        {
          title: "Nursing care",
          description: "Nurses can see and update a patient's care plan, even when shifts change.",
        },
      ],
      note: "Every sample, scan, prescription, and procedure is tracked from request to result — nothing gets lost in handoff.",
      highlight: { title: "Find anything fast", description: "Staff can pull up any patient, order, or record in seconds." },
    },
    {
      title: "Beds, discharge & billing",
      modules: [
        {
          title: "Beds & discharge",
          description: "Moving a patient to a new bed or sending them home updates their file instantly, and can be printed.",
        },
        {
          title: "Billing patients",
          description: "The bill is built automatically from the care a patient actually received — nothing gets re-typed.",
        },
      ],
    },
  ] satisfies LichenModuleGroup[],
  reporting: {
    stats: [
      { value: "30", label: "forms hospitals already use, built in and ready to print" },
      { value: "17", label: "reports for hospital managers, always up to date" },
    ] satisfies LichenReportStat[],
    note: "Every form a patient is handed, and every report a manager needs, comes straight from the same live information — nothing has to be recreated by hand.",
  },
  journey: {
    steps: ["Check-in", "Doctor's orders", "Labs & pharmacy", "Hospital stay", "Billing"],
    caption: "One file, from the moment a patient arrives to the moment they leave.",
  },
  trustPoints: [
    "If something's entered wrong, it gets corrected — never secretly deleted",
    "Staff only see the information they're supposed to",
    "Every important action is recorded, so there's always a clear history",
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

/**
 * Sourced from the LIBERIA360 repository's own README feature table, but
 * written in plain, traveler-facing language rather than technical terms.
 * No invented features or metrics.
 */
export const liberia360 = {
  name: "LIBERIA360",
  tagline: "Discover. Experience. Share.",
  subtagline: "Everything Liberia. One place.",
  overview:
    "One app to discover Liberia, plan your trip, and book directly with hotels, restaurants, tour guides, and local creators — built for Liberians, the diaspora, and visitors alike.",
  platformNote: "Add it to your phone's home screen like a regular app — no app store needed. Places you've saved still work even without internet.",
  website: "https://liberia360.net",
  featureAreas: [
    {
      area: "Discover places",
      capabilities: "Search and browse things to do, sorted by what you're into and how close they are to you.",
    },
    {
      area: "Simple, secure sign-in",
      capabilities: "Create an account and log in safely, with extra protection turned on if you want it.",
    },
    {
      area: "Real reviews & local stories",
      capabilities: "See what other travelers thought, follow local creators, and read posts from real businesses.",
    },
    {
      area: "Plan your trip",
      capabilities: "Build a day-by-day plan for your trip, and put it together with friends or family.",
    },
    {
      area: "Book directly",
      capabilities: "Request a booking and message the business directly — even order from a restaurant's menu, in the app.",
    },
    {
      area: "Find & attend events",
      capabilities: "Browse festivals and events, get your ticket, and show a QR code to get in.",
    },
    {
      area: "Get help fast",
      capabilities: "Run into a problem? Open a support request and talk it through with a real person until it's fixed.",
    },
    {
      area: "Answers when you need them",
      capabilities: "Search help articles or a FAQ, and catch up on the latest news and updates.",
    },
  ] satisfies Liberia360FeatureArea[],
  logo: "/products/liberia360/logo.png",
  notYetImplemented:
    "Paying inside the app isn't available yet — a booking is a request, and the business confirms it with you directly. Mobile Money payment is on the way.",
};
