---
sidebarDepth: 0
---

# FAQ

[[toc]]

## Exclude non-column properties

Three ways:

- Use `transient` 

  ```java
  private transient String noColumn;
  ```

- Use `static` 

  ```java
  private static String noColumn;
  ```

- Use `TableField` Annotation

  ```java
  @TableField(exist=false)
  private String noColumn;
  ```

## Runtime Exception `Invalid bound statement (not found)` 

> No doubt, it's caused by incorrect configuration/enviroment

- Check whether the jar confliction

- Check your scan path for Mapper.java, 2 ways:

  - 1:Add  `MapperScan` on your `Configuration` class 

  ```java
  @Configuration
  @MapperScan("com.yourpackage.*.mapper")
  public class YourConfigClass{
    ...
  }
  ```

  - 2:Configurate `MapperScannerConfigurer` in your `Configuration` class [Sample](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/config%E6%96%B9%E5%BC%8F/src/main/java/com/baomidou/springboot/config/MybatisPlusConfig.java)

  ```java
  @Bean
  public MapperScannerConfigurer mapperScannerConfigurer(){
      MapperScannerConfigurer scannerConfigurer = new MapperScannerConfigurer();
      //you can also get the basePackage via enviroment configuration
      scannerConfigurer.setBasePackage("com.yourpackage.*.mapper");
      return scannerConfigurer;
  }
  ```

- Check whether @TableId(Primary Key) is specified. If not,  methods for ById(such as `selectById`) will encounter this error. If one of the property named "id", @TableId is optional(MP treat "id" as Primay Key)

- Check whether MybatisSqlSessionFactory is used, instead of SqlSessionFactory

- Check whether customized SqlInjector is defined, and  `getMethodList()` is overrided, and your basic methods is added(see [DefaultSqlInjector](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/injector/DefaultSqlInjector.java), for customized basic methods, see [sample](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-deluxe))

## Customized SQL cannot be executed

- Problem Description:customized SQL defined in mapper.xml files, but cannot be executed. 
- Solution: configurate your xml file path, the same as Mybatis native.

