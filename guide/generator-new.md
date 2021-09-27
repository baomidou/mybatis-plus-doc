---
sidebarDepth: 3
---

# 代码生成器（3.5.1+版本）

[👉 源码](https://github.com/baomidou/generator)

### 安装

[👉 点击查看最新版本](https://search.maven.org/artifact/com.baomidou/mybatis-plus-generator)

``` xml
// 注意！！当前包未传递依赖 mp 包，需要自己引入
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>Latest Version</version>
</dependency>
```

### 使用（以下教程仅适用 3.5.1 以上版本，对历史版本的不兼容）

#### 快速生成

```java
FastAutoGenerator.create("url", "username", "password")
	.globalConfig(builder -> {
		builder.author("baomidou") // 设置作者
            .enableSwagger() // 开启 swagger 模式
			.fileOverride() // 覆盖已生成文件
			.outputDir("D://"); // 指定输出目录
	})
	.packageConfig(builder -> {
		builder.parent("com.baomidou.mybatisplus.samples.generator") // 设置父包名
			.moduleName("system") // 设置父包模块名
            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D://")); // 设置mapperXml生成路径
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
    .strategyConfig(builder -> builder.addInclude(Arrays.asList(scanner
                        .apply("请输入表名，多个英文逗号分隔？").split(",")))
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
```

* `更多例子可查看test包下面的samples`
* [H2CodeGeneratorTest](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/test/java/com/baomidou/mybatisplus/generator/samples/H2CodeGeneratorTest.java)
* [FastAutoGeneratorTest](https://github.com/baomidou/generator/blob/develop/mybatis-plus-generator/src/test/java/com/baomidou/mybatisplus/generator/samples/FastAutoGeneratorTest.java)

### 说明

#### 数据库配置(DataSourceConfig)

##### 基础配置

| 属性          | 说明       | 示例 |
| --------------- | ---------- | ------ |
| url             | jdbc路径   | jdbc:mysql://127.0.0.1:3306/mybatis-plus |
| username        | 数据库账号 | root  |
| password        | 数据库密码 | 123456 |

```java
new DataSourceConfig.
    Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus","root","123456").build();
```
##### 可选配置

| 方法         | 说明                         | 示例                                  |
| --------------- | ---------------------------- | ------------------------------------- |
| dbQuery(IDbQuery)         | 数据库查询                   | new MySqlQuery()                      |
| schema(String)          | 数据库schema(部分数据库适用) | mybatis-plus                          |
| typeConvert(ITypeConvert)     | 数据库类型转换器             | new MySqlTypeConvert()                |
| keyWordsHandler(IKeyWordsHandler) | 数据库关键字处理器          | new MySqlKeyWordsHandler()            |

```java
new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus","root","123456")
    .dbQuery(new MySqlQuery())
    .schema("mybatis-plus")
    .typeConvert(new MySqlTypeConvert())
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .build();
```

#### 全局配置(GlobalConfig)

| 方法                | 说明              | 示例                                                    |
| ------------------- | ----------------- | ------------------------------------------------------- |
| fileOverride        | 覆盖已生成文件    | 默认值:false                                            |
| disableOpenDir      | 禁止打开输出目录  | 默认值:true                                             |
| outputDir(String)   | 指定输出目录      | /opt/baomidou/ 默认值: windows:D:// linux or mac : /tmp |
| author(String)      | 作者名            | baomidou 默认值:作者                                    |
| enableKotlin        | 开启 kotlin 模式  | 默认值:false                                            |
| enableSwagger       | 开启 swagger 模式 | 默认值:false                                            |
| dateType(DateType)  | 时间策略          | DateType.ONLY_DATE 默认值: DateType.TIME_PACK           |
| commentDate(String) | 注释日期          | 默认值: yyyy-MM-dd                                      |

```java
new GlobalConfig.Builder().
    .fileOverride()
    .outputDir("/opt/baomidou")
    .author("baomidou")
    .enableKotlin()
    .enableSwagger()
    .dateType(DateType.TIME_PACK)
    .commentDate("yyyy-MM-dd")
    .build();
```

#### 包配置(PackageConfig)

| 方法                              | 说明              | 示例                                                   |
| --------------------------------- | ----------------- | ------------------------------------------------------ |
| parent(String)                    | 父包名            | 默认值:com.baomidou                                    |
| moduleName(String)                | 父包模块名        | 默认值:无                                              |
| entity(String)                    | Entity 包名       | 默认值:entity                                          |
| service(String)                   | Service 包名      | 默认值:service                                         |
| serviceImpl(String)               | Service Impl 包名 | 默认值:service.impl                                    |
| mapper(String)                    | Mapper 包名       | 默认值:mapper                                          |
| mapperXml(String)                 | Mapper XML 包名   | 默认值:mapper.xml                                      |
| controller(String)                | Controller 包名   | 默认值:controller                                      |
| other(String)                     | 自定义文件包名    | 输出自定义文件时所用到的包名                           |
| pathInfo(Map<OutputFile, String>) | 路径配置信息      | Collections.singletonMap(OutputFile.mapperXml, "D://") |

```java
new PackageConfig.Builder()
    .parent("com.baomidou.mybatisplus.samples.generator")
    .moduleName("sys")
    .entity("po")
    .service("service")
    .serviceImpl("service.impl")
    .mapper("mapper")
    .mapperXml("mapper.xml")
    .controller("controller")
    .other("other")
    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D://")
    .build();
```

#### 模板配置(TemplateConfig)

| 方法                     | 说明                      | 示例                        |
| ------------------------ | ------------------------- | --------------------------- |
| disable                  | 禁用所有模板              |                             |
| disable(TemplateType...) | 禁用模板                  | TemplateType.ENTITY         |
| entity(String)           | 设置实体模板路径(JAVA)    | /templates/entity.java      |
| entityKt(String)         | 设置实体模板路径(kotlin)  | /templates/entity.java      |
| service(String)          | 设置 service 模板路径     | /templates/service.java     |
| serviceImpl(String)      | 设置 serviceImpl 模板路径 | /templates/serviceImpl.java |
| mapper(String)           | 设置 mapper 模板路径      | /templates/mapper.java      |
| mapperXml(String)        | 设置 mapperXml 模板路径   | /templates/mapper.xml       |
| controller(String)       | 设置 controller 模板路径  | /templates/controller.java  |

```java
new TemplateConfig.Builder()
    .disable(TemplateType.ENTITY)
    .entity("/templates/entity.java")
    .service("/templates/service.java")
    .serviceImpl("/templates/serviceImpl.java")
    .mapper("/templates/mapper.java")
    .mapperXml("/templates/mapper.xml")
    .controller("/templates/controller.java")
    .build();
```

#### 注入配置(InjectionConfig)

| 方法                   | 说明                     | 示例                                                |
| ----------------------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| beforeOutputFile(BiConsumer<TableInfo, Map<String, Object>>)| 输出文件之前消费者    |                                                             |
| customMap(Map<String, Object>)                              | 自定义配置 Map 对象  | Collections.singletonMap("test", "baomidou")                |
| customFile(Map<String, String>)                             | 自定义配置模板文件    | Collections.singletonMap("test.txt", "/templates/test.vm")  |

```java
new InjectionConfig.Builder()
    .beforeOutputFile((tableInfo, objectMap) -> {
    System.out.println("tableInfo: " + tableInfo.getEntityName() + " objectMap: " + objectMap.size());
    })
    .customMap(Collections.singletonMap("test", "baomidou"))
    .customFile(Collections.singletonMap("test.txt", "/templates/test.vm"))
    .build();
```

#### 策略配置(StrategyConfig)

| 方法                      | 说明                     | 示例                                                              |
| ------------------------- | ------------------------ | ----------------------------------------------------------------- |
| enableCapitalMode         | 开启大写命名             | 默认值:false                                                      |
| enableSkipView            | 开启跳过视图             | 默认值:false                                                      |
| disableSqlFilter          | 禁用 sql 过滤            | 默认值:true，语法不能支持使用 sql 过滤表的话，可以考虑关闭此开关        |
| enableSchema              | 启用 schema             | 默认值:false，多 schema 场景的时候打开                              |
| likeTable(LikeTable)      | 模糊表匹配(sql 过滤)     | likeTable 与 notLikeTable 只能配置一项                            |
| notLikeTable(LikeTable)   | 模糊表排除(sql 过滤)     | likeTable 与 notLikeTable 只能配置一项                            |
| addInclude(String...)     | 增加表匹配(内存过滤)     | include 与 exclude 只能配置一项                                   |
| addExclude(String...)     | 增加表排除匹配(内存过滤) | include 与 exclude 只能配置一项                                   |
| addTablePrefix(String...) | 增加过滤表前缀           |                                                                   |
| addTableSuffix(String...) | 增加过滤表后缀           |                                                                   |
| addFieldPrefix(String...) | 增加过滤字段前缀         |                                                                   |
| addFieldSuffix(String...) | 增加过滤字段后缀         |                                                                   |
| entityBuilder             | 实体策略配置             |                                                                   |
| controllerBuilder         | controller 策略配置      |                                                                   |
| mapperBuilder             | mapper 策略配置          |                                                                   |
| serviceBuilder            | service 策略配置         |                                                                   |

```java
new StrategyConfig.Builder()
    .enableCapitalMode()
    .enableSkipView()
    .disableSqlFilter()
    .likeTable(new LikeTable("USER"))
    .addInclude("t_simple")
    .addTablePrefix("t_", "c_")
    .addFieldSuffix("_flag")
    .build();
```

##### Entity策略配置

| 方法                               | 说明                              | 示例                                                   |
| ---------------------------------- | --------------------------------- | ------------------------------------------------------ |
| nameConvert(INameConvert)          | 名称转换实现                      |                                                        |
| superClass(Class<?>)               | 设置父类                          | BaseEntity.class                                       |
| superClass(String)                 | 设置父类                          | com.baomidou.global.BaseEntity                         |
| disableSerialVersionUID            | 禁用生成 serialVersionUID         | 默认值:true                                            |
| enableColumnConstant               | 开启生成字段常量                  | 默认值:false                                           |
| enableChainModel                   | 开启链式模型                      | 默认值:false                                           |
| enableLombok                       | 开启 lombok 模型                  | 默认值:false                                           |
| enableRemoveIsPrefix               | 开启 Boolean 类型字段移除 is 前缀 | 默认值:false                                           |
| enableTableFieldAnnotationEnable   | 开启生成实体时生成字段注解        | 默认值:false                                           |
| enableActiveRecord                 | 开启 ActiveRecord 模型            | 默认值:false                                           |
| versionColumnName(String)          | 乐观锁字段名(数据库)              |                                                        |
| versionPropertyName(String)        | 乐观锁属性名(实体)                |                                                        |
| logicDeleteColumnName(String)      | 逻辑删除字段名(数据库)            |                                                        |
| logicDeletePropertyName(String)    | 逻辑删除属性名(实体)              |                                                        |
| naming                             | 数据库表映射到实体的命名策略      | 默认下划线转驼峰命名:NamingStrategy.underline_to_camel |
| columnNaming                       | 数据库表字段映射到实体的命名策略  | 默认为 null，未指定按照 naming 执行                    |
| addSuperEntityColumns(String...)   | 添加父类公共字段                  |                                                        |
| addIgnoreColumns(String...)        | 添加忽略字段                      |                                                        |
| addTableFills(IFill...)            | 添加表字段填充                    |                                                        |
| addTableFills(List<IFill>)         | 添加表字段填充                    |                                                        |
| idType(IdType)                     | 全局主键类型                      |                                                        |
| convertFileName(ConverterFileName) | 转换文件名称                      |                                                        |
| formatFileName(String)             | 格式化文件名称                    |                                                        |

```java
new StrategyConfig.Builder()
    .entityBuilder()
    .superClass(BaseEntity.class)
    .disableSerialVersionUID()
    .enableChainModel()
    .enableLombok()
    .enableRemoveIsPrefix()
    .enableTableFieldAnnotation()
    .enableActiveRecord()
    .versionColumnName("version")
    .versionPropertyName("version")
    .logicDeleteColumnName("deleted")
    .logicDeletePropertyName("deleteFlag")
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

##### Controller策略配置

| 方法                               | 说明                           | 示例                               |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| superClass(Class<?>)               | 设置父类                       | BaseController.class               |
| superClass(String)                 | 设置父类                       | com.baomidou.global.BaseController |
| enableHyphenStyle                  | 开启驼峰转连字符               | 默认值:false                       |
| enableRestStyle                    | 开启生成@RestController 控制器 | 默认值:false                       |
| convertFileName(ConverterFileName) | 转换文件名称                   |                                    |
| formatFileName(String)             | 格式化文件名称                 |                                    |

```java
new StrategyConfig.Builder()
    .controllerBuilder()
    .superClass(BaseController.class)
    .enableHyphenStyle()
    .enableRestStyle()
    .formatFileName("%sAction")
    .build();
```

##### Service策略配置

| 方法                                          | 说明                          | 示例                                |
| --------------------------------------------- | ----------------------------- | ----------------------------------- |
| superServiceClass(Class<?>)                   | 设置 service 接口父类         | BaseService.class                   |
| superServiceClass(String)                     | 设置 service 接口父类         | com.baomidou.global.BaseService     |
| superServiceImplClass(Class<?>)               | 设置 service 实现类父类       | BaseServiceImpl.class               |
| superServiceImplClass(String)                 | 设置 service 实现类父类       | com.baomidou.global.BaseServiceImpl |
| convertServiceFileName(ConverterFileName)     | 转换 service 接口文件名称     |                                     |
| convertServiceImplFileName(ConverterFileName) | 转换 service 实现类文件名称   |                                     |
| formatServiceFileName(String)                 | 格式化 service 接口文件名称   |                                     |
| formatServiceImplFileName(String)             | 格式化 service 实现类文件名称 |                                     |

```java
new StrategyConfig.Builder()
    .serviceBuilder()
    .superServiceClass(BaseService.class)
    .superServiceImplClass(BaseServiceImpl.class)
    .formatServiceFileName("%sService")
    .formatServiceImplFileName("%sServiceImp")
    .build();
```

##### Mapper策略配置

| 方法                                     | 说明                      | 示例                           |
| ---------------------------------------- | ------------------------- | ------------------------------ |
| superClass(Class<?>)                     | 设置父类                  | BaseMapper.class               |
| superClass(String)                       | 设置父类                  | com.baomidou.global.BaseMapper |
| enableMapperAnnotation                   | 开启 @Mapper 注解         | 默认值:false                   |
| enableBaseResultMap                      | 启用 BaseResultMap 生成   | 默认值:false                   |
| enableBaseColumnList                     | 启用 BaseColumnList       | 默认值:false                   |
| cache(Class<? extends Cache>)            | 设置缓存实现类            | MyMapperCache.class            |
| convertMapperFileName(ConverterFileName) | 转换 mapper 类文件名称    |                                |
| convertXmlFileName(ConverterFileName)    | 转换 xml 文件名称         |                                |
| formatMapperFileName(String)             | 格式化 mapper 文件名称    |                                |
| formatXmlFileName(String)                | 格式化 xml 实现类文件名称 |                                |

```java
new StrategyConfig.Builder()
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
