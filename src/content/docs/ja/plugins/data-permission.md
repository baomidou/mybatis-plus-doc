---
title: データ権限プラグイン
sidebar:
  order: 4
---

DataPermissionInterceptor は、MyBatis-Plus が提供するデータ権限制御を実現するためのプラグインです。実行される SQL 文をインターセプトし、権限に関連する SQL フラグメントを動的に連結することで、ユーザーのデータアクセスを制御します。

## プラグインの原理

DataPermissionInterceptor の動作原理は、テナントプラグインと同様です。SQL 実行前に SQL 文をインターセプトし、ユーザーの権限に基づいて権限関連の SQL フラグメントを動的に追加します。これにより、ユーザーがアクセス権限を持つデータのみがクエリで取得されるようになります。

## プラグインのアドレスとテストケース

- **プラグインアドレス**: [DataPermissionInterceptor](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser-5.0/src/main/java/com/baomidou/mybatisplus/extension/plugins/inner/DataPermissionInterceptor.java)
- **テストケース**: [DataPermissionInterceptorTest](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-jsqlparser-support/mybatis-plus-jsqlparser-5.0/src/test/java/com/baomidou/mybatisplus/test/extension/plugins/inner/DataPermissionInterceptorTest.java)

## コアコード
以下は、SQL フラグメントを組み立てるコアロジックのコードです：

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

プラグインの主要な部分の使用説明を注意深く読み、データ権限プラグインを正しく注入し、独自の `SQL` 組み立てロジックをカスタマイズするようにしてください。

:::

## JSQLParser
**JSQLParser** は、SQL 文を簡単に解析および変更できるオープンソースの SQL 解析ライブラリです。これはプラグインが権限ロジックを実装するための重要なツールであり、MyBatis-Plus のデータ権限は JSQLParser の解析能力に依存しています。

以下の例は、JSQLParser を使用して `SQL` を変更する方法を示しています：

```java
// サンプル SQL
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

### ステップ 1: データ権限ロジックを実装する
`MultiDataPermissionHandler` をカスタマイズし、特定のビジネスロジックを実装します。

```java
public class CustomDataPermissionHandler extends MultiDataPermissionHandler {
    @Override
    public Expression getSqlSegment(Table table, Expression where, String mappedStatementId) {
        // ここにカスタムデータ権限ロジックを記述します
        try {
            String sqlSegment = "..."; // データ権限に関連する SQL フラグメント
            return CCJSqlParserUtil.parseCondExpression(sqlSegment);
        } catch (JSQLParserException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### ステップ 2: データ権限インターセプターを登録する
カスタマイズしたハンドラーを `DataPermissionInterceptor` に登録します。

```java
// MyBatis 設定内で
Interceptor dataPermissionInterceptor = new DataPermissionInterceptor(new CustomDataPermissionHandler());
mybatisConfiguration.addInterceptor(dataPermissionInterceptor);
```

DataPermissionInterceptor を使用することで、MyBatis-Plus アプリケーションで簡単にデータ権限制御を実装でき、ユーザーが自身の権限範囲内のデータにのみアクセスできることを保証し、データのセキュリティを向上させることができます。
