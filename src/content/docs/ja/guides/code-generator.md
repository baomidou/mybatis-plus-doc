---
title: コードジェネレーター
sidebar:
  order: 2
---

AutoGenerator は MyBatis-Plus のコードジェネレーターです。AutoGenerator を使用することで、Entity、Mapper、Mapper XML、Service、Controller などの各モジュールのコードを迅速に生成でき、開発効率を大幅に向上させることができます。

:::note
古いコードジェネレーターは3.5.0以下のバージョンに適用されます。3.5.1以上のバージョンを使用している場合は、[新コードジェネレーター](/ja/guides/new-code-generator/)を参照して設定・使用してください。新しいコードジェネレーターはよりシンプルかつ強力で、すべてのユーザーに新しいコードジェネレーターへのアップグレードを推奨します。
:::

デモンストレーション：

![relationship](/images/content/generator.gif)

```java
// デモ例：mainメソッドを実行し、コンソールにモジュールのテーブル名を入力して Enter を押すと、対応するプロジェクトディレクトリ内に自動生成されます
public class CodeGenerator {

    /**
     * <p>
     * コンソールの内容を読み取る
     * </p>
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append(tip + "を入力してください：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotBlank(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("正しい" + tip + "を入力してください！");
    }

    public static void main(String[] args) {
        // コードジェネレーター
        AutoGenerator mpg = new AutoGenerator();

        // グローバル設定
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("jobob");
        gc.setOpen(false);
        // gc.setSwagger2(true); エンティティ属性のSwagger2アノテーション
        mpg.setGlobalConfig(gc);

        // データソース設定
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("パスワード");
        mpg.setDataSource(dsc);

        // パッケージ設定
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("モジュール名"));
        pc.setParent("com.baomidou.ant");
        mpg.setPackageInfo(pc);

        // カスタム設定
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // 何もしない
            }
        };

        // テンプレートエンジンが freemarker の場合
        String templatePath = "/templates/mapper.xml.ftl";
        // テンプレートエンジンが velocity の場合
        // String templatePath = "/templates/mapper.xml.vm";

        // カスタム出力設定
        List<FileOutConfig> focList = new ArrayList<>();
        // カスタム設定が優先的に出力されます
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // カスタム出力ファイル名：Entity にプレフィックス/サフィックスを設定した場合、xml の名前もそれに応じて変更されることに注意してください！！
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        /*
        cfg.setFileCreate(new IFileCreate() {
            @Override
            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
                // カスタムフォルダの作成が必要かどうかを判断
                checkDir("デフォルトメソッドで作成されたディレクトリ、カスタムディレクトリ用");
                if (fileType == FileType.MAPPER) {
                    // mapper ファイルが既に生成されているかどうかを判断し、再生成したくない場合は false を返す
                    return !new File(filePath).exists();
                }
                // テンプレートファイルの生成を許可
                return true;
            }
        });
        */
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // テンプレート設定
        TemplateConfig templateConfig = new TemplateConfig();

        // カスタム出力テンプレートの設定
        // カスタムテンプレートパスを指定。.ftl/.vmは付けないでください。使用するテンプレートエンジンに応じて自動的に認識されます
        // templateConfig.setEntity("templates/entity2.java");
        // templateConfig.setService();
        // templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // ストラテジー設定
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("親クラスエンティティ、ない場合は設定不要！");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // 共通の親クラス
        strategy.setSuperControllerClass("親クラスコントローラー、ない場合は設定不要！");
        // 親クラスに書かれた共通フィールド
        strategy.setSuperEntityColumns("id");
        strategy.setInclude(scanner("テーブル名、複数はカンマ区切り").split(","));
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
```

より詳細な設定については、[コードジェネレーター設定](/ja/reference/code-generator-configuration)を参照してください。

## 使用チュートリアル

### 依存関係の追加

MyBatis-Plus は `3.0.3` 以降、コードジェネレーターとテンプレートエンジンのデフォルト依存関係を削除し、関連する依存関係を手動で追加する必要があります：

