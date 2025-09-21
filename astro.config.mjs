import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://baomidou.com",
  integrations: [
    starlight({
      title: "MyBatis-Plus",
      defaultLocale: 'root',
      logo: {
        src: "./src/assets/logo.svg",
      },
      head: [
        {
          tag: 'script',
          attrs: {
            src: 'https://www.googletagmanager.com/gtag/js?id=G-7Y35RMZFVD',
            async: true,
          }
        },
        {
          tag: 'script',
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
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4147143076931995',
            crossorigin: 'anonymous',
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
        },
        en: {
          label: 'English',
          lang: 'en',
        },
        ja: {
          label: '日本語',
          lang: 'ja',
        }
      },
      editLink: {
        baseUrl: 'https://github.com/baomidou/mybatis-plus-doc/edit/master',
      },
      lastUpdated: true,
      social: {
        github: "https://github.com/baomidou/mybatis-plus",
      },
      sidebar: [
        {
          label: "简介",
          translations: {
            en: 'Introduction',
            ja: 'イントロダクション'
          },
          link: "/introduce",
        },
        {
          label: "从这里开始",
          translations: {
            en: 'Start Here',
            ja: 'ここから始める'
          },
          autogenerate: {
            directory: "getting-started",
          },
        },
        {
          label: "指南",
          translations: {
            en: 'Guides',
            ja: 'ガイドライン'
          },
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "插件",
          translations: {
            en: 'Plugins',
            ja: 'プラグイン'
          },
          autogenerate: {
            directory: "plugins",
          },
        },
        {
          label: "参考",
          translations: {
            en: 'Reference',
            ja: 'リファレンス'
          },
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "资源",
          translations: {
            en: 'Resources',
            ja: 'リソース'
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
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'entry.[hash].mjs',
          chunkFileNames: 'chunks/chunk.[hash].mjs',
          assetFileNames: 'assets/asset.[hash][extname]',
        },
      },
    },
  },
});
