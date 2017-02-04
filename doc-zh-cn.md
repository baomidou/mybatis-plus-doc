# 简介

[Mybatis-Plus](https://github.com/baomidou/mybatis-plus) 是一个 [Mybatis](http://www.mybatis.org/mybatis-3/) 的增强工具，在 Mybatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

!> 我们的愿景是成为`Mybatis`最好的搭档，就像 [魂斗罗](https://raw.githubusercontent.com/baomidou/mybatis-plus-doc/master/assets/contra.jpg) 中的1P、2P，基友搭配，效率翻倍。

![relationship](assets/relationship-with-mybatis.png)

## 特性

- **无侵入**：Mybatis-Plus 在 Mybatis 的基础上进行扩展，只做增强不做改变，引入 Mybatis-Plus 不会对您现有的 Mybatis 构架产生任何影响
- **依赖少**：仅仅依赖 Mybatis 以及 Mybatis-Spring
- **损耗小**：启动即会自动注入基本CURD，性能基本无损耗，直接面向对象操作
- **预防Sql注入**：内置Sql注入剥离器，有效预防Sql注入攻击
- **多种主键策略**：支持多达4种主键策略（内含分布式唯一ID生成器），可自由配置，完美解决主键问题
- **支持热加载**：Mapper 对应的 XML 支持热加载，对于简单的 CRUD 操作，甚至可以无 XML 启动
- **支持ActionRecord**：支持 ActionRecord 形式调用，实体类只需继承 Model 类即可实现基本 CRUD 操作
- **支持代码生成**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 层代码，支持模板引擎，更有超多自定义配置等您来使用（P.S. 比 Mybatis 官方的 Generator 更加强大！）
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **支持关键词自动转义**：支持数据库关键词（order、key……）自动转义，还可自定义关键词
- **内置分页插件**：基于Mybatis物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于写基本List查询
- **内置性能分析插件**：可输出Sql语句以及其执行时间，建议开发测试时启用该功能，能有效解决慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，预防误操作

## 代码托管

> **[Github](https://github.com/baomidou/mybatis-plus)** | **[OSChina](http://git.oschina.net/baomidou/mybatis-plus)**

## 参与贡献

?> 欢迎各路好汉一起来参与完善`Mybatis-Plus`，我们期待你的PR！

- 贡献代码：代码地址 [Mybatis-Plus](https://github.com/baomidou/mybatis-plus) ，欢迎提交 Issue 或者 Pull Requests
- 维护文档：文档地址 [Mybatis-Plus-Doc](https://github.com/baomidou/mybatis-plus-doc) ，欢迎参与翻译和修订

# 快速上手

## 简单示例(传统)

!> 假设我们已存在一张User表，且已有对应的实体类User，实现User表的CRUD操作我们需要做什么呢？

```java
/** Foo对应的Mapper接口 */
public interface UserMapper extends BaseMapper<User> { }
```

以上就是你所需的所有操作，如何使用它呢？

> 基本CRUD

```java
int i = userMapper.insert(user); // 插入 User
int i = userMapper.deleteById(userId); // 通过 userId 删除 User
int i = userMapper.updateById(user); // 更新 User
User user = userMapper.selectById(userId); // 通过 userId 查询 User
```

> 分页操作

## 简单示例(ActionRecord)
