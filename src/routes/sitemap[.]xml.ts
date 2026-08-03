import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sanityClient } from "@/lib/sanity/client";

// Production URL — update if the domain changes.
const BASE_URL = "https://www.motivaestate.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [projectSlugs, landSlugs, journalSlugs] = await Promise.all([
          sanityClient.fetch<string[]>(
            `*[_type == "project" && defined(slug.current)].slug.current`,
          ),
          sanityClient.fetch<string[]>(`*[_type == "land" && defined(slug.current)].slug.current`),
          sanityClient.fetch<string[]>(
            `*[_type == "journalEntry" && defined(slug.current)].slug.current`,
          ),
        ]);

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/services", changefreq: "monthly", priority: "0.7" },
          { path: "/projects", changefreq: "weekly", priority: "0.9" },
          { path: "/land", changefreq: "weekly", priority: "0.9" },
          { path: "/gallery", changefreq: "monthly", priority: "0.6" },
          { path: "/journal", changefreq: "weekly", priority: "0.8" },
          { path: "/faq", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          ...projectSlugs.map((s) => ({
            path: `/projects/${s}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...landSlugs.map((s) => ({
            path: `/land/${s}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...journalSlugs.map((s) => ({
            path: `/journal/${s}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
