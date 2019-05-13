---
sidebarDepth: 0
---

# 常见问题

[[toc]]

## 如何排除非表中字段？

以下三种方式选择一种即可：

- 使用 `transient` 修饰

  ```java
  private transient String noColumn;
  ```

- 使用 `static` 修饰

  ```java
  private static String noColumn;
  ```

- 使用 `TableField` 注解

  ```java
  @TableField(exist=false)
  private String noColumn;
  ```

## 出现 `Invalid bound statement (not found)` 异常

> 不要怀疑，正视自己，这个异常肯定是你插入的姿势不对……

- 检查是不是引入 jar 冲突

- 检查 Mapper.java 的扫描路径

  - 方法一：在 `Configuration` 类上使用注解 `MapperScan`

  ```java
  @Configuration
  @MapperScan("com.yourpackage.*.mapper")
  public class YourConfigClass{
    ...
  }
  ```

  - 方法二：在`Configuration`类里面，配置`MapperScannerConfigurer`（[查看示例](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/config%E6%96%B9%E5%BC%8F/src/main/java/com/baomidou/springboot/config/MybatisPlusConfig.java)）

  ```java
  @Bean
  public MapperScannerConfigurer mapperScannerConfigurer(){
      MapperScannerConfigurer scannerConfigurer = new MapperScannerConfigurer();
      //可以通过环境变量获取你的mapper路径,这样mapper扫描可以通过配置文件配置了
      scannerConfigurer.setBasePackage("com.yourpackage.*.mapper");
      return scannerConfigurer;
  }
  ```

- 检查命名空间是否正常？ 检查包扫描路径`typeAliasesPackage`是否正常？如果扫描不到，MP 无法进行预注入

- 检查是否指定了主键？如未指定，则会导致 `selectById` 相关 ID 无法操作，请用注解 `@TableId` 注解表 ID 主键。当然 `@TableId` 注解可以没有！但是你的主键必须叫 id（忽略大小写）

- SqlSessionFactory不要使用原生的，请使用MybatisSqlSessionFactory



## 自定义 SQL 无法执行

问题描述：指在 XML 中里面自定义 SQL，却无法调用。本功能同 `MyBatis` 一样需要配置 XML 扫描路径：

