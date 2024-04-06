---
title: 乐观锁插件
date: 2021-12-14 19:12:21
permalink: /pages/0d93c0/
article: false
---

## OptimisticLockerInnerInterceptor

> 当要更新一条记录的时候，希望这条记录没有被别人更新  
> 乐观锁实现方式：
>
> > - 取出记录时，获取当前 version
> > - 更新时，带上这个 version
> > - 执行更新时， set version = newVersion where version = oldVersion
> > - 如果 version 不对，就更新失败

**乐观锁配置需要两步**

### 1.配置插件

spring xml 方式:

```xml
<bean class="com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor" id="optimisticLockerInnerInterceptor"/>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="optimisticLockerInnerInterceptor"/>
        </list>
    </property>
</bean>
```

spring boot 注解方式:

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
    return interceptor;
}
```

### 2.在实体类的字段上加上`@Version`注解

```java
@Version
private Integer version;
```

::: tip 说明:

- **支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime**
- 整数类型下 `newVersion = oldVersion + 1`
- `newVersion` 会回写到 `entity` 中
- 仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法
- **在 `update(entity, wrapper)` 方法下, `wrapper` 不能复用!!!**
  :::

示例：

```java
// Spring Boot 方式
@Configuration
@MapperScan("按需修改")
public class MybatisPlusConfig {
    /**
     * 旧版
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }

    /**
     * 新版
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }
}
```
