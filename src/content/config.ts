import { defineCollection, z } from "astro:content";

const html = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
  }),
});
const css = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
  }),
});
const react = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
  }),
});
const js = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
  }),
});

export const collections = {
  html,
  css,
  react,
  js,
};
