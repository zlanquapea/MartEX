export type ProcessStage = {
  stage: string;
  number: string;
  summary: string;
  details: string[];
};

export const processStages: ProcessStage[] = [
  {
    stage: "Discovery",
    number: "01",
    summary: "Understand how the organization operates today, and what needs to change.",
    details: [
      "Stakeholder interviews and workflow observation",
      "Review of existing systems, data, and constraints",
      "Definition of the core business problem",
    ],
  },
  {
    stage: "Planning",
    number: "02",
    summary: "Turn findings into agreed requirements, scope, and a realistic delivery plan.",
    details: [
      "Documented requirements and success criteria",
      "Agreed scope, timeline, and responsibilities",
      "Risk and dependency identification",
    ],
  },
  {
    stage: "Design",
    number: "03",
    summary: "Design the workflows, data structure, and interface before writing production code.",
    details: [
      "Information architecture and workflow design",
      "Interface design reviewed with stakeholders",
      "Technical architecture and data modeling",
    ],
  },
  {
    stage: "Development",
    number: "04",
    summary: "Build the system in iterations with visibility into progress along the way.",
    details: [
      "Iterative development with regular check-ins",
      "Internal quality checks throughout the build",
      "Ongoing alignment against agreed requirements",
    ],
  },
  {
    stage: "Deployment",
    number: "05",
    summary: "Test thoroughly, migrate data where needed, and hand the system over with training.",
    details: [
      "Usability, functional, security, and performance testing",
      "Data migration and validation where applicable",
      "Documentation, training, and formal handover",
    ],
  },
  {
    stage: "Support",
    number: "06",
    summary: "Keep the system dependable after launch through defined maintenance arrangements.",
    details: [
      "Monitoring, updates, and troubleshooting",
      "User support and performance improvements",
      "Planned enhancements as needs evolve",
    ],
  },
];
