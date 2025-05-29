---
title: Data Change Recorder Plugin
sidebar:
  order: 6
---

In database operations, recording data changes and controlling operational security are crucial. MyBatis-Plus provides a data change recorder plugin, `DataChangeRecorderInnerInterceptor`, which can automatically log operations and supports security threshold control for batch updates or deletes.

## Plugin Introduction

`DataChangeRecorderInnerInterceptor` is an interceptor provided by MyBatis-Plus. It can automatically record data changes when performing database operations, and it can also control operations based on configured safety thresholds, such as limiting the number of records in a single batch update or delete operation to no more than 1000.

To better understand how to use `DataChangeRecorderInnerInterceptor`, you can refer to the official test cases:

- 👉 [testOptLocker4WrapperIsNull](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserTest.java)

This test case demonstrates how to use the plugin for data change recording and security control.

## How to Use

### Configure the Interceptor

In your Spring Boot configuration class, add `DataChangeRecorderInnerInterceptor` to the interceptor chain and configure the security threshold as needed:

```java
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.DataChangeRecorderInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        DataChangeRecorderInnerInterceptor dataChangeRecorderInnerInterceptor = new DataChangeRecorderInnerInterceptor();
        // Configure the security threshold, limiting batch update or delete records to no more than 1000
        dataChangeRecorderInnerInterceptor.setBatchUpdateLimit(1000).openBatchUpdateLimitation();
        interceptor.addInnerInterceptor(dataChangeRecorderInnerInterceptor);
        return interceptor;
    }
}
```

In this example, we set the security threshold for batch updates or deletes to 1000 records.

### Using the Plugin

After configuring the plugin, execute operations via MyBatis-Plus. The plugin will automatically record data changes and enforce security controls:

When performing batch update or delete operations, if the number of records exceeds the configured security threshold, the plugin will throw an exception.

## Precautions

- Ensure an appropriate security threshold is set when configuring the interceptor to prevent unsafe batch operations.
- The plugin automatically records data changes, but you need to implement the logging logic yourself.
- When configuring and using the plugin, consider database performance and the actual operational requirements.

`DataChangeRecorderInnerInterceptor` is a powerful tool that helps you automatically record data changes and control operational security. Through proper configuration, you can ensure the security of database operations and data integrity. Remember to follow best practices when using it to maintain system security and stability.
