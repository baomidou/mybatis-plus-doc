---
title: Logical Delete Support
sidebar:
  order: 13
---

Logical delete is an elegant data management strategy that preserves historical data by marking records as "deleted" in the database instead of physically removing them, while ensuring clean query results. MyBatis-Plus provides convenient logical delete support, making the implementation of this strategy simple and efficient.

## How Logical Delete Works

MyBatis-Plus's logical delete feature automatically handles the logical delete field during database operations. Here's how it works:

- **Insert**: The value of the logical delete field is unrestricted.
- **Select**: Automatically adds conditions to filter out records marked as deleted.
- **Update**: Prevents updates to deleted records.
- **Delete**: Converts delete operations into update operations, marking records as deleted.

For example:

- **Delete**: `update user set deleted=1 where id = 1 and deleted=0`
- **Select**: `select id,name,deleted from user where deleted=0`

## Supported Data Types

The logical delete field supports all data types, but it is recommended to use `Integer`, `Boolean`, or `LocalDateTime`.  
If using the `datetime` type, you can configure the logical not-deleted value as `null` (a 4-character string, which must be wrapped in escape characters (single quotes) in YAML), and the deleted value can use functions like `now()` to get the current time.  
If using the `bigint` type, you can configure the logical not-deleted value as 0, and the deleted value can use functions like `UNIX_TIMESTAMP()` to get the current timestamp as the deletion marker. This is suitable for cases where the delete field is part of a unique index column and can be logically deleted multiple times.

## Usage

### Method 1: Configure Global Logical Delete Properties

Configure MyBatis-Plus's global logical delete properties in `application.yml`:

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted # Global logical delete field name
      logic-delete-value: 1 # Logical deleted value. Optional, default is 1
      logic-not-delete-value: 0 # Logical not-deleted value. Optional, default is 0
```

### Method 2: Use the `@TableLogic` Annotation for Entity-Specific Configuration

Add the `@TableLogic` annotation to the logical delete field in the entity class corresponding to the database table:

```java
import com.baomidou.mybatisplus.annotation.TableLogic;

public class User {
    // Other fields...

    @TableLogic
    private Integer deleted;
}
```
Similarly, the logical not-deleted value defaults to 0, and the logical deleted value defaults to 1. These values can be modified by setting the `value` and `delval` properties of the `@TableLogic` annotation.

## FAQ

:::note[Notes]

- **Essence of Logical Delete**: The effect of logical delete should be equivalent to physical delete, with the purpose of preserving data to maximize its value.
- **Business Considerations**: If your business still requires frequent queries on "deleted" data, consider whether logical delete is truly necessary. Perhaps a status field to control data visibility would be more appropriate.

:::

### 1. How to Handle Insert Operations?

- **Method 1**: Set a default value for the logical delete field in the database.
- **Method 2**: Manually set the logical delete field value before inserting data.
- **Method 3**: Use MyBatis-Plus's auto-fill feature.

### 2. What to Do If the Auto-Fill Feature Fails for Delete Interfaces?

- **Method 1**: Use the `deleteById` method.
- **Method 2**: Use the `update` method with `UpdateWrapper.set(column, value)`.
- **Method 3**: Use the `update` method with `UpdateWrapper.setSql("column=value")`.
- **Method 4**: Use the Sql injector to inject `com.baomidou.mybatisplus.extension.injector.methods.LogicDeleteByIdWithFill` and use it (deprecated in version 3.5.0, recommended to use `deleteById` instead).

By following these steps, you can easily implement logical delete functionality in MyBatis-Plus, improving the flexibility and security of data management.
