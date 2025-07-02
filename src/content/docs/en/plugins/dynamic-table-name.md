---
title: Dynamic Table Name Plugin
sidebar:
  order: 5
---

In database application development, we sometimes need to query different tables based on different conditions. MyBatis-Plus provides a dynamic table name plugin called `DynamicTableNameInnerInterceptor`, which allows us to dynamically change table names in SQL statements at runtime. This is particularly useful for handling table sharding logic.

## Plugin Introduction

`DynamicTableNameInnerInterceptor` is an interceptor provided by MyBatis-Plus. It can dynamically replace table names before executing SQL statements based on configured rules. This feature is highly useful for handling table sharding logic, such as storing data in different tables based on dates.

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
            // Parameter retrieval method
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

In this example, we define a table name handler that appends either `_2018` or `_2019` to the table name based on a random number.

### Using Dynamic Table Names

In your Mapper interface, no special configuration is required for dynamic table names, as the interceptor will handle the table name dynamically at runtime.

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    // ...
}
```

When executing queries, MyBatis-Plus will automatically replace the table name with the actual table name.

## Notes

- To prevent accidental replacements, it is recommended to define dynamic table names with complexity, such as using a prefix like `mp_dt_`.
- Ensure your table naming rules do not introduce security risks like SQL injection.
- When configuring dynamic table names, consider database compatibility to ensure the replaced table names comply with the database's naming conventions.

## Example Project

To better understand how to use `DynamicTableNameInnerInterceptor`, you can refer to the official example project:

- 👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

This example project demonstrates how to dynamically query different user tables based on the year.

`DynamicTableNameInnerInterceptor` is a powerful tool that can help you easily handle dynamic table name scenarios. With proper configuration, MyBatis-Plus can automatically manage complex table sharding logic, improving development efficiency. Remember to follow best practices to ensure system security and stability.
