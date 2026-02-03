import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-4535c75232f14a22bb06f928cebb433a.r2.dev',
      },
    ],
  },
}

export default nextConfig
