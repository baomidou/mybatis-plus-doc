# 简介

--------------------------------------------------------------------------------

[Mybatis-Plus](https://github.com/baomidou/mybatis-plus)（简称MP）是一个 [Mybatis](http://www.mybatis.org/mybatis-3/) 的增强工具，在 Mybatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

!> 我们的愿景是成为`Mybatis`最好的搭档，就像 [魂斗罗](https://raw.githubusercontent.com/baomidou/mybatis-plus-doc/master/assets/contra.jpg) 中的1P、2P，基友搭配，效率翻倍。

![relationship](assets/relationship-with-mybatis.png)

## 特性

- **无侵入**：Mybatis-Plus 在 Mybatis 的基础上进行扩展，只做增强不做改变，引入 Mybatis-Plus 不会对您现有的 Mybatis 构架产生任何影响，而且 MP 支持所有 Mybatis 原生的特性
- **依赖少**：仅仅依赖 Mybatis 以及 Mybatis-Spring
- **损耗小**：启动即会自动注入基本CURD，性能基本无损耗，直接面向对象操作
- **预防Sql注入**：内置Sql注入剥离器，有效预防Sql注入攻击
- **通用CRUD操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **多种主键策略**：支持多达4种主键策略（内含分布式唯一ID生成器），可自由配置，完美解决主键问题
- **支持热加载**：Mapper 对应的 XML 支持热加载，对于简单的 CRUD 操作，甚至可以无 XML 启动
- **支持ActiveRecord**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可实现基本 CRUD 操作
- **支持代码生成**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用（P.S. 比 Mybatis 官方的 Generator 更加强大！）
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

<br><br>

# 快速上手

--------------------------------------------------------------------------------

## 简单示例(传统)

!> 假设我们已存在一张 User 表，且已有对应的实体类 User，实现 User 表的 CRUD 操作我们需要做什么呢？

```java
/** User 对应的 Mapper 接口 */
public interface UserMapper extends BaseMapper<User> { }
```

以上就是您所需的所有操作，甚至不需要您创建XML文件，我们如何使用它呢？

> 基本CRUD

```java
// 初始化 影响行数
int result = 0;
// 初始化 User 对象
User user = new User();

// 插入 User (插入成功会自动回写主键到实体类)
user.setName("Tom");
result = userMapper.insert(user);

// 更新 User
user.setAge(18);
result = userMapper.updateById(user.getId());

// 查询 User
User exampleUser = userMapper.selectById(user.getId());

// 查询姓名为‘张三’的所有用户记录
List<User> userList = userMapper.selectList(
        new EntityWrapper<User>().eq("name", "张三")
);

// 删除 User
result = userMapper.deleteById(user.getId());
```

以上是基本的 CRUD 操作，当然我们可用的 API 远不止这几个，我们提供了多达 17 个方法给大家使用，可以极其方便的实现单一、批量、分页等操作，接下来我们就来看看 MP 是如何使用分页的。

> 分页操作

```java
// 分页查询 10 条姓名为‘张三’的用户记录
List<User> userList = userMapper.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
);
```

如您所见，我们仅仅需要继承一个 BaseMapper 即可实现大部分单表 CRUD 操作，极大的减少的开发负担。

有人也许会质疑：这难道不是通用 Mapper 么？别急，咱们接着往下看。

!> 现有一个需求，我们需要`分页查询` User 表中，`年龄在18~50之间性别为男且姓名为张三的所有用户`，这时候我们该如何实现上述需求呢？

传统做法是 Mapper 中定义一个方法，然后在 Mapper 对应的 XML 中填写对应的 SELECT 语句，且我们还要集成分页，实现以上一个简单的需求，往往需要我们做很多重复单调的工作，普通的通用 Mapper 能够解决这类痛点么？

> 用 MP 的方式打开以上需求

```java
// 分页查询 10 条姓名为‘张三’、性别为男，且年龄在18至50之间的用户记录
List<User> userList = userMapper.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
                .eq("sex", 0)
                .between("age", "18", "50")
);
```

以上操作，等价于

```sql
SELECT *
FROM sys_user
WHERE (name='张三' AND sex=0 AND age BETWEEN '18' AND '50')
LIMIT 0,10
```

Mybatis-Plus 通过 EntityWrapper（简称 EW，MP 封装的一个查询条件构造器）或者 Condition（与EW类似） 来让用户自由的构建查询条件，简单便捷，没有额外的负担，能够有效提高开发效率。

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
// 初始化 成功标识
boolean result = false;
// 初始化 User
User user = new User();

// 保存 User
user.setName("Tom");
result = user.insert();

// 更新 User
user.setAge(18);
result = user.updateById();

// 查询 User
User exampleUser = t1.selectById();

// 查询姓名为‘张三’的所有用户记录
List<User> userList1 = user.selectList(
        new EntityWrapper<User>().eq("name", "张三")
);

// 删除 User
result = t2.deleteById();
```

> 分页操作

```java
// 分页查询 10 条姓名为‘张三’的用户记录
List<User> userList = user.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
).getRecords();
```

> 复杂操作

```java
// 分页查询 10 条姓名为‘张三’、性别为男，且年龄在18至50之间的用户记录
List<User> userList = user.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
                .eq("sex", 0)
                .between("age", "18", "50")
).getRecords();
```

?> AR 模式提供了一种更加便捷的方式实现 CRUD 操作，其本质还是调用的 Mybatis 对应的方法，类似于语法糖。

通过以上两个简单示例，我们简单领略了 Mybatis-Plus 的魅力与高效率，值得注意的一点是：我们提供了强大的`代码生成器`，可以快速生成各类代码，做到了`即开即用`。

<br><br>

# 安装

--------------------------------------------------------------------------------

## 依赖配置

查询最高版本或历史版本方式：

- [Maven中央库-正统源](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.baomidou%22%20AND%20a%3A%22mybatis-plus%22)
- [Maven中央库-阿里源](http://maven.aliyun.com/nexus/#nexus-search;quick~mybatis-plus)

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>2.0.1</version>
</dependency>
```

