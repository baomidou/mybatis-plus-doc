---
title: 乐观锁插件
sidebar:
  order: 3
---

乐观锁是一种并发控制机制，用于确保在更新记录时，该记录未被其他事务修改。MyBatis-Plus 提供了 `OptimisticLockerInnerInterceptor` 插件，使得在应用中实现乐观锁变得简单。

## 乐观锁的实现原理

乐观锁的实现通常包括以下步骤：

1. 读取记录时，获取当前的版本号（version）。
2. 在更新记录时，将这个版本号一同传递。
3. 执行更新操作时，设置 `version = newVersion` 的条件为 `version = oldVersion`。
4. 如果版本号不匹配，则更新失败。

## 配置乐观锁插件

要使用乐观锁插件，需要进行两步配置：

### 1. 配置插件

#### Spring XML 方式

```xml
<bean id="optimisticLockerInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor"/>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="optimisticLockerInnerInterceptor"/>
        </list>
    </property>
</bean>
```

#### Spring Boot 注解方式

```java
@Configuration
@MapperScan("按需修改")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

### 2. 在实体类字段上添加 `@Version` 注解

在实体类中，需要在表示版本号的字段上添加 `@Version` 注解：

```java
import com.baomidou.mybatisplus.annotation.Version;

public class YourEntity {
    @Version
    private Integer version;
    // 其他字段...
}
```

## 注意事项

- 支持的数据类型包括：`int`, `Integer`, `long`, `Long`, `Date`, `Timestamp`, `LocalDateTime`。
- 对于整数类型，`newVersion` 是 `oldVersion + 1`。
- `newVersion` 会自动回写到实体对象中。
- 仅支持 `updateById(id)` 和 `update(entity, wrapper)` 方法。
- 在 `update(entity, wrapper)` 方法中，`wrapper` 不能复用。

## 示例

以下是一个完整的 Spring Boot 配置示例：

```java
@Configuration
@MapperScan("com.yourpackage.mapper")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

通过以上配置和实体类中的 `@Version` 注解，你就可以在 MyBatis-Plus 应用中轻松实现乐观锁，有效防止并发更新时的数据冲突。