- コードジェネレーター の依存関係を追加

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.5.0</version>
  </dependency>
  ```

- テンプレートエンジンの依存関係を追加、MyBatis-PlusはVelocity（デフォルト）、Freemarker、Beetlをサポートし、ユーザーは慣れ親しんだテンプレートエンジンを選択できます。もし要件を満たさない場合は、カスタムテンプレートエンジンを使用できます。

  Velocity（デフォルト）：

  ```xml
  <dependency>
      <groupId>org.apache.velocity</groupId>
      <artifactId>velocity-engine-core</artifactId>
      <version>最新バージョン</version>
  </dependency>
  ```

  Freemarker：

  ```xml
  <dependency>
      <groupId>org.freemarker</groupId>
      <artifactId>freemarker</artifactId>
      <version>最新バージョン</version>
  </dependency>
  ```

  Beetl：

  ```xml
  <dependency>
      <groupId>com.ibeetl</groupId>
      <artifactId>beetl</artifactId>
      <version>最新バージョン</version>
  </dependency>
  ```

  注意！デフォルト以外のエンジンを選択した場合、AutoGenerator でテンプレートエンジンを設定する必要があります。

  ```java
  AutoGenerator generator = new AutoGenerator();

  // freemarker エンジンの設定
  generator.setTemplateEngine(new FreemarkerTemplateEngine());

  // beetl エンジンの設定
  generator.setTemplateEngine(new BeetlTemplateEngine());

  // カスタムエンジンの設定（参照クラスはカスタムエンジンクラス）
  generator.setTemplateEngine(new CustomTemplateEngine());

  // その他の設定
  ...
  ```

### 設定の記述

MyBatis-Plus のコードジェネレーターは、ユーザーが選択できる大量のカスタムパラメータを提供し、ほとんどのユーザーの使用要件を満たすことができます。

- GlobalConfig の設定

  ```java
  GlobalConfig globalConfig = new GlobalConfig();
  globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java");
  globalConfig.setAuthor("jobob");
  globalConfig.setOpen(false);
  ```

- DataSourceConfig の設定

  ```java
  DataSourceConfig dataSourceConfig = new DataSourceConfig();
  dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
  dataSourceConfig.setDriverName("com.mysql.jdbc.Driver");
  dataSourceConfig.setUsername("root");
  dataSourceConfig.setPassword("パスワード");
  ```

より詳細なジェネレーター設定については、[コードジェネレーター設定](/ja/reference/code-generator-configuration/)を参照してください。

## カスタムテンプレートエンジン

`com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine` クラスを継承してください。

:::tip
カスタムテンプレートで使用可能なパラメータは？[AbstractTemplateEngine](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/main/java/com/baomidou/mybatisplus/generator/engine/AbstractTemplateEngine.java) クラスの getObjectMap メソッドが返す objectMap のすべての値が使用可能です。
:::

## カスタムコードテンプレート

```java
// カスタムテンプレートパスの指定、場所：/resources/templates/entity2.java.ftl（または.vm）
// .ftl（または.vm）は付けないでください。使用するテンプレートエンジンに応じて自動的に認識されます
TemplateConfig templateConfig = new TemplateConfig()
    .setEntity("templates/entity2.java");

AutoGenerator mpg = new AutoGenerator();
// カスタムテンプレートの設定
mpg.setTemplate(templateConfig);
```

## カスタムプロパティの注入

```java
InjectionConfig injectionConfig = new InjectionConfig() {
    // カスタムプロパティの注入: abc
    // .ftl（または.vm）テンプレートで${cfg.abc}を使用してプロパティを取得
    @Override
    public void initMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
        this.setMap(map);
    }
};
AutoGenerator mpg = new AutoGenerator();
// カスタムプロパティ注入の設定
mpg.setCfg(injectionConfig);
```

```xml
entity2.java.ftl
カスタムプロパティ注入abc=${cfg.abc}

entity2.java.vm
カスタムプロパティ注入abc=$!{cfg.abc}
```

## フィールドの追加情報クエリ注入

![relationship](/images/content/custom-fields.png)

```java
new DataSourceConfig().setDbQuery(new MySqlQuery() {

    /**
     * 親クラスのカスタムフィールドクエリ用に予約されたメソッドをオーバーライドします<br>
     * ここで使用される SQL は、親クラスの tableFieldsSql に対応するクエリフィールドです。デフォルトのクエリが要件を満たさない場合は、このメソッドをオーバーライドしてください<br>
     * テンプレート内での使用方法：table.fields を呼び出してすべてのフィールド情報を取得し、
     * 各フィールドに対して field.customMap を使って MAP 内の注入フィールド（例：NULL または PRIVILEGES）を取得します
     */
    @Override
    public String[] fieldCustom() {
        return new String[]{"NULL", "PRIVILEGES"};
    }
})
```