!> 特别说明：**`Mybatis`及`Mybatis-Spring`依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus会自动帮你维护！**

## 如何集成

Mybatis-Plus 的集成非常简单，对于 Spring，我们仅仅需要把 Mybatis 自带的`MybatisSqlSessionFactoryBean`替换为 MP 自带的即可。

!> MP 大部分配置都和传统 Mybatis 一致，少量配置为 MP 特色功能配置，**此处仅对 MP 的特色功能进行讲解，其余请参考 _Mybatis-Spring_ 配置说明 。**

示例工程：

👉 [mybatisplus-spring-mvc](https://git.oschina.net/baomidou/mybatisplus-spring-mvc)

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)

示例代码：

> Xml Config

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <!-- 配置数据源 -->
    <property name="dataSource" ref="dataSource"/>
    <!-- 自动扫描 Xml 文件位置 -->
    <property name="mapperLocations" value="classpath:mybatis/*/*.xml"/>
    <!-- 配置 Mybatis 配置文件（可无） -->
    <property name="configLocation" value="classpath:mybatis/mybatis-config.xml"/>
    <!-- 配置包别名 -->
    <property name="typeAliasesPackage" value="com.baomidou.springmvc.model"/>

    <!-- 以上配置和传统 Mybatis 一致 -->

    <!-- 插件配置 -->
    <property name="plugins">
        <array>
            <!-- 分页插件配置 -->
            <bean id="paginationInterceptor" class="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
                <!-- 指定数据库方言 -->
                <property name="dialectType" value="mysql"/>
            </bean>
            <!-- 如需要开启其他插件，可配置于此 -->
        </array>
    </property>

    <!-- MP 全局配置注入 -->
    <property name="globalConfig" ref="globalConfig" />
</bean>

