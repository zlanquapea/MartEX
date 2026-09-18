import type { Metadata } from "next";
import { company } from "@/content/company";
import { getSiteUrl } from "./utils";

export function buildMetadata({
  title,
  description,
  path = "/",
  isHome = false,
}: {
  title: string;
  description: string;
  path?: string;
  isHome?: boolean;
}): Metadata {
  const siteUrl = getSiteUrl();
  const fullTitle = isHome ? `${title} | ${company.tagline}` : `${title} | ${company.name}`;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
