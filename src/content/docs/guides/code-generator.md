---
title: 代码生成器
---

::: warning
适用版本：mybatis-plus-generator 3.5.1 及其以上版本，对历史版本不兼容！3.5.1 以下的请参考 [代码生成器旧](/pages/d357af/)
:::

目前支持两套生成的方式,一套使用SQL查询的方式是兼容旧的代码生成器核心逻辑使用,另一套使用驱动规范来读取元数据的方式,默认的使用元数据查询方式来生成代码,

建议: 如果是已知数据库(无版本兼容问题下)请继续按照原有的SQL查询方式继续使用(见如下代码),如果是新项目或者不支持的数据库类型可以使用元数据查询的方式来进行生成.


```java
// MYSQL 示例 切换至SQL查询方式,需要指定好dbQuery与typeConvert来生成
.dataSourceConfig(builder -> builder.databaseQueryClass(SQLQuery.class).typeConvert(new MySqlTypeConvert()).dbQuery(new MySqlQuery())
```


| 查询方式                  | 优点                                                      | 缺点                                                         | 备注                          |
| ------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| DefaultQuery (元数据查询) | 根据通用接口读取数据库元数据相关信息,对数据库通用性会好点 | 依赖数据库厂商驱动实现                                       | 默认方式,对部分类型处理不太好 |
| SQLQuery (SQL查询)        | 需要根据数据库编写对应表,主键,字段获取等查询语句          | 通用性不强,同数据库厂商不同版本可能会存在兼容问题(例如H2数据库只支持1.X版本) | 后期不再维护                  |



元数据查询已知问题:

1.不支持NotLike的方式反向生成表:

不同于SQL过滤,这种需要获取数据库模式下所有表来生成,不考虑支持.

2.无法读取表注释:
Mysql链接增加属性 remarks=true&useInformationSchema=true

Oracle链接增加属性 remarks=true也有些驱动版本说是增加remarksReporting=true

Sqlserver: 驱动不支持 https://learn.microsoft.com/en-us/sql/connect/jdbc/reference/getcolumns-method-sqlserverdatabasemetadata?view=sql-server-2017

3.PostgreSQL部分类型不好处理: json,jsonb,uuid,xml,money类型生成Object或Double

json,jsonb,uuid,xml 生成了Object,Mybatis下生成String也无法正常处理映射,只能转换成项目自定义的类型配合自定义TypeHandler来处理

money生成了Double,这个类型无法处理,就算使用驱动自带的PGmoney类型mybatis处理也会出现问题,处理方式同上,不过这种数据类型最好别用

转换成自己需要的类型可以扩展typeConvertHandler来处理(3.5.3.3后增加了typeName获取)

4.Mysql下tinyint字段转换:

当字段长度为1时,无法转换Boolean字段, 建议在指定数据库连接的时候把 &tinyInt1isBit=true 增加上去

当字段长度大于1时,默认转换成Byte,符合类型长度范围,如果想继续转换成Integer.

```java
     .typeConvertHandler((globalConfig, typeRegistry, metaInfo) -> {
         // 兼容旧版本转换成Integer
         if (JdbcType.TINYINT == metaInfo.getJdbcType()) {
             return DbColumnType.INTEGER;
         }
         return typeRegistry.getColumnType(metaInfo);
     })
```









