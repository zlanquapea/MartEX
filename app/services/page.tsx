import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow, Tag } from "@/components/ui/primitives";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/cards";
import { services, maintenanceAndSupport } from "@/content/services";
import { company } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: `Explore ${company.name}'s software development and technology services, from custom software to systems integration and technology consulting.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Services", href: "/services" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          Seven ways we turn operating challenges into working systems.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          Every engagement is scoped around the problem in front of you — these are the capabilities we draw on to
          solve it.
        </p>
      </div>

      <div className="container-page mt-16">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Tag>Continuing capability</Tag>
            <h2 className="mt-3 text-xl font-bold tracking-tight">{maintenanceAndSupport.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
              {maintenanceAndSupport.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container-page mt-16 flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Not sure which service fits?</h2>
          <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
            Book a consultation and we&rsquo;ll help identify the right starting point for your organization.
          </p>
        </div>
        <Button href="/book">Book a Consultation</Button>
      </div>
    </div>
  );
}
