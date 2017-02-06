# 简介

[Mybatis-Plus](https://github.com/baomidou/mybatis-plus) （简称MP）是一个 [Mybatis](http://www.mybatis.org/mybatis-3/) 的增强工具，在 Mybatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

!> 我们的愿景是成为`Mybatis`最好的搭档，就像 [魂斗罗](https://raw.githubusercontent.com/baomidou/mybatis-plus-doc/master/assets/contra.jpg) 中的1P、2P，基友搭配，效率翻倍。

![relationship](assets/relationship-with-mybatis.png)

## 特性

- **无侵入**：Mybatis-Plus 在 Mybatis 的基础上进行扩展，只做增强不做改变，引入 Mybatis-Plus 不会对您现有的 Mybatis 构架产生任何影响，而且 MP 支持所有 Mybatis 原生的特性
- **依赖少**：仅仅依赖 Mybatis 以及 Mybatis-Spring
- **损耗小**：启动即会自动注入基本CURD，性能基本无损耗，直接面向对象操作
- **预防Sql注入**：内置Sql注入剥离器，有效预防Sql注入攻击
- **多种主键策略**：支持多达4种主键策略（内含分布式唯一ID生成器），可自由配置，完美解决主键问题
- **支持热加载**：Mapper 对应的 XML 支持热加载，对于简单的 CRUD 操作，甚至可以无 XML 启动
- **支持ActiveRecord**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可实现基本 CRUD 操作
- **支持代码生成**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 层代码，支持模板引擎，更有超多自定义配置等您来使用（P.S. 比 Mybatis 官方的 Generator 更加强大！）
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **支持关键词自动转义**：支持数据库关键词（order、key......）自动转义，还可自定义关键词
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

!> 假设我们已存在一张 User 表，且已有对应的实体类 User，实现 User 表的 CRUD 操作我们需要做什么呢？

```java
/** User 对应的 Mapper 接口 */
public interface UserMapper extends BaseMapper<User> { }
```

以上就是您所需的所有操作，甚至不需要您创建XML文件，我们如何使用它呢？

> 基本CRUD

```java
int i = userMapper.insert(user); // 插入 User
int i = userMapper.deleteById(userId); // 通过 userId 删除 User
int i = userMapper.updateById(user); // 更新 User
User user = userMapper.selectById(userId); // 通过 userId 查询 User
```

以上是基本的 CRUD 操作，当然我们可用的 API 远不止这4个，我们提供了多达 17 个方法给大家使用，可以极其方便的实现单一、批量、分页等操作，接下来我们就来看看 MP 是如何使用分页的。

> 分页操作

```java
List<User> userList = userMapper.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().where("age >= {0}", 18)
); // 分页查询10条年龄大于18的用户记录
```

如您所见，我们仅仅需要继承一个 BaseMapper 即可实现大部分单表 CRUD 操作，极大的减少的开发负担。

有人也许会质疑：这难道不是通用 Mapper 么？别急，咱们接着往下看。

!> 现有一个需求，我们需要`分页查询` User 表中，`年龄在18~50之间性别为男且姓名为张三的所有用户`，这时候我们该如何实现上述需求呢？

传统做法是 Mapper 中定义一个方法，然后在 Mapper 对应的 XML 中填写对应的 SELECT 语句，且我们还要集成分页，实现以上一个简单的需求，往往需要我们做很多重复单调的工作，普通的通用 Mapper 能够解决这类痛点么？

> 用 MP 的方式打开以上需求

```java
public List<User> complexQueryExample(Page<User> page) {
    return userMapper.selectPage(
            new Page<User>(1, 10),
            new EntityWrapper<User>().where("name={0}", "张三")
                    .and("sex={0}", 0)
                    .between("age", "18", "50")
            // 以上操作，等价于 WHERE (name='张三' AND sex=0 AND age BETWEEN '18' AND '50') LIMIT 1,10
    );
}
```

以上查询，会查询出姓名为张三，性别为男，且年龄在18~50之间的10条用户记录。

MP 通过 EntityWrapper 或者 Condition 来让用户自由的构建查询条件，简单便捷，没有额外的负担，能够有效提高开发效率。

## 简单示例(ActiveRecord)

ActiveRecord 一直广受动态语言（ PHP 、 Ruby 等）的喜爱，而 Java 作为准静态语言，对于 ActiveRecord 往往只能感叹其优雅，所以我们也在 AR 道路上进行了一定的探索，喜欢大家能够喜欢，也同时欢迎大家反馈意见与建议。

我们如何使用 AR 模式？

```java
@TableName("sys_user") // 注解指定表名
public class User extends Model<User> {

  ... // fields

  ... // getter and setter

  /** 指定主键 */
  @Override
  protected Serializable pkVal() {
      return this.id;
  }
}
```

我们仅仅需要继承 Model 类且实现主键指定方法 即可让实体开启 AR 之旅，开启 AR 之路后，我们如何使用它呢？

> 基本CRUD

```java

```

# 安装

查询最高版本或历史版本方式：

- 访问：[Maven中央库-阿里源](http://maven.aliyun.com/nexus/#nexus-search;quick~mybatis-plus)
- 访问：[Maven中央库-正统源](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.baomidou%22%20AND%20a%3A%22mybatis-plus%22)

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>最新版本</version>
</dependency>
`
```

!> 特别说明：**`Mybatis`及`Mybatis-Spring`依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus会自动帮你维护！**
