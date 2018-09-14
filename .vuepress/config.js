module.exports = {
  port: "3000",
  dest: "docs",
  ga: "UA-85414008-1",
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "MyBatis-Plus",
      description: "为简化开发而生"
    }
  },
  head: [["link", { rel: "icon", href: `/favicon.ico` }]],
  themeConfig: {
    repo: "baomidou/mybatis-plus",
    docsRepo: "baomidou/mybatis-plus-doc",
    editLinks: true,
    locales: {
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "指南",
            link: "/guide/"
          },
          {
            text: "选择语言",
            items: [
              {
                text: "简体中文",
                link: "/"
              }
            ]
          },
          {
            text: "生态",
            items: [
              {
                text: "Lock4j",
                link: "https://gitee.com/baomidou/lock4j-spring-boot-starter"
              },
              {
                text: "Dynamic Datasource",
                link:
                  "https://github.com/baomidou/dynamic-datasource-spring-boot-starter"
              }
            ]
          },
          {
            text: "更新日志",
            link:
              "https://github.com/baomidou/mybatis-plus/blob/3.0/CHANGELOG.md"
          },
          {
            text: "2.0 文档",
            link: "https://baomidou.gitee.io/mybatis-plus-doc/#/"
          }
        ],
        sidebar: {
          "/guide/": genSidebarConfig("指南")
        }
      }
    }
  }
};

function genSidebarConfig(title) {
  return [
    {
      title: "快速入门",
      collapsable: false,
      children: ["", "quick-start", "install", "config"]
    },
    {
      title: "核心功能",
      collapsable: false,
      children: ["generator", "crud-interface", "wrapper", "page", "sequence"]
    },
    {
      title: "插件扩展",
      collapsable: false,
      children: [
        "hot-loading",
        "logic-delete",
        "enum",
        "auto-fill-metainfo",
        "sql-injector",
        "execution-analysis-plugin",
        "performance-analysis-plugin",
        "optimistic-locker-plugin",
        "tenant",
        "mybatisx-idea-plugin"
      ]
    },
    {
      title: "FAQ",
      collapsable: false,
      children: ["faq"]
    }
  ];
}
