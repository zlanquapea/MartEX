import type { Metadata } from "next";
import { Check, Download, Send, Users, X } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { KuuWorkspace } from "@/components/story/kuu-workspace";
import { getProductBySlug, kuu } from "@/content/products";

const accent = "var(--kuu)";
const tint = (percent: number) => `color-mix(in srgb, ${accent} ${percent}%, transparent)`;
const product = getProductBySlug("kuu")!;
const whyIcons = [Download, Send, Users];

export const metadata: Metadata = buildMetadata({
  title: `${kuu.name} — Team Workspace`,
  description: product.summary,
  path: "/products/kuu",
});

export default function KuuPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: kuu.name,
              description: product.summary,
              url: kuu.website,
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
              { label: kuu.name, href: "/products/kuu" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: kuu.name }]} />
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={kuu.icon} alt="" width={36} height={36} className="size-9 rounded-xl" />
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {product.category}
          </p>
        </div>
        <SplitHeading
          as="h1"
          text={kuu.headline}
          className="mt-5 block max-w-4xl text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.05] tracking-tight"
        />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">{kuu.overview}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href={kuu.signUpUrl} external>
            Start your free 14-day trial
          </Button>
          <Button href="#features" variant="secondary" icon={false}>
            See what it does
          </Button>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ink-muted)]">
          {kuu.heroPoints.map((point) => (
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

      {/* Product preview */}
      <div className="container-page mt-16">
        <Reveal>
          <KuuWorkspace />
        </Reveal>
      </div>

      {/* What it replaces */}
      <section className="mt-16" aria-labelledby="kuu-replaces">
        <div className="container-page">
          <p id="kuu-replaces" className="text-center text-sm font-semibold text-[var(--ink-muted)]">
            One workspace instead of scattered tools
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {kuu.replaces.map((tool) => (
              <li
                key={tool}
                className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1.5 text-sm text-[var(--ink-muted)]"
              >
                <X size={13} aria-hidden="true" style={{ color: accent }} />
                <span className="line-through decoration-[var(--line)]">{tool}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16">
        <div className="container-page">
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kuu.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <p className="text-4xl font-bold tracking-tight" style={{ color: accent }}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{stat.label}</p>
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
            title="Everything a busy team needs, in one place."
            description="Chat, tasks, projects, docs, and meetings that link to each other — so a decision in a meeting becomes a task with an owner, not a forgotten note."
          />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kuu.features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <h3 className="text-base font-bold tracking-tight">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why */}
      <section className="mt-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Eyebrow>{kuu.whyEyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-tight">{kuu.whyTitle}</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-[var(--ink-muted)]">{kuu.whyDescription}</p>
          </Reveal>
          <StaggerGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {kuu.why.map((item, index) => {
              const Icon = whyIcons[index];
              return (
                <StaggerItem key={item.title}>
                  <div className="flex h-full gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-xl"
                      style={{ backgroundColor: tint(14), color: accent }}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold tracking-tight">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">{item.description}</p>
                    </div>
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
          <SectionHeading eyebrow="How it works" title="Up and running in an afternoon." />
          <StaggerGroup className="grid gap-4 md:grid-cols-3">
            {kuu.steps.map((step, index) => (
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

      {/* Plans */}
      <section className="mt-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pricing"
            title="One flat price per workspace."
            description="Not per person. Free for up to 5 members, and every new workspace tries all Organization features free for 14 days."
          />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {kuu.plans.map((plan) => {
              const featured = plan.name === "Team";
              return (
                <StaggerItem key={plan.name}>
                  <div
                    className="h-full rounded-2xl border bg-[var(--surface)] p-5"
                    style={{ borderColor: featured ? accent : "var(--line)" }}
                  >
                    <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
                    <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
                      {plan.members}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{plan.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
          <div className="mt-8">
            <Button href={kuu.pricingUrl} variant="secondary" external>
              See current prices
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-tight">
              What teams ask before they start.
            </h2>
          </div>
          <FaqAccordion items={kuu.faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-24">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Give your team one place to work.</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              Free for 14 days. Free forever for teams of up to 5. Küü is live at {kuu.website.replace("https://", "")}.
            </p>
          </div>
          <Button href={kuu.signUpUrl} external>
            Create your workspace
          </Button>
        </div>
      </section>
    </div>
  );
}
