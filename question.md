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

## 异常`Invalid bound statement (not found)` 解决方法

> 不要怀疑，正视自己，这个异常肯定是你插入的姿势不对……

- 检查命名空间是否正常？ 检查包扫描路径是否正常？如果扫描不到，MP无法进行预注入

- 检查是否指定了主键？如未指定，则会导致 `selectById` 相关 ID 无法操作，请用注解 `@TableId` 注解表 ID 主键

- 当然 `@TableId` 注解可以没有！但是你的主键必须叫  id  忽略大小写

- 注意！maven 多模块 jar 依赖 xml 扫描需为 ` classpath*: ` 加载多个 jar 下的 xml 

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
objectMapper.configure(JsonGenerator.Feature.WRITE_NUMBERS_AS_STRINGS, true);
```

## 字段 update 空字符串 OR NULL 修改验证策略

> FieldStrategy 三种策略 IGNORED【忽略】，NOT_NULL【非 NULL，默认策略】，NOT_EMPTY【非空】

- 全局的验证策略，注入配置 GlobalConfiguration 属性 fieldStrategy

- 根据具体情况，选择验证注解，如验证非空：

  ```java
  @TableField(validate=FieldStrategy.NOT_EMPTY)
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

## 异常`Injection of autowired` 解决方法

> 原因！低版本不支持泛型注入，请升级 spring 4+

## 异常`java.lang.NoSuchMethodError: org.apache.ibatis.session.Configuration.getDefaultScriptingLanguageInstance()
Lorg/apache/ibatis/scripting/LanguageDriver` 解决方法

> 版本引入问题：3.4.1版本里没有，3.4.2里面才有！


## 出现2个limit语句
> 原因：配了2个分页拦截器! 检查配置文件或者代码，只留一个！

