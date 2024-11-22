// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import remarkMermaid from "remark-mermaidjs";
import { astroExpressiveCode } from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    astroExpressiveCode({
      themes: ["one-dark-pro"],
    }),
    preact({ include: ["**/preact/*"] }),
  ],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
