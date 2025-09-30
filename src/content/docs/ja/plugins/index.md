---
title: プラグイン本体
sidebar:
  order: 1
---

MyBatis-Plus は、MyBatis の機能を強化するために一連の強力なプラグインを提供しています。これらのプラグインは `MybatisPlusInterceptor` を通じて、MyBatis の実行プロセスに対するインターセプトと機能強化を実現します。以下に、これらのプラグインの詳細な説明と使用方法を示します。

:::note
バージョン要件：3.4.0 以上
:::

## MybatisPlusInterceptor 概要

`MybatisPlusInterceptor` は MyBatis-Plus のコアプラグインであり、MyBatis の `Executor#query`、`Executor#update`、`StatementHandler#prepare` メソッドをプロキシし、これらのメソッドの実行前後にカスタムロジックを挿入することを可能にします。

### プロパティ

`MybatisPlusInterceptor` には、`interceptors` という重要なプロパティがあります。これは `List<InnerInterceptor>` 型のコレクションで、適用するすべての内部インターセプターを格納するために使用されます。

### InnerInterceptor インターフェース

MyBatis-Plus が提供するすべてのプラグインは `InnerInterceptor` インターフェースを実装しており、このインターフェースはプラグインの基本的な動作を定義しています。現在、MyBatis-Plus は以下のプラグインを提供しています：

- **自動ページネーション**: `PaginationInnerInterceptor`
- **マルチテナント**: `TenantLineInnerInterceptor`
- **動的テーブル名**: `DynamicTableNameInnerInterceptor`
- **楽観的ロック**: `OptimisticLockerInnerInterceptor`
- **SQL パフォーマンス規範**: `IllegalSQLInnerInterceptor`
- **全テーブル更新・削除の防止**: `BlockAttackInnerInterceptor`

:::note[注意]

複数のプラグインを使用する場合、それらの順序に注意する必要があります。推奨される順序は以下の通りです：

1. マルチテナント、動的テーブル名
2. ページネーション、楽観的ロック
3. SQL パフォーマンス規範、全テーブル更新・削除の防止

まとめ：SQL を単回改造するプラグインは優先的に配置し、SQL を改造しないプラグインは最後に配置します。

:::

## 使用例

### Spring 設定

Spring 設定では、`MybatisPlusInterceptor` のインスタンスを作成し、それを MyBatis のプラグインリストに追加する必要があります。以下はページネーションプラグインの設定例です：

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <!-- 他のプロパティは省略 -->
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
    <!-- 単一のデータベースタイプの場合、この値を設定することを推奨します。ページネーションのたびにデータベースタイプを取得するのを避けるため -->
    <constructor-arg name="dbType" value="H2"/>
</bean>
```

### Spring Boot 設定

Spring Boot プロジェクトでは、Java 設定を通じてプラグインを追加できます：

```java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * ページネーションプラグインを追加
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

`@InterceptorIgnore` アノテーションは、特定のプラグインのインターセプトを無視するために使用できます。このアノテーションには複数の属性があり、それぞれ異なるプラグインに対応しています。属性に値がない場合、デフォルトは `false` であり、そのプラグインを無視しないことを意味します。`true` に設定すると、対応するプラグインが無視されます。

## 手動でのインターセプター無視実行戦略の設定

`3.5.3` バージョンから、アノテーションよりも柔軟に、手動でインターセプターの無視実行戦略を設定できます。ただし、呼び出しメソッドを手動で閉じる必要があります。

```java
// 正しく閉じられるように、できるだけ try finally の方式を使用してください
try { 
    // テナントプラグインの無視を設定
    InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());
    // ロジックを実行 ..
} finally {
    // 無視戦略をクリア
	InterceptorIgnoreHelper.clearIgnoreStrategy();
}
```

## ローカルキャッシュ SQL 解析

MyBatis-Plus はローカルキャッシュ SQL 解析をサポートしており、これはページネーションやテナントなどのプラグインに特に有効です。静的コードブロックを通じてキャッシュ処理クラスを設定できます：

```java
static {
    // デフォルトでシリアライズをサポート FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```
## SQL 解析スレッドプールの設定

3.5.6 から、JSQLParser(4.9) に対してスレッドプール解析の再利用がサポートされ、重複したスレッドプールの作成によるパフォーマンスオーバーヘッドを削減できます。

デフォルトで作成される固定スレッドプールのコア数: (Runtime.getRuntime().availableProcessors() + 1) / 2

デフォルトのスレッドプール方式が実際のデプロイ状況に合わない場合は、以下の方法でカスタムスレッドプールを指定してください。自身で作成したスレッドプールは、自身で閉じる必要があることに注意してください。
```java
static {
	// 3.5.6 ~ 3.5.11 は静的変数を使用して代入
	JsqlParserGlobal.executorService = xxxxx;
	// 3.5.11 からは setExecutorService メソッドを使用して設定
	JsqlParserGlobal.setExecutorService(....);
}
```

## JsqlParser 解析処理方法の設定
JsqlParser の SQL 文に対して加工処理が必要な場合は、以下の方法で指定してください。処理が完了した SQL 文字列をパーサーに渡して解析します。
```java
/*
3.5.6~3.5.11 は JsqlParserGlobal.executorService を使用してください
3.5.11+: JsqlParserGlobal.getExecutorService()
3.5.6 未満のバージョンでは以下しか使用できません
CCJSqlParserUtil.parseStatements(sql);
CCJSqlParserUtil.parse(sql)
**/ 
static {
        JsqlParserGlobal.setParserMultiFunc((sql)-> {
            System.out.println("解析SQL:" + sql);
            return CCJSqlParserUtil.parseStatements(sql, JsqlParserGlobal.getExecutorService(), null);
        });
        JsqlParserGlobal.setParserSingleFunc((sql)-> {
            System.out.println("解析SQL:" + sql);
            return CCJSqlParserUtil.parse(sql, JsqlParserGlobal.getExecutorService(), null);
        });
}
```

以上が MyBatis-Plus プラグイン本体の詳細な説明と使用方法です。これらのプラグインを通じて、MyBatis の機能を大幅に強化し、開発効率を向上させることができます。
