---
title: コードジェネレーターの設定
sidebar:
  order: 3
  badge:
    text: New
---
MyBatis-Plus の新しいコードジェネレーターは、既存の機能を継承しながら、より柔軟で効率的なビルダーパターンを導入しています。これにより、開発者は要件に合致したコードを迅速に生成できると同時に、コードの優雅さと整理された状態を維持できます。この新機能は、開発効率をさらに向上させ、重複作業を削減し、開発者がビジネスロジックの実装により集中できることを目的としています。

### 特徴説明

1. **Builder パターン**：Builder パターンにより、開発者は設定メソッドをチェーン呼び出しで直感的にコード生成器の設定を構築でき、コードをより明確で読みやすくします。

2. **迅速な設定**：新しいコード生成器は、グローバル設定、パッケージ設定、戦略設定などの迅速な設定オプションを提供し、常用オプションをワンクリックで設定でき、コード生成プロセスを素早く開始できます。

3. **テンプレートエンジン**：Freemarker などのテンプレートエンジンをサポートし、開発者がカスタムコードテンプレートを定義して、プロジェクトの特定のスタイルに合ったコードを生成できます。

4. **Lombok 統合**：新しいコード生成器はデフォルトで Lombok を有効にし、ボイラープレートコードの記述を減らし、コードの可読性と保守性を向上させます。

5. **マルチデータベースサポート**：MySQL、Oracle、SQL Server など、さまざまなデータベースタイプをサポートし、対応するデータベース接続情報を設定するだけで使用できます。

6. **柔軟なデータソース設定**：データベースクエリ方式、タイプコンバーター、キーワードハンドラーなど、豊富なデータソース設定オプションを提供し、さまざまなデータベースのニーズに対応します。

### サンプル設定

```java
// FastAutoGenerator を使用したコードジェネレータの高速設定
FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8", "root", "password")
    .globalConfig(builder -> {
        builder.author("Your Name") // 作者名を設定
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
            .enableTableFieldAnnotation() // フィールド注釈を有効化
            .controllerBuilder()
            .enableRestStyle(); // REST スタイルを有効化
    })
    .templateEngine(new FreemarkerTemplateEngine()) // Freemarker テンプレートエンジンを使用
    .execute(); // 生成を実行
```

### データベース設定 (DataSourceConfig)

#### 基本設定

| プロパティ | 説明         | 例                                           |
| ---------- | ------------ | -------------------------------------------- |
| url        | JDBC 接続URL | jdbc:mysql://127.0.0.1:3306/mybatis-plus    |
| username   | データベースユーザー名 | root                                         |
| password   | データベースパスワード | 123456                                       |

```java
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456").build();
```

#### オプション設定

| メソッド                                      | 説明                          | 例                                                           |
| --------------------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| dbQuery(IDbQuery)                             | データベースクエリ            | new MySqlQuery(),SQLQueryでのみ有効                          |
| schema(String)                                | データベーススキーマ(一部のデータベースで適用) | mybatis-plus                                                 |
| typeConvert(ITypeConvert)                     | データベース型変換器          | new MySqlTypeConvert(),SQLQueryでのみ有効                    |
| keyWordsHandler(IKeyWordsHandler)             | データベースキーワードハンドラー | new MySqlKeyWordsHandler()                                   |
| typeConvertHandler(ITypeConvertHandler)       | 型変換ハンドラー(デフォルト)   | カスタムITypeConvertHandler実装,DefaultQueryでのみ有効       |
| databaseQueryClass(AbstractDatabaseQuery)     | データベースクエリ方式        | デフォルトDefaultQuery.class(汎用メタデータ), SQLQuery.class(SQLクエリ) |

```java
// SQLクエリを使用したコード生成方式。旧式のコード生成方式であり、汎用性は高くありません。既存のコードは引き続き使用可能ですが、データベースへの適応にはdbQueryとtypeConvertの拡張が必要です。今後はこの方式のメンテナンスは行われません。
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .dbQuery(new MySqlQuery())
    .schema("mybatis-plus")
    .typeConvert(new MySqlTypeConvert())
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .databaseQueryClass(SQLQuery.class)
    .build();

// メタデータクエリを使用したコード生成方式。デフォルトではJDBCタイプに基づいてJavaタイプが適応され、typeConvertHandlerを使用したマッピングタイプの変換をサポートします。
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .schema("mybatis-plus")
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .build();
```

