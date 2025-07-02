---
title: Primary Key Generation Strategy
sidebar:
  order: 11
---

In MyBatis-Plus, the primary key generation strategy is an important concept that determines how to generate unique primary key values for records in database tables. Below is a detailed explanation and configuration methods for primary key generation strategies.

## Overview of Primary Key Generation Strategy

The primary key generation strategy must use the `INPUT` type, which means the primary key value needs to be provided by the user when inserting data. MyBatis-Plus supports defining the `@KeySequence` annotation in a parent class, which can be inherited and used by child classes.

Starting from version 3.3.0, MyBatis-Plus automatically recognizes the primary key type, so manual specification of the primary key type is no longer required.

MyBatis-Plus natively supports primary key generation strategies for various databases, including:

- DB2KeyGenerator
- H2KeyGenerator
- KingbaseKeyGenerator
- OracleKeyGenerator
- PostgreKeyGenerator

If the built-in primary key generation strategies do not meet your requirements, you can extend custom primary key generation strategies by implementing the `IKeyGenerator` interface.

## Example

Here is an example of an entity class using the `@KeySequence` annotation:

```java
@KeySequence(value = "SEQ_ORACLE_STRING_KEY", clazz = String.class)
public class YourEntity {

    @TableId(value = "ID_STR", type = IdType.INPUT)
    private String idStr;

    // Other fields and methods...
}
```

In this example, the `YourEntity` class uses the `@KeySequence` annotation to specify the sequence `SEQ_ORACLE_STRING_KEY` in an Oracle database to generate primary key values, with the primary key type being `String`.

## Spring Boot Configuration

### Method 1: Using a Configuration Class

In a Spring Boot application, you can set the primary key generation strategy via a configuration class:

```java
@Bean
public IKeyGenerator keyGenerator() {
    return new H2KeyGenerator();
}
```

### Method 2: Customizing via MybatisPlusPropertiesCustomizer

You can also customize the primary key generation strategy using `MybatisPlusPropertiesCustomizer`:

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().getDbConfig().setKeyGenerator(new H2KeyGenerator());
}
```

## Spring Configuration

### Method 1: XML Configuration

In traditional Spring applications, you can set the primary key generation strategy via XML configuration:

```xml
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
   <property name="dbConfig" ref="dbConfig"/>
</bean>

<bean id="dbConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig.DbConfig">
   <property name="keyGenerator" ref="keyGenerator"/>
</bean>

<bean id="keyGenerator" class="com.baomidou.mybatisplus.extension.incrementer.H2KeyGenerator"/>
```

### Method 2: Annotation Configuration

Configure the primary key generation strategy using annotations:

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setDbConfig(new GlobalConfig.DbConfig().setKeyGenerator(new H2KeyGenerator()));
    return conf;
}
```

The above configuration methods allow you to choose the appropriate way to set the primary key generation strategy based on your project requirements.
