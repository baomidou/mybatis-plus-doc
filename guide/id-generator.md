# 自定义ID生成器

::: tip
自3.2.1开始，配合ID_WORKER，ID_WORKER_STR一起使用。

默认使用雪花算法(com.baomidou.mybatisplus.core.incrementer.DefaultIdGenerator)。
:::

```java
//方式一
@Component
public class CustomIdGenerator implements IdGenerator {
    @Override
    public long nextId(Object entity) {
        //实现自定义ID生成...
        return System.currentTimeMillis();
    }
}

//方式二
@Bean
public IdGenerator idGenerator() {
    return new CustomIdGenerator();
}

//方式三
@Bean
public GlobalConfig globalConfiguration() {
    GlobalConfig conf = new GlobalConfig();
    conf.setIdGenerator(new CustomIdGenerator());
    return conf;
}
```