export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  heroStatement: string;
  overview: string;
  problems: string[];
  whoItsFor: string[];
  capabilities: string[];
  useCases: string[];
  approach: string[];
  deliverables: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription:
      "Purpose-built systems tailored to a client's workflows, requirements, users, and growth plans.",
    heroStatement: "Software built around how your organization actually works.",
    overview:
      "Off-the-shelf tools rarely match the exact way a team operates. MartEX designs and builds custom software around your real workflows, data, and users, so the system fits the organization instead of forcing the organization to fit the system.",
    problems: [
      "Generic software forces awkward workarounds",
      "Critical work still depends on spreadsheets or paper",
      "Teams re-enter the same information in multiple places",
      "Existing tools can't grow with the organization",
    ],
    whoItsFor: [
      "Organizations with workflows that don't fit standard software",
      "Teams that have outgrown spreadsheets and manual trackers",
      "Institutions planning a multi-year digital foundation",
    ],
    capabilities: [
      "Requirements discovery and workflow mapping",
      "Role-based access and permissions",
      "Custom dashboards and reporting",
      "Data modeling for operational records",
      "Structured testing before handover",
    ],
    useCases: [
      "Internal operations platforms",
      "Case-management and workflow systems",
      "Department-specific tools that replace spreadsheets",
    ],
    approach: [
      "Understand the current process, constraints, and intended outcome",
      "Define requirements and scope with the client",
      "Design the data model, workflows, and interface",
      "Build in iterations with regular review points",
      "Test, document, and hand the system over with training",
    ],
    deliverables: [
      "A working application matching agreed requirements",
      "Technical and user documentation",
      "Handover and training session",
      "A maintenance and change-management plan",
    ],
    faqs: [
      {
        question: "How long does a custom build take?",
        answer:
          "Timelines depend on scope and complexity. After discovery, MartEX provides a project plan with milestones so you know what to expect before development begins.",
      },
      {
        question: "Do you work with our existing systems?",
        answer:
          "Yes. Discovery includes reviewing any systems already in place so the new software fits into your existing environment rather than duplicating it.",
      },
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    shortDescription:
      "Secure, responsive portals, dashboards, internal systems, and online service platforms.",
    heroStatement: "Web platforms your team and customers can rely on.",
    overview:
      "MartEX designs and builds web applications for both internal operations and public-facing services — from staff dashboards to customer portals — with attention to security, responsiveness, and everyday usability.",
    problems: [
      "Services are hard for customers or staff to access online",
      "Information is scattered across emails, files, and messaging apps",
      "Older interfaces slow teams down instead of helping them",
    ],
    whoItsFor: [
      "Organizations that need a reliable internal system accessible from a browser",
      "Institutions offering services or information to the public online",
      "Teams that need a central place to see and manage operational data",
    ],
    capabilities: [
      "Responsive interfaces that work across devices",
      "Role-based dashboards and administration tools",
      "Secure authentication and access controls",
      "Search, filtering, and reporting views",
      "Performance and accessibility testing",
    ],
    useCases: [
      "Customer or member self-service portals",
      "Internal management dashboards",
      "Public-facing service and information platforms",
    ],
    approach: [
      "Map the users, journeys, and access levels involved",
      "Design the interface around real tasks, not generic templates",
      "Build with security and performance as first-class requirements",
      "Test across devices and usage conditions",
      "Deploy and support with a clear maintenance plan",
    ],
    deliverables: [
      "A responsive, tested web application",
      "Administration and access-control documentation",
      "Deployment and hosting guidance",
      "Ongoing maintenance and support options",
    ],
    faqs: [
      {
        question: "Can the platform support many concurrent users?",
        answer:
          "Yes. Expected usage and growth are discussed during discovery so the application is designed and hosted to match real demand.",
      },
      {
        question: "Will the application work well on mobile browsers?",
        answer:
          "Interfaces are built responsively from the start, so they remain usable across phones, tablets, and desktops.",
      },
    ],
  },
  {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    shortDescription: "Mobile solutions for customers, employees, field teams, and service delivery.",
    heroStatement: "Put the right tool in people's hands, wherever the work happens.",
    overview:
      "MartEX builds mobile applications that support customers, employees, and field teams away from a desk — including workflows that must keep functioning with limited or intermittent connectivity.",
    problems: [
      "Field work still relies on paper forms",
      "Staff need access to systems while away from the office",
      "Updates and instructions reach teams too slowly",
    ],
    whoItsFor: [
      "Organizations with field teams, technicians, or mobile staff",
      "Businesses that want a direct mobile channel to customers",
      "Programs collecting data outside a fixed office environment",
    ],
    capabilities: [
      "Native and cross-platform mobile applications",
      "Offline-ready data capture and sync",
      "Push notifications and alerts",
      "Location and field-data capture",
      "Integration with existing back-office systems",
    ],
    useCases: [
      "Field data-collection applications",
      "Customer-facing mobile apps",
      "Staff and technician tools for service delivery",
    ],
    approach: [
      "Understand where and how the app will be used in the field",
      "Design for the realistic connectivity and device conditions",
      "Build, test on real devices, and refine based on feedback",
      "Prepare app-store or distribution requirements",
      "Support the app after launch as usage grows",
    ],
    deliverables: [
      "A tested mobile application for the agreed platforms",
      "Offline and sync behavior documentation",
      "Distribution and update guidance",
      "A maintenance and enhancement plan",
    ],
    faqs: [
      {
        question: "Do you build for iOS and Android?",
        answer:
          "Platform coverage is agreed during discovery based on your users' devices and budget, using an approach that best fits the requirement.",
      },
      {
        question: "Can the app work without internet access?",
        answer:
          "Where required, applications are designed to capture data offline and synchronize once connectivity is available.",
      },
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    shortDescription: "Digital workflows that reduce repetitive work, improve consistency, and accelerate operations.",
    heroStatement: "Turn manual, multi-step processes into visible, reliable workflows.",
    overview:
      "MartEX maps existing manual processes and rebuilds them as digital workflows with clear steps, approvals, and status visibility — reducing repetitive work and the errors that come with it.",
    problems: [
      "Approvals stall with no visibility into where they are",
      "The same task is repeated manually across departments",
      "It's unclear who is responsible for the next step in a process",
    ],
    whoItsFor: [
      "Organizations with recurring approval or fulfillment processes",
      "Teams spending significant time on repetitive administrative work",
      "Institutions that need an audit trail of who did what and when",
    ],
    capabilities: [
      "Workflow mapping and redesign",
      "Rules-based routing and approvals",
      "Automated notifications and reminders",
      "Status tracking and audit trails",
      "Integration with existing records systems",
    ],
    useCases: [
      "Request and approval workflows",
      "Staff or client onboarding processes",
      "Service fulfillment and case routing",
    ],
    approach: [
      "Document the current process end-to-end, including exceptions",
      "Identify where automation removes friction without removing oversight",
      "Design and build the workflow with configurable rules",
      "Pilot with real users before full rollout",
      "Monitor and refine after launch",
    ],
    deliverables: [
      "A working automated workflow system",
      "Process documentation reflecting the new workflow",
      "Training for staff and administrators",
      "A support plan for ongoing adjustments",
    ],
    faqs: [
      {
        question: "Will automation remove necessary human review?",
        answer:
          "No. Automation is designed around the approval and oversight points your organization requires — it removes repetitive manual steps, not accountability.",
      },
      {
        question: "Can workflows change after launch?",
        answer:
          "Yes. Workflow rules are typically configurable, and change-management arrangements are agreed as part of the maintenance plan.",
      },
    ],
  },
  {
    slug: "information-management-systems",
    title: "Information Management Systems",
    shortDescription: "Applications for collecting, organizing, retrieving, reporting, and protecting business information.",
    heroStatement: "One dependable source of information instead of many scattered ones.",
    overview:
      "MartEX builds systems that bring an organization's information into one structured, searchable, and appropriately protected place — supporting day-to-day work and better-informed decisions.",
    problems: [
      "Records are fragmented across files, folders, and departments",
      "Reporting takes far longer than it should",
      "Access to information is inconsistent or hard to control",
    ],
    whoItsFor: [
      "Organizations managing large volumes of records or case files",
      "Institutions that need consistent, auditable reporting",
      "Teams that need controlled, role-based access to sensitive information",
    ],
    capabilities: [
      "Structured records and document management",
      "Search and retrieval tools",
      "Reporting and export capabilities",
      "Role-based permissions and retention rules",
      "Data backup and protection practices",
    ],
    useCases: [
      "Program and case-record systems",
      "Document and records registers",
      "Operational reporting platforms",
    ],
    approach: [
      "Assess current information sources and how they are used",
      "Design a structure that supports retrieval and reporting needs",
      "Build with appropriate access controls and safeguards",
      "Migrate and validate existing information",
      "Train staff and hand over documentation",
    ],
    deliverables: [
      "A working information management system",
      "Data structure and access-control documentation",
      "Migration validation summary",
      "Backup, retention, and maintenance plan",
    ],
    faqs: [
      {
        question: "Can historical records be migrated into the new system?",
        answer:
          "Yes, where the source data is available. Migration scope and data-quality checks are agreed as part of project planning.",
      },
      {
        question: "How is sensitive information protected?",
        answer:
          "Access controls, permissions, and data-handling practices are designed around the sensitivity of the information and agreed with the client before launch.",
      },
    ],
  },
  {
    slug: "systems-integration",
    title: "Systems Integration",
    shortDescription: "Connections between applications, databases, payment services, APIs, and approved third-party platforms.",
    heroStatement: "Help your systems work from the same information.",
    overview:
      "MartEX connects applications, databases, and third-party services so information flows between them reliably — reducing manual re-entry and the risk of systems showing conflicting data.",
    problems: [
      "Staff re-enter the same data into multiple systems",
      "Different systems show conflicting information",
      "Handoffs between systems create delays and errors",
    ],
    whoItsFor: [
      "Organizations running multiple disconnected systems or tools",
      "Businesses that need payment or third-party API connections",
      "Teams that need consistent reporting across systems",
    ],
    capabilities: [
      "API design and integration",
      "Data synchronization between systems",
      "Payment gateway connections",
      "Integration monitoring and error handling",
      "Documentation of data flows",
    ],
    useCases: [
      "Payment and billing workflow connections",
      "Cross-system reporting pipelines",
      "Connectors between internal tools and approved platforms",
    ],
    approach: [
      "Map the systems involved and the data that needs to flow between them",
      "Design integration points with appropriate error handling",
      "Build and test each connection in a controlled environment",
      "Monitor integrations after launch",
      "Document data flows for future maintenance",
    ],
    deliverables: [
      "Working integrations between agreed systems",
      "Data-flow and error-handling documentation",
      "Monitoring and alerting setup",
      "A support plan for ongoing integration maintenance",
    ],
    faqs: [
      {
        question: "Can you integrate with our existing software vendors?",
        answer:
          "In most cases, yes, where the vendor provides an API or an approved integration method. This is confirmed during discovery.",
      },
      {
        question: "What happens if an integration fails?",
        answer:
          "Integrations are built with monitoring and error handling so failures are visible and can be addressed quickly rather than silently losing data.",
      },
    ],
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    shortDescription: "Business analysis, requirements definition, solution planning, and digital transformation guidance.",
    heroStatement: "A clear, practical path from business challenge to technology decision.",
    overview:
      "Before building anything, organizations often need clarity on what problem they're actually solving. MartEX provides business analysis and technology planning to help clients make sound, well-scoped decisions.",
    problems: [
      "It's unclear which technology investment would help most",
      "Requirements are incomplete or contradictory across stakeholders",
      "Past technology investments haven't matched a clear plan",
    ],
    whoItsFor: [
      "Organizations planning a digital transformation initiative",
      "Teams that need vendor-neutral advice before committing budget",
      "Institutions that need requirements clearly defined before a project starts",
    ],
    capabilities: [
      "Operational discovery and stakeholder interviews",
      "Requirements definition and documentation",
      "Solution architecture and options analysis",
      "Delivery roadmaps and prioritization",
      "Vendor-neutral recommendations",
    ],
    useCases: [
      "Digital transformation roadmaps",
      "Pre-project requirements definition",
      "Technology options assessments",
    ],
    approach: [
      "Interview stakeholders and observe current operations",
      "Document findings, constraints, and opportunities",
      "Define requirements and evaluate solution options",
      "Deliver a roadmap with clear priorities and next steps",
      "Support the client through the following implementation phase",
    ],
    deliverables: [
      "A findings and recommendations report",
      "Documented requirements",
      "A prioritized delivery roadmap",
      "Optional support carrying the plan into implementation",
    ],
    faqs: [
      {
        question: "Does consulting commit us to building with MartEX?",
        answer:
          "No. Consulting engagements are intended to produce clear, usable findings and a roadmap, regardless of who ultimately implements it.",
      },
      {
        question: "How long does a consulting engagement take?",
        answer:
          "Duration depends on the organization's size and complexity, and is agreed upfront based on the scope of discovery required.",
      },
    ],
  },
];

export const maintenanceAndSupport = {
  title: "Maintenance and Support",
  description:
    "A continuing capability across every MartEX engagement, covering monitoring, updates, troubleshooting, performance improvements, user support, and planned enhancements — so a system stays dependable long after launch.",
  capabilities: [
    "System monitoring and health checks",
    "Security and platform updates",
    "Troubleshooting and issue resolution",
    "Performance improvements",
    "User support",
    "Planned feature enhancements",
  ],
};

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
