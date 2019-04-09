# 性能分析插件

> 性能分析拦截器，用于输出每条 SQL 语句及其执行时间

> 如果对 SQL 的打印效果要求较高，请使用第三方扩展 `执行 SQL 分析打印` 功能

- 使用如下：

```xml
<plugins>
    ....

    <!-- SQL 执行性能分析，开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长 -->
    <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor">
        <property name="maxTime" value="100" />
        <!--SQL是否格式化 默认false-->
        <property name="format" value="true" />
    </plugin>
</plugins>
```

```java
//Spring boot方式
@EnableTransactionManagement
@Configuration
@MapperScan("com.baomidou.cloud.service.*.mapper*")
public class MybatisPlusConfig {

    /**
     * SQL执行效率插件
     */
    @Bean
    @Profile({"dev","test"})// 设置 dev test 环境开启
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }
}
```

::: warning 注意！参数说明：
- 参数：maxTime SQL 执行最大时长，超过自动停止运行，有助于发现问题。
- 参数：format SQL SQL是否格式化，默认false。
- 该插件只用于开发环境，不建议生产环境使用。
:::
