import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Exclude API routes from static export
  // The update API is served as a static JSON file at /api/update.json
};

export default nextConfig;
