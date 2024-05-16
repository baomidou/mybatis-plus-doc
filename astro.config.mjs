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
      head: [
        {
          tag: 'script',
          attrs: {
            src: 'https://www.googletagmanager.com/gtag/js?id=G-7Y35RMZFVD',
            async: true,
          },
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-7Y35RMZFVD');
          `
        },
        {
          tag: 'script',
          content: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?577e65b88c06c034335c395caa4b6205";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.wwads.cn/js/makemoney.js',
            async: true,
          }
        }
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
        Header: "./src/components/Header.astro",
        Sidebar: "./src/components/Sidebar.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
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
