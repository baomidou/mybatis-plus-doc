---
title: コードジェネレーターの設定
sidebar:
  order: 3
  badge:
    text: New
---

MyBatis-Plus の新しいコードジェネレーターは、既存の機能を継承しつつ、より柔軟で効率的なビルダーパターンを導入し、開発者が要件に合ったコードを迅速に生成できるようにしながら、コードの優雅さと読みやすさを維持できるようにしました。この新機能は、開発効率をさらに向上させ、重複作業を減らし、開発者がビジネスロジックの実装により集中できるようにすることを目的としています。

### 特徴

1. **ビルダーパターン**：ビルダーパターンを通じて、開発者は設定メソッドをチェーン式に呼び出し、コードジェネレーターの設定を直感的に構築でき、コードがより明確で読みやすくなります。

2. **クイック設定**：新しいコードジェネレーターは、グローバル設定、パッケージ設定、戦略設定などのクイック設定オプションを提供し、一般的なオプションをワンクリックで設定でき、コード生成プロセスを迅速に開始できます。

3. **テンプレートエンジン**：Freemarker などのテンプレートエンジンをサポートし、開発者がプロジェクト固有のスタイルに合わせてコードテンプレートをカスタマイズできます。

4. **Lombok 統合**：新しいコードジェネレーターはデフォルトで Lombok を有効にし、ボイラープレートコードの記述を減らし、コードの可読性とメンテナンス性を向上させます。

5. **複数データベースサポート**：MySQL、Oracle、SQL Server などの複数のデータベースタイプをサポートし、対応するデータベース接続情報を設定するだけで使用できます。

6. **柔軟なデータソース設定**：データベースクエリ方式、型変換器、キーワードハンドラーなど、豊富なデータソース設定オプションを提供し、異なるデータベースのニーズを満たします。

### 設定例

```java
// FastAutoGenerator を使用してコードジェネレーターをクイック設定
FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8", "root", "password")
    .globalConfig(builder -> {
        builder.author("Your Name") // 作者を設定
            .outputDir("src/main/java"); // 出力ディレクトリ
    })
    .packageConfig(builder -> {
        builder.parent("com.example") // 親パッケージ名を設定
            .entity("model") // エンティティクラスのパッケージ名を設定
            .mapper("dao") // Mapper インターフェースのパッケージ名を設定
            .service("service") // Service インターフェースのパッケージ名を設定
            .serviceImpl("service.impl") // Service 実装クラスのパッケージ名を設定
            .xml("mappers"); // Mapper XML ファイルのパッケージ名を設定
    })
    .strategyConfig(builder -> {
        builder.addInclude("table1", "table2") // 生成対象のテーブル名を設定
            .entityBuilder()
            .enableLombok() // Lombok を有効化
            .enableTableFieldAnnotation() // フィールドアノテーションを有効化
            .controllerBuilder()
            .enableRestStyle(); // REST スタイルを有効化
    })
    .templateEngine(new FreemarkerTemplateEngine()) // Freemarker テンプレートエンジンを使用
    .execute(); // 生成を実行
```

### データベース設定 (DataSourceConfig)

#### 基本設定

| 属性     | 説明       | 例                                     |
| -------- | ---------- | ---------------------------------------- |
| url      | jdbc パス  | jdbc:mysql://127.0.0.1:3306/mybatis-plus |
| username | データベースアカウント | root                                     |
| password | データベースパスワード | 123456                                   |

```java
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456").build();
```

#### オプション設定

| メソッド                                      | 説明                          | 例                                                        |
| ----------------------------------------- | ----------------------------- | ----------------------------------------------------------- |
| dbQuery(IDbQuery)                         | データベースクエリ                    | new MySqlQuery(),SQLQuery でのみ有効                         |
| schema(String)                            | データベース schema(一部のデータベースで適用) | mybatis-plus                                                |
| typeConvert(ITypeConvert)                 | データベース型変換器              | new MySqlTypeConvert(),SQLQuery でのみ有効                   |
| keyWordsHandler(IKeyWordsHandler)         | データベースキーワードハンドラー            | new MySqlKeyWordsHandler()                                  |
| typeConvertHandler(ITypeConvertHandler)   | 型変換ハンドラー(デフォルト)              | ITypeConvertHandler の独自実装,DefaultQuery でのみ有効        |
| databaseQueryClass(AbstractDatabaseQuery) | データベースクエリ方式                | デフォルト DefaultQuery.class(汎用メタデータ), SQLQuery.class(SQL クエリ) |

