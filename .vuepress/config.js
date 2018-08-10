module.exports = {
  port: "3000",
  dest: "docs",
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
        nav: [
          {
            text: "指南",
            link: "/guide/"
          },
          {
            text: "常见问题",
            link: "/faq/"
          },
          {
            text: '选择语音',
            items: [
              { text: '简体中文', link: '/' }
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
                link: "https://github.com/baomidou/dynamic-datasource-spring-boot-starter"
              }
            ]
          },
          {
            text: "更新日志",
            link: "https://github.com/baomidou/mybatis-plus/blob/3.0/CHANGELOG.md"
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
      title,
      collapsable: false,
      children: ["", "quick-start", "install", "config"]
    }
  ];
}
