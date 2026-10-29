import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind CSS is small enough to ship inside the HTML; this removes the render-blocking
    // stylesheet request, which was the last thing gating first paint on slow mobile connections
    inlineCss: true,
  },
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
