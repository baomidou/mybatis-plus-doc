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

  docsRepo: "baomidou/mybatis-plus-doc",
  docsDir: "docs",
  docsBranch: "master",
  editLinks: true,
  editLinkText: "帮助我们改善此页面！",

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
      '<br/>',
      '<a href="http://beian.miit.gov.cn/" rel="noreferrer" target=_blank>渝ICP备2021000141号-1</a>',
      ' | ',
      '<a href="https://beian.mps.gov.cn/#/query/webSearch?code=50011302222097" rel="noreferrer" target="_blank">渝公网安备50011302222097</a>',
    ].join('')
  },

  htmlModules
};