<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
    <!-- MP 主键策略配置
        AUTO->`0`("数据库ID自增")
        INPUT->`1`(用户输入ID")
        ID_WORKER->`2`("全局唯一ID")
        UUID->`3`("全局唯一ID")
    -->
    <property name="idType" value="2" />
    <!--
        MYSQL->`mysql`
        ORACLE->`oracle`
        DB2->`db2`
        H2->`h2`
        HSQL->`hsql`
        SQLITE->`sqlite`
        POSTGRE->`postgresql`
        SQLSERVER2005->`sqlserver2005`
        SQLSERVER->`sqlserver`
    -->
    <!-- Oracle需要添加该项 -->
    <!-- <property name="dbType" value="oracle" /> -->
    <!-- 全局表为下划线命名设置 true -->
    <!-- <property name="dbColumnUnderline" value="true" /> -->
</bean>
```

> Java Config

```java

```

## 参数说明

--------------------------------------------------------------------------------

### MybatisSqlSessionFactoryBean

- 包名：`com.baomidou.mybatisplus.spring`

- 描述：创建 SqlSession 示例（与 _Mybatis-Spring_ 的工厂 Bean 相类似，只是加入了 MP 特色功能配置）

- 用法：参考原生 Mybatis-Spring 的使用

- [源码](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/spring/MybatisSqlSessionFactoryBean.java)

### GlobalConfiguration

- 包名：`com.baomidou.mybatisplus.entity.config`

- 描述：MP 全局配置类，用于配置 MP 的各项策略（如：主键策略、数据库方言等）

- 用法：参照上述示例代码

- [源码](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/generator/config/GlobalConfig.java)

- 参数：

  - dbType（数据库类型）

    - 类型：Enum
    - 默认值：DBType.MYSQL
    - 可选值：MYSQL、ORACLE、DB2、H2、HSQL、SQLITE、POSTGRE、SQLSERVER2005、SQLSERVER、OTHER

  - idType（主键类型）

    - 类型：Enum
    - 默认值：IdType.ID_WORKER
    - 可选值：ID_WORKER（分布式全局唯一ID）、UUID（32位UUID字符串）、AUTO（数据库自增）、INPUT(自行输入)

<br><br>

# 核心功能

--------------------------------------------------------------------------------

## 代码生成器

在代码生成之前，首先进行配置，MP提供了大量的自定义设置，生成的代码完全能够满足各类型的需求，如果你发现配置不能满足你的需求，欢迎提交issue和pull-request，有兴趣的也可以查看[源码](https://github.com/baomidou/mybatis-plus/tree/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/generator)进行了解。

> 参数说明

参数相关的配置，详见源码

> 主键策略选择

MP支持以下4中主键策略，可根据需求自行选用：

值                | 描述
---------------- | ---------------------
IdType.AUTO      | 数据库ID自增
IdType.INPUT     | 用户输入ID
IdType.ID_WORKER | 全局唯一ID，内容为空自动填充（默认配置）
IdType.UUID      | 全局唯一ID，内容为空自动填充

AUTO、INPUT和UUID大家都应该能够明白，这里主要讲一下ID_WORKER。首先得感谢开源项目`Sequence`，感谢作者`李景枫`。

什么是Sequence？简单来说就是一个分布式高效有序ID生产黑科技工具，思路主要是来源于`Twitter-Snowflake算法`。这里不详细讲解Sequence，有兴趣的朋友请[点此去了解Sequence](http://git.oschina.net/yu120/sequence)。

MP在Sequence的基础上进行部分优化，用于产生全局唯一ID，好的东西希望推广给大家，所以我们将ID_WORDER设置为默认配置。

> 表及字段命名策略选择

在MP中，我们建议`数据库表名`采用`下划线命名方式`，而`表字段名`采用`驼峰命名方式`。

这么做的原因是为了避免在对应实体类时产生的性能损耗，这样字段不用做映射就能直接和实体类对应。当然如果项目里不用考虑这点性能损耗，那么你采用下滑线也是没问题的，只需要在生成代码时配置`dbColumnUnderline`属性就可以。

> 如何生成代码

> 方式一、代码生成

```依赖jars
<!-- 模板引擎 -->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity</artifactId>
    <version>1.7</version>
</dependency>

<!-- MP 核心库 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>最新版本</version>
</dependency>
```

> 代码生成示例

```java
import java.util.HashMap;
import java.util.Map;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

/**
 * <p>
 * 代码生成器演示
 * </p>
 */
public class MpGenerator {

    /**
     * <p>
     * MySQL 生成演示
     * </p>
     */
    public static void main(String[] args) {
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        gc.setOutputDir("D://");
        gc.setFileOverride(true);
        gc.setActiveRecord(true);
        gc.setEnableCache(false);// XML 二级缓存
        gc.setBaseResultMap(true);// XML ResultMap
        gc.setBaseColumnList(false);// XML columList
        gc.setAuthor("Yanghu");

        // 自定义文件命名，注意 %s 会自动填充表实体属性！
        // gc.setMapperName("%sDao");
        // gc.setXmlName("%sDao");
        // gc.setServiceName("MP%sService");
        // gc.setServiceImplName("%sServiceDiy");
        // gc.setControllerName("%sAction");
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setDbType(DbType.MYSQL);
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("521");
        dsc.setUrl("jdbc:mysql://127.0.0.1:3306/mybatis-plus?characterEncoding=utf8");
        mpg.setDataSource(dsc);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setTablePrefix("bmd_");// 此处可以修改为您的表前缀
        strategy.setNaming(NamingStrategy.underline_to_camel);// 表名生成策略
        // strategy.setInclude(new String[] { "user" }); // 需要生成的表
        // strategy.setExclude(new String[]{"test"}); // 排除生成的表
        // 字段名生成策略
        strategy.setFieldNaming(NamingStrategy.underline_to_camel);
        // 自定义实体父类
        // strategy.setSuperEntityClass("com.baomidou.demo.TestEntity");
        // 自定义实体，公共字段
        // strategy.setSuperEntityColumns(new String[] { "test_id", "age" });
        // 自定义 mapper 父类
        // strategy.setSuperMapperClass("com.baomidou.demo.TestMapper");
        // 自定义 service 父类
        // strategy.setSuperServiceClass("com.baomidou.demo.TestService");
        // 自定义 service 实现类父类
        // strategy.setSuperServiceImplClass("com.baomidou.demo.TestServiceImpl");
        // 自定义 controller 父类
        // strategy.setSuperControllerClass("com.baomidou.demo.TestController");
        // 【实体】是否生成字段常量（默认 false）
        // public static final String ID = "test_id";
        // strategy.setEntityColumnConstant(true);
        // 【实体】是否为构建者模型（默认 false）
        // public User setName(String name) {this.name = name; return this;}
        // strategy.setEntityBuliderModel(true);
        mpg.setStrategy(strategy);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setParent("com.baomidou");
        pc.setModuleName("test");
        mpg.setPackageInfo(pc);

        // 注入自定义配置，可以在 VM 中使用 cfg.abc 设置的值
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
                this.setMap(map);
            }
        };
        mpg.setCfg(cfg);

        // 自定义模板配置，可以 copy 源码 mybatis-plus/src/main/resources/template 下面内容修改，
        // 放置自己项目的 src/main/resources/template 目录下, 默认名称一下可以不配置，也可以自定义模板名称
        // TemplateConfig tc = new TemplateConfig();
        // tc.setController("...");
        // tc.setEntity("...");
        // tc.setMapper("...");
        // tc.setXml("...");
        // tc.setService("...");
        // tc.setServiceImpl("...");
        // mpg.setTemplate(tc);

        // 执行生成
        mpg.execute();

        // 打印注入设置
        System.err.println(mpg.getCfg().getMap().get("abc"));
    }

}
```

> 方式二、Maven插件生成

待补充（Maven代码生成插件 待完善） <http://git.oschina.net/baomidou/mybatisplus-maven-plugin>

## 通用 CRUD

## 条件构造器

> 实体包装器，用于处理 sql 拼接，排序，实体参数查询等！

. 实体包装器 EntityWrapper 继承 Wrapper

- 例如：

- 翻页查询

  ```java
  public Page<T> selectPage(Page<T> page, EntityWrapper<T> entityWrapper) {
    if (null != entityWrapper) {
        entityWrapper.orderBy(page.getOrderByField(), page.isAsc());
    }
    page.setRecords(baseMapper.selectPage(page, entityWrapper));
    return page;
  }
  ```

- 拼接 sql

```java
@Test
public void testTSQL11() {
    /*
     * 实体带查询使用方法  输出看结果
     */
    ew.setEntity(new User(1));
    ew.where("name={0}", "'zhangsan'").and("id=1")
            .orNew("status={0}", "0").or("status=1")
            .notLike("nlike", "notvalue")
            .andNew("new=xx").like("hhh", "ddd")
            .andNew("pwd=11").isNotNull("n1,n2").isNull("n3")
            .groupBy("x1").groupBy("x2,x3")
            .having("x1=11").having("x3=433")
            .orderBy("dd").orderBy("d1,d2");
    System.out.println(ew.getSqlSegment());
}
```

- 自定义 SQL 方法如何使用 Wrapper

. mapper java 接口方法

```java
List<User> selectMyPage(RowBounds rowBounds, @Param("ew") Wrapper<T> wrapper);
```

. mapper xml 定义

```xml
<select id="selectMyPage" resultType="User">
  SELECT * FROM user WHERE state = 1 ${ew.sqlSegment}