```java
// SQL クエリ方式でコードを生成する場合（旧方式で、汎用性は高くありません。既存のコードは引き続き使用できますが、データベースへの適応には dbQuery と typeConvert の拡張が必要です。この方式は今後メンテナンスされません）
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .dbQuery(new MySqlQuery())
    .schema("mybatis-plus")
    .typeConvert(new MySqlTypeConvert())
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .databaseQueryClass(SQLQuery.class)
    .build();

// メタデータクエリ方式でコードを生成する場合（デフォルトで jdbcType に基づいて Java 型を適応し、typeConvertHandler を使用してマッピングが必要な型の変換をサポートします）
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .schema("mybatis-plus")
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .build();
```

## グローバル設定 (GlobalConfig)

グローバル設定は、コードジェネレーターの全体的な動作を設定するためのもので、出力ディレクトリ、作者情報、Kotlin モード、Swagger 統合、日時型の戦略などが含まれます。

### メソッド説明

| メソッド                      | 説明                                 | 例                                                    |
| ------------------------- | ------------------------------------ | ------------------------------------------------------- |
| disableOpenDir()          | 出力ディレクトリの自動オープンを無効化                 | デフォルト値: `true`                                          |
| outputDir(String)         | コード生成の出力ディレクトリを指定               | `/opt/baomidou` デフォルト値: Windows: `D://` Linux/Mac: `/tmp` |
| author(String)            | 作者名を設定                           | `baomidou` デフォルト値: 設定ファイルの作者名                   |
| enableKotlin()            | Kotlin モードを有効化                     | デフォルト値: `false`                                         |
| enableSwagger()           | Swagger モードを有効化                    | デフォルト値: `false`                                         |
| dateType(DateType)        | 日時型の戦略を設定                     | `DateType.ONLY_DATE` デフォルト値: `DateType.TIME_PACK`       |
| commentDate(String)       | コメントの日付フォーマットを設定                     | デフォルト値: `yyyy-MM-dd`                                    |

### 設定例

```java
GlobalConfig globalConfig = new GlobalConfig.Builder()
    .disableOpenDir(false) // 出力ディレクトリの自動オープンを許可
    .outputDir("/path/to/output") // 出力ディレクトリを設定
    .author("Your Name") // 作者名を設定
    .enableKotlin(true) // Kotlin モードを有効化
    .enableSwagger(true) // Swagger モードを有効化
    .dateType(DateType.ONLY_DATE) // 日時型の戦略を設定
    .commentDate("yyyy-MM-dd") // コメントの日付フォーマットを設定
    .build();
```

## パッケージ設定 (PackageConfig)

パッケージ設定は、生成されるコードのパッケージ構造を定義するために使用され、親パッケージ名、モジュール名、エンティティクラスのパッケージ名、サービス層のパッケージ名などが含まれます。

### メソッド説明

| メソッド                              | 説明              | 例                                                   |
| --------------------------------- | ----------------- | ------------------------------------------------------ |
| parent(String)                    | 親パッケージ名を設定        | デフォルト値: `com.baomidou`                                 |
| moduleName(String)                | 親パッケージのモジュール名を設定    | デフォルト値: なし                                             |
| entity(String)                    | Entity パッケージ名を設定  | デフォルト値: `entity`                                       |
| service(String)                   | Service パッケージ名を設定 | デフォルト値: `service`                                      |
| serviceImpl(String)               | Service 実装クラスのパッケージ名を設定 | デフォルト値: `service.impl`                                 |
| mapper(String)                    | Mapper パッケージ名を設定  | デフォルト値: `mapper`                                       |
| xml(String)                       | Mapper XML パッケージ名を設定 | デフォルト値: `mapper.xml`                                   |
| controller(String)                | Controller パッケージ名を設定 | デフォルト値: `controller`                                   |
| pathInfo(Map<OutputFile, String>) | パス設定情報を設定  | `Collections.singletonMap(OutputFile.mapperXml, "D://")` |

