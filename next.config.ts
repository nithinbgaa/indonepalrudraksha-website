import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/CSS/JS served from Cloudflare Pages.
// No server, no database. See CLAUDE.md for what that rules out.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Hide Next.js's "N" badge that `npm run dev` shows in the corner. It never appears on the live
  // site; build and runtime errors still pop up during development.
  devIndicators: false,
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
