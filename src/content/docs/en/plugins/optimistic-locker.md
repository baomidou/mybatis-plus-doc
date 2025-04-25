---
title: Optimistic Locking Plugin
sidebar:
  order: 3
---

Optimistic locking is a concurrency control mechanism used to ensure that when updating records, the record has not been modified by other transactions. MyBatis-Plus provides the `OptimisticLockerInnerInterceptor` plugin, which makes implementing optimistic locking in applications simple.

## Implementation Principle of Optimistic Locking

The implementation of optimistic locking typically includes the following steps:

1. When reading a record, obtain the current version number (version).
2. When updating a record, pass this version number along.
3. When executing the update operation, set the condition `version = newVersion` where `version = oldVersion`.
4. If the version numbers do not match, the update fails.

## Configuring the Optimistic Locking Plugin

To use the optimistic locking plugin, two configuration steps are required:

### 1. Configure the Plugin

#### Spring XML Method

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

#### Spring Boot Annotation Method

```java
@Configuration
@MapperScan("modify as needed")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

### 2. Add the `@Version` Annotation to Entity Class Fields

In the entity class, you need to add the `@Version` annotation to the field representing the version number:

```java
import com.baomidou.mybatisplus.annotation.Version;

public class YourEntity {
    @Version
    private Integer version;
    // Other fields...
}
```

## Notes

- Supported data types include: `int`, `Integer`, `long`, `Long`, `Date`, `Timestamp` and `LocalDateTime`.
- For integer types, `newVersion` is `oldVersion + 1`.
- `newVersion` will be automatically written back to the entity object.
- Supports built-in methods: `updateById(entity)`, `update(entity, wrapper)`, `saveOrUpdate(entity)`, `insertOrUpdate(entity) (version >=3.5.7)`.
- When using a custom method to update, if the parameters meet the conditions for built-in parameters, the optimistic locking logic will also be executed. For example, a custom method like `myUpdate(entity)` is equivalent to `updateById(entity)` in this regard. It will extract the parameters to perform optimistic lock filling, but you need to handle the update implementation yourself.
- In the `update(entity, wrapper)` method, `wrapper` cannot be reused.

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