### 設定例

```java
PackageConfig packageConfig = new PackageConfig.Builder()
    .parent("com.example") // 親パッケージ名を設定
    .moduleName("myapp") // 親パッケージのモジュール名を設定
    .entity("model") // Entity パッケージ名を設定
    .service("service") // Service パッケージ名を設定
    .serviceImpl("service.impl") // Service 実装クラスのパッケージ名を設定
    .mapper("dao") // Mapper パッケージ名を設定
    .xml("mappers") // Mapper XML パッケージ名を設定
    .controller("controller") // Controller パッケージ名を設定
    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "/path/to/xml")) // パス設定情報を設定
    .build();
```

## テンプレート設定 (TemplateConfig)

注意：MyBatis-Plus 3.5.6 バージョンから、テンプレート設定は `StrategyConfig` に移行されました。以下は移行後の設定方法です。

### メソッド説明

| メソッド                                                         | 説明                | 例                                                                                           |
| ------------------------------------------------------------ | ------------------- |----------------------------------------------------------------------------------------------|
| entityBuilder()                                              | エンティティクラスのテンプレートを設定      |                                                                                              |
| javaTemplate(String)                                         | Java エンティティのテンプレートを設定  | `/templates/entity.java`                                                                     |
| disable()                                                    | エンティティクラスの生成を無効化      |                                                                                              |
| serviceBuilder()                                             | Service 層のテンプレートを設定 |                                                                                              |
| disableService()                                             | Service 層の生成を無効化 |                                                                                              |
| serviceTemplate(String)                                      | Service テンプレートを設定   | `/templates/service.java`                                                                    |
| serviceImplTemplate(String)                                  | ServiceImpl テンプレートを設定| `/templates/serviceImpl.java`                                                               |

### 設定例

```java
// 3.5.6 より前の設定例
TemplateConfig templateConfig = new TemplateConfig.Builder()
    .disable(TemplateType.ENTITY)
    .entity("/templates/entity.java")
    .service("/templates/service.java")
    .serviceImpl("/templates/serviceImpl.java")
    .mapper("/templates/mapper.java")
    .mapperXml("/templates/mapper.xml")
    .controller("/templates/controller.java")
    .build();

// 3.5.6 以降の設定例
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .entityBuilder()
    .javaTemplate("/templates/entity.java") // エンティティクラスのテンプレートを設定
    .disable() // エンティティクラスの生成を無効化
    .serviceBuilder()
    .disableService() // Service 層の生成を無効化
    .serviceTemplate("/templates/service.java") // Service テンプレートを設定
    .serviceImplTemplate("/templates/serviceImpl.java") // ServiceImpl テンプレートを設定
    .build();
```

## 注入設定 (InjectionConfig)

注入設定は、開発者がコードジェネレーターの動作をカスタマイズするために使用され、ファイル出力の前に実行されるロジック、カスタム設定 Map オブジェクト、カスタム設定テンプレートファイルなどが含まれます。

### メソッド説明

| メソッド                                                         | 説明                | 例                                                                                           |
| ------------------------------------------------------------ | ------------------- |----------------------------------------------------------------------------------------------|
| beforeOutputFile(BiConsumer<TableInfo, Map<String, Object>>) | ファイル出力の前に実行されるロジック | ファイル生成前にカスタムロジックを実行します（例：テーブル情報の出力、設定データ変更）                                     |
| customMap(Map<String, Object>)                               | カスタム設定 Map オブジェクト | テンプレート内でカスタム設定情報（プロジェクト名、作者など）にアクセスするために使用されます                                         |
| customFile(Map<String, String>)                              | カスタム設定テンプレートファイル  | カスタムテンプレートファイルのパスを指定するのに使用され、ファイル名をフォーマットできます。テストケース H2CodeGeneratorTest.testCustomFileByList を参照 |

### 設定例

