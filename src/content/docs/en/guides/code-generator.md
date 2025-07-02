---
title: Code Generator
sidebar:
  order: 2
---
AutoGenerator is the code generator of MyBatis-Plus. With AutoGenerator, you can quickly generate code for various modules such as Entity, Mapper, Mapper XML, Service, Controller, etc., greatly improving development efficiency.

:::note
The old code generator is applicable to versions below 3.5.1. If you are using version 3.5.1 or above, please refer to the [New Code Generator](/guides/new-code-generator/) for configuration and usage. The new code generator is more concise and powerful, and it is recommended that everyone upgrade to it.
:::

Demo effect:

![relationship](/images/content/generator.gif)

```java
// Demo example, execute the main method and enter the module table name in the console to automatically generate the corresponding project directory
public class CodeGenerator {

    /**
     * <p>
     * Read console input
     * </p>
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("Please enter " + tip + ":");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotBlank(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("Please enter the correct " + tip + "!");
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
        dsc.setPassword("password");
        mpg.setDataSource(dsc);

        // Package configuration
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("module name"));
        pc.setParent("com.baomidou.ant");
        mpg.setPackageInfo(pc);

        // Custom configuration
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        // If the template engine is freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        // If the template engine is velocity
        // String templatePath = "/templates/mapper.xml.vm";

        // Custom output configuration
        List<FileOutConfig> focList = new ArrayList<>();
        // Custom configurations will be output first
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // Custom output filename. If you set prefixes/suffixes for Entity, note that the XML name will change accordingly!!
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        /*
        cfg.setFileCreate(new IFileCreate() {
            @Override
            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
                // Check if custom directories need to be created
                checkDir("Directories created by default methods, use custom directories");
                if (fileType == FileType.MAPPER) {
                    // Check if the mapper file already exists to avoid regeneration
                    return !new File(filePath).exists();
                }
                // Allow template file generation
                return true;
            }
        });
        */
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // Template configuration
        TemplateConfig templateConfig = new TemplateConfig();

        // Configure custom output templates
        // Specify custom template paths. Do not include .ftl/.vm, as the template engine will automatically recognize them
        // templateConfig.setEntity("templates/entity2.java");
        // templateConfig.setService();
        // templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // Strategy configuration
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("Your own parent entity class, leave unset if not needed!");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        // Common parent class
        strategy.setSuperControllerClass("Your own parent controller class, leave unset if not needed!");
        // Common fields in the parent class
        strategy.setSuperEntityColumns("id");
        strategy.setInclude(scanner("Table names, separated by commas").split(","));
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
```

For more detailed configurations, please refer to the [Code Generator Configuration](/reference/code-generator-configuration) article.

## Usage Tutorial

### Adding Dependencies

Starting from version `3.0.3`, MyBatis-Plus has removed the default dependencies for the code generator and template engine, requiring manual addition of the relevant dependencies:

- Add the **Code Generator** dependency:

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.5.0</version>
  </dependency>
  ```

- Add the **Template Engine** dependency. MyBatis-Plus supports Velocity (default), Freemarker, and Beetl. Users can choose their preferred template engine. If none meet your requirements, a custom template engine can be used.

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

  Note! If you choose a non-default engine, you need to configure the template engine in the `AutoGenerator`.

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

MyBatis-Plus's code generator provides a wide range of customizable parameters to meet the needs of most users.  

- Configuring GlobalConfig  

  ```java
  GlobalConfig globalConfig = new GlobalConfig();
  globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java");
  globalConfig.setAuthor("jobob");
  globalConfig.setOpen(false);
  ```  

- Configuring DataSourceConfig  

  ```java
  DataSourceConfig dataSourceConfig = new DataSourceConfig();
  dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
  dataSourceConfig.setDriverName("com.mysql.jdbc.Driver");
  dataSourceConfig.setUsername("root");
  dataSourceConfig.setPassword("password");
  ```  

For more generator configurations, please refer to [Code Generator Configuration](/reference/code-generator-configuration/).

## Custom Template Engine  

Please inherit the class `com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine`  

:::tip  
What parameters are available for custom templates? All values in the `objectMap` returned by the `getObjectMap` method in the [AbstractTemplateEngine](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/main/java/com/baomidou/mybatisplus/generator/engine/AbstractTemplateEngine.java) class are usable.  
:::

## Custom Code Templates

```java
//Specify the custom template path, location: /resources/templates/entity2.java.ftl (or .vm)
//Note: Do not include .ftl (or .vm), it will be automatically recognized based on the template engine used
TemplateConfig templateConfig = new TemplateConfig()
    .setEntity("templates/entity2.java");

AutoGenerator mpg = new AutoGenerator();
//Configure custom templates
mpg.setTemplate(templateConfig);
```

## Custom Attribute Injection  

```java  
InjectionConfig injectionConfig = new InjectionConfig() {  
    //Custom attribute injection: abc  
    //In .ftl (or .vm) templates, access the attribute via ${cfg.abc}  
    @Override  
    public void initMap() {  
        Map<String, Object> map = new HashMap<>();  
        map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");  
        this.setMap(map);  
    }  
};  
AutoGenerator mpg = new AutoGenerator();  
//Configure custom attribute injection  
mpg.setCfg(injectionConfig);  
```  

```xml  
entity2.java.ftl  
Custom attribute injection abc=${cfg.abc}  

entity2.java.vm  
Custom attribute injection abc=$!{cfg.abc}  
```

## Field Additional Information Query Injection  

![relationship](/images/content/custom-fields.png)  

```java  
new DataSourceConfig().setDbQuery(new MySqlQuery() {  

    /**  
     * Override the parent class's reserved query for custom fields.<br>  
     * The SQL queried here corresponds to the query fields in the parent class's `tableFieldsSql`. If the default does not meet your needs, override it.<br>  
     * In the template, call: `table.fields` to retrieve all field information,  
     * then loop through the fields and use `field.customMap` to obtain injected fields such as `NULL` or `PRIVILEGES` from the MAP.  
     */  
    @Override  
    public String[] fieldCustom() {  
        return new String[]{"NULL", "PRIVILEGES"};  
    }  
})  
```
