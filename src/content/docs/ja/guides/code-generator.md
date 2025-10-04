---
title: コードジェネレーター
sidebar:
  order: 2
---
AutoGenerator は MyBatis-Plus のコードジェネレータであり、AutoGenerator を使用することで Entity、Mapper、Mapper XML、Service、Controller などの各モジュールのコードを迅速に生成でき、開発効率を大幅に向上させることができます。

:::note
旧コードジェネレータは 3.5.1 以下バージョンに適用されます。3.5.1 以上バージョンをご利用の場合は、[新コードジェネレータ](/guides/new-code-generator/) を参照して設定と使用を行ってください。新しいコードジェネレータはより簡潔で強力であり、すべてのユーザーに新しいコードジェネレータへのアップグレードを推奨します。
:::

デモ効果図：

![relationship](/images/content/generator.gif)

```java
// 演示例子，执行 main 方法控制台输入模块表名回车自动生成对应项目目录中
public class CodeGenerator {

    /**
     * <p>
     * 读取控制台内容
     * </p>
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotBlank(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("jobob");
        gc.setOpen(false);
        // gc.setSwagger2(true); 实体属性 Swagger2 注解
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("密码");
        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("模块名"));
        pc.setParent("com.baomidou.ant");
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        // 如果模板引擎是 freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        // 如果模板引擎是 velocity
        // String templatePath = "/templates/mapper.xml.vm";

        // 自定义输出配置
        List<FileOutConfig> focList = new ArrayList<>();
        // 自定义配置会被优先输出
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        /*
        cfg.setFileCreate(new IFileCreate() {
            @Override
            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
                // 判断自定义文件夹是否需要创建
                checkDir("调用默认方法创建的目录，自定义目录用");
                if (fileType == FileType.MAPPER) {
                    // 已经生成 mapper 文件判断存在，不想重新生成返回 false
                    return !new File(filePath).exists();
                }
                // 允许生成模板文件
                return true;
            }
        });
        */
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 配置模板
        TemplateConfig templateConfig = new TemplateConfig();

        // 配置自定义输出模板
        //指定自定义模板路径，注意不要带上.ftl/.vm, 会根据使用的模板引擎自动识别
        // templateConfig.setEntity("templates/entity2.java");
        // templateConfig.setService();
        // templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("你自己的父类实体,没有就不用设置!");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // 公共父类
        strategy.setSuperControllerClass("你自己的父类控制器,没有就不用设置!");
        // 写于父类中的公共字段
        strategy.setSuperEntityColumns("id");
        strategy.setInclude(scanner("表名，多个英文逗号分割").split(","));
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
```

より詳細な設定については、[コードジェネレータ設定](/reference/code-generator-configuration) の記事を参照してください。

## 使用チュートリアル

### 依存関係の追加

MyBatis-Plus はバージョン `3.0.3` 以降、コードジェネレータとテンプレートエンジンのデフォルト依存関係を削除しました。関連する依存関係を手動で追加する必要があります：

- コードジェネレータの依存関係を追加

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.5.0</version>
  </dependency>
  ```

- テンプレートエンジンの依存関係を追加。MyBatis-Plus は Velocity（デフォルト）、Freemarker、Beetl をサポートしています。ユーザーは自身が慣れ親しんだテンプレートエンジンを選択できます。いずれも要件を満たさない場合は、カスタムテンプレートエンジンを採用することも可能です。

  Velocity（デフォルト）：

  ```xml
  <dependency>
      <groupId>org.apache.velocity</groupId>
      <artifactId>velocity-engine-core</artifactId>
      <version>最新版本</version>
  </dependency>
  ```

  Freemarker：

  ```xml
  <dependency>
      <groupId>org.freemarker</groupId>
      <artifactId>freemarker</artifactId>
      <version>最新版本</version>
  </dependency>
  ```

  Beetl：

  ```xml
  <dependency>
      <groupId>com.ibeetl</groupId>
      <artifactId>beetl</artifactId>
      <version>最新版本</version>
  </dependency>
  ```

  注意！デフォルト以外のエンジンを選択した場合、AutoGenerator でテンプレートエンジンを設定する必要があります。

  ```java
  AutoGenerator generator = new AutoGenerator();

  // freemarker エンジンを設定
  generator.setTemplateEngine(new FreemarkerTemplateEngine());

  // beetl エンジンを設定
  generator.setTemplateEngine(new BeetlTemplateEngine());

  // カスタムエンジンを設定 (参照クラスはカスタムエンジンクラス)
  generator.setTemplateEngine(new CustomTemplateEngine());

  // その他の設定
  ...
  ```

### 設定の記述

MyBatis-Plus のコードジェネレーターは、ユーザーが選択できる多数のカスタマイズパラメーターを提供しており、ほとんどのユーザーの使用要件を満たすことができます。

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
  dataSourceConfig.setPassword("password");
  ```

その他のジェネレーター設定については、[コードジェネレーター設定](/reference/code-generator-configuration/) をご覧ください。

## カスタムテンプレートエンジン

クラス `com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine` を継承してください。

:::tip
カスタムテンプレートで利用可能なパラメータは何ですか？[AbstractTemplateEngine](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/main/java/com/baomidou/mybatisplus/generator/engine/AbstractTemplateEngine.java) クラスのメソッド `getObjectMap` が返す `objectMap` のすべての値が利用可能です。
:::

## カスタムコードテンプレート

```java
//カスタムテンプレートのパスを指定、場所：/resources/templates/entity2.java.ftl（または.vm）
//.ftl（または.vm）を含めないでください。使用するテンプレートエンジンに基づいて自動認識されます
TemplateConfig templateConfig = new TemplateConfig()
    .setEntity("templates/entity2.java");

AutoGenerator mpg = new AutoGenerator();
//カスタムテンプレートを設定
mpg.setTemplate(templateConfig);
```

## カスタム属性インジェクション

```java
InjectionConfig injectionConfig = new InjectionConfig() {
    //カスタム属性インジェクション:abc
    //.ftl（または.vm）テンプレート内で${cfg.abc}を使用して属性を取得します
    @Override
    public void initMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
        this.setMap(map);
    }
};
AutoGenerator mpg = new AutoGenerator();
//カスタム属性インジェクションを設定
mpg.setCfg(injectionConfig);
```

```xml
entity2.java.ftl
カスタム属性インジェクションabc=${cfg.abc}

entity2.java.vm
カスタム属性インジェクションabc=$!{cfg.abc}
```

## フィールドその他情報のクエリ注入

![relationship](/images/content/custom-fields.webp)

```java
new DataSourceConfig().setDbQuery(new MySqlQuery() {

    /**
     * 親クラスで予約されたカスタムフィールドクエリをオーバーライドします<br>
     * ここでクエリする SQL は親クラスの tableFieldsSql のクエリフィールドに対応し、デフォルトでは要件を満たさない場合はオーバーライドしてください<br>
     * テンプレートでの呼び出し： table.fields で全てのフィールド情報を取得し、
     * フィールドをループ処理して field.customMap から以下の注入フィールドを MAP から取得します  NULL または PRIVILEGES
     */
    @Override
    public String[] fieldCustom() {
        return new String[]{"NULL", "PRIVILEGES"};
    }
})
```