</select>
```

<br><br>

# 插件扩展

--------------------------------------------------------------------------------

## 分页插件

- mybatis 配置文件中配置插件 [mybatis-config.xml]

```xml
<plugins>
    <!--
     | 分页插件配置
     | 插件提供二种方言选择：1、默认方言 2、自定义方言实现类，两者均未配置则抛出异常！
     | overflowCurrent 溢出总页数，设置第一页 默认false
     | optimizeType Count优化方式 默认default
     | 1.支持 aliDruid 方式，需添加aliDruid依赖
     | 2.支持 jsqlparser 方式，需添加jsqlparser依赖
     | dialectType 数据库方言  
     |             默认支持  mysql  oracle  hsql  sqlite  postgre  sqlserver
     | dialectClazz 方言实现类
     |              自定义需要实现 com.baomidou.mybatisplus.plugins.pagination.IDialect 接口
     | -->
    <!-- 配置方式一、使用 MybatisPlus 提供方言实现类 -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
        <property name="dialectType" value="mysql" />
        <property name="optimizeType" value="aliDruid" />
    </plugin>
    <!-- 配置方式二、使用自定义方言实现类 -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
        <property name="dialectClazz" value="xxx.dialect.XXDialect" />
        <property name="optimizeType" value="jsqlparser" />
    </plugin>
