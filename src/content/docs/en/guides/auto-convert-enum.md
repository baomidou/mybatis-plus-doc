---
title: Auto-Mapping Enums
sidebar:
  order: 8
---

In addition to MyBatis's built-in `EnumOrdinalTypeHandler` (based on enum constant ordinal) and `EnumTypeHandler` (based on enum constant name), we provide a more flexible enum processor: `MybatisEnumTypeHandler` (based on enum constant properties).  
Simply declare your enums to enable automatic enum mapping.  
Undeclared enums will be mapped according to MyBatis's `defaultEnumTypeHandler`, which defaults to `EnumTypeHandler`.

```java
public class User {
    private String name; // Name
    private AgeEnum age; // Age
    private GradeEnum grade; // Grade
}
```

## Enum Declaration

Declare that the enum should be mapped using `MybatisEnumTypeHandler` (based on enum constant properties).

### Method 1: Annotation Marking

Use the `@EnumValue` annotation on the enum field to specify the actual value stored in the database. Supports any field in the enum class, such as ordinal or code.

```java

@Getter
@AllArgsConstructor
public enum GradeEnum {
    PRIMARY(1, "小学"),
    SECONDARY(2, "中学"),
    HIGH(3, "高中");

    @EnumValue // Marks the code as the value stored in the database
    private final int code;
    // Other properties...
}
```

### Method 2: Interface Implementation

Implement the `IEnum` interface and override the `getValue` method to specify the actual value stored in the database. Supports any field in the enum class, such as ordinal or code.

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

## Undeclared Enums

Undeclared enums will be mapped using MyBatis's `defaultEnumTypeHandler`, which defaults to `EnumTypeHandler`.  
You can modify this via global configuration, but this won't affect enums declared using the methods above.

### Modifying the Global defaultEnumTypeHandler

Configure in YML file:

```yml
mybatis-plus:
  configuration:
    default-enum-type-handler: xx.xx.xx.MyEnumTypeHandler
```

Or via a custom configuration class:

```java

@Configuration
public class MybatisPlusAutoConfiguration {

    @Bean
    public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
        return properties -> {
            GlobalConfig globalConfig = properties.getGlobalConfig();
            globalConfig.setBanner(false);
            MybatisPlusProperties.CoreConfiguration configuration = new MybatisPlusProperties.CoreConfiguration();
            configuration.setDefaultEnumTypeHandler(MyEnumTypeHandler.class);
            properties.setConfiguration(configuration);
        };
    }
}
```

Or other methods.

## Additional Reference: Serializing Enum Values for Frontend Responses

### Jackson

#### Method 1: Override toString Method

##### Spring Boot

```java

@Bean
public Jackson2ObjectMapperBuilderCustomizer customizer() {
    return builder -> builder.featuresToEnable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
}
```

##### Standalone Jackson

```java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
```

Override the toString method in your enum class. Choose either of the above configuration methods.

#### Method 2: Annotation Processing

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
    @JsonValue // Marks the field for JSON serialization
    private final int code;
}
```

### Fastjson

#### Method 1: Override toString Method

##### Global Configuration

```java
FastJsonConfig config = new FastJsonConfig();
config.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
```

##### Local Configuration

```java

@JSONField(serialzeFeatures = SerializerFeature.WriteEnumUsingToString)
private UserStatus status;
```

Override the toString method in your enum class. Choose either of the above configuration methods.

By following these steps, you can elegantly use enum properties in MyBatis-Plus and easily serialize enum values into the format required by your frontend.
