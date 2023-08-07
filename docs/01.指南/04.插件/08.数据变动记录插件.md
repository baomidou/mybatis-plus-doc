---
title: 数据变动记录插件
date: 2023-08-07 17:39:50
permalink: /pages/1c87db/
article: false
---

## DataChangeRecorderInnerInterceptor

> 插件为安全控制一部分，会自动记录操作日志，支持安全阈值控制，例如场景: 限制批量更新插入数量不超过 1000 条记录。
 
插件地址 👉 [DataChangeRecorderInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/DataChangeRecorderInnerInterceptor.java)

测试用例 👉 [testOptLocker4WrapperIsNull](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserTest.java)


::: warning 注意事项：

- 查阅插件主体部分使用说明，注入数据变动记录插件。

:::
