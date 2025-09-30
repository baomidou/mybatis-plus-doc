---
title: Auto-Fill Fields
sidebar:
  order: 9
---

MyBatis-Plus provides a convenient auto-fill feature for automatically populating certain fields, such as creation time and update time, when inserting or updating data. Here is a detailed explanation of how to use this feature.

## Overview

The auto-fill feature is implemented through the `com.baomidou.mybatisplus.core.handlers.MetaObjectHandler` interface. You need to create a class that implements this interface and define the fill logic for insert and update operations within it.

## Usage Steps

### 1. Define the Entity Class

In your entity class, use the `@TableField` annotation to mark which fields require auto-filling and specify the fill strategy.

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
        log.info("Starting insert fill...");
        this.strictInsertFill(metaObject, "createUserId", Long.class, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("Starting update fill...");
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
    
    // Note: When converting Kotlin types to Java types, use xxx::class.javaObjectType to prevent type mismatches that may occur if xxx::class.java converts to primitive types, which would cause auto-fill to fail.
    override fun insertFill(metaObject: MetaObject) {
        log.info("Starting insert fill...");
        this.strictInsertFill(metaObject, "createUserId", Long::class.javaObjectType, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

    override fun updateFill(metaObject: MetaObject) {
        log.info("Starting update fill...");
        this.strictUpdateFill(metaObject, "updateUserId", Long::class.javaObjectType, 123456L)
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

}
```
### 3. Configure the Auto-Fill Handler

Ensure your `MyMetaObjectHandler` class is managed by Spring, which can be achieved using the `@Component` or `@Bean` annotation.

## Important Notes

- Auto-fill directly sets values on the entity class properties.
- If a property has no value, it will be `null` when stored in the database.
- The default method strategy provided by `MetaObjectHandler` is: if a property has a value, it will not be overwritten; if the fill value is `null`, no filling will occur.
- Fields must be declared with the `@TableField` annotation, and the `fill` attribute must be set to specify the fill strategy.
- The fill handler must be declared as a `@Component` or `@Bean` in Spring Boot.
- Use the `strictInsertFill` or `strictUpdateFill` methods to differentiate fill logic based on the `FieldFill.xxx` annotation, field name, and field type.
- If differentiation is not needed, you can use the `fillStrategy` method.
- When using `update(T entity, Wrapper<T> updateWrapper)`, the `entity` cannot be null, otherwise auto-fill will not work.
- Auto-fill does not occur when using `update(Wrapper<T> updateWrapper)`; you must manually assign values to field conditions.

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

## Failed Fill Example

```java
// The method parameter name does not meet the fill condition. Change 'user' to 'et' for correct filling.
updateFillByCustomMethod3(@Param("coll") Collection<Long> ids, @Param("user") H2User h2User);
```

## FieldFill Enum

```java
public enum FieldFill {
    DEFAULT,       // Default: no processing
    INSERT,        // Fill field on insert
    UPDATE,        // Fill field on update
    INSERT_UPDATE  // Fill field on insert and update
}
```

By following the steps above, you can easily implement the auto-fill feature in MyBatis-Plus to improve development efficiency.
