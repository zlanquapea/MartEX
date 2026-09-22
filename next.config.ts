import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Next's default client Router Cache keeps a static page's prefetched
    // payload for 5 minutes. A visitor with a tab open across a deploy (or
    // who prefetched a link just before one) would click through and see
    // stale content until a hard refresh. Since every page here is static
    // and cheap to re-fetch, correctness after a deploy matters more than
    // the small saving from caching it — every client-side navigation now
    // always fetches the current build's content.
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
