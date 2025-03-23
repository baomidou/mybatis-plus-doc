---
title: 不正SQLインターセプタープラグイン
sidebar:
  order: 7
---

## 概要

`IllegalSQLInnerInterceptor` は、MyBatis-Plus フレームワークにおけるセキュリティ制御プラグインであり、不正なSQL文をインターセプトしてチェックするために使用されます。このプラグインは、開発者が SQL 実行前に潜在的なセキュリティ問題（例：全テーブル更新、削除操作、インデックスのチェックなど）を発見し、解決するのを支援することを目的としています。

- プラグインソースコード 👉 [IllegalSQLInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptor.java)
- テストケース 👉 [IllegalSQLInnerInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/IllegalSQLInnerInterceptorTest.java)

## 機能特性

- **インターセプトする SQL タイプのシナリオ**：プラグインは、特定のタイプの SQL 文（例：全テーブル更新、削除などの高リスク操作）を識別し、インターセプトできます。
- **インデックスの強制使用**：クエリ実行時にインデックスが使用されることを保証し、パフォーマンスを向上させ、全テーブルスキャンを回避します。
- **全テーブル更新操作のチェック**：未承認の全テーブル更新または削除操作を防止し、データ損失のリスクを低減します。
- **`not`、`or`、サブクエリのチェック**：`not`、`or`キーワードまたはサブクエリを含む SQL 文に対して追加のチェックを行い、論理エラーやパフォーマンス問題を防止します。

## 使用方法

**Java 設定例**

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 不正 SQL インターセプターを追加
        interceptor.addInnerInterceptor(new IllegalSQLInnerInterceptor());
        return interceptor;
    }
}
```

**XML 設定例**

```xml
<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <bean class="com.baomidou.mybatisplus.extension.plugins.inner.IllegalSQLInnerInterceptor"/>
        </list>
    </property>
</bean>
```

:::note

- **公式ドキュメントの参照**：プラグインを使用する前に、MyBatis-Plus の公式ドキュメントを注意深く読み、プラグインの詳細な使用説明と設定方法を理解してください。
- **カスタム適応**：このプラグインは不正 SQL インターセプトのソリューションを提供しますが、すべての企業環境に適しているとは限りません。開発者は自身のプロジェクトのニーズに応じて、プラグインを適切に修正および最適化する必要があります。

:::

`IllegalSQLInnerInterceptor` プラグインは、MyBatis-Plus が提供する強力なセキュリティツールであり、開発者が潜在的な SQL セキュリティ問題を事前に発見し、解決するのに役立ちます。このプラグインを適切に設定して使用することで、データベース操作のセキュリティと効率を大幅に向上させることができます。