- Spring MVC 配置（参考[mybatisplus-spring-mvc](https://gitee.com/baomidou/mybatisplus-spring-mvc/blob/dev/src/main/resources/spring/spring-mybatis.xml)）

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="typeAliasesPackage" value="xxx.entity" />
    <property name="mapperLocations" value="classpath*:/mybatis/*/*.xml"/>
    ...
</bean>
```

- Spring Boot 配置（参考[mybatisplus-spring-boot](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/2.x/src/main/resources/application.yml)）

```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
```
- 对于`IDEA`系列编辑器，XML 文件是不能放在 java 文件夹中的，IDEA 默认不会编译源码文件夹中的 XML 文件，可以参照以下方式解决：

  - 将配置文件放在 resource 文件夹中
  - 对于 Maven 项目，可指定 POM 文件的 resource

  ```xml
  <build>
    <resources>
        <resource>
            <!-- xml放在java目录下-->
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <!--指定资源的位置（xml放在resources下，可以不用指定）-->
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
  </build>
  ```
  

::: tip
注意！Maven 多模块项目的扫描路径需以 `classpath*:` 开头 （即加载多个 jar 包下的 XML 文件）
:::

## 启动时异常

- 异常一：

  ```
  java.lang.ClassCastException: sun.reflect.generics.reflectiveObjects.TypeVariableImpl cannot be cast to java.lang.Class
  ```

  MapperScan 需要排除 com.baomidou.mybatisplus.mapper.BaseMapper 类 及其 子类（自定义公共 Mapper），比如：

  ```java
  import com.baomidou.mybatisplus.core.mapper.BaseMapper;

  public interface SuperMapper<T> extends BaseMapper<T> {
      // your methods
  }
  ```

- 异常二：

  ```
  Injection of autowired
  ```

  原因：低版本不支持泛型注入，请升级 Spring 版本到 4+ 以上。

- 异常三：

  ```
  java.lang.NoSuchMethodError: org.apache.ibatis.session.Configuration.getDefaultScriptingLanguageInstance() Lorg/apache/ibatis/scripting/LanguageDriver
  ```

  版本引入问题：3.4.1 版本里没有，3.4.2 里面才有！

## 关于 Long 型主键填充不生效的问题

检查是不是用了`long`而不是`Long`！
::: tip
`long`类型默认值为 0，而 MP 只会判断是否为 `null`
:::

## ID_WORKER 生成主键太长导致 js 精度丢失

JavaScript 无法处理 Java 的长整型 Long 导致精度丢失，具体表现为主键最后两位永远为 0，解决思路： Long 转为 String 返回

- FastJson 处理方式

  ```java {6}
  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
      FastJsonHttpMessageConverter fastJsonConverter = new FastJsonHttpMessageConverter();
      FastJsonConfig fjc = new FastJsonConfig();
      // 配置序列化策略
      fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible);
      fastJsonConverter.setFastJsonConfig(fjc);
      converters.add(fastJsonConverter);
  }
  ```

- JackJson 处理方式

  - 方式一

    ```java
    // 注解处理，这里可以配置公共 baseEntity 处理
    @JsonSerialize(using=ToStringSerializer.class)
    public long getId() {
        return id;
    }
    ```

  - 方式二

    ```java
    // 全局配置序列化返回 JSON 处理
    final ObjectMapper objectMapper = new ObjectMapper();
    SimpleModule simpleModule = new SimpleModule();
    simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
    objectMapper.registerModule(simpleModule);
    ```

- 比较一般的处理方式：增加一个 `public String getIdStr()` 方法，前台获取 `idStr`

## 插入或更新的字段有 空字符串 或者 `null`

FieldStrategy 有三种策略：

- IGNORED：忽略
- NOT_NULL：非 NULL，默认策略
- NOT_EMPTY：非空

当用户有更新字段为 空字符串 或者 `null` 的需求时，需要对 `FieldStrategy` 策略进行调整：

- 方式一：调整全局的验证策略

  注入配置 GlobalConfiguration 属性 fieldStrategy

- 方式二：调整字段验证注解

  根据具体情况，在需要更新的字段中调整验证注解，如验证非空：

  ```java
  @TableField(strategy=FieldStrategy.NOT_EMPTY)
  ```

- 方式三：使用 `UpdateWrapper` (3.x)

  使用以下方法来进行更新或插入操作：

  ```java
  //updateAllColumnById(entity) // 全部字段更新: 3.0已经移除
  mapper.update(
     new User().setName("mp").setAge(3),
     Wrappers.<User>lambdaUpdate()
             .set(User::getEmail, null) //把email设置成null
             .eq(User::getId, 2)
  );
  //也可以参考下面这种写法
  mapper.update(
      null,
      Wrappers.<User>lambdaUpdate()
         .set(User::getAge, 3)
         .set(User::getName, "mp")
         .set(User::getEmail, null) //把email设置成null
         .eq(User::getId, 2)
  );
  
  ```

## 字段类型为 `bit`、`tinyint(1)` 时映射为 `boolean` 类型

默认mysql驱动会把tinyint(1)字段映射为boolean: 0=false, 非0=true

MyBatis 是不会自动处理该映射，如果不想把tinyint(1)映射为boolean类型:

* 修改类型tinyint(1)为tinyint(2)或者int
* 需要修改请求连接添加参数 `tinyInt1isBit=false`，如下：

```xml
jdbc:mysql://127.0.0.1:3306/mp?tinyInt1isBit=false
```

## 出现 2 个 `limit` 语句

原因：配了 2 个分页拦截器! 检查配置文件或者代码，只留一个！

## insert 后如何返回主键

insert 后主键会自动 set 到实体的 ID 字段，所以你只需要 getId() 就好

## MP 如何查指定的几个字段

EntityWrapper.sqlSelect 配置你想要查询的字段

```java
//2.x
EntityWrapper<H2User> ew = new EntityWrapper<>();
ew.setSqlSelect("test_id as id, name, age");//只查询3个字段
List<H2User> list = userService.selectList(ew);
for(H2User u:list){
    Assert.assertNotNull(u.getId());
    Assert.assertNotNull(u.getName());
    Assert.assertNull(u.getPrice()); // 这个字段没有查询出来
}

//3.x
mapper.selectList(
    Wrappers.<User>lambdaQuery()
    .select(User::getId, User::getName)
);
//或者使用QueryWrapper
mapper.selectList(
    new QueryWrapper<User>()
    .select("id","name")
);

```

## mapper 层二级缓存问题

我们建议缓存放到 service 层，你可以自定义自己的 BaseServiceImpl 重写注解父类方法，继承自己的实现。

当然如果你是一个极端分子，请使用 CachePaginationInterceptor 替换默认分页，这样支持分页缓存。

## mapper 层二级缓存刷新问题

如果你按照 mybatis 的方式配置第三方二级缓存，并且使用 2.0.9 以上的版本，则会发现自带的方法无法更新缓存内容，那么请按如下方式解决（二选一）：

1.在代码中 mybatis 的 mapper 层添加缓存注释，声明 implementation 或 eviction 的值为 cache 接口的实现类
```java
@CacheNamespace(implementation=MybatisRedisCache.class,eviction=MybatisRedisCache.class)
public interface DataResourceMapper extends BaseMapper<DataResource>{}
```

2.在对应的 mapper.xml 中将原有注释修改为链接式声明，以保证 xml 文件里的缓存能够正常
```xml
<cache-ref namespace="com.mst.cms.dao.DataResourceMapper"></cache-ref>
```

## `Cause: org.apache.ibatis.type.TypeException:Error setting null for parameter #1 with JdbcType OTHER`

