title: 性能分析插件
---

> 性能分析拦截器，用于输出每条 SQL 语句及其执行时间

* 使用如下：

```xml
    <plugins>
        ....

        <!-- SQL 执行性能分析，开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长 -->
        <plugin interceptor="com.baomidou.mybatisplus.plugins.PerformanceInterceptor">
            <property name="maxTime" value="100" />
        </plugin>
    </plugins>
```

> 注意！参数说明

* 参数：maxTime  SQL 执行最大时长，超过自动停止运行，有助于发现问题。

* 注意！该插件只用于开发环境，不建议生产环境使用。。。
