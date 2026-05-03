/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Required for @cloudflare/next-on-pages — disables server components
  // that depend on Node.js APIs unavailable in Cloudflare Workers
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

module.exports = nextConfig;
