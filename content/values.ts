export type Value = { name: string; description: string };

export const coreValues: Value[] = [
  { name: "Problem solving", description: "We start with the operational problem, not a preferred technology." },
  { name: "Reliability", description: "Systems are built to keep working, and to be supported when they need attention." },
  { name: "Simplicity", description: "Clear, usable software beats complicated software that looks impressive." },
  { name: "Integrity", description: "We are honest about scope, timelines, limitations, and what a solution can realistically do." },
  { name: "Continuous improvement", description: "Software is refined over time as needs and feedback evolve." },
  { name: "Partnership", description: "We work alongside clients as a long-term technology partner, not a one-off vendor." },
];

export const qualityCommitments: string[] = [
  "Clear requirements and agreed scope before development begins",
  "Regular communication and review points throughout delivery",
  "Appropriate usability, functional, security, and performance testing",
  "Responsible handling of client data and access credentials",
  "Documentation, training, and formal handover at project close",
  "Defined maintenance and change-management arrangements after launch",
];

export const differentiators: string[] = [
  "Grounded in Liberia's operating environment while capable of working with international standards and partners",
  "Focused on practical, working systems rather than speculative technology for its own sake",
  "Engagement continues after launch through defined maintenance and support arrangements",
  "Transparent about scope, assumptions, and limitations from the first conversation",
];
