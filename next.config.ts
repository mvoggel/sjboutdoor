import type { NextConfig } from "next";

// basePath is only needed when the site is served from a sub-path. The GitHub
// Pages staging deploy sets NEXT_PUBLIC_BASE_PATH=/sjboutdoor (see deploy.yml);
// the production Cloudflare Pages build serves from the apex root and leaves it
// unset, so basePath resolves to "". Local `next dev` also runs at the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
