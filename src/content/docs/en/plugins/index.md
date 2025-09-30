---
title: Plugin Core
sidebar:
  order: 1
---

MyBatis-Plus provides a series of powerful plugins to enhance MyBatis functionality. These plugins utilize `MybatisPlusInterceptor` to intercept and augment the MyBatis execution process. Below is a detailed introduction and usage guide for these plugins.

:::note
Version Requirement: 3.4.0 and above
:::

## MybatisPlusInterceptor Overview

`MybatisPlusInterceptor` is the core plugin of MyBatis-Plus. It proxies MyBatis's `Executor#query`, `Executor#update`, and `StatementHandler#prepare` methods, allowing custom logic to be inserted before and after the execution of these methods.

### Properties

`MybatisPlusInterceptor` has one key property, `interceptors`, which is a collection of type `List<InnerInterceptor>` used to store all the internal interceptors to be applied.

### InnerInterceptor Interface

All plugins provided by MyBatis-Plus implement the `InnerInterceptor` interface, which defines the basic behavior of a plugin. Currently, MyBatis-Plus offers the following plugins:

- **Automatic Pagination**: `PaginationInnerInterceptor`
- **Multi-tenancy**: `TenantLineInnerInterceptor`
- **Dynamic Table Name**: `DynamicTableNameInnerInterceptor`
- **Optimistic Lock**: `OptimisticLockerInnerInterceptor`
- **SQL Performance Specification**: `IllegalSQLInnerInterceptor`
- **Block Full Table Update & Delete**: `BlockAttackInnerInterceptor`

:::note[Note]

When using multiple plugins, pay attention to their order. The recommended order is:

1. Multi-tenancy, Dynamic Table Name
2. Pagination, Optimistic Lock
3. SQL Performance Specification, Block Full Table Update & Delete

In summary: Plugins that perform a single transformation on the SQL should be added first, while plugins that do not transform the SQL should be added last.

:::

## Usage Examples

### Spring Configuration

In Spring configuration, you need to create an instance of `MybatisPlusInterceptor` and add it to MyBatis's plugin list. Here is a configuration example for the pagination plugin:

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
    <!-- For a single database type, it is recommended to configure this value to avoid fetching the database type for every pagination query -->
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

If you are using XML configuration, you can add the plugin in `mybatis-config.xml`:

```xml
<plugins>
  <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="@page" value="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
    <property name="page:dbType" value="h2"/>
  </plugin>
</plugins>
```

## Interceptor Ignore Annotation @InterceptorIgnore

The `@InterceptorIgnore` annotation can be used to ignore interception by specific plugins. This annotation has multiple attributes corresponding to different plugins. If an attribute has no value, it defaults to `false`, meaning the corresponding plugin is not ignored; if set to `true`, the corresponding plugin is ignored.

## Manually Setting Interceptor Ignore Execution Strategy

Starting from version `3.5.3`, you can manually set the interceptor ignore execution strategy, which is more flexible than using annotations. However, you need to manually close the invocation method.

```java
// Please try to use a try-finally block to ensure proper closure
try { 
    // Set to ignore the tenant plugin
    InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());
    // Execute logic ..
} finally {
    // Close the ignore strategy
	InterceptorIgnoreHelper.clearIgnoreStrategy();
}
```

## Local Cache SQL Parsing

MyBatis-Plus supports local caching of SQL parsing, which is particularly effective for plugins like pagination and tenant. You can set the cache handler via a static code block:

```java
static {
    // Default supports serialization FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```
## Setting SQL Parser Thread Pool

Starting from version 3.5.6, JSQLParser (4.9) supports thread pool reuse for parsing, which can reduce performance overhead caused by repeatedly creating thread pools.

The default creates a fixed thread pool core count: (Runtime.getRuntime().availableProcessors() + 1) / 2

If the default thread pool method does not suit your actual deployment scenario, use the following method to specify your custom thread pool. Note that you are responsible for properly closing any thread pool you create yourself.
```java
static {
	// 3.5.6 ~ 3.5.11 Use static variable assignment
	JsqlParserGlobal.executorService = xxxxx;
	// Starting from 3.5.11, use the setExecutorService method for setting
	JsqlParserGlobal.setExecutorService(....);
}
```

## Setting JsqlParser Processing Methods
If you need to process the SQL statements handled by JsqlParser, specify it via the following method. The processed SQL string is then passed to the parser for analysis.
```java
/*
For 3.5.6~3.5.11, use JsqlParserGlobal.executorService
For 3.5.11+: Use JsqlParserGlobal.getExecutorService()
For versions below 3.5.6, you can only use:
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

The above is a detailed introduction and usage guide for the core plugins of MyBatis-Plus. Using these plugins, you can significantly enhance MyBatis functionality and improve development efficiency.
