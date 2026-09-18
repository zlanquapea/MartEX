import type { ServiceVisualConfig } from "@/content/service-visuals";
import { NetworkDiagram } from "./network-diagram";
import { ChaosToOrder } from "./chaos-to-order";
import { ResponsiveCanvas } from "./responsive-canvas";
import { ConnectivitySync } from "./connectivity-sync";
import { RoadmapPath } from "./roadmap-path";

/** Dispatches to the right diagram pattern for a service's visual config. */
export function ServiceDiagram({ visual, accent }: { visual: ServiceVisualConfig; accent: string }) {
  switch (visual.kind) {
    case "network":
      return <NetworkDiagram nodes={visual.nodes} centerLabel={visual.centerLabel} accent={accent} />;
    case "chaos-to-order":
      return <ChaosToOrder messyItems={visual.messyItems} orderedItems={visual.orderedItems} accent={accent} />;
    case "responsive-canvas":
      return <ResponsiveCanvas rows={visual.rows} accent={accent} />;
    case "connectivity-sync":
      return <ConnectivitySync offlineActions={visual.offlineActions} onlineResult={visual.onlineResult} accent={accent} />;
    case "roadmap-path":
      return <RoadmapPath deadEnds={visual.deadEnds} milestones={visual.milestones} accent={accent} />;
    default:
      return null;
  }
}
