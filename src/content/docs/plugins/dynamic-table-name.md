---
title: 动态表名插件
sidebar:
  order: 5
---

## DynamicTableNameInnerInterceptor

简单示例：

👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

::: warning 注意事项：

- 原理为解析替换设定表名为处理器的返回表名，表名建议可以定义复杂一些避免误替换
- 例如：真实表名为 user 设定为 mp_dt_user 处理器替换为 user_2019 等

:::
