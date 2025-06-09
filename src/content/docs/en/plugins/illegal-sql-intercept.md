---
title: Illegal SQL Interceptor Plugin
sidebar:
  order: 7
---

## Introduction

`IllegalSQLInnerInterceptor` is a security control plugin in the MyBatis-Plus framework, used to intercept and check illegal SQL statements. This plugin is designed to help developers discover and resolve potential security issues before SQL execution, such as full table updates, delete operations, and index checks.

- Plugin source code 👉 [IllegalSQLInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptor.java)
- Test cases 👉 [IllegalSQLInnerInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/IllegalSQLInnerInterceptorTest.java)

## Features

- **Intercept SQL type scenarios**: The plugin can identify and intercept specific types of SQL statements, such as high-risk operations like full table updates and deletes.
- **Force index usage**: Ensures that indexes are used when executing queries to improve performance and avoid full table scans.
- **Full table update operation check**: Prevents unauthorized full table updates or delete operations, reducing the risk of data loss.
- **`not`, `or`, and subquery checks**: Performs additional checks on SQL statements containing `not`, `or` keywords or subqueries to prevent logical errors or performance issues.

## Usage

**Java Configuration Example**

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // Add illegal SQL interceptor
        interceptor.addInnerInterceptor(new IllegalSQLInnerInterceptor());
        return interceptor;
    }
}
```

**XML Configuration Example**

```xml
<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <bean class="com.baomidou.mybatisplus.extension.plugins.inner.IllegalSQLInnerInterceptor"/>
        </list>
    </property>
</bean>
```

:::note

- **Read the official documentation**: Before using the plugin, please carefully read the official MyBatis-Plus documentation to understand the detailed usage instructions and configuration methods.
- **Custom adaptation**: This plugin provides a solution for illegal SQL interception, but it may not be suitable for all enterprise environments. Developers should make appropriate modifications and optimizations to the plugin based on their project requirements.

:::

The `IllegalSQLInnerInterceptor` plugin is a powerful security tool provided by MyBatis-Plus that helps developers discover and resolve potential SQL security issues in advance. By properly configuring and using this plugin, the security and efficiency of database operations can be greatly improved.
