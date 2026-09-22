import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Breadcrumbs, Button, Eyebrow } from "@/components/ui/primitives";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ProductCard } from "@/components/cards";
import { products } from "@/content/products";
import { company } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description: `Lichen MD and LIBERIA360 — the software products ${company.name} designs, builds, and operates itself.`,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="pb-24 pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Products", href: "/products" }])),
        }}
      />
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
        <Eyebrow>Products</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-tight">
          Two products we design, build, and run ourselves.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          Beyond client engagements, MartEX develops and operates its own software — real, shipping products, not
          concept demonstrations.
        </p>
      </div>

      <div className="container-page mt-16">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div className="container-page mt-16 flex flex-col items-start gap-6 rounded-[2.5rem] border border-[var(--line)] bg-[var(--surface)] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Need something built for your organization?</h2>
          <p className="mt-2 max-w-lg text-[var(--ink-muted)]">
            These are MartEX&rsquo;s own products. For custom work, see our services or book a consultation.
          </p>
        </div>
        <Button href="/book">Book a Consultation</Button>
      </div>
    </div>
  );
}
