import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "MyBatis-Plus",
      logo: {
        src: "./src/assets/logo.svg",
      },
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
      },
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
        en: {
          label: "English",
          lang: "en",
        },
      },
      social: {
        github: "https://github.com/baomidou/mybatis-plus",
      },
      sidebar: [
        {
          label: "简介",
          link: "/introduce",
          translations: {
            en: "Introduce",
          },
        },
        {
          label: "从这里开始",
          translations: {
            en: "Start Here",
          },
          autogenerate: {
            directory: "getting-started",
          },
        },
        {
          label: "指南",
          translations: {
            en: "Guides",
          },
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "插件",
          translations: {
            en: "Plugins",
          },
          autogenerate: {
            directory: "plugins",
          },
        },
        {
          label: "参考",
          translations: {
            en: "Reference",
          },
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "资源",
          translations: {
            en: "Resources",
          },
          autogenerate: {
            directory: "resources",
          },
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
  ],
});
