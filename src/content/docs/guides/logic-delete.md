---
title: 逻辑删除支持
sidebar:
  order: 13
---

逻辑删除是一种优雅的数据管理策略，它通过在数据库中标记记录为“已删除”而非物理删除，来保留数据的历史痕迹，同时确保查询结果的整洁性。MyBatis-Plus 提供了便捷的逻辑删除支持，使得这一策略的实施变得简单高效。

## 逻辑删除的工作原理

MyBatis-Plus 的逻辑删除功能会在执行数据库操作时自动处理逻辑删除字段。以下是它的工作方式：

- **插入**：逻辑删除字段的值不受限制。
- **查找**：自动添加条件，过滤掉标记为已删除的记录。
- **更新**：防止更新已删除的记录。
- **删除**：将删除操作转换为更新操作，标记记录为已删除。

例如：

- **删除**：`update user set deleted=1 where id = 1 and deleted=0`
- **查找**：`select id,name,deleted from user where deleted=0`

## 支持的数据类型

逻辑删除字段支持所有数据类型，但推荐使用 `Integer`、`Boolean` 或 `LocalDateTime`。如果使用 `datetime` 类型，可以配置逻辑未删除值为 `null`，已删除值可以使用函数如 `now()` 来获取当前时间。

## 使用方法

### 步骤 1: 配置全局逻辑删除属性

在 `application.yml` 中配置 MyBatis-Plus 的全局逻辑删除属性：

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted # 全局逻辑删除字段名
      logic-delete-value: 1 # 逻辑已删除值
      logic-not-delete-value: 0 # 逻辑未删除值
```

### 步骤 2: 在实体类中使用 `@TableLogic` 注解

在实体类中，对应数据库表的逻辑删除字段上添加 `@TableLogic` 注解：

```java
import com.baomidou.mybatisplus.annotation.TableLogic;

public class User {
    // 其他字段...

    @TableLogic
    private Integer deleted;
}
```

## 常见问题解答

:::note[注意事项]

- **逻辑删除的本质**：逻辑删除的效果应等同于物理删除，其目的是为了保留数据，实现数据价值最大化。
- **业务需求考量**：如果业务中仍需频繁查询这些“已删除”的数据，应考虑是否真正需要逻辑删除。或许，一个状态字段来控制数据的可见性更为合适。

:::

### 1. 如何处理插入操作？

- **方法一**：在数据库中为逻辑删除字段设置默认值。
- **方法二**：在插入数据前手动设置逻辑删除字段的值。
- **方法三**：使用 MyBatis-Plus 的自动填充功能。

### 2. 删除接口自动填充功能失效怎么办？

- **方法一**：使用 `deleteById` 方法。
- **方法二**：使用 `update` 方法，并使用 `UpdateWrapper.set(column, value)`。
- **方法三**：使用 `update` 方法，并使用 `UpdateWrapper.setSql("column=value")`。
- **方法四**：使用 Sql 注入器注入 `com.baomidou.mybatisplus.extension.injector.methods.LogicDeleteByIdWithFill` 并使用（3.5.0版本已废弃，推荐使用deleteById）。

通过以上步骤，你可以轻松地在 MyBatis-Plus 中实现逻辑删除功能，提高数据管理的灵活性和安全性。