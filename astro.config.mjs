import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://kanyukai.github.io',
  base: '/kanyukai.official',

  vite: {
    resolve: {
      alias: {
        "@": "./src",
      },
    },
  },
  build: {
    format: "preserve", // NOTE: 出力ファイルの設定
  },
  integrations: [tailwind(), preact(), solidJs()]
});
