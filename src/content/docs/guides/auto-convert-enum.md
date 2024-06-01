---
title: 自动映射枚举
sidebar:
  order: 8
---

MyBatis-Plus 是一个增强工具，它在 MyBatis 的基础上提供了许多便捷的功能，其中包括对枚举类型的自动映射。自动映射枚举功能旨在简化开发者在处理数据库与Java枚举类型之间的转换时的配置和编码工作。

MyBatis-Plus 的自动映射枚举功能主要涉及以下几个方面：

1. **枚举类型处理**：MyBatis-Plus 提供了对枚举类型的内置支持，可以自动将Java枚举类型映射到数据库中的特定数据类型，如整型或字符串。这样，开发者无需手动编写复杂的映射逻辑。

2. **注解支持**：通过使用 `@EnumValue` 注解，开发者可以指定枚举值在数据库中存储的实际值。这通常是枚举中的一个字段，如序号或编码。

3. **接口实现**：枚举类型可以实现 `IEnum` 接口，该接口定义了一个 `getValue` 方法，用于返回存储在数据库中的值。MyBatis-Plus 会自动识别并使用这个方法进行映射。

通过这些功能，MyBatis-Plus 大大简化了枚举类型的处理，使得开发者可以更加专注于业务逻辑的实现，而不必担心底层的数据映射问题。

## 声明通用枚举属性

实体属性使用枚举类型

```java
public class User {
    private String name; // 名字
    private AgeEnum age; // 年龄
    private GradeEnum grade; // 年级
}
```

### 方式一：使用 @EnumValue 注解枚举属性

```java
public enum GradeEnum {
    PRIMARY(1, "小学"),
    SECONDORY(2, "中学"),
    HIGH(3, "高中");

    GradeEnum(int code, String descp) {
        this.code = code;
        this.descp = descp;
    }

    @EnumValue // 标记数据库存的值是code
    private final int code;
    // 其他属性...
}
```

### 方式二：枚举属性实现 IEnum 接口

```java
public enum AgeEnum implements IEnum<Integer> {
    ONE(1, "一岁"),
    TWO(2, "二岁"),
    THREE(3, "三岁");

    private int value;
    private String desc;

    @Override
    public Integer getValue() {
        return this.value;
    }
}
```

## 非 MyBatis-Plus 枚举如何指定映射处理

关于在 MyBatis-Plus 枚举规则之外的枚举如何指定映射处理,该操作不会影响 MyBatis-Plus 规则内的枚举映射处理。

### 修改全局 DefaultEnumTypeHandler

```yml
mybatis-plus:
  configuration:
    default-enum-type-handler: xx.xx.xx.MyEnumTypeHandler
```

或者通过自定义配置类：

```java
@Configuration
public class MybatisPlusAutoConfiguration {

    @Bean
    public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
        return properties -> {
            GlobalConfig globalConfig = properties.getGlobalConfig();
            globalConfig.setBanner(false);
            MybatisConfiguration configuration = new MybatisConfiguration();
            configuration.setDefaultEnumTypeHandler(MyEnumTypeHandler.class);
            properties.setConfiguration(configuration);
        };
    }
}
```

通过这些配置，你可以根据项目需求灵活地定制枚举类型的映射处理，确保 MyBatis-Plus 与你的应用程序无缝集成。

## 号外参考: 如何序列化枚举值为前端返回值

### Jackson

#### 一、重写 toString 方法

##### Spring Boot

```java
@Bean
public Jackson2ObjectMapperBuilderCustomizer customizer() {
    return builder -> builder.featuresToEnable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
}
```

##### Jackson 独立使用

```java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
```

在枚举中重写 toString 方法，以上两种方式任选其一。

#### 二、注解处理

```java
public enum GradeEnum {
    PRIMARY(1, "小学"),
    SECONDORY(2, "中学"),
    HIGH(3, "高中");

    GradeEnum(int code, String descp) {
        this.code = code;
        this.descp = descp;
    }

    @EnumValue
    @JsonValue // 标记响应json值
    private final int code;
}
```

### Fastjson

#### 一、重写 toString 方法

##### 全局处理方式

```java
FastJsonConfig config = new FastJsonConfig();
config.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
```

##### 局部处理方式

```java
@JSONField(serialzeFeatures= SerializerFeature.WriteEnumUsingToString)
private UserStatus status;
```

在枚举中重写 toString 方法，以上两种方式任选其一。

通过以上步骤，你可以优雅地在 MyBatis-Plus 中使用枚举属性，并且能够方便地将枚举值序列化为前端所需的格式。
