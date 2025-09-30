---
title: マルチテナントプラグイン
sidebar:
  order: 3
---

`TenantLineInnerInterceptor` は、MyBatis-Plus が提供するプラグインで、マルチテナントのデータ分離を実現するために使用されます。このプラグインを通じて、各テナントが自身のデータにのみアクセスできることを保証し、データの安全な分離を実現します。

## サンプルプロジェクト

`TenantLineInnerInterceptor` の使用方法をよりよく理解するために、公式が提供するサンプルプロジェクトを参照できます：👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

## 属性の紹介

`TenantLineInnerInterceptor` の重要な属性は `tenantLineHandler` です。これは `TenantLineHandler` インターフェースのインスタンスであり、テナント関連のロジックを処理するために使用されます。

| 属性名 | 型 | デフォルト値 | 説明 |
| :-: | :-: | :-: | :-: |
| tenantLineHandler | TenantLineHandler |  | テナントハンドラ ( TenantId 行レベル ) |

`TenantLineHandler` インターフェースは以下のメソッドを定義しています：

```java
public interface TenantLineHandler {

    /**
     * テナント ID 値の式を取得します。単一の ID 値のみをサポートします
     *
     * @return テナント ID 値の式
     */
    Expression getTenantId();

    /**
     * テナントフィールド名を取得します
     * デフォルトのフィールド名は: tenant_id
     *
     * @return テナントフィールド名
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * テーブル名に基づいて、マルチテナント条件の追加をスキップするかどうかを判断します
     * デフォルトではすべて解析し、マルチテナント条件を追加します
     *
     * @param tableName テーブル名
     * @return スキップするかどうか, true: スキップする, false: 解析してマルチテナント条件を追加する必要がある
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }

    /**
     * テナントフィールドの挿入ロジックをスキップします
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

### ステップ 1: テナントハンドラを実装する

`TenantLineHandler` インターフェースを実装し、テナントハンドラを作成します。この例では、各テナントが一意の `tenantId` を持ち、リクエストヘッダーを通じて現在のテナントの `tenantId` を取得すると仮定します。

```java
@Component
public class CustomTenantHandler implements TenantLineHandler {

    @Override
    public Expression getTenantId() {
        // テナントコンテキストがあり、現在のユーザーのテナントを取得できると仮定します
         Long tenantId = TenantContextHolder.getCurrentTenantId();
        // テナントIDの式を返します。LongValue は JSQLParser の bigint 型を表すクラスです
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

### ステップ 2: テナントハンドラをプラグインに注入する

カスタムテナントハンドラを `TenantLineInnerInterceptor` に注入します：

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

以上の手順により、Spring Boot プロジェクトでマルチテナントプラグインの設定が正常に行われ、シンプルなテナントハンドラが実装されました。これで、アプリケーションは現在のリクエストのテナントIDに基づいてマルチテナントデータ分離を自動的に処理できるようになります。

実際のアプリケーションでは、テナントIDの取得方法は、アプリケーションのアーキテクチャとビジネス要件によって異なる場合があることに注意してください。また、テナントIDを処理する際には、潜在的なセキュリティリスクを回避するために、セキュリティを考慮するようにしてください。

## ローカルキャッシュ SQL 解析

パフォーマンスを向上させるために、MyBatis-Plus はローカルキャッシュ SQL 解析をサポートしています。以下の方法でキャッシュ処理クラスを設定できます：

```java
static {
    // デフォルトでシリアライズをサポート FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## 挿入時にテナントフィールドを自動追加

> デフォルトでは、挿入 SQL はテナント条件の判断を必要とするため、[自動フィールド埋め込み](https://baomidou.com/guides/auto-fill-field/)機能と連携してテナントフィールドを埋め込む必要があります。そうしないと、テナントフィールドは自動的にデータベースに保存されません。

## 注意事項

:::note[説明]

- マルチテナントは権限フィルタリングと同等ではありません。テナント間は完全に分離されています。
- マルチテナントを有効にすると、実行されるすべての method の SQL が処理されます。
- カスタム SQL は規範に従って記述してください。特に複数のテーブルが関与する場合、各テーブルにエイリアスを付ける必要があります。特に `inner join` の場合は標準的な `inner join` を記述してください。

:::

以上の設定と使用方法を通じて、MyBatis-Plus アプリケーションでマルチテナントのデータ分離を実現し、各テナントのデータセキュリティを確保できます。
