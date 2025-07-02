---
title: Auto-mapping Enums
sidebar:
  order: 8
---

In addition to MyBatis's `EnumOrdinalTypeHandler` (based on enum constant ordinal) and `EnumTypeHandler` (based on enum constant name),  
we provide a more flexible enum handler: `MybatisEnumTypeHandler` (based on enum constant properties).  
Simply declare the enum to enable auto-mapping.  
Undeclared enums will be mapped according to MyBatis's `defaultEnumTypeHandler`, which defaults to `EnumTypeHandler`.

```java
public class User {
    private String name; // Name
    private AgeEnum age; // Age
    private GradeEnum grade; // Grade
}
```

## Enum Declaration

Declare the enum to use `MybatisEnumTypeHandler` (based on enum constant properties) for mapping.

### Method 1: Annotation Marking

Use the `@EnumValue` annotation on enum properties to specify the actual value stored in the database. Supports any field in the enum class, such as ordinal or code.

```java

@Getter
@AllArgsConstructor
public enum GradeEnum {
    PRIMARY(1, "Primary School"),
    SECONDARY(2, "Secondary School"),
    HIGH(3, "High School");

    @EnumValue // Marks the value stored in the database as 'code'
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
    ONE(1, "One year old"),
    TWO(2, "Two years old"),
    THREE(3, "Three years old");

    private final int value;
    private final String desc;

    @Override
    public Integer getValue() {
        return this.value;
    }
}
```

## Undeclared Enums

Undeclared enums will use MyBatis's `defaultEnumTypeHandler`, which defaults to `EnumTypeHandler`.  
You can modify the global configuration to change this, but it will not affect enums declared using the above methods.

### Modifying the Global `defaultEnumTypeHandler`

Configure in the YML file:

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

## Extra Reference: How to Serialize Enum Values for Frontend Responses

### Jackson

#### 1. Override the `toString` Method

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

Override the `toString` method in the enum. Choose either of the above two approaches.

#### 2. Annotation Processing

```java
public enum GradeEnum {
    PRIMARY(1, "Primary School"),
    SECONDORY(2, "Secondary School"),
    HIGH(3, "High School");

    GradeEnum(int code, String descp) {
        this.code = code;
        this.descp = descp;
    }

    @EnumValue
    @JsonValue // Marks the JSON response value
    private final int code;
}
```

### Fastjson

#### 1. Override the `toString` Method

##### Global Approach

```java
FastJsonConfig config = new FastJsonConfig();
config.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
```

##### Local Approach

```java

@JSONField(serialzeFeatures = SerializerFeature.WriteEnumUsingToString)
private UserStatus status;
```

Override the `toString` method in the enum. Choose either of the above two approaches.

By following these steps, you can elegantly use enum properties in MyBatis-Plus and easily serialize enum values into the format required by the frontend.
