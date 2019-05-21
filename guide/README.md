# 简介

[MyBatis-Plus](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis](http://www.mybatis.org/mybatis-3/) 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

::: tip 愿景
我们的愿景是成为 MyBatis 最好的搭档，就像 [魂斗罗](/img/contra.jpg) 中的 1P、2P，基友搭配，效率翻倍。
:::

<p class="demo">
    <img src="/img/relationship-with-mybatis.png"/>
</p>


## 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer2005、SQLServer 等多种数据库
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 XML 热加载**：Mapper 对应的 XML 支持热加载，对于简单的 CRUD 操作，甚至可以无 XML 启动
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **支持关键词自动转义**：支持数据库关键词（order、key......）自动转义，还可自定义关键词
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **内置性能分析插件**：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作
- **内置 Sql 注入剥离器**：支持 Sql 注入剥离，有效预防 Sql 注入攻击

## 框架结构

![framework](/img/mybatis-plus-framework.jpg)

## 代码托管

> **[Gitee](https://gitee.com/baomidou/mybatis-plus)** | **[Github](https://github.com/baomidou/mybatis-plus)**

[MyBatis-Plus 慕课入门视频教程](https://www.imooc.com/learn/1130) 

## 参与贡献

欢迎各路好汉一起来参与完善 MyBatis-Plus，我们期待你的 PR！

- 贡献代码：代码地址 [MyBatis-Plus](https://github.com/baomidou/mybatis-plus) ，欢迎提交 Issue 或者 Pull Requests
- 维护文档：文档地址 [MyBatis-Plus-Doc](https://github.com/baomidou/mybatis-plus-doc) ，欢迎参与翻译和修订

## 优秀案例

::: tip
名称登记按照时间先后，需加入列表的同学可以告诉我们。
:::

- [SpringWind](https://gitee.com/baomidou/SpringWind)：Java EE（J2EE）快速开发框架
- [Crown](https://gitee.com/cancerGit/Crown)：Mybatisplus 3.0 教学版
- [Crab](https://gitee.com/atcrab/crab)：WEB 极速开发框架
- [KangarooAdmin](https://git.oschina.net/zhougaojun/KangarooAdmin)：轻量级权限管理框架
- [iBase4J](https://git.oschina.net/iBase4J/iBase4J)：Java 分布式快速开发基础平台
- [framework](https://git.oschina.net/sunhan521/framework)：后台管理框架
- [BMS](https://git.oschina.net/eric.xu/BMS)：基础权限开发框架
- [spring-shiro-training](https://git.oschina.net/wangzhixuan/spring-shiro-training)：简单实用的权限脚手架
- [center](https://git.oschina.net/willenfoo/center)：系统管理中心系统
- [skeleton](https://github.com/fengchangsheng/skeleton)：Springboot-Shiro 脚手架
- [springboot_mybatisplus](https://git.oschina.net/z77z/springboot_mybatisplus)：基于 SpringBoot 的美女图片爬虫系统
- [guns](http://git.oschina.net/naan1993/guns)：guns 后台管理系统
- [maple](https://git.oschina.net/blind/maple)：maple 企业信息化的开发基础平台
- [jeeweb-mybatis](https://git.oschina.net/dataact/jeeweb-mybatis)：JeeWeb 敏捷开发平台
- [youngcms](https://gitee.com/fumiao/youngcms)：CMS 平台
- [king-admin](https://github.com/oukingtim/king-admin)：前后端分离的基础权限管理后台
- [jeefast](https://gitee.com/theodo/jeefast)：前后端分离 Vue 快速开发平台
- [bing-upms](https://gitee.com/xiaobingby/bing-upms)：SpringBoot + Shiro +FreeMarker 制作的通用权限管理
- [slife](https://gitee.com/jamen/slife)：SpringBoot 企业级快速开发脚手架
- [pig](https://gitee.com/log4j/pig)：微服务 Spring Cloud 架构
- [mysiteforme](https://gitee.com/wanglingxiao/mysiteforme)：系统后台
- [watchdog-framework](https://github.com/watchdog-framework/watchdog-framework)：基础权限框架
- [iartisan-admin-template](https://gitee.com/iartisan/iartisan-admin-template)：Java 快速开发平台
- [ifast](https://github.com/izenglong/ifast)：ifast 快速开发平台
- [roses](https://gitee.com/naan1993/roses)：基于 Spring Cloud 的分布式框架
- [renren-security](https://gitee.com/renrenio/renren-security)：人人权限系统
- [freeter-admin](https://gitee.com/xcOschina/freeter-admin)：飞特后台管理系统
- [vblog](https://gitee.com/seu-lfh/vblog)：VBlog 博客系统
- [jiiiiiin-security](https://github.com/Jiiiiiin/jiiiiiin-security)：jiiiiiin权限系统
- [hdw-dubbo](https://github.com/tumao2/hdw-dubbo)：HDW快速开发平台
- [pybbs](https://github.com/tomoya92/pybbs)：更好用的Java语言社区(论坛)
- [SmallBun](https://gitee.com/leshalv/smallbun)：SmallBun企业级开发脚手架
- [webplus](https://gitee.com/imsroot/webplus)：综合开发平台
- [x-boot](https://github.com/Exrick/x-boot)：VUE 前后端分离开发平台
- [nice-blog-sys](https://gitee.com/KiWiPeach/nice-blog-sys)：基于SpirngBoot开发，好看的个人博客。

## 接入企业

::: tip
名称按照登记先后，希望出现您公司名称的小伙伴可以告诉我们！
:::

- 正保远程教育集团
- 苏州罗想软件股份有限公司
- 上海箱讯网络科技有限公司
- 青岛帕特智能科技有限公司
- 成都泰尔数据服务有限公司
- 北京环球万合信息技术有限公司
- 北京万学教育科技有限公司
- 重庆声光电智联电子科技有限公司
- 锦途停车服务（天津）有限公司
- 浙江左中右电动汽车服务有限公司
- 迪斯马森科技有限公司
- 成都好玩123科技有限公司
- 深圳华云声信息技术有限公司
- 昆明万德科技有限公司
- 浙江华坤道威
- 南京昆虫软件有限公司
- 上海营联信息技术有限公司
- 上海绚奕网络技术有限公司
- 四川淘金你我信息技术有限公司
- 合肥迈思泰合信息科技有限公司
- 深圳前海蚂蚁芯城科技有限公司
- 广州金鹏集团有限公司
- 安徽自由纪信息科技有限公司
- 杭州目光科技有限公司
- 迈普拉斯科技有限公司
- 贵州红小牛数据有限公司
- 天津市神州商龙科技股份有限公司
- 安徽银通物联有限公司
- 南宁九一在线信息科技有限公司
- 青海智软网络科技有限公司
- 安徽银基信息安全技术有限责任公司
- 上海融宇信息技术有限公司
- 北京奥维云网科技股份有限公司
- 深圳市雁联移动科技有限公司
- 广东睿医大数据有限公司
- 武汉追忆那年网络科技有限公司
- 成都艺尔特科技有限公司
- 深圳市易帮云科技有限公司
- 上海中科软科技股份有限公司
- 北京熊小猫英语科技有限公司
- 武汉桑梓信息科技有限公司
- 腾讯科技（深圳）有限公司
- 苏州环境云信息科技有限公司
- 杭州阿启视科技有限公司
- 杭州杰竞科技有限公司
- 北京云图征信有限公司
- 上海科匠信息科技有限公司
- 深圳小鲨智能科技有限公司
- 深圳市优加互联科技有限公司
- 北京天赋通教育科技有限公司
- 上海(壹美分)胤新信息科技有限公司
- 厦门栗子科技有限公司
- 山东畅想云教育科技有限公司
- 成都云堆移动信息技术有限公司
- 杭州一修鸽科技有限公司
