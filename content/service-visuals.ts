/**
 * Per-service visual identity: which diagram pattern tells this service's
 * story, its content, and an accent color drawn from the existing brand
 * palette (never an off-brand hue) so each service reads as its own page
 * while staying recognizably MartEX.
 */

export type NetworkVisual = {
  kind: "network";
  nodes: string[];
  centerLabel: string;
};

export type ChaosToOrderVisual = {
  kind: "chaos-to-order";
  messyItems: string[];
  orderedItems: string[];
};

export type ResponsiveCanvasVisual = {
  kind: "responsive-canvas";
  rows: string[];
};

export type ConnectivitySyncVisual = {
  kind: "connectivity-sync";
  offlineActions: string[];
  onlineResult: string;
};

export type RoadmapPathVisual = {
  kind: "roadmap-path";
  deadEnds: string[];
  milestones: string[];
};

export type ServiceVisualConfig =
  | NetworkVisual
  | ChaosToOrderVisual
  | ResponsiveCanvasVisual
  | ConnectivitySyncVisual
  | RoadmapPathVisual;

export type ServiceVisual = {
  accent: string;
  visual: ServiceVisualConfig;
};

export const serviceVisuals: Record<string, ServiceVisual> = {
  "custom-software-development": {
    accent: "var(--color-primary)",
    visual: {
      kind: "network",
      nodes: ["Spreadsheet", "Email thread", "Paper form", "Sticky notes"],
      centerLabel: "Your system",
    },
  },
  "web-application-development": {
    accent: "var(--color-tech-blue)",
    visual: {
      kind: "responsive-canvas",
      rows: ["Service request", "Status tracker", "Account details", "Support message"],
    },
  },
  "mobile-application-development": {
    accent: "var(--color-sky)",
    visual: {
      kind: "connectivity-sync",
      offlineActions: ["Site visit logged", "Photo captured", "Form completed"],
      onlineResult: "3 records synced",
    },
  },
  "business-process-automation": {
    accent: "var(--color-primary)",
    visual: {
      kind: "chaos-to-order",
      messyItems: ["Email request", "Manager sign-off", "Second approval", "Manual filing"],
      orderedItems: ["Submitted", "Reviewed", "Approved", "Recorded"],
    },
  },
  "information-management-systems": {
    accent: "var(--color-slate)",
    visual: {
      kind: "chaos-to-order",
      messyItems: ["Shared drive", "Paper folder", "Personal laptop", "Old spreadsheet"],
      orderedItems: ["Indexed", "Searchable", "Permissioned", "Backed up"],
    },
  },
  "systems-integration": {
    accent: "var(--color-tech-blue)",
    visual: {
      kind: "network",
      nodes: ["Finance system", "Customer records", "Payments", "Reporting tool"],
      centerLabel: "Connected data",
    },
  },
  "technology-consulting": {
    accent: "var(--color-sky)",
    visual: {
      kind: "roadmap-path",
      deadEnds: ["Unclear requirements", "Vendor lock-in", "Scope creep"],
      milestones: ["Discovery", "Requirements", "Roadmap", "Implementation"],
    },
  },
};

export function getServiceVisual(slug: string): ServiceVisual {
  return (
    serviceVisuals[slug] ?? {
      accent: "var(--color-primary)",
      visual: { kind: "network", nodes: ["Input", "Process", "Output"], centerLabel: "System" },
    }
  );
}
