---
title: 自定义ID生成器
sidebar:
  order: 12
---

MyBatis-Plus 提供了灵活的自定义ID生成器功能，允许开发者根据业务需求定制ID生成策略。从3.3.0版本开始，默认使用雪花算法结合不含中划线的UUID作为ID生成方式。

**MyBatis-Plus自带主键生成策略对比**

| 方法     | 主键生成策略       | 主键类型            | 说明                                                                                                            |
| -------- | ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| nextId   | ASSIGN_ID          | Long,Integer,String | 支持自动转换为String类型，但数值类型不支持自动转换，需精准匹配，例如返回Long，实体主键就不支持定义为Integer |
| nextUUID | ASSIGN_UUID        | String              | 默认不含中划线的UUID生成        |

## 如何自定义

MyBatis-Plus 提供了多种方式来实现自定义ID生成器，以下是一些示例工程和配置方法。

### Spring Boot 集成

#### 方式一：声明为Bean供Spring扫描注入

```java
@Component
public class CustomIdGenerator implements IdentifierGenerator {
    @Override
    public Long nextId(Object entity) {
        // 使用实体类名作为业务键，或者提取参数生成业务键
        String bizKey = entity.getClass().getName();
        // 根据业务键调用分布式ID生成服务
        long id = ...; // 调用分布式ID生成逻辑
        // 返回生成的ID值
        return id;
    }
}
```

#### 方式二：使用配置类

```java
@Bean
public IdentifierGenerator idGenerator() {
    return new CustomIdGenerator();
}
```

#### 方式三：通过MybatisPlusPropertiesCustomizer自定义

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().setIdentifierGenerator(new CustomIdGenerator());
}
```

### Spring 集成

#### 方式一：XML配置

```xml
<bean name="customIdGenerator" class="com.example.CustomIdGenerator"/>
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
    <property name="identifierGenerator" ref="customIdGenerator"/>
</bean>
```

#### 方式二：注解配置

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setIdentifierGenerator(new CustomIdGenerator());
    return conf;
}
```

## 与KeyGenerator的差异

MyBatis-Plus的`IdentifierGenerator`主要用于生成数据库表的主键ID，而`KeyGenerator`是MyBatis框架中的一个接口，用于在执行SQL语句时生成键值，通常用于生成自增主键或者在执行INSERT语句后获取新生成的ID。

`IdentifierGenerator`更加专注于主键ID的生成，而`KeyGenerator`则更加通用，可以用于多种键值生成场景。在使用MyBatis-Plus时，通常推荐使用`IdentifierGenerator`来生成主键ID，因为它与MyBatis-Plus的集成更加紧密，提供了更多的便利性和功能。
