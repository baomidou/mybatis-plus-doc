---
title: 自定义ID生成器
date: 2021-12-14 19:03:10
permalink: /pages/568eb2/
article: false
---

::: tip

自 3.3.0 开始,默认使用雪花算法+UUID(不含中划线)

自定义示例工程：

- spring-boot 示例 ：[传送门](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-id-generator)

:::

| 方法     | 主键生成策略                                | 主键类型            | 说明                                                                                                            |
| -------- | ------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| nextId   | ASSIGN_ID，~~ID_WORKER~~，~~ID_WORKER_STR~~ | Long,Integer,String | 支持自动转换为 String 类型，但数值类型不支持自动转换，需精准匹配，例如返回 Long，实体主键就不支持定义为 Integer |
| nextUUID | ASSIGN_UUID，~~UUID~~                       | String              | 默认不含中划线的 UUID 生成                                                                                      |

## Spring-Boot

### 方式一：声明为 Bean 供 Spring 扫描注入

```java
@Component
public class CustomIdGenerator implements IdentifierGenerator {
    @Override
    public Long nextId(Object entity) {
      	//可以将当前传入的class全类名来作为bizKey,或者提取参数来生成bizKey进行分布式Id调用生成.
      	String bizKey = entity.getClass().getName();
        //根据bizKey调用分布式ID生成
        long id = ....;
      	//返回生成的id值即可.
        return id;
    }
}
```

### 方式二：使用配置类

```java
@Bean
public IdentifierGenerator idGenerator() {
    return new CustomIdGenerator();
}
```

### 方式三：通过 MybatisPlusPropertiesCustomizer 自定义

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().setIdentifierGenerator(new CustomIdGenerator());
}
```

## Spring

### 方式一: XML 配置

```xml
<bean name="customIdGenerator" class="com.baomidou.samples.incrementer.CustomIdGenerator"/>

<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
		<property name="identifierGenerator" ref="customIdGenerator"/>
</bean>
```

### 方式二：注解配置

```java
@Bean
public GlobalConfig globalConfig() {
	GlobalConfig conf = new GlobalConfig();
	conf.setIdentifierGenerator(new CustomIdGenerator());
	return conf;
}
```
