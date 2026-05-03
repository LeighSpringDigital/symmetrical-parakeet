const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  webpack: (config, { nextRuntime }) => {
    // Apply React alias only to server/client bundles (nextRuntime === "nodejs"
    // or undefined for client). This forces a single React instance in the
    // Node.js prerender workers, fixing "Cannot read properties of null
    // (reading 'useContext')". Excluded from edge builds to avoid bundling
    // the browser scheduler (which uses MessageChannel, banned in edge runtime).
    if (nextRuntime !== "edge") {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
        "react/jsx-runtime": path.resolve(
          __dirname,
          "node_modules/react/jsx-runtime"
        ),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
