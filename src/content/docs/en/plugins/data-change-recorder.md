---
title: Data Change Recorder Plugin
sidebar:
  order: 6
---

In database operations, recording data changes and controlling operation security are crucial. MyBatis-Plus provides a Data Change Recorder plugin called `DataChangeRecorderInnerInterceptor`, which can automatically log operation records and also supports security threshold control for batch updates or deletes.

## Plugin Introduction

`DataChangeRecorderInnerInterceptor` is an interceptor provided by MyBatis-Plus that automatically records data changes during database operations. It can also control operations based on configured security thresholds, such as limiting batch updates or deletes to no more than 1000 records at a time.

To better understand how to use `DataChangeRecorderInnerInterceptor`, you can refer to the official test case:

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
        // Configure security threshold to limit batch updates or deletes to no more than 1000 records
        dataChangeRecorderInnerInterceptor.setBatchUpdateLimit(1000).openBatchUpdateLimitation();
        interceptor.addInnerInterceptor(dataChangeRecorderInnerInterceptor);
        return interceptor;
    }
}
```

In this example, we set the security threshold for batch updates or deletes to 1000 records.

### Using the Plugin

Once the plugin is configured, when you perform operations through MyBatis-Plus, the plugin will automatically record data changes and enforce security controls:

When executing batch update or delete operations, if the number of records exceeds the configured security threshold, the plugin will throw an exception.

## Important Notes

- Ensure you set appropriate security thresholds when configuring the interceptor to prevent unsafe batch operations.
- The plugin automatically records data changes, but you need to implement your own logging logic.
- When configuring and using the plugin, consider database performance and actual operational requirements.

`DataChangeRecorderInnerInterceptor` is a powerful tool that helps you automatically record data changes and control operation security. Through proper configuration, you can ensure the safety of database operations and data integrity. Remember to follow best practices when using it to maintain system security and stability.
