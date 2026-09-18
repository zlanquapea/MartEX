import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { caseStudies } from "@/content/case-studies";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/work",
    "/process",
    "/book",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const dynamicRoutes = [
    ...services.map((service) => `/services/${service.slug}`),
    ...solutions.map((solution) => `/solutions/${solution.slug}`),
    ...caseStudies.map((caseStudy) => `/work/${caseStudy.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
