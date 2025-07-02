---
title: Data Permission Plugin
sidebar:
  order: 4
---

DataPermissionInterceptor is a plugin provided by MyBatis-Plus for implementing data permission control. It intercepts executed SQL statements and dynamically appends permission-related SQL fragments to control user data access.

## Plugin Principle

DataPermissionInterceptor operates similarly to the tenant plugin. It intercepts SQL statements before execution and dynamically adds permission-related SQL fragments based on user permissions. This ensures only data accessible to the user will be queried.

## Plugin Source and Test Cases

- **Plugin Source**: [DataPermissionInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser-5.0/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/DataPermissionInterceptor.java)
- **Test Cases**: [DataPermissionInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser-5.0/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/DataPermissionInterceptorTest.java)

## Core Code
Below is the core logic for assembling SQL fragments:

```java
new DataPermissionInterceptor(new MultiDataPermissionHandler() {

    @Override
    public Expression getSqlSegment(final Table table, final Expression where, final String mappedStatementId) {
        try {
            String sqlSegment = sqlSegmentMap.get(mappedStatementId, table.getName());
            if (sqlSegment == null) {
                logger.info("{} {} AS {} : NOT FOUND", mappedStatementId, table.getName(), table.getAlias());
                return null;
            }
            Expression sqlSegmentExpression = CCJSqlParserUtil.parseCondExpression(sqlSegment);
            logger.info("{} {} AS {} : {}", mappedStatementId, table.getName(), table.getAlias(), sqlSegmentExpression.toString());
            return sqlSegmentExpression;
        } catch (JSQLParserException e) {
            e.printStackTrace();
        }
        return null;
    }
});
```

:::note

Carefully read the main usage instructions of the plugin to ensure proper injection of the data permission interceptor and customize the SQL assembly logic as needed.

:::

## JSQLParser
**JSQLParser** is an open-source SQL parsing library that facilitates parsing and modifying SQL statements. It is a key tool for implementing permission logic in this plugin, as MyBatis-Plus's data permission feature relies on JSQLParser's parsing capabilities.

The following example demonstrates how to use JSQLParser to modify SQL:

```java
// Example SQL
String sql = "SELECT * FROM user WHERE status = 'active'";
Expression expression;

try {
    expression = CCJSqlParserUtil.parseCondExpression("status = 'inactive'");
    PlainSelect select = (PlainSelect) ((Select) CCJSqlParserUtil.parse(sql)).getSelectBody();
    select.setWhere(expression);

    System.out.println(select); // Output: SELECT * FROM user WHERE status = 'inactive'
} catch (JSQLParserException e) {
    e.printStackTrace();
}
```

## Usage Guide

### Step 1: Implement Data Permission Logic
Customize `MultiDataPermissionHandler` to implement specific business logic.

```java
public class CustomDataPermissionHandler extends MultiDataPermissionHandler {
    @Override
    public Expression getSqlSegment(Table table, Expression where, String mappedStatementId) {
        // Implement custom data permission logic here
        try {
            String sqlSegment = "..."; // Permission-related SQL fragment
            return CCJSqlParserUtil.parseCondExpression(sqlSegment);
        } catch (JSQLParserException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### Step 2: Register the Data Permission Interceptor
Register the custom handler with `DataPermissionInterceptor`.

```java
// In MyBatis configuration
Interceptor dataPermissionInterceptor = new DataPermissionInterceptor(new CustomDataPermissionHandler());
mybatisConfiguration.addInterceptor(dataPermissionInterceptor);
```

By using DataPermissionInterceptor, you can easily implement data permission control in MyBatis-Plus applications, ensuring users only access data within their authorized scope, thereby enhancing data security.
