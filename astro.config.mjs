import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import { sidebar, head, locales } from "./doc.config.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://baomidou.com",
  integrations: [
    starlight({
      title: "MyBatis-Plus",
      defaultLocale: "root",
      logo: {
        src: "./src/assets/logo.svg",
      },
      head: head,
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
        Header: "./src/components/Header.astro",
        Sidebar: "./src/components/Sidebar.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
      },
      locales: locales,
      editLink: {
        baseUrl: "https://github.com/baomidou/mybatis-plus-doc/edit/master",
      },
      lastUpdated: true,
      social: {
        github: "https://github.com/baomidou/mybatis-plus",
      },
      sidebar: sidebar,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "entry.[hash].mjs",
          chunkFileNames: "chunks/chunk.[hash].mjs",
          assetFileNames: "assets/asset.[hash][extname]",
        },
      },
    },
  },
});
