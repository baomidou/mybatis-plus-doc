---
title: Dynamic Table Name Plugin
sidebar:
  order: 5
---

In database application development, we sometimes need to query different tables based on different conditions. MyBatis-Plus provides a dynamic table name plugin, `DynamicTableNameInnerInterceptor`, which allows us to dynamically change the table name in SQL statements at runtime. This is very useful for handling table sharding logic.

## Plugin Introduction

`DynamicTableNameInnerInterceptor` is an interceptor provided by MyBatis-Plus. It can dynamically replace table names according to configured rules before executing SQL statements. This feature is very useful for handling table sharding logic, such as storing data in different tables based on dates.

## Quick Start

### Configure the Interceptor

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
            // Method to get parameters
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

In this example, we define a table name handler that decides whether to set the table name suffix to `_2018` or `_2019` based on a random number. **Note:** You should replace the example logic with your actual parameter retrieval and sharding strategy. The `RequestDataHelper` is assumed and needs to be implemented or replaced.

### Using Dynamic Table Names

In your Mapper interface, you don't need to specifically designate dynamic table names, as the table name will be handled dynamically by the interceptor at runtime.

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    // ... 
}
```

When executing a query, MyBatis-Plus will automatically replace the placeholder table name with the actual table name determined by the handler.

## Considerations

- To prevent accidental replacement, it's recommended to make the dynamic table names more specific, for example, by using a prefix like `mp_dt_`.
- Ensure your table name rules do not lead to security issues such as SQL injection.
- When configuring dynamic table names, consider database compatibility and ensure the replaced table names comply with the database's naming conventions.

## Example Project

To better understand how to use `DynamicTableNameInnerInterceptor`, you can refer to the official sample project:

- 👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

This sample project demonstrates how to dynamically query different user tables based on the year.

`DynamicTableNameInnerInterceptor` is a powerful tool that can help you easily handle scenarios involving dynamic table names. With proper configuration, you can let MyBatis-Plus automatically handle complex table sharding logic for you, thereby improving development efficiency. Remember to follow best practices when using it to ensure system security and stability.
