---
title: Optimistic Lock Plugin
sidebar:
  order: 3
---

Optimistic locking is a concurrency control mechanism used to ensure that when updating a record, it hasn't been modified by other transactions. MyBatis-Plus provides the `OptimisticLockerInnerInterceptor` plugin, making it simple to implement optimistic locking in your applications.

## How Optimistic Locking Works

The implementation of optimistic locking typically involves the following steps:

1. When reading a record, retrieve the current version number.
2. When updating the record, pass this version number along.
3. When performing the update operation, set the condition `version = newVersion` where `version = oldVersion`.
4. If the version numbers don't match, the update fails.

## Configuring the Optimistic Lock Plugin

To use the optimistic lock plugin, you need to perform two configuration steps:

### 1. Configure the Plugin

#### Spring XML Configuration

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

#### Spring Boot Annotation Configuration

```java
@Configuration
@MapperScan("Modify as needed")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

### 2. Add `@Version` Annotation to Entity Field

In your entity class, add the `@Version` annotation to the field representing the version number:

```java
import com.baomidou.mybatisplus.annotation.Version;

public class YourEntity {
    @Version
    private Integer version;
    // Other fields...
}
```

## Important Notes

- Supported data types include: `int`, `Integer`, `long`, `Long`, `Date`, `Timestamp`, `LocalDateTime`.
- For integer types, `newVersion` is calculated as `oldVersion + 1`.
- `newVersion` is automatically written back to the entity object.
- Supported built-in methods: `updateById(entity)`, `update(entity, wrapper)`, `saveOrUpdate(entity)`, `insertOrUpdate(entity)` (version >= 3.5.7).
- Custom update methods will also execute optimistic lock logic if they meet the parameter conditions of built-in methods. For example, a custom `myUpdate(entity)` method is equivalent to `updateById(entity)` and will extract parameters for optimistic lock population, but the update implementation needs to be handled manually.
- In the `update(entity, wrapper)` method, the `wrapper` cannot be reused.

## Example

Here's a complete Spring Boot configuration example:

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

With the above configuration and the `@Version` annotation in your entity class, you can easily implement optimistic locking in your MyBatis-Plus application, effectively preventing data conflicts during concurrent updates.
