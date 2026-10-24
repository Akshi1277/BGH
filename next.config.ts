import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Vary",
            value: "Accept, Accept-Encoding",
          },
        ],
      },
      {
        source: "/camera-frames/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      ...["/enif-hero.mp4", "/enif-hero-poster.jpg"].map((source) => ({
        source,
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      })),
    ];
  },
  async redirects() {
    return [
      {
        source: "/enif",
        destination: "https://enif.brahmglobalholdings.com",
        permanent: true,
      },
      {
        source: "/enif/:path*",
        destination: "https://enif.brahmglobalholdings.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
