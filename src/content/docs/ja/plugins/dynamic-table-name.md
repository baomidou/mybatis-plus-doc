---
title: 動的テーブル名プラグイン
sidebar:
  order: 5
---

データベースアプリケーション開発において、異なる条件に基づいて異なるテーブルをクエリする必要がある場合があります。MyBatis-Plusは動的テーブル名プラグイン `DynamicTableNameInnerInterceptor` を提供しており、実行時にSQL文のテーブル名を動的に変更することができます。これはテーブル分割ロジックを扱う際に非常に有用です。

## プラグイン概要

`DynamicTableNameInnerInterceptor` はMyBatis-Plusが提供するインターセプターで、SQL文を実行する前に設定されたルールに基づいてテーブル名を動的に置換することができます。この機能は、日付に基づいてデータを異なるテーブルに保存するなど、テーブル分割ロジックを扱う際に非常に有用です。

## クイックスタート

### インターセプターの設定

Spring Bootの設定クラスで、`DynamicTableNameInnerInterceptor` をインターセプターチェーンに追加し、テーブル名ハンドラーを設定します：

```java
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.DynamicTableNameInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        DynamicTableNameInnerInterceptor dynamicTableNameInnerInterceptor = new DynamicTableNameInnerInterceptor();
        dynamicTableNameInnerInterceptor.setTableNameHandler((sql, tableName) -> {
            // パラメータ取得方法
            Map<String, Object> paramMap = RequestDataHelper.getRequestData();
            paramMap.forEach((k, v) -> System.err.println(k + "----" + v));

            String year = "_2018";
            int random = new Random().nextInt(10);
            if (random % 2 == 1) {
                year = "_2019";
            }
            return tableName + year;
        });
        interceptor.addInnerInterceptor(dynamicTableNameInnerInterceptor);
        return interceptor;
    }
}
```

この例では、乱数に基づいてテーブル名の接尾辞を `_2018` または `_2019` に設定するテーブル名ハンドラーを定義しています。

### 動的テーブル名の使用

Mapperインターフェースでは、動的テーブル名を特別に指定する必要はありません。テーブル名は実行時にインターセプターによって動的に処理されます。

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    // ...
}
```

クエリを実行すると、MyBatis-Plusは自動的にテーブル名を実際のテーブル名に置換します。

## 注意事項

- 誤った置換を防ぐために、動的テーブル名は `mp_dt_` のようなプレフィックスを使用するなど、複雑に定義することをお勧めします。
- テーブル名のルールがSQLインジェクションなどのセキュリティ問題を引き起こさないようにしてください。
- 動的テーブル名を設定する際は、データベースの互換性を考慮し、置換後のテーブル名がデータベースの命名規則に準拠していることを確認してください。

## サンプルプロジェクト

`DynamicTableNameInnerInterceptor` の使用方法をよりよく理解するために、公式が提供するサンプルプロジェクトを参照できます：

- 👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

このサンプルプロジェクトは、年次に基づいて異なるユーザーテーブルを動的にクエリする方法を示しています。

`DynamicTableNameInnerInterceptor` は強力なツールであり、動的テーブル名のシナリオを簡単に処理するのに役立ちます。適切に設定することで、MyBatis-Plusが複雑なテーブル分割ロジックを自動的に処理し、開発効率を向上させることができます。使用時にはベストプラクティスに従い、システムの安全性と安定性を確保するようにしてください。
