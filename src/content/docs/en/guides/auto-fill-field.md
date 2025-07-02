---
title: Auto-fill Fields
sidebar:
  order: 9
---

MyBatis-Plus provides a convenient auto-fill feature for automatically populating certain fields during data insertion or updates, such as creation time and update time. Below is a detailed explanation of how to use this feature.

## Overview of the Principle

The auto-fill feature is implemented by the `com.baomidou.mybatisplus.core.handlers.MetaObjectHandler` interface. You need to create a class that implements this interface and define the fill logic for insertion and updates within it.

## Steps to Use

### 1. Define the Entity Class

In the entity class, use the `@TableField` annotation to mark which fields require auto-filling and specify the fill strategy.

```java
public class User {
    @TableField(fill = FieldFill.INSERT)
    private String createTime;

    @TableField(fill = FieldFill.UPDATE)
    private String updateTime;

    // Other fields...
}
```

### 2. Implement MetaObjectHandler

Create a class that implements the `MetaObjectHandler` interface and override the `insertFill` and `updateFill` methods.

```java
// java example
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("Start insert fill...");
        this.strictInsertFill(metaObject, "createUserId", Long.class, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("Start update fill...");
        this.strictInsertFill(metaObject, "updateUserId", Long.class, 123456L)
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
    }
}
```
```kotlin
// kotlin example
@Component
class MyMetaObjectHandler : MetaObjectHandler {
    
    private val log = LoggerFactory.getLogger(MyMetaObjectHandler::class.java)
    
    // Note: To convert Kotlin types to Java types, use xxx::class.javaObjectType to prevent certain types from being converted to primitive types, which may cause fill failures.
    override fun insertFill(metaObject: MetaObject) {
        log.info("Start insert fill...");
        this.strictInsertFill(metaObject, "createUserId", Long::class.javaObjectType, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

    override fun updateFill(metaObject: MetaObject) {
        log.info("Start update fill...");
        this.strictUpdateFill(metaObject, "updateUserId", Long::class.javaObjectType, 123456L)
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

}
```
### 3. Configure the Auto-fill Handler

Ensure your `MyMetaObjectHandler` class is managed by Spring, either through the `@Component` or `@Bean` annotation.

## Notes

- Auto-fill directly sets values for the entity class properties.
- If a property has no value, it will be `null` when stored in the database.
- The default method strategy provided by `MetaObjectHandler` is: if a property has a value, it will not be overwritten; if the fill value is `null`, it will not be filled.
- Fields must be annotated with `@TableField` and the `fill` property must be set to specify the fill strategy.
- The fill handler must be declared as `@Component` or `@Bean` in Spring Boot.
- The `strictInsertFill` or `strictUpdateFill` methods can distinguish fill logic based on the `FieldFill.xxx` annotation, field name, and field type.
- If no distinction is needed, the `fillStrategy` method can be used.
- When using `update(T entity, Wrapper<T> updateWrapper)`, `entity` cannot be null; otherwise, auto-fill will fail.
- When using `update(Wrapper<T> updateWrapper)`, auto-fill will not occur, and field conditions must be manually assigned.

## Parameter Fill Examples

```java
// Insert fill example
insertFillByCustomMethod1(H2User h2User);
insertFillByCustomMethod8(H2User[] h2Users);
insertFillByCustomMethod4(Collection<H2User> h2User);

// Update fill example
updateFillByCustomMethod2(@Param("coll") Collection<Long> ids, @Param("et") H2User h2User);
updateFillByCustomMethod4(@Param("colls") Collection<Long> ids, @Param("et") H2User h2User);
```

## Non-fillable Examples

```java
// The method parameter name does not meet the fill condition. Replace "user" with "et" for correct filling.
updateFillByCustomMethod3(@Param("coll") Collection<Long> ids, @Param("user") H2User h2User);
```

## FieldFill Enum

```java
public enum FieldFill {
    DEFAULT,       // Default: no processing
    INSERT,        // Fill field on insertion
    UPDATE,        // Fill field on update
    INSERT_UPDATE  // Fill field on insertion and update
}
```

By following these steps, you can easily implement the auto-fill feature in MyBatis-Plus to improve development efficiency.
