import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Undo2, FileCheck2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { ModulePanels } from "@/components/story/module-panels";
import { getProductBySlug, lichenMD } from "@/content/products";

const accent = "var(--color-primary)";
const product = getProductBySlug("lichen-md")!;

export const metadata: Metadata = buildMetadata({
  title: lichenMD.name,
  description: product.summary,
  path: "/products/lichen-md",
});

export default function LichenMDPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: lichenMD.name,
              description: product.summary,
              url: "https://martex.com.lr/products/lichen-md",
              applicationCategory: "HealthApplication",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: lichenMD.name, href: "/products/lichen-md" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: lichenMD.name }]} />
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {lichenMD.eyebrow}
          </p>
          <SplitHeading
            as="h1"
            text={lichenMD.heroStatement}
            className="mt-4 block max-w-xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-tight"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)]">{lichenMD.overview}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/book">Request a Demo</Button>
            <Button href={lichenMD.brochureHref} variant="secondary" external icon={false}>
              Download brochure (PDF)
            </Button>
          </div>
        </div>
        <Reveal className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-elevated)]">
          <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-4 py-3" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[var(--line)]" />
            <span className="size-2.5 rounded-full bg-[var(--line)]" />
            <span className="size-2.5 rounded-full bg-[var(--line)]" />
          </div>
          <Image
            src={lichenMD.screen.src}
            alt={lichenMD.screen.alt}
            width={lichenMD.screen.width}
            height={lichenMD.screen.height}
            className="h-auto w-full"
          />
        </Reveal>
      </div>

      {/* Why Lichen MD + stats */}
      <div className="container-page mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>{lichenMD.whyEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-md text-2xl font-bold tracking-tight sm:text-3xl">{lichenMD.whyStatement}</h2>
          <p className="mt-4 max-w-md text-[var(--ink-muted)] leading-relaxed">{lichenMD.whyDescription}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {lichenMD.stats.map((stat) => (
            <Reveal key={stat.label} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <p className="text-3xl font-bold tracking-tight" style={{ color: accent }}>
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-[var(--ink-muted)]">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Module panels */}
      <section className="mt-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What it includes"
            title="One record, from front office to revenue."
            description="Every module reads and writes the same patient chart — nothing re-entered, nothing lost at handoff."
          />
          <ModulePanels groups={lichenMD.moduleGroups} accent={accent} />
        </div>
      </section>

      {/* Reporting + journey */}
      <section className="mt-16">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-[var(--color-navy)] p-8 text-[var(--color-off-white)]">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-pale)]">Printing &amp; reporting</p>
            <div className="mt-4 grid grid-cols-2 gap-6">
              {lichenMD.reporting.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-[var(--color-pale)]">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-pale)]">{lichenMD.reporting.note}</p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-center rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <div className="flex flex-wrap items-center gap-2.5" aria-hidden="true">
              {lichenMD.journey.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2.5">
                  <span
                    className="grid size-10 place-items-center rounded-full text-xs font-bold"
                    style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
                  >
                    {step}
                  </span>
                  {index < lichenMD.journey.steps.length - 1 && (
                    <span className="h-px w-6 bg-[var(--line)] sm:w-10" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm font-medium text-[var(--ink-muted)]">{lichenMD.journey.caption}</p>
          </Reveal>
        </div>
      </section>

      {/* Trust points */}
      <section className="mt-16">
        <div className="container-page">
          <SectionHeading eyebrow="Built for hospitals" title="Trust, built into the record." />
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Undo2, text: lichenMD.trustPoints[0] },
              { icon: ShieldCheck, text: lichenMD.trustPoints[1] },
              { icon: FileCheck2, text: lichenMD.trustPoints[2] },
            ].map(({ icon: Icon, text }) => (
              <Reveal key={text} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <Icon size={22} aria-hidden="true" style={{ color: accent }} />
                <p className="mt-3.5 text-sm font-semibold leading-snug text-[var(--ink)]">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-16">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">See registration-to-discharge, live.</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              Request a demo with your own department leads, or reach the Lichen MD team directly.
            </p>
            <ul className="mt-4 grid gap-1 text-sm text-[var(--ink-muted)]">
              <li>{lichenMD.contact.web}</li>
              <li>{lichenMD.contact.email}</li>
              <li>{lichenMD.contact.phone}</li>
            </ul>
          </div>
          <Button href="/book">Request a Demo</Button>
        </div>
      </section>
    </div>
  );
}
