---
title: DDLの自動メンテナンス
sidebar:
  order: 10
---

MyBatis-Plusの`3.5.3+`バージョンでは、強力な機能が導入されました：データベースDDL（データ定義言語）のテーブル構造の自動メンテナンスです。この機能はSQLスクリプトを実行することでデータベーススキーマの初期化とアップグレードを実現し、従来の`flyway`ツールと比較して、分割テーブルデータベースをサポートし、さらにコードによるSQLスクリプトの実行プロセスを制御することができます。

## 機能概要

- **DDL履歴の自動メンテナンス**：初回使用時に、システムは`ddl_history`という名前のテーブルをデータベースに作成し、実行されたSQLスクリプトのバージョン情報を記録します。
- **柔軟なスクリプト実行**：異なるデータベース間でデータソースを切り替え、動的にスクリプトコマンドを実行することができます。
- **エンタープライズ級の機能**：この機能はエンタープライズ級の高度な機能として位置づけられ、オープンソースバージョンの一部となっています。

## 注意事項

- DDL操作を実行する際、スクリプトにデータベースを作成するためのデータソース切り替えが含まれている場合、例外が発生する可能性があります。解決方法として、異なるデータベースに切り替えた後、動的にスクリプトコマンドを実行します。

## コード例

以下は、MyBatis-PlusでDDLを自動メンテナンスするJavaコンポーネントの例です：

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
                // `3.5.3.2`バージョンから、ストアドプロシージャの実行がサポートされました。ファイル名の末尾に`#$$`を追加し、その`$$`をカスタムの完全なSQL区切り文字として使用します。
                // ストアドプロシージャスクリプトは`END`で終わり、区切り文字`END;$$`を追加してスクリプトの終わりを示します。
                "db/procedure.sql#$$",
                "D:\\db\\tag-data.sql"
        );
    }
}

// MySQLのスレーブデータベースに切り替えて、SQLスクリプトを実行（オープンソースバージョンにはこの機能はありません）
ShardingKey.change("mysqlt2");
ddlScript.run(new StringReader("DELETE FROM user;\n" +
        "INSERT INTO user (id, username, password, sex, email) VALUES\n" +
        "(20, 'Duo', '123456', 0, 'Duo@baomidou.com');"));
```

この例では、`MysqlDdl`コンポーネントを定義し、そこに`IDdl`インターフェースを実装して、実行するSQLスクリプトファイルのリストを提供しています。`ShardingKey.change`メソッドを呼び出すことで、MySQLのスレーブデータベースに切り替え、`ddlScript.run`メソッドを使用して特定のSQLスクリプトを実行できます。

この方法により、MyBatis-PlusはデータベースのDDL操作を管理するための効率的で自動化された方法を提供し、データベース構造の管理とメンテナンス作業を大幅に簡素化します。

## カスタムランナー

MyBatis-Plusのstarterを統合している場合、DDLスクリプトを実行するためのDdlApplicationRunnerインスタンスが自動的にインスタンス化されます。

実行方式は自動コミットトランザクションで、エラーを無視して続行します（その他のスクリプトパラメータは以下の通りです）。

カスタム制御が必要な場合は、独自のDdlApplicationRunnerインスタンスをコンテナに注入してください。

```java
    @Bean
    public DdlApplicationRunner ddlApplicationRunner(List<IDdl> ddlList) {
          DdlApplicationRunner ddlApplicationRunner = new DdlApplicationRunner(ddlList);
        // 以下のプロパティは3.5.11から開始 ...
        // 自動コミットの設定 デフォルト: true
        ddlApplicationRunner.setAutoCommit(false);
        // スクリプトでエラーが発生した場合の処理方法の設定 デフォルト: エラーを無視し、例外を出力（例外をスローするように設定した場合、次のsqlファイルの処理が終了します）
        ddlApplicationRunner.setDdlScriptErrorHandler(DdlScriptErrorHandler.ThrowsErrorHandler.INSTANCE);
        // 例外をスローして次のハンドラーの処理を中断するかどうか デフォルト: false
        ddlApplicationRunner.setThrowException(true);
        ddlApplicationRunner.setScriptRunnerConsumer(scriptRunner -> {
            scriptRunner.setLogWriter(null);   // 実行ログの出力を無効化 デフォルト: System.out
            scriptRunner.setErrorLogWriter(null); // エラーログの出力を無効化 デフォルト: System.err
            scriptRunner.setStopOnError(true); // 例外発生時に停止するかどうか
            scriptRunner.setRemoveCRs(false); // \r\nを\nに置換するかどうか デフォルト: false
        });
        return ddlApplicationRunner;
    }
```
