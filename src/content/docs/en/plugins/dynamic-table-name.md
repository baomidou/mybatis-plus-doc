---
title: Dynamic Table Name Plugin
sidebar:
  order: 5
---

In database application development, we sometimes need to query different tables based on different conditions. MyBatis-Plus provides a dynamic table name plugin called `DynamicTableNameInnerInterceptor`, which allows us to dynamically change table names in SQL statements at runtime. This is particularly useful for handling table sharding logic.

## Plugin Introduction

`DynamicTableNameInnerInterceptor` is an interceptor provided by MyBatis-Plus that can dynamically replace table names according to configured rules before executing SQL statements. This feature is very useful when dealing with table sharding logic, such as storing data in different tables based on dates.

## Quick Start

### Configuring the Interceptor

In your Spring Boot configuration class, add `DynamicTableNameInnerInterceptor` to the interceptor chain and configure the table name handler:

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

In this example, we define a table name handler that decides whether to set the table name suffix to `_2018` or `_2019` based on a random number.

### Using Dynamic Table Names

In your Mapper interface, you don't need to specify dynamic table names explicitly, as table names will be dynamically processed by the interceptor at runtime.

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    // ...
}
```

When executing queries, MyBatis-Plus will automatically replace table names with the actual table names.

## Important Notes

- To prevent accidental replacements, it's recommended to define dynamic table names with more complexity, such as using a prefix like `mp_dt_`.
- Ensure your table name rules don't lead to security issues like SQL injection.
- When configuring dynamic table names, consider database compatibility to ensure the replaced table names comply with your database's naming rules.

## Example Project

To better understand how to use `DynamicTableNameInnerInterceptor`, you can refer to the official example project:

- 👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

This example project demonstrates how to dynamically query different user tables based on the year.

`DynamicTableNameInnerInterceptor` is a powerful tool that helps you easily handle dynamic table name scenarios. With proper configuration, you can let MyBatis-Plus automatically handle complex table sharding logic, thereby improving development efficiency. Remember to follow best practices when using it to ensure system security and stability.
