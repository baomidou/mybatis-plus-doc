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
        }
      },
      social: {
        github: "https://github.com/baomidou/mybatis-plus",
      },
      sidebar: [
        {
          label: "简介",
          link: "/introduce",
        },
        {
          label: "从这里开始",
          autogenerate: {
            directory: "getting-started",
          },
        },
        {
          label: "指南",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "插件",
          autogenerate: {
            directory: "plugins",
          },
        },
        {
          label: "参考",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "资源",
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
