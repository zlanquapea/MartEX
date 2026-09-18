import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ImageOff, Plug, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, solutionJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading, Tag } from "@/components/ui/primitives";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { SolutionCard } from "@/components/cards";
import { getSolutionBySlug, solutions } from "@/content/solutions";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return buildMetadata({
    title: solution.name,
    description: solution.valueProposition,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const related = solutions.filter((item) => item.slug !== solution.slug && item.category === solution.category).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : solutions.filter((item) => item.slug !== solution.slug).slice(0, 3);

  return (
    <div className="pb-24 pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionJsonLd(solution)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: solution.name, href: `/solutions/${solution.slug}` },
            ])
          ),
        }}
      />
      {solution.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(solution.faqs)) }} />
      )}

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: solution.name }]} />
          <Tag>Concept solution · {solution.category}</Tag>
          <h1 className="mt-4 max-w-xl text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.03] tracking-tight">
            {solution.valueProposition}
          </h1>
          <p className="mt-5 max-w-xl text-[var(--ink-muted)]">
            This is a conceptual capability demonstration, not a finalized MartEX product. Scope, features, and
            pricing are defined through discovery for each client.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/book">Request Pricing</Button>
            <Button href="/contact" variant="secondary">
              Ask a question
            </Button>
          </div>
        </div>
        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-8 text-center">
          <ImageOff size={28} aria-hidden="true" className="text-[var(--ink-muted)]" />
          <p className="text-sm font-semibold text-[var(--ink-muted)]">Interface preview coming soon</p>
          <p className="text-xs text-[var(--ink-muted)]">Screenshots are added once a real interface is built for a client engagement.</p>
        </div>
      </div>

      <div className="container-page mt-20 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold tracking-tight">The business problem</h2>
          <p className="mt-4 text-[var(--ink-muted)] leading-relaxed">{solution.businessChallenge}</p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold tracking-tight">Who it&rsquo;s for</h2>
          <ul className="mt-4 grid gap-2.5">
            {solution.targetAudience.map((audience) => (
              <li key={audience} className="text-sm text-[var(--ink-muted)]">
                {audience}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {solution.industries.map((industry) => (
              <span key={industry} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink-muted)]">
                {industry}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="Core features" title="What it includes" />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.coreFeatures.map((feature) => (
              <StaggerItem key={feature}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 text-sm text-[var(--ink)]">
                  <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                  {feature}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="mt-16">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Benefits" title="Why it matters" align="split" />
            <ul className="grid gap-3">
              {solution.benefits.map((benefit) => (
                <li key={benefit} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-muted)]">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Workflow" title="How it works" align="split" />
            <ol className="grid gap-3">
              {solution.workflow.map((step, index) => (
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
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
              <Plug size={20} aria-hidden="true" className="text-[var(--cta)]" />
              Integrations
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {solution.integrations.map((integration) => (
                <li key={integration} className="text-sm text-[var(--ink-muted)]">
                  {integration}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
              <ShieldCheck size={20} aria-hidden="true" className="text-[var(--cta)]" />
              Security &amp; data handling
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">{solution.security}</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="container-page">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
            <Eyebrow>Pricing</Eyebrow>
            <p className="mt-3 text-2xl font-bold tracking-tight">Request pricing</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--ink-muted)]">
              Pricing depends on scope, integrations, and data volume. Book a consultation for an estimate specific
              to your organization.
            </p>
          </div>
        </div>
      </section>

      {solution.faqs.length > 0 && (
        <section className="mt-16">
          <div className="container-page max-w-3xl">
            <SectionHeading eyebrow="FAQs" title="Frequently asked questions" align="split" />
            <FaqAccordion items={solution.faqs} />
          </div>
        </section>
      )}

      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="Related solutions" title="You might also explore" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackRelated.map((item) => (
              <SolutionCard key={item.slug} solution={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Let&rsquo;s scope this for your organization.</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              Book a consultation to discuss requirements, timeline, and budget for {solution.name.toLowerCase()}.
            </p>
          </div>
          <Button href="/book">Book a Consultation</Button>
        </div>
      </section>
    </div>
  );
}
