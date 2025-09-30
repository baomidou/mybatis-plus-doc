---
title: Mybatis X プラグイン
sidebar:
  order: 20
---

MybatisX は、IntelliJ IDEA 専用に設計された高速開発プラグインであり、MyBatis および MyBatis-Plus フレームワークの開発効率を向上させることを目的としています。

### インストールガイド

1. IntelliJ IDEA を起動します。
2. `ファイル -> 設定 -> プラグイン -> リポジトリを参照` に移動します。
3. 検索ボックスに `mybatisx` と入力します。
4. MybatisX プラグインを見つけてインストールをクリックします。

:::note[開発者へのサポート]

MybatisX プラグインが役立った場合は、プラグインページで[5つ星の評価](https://plugins.jetbrains.com/plugin/10119-mybatisx)をいただき、開発者の継続的な改善をサポートしてください。

MyBatisX プラグインへの貢献も大歓迎です。ソースコードはこちら：[MybatisX ソースコード](https://gitee.com/baomidou/MybatisX)

:::

## 主な機能

### XML マッピングへのジャンプ

MybatisX は、XML マッピングファイルと Java インターフェース間の便利なジャンプ機能を提供し、開発者が両者を素早く切り替えて開発効率を向上させることを可能にします。

![XML ジャンプの例](/images/content/mybatisx-jump.gif)

### コード生成

MybatisX を使用すると、データベースのテーブル構造に基づいて、対応する Java エンティティクラス、Mapper インターフェース、および XML マッピングファイルを簡単に生成できます。

![コード生成の例](/images/content/mybatisx-generate.gif)

### テンプレートのリセット

MybatisX では、コード生成テンプレートをリセットして、デフォルト設定に戻したり、カスタムテンプレート内容に設定したりすることができます。

![テンプレートリセットの例](/images/content/mybatisx-reset-template.gif)

### JPA スタイルのヒント

MybatisX は JPA スタイルのコードヒントをサポートしており、追加、検索、変更、削除操作の自動コード生成を含みます。

- 追加操作の生成
  ![追加生成の例](/images/content/mybatisx-tip-insert.gif)
- 検索操作の生成
  ![検索生成の例](/images/content/mybatisx-tip-select.gif)
- 変更操作の生成
  ![変更生成の例](/images/content/mybatisx-tip-update.gif)
- 削除操作の生成
  ![削除生成の例](/images/content/mybatisx-tip-delete.gif)

## よくある質問

### JPA ヒント機能が使えない？

JPA ヒント機能は、Mapper インターフェースとエンティティクラス間の関連付けに依存しています。お使いの Mapper が以下のいずれかの条件を満たしていることを確認してください：

1. mybatis-plus の BaseMapper を継承している。
2. Mapper.xml ファイルに resultMap タグが含まれている。
3. Mapper クラスにコメントでエンティティクラスが指定されている（例：`@Entity com.xx.xx.UserModel`）。

### 生成されるテーブル名が期待通りではない？

MybatisX は以下のルールに従ってテーブル名を決定します：

1. エンティティクラス上の JPA アノテーション（例：`@Table(name="t_user")`）。
2. エンティティクラス上の mybatis-plus アノテーション（例：`@TableName("t_user")`）。
3. エンティティクラス上のコメント（例：`@TableName com.xx.xx.UserModel`）。
4. 上記のルールのいずれも満たさない場合、キャメルケースのクラス名をスネークケースに変換します（例：`UserModel` はテーブル名 `user_model` に対応）。

## コード生成テンプレート設定

MybatisX は柔軟なテンプレート設定オプションを提供しており、開発者は必要に応じてコード生成テンプレートをカスタマイズできます。

### デフォルトテンプレート

`スクラッチとコンソール -> 拡張機能 -> MybatisX` ディレクトリで、`default-all`、`default`、`mybatis-plus2`、`mybatis-plus3` など、デフォルトで提供されているテンプレートを見つけることができます。

### デフォルトテンプレートのリセット

テンプレートをデフォルト設定にリセットする必要がある場合は、MybatisX ディレクトリを右クリックし、`デフォルトの拡張機能を復元` を選択します。

![コード生成テンプレート設定の例](/images/content/mybatisx-template-setting.jpg)

### カスタムテンプレート内容

MybatisX では、プロジェクトの要件に応じて、エンティティクラス、テーブル名、フィールド情報など、テンプレート内容をカスタマイズすることができます。

#### エンティティクラス情報

- `tableClass.fullClassName`: クラスの完全修飾名。
- `tableClass.shortClassName`: クラスの短縮名。
- `tableClass.tableName`: テーブル名。
- `tableClass.pkFields`: テーブルの主キーフィールド。
- `tableClass.allFields`: テーブルのすべてのフィールド。
- `tableClass.baseFields`: 主キーと blob を除くすべてのフィールド。
- `tableClass.baseBlobFields`: 主キーを除くすべてのフィールド。
- `tableClass.remark`: テーブルのコメント。

#### フィールド情報

- `field.fieldName`: フィールド名。
- `field.columnName`: カラム名。
- `field.jdbcType`: JDBC タイプ。
- `field.columnLength`: カラム長。
- `field.columnScale`: カラムの精度。
- `field.columnIsArray`: フィールドタイプが配列かどうか。
- `field.shortTypeName`: Java タイプの短縮名。
- `field.fullTypeName`: Java タイプの完全修飾名。
- `field.remark`: フィールドのコメント。
- `field.autoIncrement`: 自動インクリメントかどうか。
- `field.nullable`: NULL を許可するかどうか。

#### 設定情報

- `baseInfo.shortClassName`: 設定名。
- `baseInfo.tableName`: 設定ファイル名。
- `baseInfo.pkFields`: 設定名。
- `baseInfo.allFields`: サフィックス。
- `baseInfo.baseFields`: パッケージ名。
- `baseInfo.baseBlobFields`: テンプレート内容。
- `baseInfo.remark`: モジュールに対するリソースファイルの相対パス。

MybatisX プラグインを使用することで、MyBatis および MyBatis-Plus フレームワークの開発効率を大幅に向上させるとともに、便利なコード生成とテンプレートカスタマイズ機能を享受できます。
