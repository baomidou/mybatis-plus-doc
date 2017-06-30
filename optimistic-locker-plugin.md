# 乐观锁插件

## 插件配置

```xml
<bean class="com.baomidou.mybatisplus.plugins.OptimisticLockerInterceptor"/>
```

## 注解实体字段 `@Version` 必须要！

```java
public class user {

    @Version
    private Integer version;

    ...
}
```

!> 特别说明： **仅支持int,Integer,long,Long,Date,Timestamp
