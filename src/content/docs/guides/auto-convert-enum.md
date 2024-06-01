---
title: 自动映射枚举
sidebar:
  order: 8
---

我们在 mybatis 的 `EnumOrdinalTypeHandler(基于枚举常量序号)` 和 `EnumTypeHandler(基于枚举常量名)` 之外  
提供了更加灵活的枚举处理器 `MybatisEnumTypeHandler(基于枚举常量属性)`  
只需要对枚举进行声明,即可实现枚举的自动映射,未进行声明的枚举则根据 `mybatis`的`defaultEnumTypeHandler`
的默认值`EnumTypeHandler` 来进行映射

```java
public class User {
    private String name; // 名字
    private AgeEnum age; // 年龄
    private GradeEnum grade; // 年级
}
```

## 枚举声明为使用 `MybatisEnumTypeHandler(基于枚举常量属性)` 进行映射

### 一：属性使用 `@EnumValue` 注解，指定枚举值在数据库中存储的实际值。支持枚举类中的任意字段，如序号或编码。

```java

@Getter
@AllArgsConstructor
public enum GradeEnum {
    PRIMARY(1, "小学"),
    SECONDARY(2, "中学"),
    HIGH(3, "高中");

    @EnumValue // 标记数据库存的值是code
    private final int code;
    // 其他属性...
}
```

### 二：实现 `IEnum` 接口，实现 `getValue` 方法，指定枚举值在数据库中存储的实际值。支持枚举类中的任意字段，如序号或编码。

```java

@Getter
@AllArgsConstructor
public enum AgeEnum implements IEnum<Integer> {
    ONE(1, "一岁"),
    TWO(2, "二岁"),
    THREE(3, "三岁");

    private final int value;
    private final String desc;

    @Override
    public Integer getValue() {
        return this.value;
    }
}
```

## 未进行声明的枚举如何修改默认枚举处理器(对已声明的枚举无效)

### 修改全局 defaultEnumTypeHandler

yml 配置文件中配置：

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

或者其他

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
