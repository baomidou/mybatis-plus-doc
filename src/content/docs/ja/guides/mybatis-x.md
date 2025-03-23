---
title: Mybatis X プラグイン
sidebar:
  order: 20
---

MybatisX は、IntelliJ IDEA 専用に設計された高速開発プラグインで、MyBatis と MyBatis-Plus フレームワークの開発効率を向上させることを目的としています。

### インストールガイド

1. IntelliJ IDEA を開きます。
2. `File -> Settings -> Plugins -> Browse Repositories` に移動します。
3. 検索ボックスに `mybatisx` と入力します。
4. MybatisX プラグインを見つけてインストールをクリックします。

:::note[開発者をサポート]

MybatisXプラグインが役立ったと感じた場合は、プラグインページで[星5評価](https://plugins.jetbrains.com/plugin/10119-mybatisx)をしていただき、開発者の継続的な改善をサポートしてください。

また、MyBatisX プラグインへのコミットも歓迎します。ソースコードはこちら：[MybatisX ソースコード](https://gitee.com/baomidou/MybatisX)

:::

## 主要機能

### XML マッピングジャンプ

MybatisX は、XML マッピングファイルと Java インターフェース間の便利なジャンプ機能を提供しているので、開発者は両者の間を素早く切り替えることができるようになり、開発効率が向上します。

![XML ジャンプ例](/images/content/mybatisx-jump.gif)

### コード生成

MybatisX を使用すると、データベーステーブル構造に基づいて、対応する Java エンティティクラス、Mapper インターフェース、XML マッピングファイルを簡単に生成できます。

![コード生成例](/images/content/mybatisx-generate.gif)

### テンプレートのリセット

MybatisXでは、コード生成テンプレートをリセットして、デフォルト設定に戻すか、カスタムテンプレート内容に設定することができます。

![テンプレートリセット例](/images/content/mybatisx-reset-template.gif)

### JPA スタイルのヒント

MybatisX は、JPA スタイルのコードヒントをサポートしています。新規作成、クエリ、更新、削除操作の自動コード生成を含みます。

- 新規作成操作の生成
  ![新規作成例](/images/content/mybatisx-tip-insert.gif)
- クエリ操作の生成
  ![クエリ例](/images/content/mybatisx-tip-select.gif)
- 更新操作の生成
  ![更新例](/images/content/mybatisx-tip-update.gif)
- 削除操作の生成
  ![削除例](/images/content/mybatisx-tip-delete.gif)

## よくある質問と回答

### JPA ヒント機能が使用できません

JPAヒント機能は、Mapper インターフェースとエンティティクラス間の関連付けに依存しています。Mapper が以下のいずれかの条件を満たしていることを確認してください：

1. mybatis-plus の BaseMapper を継承している。
2. Mapper.xml ファイルに resultMap タグが含まれている。
3. Mapper クラスでコメントを通じてエンティティクラスが指定されている。例：`@Entity com.xx.xx.UserModel`。

### 生成されたテーブル名が想定していたものと異なります

MybatisX は以下のルールでテーブル名を決定します：

1. エンティティクラス上の JPA アノテーション。例：`@Table(name="t_user")`。
2. エンティティクラス上の mybatis-plus アノテーション。例：`@TableName("t_user")`。
3. エンティティクラス上のコメント。例：`@TableName com.xx.xx.UserModel`。
4. 上記のルールに該当しない場合、キャメルケースのクラス名をスネークケースに変換。例：`UserModel` は `user_model` に対応。

## コード生成テンプレート設定

MybatisX は柔軟なテンプレート設定オプションを提供し、開発者が必要に応じてコード生成テンプレートをカスタマイズできます。

### デフォルトテンプレート

`Scratches and Consoles -> Extensions -> MybatisX` ディレクトリで、`default-all`、`default`、`mybatis-plus2`、`mybatis-plus3` などのデフォルト提供テンプレートを見つけることができます。

### デフォルトテンプレートのリセット

テンプレートをデフォルト設定にリセットするには、MybatisX ディレクトリを右クリックし、`Restore Default Extensions` を選択します。

![コード生成テンプレート設定例](/images/content/mybatisx-template-setting.jpg)

### カスタムテンプレート内容

MybatisX では、プロジェクトの要件に応じてテンプレート内容をカスタマイズできます。エンティティクラス、テーブル名、フィールド情報などが含まれています。

#### エンティティクラス情報

- `tableClass.fullClassName`: クラスの完全修飾名。
- `tableClass.shortClassName`: クラスの短縮名。
- `tableClass.tableName`: テーブル名。
- `tableClass.pkFields`: テーブルの主キーフィールド。
- `tableClass.allFields`: テーブルの全フィールド。
- `tableClass.baseFields`: 主キーとblobを除く全フィールド。
- `tableClass.baseBlobFields`: 主キーを除く全フィールド。
- `tableClass.remark`: テーブルコメント。

#### フィールド情報

- `field.fieldName`: フィールド名。
- `field.columnName`: カラム名。
- `field.jdbcType`: JDBC 型。
- `field.columnLength`: カラム長。
- `field.columnScale`: カラム精度。
- `field.columnIsArray`: フィールド型が配列かどうか。
- `field.shortTypeName`: Java 型の短縮名。
- `field.fullTypeName`: Java 型の完全修飾名。
- `field.remark`: フィールドコメント。
- `field.autoIncrement`: 自動インクリメントかどうか。
- `field.nullable`: NULL を許可するかどうか。

#### 設定情報

- `baseInfo.shortClassName`: 設定名。
- `baseInfo.tableName`: 設定ファイル名。
- `baseInfo.pkFields`: 設定名。
- `baseInfo.allFields`: サフィックス。
- `baseInfo.baseFields`: パッケージ名。
- `baseInfo.baseBlobFields`: テンプレート内容。
- `baseInfo.remark`: 相対モジュールのリソースファイルパス。

MybatisX プラグインを使用することで、MyBatis と MyBatis-Plus フレームワークの開発効率を大幅に向上させ、便利なコード生成とテンプレートカスタマイズ機能を活用できます。
