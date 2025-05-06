import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint during builds
  },
  // Add other config options below as needed
};

export default nextConfig;
