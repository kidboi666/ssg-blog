import { defineCollection, z } from "astro:content";

const HTML = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const CSS = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const React = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const JavaScript = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});

export const collections = {
  HTML,
  CSS,
  React,
  JavaScript,
};
