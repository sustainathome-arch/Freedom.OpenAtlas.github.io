// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Journal entry URLs (mirrors src/data/posts.ts)
const journalUrls = [
  "https://openatlas.wiki/pages/journal/yeti-rambler-26oz-review/",
  "https://openatlas.wiki/pages/journal/lava-beds-national-monument/",
  "https://openatlas.wiki/pages/journal/tamolitch-falls-blue-pool/",
  "https://openatlas.wiki/pages/journal/valentine-cave-lava-beds/",
  "https://openatlas.wiki/pages/journal/lassen-volcanic-national-park/",
  "https://openatlas.wiki/pages/journal/oregon-coast-101-highlights/",
];

// Production: https://openatlas.wiki/ (custom domain on GitHub Pages).
// https://docs.astro.build/en/guides/deploy/github/
export default defineConfig({
  site: "https://openatlas.wiki",
  base: "/",
  output: "static",
  publicDir: "public",
  integrations: [
    sitemap({
      // Include journal entries that are not rendered as actual Astro pages
      customPages: journalUrls,
      // Global defaults applied to all pages
      changefreq: "weekly",
      priority: 0.8,
    }),
  ],
});
