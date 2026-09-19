import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/dashboard/", "/tutor/dashboard/"],
      },
    ],
    sitemap: "https://bookateacher.in/sitemap.xml",
    host: "https://bookateacher.in",
  };
}
