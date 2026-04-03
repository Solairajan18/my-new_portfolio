import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG badge images (e.g. aws-saa.svg, azure-fundamentals.svg)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
