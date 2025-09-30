---
title: 列挙型の自動マッピング
sidebar:
  order: 8
---

MyBatis の `EnumOrdinalTypeHandler`（列挙定数の序数ベース）および `EnumTypeHandler`（列挙定数名ベース）に加えて、
より柔軟な列挙型ハンドラーである `MybatisEnumTypeHandler`（列挙定数プロパティベース）を提供しています。
列挙型を宣言するだけで、列挙型の自動マッピングを実現できます。
宣言されていない列挙型は、`mybatis` の `defaultEnumTypeHandler` のデフォルト値である `EnumTypeHandler` に基づいてマッピングされます。

```java
public class User {
    private String name; // 名前
    private AgeEnum age; // 年齢
    private GradeEnum grade; // 学年
}
```

## 列挙型の宣言

`MybatisEnumTypeHandler`（列挙定数プロパティベース）を使用してマッピングする列挙型を宣言します。

### 方法 1: アノテーションによるマーキング

列挙型のプロパティに `@EnumValue` アノテーションを使用し、データベースに保存される実際の列挙値を指定します。列挙クラス内の任意のフィールド（序数やコードなど）をサポートします。

```java

@Getter
@AllArgsConstructor
public enum GradeEnum {
    PRIMARY(1, "小学"),
    SECONDARY(2, "中学"),
    HIGH(3, "高中");

    @EnumValue // データベースに保存される値が code であることを示す
    private final int code;
    // その他のプロパティ...
}
```

### 方法 2: インターフェースの実装

`IEnum` インターフェースを実装し、`getValue` メソッドを実装して、データベースに保存される実際の列挙値を指定します。列挙クラス内の任意のフィールド（序数やコードなど）をサポートします。

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

## 未宣言の列挙型

宣言されていない列挙型は、`mybatis` の `defaultEnumTypeHandler` のデフォルト値である `EnumTypeHandler` を使用してマッピングされます。
グローバル設定を変更することで変更できますが、上記の手順で宣言された列挙型には影響しません。

### グローバルな defaultEnumTypeHandler の変更

YAML 設定ファイルで設定：

```yml
mybatis-plus:
  configuration:
    default-enum-type-handler: xx.xx.xx.MyEnumTypeHandler
```

または、カスタム設定クラスを使用：

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

またはその他の方法

## 参考情報: 列挙値をフロントエンドの戻り値としてシリアライズする方法

### Jackson

#### 方法 1: toString メソッドのオーバーライド

##### Spring Boot

```java

@Bean
public Jackson2ObjectMapperBuilderCustomizer customizer() {
    return builder -> builder.featuresToEnable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
}
```

##### Jackson 単体使用

```java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
```

列挙型で toString メソッドをオーバーライドし、上記のいずれかの方法を選択します。

#### 方法 2: アノテーションによる処理

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
    @JsonValue // レスポンス JSON 値をマーク
    private final int code;
}
```

### Fastjson

#### 方法 1: toString メソッドのオーバーライド

##### グローバルな処理方法

```java
FastJsonConfig config = new FastJsonConfig();
config.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
```

##### ローカルな処理方法

```java

@JSONField(serialzeFeatures = SerializerFeature.WriteEnumUsingToString)
private UserStatus status;
```

列挙型で toString メソッドをオーバーライドし、上記のいずれかの方法を選択します。

以上の手順により、MyBatis-Plus で列挙型プロパティをエレガントに使用し、列挙値をフロントエンドに必要な形式に簡単にシリアライズできるようになります。
