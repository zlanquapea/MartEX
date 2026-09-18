"use client";

import { railStops, ScrollSignalRail } from "./scroll-progress";
import { useActiveSection } from "./use-active-section";

export function HomeSignalRail() {
  const activeId = useActiveSection(railStops.map((stop) => stop.id));
  return <ScrollSignalRail activeId={activeId} />;
}
