---
title: 不正SQLインターセプタープラグイン
sidebar:
  order: 7
---

## 概要

`IllegalSQLInnerInterceptor` は MyBatis-Plus フレームワーク内のセキュリティ制御プラグインであり、不正なSQL文をインターセプトおよび検査するために使用されます。このプラグインは、SQL実行前に、全テーブル更新や削除操作、インデックスに対する検査など、潜在的なセキュリティ問題を発見し解決することを開発者支援することを目的としています。

- プラグインソースコード 👉 [IllegalSQLInnerInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/IllegalSQLInnerInterceptor.java)
- テストケース 👉 [IllegalSQLInnerInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/IllegalSQLInnerInterceptorTest.java)

## 機能特性

- **SQLタイプシナリオのインターセプト**: プラグインは、全テーブル更新、削除などの高リスク操作など、特定のタイプのSQL文を識別しインターセプトできます。
- **インデックスの強制使用**: クエリ実行時にインデックスを使用することを保証し、パフォーマンスを向上させ、全テーブルスキャンを回避します。
- **全テーブル更新操作の検査**: 許可されていない全テーブルの更新または削除操作を防止し、データ損失のリスクを軽減します。
- **`not`、`or`、サブクエリの検査**: `not`、`or` キーワードまたはサブクエリを含むSQL文に対して追加の検査を行い、論理エラーやパフォーマンス問題を防止します。

## 使用方法

**Java 設定例**

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 不正SQLインターセプターを追加
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

- **公式ドキュメントの参照**: プラグインを使用する前に、MyBatis-Plus の公式ドキュメントを注意深く読み、プラグインの詳細な使用説明と設定方法を理解してください。
- **カスタマイズと適応**: このプラグインは不正SQLインターセプトのソリューションを提供しますが、すべての企業環境に適用できるとは限りません。開発者は自身のプロジェクト要件に基づいて、プラグインを適切に修正および最適化する必要があります。

:::

`IllegalSQLInnerInterceptor` プラグインは、MyBatis-Plus が提供する強力なセキュリティツールであり、開発者が潜在的なSQLセキュリティ問題を事前に発見し解決することを支援できます。このプラグインを適切に設定および使用することで、データベース操作の安全性と効率を大幅に向上させることができます。