## グローバル設定 (GlobalConfig)

グローバル設定は、コードジェネレータの全体的な動作に関する設定を提供します。出力ディレクトリ、作者情報、Kotlin モード、Swagger 連携、日時型の戦略などを含みます。

### 方法説明

| メソッド                      | 説明                                 | 例                                                    |
| ------------------------- | ------------------------------------ | ------------------------------------------------------- |
| disableOpenDir()          | 自動的に出力ディレクトリを開くことを禁止します                 | デフォルト値: `true`                                          |
| outputDir(String)         | コード生成の出力ディレクトリを指定します               | `/opt/baomidou` デフォルト値: Windows: `D://` Linux/Mac: `/tmp` |
| author(String)            | 作者名を設定します                           | `baomidou` デフォルト値: 設定ファイルの作者名                   |
| enableKotlin()            | Kotlin モードを有効にします                     | デフォルト値: `false`                                         |
| enableSwagger()           | Swagger モードを有効にします                    | デフォルト値: `false`                                         |
| dateType(DateType)        | 時間タイプの戦略を設定します                     | `DateType.ONLY_DATE` デフォルト値: `DateType.TIME_PACK`       |
| commentDate(String)       | コメントの日付フォーマットを設定します                     | デフォルト値: `yyyy-MM-dd`                                    |

### サンプル設定

```java
GlobalConfig globalConfig = new GlobalConfig.Builder()
    .disableOpenDir(false) // 出力ディレクトリの自動オープンを許可
    .outputDir("/path/to/output") // 出力ディレクトリを設定
    .author("Your Name") // 作成者名を設定
    .enableKotlin(true) // Kotlin モードを有効化
    .enableSwagger(true) // Swagger モードを有効化
    .dateType(DateType.ONLY_DATE) // 日付タイプ戦略を設定
    .commentDate("yyyy-MM-dd") // コメント日付フォーマットを設定
    .build();
```

## 包配置 (PackageConfig)

包配置は、生成されるコードのパッケージ構造を定義するために使用されます。これには、親パッケージ名、モジュール名、エンティティクラスのパッケージ名、サービス層のパッケージ名などが含まれます。

### 方法説明

| メソッド                              | 説明              | 例                                                   |
| --------------------------------- | ----------------- | ------------------------------------------------------ |
| parent(String)                    | 親パッケージ名を設定        | デフォルト値: `com.baomidou`                                 |
| moduleName(String)                | 親パッケージのモジュール名を設定    | デフォルト値: なし                                             |
| entity(String)                    | Entity パッケージ名を設定  | デフォルト値: `entity`                                       |
| service(String)                   | Service パッケージ名を設定 | デフォルト値: `service`                                      |
| serviceImpl(String)               | Service Impl パッケージ名を設定 | デフォルト値: `service.impl`                                 |
| mapper(String)                    | Mapper パッケージ名を設定  | デフォルト値: `mapper`                                       |
| xml(String)                       | Mapper XML パッケージ名を設定 | デフォルト値: `mapper.xml`                                   |
| controller(String)                | Controller パッケージ名を設定 | デフォルト値: `controller`                                   |
| pathInfo(Map<OutputFile, String>) | パス設定情報を設定  | `Collections.singletonMap(OutputFile.mapperXml, "D://")` |

### サンプル設定

```java
PackageConfig packageConfig = new PackageConfig.Builder()
    .parent("com.example") // 親パッケージ名を設定
    .moduleName("myapp") // 親パッケージモジュール名を設定
    .entity("model") // Entityパッケージ名を設定
    .service("service") // Serviceパッケージ名を設定
    .serviceImpl("service.impl") // Service Implパッケージ名を設定
    .mapper("dao") // Mapperパッケージ名を設定
    .xml("mappers") // Mapper XMLパッケージ名を設定
    .controller("controller") // Controllerパッケージ名を設定
    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "/path/to/xml")) // パス設定情報を設定
    .build();
```

## テンプレート設定 (TemplateConfig)

注意：MyBatis-Plus 3.5.6 バージョン以降、テンプレート設定は `StrategyConfig` に移行されました。以下は移行後の設定方法です。

### 方法説明

