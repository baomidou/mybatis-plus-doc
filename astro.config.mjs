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
          attrs: {
            src: 'https://cdn.wwads.cn/js/makemoney.js',
            async: true,
          },
          content: `
            // 万维广告“禁止”广告拦截
            // function called if wwads is blocked
            // https://github.com/bytegravity/whitelist-wwads
            function ABDetected() {
              var adBlockDetected_div = document.createElement("div");
              adBlockDetected_div.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; background: #fc6600; color: #fff; z-index: 9999999999; font-size: 14px; text-align: center; line-height: 1.5; font-weight: bold; padding-top: 6px; padding-bottom: 6px;";
              adBlockDetected_div.innerHTML = "我们的广告服务商 <a style='color:#fff;text-decoration:underline' target='_blank' href='https://wwads.cn/page/end-user-privacy'>并不跟踪您的隐私</a>，为了支持本站的长期运营，请将我们的网站 <a style='color: #fff;text-decoration:underline' target='_blank' href='https://wwads.cn/page/whitelist-wwads'>加入广告拦截器的白名单</a>。";
              document.getElementsByTagName("body")[0].appendChild(adBlockDetected_div);
              // add a close button to the right side of the div
              var adBlockDetected_close = document.createElement("div");
              adBlockDetected_close.style.cssText = "position: absolute; top: 0; right: 10px; width: 30px; height: 30px; background: #fc6600; color: #fff; z-index: 9999999999; line-height: 30px; cursor: pointer;";
              adBlockDetected_close.innerHTML = "×";
              adBlockDetected_div.appendChild(adBlockDetected_close);
              // add a click event to the close button
              adBlockDetected_close.onclick = function() {
              this.parentNode.parentNode.removeChild(this.parentNode);
              };
            }
        
            function docReady(t) {
              "complete" === document.readyState ||
              "interactive" === document.readyState
                ? setTimeout(t, 1)
                : document.addEventListener("DOMContentLoaded", t);
            }
        
            //check if wwads' fire function was blocked after document is ready with 3s timeout (waiting the ad loading)
            docReady(function () {
              setTimeout(function () {
                if( window._AdBlockInit === undefined ){
                    ABDetected();
                }
              }, 3000);
            });
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
        }
      ],
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
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
