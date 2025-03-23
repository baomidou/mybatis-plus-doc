---
title: 列挙型の自動マッピング
sidebar:
  order: 8
---

MyBatisの `EnumOrdinalTypeHandler(列挙定数の序数に基づく)` と `EnumTypeHandler(列挙定数名に基づく)` に加えて、  
より柔軟な列挙型ハンドラ `MybatisEnumTypeHandler(列挙定数プロパティに基づく)` を提供します。  
列挙型に宣言を行うだけで、自動的なマッピングを実現できます。  
宣言されていない列挙型は、`mybatis` の `defaultEnumTypeHandler` のデフォルト値である `EnumTypeHandler` を使用してマッピングされます。

```java
public class User {
    private String name; // 名前
    private AgeEnum age; // 年齢
    private GradeEnum grade; // 学年
}
```

## 列挙型の宣言

`MybatisEnumTypeHandler(列挙定数プロパティに基づく)` を使用する列挙型を宣言します

### 方法1：アノテーションによるマーキング

列挙型のプロパティに `@EnumValue` アノテーションを使用し、データベースに保存する実際の値を指定します。列挙クラスの任意のフィールド（序数やコードなど）を指定可能です。

```java
@Getter
@AllArgsConstructor
public enum GradeEnum {
    PRIMARY(1, "小学校"),
    SECONDARY(2, "中学校"), 
    HIGH(3, "高等学校");

    @EnumValue // データベースに保存されている値がcodeであることをマークする
    private final int code;
    // その他のプロパティ...
}
```

### 方法2：インターフェースの実装

`IEnum` インターフェースを実装し、`getValue` メソッドでデータベースに保存する実際の値を指定します。列挙クラスの任意のフィールド（序数やコードなど）を指定可能です。

```java
@Getter
@AllArgsConstructor
public enum AgeEnum implements IEnum<Integer> {
    ONE(1, "1歳"),
    TWO(2, "2歳"),
    THREE(3, "3歳");

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
グローバル設定を変更することで変更可能ですが、上記の方法で宣言された列挙型には影響しません。

### グローバルなdefaultEnumTypeHandlerの変更

YML設定ファイルでの設定：

```yml
mybatis-plus:
  configuration:
    default-enum-type-handler: xx.xx.xx.MyEnumTypeHandler
```

またはカスタム設定クラスを使用：

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

## 参考：フロントエンドへの列挙値のシリアライズ方法

### Jackson

#### 方法1：toStringメソッドのオーバーライド

##### Spring Bootの場合

```java
@Bean
public Jackson2ObjectMapperBuilderCustomizer customizer() {
    return builder -> builder.featuresToEnable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
}
```

##### Jackson単体使用の場合

```java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
```

列挙型で toString メソッドをオーバーライドし、上記いずれかの方法を選択します。

#### 方法2：アノテーション処理

```java
public enum GradeEnum {
    PRIMARY(1, "小学校"),
    SECONDARY(2, "中学校"),
    HIGH(3, "高校");

    GradeEnum(int code, String descp) {
        this.code = code;
        this.descp = descp;
    }

    @EnumValue
    @JsonValue // jsonレスポンス値であることをマーク
    private final int code;
}
```

### Fastjson

#### 方法1：toString メソッドのオーバーライド

##### グローバル設定

```java
FastJsonConfig config = new FastJsonConfig();
config.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
```

##### 個別フィールド設定

```java

@JSONField(serialzeFeatures = SerializerFeature.WriteEnumUsingToString)
private UserStatus status;
```

列挙型でtoStringメソッドをオーバーライドし、上記いずれかの方法を選択します。

これらの手順により、MyBatis-Plus で列挙型プロパティを効果的に使用し、フロントエンドに適した形式で列挙値をシリアライズできます。
