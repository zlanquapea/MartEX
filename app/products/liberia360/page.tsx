import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, SectionHeading, Tag } from "@/components/ui/primitives";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { PhoneMockup } from "@/components/story/phone-mockup";
import { WelcomeScreen, DiscoverScreen, TripScreen } from "@/components/story/liberia360-screens";
import { getProductBySlug, liberia360 } from "@/content/products";

const accent = "var(--color-tech-blue)";
const product = getProductBySlug("liberia360")!;

const phoneScreens = [
  { key: "welcome", content: <WelcomeScreen /> },
  { key: "discover", content: <DiscoverScreen /> },
  { key: "trip", content: <TripScreen /> },
];

export const metadata: Metadata = buildMetadata({
  title: liberia360.name,
  description: product.summary,
  path: "/products/liberia360",
});

export default function Liberia360Page() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: liberia360.name,
              description: product.summary,
              url: liberia360.website,
              applicationCategory: "TravelApplication",
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
              { label: liberia360.name, href: "/products/liberia360" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.75fr]">
        <div>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: liberia360.name }]} />
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {product.category}
          </p>
          <SplitHeading
            as="h1"
            text={liberia360.tagline}
            className="mt-4 block max-w-xl text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.05] tracking-tight"
          />
          <p className="mt-3 text-base font-semibold" style={{ color: accent }}>
            {liberia360.subtagline}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)]">{liberia360.overview}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={liberia360.website} external>
              Visit LIBERIA360
            </Button>
            <Button href="#features" variant="secondary" icon={false}>
              See what it does
            </Button>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--ink-muted)]">
            Designed &amp; built by MartEX
          </p>
        </div>
        <PhoneMockup screens={phoneScreens} accent={accent} />
      </div>

      {/* Platform note */}
      <div className="container-page mt-16">
        <Reveal className="flex items-start gap-4 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
          >
            <WifiOff size={20} aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{liberia360.platformNote}</p>
        </Reveal>
      </div>

      {/* Feature areas */}
      <section id="features" className="mt-16 scroll-mt-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What it does"
            title="Everything a traveler needs, in one place."
            description="Everything below is real and working today — not just a promise."
          />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {liberia360.featureAreas.map((feature) => (
              <StaggerItem key={feature.area} variant="rise">
                <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <Tag style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}>
                    {feature.area}
                  </Tag>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{feature.capabilities}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Honesty note */}
      <section className="mt-16">
        <div className="container-page">
          <Reveal className="rounded-3xl border border-dashed border-[var(--line)] p-8">
            <Eyebrow>Coming soon</Eyebrow>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">{liberia360.notYetImplemented}</p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-16">
        <div className="container-page flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ready to explore Liberia?</h2>
            <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
              LIBERIA360 is live at {liberia360.website.replace("https://", "")}.
            </p>
          </div>
          <Button href={liberia360.website} external>
            Visit LIBERIA360
          </Button>
        </div>
      </section>
    </div>
  );
}