- Spring MVC Configuration(XML): [mybatisplus-spring-mvc-sample](https://gitee.com/baomidou/mybatis-plus-samples/blob/master/mybatis-plus-sample-quickstart-springmvc/src/main/resources/spring.xml)

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="typeAliasesPackage" value="xxx.entity" />
    <property name="mapperLocations" value="classpath*:/mybatis/*/*.xml"/>
    ...
</bean>
```

- Spring Boot Configuration(yml): [mybatisplus-spring-boot-sample](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/2.x/src/main/resources/application.yml)

```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
```
- Using [IDEA](https://www.jetbrains.com/): XML files under src/main/java folder will not be compiled to target folder, you can solve it by:

  - Put your xml files under resources folder
  - Or configure pom(for maven project) like below:

  ```xml
  <build>
    <resources>
        <resource>
            <!-- xml files under /java folder-->
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <!-- xml files under /resources folder(this configuration is optional)-->
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
  </build>
  ```
  

::: tip
Notice！For Maven multiple modules, scan path should start with `classpath*:` (load xml files from multiple jars)
:::

## Exception For Startup

- One:

  ```
  java.lang.ClassCastException: sun.reflect.generics.reflectiveObjects.TypeVariableImpl cannot be cast to java.lang.Class
  ```

  MapperScan should exclude com.baomidou.mybatisplus.mapper.BaseMapper and subclass(such as customized basic mapper), e.g.:

  ```java
  import com.baomidou.mybatisplus.core.mapper.BaseMapper;

  public interface SuperMapper<T> extends BaseMapper<T> {
      // your methods
  }
  ```

- Two:

  ```
  Injection of autowired
  ```

  CAUSE:Spring 3 not support Generic Type Injection. Please upgrade to Spring 4+

- Three:

  ```
  java.lang.NoSuchMethodError: org.apache.ibatis.session.Configuration.getDefaultScriptingLanguageInstance() Lorg/apache/ibatis/scripting/LanguageDriver
  ```

  Mybatis Version problem: this method is provided since v_3.4.2, upgrade mybatis version(Manage Mybatis version by MP is recommended)

## Cannot autofill primary key with Long type

Check whether `long` type is used instead of `Long`

::: tip
For `long` type, default value=0, MP only has `null` value check
:::

## Javascript precision problem for ID_WORKER

Length of ID_WORKER value is 18-19, which JavaScript cannot process correctly, manifest as last two digits always 0. Ideas: return String instead of Long(can use ID_WORKER_STR for String id)

- FastJson Serialization

  ```java {6}
  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
      FastJsonHttpMessageConverter fastJsonConverter = new FastJsonHttpMessageConverter();
      FastJsonConfig fjc = new FastJsonConfig();
      // configure the strategy
      fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible);
      fastJsonConverter.setFastJsonConfig(fjc);
      converters.add(fastJsonConverter);
  }
  ```

- JackJson Serialization

  - Way 1:

    ```java
    // Use Annotation
    @JsonSerialize(using=ToStringSerializer.class)
    public long getId() {
        return id;
    }
    ```

  - Way 2:

    ```java
    // Global configuration(for all Long type, will return String instead)
    final ObjectMapper objectMapper = new ObjectMapper();
    SimpleModule simpleModule = new SimpleModule();
    simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
    objectMapper.registerModule(simpleModule);
    ```

- General way: Use ID_WORKER_STR type which is for String id, Or add method `public String getIdStr()` , frontend use `idStr`

## Set `null` or empty string value for Insert / Update

- Use FieldStrategy:

  - IGNORED:All Null/Empty value will be used for CRUD
  - NOT_NULL:Only Not Null value will be used for CRUD. It's used by default
  - NOT_EMPTY:Not Empty value will be used for CRUD.

If you want to update Empty String or null value, you need to adjust `FieldStrategy` :

- Way 1:Adjust Global Field Strategy

  Configurate fieldStrategy in GlobalConfiguration 

- Way 2:Adjust entity property Field Strategy

  You can specify the strategy for CURD(Refer to [@TableField](/guide/annotation.md)):

  ```java
  @TableField(insertStrategy=FieldStrategy.NOT_EMPTY, updateStrategy=FieldStrategy.IGNORED, whereStrategy=FieldStrategy.NOT_EMPTY)
  ```

- Way 3:Use `UpdateWrapper` (3.x)

  Sample:

  ```java
  mapper.update(
     new User().setName("mp").setAge(3),
     Wrappers.<User>lambdaUpdate()
             .set(User::getEmail, null) //set email=null
             .eq(User::getId, 2)
  );
  //or put the set value in Wrapper.set 
  mapper.update(
      null,
      Wrappers.<User>lambdaUpdate()
         .set(User::getAge, 3)
         .set(User::getName, "mp")
         .set(User::getEmail, null) //set email=null
         .eq(User::getId, 2)
  );
  
  ```

## Result Type is `boolean` for Column with type `bit`, `tinyint(1)`

Mysql driver will recognize tinyint(1) as boolean:  0=false, other=true

MyBatis doesn't handle such case, if you won't want map tinyint(1) to boolean, you can do:

* Modify column type from tinyint(1) to tinyint(2) or int
* or Modify the jdbc connection param, add `tinyInt1isBit=false`:

```xml
jdbc:mysql://127.0.0.1:3306/mp?tinyInt1isBit=false
```

## Two `limit` statement in running SQL

CAUSE: 2 PaginationInterceptor configured. Check your configuration and keep one only

## Return Primay Key after Insert 

Primary Key will be set to Entity.id property, just use getId() to get it

## Specify select columns in MP

- Use EntityWrapper.sqlSelect (v_2.x)
- Use Wrapper.select() (v_3.x)

```java
//For version 2.x
EntityWrapper<H2User> ew = new EntityWrapper<>();
ew.setSqlSelect("test_id as id, name, age");//only select 3 columns
List<H2User> list = userService.selectList(ew);
for(H2User u:list){
    Assert.assertNotNull(u.getId());
    Assert.assertNotNull(u.getName());
    Assert.assertNull(u.getPrice()); // this column not selected
}

//3.x
mapper.selectList(
    Wrappers.<User>lambdaQuery()
    .select(User::getId, User::getName)
);
//or use QueryWrapper
mapper.selectList(
    new QueryWrapper<User>()
    .select("id","name")
);

