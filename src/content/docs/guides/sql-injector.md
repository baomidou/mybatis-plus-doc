---
title: SQL注入器
date: 2021-12-14 19:07:06
permalink: /pages/42ea4a/
article: false
---

::: tip 注入器配置
全局配置 `sqlInjector` 用于注入 `ISqlInjector` 接口的子类，实现自定义方法注入。

参考默认注入器 [DefaultSqlInjector](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/injector/DefaultSqlInjector.java)
:::

- SQL 自动注入器接口 `ISqlInjector`

```java
public interface ISqlInjector {

    /**
     * <p>
     * 检查SQL是否注入(已经注入过不再注入)
     * </p>
     *
     * @param builderAssistant mapper 信息
     * @param mapperClass      mapper 接口的 class 对象
     */
    void inspectInject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass);
}
```

自定义自己的通用方法可以实现接口 `ISqlInjector` 也可以继承抽象类 `AbstractSqlInjector` 注入通用方法 `SQL 语句` 然后继承 `BaseMapper` 添加自定义方法，全局配置 `sqlInjector` 注入 MP 会自动将类所有方法注入到 `mybatis` 容器中。

> 参考[自定义 BaseMapper 示例](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-deluxe))