[👉 源码](https://github.com/baomidou/mybatis-plus)

[👉 视频教程详解 关注、点赞、投币、评论](https://space.bilibili.com/483260422)

## 快速入门

### 安装

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>最新版本</version>
</dependency>
```

::: warning
当前包未传递依赖 MP 包，需要自己引入！
:::

### 使用

#### 快速生成

```java
FastAutoGenerator.create("url", "username", "password")
    .globalConfig(builder -> {
        builder.author("baomidou") // 设置作者
            .enableSwagger() // 开启 swagger 模式
            .fileOverride() // 覆盖已生成文件
            .outputDir("D://"); // 指定输出目录
    })
    .dataSourceConfig(builder -> builder.typeConvertHandler((globalConfig, typeRegistry, metaInfo) -> {
        int typeCode = metaInfo.getJdbcType().TYPE_CODE;
        if (typeCode == Types.SMALLINT) {
            // 自定义类型转换
            return DbColumnType.INTEGER;
        }
        return typeRegistry.getColumnType(metaInfo);

    }))
    .packageConfig(builder -> {
        builder.parent("com.baomidou.mybatisplus.samples.generator") // 设置父包名
            .moduleName("system") // 设置父包模块名
            .pathInfo(Collections.singletonMap(OutputFile.xml, "D://")); // 设置mapperXml生成路径
    })
    .strategyConfig(builder -> {
        builder.addInclude("t_simple") // 设置需要生成的表名
            .addTablePrefix("t_", "c_"); // 设置过滤表前缀
    })
    .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
    .execute();
```

#### 交互式生成

```java
FastAutoGenerator.create(DATA_SOURCE_CONFIG)
    // 全局配置
    .globalConfig((scanner, builder) -> builder.author(scanner.apply("请输入作者名称？")).fileOverride())
    // 包配置
    .packageConfig((scanner, builder) -> builder.parent(scanner.apply("请输入包名？")))
    // 策略配置
    .strategyConfig((scanner, builder) -> builder.addInclude(getTables(scanner.apply("请输入表名，多个英文逗号分隔？所有输入 all")))
                        .controllerBuilder().enableRestStyle().enableHyphenStyle()
                        .entityBuilder().enableLombok().addTableFills(
                                new Column("create_time", FieldFill.INSERT)
                        ).build())
    /*
        模板引擎配置，默认 Velocity 可选模板引擎 Beetl 或 Freemarker
       .templateEngine(new BeetlTemplateEngine())
       .templateEngine(new FreemarkerTemplateEngine())
     */
    .execute();


// 处理 all 情况
protected static List<String> getTables(String tables) {
    return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
}
```

- `更多例子可查看test包下面的samples`
- [H2CodeGeneratorTest](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/test/java/com/baomidou/mybatisplus/generator/samples/H2CodeGeneratorTest.java)
- [FastAutoGeneratorTest](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/test/java/com/baomidou/mybatisplus/generator/samples/FastAutoGeneratorTest.java)

## 配置

请移步至 [代码生成器配置新](/pages/981406/) 查看。


-----

::: warning
适用版本：mybatis-plus-generator 3.5.1 以下版本，3.5.1 及以上的请参考 [代码生成器新](/pages/779a6e/)
:::

AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，极大的提升了开发效率。

::: tip 特别说明:
自定义模板有哪些可用参数？[Github](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/main/java/com/baomidou/mybatisplus/generator/engine/AbstractTemplateEngine.java) AbstractTemplateEngine 类中方法 getObjectMap 返回 objectMap 的所有值都可用。
:::

演示效果图：

![relationship](/img/generator.gif)

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

更多详细配置，请参考[代码生成器配置](../config/generator-config.md)一文。

## 使用教程

### 添加依赖

MyBatis-Plus 从 `3.0.3` 之后移除了代码生成器与模板引擎的默认依赖，需要手动添加相关依赖：

- 添加 代码生成器 依赖

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.5.0</version>
  </dependency>
  ```

- 添加 模板引擎 依赖，MyBatis-Plus 支持 Velocity（默认）、Freemarker、Beetl，用户可以选择自己熟悉的模板引擎，如果都不满足您的要求，可以采用自定义模板引擎。

  Velocity（默认）：

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

  注意！如果您选择了非默认引擎，需要在 AutoGenerator 中 设置模板引擎。

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

### 编写配置

MyBatis-Plus 的代码生成器提供了大量的自定义参数供用户选择，能够满足绝大部分人的使用需求。

- 配置 GlobalConfig

  ```java
  GlobalConfig globalConfig = new GlobalConfig();
  globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java");
  globalConfig.setAuthor("jobob");
  globalConfig.setOpen(false);
  ```

- 配置 DataSourceConfig

  ```java
  DataSourceConfig dataSourceConfig = new DataSourceConfig();
  dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/ant?useUnicode=true&useSSL=false&characterEncoding=utf8");
  dataSourceConfig.setDriverName("com.mysql.jdbc.Driver");
  dataSourceConfig.setUsername("root");
  dataSourceConfig.setPassword("password");
  ```

更多生成器配置请移步至 [代码生成器配置旧](/pages/061573/) 查看。

## 自定义模板引擎

请继承类 com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine

## 自定义代码模板

```java
//指定自定义模板路径, 位置：/resources/templates/entity2.java.ftl(或者是.vm)
//注意不要带上.ftl(或者是.vm), 会根据使用的模板引擎自动识别
TemplateConfig templateConfig = new TemplateConfig()
    .setEntity("templates/entity2.java");

AutoGenerator mpg = new AutoGenerator();
//配置自定义模板
mpg.setTemplate(templateConfig);
```

## 自定义属性注入

```java
InjectionConfig injectionConfig = new InjectionConfig() {
    //自定义属性注入:abc
    //在.ftl(或者是.vm)模板中，通过${cfg.abc}获取属性
    @Override
    public void initMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
        this.setMap(map);
    }
};
AutoGenerator mpg = new AutoGenerator();
//配置自定义属性注入
mpg.setCfg(injectionConfig);
```

```xml
entity2.java.ftl
自定义属性注入abc=${cfg.abc}

entity2.java.vm
自定义属性注入abc=$!{cfg.abc}
```

## 字段其他信息查询注入

![relationship](/img/custom-fields.png)

```java
new DataSourceConfig().setDbQuery(new MySqlQuery() {

    /**
     * 重写父类预留查询自定义字段<br>
     * 这里查询的 SQL 对应父类 tableFieldsSql 的查询字段，默认不能满足你的需求请重写它<br>
     * 模板中调用：  table.fields 获取所有字段信息，
     * 然后循环字段获取 field.customMap 从 MAP 中获取注入字段如下  NULL 或者 PRIVILEGES
     */
    @Override
    public String[] fieldCustom() {
        return new String[]{"NULL", "PRIVILEGES"};
    }
})
```
