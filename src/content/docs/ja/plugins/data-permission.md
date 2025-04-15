---
title: データ権限プラグイン
sidebar:
  order: 4
---

DataPermissionInterceptor は、MyBatis-Plus が提供するデータ権限制御を実現するためのプラグインです。実行される SQL ステートメントをインターセプトし、権限関連の SQL フラグメントを動的に結合することで、ユーザーのデータアクセスを制御します。

## プラグインの原理

DataPermissionInterceptor の動作原理はテナントプラグインと似ており、SQL 実行前に SQL ステートメントをインターセプトし、ユーザー権限に基づいて権限関連の SQL フラグメントを動的に追加します。これにより、ユーザーがアクセス権を持つデータのみが照会されます。

## プラグインの場所とテストケース

- **プラグインの場所**：[DataPermissionInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/DataPermissionInterceptor.java)
- **テストケース**：[DataPermissionInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/DataPermissionInterceptorTest.java)

## コアコード

以下は、SQL フラグメントを組み立てるコアロジックコードです。

```java
new DataPermissionInterceptor(new MultiDataPermissionHandler() {

    @Override
    public Expression getSqlSegment(final Table table, final Expression where, final String mappedStatementId) {
        try {
            String sqlSegment = sqlSegmentMap.get(mappedStatementId, table.getName());
            if (sqlSegment == null) {
                logger.info("{} {} AS {} : NOT FOUND", mappedStatementId, table.getName(), table.getAlias());
                return null;
            }
            Expression sqlSegmentExpression = CCJSqlParserUtil.parseCondExpression(sqlSegment);
            logger.info("{} {} AS {} : {}", mappedStatementId, table.getName(), table.getAlias(), sqlSegmentExpression.toString());
            return sqlSegmentExpression;
        } catch (JSQLParserException e) {
            e.printStackTrace();
        }
        return null;
    }
});
```

:::note

プラグインの主要部分の使用説明をよく読み、データ権限プラグインが正しく注入されていることを確認し、`SQL` の組み立てロジックを独自にカスタマイズしてください。

:::

## JSQLParser

**JSQLParser** は、SQL ステートメントを簡単に解析および変更できるオープンソースの SQL 解析ライブラリです。これは、プラグインが権限ロジックを実装するための重要なツールであり、MyBatis-Plus のデータ権限は JSQLParser の解析能力に依存しています。

以下の例は、JSQLParser を使用して `SQL` を変更する方法を示しています。

```java
// SQL 例
String sql = "SELECT * FROM user WHERE status = 'active'";
Expression expression;

try {
    expression = CCJSqlParserUtil.parseCondExpression("status = 'inactive'");
    PlainSelect select = (PlainSelect) ((Select) CCJSqlParserUtil.parse(sql)).getSelectBody();
    select.setWhere(expression);

    System.out.println(select); // 出力：SELECT * FROM user WHERE status = 'inactive'
} catch (JSQLParserException e) {
    e.printStackTrace();
}
```

## 使用方法

### ステップ1：データ権限ロジックの実装

カスタム `MultiDataPermissionHandler` を作成し、特定のビジネスロジックを実装します。

```java
public class CustomDataPermissionHandler extends MultiDataPermissionHandler {
    @Override
    public Expression getSqlSegment(Table table, Expression where, String mappedStatementId) {
        // ここにカスタムデータ権限ロジックを記述します
        try {
            String sqlSegment = "..."; // データ権限関連の SQL フラグメント
            return CCJSqlParserUtil.parseCondExpression(sqlSegment);
        } catch (JSQLParserException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### ステップ2：データ権限インターセプターの登録

カスタムハンドラーを `DataPermissionInterceptor` に登録します。

```java
// MyBatis 設定内
Interceptor dataPermissionInterceptor = new DataPermissionInterceptor(new CustomDataPermissionHandler());
mybatisConfiguration.addInterceptor(dataPermissionInterceptor);
```

DataPermissionInterceptor を使用することで、MyBatis-Plus アプリケーションでデータ権限制御を簡単に実装でき、ユーザーが権限範囲内のデータにのみアクセスできるようにし、データのセキュリティを向上させることができます。
