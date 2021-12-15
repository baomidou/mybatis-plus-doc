const nav = require("./nav.js");
const htmlModules = require("./htmlModules.js");

// Theme Config
module.exports = {
  nav,
  sidebarDepth: 2,
  logo: "/img/logo.svg",
  repo: "baomidou/mybatis-plus",
  searchMaxSuggestions: 10,
  lastUpdated: "上次更新",

  docsDir: "docs",
  editLinks: true,
  editLinkText: "编辑",

  // Vdoing Theme Config
  sidebar: { mode: "structuring", collapsable: false },

  updateBar: {
    showToArticle: false
  },

  category: false,
  tag: false,
  archive: true,

  author: {
    name: "Team Baomidou",
    href: "https://github.com/baomidou"
  },

  social: {
    icons: [
      {
        iconClass: "icon-github",
        title: "GitHub",
        link: "https://github.com/baomidou"
      },
      {
        iconClass: "icon-gitee",
        title: "Gitee",
        link: "https://gitee.com/baomidou"
      },
      {
        iconClass: "icon-youjian",
        title: "发邮件",
        link: "mailto:koyangslash@gmail.com"
      }
    ]
  },
  footer: {
    createYear: 2016,
    copyrightInfo: [
      '<a href="http://baomidou.com" target="_blank" style="font-weight:bold">Team Baomidou</a>',
      ' | ',
      'Sponsored by <a href="https://www.jetbrains.com" target="_blank" style="font-weight:bold">JetBrains</a>',
      ' | ',
      '<a href="http://beian.miit.gov.cn/" target=_blank>渝ICP备2021000141号</a>',
      '<p>友情链接：',
      '<a href="http://aizuda.com" target="_blank" style="font-weight:bold">AiZuDa</a>',
      ' | ',
      '<a href="https://dyang.top/" target="_blank" style="font-weight:bold">D.Yang</a>',
      ' | ',
      '<a href="https://blog.nancheung.com/" target="_blank" style="font-weight:bold">NanCheung</a>',
      '</p>'
    ].join('')
  },
  htmlModules
};
