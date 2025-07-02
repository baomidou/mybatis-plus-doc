---
title: Plugin Core
sidebar:
  order: 1
---

MyBatis-Plus provides a series of powerful plugins to enhance MyBatis functionality. These plugins implement interception and enhancement of MyBatis execution processes through `MybatisPlusInterceptor`. Below is a detailed introduction and usage guide for these plugins.

:::note
Version Requirement: 3.4.0 or higher
:::

## Overview of MybatisPlusInterceptor

`MybatisPlusInterceptor` is the core plugin of MyBatis-Plus. It proxies MyBatis's `Executor#query`, `Executor#update`, and `StatementHandler#prepare` methods, allowing custom logic to be inserted before or after these methods are executed.

### Properties

`MybatisPlusInterceptor` has a key property, `interceptors`, which is a collection of type `List<InnerInterceptor>` used to store all internal interceptors to be applied.

### InnerInterceptor Interface

All plugins provided by MyBatis-Plus implement the `InnerInterceptor` interface, which defines the basic behavior of plugins. Currently, MyBatis-Plus offers the following plugins:

- **Auto Pagination**: `PaginationInnerInterceptor`
- **Multi-tenancy**: `TenantLineInnerInterceptor`
- **Dynamic Table Name**: `DynamicTableNameInnerInterceptor`
- **Optimistic Lock**: `OptimisticLockerInnerInterceptor`
- **SQL Performance Specification**: `IllegalSQLInnerInterceptor`
- **Prevent Full Table Update and Delete**: `BlockAttackInnerInterceptor`

:::note[Note]

When using multiple plugins, pay attention to their order. The recommended order is:

1. Multi-tenancy, Dynamic Table Name
2. Pagination, Optimistic Lock
3. SQL Performance Specification, Prevent Full Table Update and Delete

Summary: Plugins that perform single SQL transformations should be added first, while those that do not modify SQL should be added last.

:::

## Usage Examples

### Spring Configuration

In Spring configuration, you need to create an instance of `MybatisPlusInterceptor` and add it to MyBatis's plugin list. Below is an example configuration for the pagination plugin:

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <!-- Other properties omitted -->
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
    <!-- For a single database type, it is recommended to configure this value to avoid fetching the database type for each pagination -->
    <constructor-arg name="dbType" value="H2"/>
</bean>
```

### Spring Boot Configuration

In a Spring Boot project, you can add plugins via Java configuration:

```java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * Add pagination plugin
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }
}
```

### mybatis-config.xml Configuration

If you are using XML configuration, you can add plugins in `mybatis-config.xml`:

```xml
<plugins>
  <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="@page" value="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
    <property name="page:dbType" value="h2"/>
  </plugin>
</plugins>
```

## Interceptor Ignore Annotation @InterceptorIgnore

The `@InterceptorIgnore` annotation can be used to ignore interception by certain plugins. This annotation has multiple attributes, each corresponding to a different plugin. If an attribute has no value, it defaults to `false`, meaning the plugin is not ignored; if set to `true`, the corresponding plugin is ignored.

## Manually Setting Interceptor Ignore Execution Strategy

Starting from version `3.5.3`, you can manually set the ignore execution strategy for interceptors, which is more flexible than annotations. However, you need to manually close the calling method.

```java
// Use try-finally to ensure proper closure
try { 
    // Set to ignore tenant plugin
    InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());
    // Execute logic ..
} finally {
    // Close ignore strategy
	InterceptorIgnoreHelper.clearIgnoreStrategy();
}
```

## Local Cache SQL Parsing

MyBatis-Plus supports local cache SQL parsing, which is particularly effective for plugins like pagination and tenant. You can set the cache handler via a static code block:

```java
static {
    // Default supports serialization FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## Setting SQL Parsing Thread Pool

Starting from version 3.5.6, JSQLParser (4.9) supports thread pool parsing reuse, which reduces performance overhead caused by repeated thread pool creation.

Default fixed thread pool core count: (Runtime.getRuntime().availableProcessors() + 1) / 2

If the default thread pool does not meet your deployment requirements, use the following method to specify your custom thread pool. Note that you need to manually close any thread pools you create.
```java
static {
	// 3.5.6 ~ 3.5.11: Use static variable assignment
	JsqlParserGlobal.executorService = xxxxx;
	// 3.5.11+: Use setExecutorService method
	JsqlParserGlobal.setExecutorService(....);
}
```

## Setting JsqlParser Parsing Methods
If you need to process JsqlParser's SQL statements, specify it via the following method. The processed SQL string will then be parsed by the parser.
```java
/*
3.5.6~3.5.11: Use JsqlParserGlobal.executorService
3.5.11+: JsqlParserGlobal.getExecutorService()
Versions below 3.5.6 can only use 
CCJSqlParserUtil.parseStatements(sql);
CCJSqlParserUtil.parse(sql)
**/ 
static {
        JsqlParserGlobal.setParserMultiFunc((sql)-> {
            System.out.println("Parsing SQL:" + sql);
            return CCJSqlParserUtil.parseStatements(sql, JsqlParserGlobal.getExecutorService(), null);
        });
        JsqlParserGlobal.setParserSingleFunc((sql)-> {
            System.out.println("Parsing SQL:" + sql);
            return CCJSqlParserUtil.parse(sql, JsqlParserGlobal.getExecutorService(), null);
        });
}
```

The above is a detailed introduction and usage guide for the core plugins of MyBatis-Plus. With these plugins, you can significantly enhance MyBatis functionality and improve development efficiency.
