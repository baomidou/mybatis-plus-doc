---
sidebarDepth: 3
---

# 代码生成器

AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，极大的提升了开发效率。

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
            if (StringUtils.isNotEmpty(ipt)) {
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
        List<FileOutConfig> focList = new ArrayList<>();
        focList.add(new FileOutConfig("/templates/mapper.xml.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输入文件名称
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);
        mpg.setTemplate(new TemplateConfig().setXml(null));

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("com.baomidou.ant.common.BaseEntity");
        strategy.setEntityLombokModel(true);
        strategy.setSuperControllerClass("com.baomidou.ant.common.BaseController");
        strategy.setInclude(scanner("表名"));
        strategy.setSuperEntityColumns("id");
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}
```

![relationship](/img/generator.gif)

## 基本配置

### dataSource

- 类型：`DataSourceConfig`
- 默认值：`null`

数据源配置，通过该配置，指定需要生成代码的具体数据库，具体请查看 [数据源配置](#数据源配置)

### strategy

- 类型：`StrategyConfig`
- 默认值：`null`

数据库表配置，通过该配置，可指定需要生成哪些表或者排除哪些表，具体请查看 [数据库表配置](#数据库表配置)

### packageInfo

- 类型：`PackageConfig`
- 默认值：`null`

包名配置，通过该配置，指定生成代码的包路径，具体请查看 [包名配置](#包名配置)

### template

- 类型：`TemplateConfig`
- 默认值：`null`

模板配置，可自定义代码生成的模板，实现个性化操作，具体请查看 [模板配置](#模板配置)

### globalConfig

- 类型：`GlobalConfig`
- 默认值：`null`

全局策略配置，具体请查看 [全局策略配置](#全局策略配置)

### injectionConfig

- 类型：`InjectionConfig`
- 默认值：`null`

注入配置，通过该配置，可注入自定义参数等操作以实现个性化操作，具体请查看 [注入配置](#注入配置)

## 数据源配置

### dbType

### schemaName

### typeConvert

### url

### driverName

### username

### password

## 数据库表配置

### dbColumnUnderline

### isCapitalMode

### skipView

### naming

### columnNaming

### tablePrefix

### fieldPrefix

### superEntityClass

### superEntityColumns

### superMapperClass

### superServiceClass

### superServiceImplClass

### superControllerClass

### include

### exclude

### entityColumnConstant

### entityBuilderModel

### entityLombokModel

### entityBooleanColumnRemoveIsPrefix

### restControllerStyle

### controllerMappingHyphenStyle

### entityTableFieldAnnotationEnable

### versionFieldName

### logicDeleteFieldName

### tableFillList

## 包名配置

### parent

### moduleName

### entity

### service

### serviceImpl

### mapper

### xml

### controller

### pathInfo

## 模板配置

### entity

### entityKt

### service

### serviceImpl

### mapper

### xml

### controller

## 全局策略配置

### outputDir

### fileOverride

### open

### enableCache

### author

### kotlin

### swagger2

### activeRecord

### baseResultMap

### dateType

### baseColumnList

### entityName

### mapperName

### xmlName

### serviceName

### serviceImplName

### controllerName

### idType

## 注入配置

### map

### fileOutConfigList

### fileCreate

### initMap
