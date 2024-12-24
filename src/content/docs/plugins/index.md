---
title: 插件主体
sidebar:
  order: 1
---

MyBatis-Plus 提供了一系列强大的插件来增强 MyBatis 的功能，这些插件通过 `MybatisPlusInterceptor` 来实现对 MyBatis 执行过程的拦截和增强。以下是这些插件的详细介绍和使用方法。

:::note
版本要求：3.4.0 版本以上
:::

## MybatisPlusInterceptor 概览

`MybatisPlusInterceptor` 是 MyBatis-Plus 的核心插件，它代理了 MyBatis 的 `Executor#query`、`Executor#update` 和 `StatementHandler#prepare` 方法，允许在这些方法执行前后插入自定义逻辑。

### 属性

`MybatisPlusInterceptor` 有一个关键属性 `interceptors`，它是一个 `List<InnerInterceptor>` 类型的集合，用于存储所有要应用的内部拦截器。

### InnerInterceptor 接口

所有 MyBatis-Plus 提供的插件都实现了 `InnerInterceptor` 接口，这个接口定义了插件的基本行为。目前，MyBatis-Plus 提供了以下插件：

- **自动分页**: `PaginationInnerInterceptor`
- **多租户**: `TenantLineInnerInterceptor`
- **动态表名**: `DynamicTableNameInnerInterceptor`
- **乐观锁**: `OptimisticLockerInnerInterceptor`
- **SQL 性能规范**: `IllegalSQLInnerInterceptor`
- **防止全表更新与删除**: `BlockAttackInnerInterceptor`

:::note[注意]

使用多个插件时，需要注意它们的顺序。建议的顺序是：

1. 多租户、动态表名
2. 分页、乐观锁
3. SQL 性能规范、防止全表更新与删除

总结：对 SQL 进行单次改造的插件应优先放入，不对 SQL 进行改造的插件最后放入。

:::

## 使用示例

### Spring 配置

在 Spring 配置中，你需要创建 `MybatisPlusInterceptor` 的实例，并将它添加到 MyBatis 的插件列表中。以下是一个分页插件的配置示例：

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <!-- 其他属性 略 -->
    <property name="configuration" ref="configuration"/>
    <property name="plugins">
        <array>
            <ref bean="mybatisPlusInterceptor"/>
        </array>
    </property>
</bean>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="paginationInnerInterceptor"/>
        </list>
    </property>
</bean>

<bean id="paginationInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor">
    <!-- 对于单一数据库类型来说,都建议配置该值,避免每次分页都去抓取数据库类型 -->
    <constructor-arg name="dbType" value="H2"/>
</bean>
```

### Spring Boot 配置

在 Spring Boot 项目中，你可以通过 Java 配置来添加插件：

```java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }
}
```

### mybatis-config.xml 配置

如果你使用的是 XML 配置，可以在 `mybatis-config.xml` 中添加插件：

```xml
<plugins>
  <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="@page" value="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
    <property name="page:dbType" value="h2"/>
  </plugin>
</plugins>
```

## 拦截忽略注解 @InterceptorIgnore

`@InterceptorIgnore` 注解可以用来忽略某些插件的拦截。该注解有多个属性，分别对应不同的插件。如果某个属性没有值，则默认为 `false`，表示不忽略该插件；如果设置为 `true`，则忽略对应的插件。

## 手动设置拦截器忽略执行策略

从 `3.5.3` 版本开始，你可以手动设置拦截器的忽略执行策略，这比注解更加灵活。但是，你需要手动关闭调用方法。

```java
// 请尽量使用 try finally 的方式来保证能正确得到关闭
try { 
    // 设置忽略租户插件
    InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());
    // 执行逻辑 ..
} finally {
    // 关闭忽略策略
	InterceptorIgnoreHelper.clearIgnoreStrategy();
}
```

## 本地缓存 SQL 解析

MyBatis-Plus 支持本地缓存 SQL 解析，这对于分页、租户等插件特别有效。你可以通过静态代码块来设置缓存处理类：

```java
static {
    // 默认支持序列化 FstSerialCaffeineJsqlParseCache，JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

以上是 MyBatis-Plus 插件主体的详细介绍和使用方法。通过这些插件，你可以大大增强 MyBatis 的功能，提高开发效率。
