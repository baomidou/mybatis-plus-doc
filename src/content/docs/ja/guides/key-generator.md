---
title: 主キー生成戦略
sidebar:
  order: 11
---

MyBatis-Plusでは、主キー生成戦略は重要な概念であり、データベーステーブルのレコードに対して一意の主キー値をどのように生成するかを決定します。以下では、主キー生成戦略の詳細な説明と設定方法について説明します。

## 主キー生成戦略の概要

主キー生成戦略は `INPUT` タイプを使用する必要があります。これは、主キー値をユーザーがデータ挿入時に提供する必要があることを意味します。MyBatis-Plusは、親クラスで `@KeySequence` アノテーションを定義することをサポートしており、子クラスはこれを継承して使用できます。

バージョン3.3.0以降、MyBatis-Plusは主キータイプを自動的に認識するため、主キータイプを手動で指定する必要はなくなりました。

MyBatis-Plusは、以下のデータベースの主キー生成戦略を組み込みでサポートしています：

- DB2KeyGenerator
- H2KeyGenerator
- KingbaseKeyGenerator
- OracleKeyGenerator
- PostgreKeyGenerator

組み込みの主キー生成戦略が要件を満たさない場合は、`IKeyGenerator` インターフェースを実装することで、カスタムの主キー生成戦略を拡張できます。

## 例

以下は `@KeySequence` アノテーションを使用したエンティティクラスの例です：

```java
@KeySequence(value = "SEQ_ORACLE_STRING_KEY", clazz = String.class)
public class YourEntity {

    @TableId(value = "ID_STR", type = IdType.INPUT)
    private String idStr;

    // 他のフィールドとメソッド...
}
```

この例では、`YourEntity` クラスは `@KeySequence` アノテーションを使用して、Oracleデータベースのシーケンス `SEQ_ORACLE_STRING_KEY` を主キー値の生成に指定しており、主キーのタイプは `String` です。

## Spring Boot 設定

### 方法1：設定クラスを使用する

Spring Bootアプリケーションでは、設定クラスを通じて主キー生成戦略を設定できます：

```java
@Bean
public IKeyGenerator keyGenerator() {
    return new H2KeyGenerator();
}
```

### 方法2：MybatisPlusPropertiesCustomizer によるカスタマイズ

`MybatisPlusPropertiesCustomizer` を使用して主キー生成戦略をカスタマイズすることもできます：

```java
@Bean
public MybatisPlusPropertiesCustomizer plusPropertiesCustomizer() {
    return plusProperties -> plusProperties.getGlobalConfig().getDbConfig().setKeyGenerator(new H2KeyGenerator());
}
```

## Spring 設定

### 方法1: XML 設定

従来のSpringアプリケーションでは、XML設定を通じて主キー生成戦略を設定できます：

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

アノテーションを使用して主キー生成戦略を設定する：

```java
@Bean
public GlobalConfig globalConfig() {
    GlobalConfig conf = new GlobalConfig();
    conf.setDbConfig(new GlobalConfig.DbConfig().setKeyGenerator(new H2KeyGenerator()));
    return conf;
}
```

上記の設定方法は、実際のプロジェクトの要件に応じて、適切な方法で主キー生成戦略を設定するために選択できます。