| メソッド                                                     | 説明                | 例                                                                                           |
| ------------------------------------------------------------ | ------------------- |----------------------------------------------------------------------------------------------|
| entityBuilder()                                              | エンティティクラステンプレートを設定 |                                                                                              |
| javaTemplate(String)                                         | Java エンティティテンプレートを設定 | `/templates/entity.java`                                                                     |
| disable()                                                    | エンティティクラス生成を無効化 |                                                                                              |
| serviceBuilder()                                             | Service 層テンプレートを設定 |                                                                                              |
| disableService()                                             | Service 層生成を無効化 |                                                                                              |
| serviceTemplate(String)                                      | Service テンプレートを設定 | `/templates/service.java`                                                                    |
| serviceImplTemplate(String)                                  | ServiceImpl テンプレートを設定 | `/templates/serviceImpl.java`                                                               |

### サンプル設定

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
    .javaTemplate("/templates/entity.java") // エンティティクラステンプレートを設定
    .disable() // エンティティクラスの生成を無効化
    .serviceBuilder()
    .disableService() // Service 層の生成を無効化
    .serviceTemplate("/templates/service.java") // Service テンプレートを設定
    .serviceImplTemplate("/templates/serviceImpl.java") // ServiceImpl テンプレートを設定
    .build();
```

## 注入配置 (InjectionConfig)

注入設定により、開発者はコードジェネレーターの動作をカスタマイズできます。これには、ファイル出力前に実行するロジック、カスタム設定用のMapオブジェクト、カスタム設定用のテンプレートファイルなどが含まれます。

### 方法説明

| メソッド                                                       | 説明                     | 例                                                                                           |
| ------------------------------------------------------------ | ------------------------ |----------------------------------------------------------------------------------------------|
| beforeOutputFile(BiConsumer<TableInfo, Map<String, Object>>) | ファイル出力前に実行するロジック | ファイル生成前にカスタムロジックを実行します。テーブル情報の出力や設定データの変更などが可能です。                   |
| customMap(Map<String, Object>)                               | カスタム設定 Map オブジェクト   | テンプレート内でカスタム設定情報（プロジェクト名、作者など）にアクセスするために使用されます。                       |
| customFile(Map<String, String>)                              | カスタムテンプレートファイルの設定 | カスタムテンプレートファイルのパスを指定するために使用されます。ファイル名をフォーマットできます。テストケース H2CodeGeneratorTest.testCustomFileByList を参照してください |

### サンプル設定

```java
InjectionConfig injectionConfig = new InjectionConfig.Builder()
    .beforeOutputFile((tableInfo, objectMap) -> {
        System.out.println("準備生成ファイル: " + tableInfo.getEntityName());
        // ここでカスタムロジックを追加できます。例: objectMap 内の設定を変更する
    })
    .customMap(Collections.singletonMap("projectName", "MyBatis-Plus Generator"))
    .customFile(Collections.singletonMap("custom.txt", "/templates/custom.vm"))
    .build();