```java
InjectionConfig injectionConfig = new InjectionConfig.Builder()
    .beforeOutputFile((tableInfo, objectMap) -> {
        System.out.println("生成ファイルを準備: " + tableInfo.getEntityName());
        // ここにカスタムロジックを追加できます。例えば、objectMap の設定を変更することができます
    })
    .customMap(Collections.singletonMap("projectName", "MyBatis-Plus Generator"))
    .customFile(Collections.singletonMap("custom.txt", "/templates/custom.vm"))
    .build();
```

上記の設定により、開発者は要件に基づいて、コードジェネレーターの動作を柔軟にカスタマイズできます。例えば、ファイル生成の前に特定のロジックを実行したり、カスタムテンプレートファイルを使用してコードを生成したりすることができます。これらの設定オプションは、MyBatis-Plus コードジェネレーターが多様で複雑なプロジェクト要件に適応するための大きな柔軟性を提供します。

## 戦略設定 (StrategyConfig)

戦略設定は MyBatis-Plus コードジェネレーターの核心部分であり、開発者がプロジェクトの要件に基づいてコード生成のルールをカスタマイズできるようにするもので、命名パターン、テーブルとフィールドのフィルタリング、および各コードモジュールの生成戦略を含みます。

### メソッド説明

| メソッド                        | 説明             | 例                                                        |
|---------------------------|----------------|-----------------------------------------------------------|
| enableCapitalMode         | 大文字命名を有効化         | デフォルト値: `false`                                                 |
| enableSkipView            | スキップビューを有効化         | デフォルト値: `false`                                                 |
| disableSqlFilter          | SQL フィルタを無効化      | デフォルト値: `true`，SQL フィルタがサポートされていない場合はこのオプションを無効にできます                     |
| enableSchema              | schema を有効化      | デフォルト値: `false`，多 schema シナリオ時に有効化することができます                                |
| likeTable(LikeTable)      | テーブル名のあいまいマッチング（SQL フィルタリング）  | `notLikeTable` とどちらか1つしか設定できません                           |
| notLikeTable(LikeTable)   | テーブル名のあいまい除外（SQL フィルタリング）  | `likeTable` とどちらか1つしか設定できません                           |
| addInclude(String...)     | テーブル名のマッチングを追加 (メモリフィルタリング)    | `addExclude` とどちらか1つしか設定できません。正規表現マッチングをサポートし、例えば `^t_.*` はすべての `t_` で始まるテーブル名に一致します |
| addExclude(String...)     | テーブル名の除外マッチングを追加 (メモリフィルタリング)  | `addInclude` とどちらか1つしか設定できません。正規表現マッチングをサポートし、例えば `.*st$` はすべての `st` で終わるテーブル名に一致します |
| addTablePrefix(String...) | テーブル名のフィルタ用プレフィックスを追加        |                                                           |
| addTableSuffix(String...) | テーブル名のフィルタ用サフィックスを追加        |                                                           |
| addFieldPrefix(String...) | フィールド名のフィルタ用プレフィックスを追加       |                                                           |
| addFieldSuffix(String...) | フィールド名のフィルタ用サフィックスを追加       |                                                           |
| outputFile                | 組み込みテンプレート出力ファイル処理   | テストケース H2CodeGeneratorTest.testOutputFile を参照                |
| entityBuilder             | エンティティ戦略設定         |                                                           |
| controllerBuilder         | Controller 戦略設定 |                                                           |
| mapperBuilder             | Mapper 戦略設定    |                                                           |
| serviceBuilder            | Service 戦略設定   |                                                           |

### 設定例

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .enableCapitalMode() // 大文字命名を有効化
    .enableSkipView() // スキップビューを有効化
    .disableSqlFilter() // SQL フィルタを無効化
    .likeTable(new LikeTable("USER")) // テーブル名のあいまいマッチング
    .addInclude("t_simple") // テーブル名のマッチングを追加
    .addTablePrefix("t_", "c_") // テーブル名のフィルタ用プレフィックスを追加
    .addFieldSuffix("_flag") // テーブル名のフィルタ用サフィックスを追加
    .build();
