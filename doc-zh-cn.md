# 简介

[Mybatis-Plus](https://github.com/baomidou/mybatis-plus)是一个[Mybatis](http://www.mybatis.org/mybatis-3/)的增强工具，在Mybatis的基础上只做增强不做改变，为简化开发、提高效率而生。

!> 我们的愿景是成为`Mybatis`最好的搭档，就像[魂斗罗](assets/contra.jpg)中的1P、2P，齐力面对开发难题。

![relationship](assets/relationship-with-mybatis.png)

## 特性

- **最少依赖**：仅仅依赖Mybatis以及Mybatis-Spring
- **性能损耗小**：启动即会自动注入基本CURD，性能无损耗，直接面向对象操作
- **避免Sql注入**：内置Sql注入剥离器，有效预防Sql注入攻击
- **多种主键策略**：支持多达4种主键策略，可自由配置，若无将会自动填充，更有充满黑科技的`分布式全局唯一ID生成器`
- **支持ActionRecord**：支持`ActionRecord`形式调用
- **支持热加载**：Mapper对应的xml支持`热加载`，对于简单的CRUD操作，甚至可以`无xml启动`
- **支持代码生成**：采用`代码`或者`Maven插件`可快速生成Mapper、Model、Service层代码，支持`模板引擎`，更有`超多自定义配置`等您来使用（P.S. 比Mybatis官方的Generator更强大！）
- **支持自定义全局通用操作**：支持全局通用方法注入(Write once, use anywhere)
- **支持关键词自动转义**：支持数据库关键词（例如：order、key等）自动转义，还可自定义关键词
- **内置分页插件**：基于Mybatis物理分页，无需关心具体操作，配置好插件之后，写分页等同于写基本`selectList`查询
- **内置性能分析插件**：自带Sql性能分析插件，可输出Sql语句和执行时间，开发测试时，能有效解决慢查询
- **内置全局拦截插件**：提供全表`delete`、`update`操作智能分析阻断，预防误操作

## 代码托管

> **[Github](https://github.com/baomidou/mybatis-plus)** | **[OSChina](http://git.oschina.net/baomidou/mybatis-plus)**

## 加入我们

?> 欢迎各路好汉一起来参与完善`Mybatis-Plus`，我们期待你的PR！

- 贡献代码：代码地址 [Mybatis-Plus](https://github.com/baomidou/mybatis-plus)，欢迎提交issue或者pull-request~
- 维护文档：文档地址 [Mybatis-Plus-Doc](https://github.com/baomidou/mybatis-plus-doc)，欢迎参与翻译和修订~

# 快速上手

## 简单示例(传统)

!> 假设我们已存在一张Foo表，且已有对应的实体类Foo，实现Foo表的CRUD操作我们需要做什么呢？

```java
/** Foo对应的Mapper接口 */
public interface FooMapper extends BaseMapper<Foo> { }
```

以上就是你所需的所有操作，如何使用它呢？

> 基本CRUD

```java
int i = fooMapper.insert();
```

## 简单示例(ActionRecord)