```

## Second Level Cache on Mapper

We suggest to put cache on service level. You can customize your own BaseServiceImpl

If you still want to put cache on mapper level, please use CachePaginationInterceptor to replace PaginationInterceptor 

## Refresh Second Level Cache on Mapper

You can use one of the ways below:

- Add Cache Annotation on Mapper, specify implementation, eviction
```java
@CacheNamespace(implementation=MybatisRedisCache.class,eviction=MybatisRedisCache.class)
public interface DataResourceMapper extends BaseMapper<DataResource>{}
```

- Add cache-ref in mapper.xml
```xml
<cache-ref namespace="com.your.company.mapper.UserMapper"></cache-ref>
```

## `Cause: org.apache.ibatis.type.TypeException:Error setting null for parameter #1 with JdbcType OTHER`

> Add configuration: jdbcTypeForNull=NULL

> Spring Configuration Bean:

```java
MybatisConfiguration configuration = new MybatisConfiguration();
configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
configuration.setJdbcTypeForNull(JdbcType.NULL);
configuration.setMapUnderscoreToCamelCase(true);//open Underscore to Camel case
sqlSessionFactory.setConfiguration(configuration);
```

> Yml Configuration
```yaml
mybatis-plus:
  configuration:
    jdbc-type-for-null: 'null' 
```

## Cannot get params from Page object in customized SQL(2.x Only)

> MP v_2.x Only: Page extends RowBounds, which is built-in object for Mybatis, cannot get in XML
> You can use a Map/POJO as param, or use @Param("pages") int pages

## Auto Underscore To Camel Case for return type Map

Only for:`resultType="java.util.Map"`

- Spring Boot

```java
@Bean
public ConfigurationCustomizer configurationCustomizer() {
    return i -> i.setObjectWrapperFactory(new MybatisMapWrapperFactory());
}
```

## Use `limit` in wrapper

```java
// only get one record, for Mysql only
wrapper.last("limit 1");
```

## Why only Service has insertBatch()

- SQL has limitation of length, batch sql may exceed; may cause leakage of jdbc connection
- SQL Batch Grammar different for Databases, cannot make it as a generic solution
- Current solution for batch: Loop the records for insert, and commit in batch(maybe have a little performance problem)


## Autofill not work for Logic Deletion

- Autofill is to put the values to `entity` when do insert/update, but logic deletion method is deleteById(), which the param is the Primary Key, so autofill won't work
- If you want to enable autofill for logic Deletion:
  - Way 1: use update():`UpdateWrapper.set("logicDeleteColumn","deleteValue")`
  - `Way 2`: refer to [Sql Injector](/guide/sql-injector.md), 
  use `com.baomidou.mybatisplus.extension.injector.methods.LogicDeleteByIdWithFill` for SQL injection.  
  NOTE: Only work for the fields with @TableField(fill=FieldFill.INSERT/UPDATE/INSERT_UPDATE)

- Java Config Bean for `Way 2`:
  
  1. Customize SqlInjector
    ``` java
    @Bean
    public LogicSqlInjector logicSqlInjector(){
        return new LogicSqlInjector() {
            /**
             * Inject your own basic methods
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
  2. Customize your basic mapper
    ```java
    public interface MyBaseMapper<T> extends BaseMapper<T> {
    
        /**
         * Generic methods
         */
        int deleteByIdWithFill(T entity);
    }
    ```

## Deal the KEY WORD of database in 3.x

For 2.x, KEY WORD of database will be recognized and dealt automaticly. But this feature is removed from 3.x

  - Mp supports multiple databases, and those databases have different solution for KEY WORD, it's hard for maintainance
  - We don't recommend to use KEY WORD for column name
  - So let user to deal the KEY WORD, for example:

```java
@TableField(value = "`status`")
private String status;
```

## MybatisPlusException: Your property named "xxx" cannot find the corresponding database column name!

  - Effected version: v_3.1.1+
  - Appearance: Code works fine for Unit Test, but failed for debuging on appication server
  - CAUSE: dev-tools, MP use Class Object(User.class) as the Cache Key instead of ClassName for table info cache since v_3.1.1, dev-tools will use different ClassLoader to load the classes, which will cause such problem
  - Solution: remove dev-tools from pom file
