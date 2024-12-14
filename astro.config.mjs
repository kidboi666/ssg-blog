// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { astroExpressiveCode } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeMermaid from "@beoe/rehype-mermaid";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://kidboi666.netlify.app',
  integrations: [tailwind(), astroExpressiveCode({
    themes: ["one-dark-pro"],
    plugins: [pluginLineNumbers()],
  }), preact({ include: ["**/preact/*"] }), sitemap()],
  markdown: {
    rehypePlugins: [
        [rehypeMermaid,
          {
            strategy: "inline",
            fsPath: "public/beoe",
            webPath: "/beoe",
            darkScheme: "class",
          }]
    ]
  },
});