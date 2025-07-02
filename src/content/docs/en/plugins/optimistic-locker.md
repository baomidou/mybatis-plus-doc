---
title: Optimistic Lock Plugin
sidebar:
  order: 3
---

Optimistic locking is a concurrency control mechanism designed to ensure that a record has not been modified by other transactions when updating it. MyBatis-Plus provides the `OptimisticLockerInnerInterceptor` plugin, making it straightforward to implement optimistic locking in applications.

## How Optimistic Locking Works

The implementation of optimistic locking typically involves the following steps:

1. When reading a record, retrieve the current version number (`version`).
2. When updating the record, pass this version number along.
3. During the update operation, set the condition `version = newVersion` where `version = oldVersion`.
4. If the version numbers do not match, the update fails.

## Configuring the Optimistic Lock Plugin

To use the optimistic lock plugin, two configuration steps are required:

### 1. Configuring the Plugin

#### Spring XML Approach

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

#### Spring Boot Annotation Approach

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

### 2. Adding the `@Version` Annotation to Entity Class Fields

In the entity class, add the `@Version` annotation to the field representing the version number:

```java
import com.baomidou.mybatisplus.annotation.Version;

public class YourEntity {
    @Version
    private Integer version;
    // Other fields...
}
```

## Notes

- Supported data types include: `int`, `Integer`, `long`, `Long`, `Date`, `Timestamp`, `LocalDateTime`.
- For integer types, `newVersion` is `oldVersion + 1`.
- `newVersion` is automatically written back to the entity object.
- Supports built-in methods such as `updateById(entity)`, `update(entity, wrapper)`, `saveOrUpdate(entity)`, and `insertOrUpdate(entity)` (version >= 3.5.7).
- Custom update methods will also execute optimistic locking logic if they meet the parameter conditions of built-in methods. For example, a custom `myUpdate(entity)` is equivalent to `updateById(entity)` and will extract parameters for optimistic locking, but the update implementation must be handled manually.
- In the `update(entity, wrapper)` method, the `wrapper` cannot be reused.

## Example

Below is a complete Spring Boot configuration example:

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

With the above configuration and the `@Version` annotation in the entity class, you can easily implement optimistic locking in MyBatis-Plus applications, effectively preventing data conflicts during concurrent updates.
