---
title: 非法SQL拦截插件
date: 2023-08-07 17:39:50
permalink: /pages/3c87is/
article: false
---

## IllegalSQLInnerInterceptor

> 插件为安全控制一部分，非法SQL拦截（人为定义的非法SQL）提前发现解决插件。

- 拦截SQL类型的场景
- 必须使用索引
- 全表更新操作检查（防全表更新与删除插件）类似
- not  or  子查询 检查


插件地址 👉 [IllegalSQLInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptor.java)

测试用例 👉 [IllegalSQLInnerInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/test/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptorTest.java)

::: warning 注意事项：

- 查阅插件主体部分使用说明，注入非法SQL拦截插件。
- 该插件只是提供一种非法 SQL 拦截的思路解决方案，不一定适用于所有的企业，开发者可以自行参考修改。

:::
