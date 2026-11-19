import type { NextConfig } from "next";

const codespaceName = process.env.CODESPACE_NAME;
const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
const codespaceOrigin = codespaceName && forwardingDomain
  ? `${codespaceName}-3000.${forwardingDomain}`
  : undefined;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Codespaces rewrites the browser origin to localhost on the development tunnel.
      allowedOrigins: process.env.NODE_ENV === "development" && codespaceOrigin
        ? [codespaceOrigin, "localhost:3000"]
        : [],
    },
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
