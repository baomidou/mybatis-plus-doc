---
title: Custom ID Generator
sidebar:
  order: 12
---

MyBatis-Plus provides a flexible custom ID generator feature, allowing developers to tailor ID generation strategies according to business needs. Starting from version 3.3.0, it defaults to using the snowflake algorithm combined with a UUID without hyphens as the ID generation method.

**Comparison of MyBatis-Plus Built-in Primary Key Generation Strategies**

| Method    | Primary Key Strategy | Primary Key Type       | Description                                                                                                           |
| --------- | -------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| nextId    | ASSIGN_ID            | Long, Integer, String  | Supports automatic conversion to String type, but numeric types do not support auto-conversion. Requires exact matching, e.g., if it returns Long, the entity primary key cannot be defined as Integer. |
| nextUUID  | ASSIGN_UUID          | String                 | Defaults to generating UUID without hyphens.                                                                         |

## How to Customize

MyBatis-Plus offers multiple ways to implement custom ID generators. Below are some example projects and configuration methods.

### Spring Boot Integration

#### Method 1: Declare as a Bean for Spring to Scan and Inject

```java
@Component
public class CustomIdGenerator implements IdentifierGenerator {
    @Override
    public Long nextId(Object entity) {
        // Use the entity class name as a business key or extract parameters to generate a business key
        String bizKey = entity.getClass().getName();
        // Call a distributed ID generation service based on the business key
        long id = ...; // Invoke distributed ID generation logic
        // Return the generated ID value
        return id;
    }
}
```

#### Method 2: Use a Configuration Class

```java
@Bean
public IdentifierGenerator idGenerator() {
    return new CustomIdGenerator();
}
```

#### Method 3: Customize via MybatisPlusPropertiesCustomizer

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().setIdentifierGenerator(new CustomIdGenerator());
}
```

### Spring Integration

#### Method 1: XML Configuration

```xml
<bean name="customIdGenerator" class="com.example.CustomIdGenerator"/>
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
    <property name="identifierGenerator" ref="customIdGenerator"/>
</bean>
```

#### Method 2: Annotation Configuration

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setIdentifierGenerator(new CustomIdGenerator());
    return conf;
}
```

## Differences from KeyGenerator

MyBatis-Plus's `IdentifierGenerator` is primarily used to generate primary key IDs for database tables, whereas `KeyGenerator` is an interface in the MyBatis framework used to generate key values when executing SQL statements, typically for generating auto-incremented primary keys or obtaining newly generated IDs after INSERT statements.

`IdentifierGenerator` focuses more on primary key ID generation, while `KeyGenerator` is more general-purpose and can be used for various key-value generation scenarios. When using MyBatis-Plus, it is generally recommended to use `IdentifierGenerator` for generating primary key IDs, as it integrates more tightly with MyBatis-Plus, offering greater convenience and functionality.
