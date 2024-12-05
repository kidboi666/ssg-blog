// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import remarkMermaid from "remark-mermaidjs";
import { astroExpressiveCode } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    astroExpressiveCode({
      themes: ["one-dark-pro"],
      plugins: [pluginLineNumbers()],
    }),
    preact({ include: ["**/preact/*"] }),
  ],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
