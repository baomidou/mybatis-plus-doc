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

逻辑删除字段支持所有数据类型，但推荐使用 `Integer`、`Boolean` 或 `LocalDateTime`。
如果使用 `datetime` 类型，可以配置逻辑未删除值为 `null`(长度为4的字符串,在yaml中需使用转义符(单引号)包裹)，已删除值可以使用函数如 `now()` 来获取当前时间。
如果使用 `bigint` 类型，可以配置逻辑未删除值为 0，已删除值可以使用函数如 `UNIX_TIMESTAMP()` 来获取当前时间戳作为删除标识。适合用于将删除字段作为唯一索引组成列,可以多次逻辑删除.

## 使用方法

### 方法 1: 配置全局逻辑删除属性

在 `application.yml` 中配置 MyBatis-Plus 的全局逻辑删除属性：

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted # 全局逻辑删除字段名(deleted为实体类属性名称)
      logic-delete-value: 1 # 逻辑已删除值。可选，默认值为 1
      logic-not-delete-value: 0 # 逻辑未删除值。可选，默认值为 0
```

### 方法 2: 如不想使用全局配置，可以在实体类中使用 `@TableLogic` 注解，对类单独进行配置

在实体类中，对应数据库表的逻辑删除字段上添加 `@TableLogic` 注解：

```java
import com.baomidou.mybatisplus.annotation.TableLogic;

public class User {
    // 其他字段...

    @TableLogic
    private Integer deleted;
}
```
同样，逻辑未删除值默认为 0，逻辑已删除值默认为 1。这两个值可以通过设置 `@TableLogic` 注解的 `value` 属性和 `delval` 属性的值来进行修改。
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

### 3. 逻辑删除与唯一索引冲突怎么办？

表上有唯一索引（如用户名、手机号）时，记录被逻辑删除后仍然留在表中，再次插入相同的值会报唯一约束冲突。

直接把唯一索引改成 `(username, deleted)` 并不能解决问题：`deleted` 只有 0、1 两个值时，同一个用户名只能存在一条已删除记录，第二次删除同名记录时就会冲突。

推荐的做法是让**已删除的值各不相同**、未删除的值固定，并把逻辑删除字段加入唯一索引：

```sql
CREATE TABLE user
(
    id       BIGINT      NOT NULL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    deleted  BIGINT      NOT NULL DEFAULT 0 COMMENT '0 未删除，删除时写入主键值',
    UNIQUE KEY uk_username_deleted (username, deleted)
);
```

```java
public class User {
    private Long id;
    private String username;

    @TableLogic(value = "0", delval = "id")
    private Long deleted;
}
```

删除时生成的 SQL 如下，每条已删除记录的 `deleted` 都等于自己的主键，互不冲突；未删除记录的 `deleted` 都是 0，唯一约束照常生效：

```sql
UPDATE user SET deleted=id WHERE id=? AND deleted=0
```

如果希望同时记录删除时间，也可以把已删除值设为时间戳函数，例如 MySQL 的 `@TableLogic(value = "0", delval = "UNIX_TIMESTAMP()")`。但同一秒内删除两条相同用户名的记录时仍会冲突，对唯一性要求严格的场景推荐使用主键值。

:::caution[注意]

- **逻辑删除字段请使用数值类型**（如 `Long`）。只有非字符串类型的字段，`delval` 才会原样拼接到 SQL 中，`id`、`UNIX_TIMESTAMP()` 这类写法才能生效；字符串类型的字段会被加上单引号，变成普通字符串常量。
- **未删除值不要使用 `null`**。未删除值为 `null` 时，查询条件是 `deleted IS NULL`，而 MySQL、PostgreSQL 等数据库的唯一索引允许存在多个 `NULL`，未删除的记录之间将不再受唯一约束。
- `delval` 中的函数是数据库方言相关的，请按实际使用的数据库调整写法。

:::

通过以上步骤，你可以轻松地在 MyBatis-Plus 中实现逻辑删除功能，提高数据管理的灵活性和安全性。
