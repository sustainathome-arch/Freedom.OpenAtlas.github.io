import { defineCollection, z } from "astro:content";

export const journal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    author: z.string().default("freedomland"),
    category: z.string().default("Destination"),
    tags: z.array(z.string()).default([]),
    readMinutes: z.number().default(5),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { journal };