```

上記の設定により、開発者は自身のニーズに基づいて、コードジェネレーターの動作を柔軟にカスタマイズできます。例えば、ファイル生成前に特定のロジックを実行したり、カスタムテンプレートファイルを使用してコードを生成したりすることが可能です。これらの設定オプションは高い柔軟性を提供し、MyBatis-Plus コードジェネレーターが様々な複雑なプロジェクト要件に対応できるようにします。

## 策略配置 (StrategyConfig)

策略設定は MyBatis-Plus コードジェネレータの核心部分であり、開発者がプロジェクト要件に基づいてコード生成のルールをカスタマイズすることを可能にします。これには命名パターン、テーブルとフィールドのフィルタリング、および各コードモジュールの生成戦略が含まれます。

### 方法説明

| メソッド                      | 説明                   | 例                                                           |
|-----------------------------|----------------------|-------------------------------------------------------------|
| enableCapitalMode         | 大文字命名を有効化         | デフォルト値: `false`                                             |
| enableSkipView            | ビューのスキップを有効化     | デフォルト値: `false`                                             |
| disableSqlFilter          | SQLフィルターを無効化      | デフォルト値: `true`、SQLフィルターがサポートされていない場合、このオプションをオフにできます |
| enableSchema              | スキーマを有効化         | デフォルト値: `false`、マルチスキーマのシナリオで有効化します                 |
| likeTable(LikeTable)      | あいまいテーブル一致(SQLフィルター) | `notLikeTable` と相互排他、いずれか一方のみ設定可能                   |
| notLikeTable(LikeTable)   | あいまいテーブル除外(SQLフィルター) | `likeTable` と相互排他、いずれか一方のみ設定可能                   |
| addInclude(String...)     | テーブル一致を追加(メモリフィルター) | `addExclude` と相互排他、いずれか一方のみ設定可能、正規表現をサポート（例: `^t_.*` は `t_` で始まるすべてのテーブル名に一致） |
| addExclude(String...)     | テーブル除外を追加(メモリフィルター) | `addInclude` と相互排他、いずれか一方のみ設定可能、正規表現をサポート（例: `.*st$` は `st` で終わるすべてのテーブル名に一致） |
| addTablePrefix(String...) | フィルターテーブル接頭辞を追加   |                                                             |
| addTableSuffix(String...) | フィルターテーブル接尾辞を追加   |                                                             |
| addFieldPrefix(String...) | フィルターフィールド接頭辞を追加  |                                                             |
| addFieldSuffix(String...) | フィルターフィールド接尾辞を追加  |                                                             |
| outputFile                | 組み込みテンプレート出力ファイル処理 | テストケース `H2CodeGeneratorTest.testOutputFile` を参照             |
| entityBuilder             | エンティティ戦略設定       |                                                             |
| controllerBuilder         | Controller戦略設定    |                                                             |
| mapperBuilder             | Mapper戦略設定       |                                                             |
| serviceBuilder            | Service戦略設定      |                                                             |

### サンプル設定

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .enableCapitalMode() // 大文字命名を有効化
    .enableSkipView() // ビューのスキップを有効化
    .disableSqlFilter() // SQLフィルターを無効化
    .likeTable(new LikeTable("USER")) // テーブル名のあいまい一致
    .addInclude("t_simple") // テーブルマッチングを追加
    .addTablePrefix("t_", "c_") // テーブルプレフィックスのフィルターを追加
    .addFieldSuffix("_flag") // フィールドサフィックスのフィルターを追加
    .build();
```

### Entity 策略配置

Entity 策略配置は、エンティティクラスの生成ルールをカスタマイズするために使用されます。親クラス、シリアル化バージョン UID、ファイル上書き、フィールド定数、チェーンモデル、Lombok モデルなどを含みます。

#### メソッド説明

| メソッド                                        | 説明                                 | 例                                                           |
| ------------------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| nameConvert(INameConvert)                   | 名前変換の実装                       |                                                              |
| superClass(Class<?>)                        | 親クラスの設定                       | `BaseEntity.class`                                           |
| superClass(String)                          | 親クラスの設定                       | `com.baomidou.global.BaseEntity`                             |
| disableSerialVersionUID                     | serialVersionUID の生成を無効化      | デフォルト値: `true`                                         |
| enableFileOverride                          | 生成済みファイルを上書き             | デフォルト値: `false`                                        |
| enableColumnConstant                        | フィールド定数の生成を有効化         | デフォルト値: `false`                                        |
| enableChainModel                            | チェーンモデルを有効化               | デフォルト値: `false`                                        |
| enableLombok                                | Lombok モデルを有効化                | デフォルト値: `false`  デフォルトは Getter,Setter のみ。3.5.10 以降は ToString も追加 |
| enableRemoveIsPrefix                        | Boolean 型フィールドの is プレフィックスを除去 | デフォルト値: `false`                                        |
| enableTableFieldAnnotation                  | エンティティ生成時のフィールド注釈生成を有効化 | デフォルト値: `false`                                        |
| enableActiveRecord                          | ActiveRecord モデルを有効化          | デフォルト値: `false`                                        |
| versionColumnName(String)                   | 楽観的ロックフィールド名(データベースフィールド) | `versionColumnName` と `versionPropertyName` のいずれかを選択 |
| versionPropertyName(String)                 | 楽観的ロックプロパティ名(エンティティ) | `versionColumnName` と `versionPropertyName` のいずれかを選択 |
| logicDeleteColumnName(String)               | 論理削除フィールド名(データベースフィールド) | `logicDeleteColumnName` と `logicDeletePropertyName` のいずれかを選択 |
| logicDeletePropertyName(String)             | 論理削除プロパティ名(エンティティ)   | `logicDeleteColumnName` と `logicDeletePropertyName` のいずれかを選択 |
| naming                                      | データベーステーブルからエンティティへの命名戦略 | デフォルトはアンダースコアからキャメルケース: `NamingStrategy.underline_to_camel` |
| columnNaming                                | データベーステーブルフィールドからエンティティへの命名戦略 | デフォルトは `null`、未指定の場合は `naming` に従う          |
| addSuperEntityColumns(String...)            | 親クラスの共通フィールドを追加       |                                                              |
| addIgnoreColumns(String...)                 | 無視するフィールドを追加             |                                                              |
| addTableFills(IFill...)                     | テーブルフィールドの自動入力を追加   |                                                              |
| addTableFills(List<IFill\>)                 | テーブルフィールドの自動入力を追加   |                                                              |
| idType(IdType)                              | グローバルな主キータイプ             |                                                              |
| convertFileName(ConverterFileName)          | ファイル名の変換                     |                                                              |
| formatFileName(String)                      | ファイル名のフォーマット             |                                                              |
| toString(boolean)                           | ToString メソッドを生成するかどうか  | デフォルトは true, 3.5.10 以降                               |
| fieldUseJavaDoc                             | フィールドの JavaDoc コメントを有効化 | デフォルトは true, 3.5.10 以降                               |
| classAnnotations(ClassAnnotationAttributes) | エンティティクラスの注釈を追加       | 3.5.10 以降                                                  |
| tableAnnotationHandler                      | テーブル注釈ハンドラー               | 3.5.10 以降                                                  |
| tableFieldAnnotationHandler                 | フィールド注釈ハンドラー             | 3.5.10 以降                                                  |
| enableLombok(ClassAnnotationAttributes...)  | Lombok モデルを有効化し Lombok 注釈を設定 | 3.5.10 以降.   @Data 使用例: enableLombok(new ClassAnnotationAttributes("@Data","lombok.Data")) |

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

