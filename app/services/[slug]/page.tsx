import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Users2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/cards";
import { getServiceBySlug, services } from "@/content/services";

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

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
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

      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
        <Eyebrow>Service</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          {service.heroStatement}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">{service.overview}</p>
        <div className="mt-9">
          <Button href="/book">Book a Consultation</Button>
        </div>
      </div>

      <div className="container-page mt-20 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold tracking-tight">Problems this service solves</h2>
          <ul className="mt-5 grid gap-3">
            {service.problems.map((problem) => (
              <li key={problem} className="flex items-start gap-3 text-sm text-[var(--ink-muted)]">
                <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                {problem}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
            <Users2 size={20} aria-hidden="true" className="text-[var(--cta)]" />
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

      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="Capabilities" title="Typical capabilities" />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability) => (
              <StaggerItem key={capability}>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 text-sm font-medium text-[var(--ink)]">
                  {capability}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="mt-16">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Example use cases" title="Where this shows up" align="split" />
            <ul className="grid gap-3">
              {service.useCases.map((useCase) => (
                <li key={useCase} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-muted)]">
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Delivery approach" title="How MartEX delivers this" align="split" />
            <ol className="grid gap-3">
              {service.approach.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-muted)]">
                  <span className="font-mono text-[var(--cta)]">0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="What you receive" title="Expected deliverables" />
          <div className="grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <div key={deliverable} className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                <p className="text-sm text-[var(--ink-muted)]">{deliverable}</p>
              </div>
            ))}
          </div>
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
