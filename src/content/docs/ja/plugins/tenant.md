---
title: マルチテナントプラグイン
sidebar:
  order: 3
---

`TenantLineInnerInterceptor` は、MyBatis-Plus が提供するプラグインで、マルチテナントのデータ分離を実現するために使用されます。このプラグインを使用することで、各テナントが自身のデータにのみアクセスできるようにし、データの安全な分離を実現します。

## サンプルプロジェクト

`TenantLineInnerInterceptor` の使用方法をよりよく理解するために、公式が提供するサンプルプロジェクトを参照できます：👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

## プロパティ紹介

`TenantLineInnerInterceptor` の重要なプロパティは `tenantLineHandler` で、これは `TenantLineHandler` インターフェースのインスタンスであり、テナント関連のロジックを処理するために使用されます。

| プロパティ名      | タイプ              | デフォルト値 | 説明                               |
| :---------------- | :---------------- | :--------- | :--------------------------------- |
| tenantLineHandler | TenantLineHandler |            | テナントハンドラー（TenantId 行レベル） |

`TenantLineHandler` インターフェースは以下のメソッドを定義しています：

```java
public interface TenantLineHandler {

    /**
     * テナントID値の式を取得します。単一のID値のみをサポートします。
     *
     * @return テナントID値の式
     */
    Expression getTenantId();

    /**
     * テナントフィールド名を取得します。
     * デフォルトのフィールド名は: tenant_id
     *
     * @return テナントフィールド名
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * テーブル名に基づいてマルチテナント条件の結合を無視するかどうかを判断します。
     * デフォルトでは、すべてのテーブルを解析し、マルチテナント条件を結合する必要があります。
     *
     * @param tableName テーブル名
     * @return 無視するかどうか, true: 無視する, false: 解析してマルチテナント条件を結合する必要がある
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }

    /**
     * テナントフィールドの挿入ロジックを無視します。
     *
     * @param columns        挿入フィールド
     * @param tenantIdColumn テナント ID フィールド
     * @return
     */
    default boolean ignoreInsert(List<Column> columns, String tenantIdColumn) {
        return columns.stream().map(Column::getColumnName).anyMatch(i -> i.equalsIgnoreCase(tenantIdColumn));
    }
}
```

## 使用方法

### ステップ 1：テナントハンドラーの実装

`TenantLineHandler` インターフェースを実装し、テナントハンドラーを作成します。この例では、各テナントが一意の `tenantId` を持ち、リクエストヘッダーから現在のテナントの `tenantId` を取得すると仮定します。

```java
@Component
public class CustomTenantHandler implements TenantLineHandler {

    @Override
    public Expression getTenantId() {
        // テナントコンテキストがあり、そこから現在のユーザーのテナントを取得できると仮定します
         Long tenantId = TenantContextHolder.getCurrentTenantId();
        // テナント ID の式を返します。LongValue は JSQLParser で bigint 型を表すクラスです
        return new LongValue(tenantId);;
    }

    @Override
    public String getTenantIdColumn() {
        return "tenant_id";
    }

    @Override
    public boolean ignoreTable(String tableName) {
        // 必要に応じて、このテーブルを無視するかどうかを返します
        return false;
    }

}
```

### ステップ 2：テナントハンドラーをプラグインに注入

カスタムテナントハンドラーを `TenantLineInnerInterceptor` に注入します：

```java
@Configuration
@MapperScan("com.yourpackage.mapper")
public class MybatisPlusConfig {

    @Autowired
    private CustomTenantHandler customTenantHandler;

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        TenantLineInnerInterceptor tenantInterceptor = new TenantLineInnerInterceptor();
        tenantInterceptor.setTenantLineHandler(customTenantHandler);
        interceptor.addInnerInterceptor(tenantInterceptor);
        return interceptor;
    }
}
```

上記の手順により、Spring Boot プロジェクトでマルチテナントプラグインを正常に設定し、簡単なテナントハンドラーを実装しました。これで、アプリケーションは現在のリクエストのテナント ID に基づいて、マルチテナントのデータ分離を自動的に処理できるようになります。

実際のアプリケーションでは、テナント ID の取得方法が異なる場合があることに注意してください。これは、アプリケーションのアーキテクチャとビジネス要件によって異なります。また、テナント ID を処理する際には、セキュリティを考慮し、潜在的なセキュリティリスクを回避するようにしてください。

## ローカルキャッシュ SQL 解析

パフォーマンスを向上させるために、MyBatis-Plus はローカルキャッシュ SQL 解析をサポートしています。以下の方法でキャッシュ処理クラスを設定できます：

```java
static {
    // デフォルトではシリアライズ FstSerialCaffeineJsqlParseCache、JdkSerialCaffeineJsqlParseCache をサポート
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## 挿入時にテナントフィールドを自動追加

> デフォルトでは、挿入 SQL はテナント条件を判断する必要があるため、[自動フィールド補完](https://baomidou.com/guides/auto-fill-field/)機能と連携してテナントフィールドを補完する必要があります。そうしないと、テナントフィールドはデータベースに自動的に保存されません。

## 注意事項

:::note[説明]

- マルチテナントは権限フィルタリングと同じではありません。テナント間は完全に分離されています。
- マルチテナントを有効にすると、実行されるすべてのメソッドの SQL が処理されます。
- カスタム SQL は仕様に従って記述してください。特に複数のテーブルが関与する場合は、各テーブルにエイリアスを付け、特に `inner join` は標準の `inner join` を記述してください。

:::

上記の設定と使用方法により、MyBatis-Plus アプリケーションでマルチテナントのデータ分離を実現し、各テナントのデータの安全性を確保できます。
