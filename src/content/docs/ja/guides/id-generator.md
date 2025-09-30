---
title: カスタムIDジェネレータ
sidebar:
  order: 12
---

MyBatis-Plusは柔軟なカスタムIDジェネレータ機能を提供しており、開発者はビジネス要件に基づいてID生成戦略をカスタマイズできます。バージョン3.3.0以降、デフォルトではスノーフレークアルゴリズムとハイフンなしのUUIDを組み合わせた方式がID生成方法として使用されています。

**MyBatis-Plus組み込み主キー生成戦略の比較**

| メソッド   | 主キー生成戦略     | 主キー型            | 説明                                                                                                            |
| ---------- | ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| nextId     | ASSIGN_ID          | Long,Integer,String | String型への自動変換をサポート。数値型は自動変換をサポートせず、正確な一致が必要です。例: Longを返す場合、エンティティの主キーはIntegerとして定義できません |
| nextUUID   | ASSIGN_UUID        | String              | デフォルトではハイフンなしのUUIDを生成        |

## カスタマイズ方法

MyBatis-PlusはカスタムIDジェネレータを実装するための複数の方法を提供しています。以下にいくつかのサンプルプロジェクトと設定方法を示します。

### Spring Boot 統合

#### 方法1: Beanとして宣言しSpringにスキャン・インジェクションさせる

```java
@Component
public class CustomIdGenerator implements IdentifierGenerator {
    @Override
    public Long nextId(Object entity) {
        // エンティティクラス名を業務キーとして使用、またはパラメータを抽出して業務キーを生成
        String bizKey = entity.getClass().getName();
        // 業務キーに基づいて分散ID生成サービスを呼び出し
        long id = ...; // 分散ID生成ロジックを呼び出す
        // 生成されたID値を返す
        return id;
    }
}
```

#### 方法2: 設定クラスを使用

```java
@Bean
public IdentifierGenerator idGenerator() {
    return new CustomIdGenerator();
}
```

#### 方法3: MybatisPlusPropertiesCustomizerでカスタマイズ

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().setIdentifierGenerator(new CustomIdGenerator());
}
```

### Spring 統合

#### 方法1: XML設定

```xml
<bean name="customIdGenerator" class="com.example.CustomIdGenerator"/>
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
    <property name="identifierGenerator" ref="customIdGenerator"/>
</bean>
```

#### 方法2: アノテーション設定

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setIdentifierGenerator(new CustomIdGenerator());
    return conf;
}
```

## KeyGeneratorとの違い

MyBatis-Plusの`IdentifierGenerator`は主にデータベーステーブルの主キーIDを生成するために使用されます。一方、`KeyGenerator`はMyBatisフレームワークのインターフェースで、SQL文の実行時にキー値を生成するために使用され、通常は自動インクリメント主キーの生成やINSERT文実行後に新しく生成されたIDを取得するために使用されます。

`IdentifierGenerator`は主キーIDの生成に特化していますが、`KeyGenerator`はより汎用的で、さまざまなキー値生成シナリオに使用できます。MyBatis-Plusを使用する場合、通常は`IdentifierGenerator`を使用して主キーIDを生成することを推奨します。これはMyBatis-Plusとの統合がより緊密で、より多くの利便性と機能を提供するためです。
