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
        strategy.setRestControllerStyle(true);
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

## 数据源 `dataSourceConfig` 配置

### dbQuery
- 数据库信息查询类
- 默认由 `dbType` 类型决定选择对应数据库内置实现

实现 `IDbQuery` 接口自定义数据库查询 `SQL 语句` 定制化返回自己需要的内容

### dbType
- 数据库类型
- 该类内置了常用的数据库类型【必须】

### schemaName
- 数据库 schema name
- 例如 `PostgreSQL` 可指定为 `public`


### typeConvert
- 类型转换
- 默认由 `dbType` 类型决定选择对应数据库内置实现

实现 `ITypeConvert` 接口自定义数据库 `字段类型` 转换为自己需要的 `java` 类型，内置转换类型无法满足可实现 `IColumnType` 接口自定义

### url
- 驱动连接的URL

### driverName
- 驱动名称

### username
- 数据库连接用户名

### password
- 数据库连接密码


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


## 全局策略 `globalConfig` 配置

### outputDir
- 生成文件的输出目录
- 默认值：`D 盘根目录`

### fileOverride
- 是否覆盖已有文件
- 默认值：`false`

### open
- 是否打开输出目录
- 默认值：`true`

### enableCache
- 是否在xml中添加二级缓存配置
- 默认值：`false

### author
- 开发人员
- 默认值：`null`

### kotlin
- 开启 Kotlin 模式
- 默认值：`false`

### swagger2
- 开启 swagger2 模式
- 默认值：`false`

### activeRecord
- 开启 ActiveRecord 模式
- 默认值：`false`

### baseResultMap
- 开启 BaseResultMap
- 默认值：`false`

### baseColumnList
- 开启 baseColumnList
- 默认值：`false`

### dateType
- 时间类型对应策略
- 默认值：`TIME_PACK`

::: warning 注意事项:
如下配置 `%s` 为占位符
###

### entityName
- 实体命名方式
- 默认值：`null`
例如：`%sEntity` 生成 `UserEntity`

### mapperName
- mapper 命名方式
- 默认值：`null`
例如：`%sDao` 生成 `UserDao`

### xmlName
- Mapper xml 命名方式
- 默认值：`null`
例如：`%sDao` 生成 `UserDao.xml`

### serviceName
- service 命名方式
- 默认值：`null`
例如：`%sBusiness` 生成 `UserBusiness`

### serviceImplName
- service impl 命名方式
- 默认值：`null`
例如：`%sBusinessImpl` 生成 `UserBusinessImpl`

### controllerName
- controller 命名方式
- 默认值：`null`
例如：`%sAction` 生成 `UserAction`

### idType
- 指定生成的主键的ID类型
- 默认值：`null`


## 注入 `injectionConfig` 配置

### map
- 自定义返回配置 Map 对象
- 该对象可以传递到模板引擎通过 `cfg.map.xxx` 引用

### fileOutConfigList
- 自定义输出文件
- 配置 `FileOutConfig` 指定模板文件、输出文件达到自定义文件生成目的

### fileCreate
- 自定义判断是否创建文件
- 实现 `IFileCreate` 接口

该配置用于判断某个类是否需要覆盖创建，当然你可以自己实现差异算法 `merge` 文件

### initMap
- 注入自定义 Map 对象

