module.exports = {
    dest: 'docs',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'MyBatis-Plus',
        description: '为简化开发而生'
      }
    },
    head: [
      ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    themeConfig: {
      repo: 'baomidou/mybatis-plus',
      docsRepo: 'baomidou/mybatis-plus-doc',
      editLinks: true,
      locales: {
        '/': {
          label: '简体中文',
          selectText: '选择语言',
          editLinkText: '在 GitHub 上编辑此页',
          nav: [
            {
              text: '指南',
              link: '/guide/',
            },
            {
              text: '配置',
              link: '/config/'
            }
          ],
          sidebar: {
            '/guide/': genSidebarConfig('指南')
          }
        }
      }
    }
  }
  
  function genSidebarConfig (title) {
    return [
      {
        title,
        collapsable: false,
        children: [
          ''
        ]
      }
    ]
  }