</plugins>
```

- UserMapper.java 方法内容

```java
/**
 * <p>
 * 查询 state 状态，用户列表，分页显示
 * </p>
 *
 * @param page
 *            翻页对象，可以作为 xml 参数直接使用，传递参数 Page 即自动分页
 * @param state
 *            状态
 * @return
 */
List<User> selectUserList(Pagination page, Integer state);
```

- UserServiceImpl.java 调用翻页方法，需要 page.setRecords 回传给页面

```java
public Page<User> selectUserPage(Page<User> page, Integer state) {
    page.setRecords(baseMapper.selectUserList(page, state));
    return page;
}
```

- UserMapper.xml 等同于编写一个普通 list 查询，mybatis-plus 自动替你分页

```xml
<select id="selectUserList" resultType="User">
    SELECT * FROM user WHERE state=#{state}
</select>
```

## 执行分析插件

> SQL 执行分析拦截器【 目前只支持 MYSQL-5.6.3 以上版本 】，作用是分析 处理 DELETE UPDATE 语句， 防止小白或者恶意 delete update 全表操作！

```xml
<plugins>
    <!-- SQL 执行分析拦截器 stopProceed 发现全表执行 delete update 是否停止运行 -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.SqlExplainInterceptor">
        <property name="stopProceed" value="false" />
    </plugin>
</plugins>
```

> 注意！参数说明

- 参数：stopProceed 发现执行全表 delete update 语句是否停止执行

- 注意！该插件只用于开发环境，不建议生产环境使用。。。

## 性能分析插件

> 性能分析拦截器，用于输出每条 SQL 语句及其执行时间

- 使用如下：

```xml
<plugins>
        ....

        <!-- SQL 执行性能分析，开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长 -->
        <plugin interceptor="com.baomidou.mybatisplus.plugins.PerformanceInterceptor">
            <property name="maxTime" value="100" />
            <!--SQL是否格式化 默认false-->
            <property name="format" value="true" />
        </plugin>
    </plugins>
