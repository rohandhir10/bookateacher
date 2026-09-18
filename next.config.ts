import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Security
  compress: true,
  poweredByHeader: false,

  // Standalone output for Vercel
  output: "standalone",

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:",
          },
        ],
      },
    ];
  },

  // Exclude better-sqlite3 from Turbopack for build stability on Vercel
  // (better-sqlite3 is a native Node module; we keep it server-side only)
  experimental: {
    turbo: {
      rules: {
        // Keep better-sqlite3 out of the edge/Turbopack bundle entirely.
        // It's only used by server-side routes and the seed script.
        "*.node": { loaders: [] },
      },
    },
  },

  // Server-side only packages (never bundled for client/fog/edge)
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
