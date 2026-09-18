import type { Metadata } from "next";
import { CheckCircle2, HeartHandshake, MapPin, Puzzle, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { company, audiences, contact } from "@/content/company";
import { coreValues, qualityCommitments, differentiators } from "@/content/values";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Learn about ${company.name}'s mission, vision, values, and approach to building practical software for organizations in Liberia and beyond.`,
  path: "/about",
});

const valueIcons: Record<string, typeof Puzzle> = {
  "Problem solving": Puzzle,
  Reliability: ShieldCheck,
  Simplicity: Sparkles,
  Integrity: HeartHandshake,
  "Continuous improvement": TrendingUp,
  Partnership: Users,
};

export default function AboutPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "About", href: "/about" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <Eyebrow>About MartEX</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          A technology partner grounded in how organizations actually operate.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          {company.elevatorPitch}
        </p>
      </div>

      <div className="container-page mt-20 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <Eyebrow>Mission</Eyebrow>
          <p className="mt-4 text-xl leading-relaxed tracking-tight">{company.mission}</p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <Eyebrow>Vision</Eyebrow>
          <p className="mt-4 text-xl leading-relaxed tracking-tight">{company.vision}</p>
        </Reveal>
      </div>

      <section className="mt-20">
        <div className="container-page">
          <SectionHeading eyebrow="Core values" title="What guides how we work." align="center" />
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => {
              const Icon = valueIcons[value.name] ?? Sparkles;
              return (
                <StaggerItem key={value.name}>
                  <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[var(--color-sky)]/12 text-[var(--cta)]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight">{value.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="mt-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What makes us different" title="Practical, not speculative." align="split" />
            <ul className="grid gap-4">
              {differentiators.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[var(--ink-muted)]">
                  <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Who we work with" title="Target clients." align="split" />
            <div className="flex flex-wrap gap-2.5">
              {audiences.map((audience) => (
                <span
                  key={audience.name}
                  title={audience.description}
                  className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink-muted)]"
                >
                  {audience.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quality and service commitments"
            title="What every engagement includes."
            description="Consistent commitments applied across every MartEX project, regardless of size."
          />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {qualityCommitments.map((commitment) => (
              <StaggerItem key={commitment}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cta)]" />
                  <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{commitment}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="mt-20">
        <div className="container-page">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[var(--color-sky)]/12 text-[var(--cta)]">
                <MapPin size={26} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--ink-muted)]">Based in</p>
                <p className="text-xl font-bold tracking-tight">{contact.officeLocation}</p>
              </div>
            </div>
            <Button href="/book">Book a Consultation</Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
