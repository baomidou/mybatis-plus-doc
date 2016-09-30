title: 执行分析插件
---
> SQL 执行分析拦截器【 目前只支持 MYSQL-5.6.3 以上版本 】，作用是分析 处理 DELETE UPDATE 语句，
防止小白或者恶意 delete update 全表操作！

```xml
<plugins>
    ...

    <!-- SQL 执行分析拦截器 stopProceed 发现全表执行 delete update 是否停止运行 -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.SqlExplainInterceptor">
        <property name="stopProceed" value="false" />
    </plugin>
</plugins>
```

> 注意！参数说明

* 参数：stopProceed  发现执行全表 delete update 语句是否停止执行

* 注意！该插件只用于开发环境，不建议生产环境使用。。。
