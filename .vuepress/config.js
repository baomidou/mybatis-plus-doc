module.exports = {
  dest: "docs",
  base: "/",
  markdown: {
    externalLinks: {
      target: "_blank",
      rel: "noopener noreferrer"
    }
  },
  locales: {
    "/": {
      lang: "zh-CN",
      title: "MyBatis-Plus",
      description: "为简化开发而生"
    },
    "/en/": {
      lang: "en-US",
      title: "MyBatis-Plus",
      description: "Born To Simplify Development"
    }
  },
  head: [
    ["link", { rel: "icon", href: `/favicon.ico` }],
    ["script", { "data-ad-client": "ca-pub-4147143076931995", async: true, src: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" }]
  ],
  themeConfig: {
    repo: "baomidou/mybatis-plus",
    docsRepo: "baomidou/mybatis-plus-doc",
    editLinks: true,
    locales: {
      "/": {
        label: "简体中文",
        selectText: "Languages",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "指南",
            link: "/guide/"
          },
          {
            text: "配置",
            link: "/config/"
          },
          {
            text: "更新日志",
            link:
              "https://github.com/baomidou/mybatis-plus/blob/3.0/CHANGELOG.md"
          },
          {
            text: "生态",
            items: [
              {
                text: "MybatisX插件",
                link: "https://github.com/baomidou/MybatisX",
              },
              {
                text: "多数据源",
                link: "https://gitee.com/baomidou/dynamic-datasource-spring-boot-starter",
              },
              {
                text: "MP 企业级模块",
                link: "https://gitee.com/baomidou/mybatis-mate-examples",
              },
              {
                text: "Shuan 权限组件",
                link: "https://gitee.com/baomidou/shaun",
              },
              {
                text: "Kisso 单点登录",
                link: "https://github.com/baomidou/kisso",
              },
              {
                text: "Lock4j 分布式锁",
                link: "https://gitee.com/baomidou/lock4j",
              },
              {
                text: "kaptcha 验证码启动器",
                link: "https://gitee.com/baomidou/kaptcha-spring-boot-starter",
              },
            ],
          },
          {
            text: "资源",
            items: [
              {
                text: "Awesome MyBatis-Plus",
                link:
                  "https://github.com/baomidou/awesome-mybatis-plus/blob/master/README.md"
              }
            ]
          }
        ],
        sidebar: {
          "/guide/": genGuideSidebar(true),
          "/config/": genConfigSidebar(true)
        }
      },
      "/en/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        nav: [
          {
            text: "Guide",
            link: "/en/guide/"
          },
          {
            text: "Config",
            link: "/en/config/"
          },
          {
            text: "Changelog",
            link:
              "https://github.com/baomidou/mybatis-plus/blob/3.0/CHANGELOG.md"
          },
          {
            text: "Ecosystem",
            items: [
              {
                text: "Kisso",
                link: "https://gitee.com/baomidou/kisso"
              },
              {
                text: "Lock4j",
                link: "https://gitee.com/baomidou/lock4j"
              },
              {
                text: "Dynamic Datasource",
                link:
                  "https://github.com/baomidou/dynamic-datasource-spring-boot-starter"
              },
              {
                text: "Mybatis Mate",
                link: "https://gitee.com/baomidou/mybatis-mate-examples",
              },
              {
                text: "Jobs Scheduling Platform",
                link: "https://github.com/baomidou/jobs"
              }
            ]
          },
          {
            text: "Resources",
            items: [
              {
                text: "Awesome MyBatis-Plus",
                link:
                  "https://github.com/baomidou/awesome-mybatis-plus/blob/master/README.md"
              }
            ]
          }
        ],
        sidebar: {
          "/en/guide/": genGuideSidebar(false),
          "/en/config/": genConfigSidebar(false)
        }
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/google-analytics', { ga: 'UA-85414008-1' }],
    ['baidu-tongji-analytics', { key: '577e65b88c06c034335c395caa4b6205' }]
  ]
};

function genGuideSidebar(isZh) {
  return [
    {
      title: isZh ? "快速入门" : "Getting Start",
      collapsable: false,
      children: ["", "quick-start", "install", "config", "annotation"]
    },
    {
      title: isZh ? "核心功能" : "Core",
      collapsable: false,
      children: [
        "generator",
        "crud-interface",
        "wrapper",
        "page",
        "sequence",
        "id-generator"
      ]
    },
    {
      title: isZh ? "扩展" : "Expand",
      collapsable: false,
      children: [
        "logic-delete",
        "enum",
        "typehandler",
        "auto-fill-metainfo",
        "sql-injector",
        "p6spy",
        "safety",
        "dynamic-datasource",
        "mybatisx-idea-plugin",
        "mybatis-mate"
      ]
    },
    {
      title: isZh ? "插件" : "Plugin",
      collapsable: false,
      children: [
        "interceptor",
        "interceptor-pagination",
        "interceptor-optimistic-locker",
        "interceptor-tenant-line",
        "interceptor-block-attack",
        "interceptor-dynamic-table-name"
      ]
    },
    {
      title: "FAQ",
      collapsable: false,
      children: ["faq", "donate"]
    }
  ];
}

function genConfigSidebar(isZh) {
  return [
    {
      title: isZh ? "配置" : "Config",
      collapsable: false,
      children: ["", "generator-config"]
    }
  ];
}
