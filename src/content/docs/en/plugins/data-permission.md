---
title: Data Permission Plugin
sidebar:
  order: 4
---

DataPermissionInterceptor is a plugin provided by MyBatis-Plus for implementing data permission control. It controls user data access by intercepting executed SQL statements and dynamically appending permission-related SQL segments.

## Plugin Principle

The working principle of DataPermissionInterceptor is similar to the Tenant Plugin. It intercepts SQL statements before execution and dynamically adds permission-related SQL segments based on user permissions. This ensures that only data which the user is authorized to access is queried.

## Plugin Address and Test Case

- **Plugin Address**: [DataPermissionInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/DataPermissionInterceptor.java)
- **Test Case**: [DataPermissionInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/DataPermissionInterceptorTest.java)

## Core Code
The following is the core logic code for SQL segment assembly:

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

Carefully read the usage instructions for the main parts of the plugin, ensure the data permission plugin is correctly injected, and customize the `SQL` assembly logic yourself.

:::

## JSQLParser
**JSQLParser** is an open-source SQL parsing library that conveniently parses and modifies SQL statements. It is a key tool for the plugin to implement permission logic. MyBatis-Plus's data permission relies on the parsing capability of JSQLParser.

The following example demonstrates how to use JSQLParser to modify `SQL`:

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

## Usage

### Step 1: Implement Data Permission Logic
Customize `MultiDataPermissionHandler` to implement specific business logic.

```java
public class CustomDataPermissionHandler extends MultiDataPermissionHandler {
    @Override
    public Expression getSqlSegment(Table table, Expression where, String mappedStatementId) {
        // Write custom data permission logic here
        try {
            String sqlSegment = "..."; // SQL segment related to data permissions
            return CCJSqlParserUtil.parseCondExpression(sqlSegment);
        } catch (JSQLParserException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### Step 2: Register Data Permission Interceptor
Register the custom handler into `DataPermissionInterceptor`.

```java
// In MyBatis configuration
Interceptor dataPermissionInterceptor = new DataPermissionInterceptor(new CustomDataPermissionHandler());
mybatisConfiguration.addInterceptor(dataPermissionInterceptor);
```

By using DataPermissionInterceptor, you can easily implement data permission control in your MyBatis-Plus application, ensuring that users can only access data within their permission scope, thereby enhancing data security.
