import { company, contact } from "@/content/company";
import type { Service } from "@/content/services";
import type { Solution } from "@/content/solutions";
import type { Faq } from "@/content/services";
import { getSiteUrl } from "./utils";

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    description: company.shortDescription,
    slogan: company.tagline,
    foundingDate: String(company.established),
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monrovia",
      addressCountry: "LR",
    },
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };
}

export function serviceJsonLd(service: Service) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "LR",
    url: `${siteUrl}/services/${service.slug}`,
  };
}

export function solutionJsonLd(solution: Solution) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: solution.name,
    description: solution.valueProposition,
    applicationCategory: "BusinessApplication",
    url: `${siteUrl}/solutions/${solution.slug}`,
    offers: {
      "@type": "Offer",
      priceSpecification: "Request pricing",
    },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function contactPointJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    about: { "@id": `${getSiteUrl()}/#organization` },
    description: `Contact ${company.name} in ${contact.officeLocation}.`,
  };
}
