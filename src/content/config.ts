import { defineCollection, z } from "astro:content";
export const categories = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "NextJS",
  "Astro",
  "Redux",
  "Axios",
  "Web",
  "Java",
] as const;

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
const Axios = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const TypeScript = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const NextJS = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const Web = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const Redux = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const Astro = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    category: z.string(),
  }),
});
const Java = defineCollection({
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
  NextJS,
  React,
  JavaScript,
  TypeScript,
  Axios,
  Web,
  Astro,
  Redux,
  Java,
};
