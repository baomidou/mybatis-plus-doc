---
title: 主キー生成戦略
sidebar:
  order: 11
---

MyBatis-Plusにおいて、主キー生成戦略は重要な概念で、データベーステーブルのレコードに一意の主キー値を生成する方法を決定します。以下に主キー生成戦略の詳細な説明と設定方法を示します。

## 主キー生成戦略の概要

主キー生成戦略は `INPUT` タイプを使用する必要があります。これは、主キー値をユーザーがデータ挿入時に提供する必要があることを意味します。MyBatis-Plus は、親クラスで `@KeySequence` アノテーションを定義し、子クラスで継承して使用することをサポートしています。

バージョン 3.3.0 以降、MyBatis-Plus は主キータイプを自動的に認識するため、手動で主キータイプを指定する必要がなくなりました。

MyBatis-Plus は、以下のような複数のデータベースの主キー生成戦略を組み込みでサポートしています：

- DB2KeyGenerator
- H2KeyGenerator
- KingbaseKeyGenerator
- OracleKeyGenerator
- PostgreKeyGenerator

組み込みの主キー生成戦略が要件を満たさない場合は、`IKeyGenerator` インターフェースを実装してカスタムの主キー生成戦略を拡張することができます。

## 例

以下は `@KeySequence` アノテーションを使用したエンティティクラスの例です：

```java
@KeySequence(value = "SEQ_ORACLE_STRING_KEY", clazz = String.class)
public class YourEntity {

    @TableId(value = "ID_STR", type = IdType.INPUT)
    private String idStr;

    // その他のフィールドとメソッド...
}
```

この例では、`YourEntity` クラスは `@KeySequence` アノテーションを使用して、Oracle データベースのシーケンス  `SEQ_ORACLE_STRING_KEY` を使用して主キー値を生成するように指定し、主キータイプを `String` としています。

## Spring Boot 設定

### 方法1：設定クラスを使用

Spring Boot アプリケーションでは、設定クラスを使用して主キー生成戦略を設定できます：

```java
@Bean
public IKeyGenerator keyGenerator() {
    return new H2KeyGenerator();
}
```

### 方法2：MybatisPlusPropertiesCustomizer でカスタマイズ

`MybatisPlusPropertiesCustomizer` を使用して主キー生成戦略をカスタマイズすることもできます：

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().getDbConfig().setKeyGenerator(new H2KeyGenerator());
}
```

## Spring 設定

### 方法1: XML 設定

従来の Spring アプリケーションでは、XML 設定を使用して主キー生成戦略を設定できます：

```xml
<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
   <property name="dbConfig" ref="dbConfig"/>
</bean>

<bean id="dbConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig.DbConfig">
   <property name="keyGenerator" ref="keyGenerator"/>
</bean>

<bean id="keyGenerator" class="com.baomidou.mybatisplus.extension.incrementer.H2KeyGenerator"/>
```

### 方法2：アノテーション設定

アノテーションを使用して主キー生成戦略を設定：

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setDbConfig(new GlobalConfig.DbConfig().setKeyGenerator(new H2KeyGenerator()));
    return conf;
}
```

上記の設定方法は、実際のプロジェクト要件に応じて適切な方法を選択して主キー生成戦略を設定できます。
