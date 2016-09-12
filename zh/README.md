![Mybatis-Plus-Logo](../assets/mybatis-plus-logo-with-words.png "logo")

> 为简化开发工作、提高生产率而生

# 简介

Mybatis-Plus 是 `Mybatis` 最得力的助手，只做增强不做改变，为简化开发工作、提高生产率而生。

> 我们的愿景是成为`Mybatis`最好的搭档，就像魂斗罗中的1P、2P，齐力面对开发难题。

# 优点：

- **纯正血统**：完全继承原生 `Mybatis` 的所有特性
- **最少依赖**：仅仅依赖`Mybatis`以及`Mybatis-Spring`
- **性能损耗小**：启动即会自动注入基本CURD ，性能无损耗，直接面向对象操作
- **自动热加载**：Mapper对应的xml可以热加载，大大减少重启Web服务器时间，提升开发效率
- **自动生成代码**：包含自动生成代码类以及Maven插件，通过少量配置，即可快速生成Mybatis对应的xml、mapper、entity、service、serviceimpl层代码，减少开发时间
- **自定义操作**：支持自定义Sql注入，实现个性化操作
- **自定义转义规则**：支持数据库关键词（例如：`order`、`key`等）自动转义，支持自定义关键词
- **多种主键策略**：支持多达4种主键策略，可自由配置，若无将会自动填充，更有充满黑科技的`分布式全局唯一ID生成器`
- **无缝分页插件**：基于Mybatis物理分页，无需关心具体操作，等同于编写基本`selectList`查询
- **性能分析**：自带Sql性能分析插件，开发测试时，能有效解决慢查询
- **全局拦截**：提供全表`delete`、`update`操作智能分析阻断
- **避免Sql注入**：内置Sql注入内容剥离器，预防Sql注入攻击

# 在线阅读文档

[中文](http://mp.baomidou.com/zh/) | [English](http://mp.baomidou.com/en/)

# 文档修订

> 欢迎各路好汉一起来完善文档，我们期待你的PR！

```bash
# clone this repo
git clone https://github.com/baomidou/mybatis-plus-doc.git

# cd into project
cd mybatis-plus-doc/

# install gitbook-cli
npm install gitbook-cli -g

# init gitbook
gitbook install

# run as serve
gitbook serve
```
