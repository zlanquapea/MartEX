import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { getCaseStudyBySlug, caseStudies } from "@/content/case-studies";
import { getServiceBySlug } from "@/content/services";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

function Block({ heading, content }: { heading: string; content?: string }) {
  if (!content) return null;
  return (
    <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
      <h2 className="text-xl font-bold tracking-tight">{heading}</h2>
      <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">{content}</p>
    </Reveal>
  );
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const relatedService = getServiceBySlug(study.serviceSlug);

  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", href: "/" },
              { label: "Work", href: "/work" },
              { label: study.title, href: `/work/${study.slug}` },
            ])
          ),
        }}
      />
      <div className="container-page max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: study.title }]} />
        <div className="flex flex-wrap items-center gap-2">
          <Tag>Concept solution</Tag>
          <span className="text-sm font-medium text-[var(--ink-muted)]">{study.industry}</span>
        </div>
        <Eyebrow>Case study</Eyebrow>
        <h1 className="mt-2 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] tracking-tight">{study.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--ink-muted)]">{study.summary}</p>
      </div>

      <div className="container-page mt-16 grid max-w-3xl gap-6">
        <Block heading="Client context" content={study.clientContext} />
        <Block heading="The challenge" content={study.challenge} />
        <Block heading="Research & discovery" content={study.discovery} />
        <Block heading="The solution" content={study.solution} />
        <Block heading="UX & technical approach" content={study.uxTechnicalApproach} />
        <Block heading="Implementation" content={study.implementation} />
        <Block heading="Outcomes" content={study.outcomes} />

        {study.technologyUsed && study.technologyUsed.length > 0 && (
          <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <h2 className="text-xl font-bold tracking-tight">Technology used</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.technologyUsed.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink-muted)]">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {study.clientQuote && (
          <figure className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <blockquote className="text-lg leading-relaxed">&ldquo;{study.clientQuote.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-[var(--ink-muted)]">{study.clientQuote.attribution}</figcaption>
          </figure>
        )}
      </div>

      {relatedService && (
        <section className="mt-16">
          <div className="container-page max-w-3xl">
            <SectionHeading eyebrow="Related service" title={relatedService.title} align="split" />
            <Button href={`/services/${relatedService.slug}`} variant="secondary">
              View service details
            </Button>
          </div>
        </section>
      )}

      <section className="mt-16">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Have a similar challenge?</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              Book a consultation to talk through your specific situation.
            </p>
          </div>
          <Button href="/book">Book a Consultation</Button>
        </div>
      </section>
    </div>
  );
}
