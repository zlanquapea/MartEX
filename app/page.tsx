import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";
import {
  Hero,
  TrustStrip,
  ServicesGrid,
  ValueProps,
  ProcessSection,
  FeaturedWork,
  FinalCta,
} from "@/components/sections/home";
import { SolutionExplorer } from "@/components/sections/solution-explorer";
import { SectionHeading } from "@/components/ui/primitives";
import { Scene } from "@/components/motion/scene";
import { HomeSignalRail } from "@/components/motion/home-signal-rail";

export const metadata: Metadata = buildMetadata({
  title: "MartEX",
  description:
    "MartEX designs practical software that helps organizations automate work, manage information, improve decisions, and deliver better services.",
  path: "/",
  isHome: true,
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <HomeSignalRail />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <Scene>
        <section id="solutions" className="bg-[var(--surface)] py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Solution explorer"
              title="Find the system behind the challenge."
              description="Explore adaptable solution categories by business challenge or industry. Final scope is always based on discovery and agreed requirements."
            />
            <SolutionExplorer />
          </div>
        </section>
      </Scene>
      <ValueProps />
      <ProcessSection />
      <FeaturedWork />
      <FinalCta />
    </>
  );
}
