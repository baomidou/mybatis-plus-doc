---
title: Data Change Recording Plugin
sidebar:
  order: 6
---

In database operations, recording data changes and ensuring operational security are crucial. MyBatis-Plus provides a data change recording plugin called `DataChangeRecorderInnerInterceptor`, which automatically logs operation records and supports safety threshold controls for batch updates or deletions.

## Plugin Overview

`DataChangeRecorderInnerInterceptor` is an interceptor provided by MyBatis-Plus. It automatically records data changes during database operations and can enforce safety thresholds, such as limiting batch updates or deletions to no more than 1,000 records at a time.

To better understand how to use `DataChangeRecorderInnerInterceptor`, you can refer to the official test case:

- 👉 [testOptLocker4WrapperIsNull](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserTest.java)

This test case demonstrates how to use the plugin for data change recording and safety control.

## How to Use

### Configuring the Interceptor

In your Spring Boot configuration class, add `DataChangeRecorderInnerInterceptor` to the interceptor chain and configure the safety threshold as needed:

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
        // Configure the safety threshold to limit batch updates or deletions to no more than 1,000 records
        dataChangeRecorderInnerInterceptor.setBatchUpdateLimit(1000).openBatchUpdateLimitation();
        interceptor.addInnerInterceptor(dataChangeRecorderInnerInterceptor);
        return interceptor;
    }
}
```

In this example, we set the safety threshold for batch updates or deletions to 1,000 records.

### Using the Plugin

Once the plugin is configured, execute operations through MyBatis-Plus, and the plugin will automatically record data changes and enforce safety controls:

When performing batch updates or deletions, if the number of records exceeds the configured safety threshold, the plugin will throw an exception.

## Notes

- Ensure an appropriate safety threshold is set when configuring the interceptor to prevent unsafe batch operations.
- The plugin automatically records data changes, but you need to implement the logging logic yourself.
- When configuring and using the plugin, consider database performance and actual operational requirements.

`DataChangeRecorderInnerInterceptor` is a powerful tool that helps automate data change recording and enforce operational security. With proper configuration, you can ensure the safety of database operations and data integrity. Remember to follow best practices to maintain system security and stability.
