# 常见问题

## 如何排除非表中字段？

> 三种方式选择一种即可！

- 使用 transient 修饰

  ```java
  private transient String noColumn;
  ```

- 使用 static 修饰

  ```java
  private static String noColumn;
  ```

- 使用 TableField 注解

  ```java
  @TableField(exist=false)
  private String noColumn;
  ```

## 异常`Invalid bound statement (not found)` 解决方法(MP方法无法调用)

> 不要怀疑，正视自己，这个异常肯定是你插入的姿势不对……

- 检查是不是引入 jar 冲突

- 配置Mapper.java的扫描路径
  
  - 方法一：在`Configuration`类上使用注解`MapperScan`：
  ```java
  @Configuration
  @MapperScan("com.yourpackage.*.mapper")
  public class YourConfigClass{
    ...
  }
  ```
  - 方法二：在`Configuration`类里面，配置`MapperScannerConfigurer`, [查看示例](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/config%E6%96%B9%E5%BC%8F/src/main/java/com/baomidou/springboot/config/MybatisPlusConfig.java)
  ```java
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer scannerConfigurer = new MapperScannerConfigurer();
        //可以通过环境变量获取你的mapper路径,这样mapper扫描可以通过配置文件配置了
        scannerConfigurer.setBasePackage("com.yourpackage.*.mapper");
        return scannerConfigurer;
    }
  ```

- 检查命名空间是否正常？ 检查包扫描路径`typeAliasesPackage`是否正常？如果扫描不到，MP无法进行预注入

- 检查是否指定了主键？如未指定，则会导致 `selectById` 相关 ID 无法操作，请用注解 `@TableId` 注解表 ID 主键

- 当然 `@TableId` 注解可以没有！但是你的主键必须叫  id  忽略大小写

  
## 自定义sql无法执行

> 指在xml里面自定义sql，需要配置xml扫描路径

