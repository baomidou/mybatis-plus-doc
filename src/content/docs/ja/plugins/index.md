---
title: プラグイン
sidebar:
  order: 1
---

MyBatis-Plus は、MyBatis の機能を強化するための一連の強力なプラグインを提供します。これらのプラグインは `MybatisPlusInterceptor` を通じて MyBatis の実行プロセスをインターセプトし、強化します。以下に、これらのプラグインの詳細な紹介と使用方法を示します。

:::note
バージョン要件：3.4.0 バージョン以上
:::

## MybatisPlusInterceptor 概要

`MybatisPlusInterceptor` は MyBatis-Plus のコアプラグインであり、MyBatis の `Executor#query`、`Executor#update`、`StatementHandler#prepare` メソッドを代理し、これらのメソッドの実行前後にカスタムロジックを挿入できます。

### プロパティ

`MybatisPlusInterceptor` には重要なプロパティ `interceptors` があります。これは `List<InnerInterceptor>` 型のコレクションであり、適用するすべての内部インターセプターを格納するために使用されます。

### InnerInterceptor インターフェース

MyBatis-Plus が提供するすべてのプラグインは `InnerInterceptor` インターフェースを実装しています。このインターフェースはプラグインの基本的な動作を定義します。現在、MyBatis-Plus は以下のプラグインを提供しています：

- **自動ページング**: `PaginationInnerInterceptor`
- **マルチテナント**: `TenantLineInnerInterceptor`
- **動的テーブル名**: `DynamicTableNameInnerInterceptor`
- **楽観ロック**: `OptimisticLockerInnerInterceptor`
- **SQL パフォーマンス仕様**: `IllegalSQLInnerInterceptor`
- **全テーブル更新・削除防止**: `BlockAttackInnerInterceptor`

:::note[注意]

複数のプラグインを使用する場合、その順序に注意する必要があります。推奨される順序は次のとおりです：

1. マルチテナント、動的テーブル名
2. ページング、オプティミスティックロック
3. SQL パフォーマンス仕様、全テーブル更新・削除防止

まとめ：SQL を一度だけ変更するプラグインを最初に配置し、SQL を変更しないプラグインを最後に配置する必要があります。

:::

## 使用例

### Spring 設定

Spring 設定では、`MybatisPlusInterceptor` のインスタンスを作成し、MyBatis のプラグインリストに追加する必要があります。以下はページングプラグインの設定例です：

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <!-- その他のプロパティ 略 -->
    <property name="configuration" ref="configuration"/>
    <property name="plugins">
        <array>
            <ref bean="mybatisPlusInterceptor"/>
        </array>
    </property>
</bean>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="paginationInnerInterceptor"/>
        </list>
    </property>
</bean>

<bean id="paginationInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor">
    <!-- 単一のデータベースタイプの場合、この値を設定することをお勧めします。これにより、ページングのたびにデータベースタイプを取得する必要がなくなります -->
    <constructor-arg name="dbType" value="H2"/>
</bean>
```

### Spring Boot 設定

Spring Boot プロジェクトでは、Java 設定を使用してプラグインを追加できます：

```java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * ページングプラグインを追加
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }
}
```

### mybatis-config.xml 設定

XML 設定を使用している場合は、`mybatis-config.xml` にプラグインを追加できます：

```xml
<plugins>
  <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="@page" value="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
    <property name="page:dbType" value="h2"/>
  </plugin>
</plugins>
```

## インターセプト無視アノテーション @InterceptorIgnore

`@InterceptorIgnore` アノテーションを使用して、特定のプラグインのインターセプトを無視できます。このアノテーションには複数のプロパティがあり、それぞれ異なるプラグインに対応しています。プロパティに値がない場合はデフォルトで `false` となり、そのプラグインを無視しないことを意味します。`true` に設定すると、対応するプラグインを無視します。

## インターセプター無視実行戦略の手動設定

`3.5.3` バージョン以降、インターセプターの無視実行戦略を手動で設定できます。これはアノテーションよりも柔軟ですが、呼び出しメソッドを手動で閉じる必要があります。

```java
// 正しく閉じられるように、できるだけ try finally を使用してください
try {
    // テナントプラグインを無視するように設定
    InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());
    // ロジックを実行 ..
} finally {
    // 無視戦略を閉じる
 InterceptorIgnoreHelper.clearIgnoreStrategy();
}
```

## ローカルキャッシュ SQL 解析

MyBatis-Plus はローカルキャッシュ SQL 解析をサポートしており、これはページングやテナントなどのプラグインに特に有効です。静的コードブロックを使用してキャッシュ処理クラスを設定できます：

```java
static {
    // デフォルトではシリアライズ FstSerialCaffeineJsqlParseCache、JdkSerialCaffeineJsqlParseCache をサポート
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## SQL 解析スレッドプールの設定

3.5.6 以降、JSQLParser(4.9) はスレッドプール解析の再利用をサポートし、スレッドプールの繰り返し作成によるパフォーマンスのオーバーヘッドを削減できます。

デフォルトでは固定スレッドプールのコア数を作成します: (Runtime.getRuntime().availableProcessors() + 1) / 2

デフォルトのスレッドプール方式が実際のデプロイ状況に合わない場合は、以下の方法でカスタムスレッドプールを指定してください。自分で作成したスレッドプールは自分で閉じる必要があることに注意してください。

```java
static {
 // 3.5.6 ~ 3.5.11 は静的変数を使用して割り当てます
 JsqlParserGlobal.executorService = xxxxx;
 // 3.5.11 以降は setExecutorService メソッドを使用して設定します
 JsqlParserGlobal.setExecutorService(....);
}
```

## JsqlParser 解析処理メソッドの設定

JsqlParser の SQL 文を加工処理する必要がある場合は、以下の方法で指定してください。処理が完了した SQL 文字列はパーサーに渡されて解析されます。

```java
/*
3.5.6~3.5.11 は JsqlParserGlobal.executorService を使用してください
3.5.11+: JsqlParserGlobal.getExecutorService()
3.5.6 未満のバージョンでは以下のみ使用できます
CCJSqlParserUtil.parseStatements(sql);
CCJSqlParserUtil.parse(sql)
**/
static {
        JsqlParserGlobal.setParserMultiFunc((sql)-> {
            System.out.println("SQL解析:" + sql);
            return CCJSqlParserUtil.parseStatements(sql, JsqlParserGlobal.getExecutorService(), null);
        });
        JsqlParserGlobal.setParserSingleFunc((sql)-> {
            System.out.println("SQL解析:" + sql);
            return CCJSqlParserUtil.parse(sql, JsqlParserGlobal.getExecutorService(), null);
        });
}
```

以上が MyBatis-Plus プラグイン本体の詳細な紹介と使用方法です。これらのプラグインを使用することで、MyBatis の機能を大幅に強化し、開発効率を向上させることができます。