```

### Entity 戦略設定

Entity 戦略設定は、エンティティクラスの生成ルールをカスタマイズするために使用され、親クラス、シリアルバージョン UID、ファイルオーバーライド、フィールド定数、チェーンモデル、Lombok モデルなどが含まれます。

#### メソッド説明

| メソッド                                        | 説明                              | 例                                                         |
| ------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| nameConvert(INameConvert)                   | 名前変換実装                      |                                                              |
| superClass(Class<?>)                        | 親クラスを設定                          | `BaseEntity.class`                                           |
| superClass(String)                          | 親クラスを設定                          | `com.baomidou.global.BaseEntity`                             |
| disableSerialVersionUID                     | シリアルバージョン UIDの生成を無効化         | デフォルト値: `true`                                               |
| enableFileOverride                          | 既存ファイルのオーバーライド        | デフォルト値: `false`                                              |
| enableColumnConstant                        | フィールド定数の生成を有効化         | デフォルト値: `false`                                              |
| enableChainModel                            | チェーンモデルを有効化         | デフォルト値: `false`                                              |
| enableLombok                                | Lombok モデルを有効化         | デフォルト値: `false`  デフォルトではGetter、Setterのみです。3.5.10以降ToStringが追加されました |
| enableRemoveIsPrefix                        | Boolean 型フィールドの is プレフィックスの除去を有効化         | デフォルト値: `false`                                              |
| enableTableFieldAnnotation                  | エンティティ生成時のフィールドアノテーションを有効化         | デフォルト値: `false`                                              |
| enableActiveRecord                          | ActiveRecord モデルを有効化         | デフォルト値: `false`                                              |
| versionColumnName(String)                   | 楽観ロックフィールド名(データベースフィールド)          | `versionColumnName` と `versionPropertyName` のいずれかを選択できます      |
| versionPropertyName(String)                 | 楽観ロック属性名(エンティティ)                | `versionColumnName` と `versionPropertyName` のいずれかを選択できます      |
| logicDeleteColumnName(String)               | 論理削除フィールド名(データベースフィールド)        | `logicDeleteColumnName` と `logicDeletePropertyName` のいずれかを選択できます |
| logicDeletePropertyName(String)             | 論理削除属性名(エンティティ)              | `logicDeleteColumnName` と `logicDeletePropertyName` のいずれかを選択できます |
| naming                                      | データベーステーブルからエンティティへのマッピング命名戦略      | デフォルトではアンダースコアからキャメルケースへの変換: `NamingStrategy.underline_to_camel` となっています    |
| columnNaming                                | データベーステーブルフィールドからエンティティへのマッピング命名戦略  | デフォルトは `null`、指定されない場合は `naming` に基づいて実行します                      |
| addSuperEntityColumns(String...)            | 親クラスの共通フィールドを追加         |                                                              |
| addIgnoreColumns(String...)                 | 無視するフィールドを追加         |                                                              |
| addTableFills(IFill...)                     | テーブルフィールド補完を追加         |                                                              |
| addTableFills(List<IFill\>)                 | テーブルフィールド補完を追加         |                                                              |
| idType(IdType)                              | グローバル主キータイプ         |                                                              |
| convertFileName(ConverterFileName)          | ファイル名を変換         |                                                              |
| formatFileName(String)                      | ファイル名をフォーマット         |                                                              |
| toString(boolean)                           | ToString メソッドを生成するか         | デフォルトはtrue, 3.5.10以降から                                     |
| fieldUseJavaDoc                             | フィールドの JavaDoc アノテーションを有効化         | デフォルトはtrue, 3.5.10以降から                                     |
| classAnnotations(ClassAnnotationAttributes) | エンティティクラスアノテーションを追加         | 3.5.10以降から                                                 |
| tableAnnotationHandler                      | テーブルアノテーションハンドラー         | 3.5.10以降から                                                 |
| tableFieldAnnotationHandler                 | フィールドアノテーションハンドラー         | 3.5.10以降から                                                 |
| enableLombok(ClassAnnotationAttributes...)  | Lombok モデルを有効化し Lombok アノテーションを設定         | 3.5.10以降から.   使用@Data例: enableLombok(new ClassAnnotationAttributes("@Data","lombok.Data")) |

#### 設定例

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .entityBuilder()
    .superClass(BaseEntity.class)
    .disableSerialVersionUID()
    .enableChainModel()
    .enableLombok()
    .enableRemoveIsPrefix()
    .enableTableFieldAnnotation()
    .enableActiveRecord()
    .versionColumnName("version")
    .logicDeleteColumnName("deleted")
    .naming(NamingStrategy.no_change)
    .columnNaming(NamingStrategy.underline_to_camel)
    .addSuperEntityColumns("id", "created_by", "created_time", "updated_by", "updated_time")
    .addIgnoreColumns("age")
    .addTableFills(new Column("create_time", FieldFill.INSERT))
    .addTableFills(new Property("updateTime", FieldFill.INSERT_UPDATE))
    .idType(IdType.AUTO)
    .formatFileName("%sEntity")
    .build();
```

