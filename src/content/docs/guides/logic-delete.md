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

### 3. 逻辑删除后，唯一索引冲突怎么办？

逻辑删除只更新删除标记，记录仍然保留在表中，数据库的唯一索引也仍然生效。例如，`username` 上有唯一索引时，即使旧记录已经逻辑删除，再次插入相同用户名仍会发生唯一键冲突。

如果业务允许删除后复用用户名，可以将唯一索引改为 `(username, deleted)`，同时为已删除记录设置不同的删除标记。仅使用 `0/1` 标记并不能支持反复删除、重新注册：已有 `(alice, 1)` 时，再把新的 `(alice, 0)` 更新为 `(alice, 1)`，仍会发生冲突。

下面以 MySQL 为例，使用非零、自增的主键 `id` 作为已删除值，`0` 作为未删除值：

```sql
CREATE TABLE sys_user (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    deleted BIGINT NOT NULL DEFAULT 0,
    UNIQUE KEY uk_username_deleted (username, deleted)
);
```

在实体类中，将 `deleted` 声明为 `Long`，并指定逻辑删除值：

```java
@TableLogic(value = "0", delval = "id")
private Long deleted;
```

这里的 `id` 是数据库主键列名，需要与实际表结构一致；不是字符串常量，也不是实体属性名。主键必须唯一且不为 `0`，以免与未删除标记混淆。使用 MyBatis-Plus 的逻辑删除方法时，生成的更新语句相当于：

```sql
UPDATE sys_user SET deleted = id WHERE id = 1 AND deleted = 0;
```

同名记录可以依次保留为 `(alice, 1)`、`(alice, 2)`，而当前未删除记录为 `(alice, 0)`。联合唯一索引仍然阻止同时存在两条未删除的同名记录。已有表需要同步调整原来的 `username` 单列唯一索引；仅新增联合索引不会解除原索引的限制。

:::note[删除标记的选择]

如果使用前文的 `UNIX_TIMESTAMP()` 作为已删除值，需要注意其秒级精度：同一用户名的多条记录在同一秒内被逻辑删除，仍可能产生相同的删除标记。应根据业务场景保证同一业务唯一键下的删除标记不重复。

:::

通过以上步骤，你可以轻松地在 MyBatis-Plus 中实现逻辑删除功能，提高数据管理的灵活性和安全性。
