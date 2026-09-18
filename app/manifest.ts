import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} | ${company.tagline}`,
    short_name: company.name,
    description: company.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFB",
    theme_color: "#0D172D",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
