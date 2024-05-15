---
title: 动态表名插件
sidebar:
  order: 5
---

在数据库应用程序开发中，我们有时需要根据不同的条件查询不同的表。MyBatis-Plus 提供了一个动态表名插件 `DynamicTableNameInnerInterceptor`，它允许我们在运行时动态地改变 SQL 语句中的表名，这对于处理分表逻辑非常有用。

## 插件简介

`DynamicTableNameInnerInterceptor` 是 MyBatis-Plus 提供的一个拦截器，它可以在执行 SQL 语句之前，根据配置的规则动态地替换表名。这个功能在处理分表逻辑时非常有用，比如根据日期将数据存储在不同的表中。

## 快速开始

### 配置拦截器

在你的 Spring Boot 配置类中，添加 `DynamicTableNameInnerInterceptor` 到拦截器链中，并配置表名处理器：

```java
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.DynamicTableNameInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        DynamicTableNameInnerInterceptor dynamicTableNameInnerInterceptor = new DynamicTableNameInnerInterceptor();
        dynamicTableNameInnerInterceptor.setTableNameHandler((sql, tableName) -> {
            // 获取参数方法
            Map<String, Object> paramMap = RequestDataHelper.getRequestData();
            paramMap.forEach((k, v) -> System.err.println(k + "----" + v));

            String year = "_2018";
            int random = new Random().nextInt(10);
            if (random % 2 == 1) {
                year = "_2019";
            }
            return tableName + year;
        });
        interceptor.addInnerInterceptor(dynamicTableNameInnerInterceptor);
        return interceptor;
    }
}
```

在这个例子中，我们定义了一个表名处理器，它会根据随机数决定将表名后缀设置为 `_2018` 或 `_2019`。

### 使用动态表名

在你的 Mapper 接口中，不需要特别指定动态表名，因为表名将在运行时由拦截器动态处理。

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    // ...
}
```

当执行查询时，MyBatis-Plus 会自动将表名替换为实际的表名。

## 注意事项

- 为了防止误替换，建议将动态表名定义得复杂一些，例如使用前缀 `mp_dt_`。
- 确保你的表名规则不会导致 SQL 注入等安全问题。
- 在配置动态表名时，要考虑到数据库的兼容性，确保替换后的表名符合数据库的命名规则。

## 示例项目

为了更好地理解如何使用 `DynamicTableNameInnerInterceptor`，你可以参考官方提供的示例项目：

- 👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

这个示例项目展示了如何根据年份动态地查询不同的用户表。

`DynamicTableNameInnerInterceptor` 是一个强大的工具，它可以帮助你轻松地处理动态表名的场景。通过合理配置，你可以让 MyBatis-Plus 自动为你处理复杂的分表逻辑，从而提高开发效率。记得在使用时遵循最佳实践，确保系统的安全性和稳定性。
