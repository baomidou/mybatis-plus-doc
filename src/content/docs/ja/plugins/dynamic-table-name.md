---
title: 動的テーブル名プラグイン
sidebar:
  order: 5
---

データベースアプリケーション開発では、異なる条件に基づいて異なるテーブルを照会する必要がある場合があります。MyBatis-Plus は動的テーブル名プラグイン `DynamicTableNameInnerInterceptor` を提供しており、これにより実行時に SQL ステートメント内のテーブル名を動的に変更できます。これは、テーブル分割ロジックを処理するのに非常に役立ちます。

## プラグイン紹介

`DynamicTableNameInnerInterceptor` は MyBatis-Plus が提供するインターセプターであり、SQL ステートメントを実行する前に、設定されたルールに基づいてテーブル名を動的に置き換えることができます。この機能は、日付に基づいてデータを異なるテーブルに格納するなど、テーブル分割ロジックを処理する際に非常に役立ちます。

## クイックスタート

### インターセプターの設定

Spring Boot の設定クラスで、`DynamicTableNameInnerInterceptor` をインターセプターチェーンに追加し、テーブル名ハンドラーを設定します。

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
            // パラメータ取得メソッド
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

この例では、乱数に基づいてテーブル名のサフィックスを `_2018` または `_2019` に設定するテーブル名ハンドラーを定義しています。

### 動的テーブル名の使用

Mapper インターフェースでは、動的テーブル名を特別に指定する必要はありません。テーブル名は実行時にインターセプターによって動的に処理されるためです。

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    // ...
}
```

クエリを実行すると、MyBatis-Plus は自動的にテーブル名を実際のテーブル名に置き換えます。

## 注意事項

- 誤った置換を防ぐために、動的テーブル名をより複雑に定義することをお勧めします。たとえば、プレフィックス `mp_dt_` を使用します。
- テーブル名のルールが SQL インジェクションなどのセキュリティ問題を引き起こさないことを確認してください。
- 動的テーブル名を設定する際には、データベースの互換性を考慮し、置換後のテーブル名がデータベースの命名規則に準拠していることを確認してください。

## サンプルプロジェクト

`DynamicTableNameInnerInterceptor` の使用方法をよりよく理解するために、公式が提供するサンプルプロジェクトを参照できます。

- 👉 [mybatis-plus-sample-dynamic-tablename](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)

このサンプルプロジェクトは、年号に基づいて異なるユーザーテーブルを動的に照会する方法を示しています。

`DynamicTableNameInnerInterceptor` は強力なツールであり、動的テーブル名のシナリオを簡単に処理するのに役立ちます。適切に設定することで、MyBatis-Plus に複雑なテーブル分割ロジックを自動的に処理させることができ、開発効率を向上させることができます。使用する際には、ベストプラクティスに従い、システムのセキュリティと安定性を確保することを忘れないでください。
