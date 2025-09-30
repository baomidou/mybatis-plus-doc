---
title: Logical Delete Support
sidebar:
  order: 13
---

Logical delete is an elegant data management strategy that preserves data history by marking records as "deleted" in the database instead of physically removing them, while ensuring clean query results. MyBatis-Plus provides convenient logical delete support, making the implementation of this strategy simple and efficient.

## How Logical Delete Works

MyBatis-Plus's logical delete feature automatically handles the logical delete field during database operations. Here's how it works:

- **Insert**: The value of the logical delete field is unrestricted.
- **Select**: Automatically adds conditions to filter out records marked as deleted.
- **Update**: Prevents updating records that are already deleted.
- **Delete**: Converts delete operations into update operations, marking records as deleted.

For example:

- **Delete**: `update user set deleted=1 where id = 1 and deleted=0`
- **Select**: `select id,name,deleted from user where deleted=0`

## Supported Data Types

The logical delete field supports all data types, but we recommend using `Integer`, `Boolean`, or `LocalDateTime`.
If using the `datetime` type, you can configure the logical not-deleted value as `null` (a 4-character string, which needs to be wrapped with an escape character (single quotes) in YAML), and the deleted value can use a function like `now()` to get the current time.
If using the `bigint` type, you can configure the logical not-deleted value as 0, and the deleted value can use a function like `UNIX_TIMESTAMP()` to get the current timestamp as the delete identifier. This is suitable for using the delete field as a component column of a unique index, allowing multiple logical deletes.

## Usage Methods

### Method 1: Configure Global Logical Delete Properties

Configure MyBatis-Plus's global logical delete properties in `application.yml`:

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted # Global logical delete field name (deleted is the entity class property name)
      logic-delete-value: 1 # Logical deleted value. Optional, default value is 1
      logic-not-delete-value: 0 # Logical not-deleted value. Optional, default value is 0
```

### Method 2: If you don't want to use global configuration, you can use the `@TableLogic` annotation on the entity class for individual configuration

Add the `@TableLogic` annotation to the logical delete field in the entity class that corresponds to the database table:

```java
import com.baomidou.mybatisplus.annotation.TableLogic;

public class User {
    // Other fields...

    @TableLogic
    private Integer deleted;
}
```
Similarly, the logical not-deleted value defaults to 0, and the logical deleted value defaults to 1. These values can be modified by setting the `value` and `delval` properties of the `@TableLogic` annotation.
## Frequently Asked Questions

:::note[Important Notes]

- **Nature of Logical Delete**: The effect of logical delete should be equivalent to physical delete. Its purpose is to preserve data and maximize data value.
- **Business Requirements Consideration**: If your business still needs to frequently query these "deleted" data, consider whether logical delete is truly necessary. Perhaps a status field to control data visibility would be more appropriate.

:::

### 1. How to Handle Insert Operations?

- **Method 1**: Set a default value for the logical delete field in the database.
- **Method 2**: Manually set the value of the logical delete field before inserting data.
- **Method 3**: Use MyBatis-Plus's auto-fill feature.

### 2. What to Do When the Delete Interface Auto-fill Feature Fails?

- **Method 1**: Use the `deleteById` method.
- **Method 2**: Use the `update` method with `UpdateWrapper.set(column, value)`.
- **Method 3**: Use the `update` method with `UpdateWrapper.setSql("column=value")`.
- **Method 4**: Use Sql injector to inject `com.baomidou.mybatisplus.extension.injector.methods.LogicDeleteByIdWithFill` and use it (deprecated in version 3.5.0, recommend using deleteById instead).

By following the above steps, you can easily implement logical delete functionality in MyBatis-Plus, improving the flexibility and security of your data management.
