import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import solidJs from "@astrojs/solid-js";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  site: 'https://kanyukai.github.io',
  base: '/kanyukai.official',
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(fileURLToPath(import.meta.url), "./src"), // 安全にパスを解決
      },
    },
  },
  integrations: [tailwind(), preact(), solidJs()],
});