> 配置 jdbcTypeForNull=NULL
> Spring Bean 配置方式：

```java
MybatisConfiguration configuration = new MybatisConfiguration();
configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
configuration.setJdbcTypeForNull(JdbcType.NULL);
configuration.setMapUnderscoreToCamelCase(true);//开启下划线转驼峰
sqlSessionFactory.setConfiguration(configuration);
```

## 自定义 sql 里使用 Page 对象传参无法获取

> Page 对象是继承 RowBounds，是 Mybatis 内置对象，无法在 mapper 里获取
> 请使用自定义 Map/对象，或者通过@Param("page") int page,size 来传参

## 开启查询结果【下划线转驼峰】

> 该功能是 mybatis 原生自带，配置如下

Spring Bean 配置：

```java
  MybatisConfiguration configuration = new MybatisConfiguration();
  configuration.setMapUnderscoreToCamelCase(true);//开启下划线转驼峰
  //...其他配置，见上面的【配置jdbcTypeForNull=NULL】
```

Spring Boot yml 配置：

```yaml
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
```

## 如何使用:【Map下划线自动转驼峰】

指的是：`resultType="java.util.Map"`

- todo 注意事项待定,等待3.1.1版本发布后再写

- Java Config Bean 方式

```java
@Configuration
@MapperScan("com.baomidou.mybatisplus.test.h2.entity.mapper")
public class MybatisConfigMetaObjOptLockConfig {

    @Bean("mybatisSqlSession")
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource, ResourceLoader resourceLoader, GlobalConfiguration globalConfiguration) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
        configuration.setJdbcTypeForNull(JdbcType.NULL);
        //*注册Map 下划线转驼峰*
        configuration.setObjectWrapperFactory(new MybatisMapWrapperFactory());

        sqlSessionFactory.setConfiguration(configuration);
        //...其他配置
        return sqlSessionFactory.getObject();
    }
    ...
}
```

## 在 wrapper 中如何使用 `limit` 限制 SQL

```java
// 取 1 条数据
wrapper.last("limit 1");
```

## 通用 insertBatch 为什么放在 service 层处理

- SQL 长度有限制海量数据量单条 SQL 无法执行，就算可执行也容易引起内存泄露 JDBC 连接超时等
- 不同数据库对于单条 SQL 批量语法不一样不利于通用
- 目前的解决方案：循环预处理批量提交，虽然性能比单 SQL 慢但是可以解决以上问题。


## 逻辑删除下 自动填充 功能没有效果

- 自动填充的实现方式是填充到入参的`entity`内,由于`baseMapper`提供的删除接口入参不是`entity`所以逻辑删除无效
- 如果你想要使用自动填充有效:
  - 方式一: 使用update方法:`UpdateWrapper.set("logicDeleteColumn","deleteValue")`
  - 方式二: 配合[Sql注入器](/guide/sql-injector.md)  
并使用我们提供的`com.baomidou.mybatisplus.extension.injector.methods.LogicDeleteByIdWithFill`类  
注意该类只能填充指定了自动填充的字段,其他字段无效

- 方式2下: Java Config Bean 配置
  
  1. 配置自定义的 SqlInjector
    ``` java
    @Bean
    public LogicSqlInjector logicSqlInjector(){
        return new LogicSqlInjector() {
            /**
             * 注入自定义全局方法
             */
            @Override
            public List<AbstractMethod> getMethodList() {
                List<AbstractMethod> methodList = super.getMethodList();
                methodList.add(new LogicDeleteByIdWithFill());
                return methodList;
            }
        };
    }
    ```
  2. 配置自己的全局 baseMapper 并使用
    ```java
    public interface MyBaseMapper<T> extends BaseMapper<T> {
    
        /**
         * 自定义全局方法
         */
        int deleteByIdWithFill(T entity);
    }
    ```

## 3.x数据库关键字如何处理？

在以前的版本是自动识别关键字进行处理的，但是3.x移除了这个功能。

1. 不同的数据库对关键字的处理不同,很难维护。

2. 在数据库设计时候本身不建议使用关键字。
3. 交由用户去处理关键字。

```java
@TableField(value = "'status'")
private Boolean status;
```

## MybatisPlusException: Your property named "xxx" cannot find the corresponding database column name!

针对3.1.1以及后面的版本：

现象： 单元测试没问题，启动服务器进行调试就出现这个问题

原因： dev-tools, 3.1.1+针对字段缓存，使用.class来作为key替换了原来的className, 而使用dev-tools会把.class使用不同的classLoader加载，导致可能出现找不到的情况

解决方案： 去掉dev-tools插件