```

## XML文件热加载

> 开启动态加载 mapper.xml

- 多数据源配置多个 MybatisMapperRefresh 启动 bean

```
参数说明：
      sqlSessionFactory:session工厂
      mapperLocations:mapper匹配路径
      enabled:是否开启动态加载  默认:false
      delaySeconds:项目启动延迟加载时间  单位：秒  默认:10s
      sleepSeconds:刷新时间间隔  单位：秒 默认:20s
  提供了两个构造,挑选一个配置进入spring配置文件即可：

构造1:
    <bean class="com.baomidou.mybatisplus.spring.MybatisMapperRefresh">
        <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
        <constructor-arg name="mapperLocations" value="classpath*:mybatis/mappers/*/*.xml"/>
        <constructor-arg name="enabled" value="true"/>
    </bean>

构造2:
    <bean class="com.baomidou.mybatisplus.spring.MybatisMapperRefresh">
        <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
        <constructor-arg name="mapperLocations" value="classpath*:mybatis/mappers/*/*.xml"/>
        <constructor-arg name="delaySeconds" value="10"/>
        <constructor-arg name="sleepSeconds" value="20"/>
        <constructor-arg name="enabled" value="true"/>
    </bean>
```

> 注意！参数说明

- 参数：maxTime SQL 执行最大时长，超过自动停止运行，有助于发现问题。
- 参数：format SQL SQL是否格式化，默认false。

- 注意！该插件只用于开发环境，不建议生产环境使用。。。

## 注入自定义SQL

> 自定义注入全表删除方法 deteleAll

> 自定义 MySqlInjector 注入类 `java` 代码如下：

```java
public class MySqlInjector extends AutoSqlInjector {

    @Override
    public void inject(Configuration configuration, MapperBuilderAssistant builderAssistant, Class<?> mapperClass,
            Class<?> modelClass, TableInfo table) {
        /* 添加一个自定义方法 */
        deleteAllUser(mapperClass, modelClass, table);
    }

    public void deleteAllUser(Class<?> mapperClass, Class<?> modelClass, TableInfo table) {

        /* 执行 SQL ，动态 SQL 参考类 SqlMethod */
        String sql = "delete from " + table.getTableName();

        /* mapper 接口方法名一致 */
        String method = "deleteAll";
        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
        this.addMappedStatement(mapperClass, method, sqlSource, SqlCommandType.DELETE, Integer.class);
    }

}
```

> 当然你的 mapper.java 接口类需要申明使用方法 deleteAll 如下

```java
public interface UserMapper extends AutoMapper<User> {

    /**
     * 自定义注入方法
     */
    int deleteAll();

}
```

> 最后一步注入启动

```xml
<!-- MyBatis SqlSessionFactoryBean 配置 -->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    .....

  <!-- 自定义注入 deleteAll 方法  -->
  <property name="sqlInjector" ref="mySqlInjector" />
</bean>

<!-- 自定义注入器 -->
<bean id="mySqlInjector" class="com.baomidou.test.MySqlInjector" />
```

- 完成如上几步共享，注入完成！可以开始使用了。。。

## 公共字段自动填充

> 公共字段字段填充

- 实现元对象处理器接口： com.baomidou.mybatisplus.mapper.IMetaObjectHandler

- 自定义实现类 MyMetaObjectHandler

```java
/**  自定义填充公共 name 字段  */
public class MyMetaObjectHandler implements IMetaObjectHandler {

    /**
     * 测试 user 表 name 字段为空自动填充
     */
    public void insertFill(MetaObject metaObject) {
        Object name = metaObject.getValue("name");
        if (null == name) {
            metaObject.setValue("name", "instert-fill");
        }
    }

}
```

> spring 启动注入 MyMetaObjectHandler 配置

```xml
<!-- MyBatis SqlSessionFactoryBean 配置 -->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <property name="globalConfig" ref="globalConfig"></property>
</bean>
<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
    <!-- 公共字段填充处理器 -->
    <property name="metaObjectHandler" ref="myMetaObjectHandler" />
</bean>
<!-- 自定义处理器 -->
<bean id="myMetaObjectHandler" class="com.baomidou.test.MyMetaObjectHandler" />
```

<br><br>

# 常见问题

--------------------------------------------------------------------------------

## Mybatis-Plus 性能如何？

<br><br>
