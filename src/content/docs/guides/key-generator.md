---
title: 主键生成策略
sidebar:
  order: 11
---

在 MyBatis-Plus 中，主键生成策略是一个重要的概念，它决定了如何为数据库表中的记录生成唯一的主键值。以下是关于主键生成策略的详细说明和配置方法。

## 主键生成策略概述

主键生成策略必须使用 `INPUT` 类型，这意味着主键值需要由用户在插入数据时提供。MyBatis-Plus 支持在父类中定义 `@KeySequence` 注解，子类可以继承使用。

从版本 3.3.0 开始，MyBatis-Plus 会自动识别主键类型，因此不再需要手动指定主键类型。

MyBatis-Plus 内置支持多种数据库的主键生成策略，包括：

- DB2KeyGenerator
- H2KeyGenerator
- KingbaseKeyGenerator
- OracleKeyGenerator
- PostgreKeyGenerator

如果内置的主键生成策略不能满足需求，可以通过实现 `IKeyGenerator` 接口来扩展自定义的主键生成策略。

## 示例

下面是一个使用 `@KeySequence` 注解的实体类示例：

```java
@KeySequence(value = "SEQ_ORACLE_STRING_KEY", clazz = String.class)
public class YourEntity {

    @TableId(value = "ID_STR", type = IdType.INPUT)
    private String idStr;

    // 其他字段和方法...
}
```

在这个示例中，`YourEntity` 类使用了 `@KeySequence` 注解来指定 Oracle 数据库中的序列 `SEQ_ORACLE_STRING_KEY` 来生成主键值，主键类型为 `String`。

## Spring Boot 配置

### 方式一：使用配置类

在 Spring Boot 应用中，可以通过配置类来设置主键生成策略：

```java
@Bean
public IKeyGenerator keyGenerator() {
    return new H2KeyGenerator();
}
```

### 方式二：通过 MybatisPlusPropertiesCustomizer 自定义

也可以通过 `MybatisPlusPropertiesCustomizer` 来自定义主键生成策略：

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().getDbConfig().setKeyGenerator(new H2KeyGenerator());
}
```

## Spring 配置

### 方式一: XML 配置

在传统的 Spring 应用中，可以通过 XML 配置来设置主键生成策略：

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

使用注解配置主键生成策略：

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setDbConfig(new GlobalConfig.DbConfig().setKeyGenerator(new H2KeyGenerator()));
    return conf;
}
```

以上配置方法可以根据实际项目需求选择合适的方式来设置主键生成策略。