Controller 戦略設定は、Controller クラスの生成ルールをカスタマイズするために使用され、親クラス、ファイル上書き、キャメルケースからハイフン区切りへの変換、RestController アノテーションなどを含みます。

#### メソッド説明

| メソッド                               | 説明                           | 例                                   |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| superClass(Class<?>)               | 親クラスを設定                 | `BaseController.class`               |
| superClass(String)                 | 親クラスを設定                 | `com.baomidou.global.BaseController` |
| enableFileOverride                 | 生成済みファイルを上書き       | デフォルト値: `false`                 |
| enableHyphenStyle                  | キャメルケースからハイフン区切りへの変換を有効化 | デフォルト値: `false`                 |
| enableRestStyle                    | @RestController コントローラーの生成を有効化 | デフォルト値: `false`                 |
| convertFileName(ConverterFileName) | ファイル名を変換               |                                    |
| formatFileName(String)             | ファイル名をフォーマット       |                                    |

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

### Service 策略配置

Service 策略配置は、Service インターフェースと実装クラスの生成ルールをカスタマイズするために使用されます。親クラス、ファイル上書き、ファイル名変換などを含みます。

#### 方法説明

| メソッド                                          | 説明                              | 例                                    |
| --------------------------------------------- | --------------------------------- | ----------------------------------- |
| superServiceClass(Class<?>)                   | インターフェースの親クラスを設定  | `BaseService.class`                   |
| superServiceClass(String)                     | Service インターフェースの親クラスを設定 | `com.baomidou.global.BaseService`     |
| superServiceImplClass(Class<?>)               | Service 実装クラスの親クラスを設定 | `BaseServiceImpl.class`               |
| superServiceImplClass(String)                 | Service 実装クラスの親クラスを設定 | `com.baomidou.global.BaseServiceImpl` |
| enableFileOverride                            | 既存の生成ファイルを上書き        | デフォルト値: `false`                   |
| convertServiceFileName(ConverterFileName)     | Service インターフェースファイル名を変換 |                                         |
| convertServiceImplFileName(ConverterFileName) | Service 実装クラスファイル名を変換   |                                         |
| formatServiceFileName(String)                 | Service インターフェースファイル名をフォーマット |                                         |
| formatServiceImplFileName(String)             | Service 実装クラスファイル名をフォーマット |                                         |

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