### Controller 戦略設定

Controller 戦略設定は、Controller クラスの生成ルールをカスタマイズするために使用され、親クラス、ファイルオーバーライド、キャメルからアンダースコアへの変換、@RestController アノテーションなどが含まれます。

#### メソッド説明

| メソッド                               | 説明                           | 例                               |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| superClass(Class<?>)               | 親クラスを設定                       | `BaseController.class`               |
| superClass(String)                 | 親クラスを設定                       | `com.baomidou.global.BaseController` |
| enableFileOverride                 | 既存ファイルをオーバーライド         | デフォルト値: `false`                       |
| enableHyphenStyle                  | キャメルからアンダースコアへの変換を有効化         | デフォルト値: `false`                       |
| enableRestStyle                    | @RestController コントローラの生成を有効化         | デフォルト値: `false`                       |
| convertFileName(ConverterFileName) | ファイル名を変換         |                                    |
| formatFileName(String)             | ファイル名をフォーマット         |                                    |

#### 設定例

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .controllerBuilder()
    .superClass(BaseController.class)
    .enableHyphenStyle()
    .enableRestStyle()
    .formatFileName("%sAction")
    .build();
```

### Service 戦略設定

Service 戦略設定は、Service インターフェースと実装クラスの生成ルールをカスタマイズするために使用され、親クラス、ファイルオーバーライド、ファイル名変換などが含まれます。

#### メソッド説明

| メソッド                                          | 説明                          | 例                                |
| --------------------------------------------- | ----------------------------- | ----------------------------------- |
| superServiceClass(Class<?>)                   | インターフェース親クラス         | `BaseService.class`                   |
| superServiceClass(String)                     | Service インターフェース親クラスを設定         | `com.baomidou.global.BaseService`     |
| superServiceImplClass(Class<?>)               | Service 実装クラス親クラスを設定         | `BaseServiceImpl.class`               |
| superServiceImplClass(String)                 | Service 実装クラス親クラスを設定         | `com.baomidou.global.BaseServiceImpl` |
| enableFileOverride                            | 既存ファイルをオーバーライド         | デフォルト値: `false`                        |
| convertServiceFileName(ConverterFileName)     | Service インターフェースファイル名を変換         |                                         |
| convertServiceImplFileName(ConverterFileName) | Service 実装クラスファイル名を変換         |                                         |
| formatServiceFileName(String)                 | Service インターフェースファイル名をフォーマット         |                                         |
| formatServiceImplFileName(String)             | Service 実装クラスファイル名をフォーマット         |                                         |

#### 設定例

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .serviceBuilder()
    .superServiceClass(BaseService.class)
    .superServiceImplClass(BaseServiceImpl.class)
    .formatServiceFileName("%sService")
    .formatServiceImplFileName("%sServiceImp")
    .build();
```

### Mapper 戦略設定

Mapper 戦略設定は、Mapper インターフェースと対応する XML マッピングファイルの生成ルールをカスタマイズするために使用され、親クラス、ファイルオーバーライド、Mapper 注釈、結果マッピング、列リスト、キャッシュ実装クラスなどが含まれます。

#### メソッド説明

