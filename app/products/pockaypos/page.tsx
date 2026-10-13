import type { Metadata } from "next";
import { Check, ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ModulePanels } from "@/components/story/module-panels";
import { PosDemo } from "@/components/story/pos-demo";
import { getProductBySlug, pockaypos } from "@/content/products";

const accent = "var(--pockaypos)";
const tint = (percent: number) => `color-mix(in srgb, ${accent} ${percent}%, transparent)`;
const product = getProductBySlug("pockaypos")!;
const whyIcons = [Smartphone, WifiOff, ShieldCheck];

export const metadata: Metadata = buildMetadata({
  title: `${pockaypos.name} — Point of Sale`,
  description: product.summary,
  path: "/products/pockaypos",
});

export default function PockayPosPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: pockaypos.name,
              description: product.summary,
              url: pockaypos.website,
              applicationCategory: "BusinessApplication",
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
              { label: pockaypos.name, href: "/products/pockaypos" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: pockaypos.name }]} />
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
          {product.category}
        </p>
        <SplitHeading
          as="h1"
          text={pockaypos.headline}
          className="mt-5 block max-w-4xl text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.05] tracking-tight"
        />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">{pockaypos.overview}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="#demo" icon={false}>
            Try the live demo
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us for setup
          </Button>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ink-muted)]">
          {pockaypos.heroPoints.map((point) => (
            <li key={point} className="flex items-center gap-1.5">
              <Check size={15} aria-hidden="true" style={{ color: accent }} />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--ink-muted)]">
          Designed &amp; built by MartEX
        </p>
      </div>

      {/* Live demo */}
      <section id="demo" className="container-page mt-16 scroll-mt-28">
        <Reveal>
          <PosDemo catalog={pockaypos.demoCatalog} barcodes={pockaypos.demoBarcodes} exchangeRate={pockaypos.exampleExchangeRate} />
        </Reveal>
      </section>

      {/* Why */}
      <section className="mt-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Eyebrow>{pockaypos.whyEyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-tight">
              {pockaypos.whyStatement}
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-[var(--ink-muted)]">{pockaypos.whyDescription}</p>
          </Reveal>
          <StaggerGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {pockaypos.trustPoints.map((point, index) => {
              const Icon = whyIcons[index];
              return (
                <StaggerItem key={point}>
                  <div className="flex h-full gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-xl"
                      style={{ backgroundColor: tint(14), color: accent }}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-relaxed text-[var(--ink)]">{point}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-24">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Ring up a sale in three steps." />
          <StaggerGroup className="grid gap-4 md:grid-cols-3">
            {pockaypos.howItWorks.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <span
                    className="grid size-9 place-items-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: tint(14), color: accent }}
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-24 scroll-mt-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Features"
            title="Everything a shop, restaurant, or kiosk needs."
            description="From ringing up a sale to buying wholesale stock, PockayPOS covers the whole counter — not just the till."
          />
          <ModulePanels groups={pockaypos.moduleGroups} accent={accent} />
        </div>
      </section>

      {/* Pricing */}
      <section className="mt-24">
        <div className="container-page">
          <SectionHeading eyebrow="Pricing" title="One flat price, per business." />
          <div className="mx-auto max-w-md rounded-3xl border p-8 text-center" style={{ borderColor: accent }}>
            <p className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold tracking-tight" style={{ color: accent }}>
                ${pockaypos.pricing.amount}
              </span>
              <span className="text-lg font-semibold text-[var(--ink-muted)]">/{pockaypos.pricing.period}</span>
            </p>
            <p className="mt-3 text-sm text-[var(--ink-muted)]">{pockaypos.pricing.note}</p>
            <ul className="mt-6 grid gap-2.5 text-left text-sm">
              {pockaypos.pricing.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[var(--ink)]">
                  <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: accent }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/contact" className="w-full justify-center">
                Contact us for setup
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-24">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ready to simplify your counter?</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              MartEX sets up PockayPOS with you — your products, your currencies, your locations.
            </p>
          </div>
          <Button href="/contact">Contact us for setup</Button>
        </div>
      </section>
    </div>
  );
}
