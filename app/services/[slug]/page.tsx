import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { XCircle, Users2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, SectionHeading } from "@/components/ui/primitives";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ServiceCard } from "@/components/cards";
import { ServiceDiagram } from "@/components/story/service-diagram";
import { CapabilityModules } from "@/components/story/capability-modules";
import { ScenarioStory } from "@/components/story/scenario-story";
import { TechProcessStrip } from "@/components/story/tech-process-strip";
import { ProofStrip } from "@/components/story/proof-strip";
import { getServiceBySlug, services } from "@/content/services";
import { getServiceVisual } from "@/content/service-visuals";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { accent, visual } = getServiceVisual(service.slug);
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="pb-24 pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
            ])
          ),
        }}
      />
      {service.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(service.faqs)) }} />
      )}

      {/* Hero — the diagram carries the concept, not a paragraph */}
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
            Service
          </p>
          <SplitHeading
            as="h1"
            text={service.heroStatement}
            className="mt-4 block max-w-xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-tight"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)]">{service.overview}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/book">Book a Consultation</Button>
            <Button href="#how-it-works" variant="secondary" icon={false}>
              See how it works
            </Button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-elevated)]">
          <ServiceDiagram visual={visual} accent={accent} />
        </div>
      </div>

      {/* The problem, briefly */}
      <div className="container-page mt-20 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold tracking-tight">What&rsquo;s not working today</h2>
          <ul className="mt-5 grid gap-3">
            {service.problems.map((problem) => (
              <li key={problem} className="flex items-start gap-3 text-sm text-[var(--ink-muted)]">
                <XCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--ink-muted)]" />
                {problem}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
            <Users2 size={20} aria-hidden="true" style={{ color: accent }} />
            Who it&rsquo;s for
          </h2>
          <ul className="mt-5 grid gap-3">
            {service.whoItsFor.map((audience) => (
              <li key={audience} className="text-sm text-[var(--ink-muted)]">
                {audience}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* How MartEX delivers this */}
      <section id="how-it-works" className="mt-16 scroll-mt-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="From this problem to a working system."
            description="The same delivery approach behind every engagement, applied to this service."
          />
          <TechProcessStrip steps={service.approach} accent={accent} />
        </div>
      </section>

      {/* Capabilities as connected modules */}
      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="Capabilities" title="What this service includes" />
          <CapabilityModules capabilities={service.capabilities} accent={accent} />
          <div className="mt-8 flex flex-wrap gap-2">
            {service.useCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-muted)]"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Real-world scenario */}
      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="In practice" title="What this looks like for a real organization" />
          <ScenarioStory scenario={service.scenario} accent={accent} />
        </div>
      </section>

      {/* Proof, honestly */}
      <section className="mt-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="What you receive"
            title="Proof, not promises."
            description="No invented statistics — here's what a client walks away with, and any verified work already linked to this service."
          />
          <ProofStrip serviceSlug={service.slug} deliverables={service.deliverables} accent={accent} />
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="mt-16">
          <div className="container-page max-w-3xl">
            <SectionHeading eyebrow="FAQs" title="Frequently asked questions" align="split" />
            <FaqAccordion items={service.faqs} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <div className="container-page">
            <SectionHeading eyebrow="Related services" title="You might also need" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ServiceCard key={item.slug} service={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mt-16">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ready to talk about {service.title.toLowerCase()}?</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              Book a consultation to discuss your specific requirements and constraints.
            </p>
          </div>
          <Button href="/book">Book a Consultation</Button>
        </div>
      </section>
    </div>
  );
}