| メソッド                                     | 説明                      | 例                           |
| ---------------------------------------- | ------------------------- | ------------------------------ |
| superClass(Class<?>)                     | 親クラスを設定                  | `BaseMapper.class`               |
| superClass(String)                       | 親クラスを設定                  | `com.baomidou.global.BaseMapper` |
| enableFileOverride                       | 既存ファイルをオーバーライド         | デフォルト値: `false`                   |
| enableMapperAnnotation                   | @Mapper アノテーションを有効化         | デフォルト値: `false`                   |
| enableBaseResultMap                      | BaseResultMap 生成を有効化         | デフォルト値: `false`                   |
| enableBaseColumnList                     | BaseColumnListを有効化         | デフォルト値: `false`                   |
| cache(Class<? extends Cache>)            | キャッシュ実装クラスを設定         | `MyMapperCache.class`            |
| convertMapperFileName(ConverterFileName) | Mapper クラスファイル名を変換         |                                    |
| convertXmlFileName(ConverterFileName)    | XML ファイル名を変換         |                                    |
| formatMapperFileName(String)             | Mapper ファイル名をフォーマット         |                                    |
| formatXmlFileName(String)                | XML 実装クラスファイル名をフォーマット         |                                    |
| generateMapperMethodHandler | カスタムMapper生成メソッド実装         | 3.5.10 以降                     |

#### 設定例

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .mapperBuilder()
    .superClass(BaseMapper.class)
    .enableMapperAnnotation()
    .enableBaseResultMap()
    .enableBaseColumnList()
    .cache(MyMapperCache.class)
    .formatMapperFileName("%sDao")
    .formatXmlFileName("%sXml")
    .build();
```

## カスタムテンプレートサポート (DTO/VO など) 設定

MyBatis-Plus コードジェネレーターは、DTO (Data Transfer Object) や VO (Value Object) などのカスタムテンプレートをサポートします。

```java
FastAutoGenerator.create(url, username, password)
    .globalConfig(builder -> {
        builder.author("abc") // 作者を設定
            .enableSwagger() // swagger モードを有効化
            .disableOpenDir() // 出力ディレクトリの自動オープンを無効化
            .outputDir(finalProjectPath + "/src/main/java"); // 出力ディレクトリを指定
    })
    .packageConfig(builder -> {
        builder.parent("com.baomidou.mybatisplus.samples") // 親パッケージ名を設定
            .moduleName("test") // 親パッケージモジュール名を設定
            .entity("model.entity") // エンティティクラスパッケージ名を設定
            .pathInfo(Collections.singletonMap(OutputFile.xml, finalProjectPath + "/src/main/resources/mapper")); // Mapper XML ファイル生成パスを設定
    })
     .injectionConfig(injectConfig -> {
                Map<String,Object> customMap = new HashMap<>();
                customMap.put("abc","1234");
                injectConfig.customMap(customMap); // カスタム属性を注入
                injectConfig.customFile(new CustomFile.Builder()
                    .fileName("entityDTO.java") // ファイル名
                    .templatePath("templates/entityDTO.java.ftl") // テンプレート生成パスを指定
                    .packageName("dto") // パッケージ名。3.5.10以降、package内でカスタムパッケージのフルパスを取得可能になりました。それ以前のバージョンでは取得できません。例:package.entityDTO
                    .build());
      })
    .templateEngine(new FreemarkerTemplateEngine())
    .execute(); // 生成を実行
```

上記の例では、名前を `entityDTO.java.ftl` とするカスタム Freemarker テンプレートを定義し、`customFile` マップに追加しました。コード生成時、コードジェネレーターはこのテンプレートを使用して DTO クラスを生成します。

:::note

- カスタムテンプレートファイルはプロジェクトの `templates` ディレクトリに配置するか、有効なパスを指定する必要があります。
- テンプレートファイルの命名は一定のルールに従う必要があります。例えば `entityDTO.java.ftl` を見てみると、`entityDTO` は生成クラス名、`.java` は生成ファイルタイプ、`.ftl` は Freemarker テンプレートの拡張子です。
- テンプレートファイルでは、Freemarker の構文を使用して `objectMap` 内のデータにアクセスできます。例えば、`${entityName}` はエンティティクラス名を取得できます。

:::

上記の設定により、開発者はプロジェクトの要件に基づいてコードジェネレーターのテンプレートをカスタマイズでき、特定のプロジェクト構造に合ったコードファイルを生成できます。
