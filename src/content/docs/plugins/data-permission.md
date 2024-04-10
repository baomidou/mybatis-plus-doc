---
title: 数据权限插件
sidebar:
  order: 4
---

## DataPermissionInterceptor

> 插件原理和租户插件类似动态拦截执行 `SQl` 然后拼接权限部分 `SQL片段` ， 该插件一直是免费开源的，`企业高级特性-数据范围`功能也是基于该原理实现，只不过添加了注解支持。
 
插件地址 👉 [DataPermissionInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/DataPermissionInterceptor.java)

测试用例 👉 [DataPermissionInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/test/java/com/baomidou/mybatisplus/extension/plugins/inner/DataPermissionInterceptorTest.java)

- 核心代码 `SQL片段` 组装逻辑如下：

```
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

::: warning 注意事项：

- 查阅插件主体部分使用说明，注入数据权限插件，自定义执行 `SQL` 语句拼装。

:::
