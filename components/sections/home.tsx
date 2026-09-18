import { Layers3, LineChart, ShieldCheck, TrendingUp, Workflow } from "lucide-react";
import { Button, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { ServiceCard, CaseStudyCard, ValuePropCard } from "@/components/cards";
import { SystemVisualization } from "@/components/motion/system-visualization";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ProcessScrollNarrative } from "@/components/motion/process-scroll";
import { services, maintenanceAndSupport } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { audiences, company } from "@/content/company";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[9.5rem] pb-24">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Software development &amp; technology solutions · Monrovia, Liberia</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.98] tracking-tight">
            {company.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)]">
            {company.shortDescription}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton>
              <Button href="/book">Book a Consultation</Button>
            </MagneticButton>
            <Button href="/services" variant="secondary">
              Explore Our Services
            </Button>
          </div>
        </div>
        <SystemVisualization />
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Built for real operations"
          title="Local understanding. Broad capability."
          description="A software development and technology partner for organizations in Liberia and beyond — focused on practical outcomes, dependable delivery, and continuing support."
        />
        <StaggerGroup className="flex flex-wrap gap-3">
          {audiences.map((audience) => (
            <StaggerItem key={audience.name}>
              <span
                title={audience.description}
                className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink-muted)]"
              >
                {audience.name}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section id="services" className="py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="From operating challenge to working system."
          description="Each engagement starts with how work happens today — and what needs to become clearer, faster, or more dependable."
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center rounded-lg bg-[var(--color-sky)]/12 px-2.5 py-1 text-xs font-bold text-[var(--cta)]">
                Continuing capability
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-tight">{maintenanceAndSupport.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
                {maintenanceAndSupport.description}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const valueProps = [
  { icon: Layers3, title: "Business alignment", description: "Design decisions tied to the operation and its intended outcomes, not generic templates." },
  { icon: Workflow, title: "Efficiency", description: "Clearer flows that reduce avoidable repetition, manual data entry, and handoff friction." },
  { icon: LineChart, title: "Visibility", description: "Useful, current information presented to the people who actually need it to act." },
  { icon: TrendingUp, title: "Scalability", description: "A foundation designed to evolve as the organization and its needs grow." },
  { icon: ShieldCheck, title: "Continuity", description: "Documentation, handover, maintenance, and planned improvement after launch." },
];

export function ValueProps() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading eyebrow="Why MartEX" title="Technology measured by how well it works." align="center" />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <StaggerItem key={prop.title}>
              <ValuePropCard {...prop} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured work"
          title="Evidence, without invention."
          description="Verified client case studies will appear here once approved. Until then, explore clearly labeled concept demonstrations."
        />
        <StaggerGroup className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <StaggerItem key={caseStudy.slug}>
              <CaseStudyCard caseStudy={caseStudy} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our process"
          title="Clarity, built in stages."
          description="We move from the business problem toward a supported digital system, with decisions and review points visible along the way."
        />
        <ProcessScrollNarrative />
        <div className="mt-10">
          <Button href="/process" variant="secondary">
            See how we work in detail
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="py-16">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--color-navy)] px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(77,154,209,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(94,161,223,0.3), transparent 45%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-sky)]">Begin with the problem</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-tight text-white">
                Let&rsquo;s turn your business challenge into a working digital solution.
              </h2>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button href="/book" className="bg-[var(--color-sky)] text-[var(--color-navy)]">
                  Book a Consultation
                </Button>
                <Button href="/contact" variant="secondary" className="border-white/25 bg-transparent text-white hover:border-white">
                  Start a Conversation
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
