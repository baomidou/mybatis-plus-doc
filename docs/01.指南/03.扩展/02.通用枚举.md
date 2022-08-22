---
title: 通用枚举
date: 2021-12-14 19:05:31
permalink: /pages/8390a4/
article: false
---

解决了繁琐的配置，让 mybatis 优雅的使用枚举属性！
从 3.5.2 版本开始只需完成 `步骤1: 声明通用枚举属性` 即可使用

> ~~自`3.1.0`开始，如果你无需使用原生枚举，可配置默认枚举来省略扫描通用枚举配置 [默认枚举配置](../config/#defaultEnumTypeHandler)~~
>
> - 升级说明:
>
>   `3.1.0` 以下版本改变了原生默认行为,升级时请将默认枚举设置为`EnumOrdinalTypeHandler`
>
> - 影响用户:
>
>   实体中使用原生枚举
>
> - 其他说明:
>
>   配置枚举包扫描的时候能提前注册使用注解枚举的缓存

## 步骤1: 声明通用枚举属性

> 方式一： 使用 @EnumValue 注解枚举属性 [完整示例](https://gitee.com/baomidou/mybatis-plus-samples/blob/master/mybatis-plus-sample-enum/src/main/java/com/baomidou/mybatisplus/samples/enums/enums/GradeEnum.java)

```java
public enum GradeEnum {

    PRIMARY(1, "小学"),  SECONDORY(2, "中学"),  HIGH(3, "高中");

    GradeEnum(int code, String descp) {
        this.code = code;
        this.descp = descp;
    }

    @EnumValue//标记数据库存的值是code
    private final int code;
    //。。。
}
```

> 方式二： 枚举属性，实现 IEnum 接口如下：

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

> 实体属性使用枚举类型

```java
public class User {
    /**
     * 名字
     * 数据库字段: name varchar(20)
     */
    private String name;

    /**
     * 年龄，IEnum接口的枚举处理
     * 数据库字段：age INT(3)
     */
    private AgeEnum age;


    /**
     * 年级，原生枚举（带{@link com.baomidou.mybatisplus.annotation.EnumValue}):
     * 数据库字段：grade INT(2)
     */
    private GradeEnum grade;
}
```

## ~~步骤2: 配置扫描通用枚举~~

- 注意!! 从 3.5.2 开始无需配置
- 注意!! spring mvc 配置参考，安装集成 MybatisSqlSessionFactoryBean 枚举包扫描，spring boot 例子配置如下：

示例工程：

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)

### 方式一：仅配置指定包内的枚举类使用 MybatisEnumTypeHandler

> 配置文件 resources/application.yml

```yml
mybatis-plus:
    # 支持统配符 * 或者 ; 分割
    typeEnumsPackage: com.baomidou.springboot.entity.enums
  ....
```

当添加这个配置后，mybatis-plus 提供的 `MybatisSqlSessionFactoryBean` 会自动扫描包内合法的枚举类（使用了 `@EnumValue` 注解，或者实现了 `IEnum` 接口），分别为这些类注册使用 `MybatisEnumTypeHandler`。

换句话说，只有指定包下的枚举类会使用新的 TypeHandler。其他包下，或者包内没有做相关改造的枚举类，仍然会使用 mybatis 的 DefaultEnumTypeHandler。

### 方式二：直接指定 DefaultEnumTypeHandler

此方式用来 `全局` 修改 mybatis 使用的 EnumTypeHandler。

> 配置文件 resources/application.yml

```yml
mybatis-plus:
    # 修改 mybatis 的 DefaultEnumTypeHandler
    configuration:
        default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
```

> 自定义配置类 MybatisPlusAutoConfiguration

```java

@Configuration
public class MybatisPlusAutoConfiguration {

    @Bean
    public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
        return properties -> {
            GlobalConfig globalConfig = properties.getGlobalConfig();
            globalConfig.setBanner(false);
            MybatisConfiguration configuration = new MybatisConfiguration();
            configuration.setDefaultEnumTypeHandler(MybatisEnumTypeHandler.class);
            properties.setConfiguration(configuration);
        };
    }
}

```

## 如何序列化枚举值为前端返回值？

### Jackson

#### 一、重写 toString 方法

##### springboot

```java
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizer(){
        return builder -> builder.featuresToEnable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
    }
```

##### jackson

```java
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
```

以上两种方式任选其一,然后在枚举中复写 toString 方法即可.

#### 二、注解处理

```java
public enum GradeEnum {

    PRIMARY(1, "小学"),  SECONDORY(2, "中学"),  HIGH(3, "高中");

    GradeEnum(int code, String descp) {
        this.code = code;
        this.descp = descp;
    }

    @EnumValue
  	@JsonValue	//标记响应json值
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

以上两种方式任选其一,然后在枚举中复写 toString 方法即可.
