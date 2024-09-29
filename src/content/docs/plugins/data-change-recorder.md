---
title: 数据变动记录插件
sidebar:
  order: 6
---

在数据库操作中，记录数据变动和控制操作的安全性是非常重要的。MyBatis-Plus 提供了一个数据变动记录插件 `DataChangeRecorderInnerInterceptor`，它能够自动记录操作日志，还支持批量更新或删除的安全阈值控制。

## 插件简介

`DataChangeRecorderInnerInterceptor` 是 MyBatis-Plus 提供的一个拦截器，它可以在执行数据库操作时自动记录数据变动，并且可以根据配置的安全阈值来控制操作，比如限制一次批量更新或删除的记录数不超过 1000 条。

为了更好地理解如何使用 `DataChangeRecorderInnerInterceptor`，你可以参考官方提供的测试用例：

- 👉 [testOptLocker4WrapperIsNull](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserTest.java)

这个测试用例展示了如何使用插件进行数据变动记录和安全控制。

## 如何使用

### 配置拦截器

在你的 Spring Boot 配置类中，添加 `DataChangeRecorderInnerInterceptor` 到拦截器链中，并根据需要配置安全阈值：

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
        // 配置安全阈值，限制批量更新或删除的记录数不超过 1000 条
        dataChangeRecorderInnerInterceptor.setBatchUpdateLimit(1000).openBatchUpdateLimitation();
        interceptor.addInnerInterceptor(dataChangeRecorderInnerInterceptor);
        return interceptor;
    }
}
```

在这个例子中，我们设置了批量更新或删除的安全阈值为 1000 条记录。

### 使用插件

配置好插件之后，通过 MyBatis-Plus 执行操作，插件会自动记录数据变动并执行安全控制：

当执行批量更新或删除操作时，如果操作的记录数超过了配置的安全阈值，插件会抛出异常。

## 注意事项

- 确保在配置拦截器时设置了合适的安全阈值，以防止不安全的批量操作。
- 插件会自动记录数据变动，但你需要自行实现日志记录的逻辑。
- 在配置和使用插件时，要考虑到数据库的性能和操作的实际需求。

`DataChangeRecorderInnerInterceptor` 是一个强大的工具，它可以帮助你自动记录数据变动并控制操作的安全性。通过合理配置，你可以确保数据库操作的安全性和数据的完整性。记得在使用时遵循最佳实践，确保系统的安全性和稳定性。
