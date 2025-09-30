---
title: DDL自動メンテナンス
sidebar:
  order: 10
---

MyBatis-Plusの`3.5.3+`バージョンでは、強力な新機能としてデータベースDDL（データ定義言語）テーブル構造の自動メンテナンスが導入されました。この機能はSQLスクリプトを実行することでデータベーススキーマの初期化とアップグレードを実現し、従来の`flyway`ツールと比較して、シャーディングデータベースのサポートに加え、コードによるSQLスクリプト実行プロセスの制御が可能です。

## 機能概要

- **DDL履歴の自動管理**: 初回使用時に、システムはデータベース内に`ddl_history`テーブルを作成し、実行されたSQLスクリプトのバージョン情報を記録します。
- **柔軟なスクリプト実行**: 異なるデータベース間でのデータソース切り替えをサポートし、動的に対応するスクリプトコマンドを実行します。
- **エンタープライズ級機能**: この機能はエンタープライズ級の高度な特性として位置づけられており、オープンソース版の一部として提供されています。

## 注意事項

- DDL操作実行時、スクリプト内にデータベース作成のためのデータソース切り替えが含まれている場合、例外が発生する可能性があります。解決策としては、異なるデータベースに切り替えた後、動的にスクリプトコマンドを実行してください。

## コード例

以下はMyBatis-PlusのDDL自動メンテナンスを使用したJavaコンポーネントの例です：

```java
@Component
public class MysqlDdl implements IDdl {

    /**
     * 実行するSQLスクリプトファイルのリストを取得
     */
    @Override
    public List<String> getSqlFiles() {
        return Arrays.asList(
                "db/tag-schema.sql",
                // `3.5.3.2`バージョンから、ストアドプロシージャの実行をサポート。ファイル名の後に`#$$`を追加。`$$`はカスタムの完全なSQL区切り文字です。
                // ストアドプロシージャスクリプトは`END`で終了し、区切り文字`END;$$`を追加してスクリプト終了を示します。
                "db/procedure.sql#$$",
                "D:\\db\\tag-data.sql"
        );
    }
}

// mysqlスレーブに切り替え、SQLスクリプトを実行 (オープンソース版ではこの機能はありません)
ShardingKey.change("mysqlt2");
ddlScript.run(new StringReader("DELETE FROM user;\n" +
        "INSERT INTO user (id, username, password, sex, email) VALUES\n" +
        "(20, 'Duo', '123456', 0, 'Duo@baomidou.com');"));
```

この例では、`IDdl`インターフェースを実装した`MysqlDdl`コンポーネントを定義し、実行するSQLスクリプトファイルのリストを提供しています。`ShardingKey.change`メソッドを呼び出すことでmysqlのスレーブデータベースに切り替え、`ddlScript.run`メソッドを使用して特定のSQLスクリプトを実行しています。

この方法により、MyBatis-PlusはデータベースのDDL操作を管理する効率的で自動化された方法を提供し、データベース構造の管理とメンテナンス作業を大幅に簡素化します。

## カスタムランナー

MyBatis-Plusのstarterを統合している場合、DDLスクリプトを実行するためにDdlApplicationRunnerインスタンスが自動的に初期化されます。

実行方法は自動トランザクションコミットであり、エラーを無視して実行を継続します（その他のスクリプトパラメータは以下を参照）。

カスタム制御が必要な場合は、独自のDdlApplicationRunnerインスタンスをコンテナに注入してください。

```java
    @Bean
    public DdlApplicationRunner ddlApplicationRunner(List<IDdl> ddlList) {
          DdlApplicationRunner ddlApplicationRunner = new DdlApplicationRunner(ddlList);
        // 以下のプロパティは 3.5.11 から ...
        // 自動コミットするかどうかを設定 デフォルト: true
        ddlApplicationRunner.setAutoCommit(false);
        // スクリプトエラー発生時の処理方法を設定 デフォルト: エラーを無視、例外を出力 (例外をスローするように設定した場合、次のsqlファイル処理が中止されます)
        ddlApplicationRunner.setDdlScriptErrorHandler(DdlScriptErrorHandler.ThrowsErrorHandler.INSTANCE);
        // 例外をスローして次のハンドラーの処理を中断するか デフォルト: false
        ddlApplicationRunner.setThrowException(true);
        ddlApplicationRunner.setScriptRunnerConsumer(scriptRunner -> {
            scriptRunner.setLogWriter(null);   // 実行ログ出力を無効化 デフォルト: System.out
            scriptRunner.setErrorLogWriter(null); // エラーログ出力を無効化 デフォルト: System.err
            scriptRunner.setStopOnError(true); // 例外発生時に停止するか
            scriptRunner.setRemoveCRs(false); //  \r\n を \n に置換するか デフォルト: false
        });
        return ddlApplicationRunner;
    }
```
