---
title: 主键策略
date: 2021-12-14 19:02:09
permalink: /pages/e131bd/
article: false
---

::: tip

**主键生成策略必须使用 INPUT**

支持父类定义 @KeySequence 子类继承使用

~~支持主键类型指定(3.3.0 开始自动识别主键类型)~~

内置支持：

- DB2KeyGenerator
- H2KeyGenerator
- KingbaseKeyGenerator
- OracleKeyGenerator
- PostgreKeyGenerator

如果内置支持不满足你的需求，可实现 IKeyGenerator 接口来进行扩展.

:::

举个栗子

```java
@KeySequence(value = "SEQ_ORACLE_STRING_KEY", clazz = String.class)
public class YourEntity {

    @TableId(value = "ID_STR", type = IdType.INPUT)
    private String idStr;

}
```

## Spring-Boot

### 方式一：使用配置类

```java
@Bean
public IKeyGenerator keyGenerator() {
    return new H2KeyGenerator();
}
```

### 方式二：通过 MybatisPlusPropertiesCustomizer 自定义

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().getDbConfig().setKeyGenerator(new H2KeyGenerator());
}
```

## Spring

### 方式一: XML 配置

```xml
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
   <property name="dbConfig" ref="dbConfig"/>
</bean>

<bean id="dbConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig.DbConfig">
   <property name="keyGenerator" ref="keyGenerator"/>
</bean>

<bean id="keyGenerator" class="com.baomidou.mybatisplus.extension.incrementer.H2KeyGenerator"/>
```

### 方式二：注解配置

```java
@Bean
public GlobalConfig globalConfig() {
	GlobalConfig conf = new GlobalConfig();
	conf.setDbConfig(new GlobalConfig.DbConfig().setKeyGenerator(new H2KeyGenerator()));
	return conf;
}
```