-  spring mvc配置mapper.xml(参考[spring-mybatis.xml](https://gitee.com/baomidou/mybatisplus-spring-mvc/blob/dev/src/main/resources/spring/spring-mybatis.xml))

```xml
 <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="typeAliasesPackage" value="xxx.entity" />
    <property name="mapperLocations" value="classpath:com/xx/mapper/xml/*Mapper.xml" />
    ...
</bean>
```
-  spring boot yml配置mapper.xml(参考[mybatisplus-spring-boot](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/2.x/src/main/resources/application.yml))
```properties
mybatis-plus:
  mapper-locations: classpath:/mapper/**/*.xml
```

- 对于`IDEA`系列编辑器，XML 文件是不能放在 java 文件夹中的，IDEA 默认不会编译源码文件夹中的 XML 文件，可以参照以下方式解决：

  - 将配置文件放在 resource 文件夹中，请参考 Spring-MVC 的集成 DEMO
  - 对于 Maven 项目，可指定 POM 文件的 resource

  ```xml
  <build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <!--指定资源的位置-->
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
  </build>
  ```
-  注意！maven 多模块 jar 依赖 xml 扫描需为 ` classpath*:mapper/**/*Mapper.xml` 加载多个 jar 下的 xml 
    
## 启动时异常

> java.lang.ClassCastException: `sun.reflect.generics.reflectiveObjects.TypeVariableImpl cannot be cast to java.lang.Class`

- 配置MapperScan需要排除 com.baomidou.mybatisplus.mapper.BaseMapper
- MapperScan排除自定义公共Mapper, 比如 
```java
public interface SuperMapper<T> extends com.baomidou.mybatisplus.mapper.BaseMapper<T> {
    ...your methds
}
```

> 异常`Injection of autowired` 解决方法

- 原因！低版本不支持泛型注入，请升级 spring 4+

> 异常java.lang.NoSuchMethodError: `org.apache.ibatis.session.Configuration.getDefaultScriptingLanguageInstance()
Lorg/apache/ibatis/scripting/LanguageDriver` 解决方法

- 版本引入问题：3.4.1版本里没有，3.4.2里面才有！

## 关于Long型主键填充不生效的问题

> 检查是不是用了long而不是Long！【特别说明】long类型默认值为0，而mp只会判断是否为null

## ID_WORKER 主键 Long 导致 js 精度丢失

> JavaScript 无法处理 Java 的长整型 Long 导致精度丢失，解决办法 Long 转为 String 返回

- FastJson 处理方式：

```java
/**
 * <p>
 * 消息转换
 * </p>
 */
 @Override
 public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    FastJsonHttpMessageConverter fastJsonConverter = new FastJsonHttpMessageConverter();
    FastJsonConfig fjc = new FastJsonConfig();
    //1、序列化重点
    fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible);
    fastJsonConverter.setFastJsonConfig(fjc);
    converters.add(fastJsonConverter);
 }
```

- JackJson 处理方式：

```java
// 1、注解处理，这里可以配置公共 baseEntity 处理
@JsonSerialize(using=ToStringSerializer.class)
public long getId() {
    return id;
}

// 2、全局配置序列化返回 JSON 处理
final ObjectMapper objectMapper = new ObjectMapper();
SimpleModule simpleModule = new SimpleModule();
simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
objectMapper.registerModule(simpleModule);
```

- 还有一个方法，增加一个public String getIdStr()方法，前台获取idStr

## 字段 update 空字符串 OR NULL 修改验证策略

> FieldStrategy 三种策略 IGNORED【忽略】，NOT_NULL【非 NULL，默认策略】，NOT_EMPTY【非空】

- 全局的验证策略，注入配置 GlobalConfiguration 属性 fieldStrategy

- 根据具体情况，选择验证注解，如验证非空：

  ```java
  @TableField(strategy=FieldStrategy.NOT_EMPTY)
  ```
- 解决办法 二

  ```java
  updateAllColumnById(entity) // 全部字段更新

  insertAllColumn(entity) // 全部字段插入
  ```

## 字段 `bit 、tinyint(1)` 使用 boolean 类型映射解决方法

> 默认 mybatis 是不会自动处理该映射，需要修改请求连接添加参数 tinyInt1isBit=false【默认 true】如下：

  ```xml
  jdbc:mysql://127.0.0.1:3306/mp?tinyInt1isBit=false
  ```

## 出现2个limit语句
> 原因：配了2个分页拦截器! 检查配置文件或者代码，只留一个！

## insert后如何返回主键
> insert后主键会自动set到实体的ID字段，只需要entity.getId()

## MP如何只查指定几个字段，而不是全字段？
> EntityWrapper.sqlSelect配置你想要查询的字段

```java
EntityWrapper<H2User> ew = new EntityWrapper<>();
ew.setSqlSelect("test_id as id, name, age");//只查询3个字段
List<H2User> list = userService.selectList(ew);
for(H2User u:list){
    Assert.assertNotNull(u.getId());
    Assert.assertNotNull(u.getName());
    Assert.assertNull(u.getPrice());//这个字段没有查询出来
}
```

## mapper 层二级缓存问题

> 我们建议缓存放到 service 层，你可以自定义自己的 BaseServiceImpl 重写注解父类方法，继承自己的实现。

- 当然你是一个极端分子，请使用 CachePaginationInterceptor 替换默认分页，这样支持分页缓存。

## mapper层二级缓存刷新问题
> 如果你按照mybatis的方式配置第三方二级缓存，并且使用2.0.9以上的版本，则会发现自带的方法无法更新缓存内容，那么请按如下方式解决 二 选 一

  1.在代码中mybatis的mapper层添加缓存注释，声明implementation或eviction的值为cache接口的实现类
  @CacheNamespace(implementation=MybatisRedisCache.class,eviction=MybatisRedisCache.class)
  public interface DataResourceMapper extends BaseMapper<DataResource>{}

  2.在对应的mapper.xml中将原有注释修改为链接式声明，以保证xml文件里的缓存能够正常
 	<cache-ref namespace="com.mst.cms.dao.DataResourceMapper"></cache-ref>
 
## Cause: org.apache.ibatis.type.TypeException: 
Error setting null for parameter #1 with JdbcType OTHER

> 配置jdbcTypeForNull=NULL
Spring Bean配置方式：
```java
    MybatisConfiguration configuration = new MybatisConfiguration();
    configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
    configuration.setJdbcTypeForNull(JdbcType.NULL);
    configuration.setMapUnderscoreToCamelCase(true);//开启下划线转驼峰
    sqlSessionFactory.setConfiguration(configuration);
```

## 自定义sql里使用Page对象传参无法获取

> Page对象是继承RowBounds，是Mybatis内置对象，无法在mapper里获取
请使用自定义Map/对象，或者通过@Param("page") int page,size来传参

## 开启查询结果【下划线转驼峰】

> 该功能是mybatis原生自带，配置如下

Spring Bean 配置：
```java
  MybatisConfiguration configuration = new MybatisConfiguration();
  configuration.setMapUnderscoreToCamelCase(true);//开启下划线转驼峰
  ...其他配置，见上面的【配置jdbcTypeForNull=NULL】
```
Spring Boot yml配置：
```yaml
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
```

## 如何使用：`Map下划线自动转驼峰`
指的是：resultType="java.util.Map"

!> 注意：结果集用Map返回时，不同数据库的处理大小写不一样

* 比如mysql原样返回 select `test_type` from xxx -> test_type:1
* Oracle只返回全大写 select `test_type` from xxx -> TEST_TYPE:1
* 上述2种情况，只要是下划线命名的，使用`Map下划线自动转驼峰` 结果集都是 `testType`
* 但是针对`Oracle数据库`：请注意MP自带方法selectMaps: 语句是 select test_type as testType from xxx -> 得到的结果：
 1) 没配`Map下划线自动转驼峰`: `TESTTYPE`:value
 2) 配了：`testtype`:value(Mysql数据库会保留驼峰不受影响)

- Java Config Bean方式
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

## 在 wrapper 中如何使用 `limit` 限制 SQL
```
// 取 1 条数据
wrapper.last("limit 1");
```


## 通用 insertBatch 为什么放在 service 层处理

* SQL 长度有限制海量数据量单条 SQL 无法执行，就算可执行也容易引起内存泄露 JDBC 连接超时等
* 不同数据库对于单条 SQL 批量语法不一样不利于通用
* 目前的解决方案：循环预处理批量提交，虽然性能比单 SQL 慢但是可以解决以上问题。

