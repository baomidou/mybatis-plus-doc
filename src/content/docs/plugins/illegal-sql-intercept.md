---
title: 非法SQL拦截插件
sidebar:
  order: 7
---

## 简介

`IllegalSQLInnerInterceptor` 是 MyBatis-Plus 框架中的一个安全控制插件，用于拦截和检查非法SQL语句。该插件旨在帮助开发者在SQL执行前发现并解决潜在的安全问题，如全表更新、删除操作，以及对索引的检查等。

- 插件源码 👉 [IllegalSQLInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptor.java)
- 测试用例 👉 [IllegalSQLInnerInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/test/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptorTest.java)

## 功能特性

- **拦截SQL类型场景**：插件能够识别并拦截特定类型的SQL语句，如全表更新、删除等高风险操作。
- **强制使用索引**：确保在执行查询时使用索引，以提高性能并避免全表扫描。
- **全表更新操作检查**：防止未经授权的全表更新或删除操作，减少数据丢失风险。
- **`not`、`or`、子查询检查**：对包含`not`、`or`关键字或子查询的SQL语句进行额外检查，以防止逻辑错误或性能问题。

## 使用方法

**Java 配置示例**

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加非法SQL拦截器
        interceptor.addInnerInterceptor(new IllegalSQLInnerInterceptor());
        return interceptor;
    }
}
```

**XML 配置示例**

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

- **查阅官方文档**：在使用插件前，请仔细阅读 MyBatis-Plus 的官方文档，了解插件的详细使用说明和配置方法。
- **自定义适配**：该插件提供了一种非法SQL拦截的解决方案，但可能不适用于所有企业环境。开发者应根据自身项目需求，对插件进行适当的修改和优化。

:::

`IllegalSQLInnerInterceptor` 插件是 MyBatis-Plus 提供的一个强大的安全工具，它能够帮助开发者提前发现并解决潜在的SQL安全问题。通过合理配置和使用该插件，可以大大提高数据库操作的安全性和效率。
