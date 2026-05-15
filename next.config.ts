import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Compress output for faster loads
  compress: true,
  // Power the static export if needed: output: "export"
};

export default nextConfig;
