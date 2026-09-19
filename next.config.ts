import type { NextConfig } from "next";

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
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:",
          },
        ],
      },
    ];
  },

  // Server-side only packages (never bundled for client/fog/edge)
  serverExternalPackages: ["better-sqlite3"],
};

// Only allow rewrites in production; disable during dev so next dev serves page.tsx
// const isProd = process.env.NODE_ENV === "production";
// if (!isProd) {
//   delete nextConfig.rewrites;
// }

export default nextConfig;
