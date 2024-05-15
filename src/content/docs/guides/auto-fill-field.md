---
title: 自动填充字段
sidebar:
  order: 9
---

MyBatis-Plus 提供了一个便捷的自动填充功能，用于在插入或更新数据时自动填充某些字段，如创建时间、更新时间等。以下是如何使用这一功能的详细说明。

## 原理概述

自动填充功能通过实现 `com.baomidou.mybatisplus.core.handlers.MetaObjectHandler` 接口来实现。你需要创建一个类来实现这个接口，并在其中定义插入和更新时的填充逻辑。

## 使用步骤

### 1. 定义实体类

在实体类中，你需要使用 `@TableField` 注解来标记哪些字段需要自动填充，并指定填充的策略。

```java
public class User {
    @TableField(fill = FieldFill.INSERT)
    private String createTime;

    @TableField(fill = FieldFill.UPDATE)
    private String updateTime;

    // 其他字段...
}
```

### 2. 实现 MetaObjectHandler

创建一个类来实现 `MetaObjectHandler` 接口，并重写 `insertFill` 和 `updateFill` 方法。

```java
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("开始插入填充...");
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("开始更新填充...");
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
    }
}
```

### 3. 配置自动填充处理器

确保你的 `MyMetaObjectHandler` 类被 Spring 管理，可以通过 `@Component` 或 `@Bean` 注解来实现。

## 注意事项

- 自动填充是直接给实体类的属性设置值。
- 如果属性没有值，入库时会是 `null`。
- `MetaObjectHandler` 提供的默认方法策略是：如果属性有值则不覆盖，如果填充值为 `null` 则不填充。
- 字段必须声明 `@TableField` 注解，并设置 `fill` 属性来选择填充策略。
- 填充处理器需要在 Spring Boot 中声明为 `@Component` 或 `@Bean`。
- 使用 `strictInsertFill` 或 `strictUpdateFill` 方法可以根据注解 `FieldFill.xxx`、字段名和字段类型来区分填充逻辑。
- 如果不需区分，可以使用 `fillStrategy` 方法。
- 在 `update(T entity, Wrapper<T> updateWrapper)` 时，`entity` 不能为空，否则自动填充失效。
- 在 `update(Wrapper<T> updateWrapper)` 时不会自动填充，需要手动赋值字段条件。

## 参数填充示例

```java
// 插入填充示例
insertFillByCustomMethod1(H2User h2User);
insertFillByCustomMethod8(H2User[] h2Users);
insertFillByCustomMethod4(Collection<H2User> h2User);

// 更新填充示例
updateFillByCustomMethod2(@Param("coll") Collection<Long> ids, @Param("et") H2User h2User);
updateFillByCustomMethod4(@Param("colls") Collection<Long> ids, @Param("et") H2User h2User);
```

## 无法填充示例

```java
// 方法参数名不满足填充条件，需要将 user 换成 et 才能正确填充
updateFillByCustomMethod3(@Param("coll") Collection<Long> ids, @Param("user") H2User h2User);
```

## FieldFill 枚举

```java
public enum FieldFill {
    DEFAULT,       // 默认不处理
    INSERT,        // 插入填充字段
    UPDATE,        // 更新填充字段
    INSERT_UPDATE  // 插入和更新填充字段
}
```

通过以上步骤，你可以轻松地在 MyBatis-Plus 中实现自动填充功能，提高开发效率。
