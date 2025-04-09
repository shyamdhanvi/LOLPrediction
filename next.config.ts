import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your configuration options here
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*", // Proxy to Flask backend
      },
    ];
  },
};

export default nextConfig;
