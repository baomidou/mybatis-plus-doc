---
title: Illegal SQL Interceptor Plugin
sidebar:
  order: 7
---

## Introduction

`IllegalSQLInnerInterceptor` is a security control plugin within the MyBatis-Plus framework, designed to intercept and inspect illegal SQL statements. This plugin helps developers identify and resolve potential security issues before SQL execution, such as full table updates, delete operations, and index checks.

- Plugin Source 👉 [IllegalSQLInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptor.java)
- Test Cases 👉 [IllegalSQLInnerInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/IllegalSQLInnerInterceptorTest.java)

## Features

- **Intercepts Specific SQL Types**: The plugin can identify and intercept specific types of SQL statements, such as high-risk operations like full table updates and deletes.
- **Enforces Index Usage**: Ensures queries use indexes to improve performance and avoid full table scans.
- **Full Table Update/Delete Checks**: Prevents unauthorized full table update or delete operations to reduce the risk of data loss.
- **`not`, `or`, and Subquery Checks**: Performs additional checks on SQL statements containing `not`, `or` keywords, or subqueries to prevent logical errors or performance issues.

## Usage

**Java Configuration Example**

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // Add the illegal SQL interceptor
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

- **Consult the Official Documentation**: Before using the plugin, carefully read the MyBatis-Plus official documentation to understand detailed usage instructions and configuration methods.
- **Custom Adaptation**: This plugin provides a solution for intercepting illegal SQL, but it may not be suitable for all enterprise environments. Developers should modify and optimize the plugin according to their specific project requirements.

:::

The `IllegalSQLInnerInterceptor` plugin is a powerful security tool provided by MyBatis-Plus that helps developers identify and resolve potential SQL security issues in advance. By properly configuring and using this plugin, you can significantly improve the security and efficiency of your database operations.
