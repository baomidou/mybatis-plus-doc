---
title: カスタムIDジェネレーター
sidebar:
  order: 12
---

MyBatis-Plus は柔軟なカスタムIDジェネレーター機能を提供し、開発者がビジネス要件に応じてID生成戦略をカスタマイズすることを可能にします。バージョン3.3.0以降、デフォルトでは Snowflake アルゴリズムとハイフンを含まないUUIDを組み合わせたID生成方式を使用しています。

**MyBatis-Plus の組み込み主キー生成戦略の比較**

| メソッド   | 主キー生成戦略 | 主キータイプ        | 説明                                                                                                            |
| ---------- | -------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| nextId     | ASSIGN_ID      | Long,Integer,String | String型への自動変換をサポートしますが、数値型は自動変換をサポートせず、正確な一致が必要です。例：Longを返す場合、エンティティの主キーはIntegerとして定義できません |
| nextUUID   | ASSIGN_UUID    | String             | デフォルトでハイフンを含まないUUIDを生成します |

## カスタマイズ方法

MyBatis-Plus は、カスタムIDジェネレーターを実装するための複数の方法を提供しています。以下にいくつかのサンプルプロジェクトと設定方法を示します。

### Spring Boot 統合

#### 方法1：Beanとして宣言しSpringにスキャンさせる

```java
@Component
public class CustomIdGenerator implements IdentifierGenerator {
    @Override
    public Long nextId(Object entity) {
        // エンティティクラス名をビジネスキーとして使用するか、パラメータからビジネスキーを抽出
        String bizKey = entity.getClass().getName();
        // ビジネスキーに基づいて分散ID生成サービスを呼び出し
        long id = ...; // 分散ID生成ロジックを呼び出し
        // 生成されたID値を返す
        return id;
    }
}
```

#### 方法2：設定クラスを使用

```java
@Bean
public IdentifierGenerator idGenerator() {
    return new CustomIdGenerator();
}
```

#### 方法3：MybatisPlusPropertiesCustomizerでカスタマイズ

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().setIdentifierGenerator(new CustomIdGenerator());
}
```

### Spring 統合

#### 方法1：XML設定

```xml
<bean name="customIdGenerator" class="com.example.CustomIdGenerator"/>
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
    <property name="identifierGenerator" ref="customIdGenerator"/>
</bean>
```

#### 方法2：アノテーション設定

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setIdentifierGenerator(new CustomIdGenerator());
    return conf;
}
```

## KeyGeneratorとの違い

MyBatis-Plus の `IdentifierGenerator` は主にデータベーステーブルの主キーIDを生成するために使用されます。一方、`KeyGenerator` はMyBatisフレームワークのインターフェースで、SQLステートメントの実行時にキー値を生成するために使用されます。通常、自動インクリメント主キーの生成やINSERTステートメント実行後に新しく生成されたIDを取得する場合に使用されます。

`IdentifierGenerator` は主キーIDの生成に特化しています。一方、`KeyGenerator` はより汎用的で、様々なキー値生成シナリオに使用できます。MyBatis-Plus を使用する場合、通常は `IdentifierGenerator` を使用して主キーIDを生成することを推奨します。MyBatis-Plus との統合がより密接で、より多くの利便性と機能を提供しているためです。