Mapper 戦略設定は、Mapper インターフェースおよび対応する XML マッピングファイルの生成ルールをカスタマイズするために使用されます。親クラス、ファイル上書き、Mapper アノテーション、結果マッピング、カラムリスト、キャッシュ実装クラスなどを含みます。

#### メソッド説明

| メソッド                                     | 説明                              | 例                               |
| ---------------------------------------- | --------------------------------- | -------------------------------- |
| superClass(Class<?>)                     | 親クラスを設定                    | `BaseMapper.class`                 |
| superClass(String)                       | 親クラスを設定                    | `com.baomidou.global.BaseMapper`   |
| enableFileOverride                       | 既に生成されたファイルを上書き    | デフォルト値: `false`               |
| enableMapperAnnotation                   | @Mapper アノテーションを有効化    | デフォルト値: `false`               |
| enableBaseResultMap                      | BaseResultMap の生成を有効化      | デフォルト値: `false`               |
| enableBaseColumnList                     | BaseColumnList を有効化           | デフォルト値: `false`               |
| cache(Class<? extends Cache>)            | キャッシュ実装クラスを設定        | `MyMapperCache.class`              |
| convertMapperFileName(ConverterFileName) | Mapper クラスファイル名を変換     |                                    |
| convertXmlFileName(ConverterFileName)    | XML ファイル名を変換              |                                    |
| formatMapperFileName(String)             | Mapper ファイル名をフォーマット   |                                    |
| formatXmlFileName(String)                | XML 実装クラスファイル名をフォーマット |                                    |
| generateMapperMethodHandler | Mapperメソッド実装のカスタム生成 | 3.5.10以降                      |

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

## カスタムテンプレートサポート (DTO/VO など) の設定

MyBatis-Plus コードジェネレーターは、DTO (Data Transfer Object) や VO (Value Object) などのカスタムテンプレートをサポートしています。

```java
FastAutoGenerator.create(url, username, password)
    .globalConfig(builder -> {
        builder.author("abc") // 作者を設定
            .enableSwagger() // swagger モードを有効化
            .disableOpenDir() // 出力ディレクトリの自動開示を無効化
            .outputDir(finalProjectPath + "/src/main/java"); // 出力ディレクトリを指定
    })
    .packageConfig(builder -> {
        builder.parent("com.baomidou.mybatisplus.samples") // 親パッケージ名を設定
            .moduleName("test") // 親パッケージモジュール名を設定
            .entity("model.entity") // エンティティクラスのパッケージ名を設定
            .pathInfo(Collections.singletonMap(OutputFile.xml, finalProjectPath + "/src/main/resources/mapper")); // Mapper XML ファイルの生成パスを設定
    })
     .injectionConfig(injectConfig -> {
                Map<String,Object> customMap = new HashMap<>();
                customMap.put("abc","1234");
                injectConfig.customMap(customMap); //カスタム属性を注入
                injectConfig.customFile(new CustomFile.Builder()
                    .fileName("entityDTO.java") //ファイル名
                    .templatePath("templates/entityDTO.java.ftl") //生成テンプレートのパスを指定
                    .packageName("dto") //パッケージ名, バージョン3.5.10以降では、packageからカスタムパッケージのフルパスを取得可能。低バージョンでは取得不可。例:package.entityDTO
                    .build());
      })
    .templateEngine(new FreemarkerTemplateEngine())
    .execute(); // 生成を実行
```

上記の例では、`entityDTO.java.ftl` という名前のカスタム Freemarker テンプレートを定義し、そのパスを `customFile` マップに追加しています。コード生成時、コードジェネレーターはこのテンプレートを使用して DTO クラスを生成します。

:::note

- カスタムテンプレートファイルは、プロジェクトの `templates` ディレクトリに配置するか、有効なパスを指定する必要があります。
- テンプレートファイルの命名は一定の規則に従うことを推奨します。例えば `entityDTO.java.ftl` の場合、`entityDTO` は生成されるクラス名、`.java` は生成されるファイルタイプ、`.ftl` は Freemarker テンプレートの拡張子を示します。
- テンプレートファイル内では、Freemarker の構文を使用して `objectMap` 内のデータにアクセスできます。例えば `${entityName}` でエンティティクラスの名称を取得できます。

:::

上記の設定により、開発者はプロジェクトの要件に応じてコードジェネレーターのテンプレートをカスタマイズし、特定のプロジェクト構造に適合したコードファイルを生成することができます。
