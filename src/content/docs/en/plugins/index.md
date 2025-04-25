---
title: Plugin
sidebar:
  order: 1
---

MyBatis-Plus provides a series of powerful plugins to enhance MyBatis functionality. These plugins implement interception and enhancement of MyBatis execution process through `MybatisPlusInterceptor`. Below are detailed introductions and usage methods of these plugins.

:::note
Version requirement: 3.4.0 and above
:::

## MybatisPlusInterceptor Overview

`MybatisPlusInterceptor` is the core plugin of MyBatis-Plus. It proxies MyBatis's `Executor#query`, `Executor#update`, and `StatementHandler#prepare` methods, allowing custom logic to be inserted before and after these methods execute.

### Properties

`MybatisPlusInterceptor` has a key property `interceptors`, which is a collection of `List<InnerInterceptor>` type used to store all internal interceptors to be applied.

### InnerInterceptor Interface

All plugins provided by MyBatis-Plus implement the `InnerInterceptor` interface, which defines the basic behavior of plugins. Currently, MyBatis-Plus provides the following plugins:

- **Auto Pagination**: `PaginationInnerInterceptor`
- **Multi-Tenant**: `TenantLineInnerInterceptor`
- **Dynamic Table Name**: `DynamicTableNameInnerInterceptor`
- **Optimistic Locking**: `OptimisticLockerInnerInterceptor`
- **SQL Performance Standards**: `IllegalSQLInnerInterceptor`
- **Protection Against Full Table Update and Delete**: `BlockAttackInnerInterceptor`

:::note[Note]

When using multiple plugins, you need to pay attention to their order. The recommended order is:

1. Multi-tenant, Dynamic table name
2. Pagination, Optimistic locking
3. SQL performance standards, Protection against full table update and delete

Summary: Plugins that modify SQL only once should be added first, while plugins that do not modify SQL should be added last.

:::

## Usage Examples

### Spring Configuration

In Spring configuration, you need to create an instance of `MybatisPlusInterceptor` and add it to MyBatis's plugin list. Here is a configuration example of a pagination plugin:

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

In Spring Boot projects, you can add plugins through Java configuration:

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

## Interception Ignore Annotation @InterceptorIgnore

The `@InterceptorIgnore` annotation can be used to ignore the interception of certain plugins. This annotation has multiple properties corresponding to different plugins. If a property has no value, it defaults to `false`, meaning the plugin is not ignored; if set to `true`, the corresponding plugin is ignored.

## Manually Setting Interceptor Ignore Execution Strategy

Starting from version `3.5.3`, you can manually set the interceptor ignore execution strategy, which is more flexible than annotations. However, you need to manually close the call method.

```java
// Please try to use try-finally to ensure proper closure
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

MyBatis-Plus supports local cache SQL parsing, which is particularly effective for plugins like pagination and multi-tenant. You can set up the cache processing class through a static code block:

```java
static {
    // Default support for serialization FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```
## Setting SQL Parsing Thread Pool

Since 3.5.6, support for thread pool parsing reuse has been added for JSQLParser(4.9), which can reduce performance overhead from repeatedly creating thread pools.

Default fixed thread pool core size: (Runtime.getRuntime().availableProcessors() + 1) / 2

If the default thread pool method does not fit your actual deployment situation, please use the method below to specify your custom thread pool. Note that self-created thread pools need to be closed manually.
```java
static {
	// 3.5.6 ~ 3.5.11 use static variable assignment
	JsqlParserGlobal.executorService = xxxxx;
	// Starting from 3.5.11, use the setExecutorService method
	JsqlParserGlobal.setExecutorService(....);
}
```

## Setting JsqlParser Parsing Processing Method
If you need to process the SQL statements for JsqlParser, please specify it through the method below. Process the SQL string and then pass it to the parser for parsing.
```java
/*
3.5.6~3.5.11 please use JsqlParserGlobal.executorService
3.5.11+: JsqlParserGlobal.getExecutorService()
Only versions below 3.5.6 can use 
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

Above is a detailed introduction and usage method of MyBatis-Plus plugin core. Through these plugins, you can greatly enhance the functionality of MyBatis and improve development efficiency.
