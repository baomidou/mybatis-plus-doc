import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

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
        github: "https://github.com/baomidou/mybatis-plus"
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
          items: [
            {
              label: "快速开始",
              link: "/getting-started",
              translations: {
                en: "Getting Started",
              },
            },
            {
              label: "安装",
              link: "/getting-started/install",
              translations: {
                en: "Install",
              },
            },
            {
              label: "配置",
              link: "/getting-started/config",
              translations: {
                en: "Config",
              },
            },
            {
              label: "注解",
              link: "/getting-started/annotation",
              translations: {
                en: "Annotation",
              },
            },
          ],
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
          label: "配置",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "资源",
          translations: {
            en: "Resources",
          },
          items: [
            {
              label: "常见问题",
              translations: {
                en: "Questions",
              },
              link: "/guides/components/",
            },
            {
              label: "Internationalization (i18n)",
              link: "/guides/i18n/",
            },
            {
              label: "低代码平台",
              items: [
                {
                  label: "数据处理模块",
                  link: "/guides/css-and-tailwind/",
                },
                {
                  label: "单体开发平台",
                  link: "/guides/css-and-tailwind/",
                },
                {
                  label: "微服务开发平台",
                  link: "/guides/css-and-tailwind/",
                },
                {
                  label: "一体化开发平台",
                  link: "/guides/css-and-tailwind/",
                },
              ],
            },
            {
              label: "更新日志",
              link: "/guides/i18n/",
            },
          ],
        },
      ],
    }),
    tailwind({
      // 禁用默认的基础样式
      applyBaseStyles: false,
    }),
  ],
});
