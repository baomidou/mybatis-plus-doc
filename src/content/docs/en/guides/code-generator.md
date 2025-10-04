---
title: Code Generator
sidebar:
  order: 2
---
AutoGenerator is MyBatis-Plus's code generator that enables you to quickly generate code for various modules including Entity, Mapper, Mapper XML, Service, and Controller, significantly improving development efficiency.

:::note
The legacy code generator is applicable for versions below 3.5.1. If you are using version 3.5.1 or above, please refer to the [new code generator](/guides/new-code-generator/) for configuration and usage. The new code generator is more concise and powerful, and we recommend that everyone upgrade to it.
:::

Demo effect:

![relationship](/images/content/generator.gif)

```java
// Demo example, run the main method and enter the table name in the console to automatically generate code in the corresponding project directory
public class CodeGenerator {

    /**
     * <p>
     * Read console input
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
        // Code generator
        AutoGenerator mpg = new AutoGenerator();

        // Global configuration
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("jobob");
        gc.setOpen(false);
        // gc.setSwagger2(true); Entity property Swagger2 annotation
        mpg.setGlobalConfig(gc);

        // Data source configuration
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("密码");
        mpg.setDataSource(dsc);

        // Package configuration
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("模块名"));
        pc.setParent("com.baomidou.ant");
        mpg.setPackageInfo(pc);

        // Custom configuration
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        // If template engine is freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        // If template engine is velocity
        // String templatePath = "/templates/mapper.xml.vm";

        // Custom output configuration
        List<FileOutConfig> focList = new ArrayList<>();
        // Custom configuration will be output first
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // Custom output filename, if you set prefix/suffix for Entity, note that the XML name will change accordingly!!
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        /*
        cfg.setFileCreate(new IFileCreate() {
            @Override
            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
                // Check if custom directory needs to be created
                checkDir("Directory created using default method, use for custom directories");
                if (fileType == FileType.MAPPER) {
                    // Check if mapper file already exists, return false if you don't want to regenerate
                    return !new File(filePath).exists();
                }
                // Allow generating template files
                return true;
            }
        });
        */
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // Template configuration
        TemplateConfig templateConfig = new TemplateConfig();

        // Configure custom output templates
        // Specify custom template path, don't include .ftl/.vm extension, will be automatically recognized based on template engine used
        // templateConfig.setEntity("templates/entity2.java");
        // templateConfig.setService();
        // templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // Strategy configuration
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("Your own parent entity class, no need to set if you don't have one!");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // Common parent class
        strategy.setSuperControllerClass("Your own parent controller class, no need to set if you don't have one!");
        // Common fields in parent class
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

For more detailed configuration, please refer to the [Code Generator Configuration](/reference/code-generator-configuration) article.

## Usage Tutorial

### Adding Dependencies

Starting from version `3.0.3`, MyBatis-Plus removed the default dependencies for the code generator and template engine. You need to manually add the relevant dependencies:

- Add the code generator dependency

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.5.0</version>
  </dependency>
  ```

- Add a template engine dependency. MyBatis-Plus supports Velocity (default), Freemarker, and Beetl. You can choose a template engine you are familiar with. If none of these meet your requirements, you can use a custom template engine.

  Velocity (default):

  ```xml
  <dependency>
      <groupId>org.apache.velocity</groupId>
      <artifactId>velocity-engine-core</artifactId>
      <version>latest version</version>
  </dependency>
  ```

  Freemarker:

  ```xml
  <dependency>
      <groupId>org.freemarker</groupId>
      <artifactId>freemarker</artifactId>
      <version>latest version</version>
  </dependency>
  ```

  Beetl:

  ```xml
  <dependency>
      <groupId>com.ibeetl</groupId>
      <artifactId>beetl</artifactId>
      <version>latest version</version>
  </dependency>
  ```

  Note! If you choose a non-default engine, you must set the template engine in the AutoGenerator.

  ```java
  AutoGenerator generator = new AutoGenerator();

  // set freemarker engine
  generator.setTemplateEngine(new FreemarkerTemplateEngine());

  // set beetl engine
  generator.setTemplateEngine(new BeetlTemplateEngine());

  // set custom engine (reference class is your custom engine class)
  generator.setTemplateEngine(new CustomTemplateEngine());

  // other config
  ...
  ```

### Writing Configuration

MyBatis-Plus code generator provides numerous custom parameters for you to choose from, meeting the usage requirements for most scenarios.

- Configure GlobalConfig

  ```java
  GlobalConfig globalConfig = new GlobalConfig();
  globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java");
  globalConfig.setAuthor("jobob");
  globalConfig.setOpen(false);
  ```

- Configure DataSourceConfig

  ```java
  DataSourceConfig dataSourceConfig = new DataSourceConfig();
  dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
  dataSourceConfig.setDriverName("com.mysql.jdbc.Driver");
  dataSourceConfig.setUsername("root");
  dataSourceConfig.setPassword("password");
  ```

For more generator configurations, please refer to [Code Generator Configuration](/reference/code-generator-configuration/).

## Custom Template Engine

Please extend the class `com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine`

:::tip
What parameters are available for custom templates? All values in the `objectMap` returned by the `getObjectMap` method in the [AbstractTemplateEngine](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/main/java/com/baomidou/mybatisplus/generator/engine/AbstractTemplateEngine.java) class are available.
:::

## Custom Code Templates

```java
//Specify custom template path, location: /resources/templates/entity2.java.ftl (or .vm)
//Note: Do not include .ftl (or .vm) extension, it will be automatically recognized based on the template engine used
TemplateConfig templateConfig = new TemplateConfig()
    .setEntity("templates/entity2.java");

AutoGenerator mpg = new AutoGenerator();
//Configure custom template
mpg.setTemplate(templateConfig);
```

## Custom Property Injection

```java
InjectionConfig injectionConfig = new InjectionConfig() {
    // Custom property injection: abc
    // In .ftl (or .vm) templates, access the property via ${cfg.abc}
    @Override
    public void initMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
        this.setMap(map);
    }
};
AutoGenerator mpg = new AutoGenerator();
// Configure custom property injection
mpg.setCfg(injectionConfig);
```

```xml
entity2.java.ftl
Custom property injection abc=${cfg.abc}

entity2.java.vm
Custom property injection abc=$!{cfg.abc}
```

## Field Additional Information Query Injection

![relationship](/images/content/custom-fields.webp)

```java
new DataSourceConfig().setDbQuery(new MySqlQuery() {

    /**
     * Override the parent class's reserved query for custom fields<br>
     * The SQL queried here corresponds to the query fields in the parent class's tableFieldsSql. Override it if the default implementation doesn't meet your requirements<br>
     * Called in the template: table.fields gets all field information,
     * then loop through the fields and get field.customMap to retrieve injected fields like NULL or PRIVILEGES from the MAP
     */
    @Override
    public String[] fieldCustom() {
        return new String[]{"NULL", "PRIVILEGES"};
    }
})
```
