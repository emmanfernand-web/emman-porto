import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
