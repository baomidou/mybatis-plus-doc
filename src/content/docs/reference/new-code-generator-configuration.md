---
title: 代码生成器配置
sidebar:
  order: 3
  badge:
    text: New
---

MyBatis-Plus 全新代码生成器在继承原有功能的基础上，引入了更加灵活和高效的 builder 模式，使得开发者能够快速生成符合需求的代码，同时保持代码的优雅和整洁。这个新特性旨在进一步提升开发效率，减少重复劳动，让开发者能够更加专注于业务逻辑的实现。

### 特点说明

1. **Builder 模式**：通过 builder 模式，开发者可以链式调用配置方法，直观地构建代码生成器的配置，使得代码更加清晰易读。

2. **快速配置**：新代码生成器提供了快速配置选项，如全局配置、包配置、策略配置等，可以一键设置常用选项，快速启动代码生成过程。

3. **模板引擎**：支持 Freemarker 等模板引擎，允许开发者自定义代码模板，以生成符合项目特定风格的代码。

4. **Lombok 集成**：新代码生成器默认启用 Lombok，减少了样板代码的编写，提高了代码的可读性和维护性。

5. **多数据库支持**：支持多种数据库类型，如 MySQL、Oracle、SQL Server 等，只需配置相应的数据库连接信息即可。

6. **灵活的数据源配置**：提供了丰富的数据源配置选项，包括数据库查询方式、类型转换器、关键字处理器等，满足不同数据库的需求。

### 示例配置

```java
// 使用 FastAutoGenerator 快速配置代码生成器
FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8", "root", "password")
    .globalConfig(builder -> {
        builder.author("Your Name") // 设置作者
            .outputDir("src/main/java"); // 输出目录
    })
    .packageConfig(builder -> {
        builder.parent("com.example") // 设置父包名
            .entity("model") // 设置实体类包名
            .mapper("dao") // 设置 Mapper 接口包名
            .service("service") // 设置 Service 接口包名
            .serviceImpl("service.impl") // 设置 Service 实现类包名
            .xml("mappers"); // 设置 Mapper XML 文件包名
    })
    .strategyConfig(builder -> {
        builder.addInclude("table1", "table2") // 设置需要生成的表名
            .entityBuilder()
            .enableLombok() // 启用 Lombok
            .enableTableFieldAnnotation() // 启用字段注解
            .controllerBuilder()
            .enableRestStyle(); // 启用 REST 风格
    })
    .templateEngine(new FreemarkerTemplateEngine()) // 使用 Freemarker 模板引擎
    .execute(); // 执行生成
```

### 数据库配置 (DataSourceConfig)

#### 基础配置

| 属性     | 说明       | 示例                                     |
| -------- | ---------- | ---------------------------------------- |
| url      | jdbc 路径  | jdbc:mysql://127.0.0.1:3306/mybatis-plus |
| username | 数据库账号 | root                                     |
| password | 数据库密码 | 123456                                   |

```java
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456").build();
```

#### 可选配置

| 方法                                      | 说明                          | 示例                                                        |
| ----------------------------------------- | ----------------------------- | ----------------------------------------------------------- |
| dbQuery(IDbQuery)                         | 数据库查询                    | new MySqlQuery(),只在SQLQuery下生效                         |
| schema(String)                            | 数据库 schema(部分数据库适用) | mybatis-plus                                                |
| typeConvert(ITypeConvert)                 | 数据库类型转换器              | new MySqlTypeConvert(),只在SQLQuery下生效                   |
| keyWordsHandler(IKeyWordsHandler)         | 数据库关键字处理器            | new MySqlKeyWordsHandler()                                  |
| typeConvertHandler(ITypeConvertHandler)   | 类型转换器(默认)              | 自定义实现ITypeConvertHandler,只在DefaultQuery下生效        |
| databaseQueryClass(AbstractDatabaseQuery) | 数据库查询方式                | 默认DefaultQuery.class(通用元数据), SQLQuery.class(SQL查询) |

```java
// 使用SQL查询的方式生成代码,属于旧的代码生成方式,通用性不是好,老的代码可以继续使用,适配数据库需要完成dbQuery和typeConvert的扩展,后期不再维护这种方式
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .dbQuery(new MySqlQuery())
    .schema("mybatis-plus")
    .typeConvert(new MySqlTypeConvert())
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .databaseQueryClass(SQLQuery.class)
    .build();

// 使用元数据查询的方式生成代码,默认已经根据jdbcType来适配java类型,支持使用typeConvertHandler来转换需要映射的类型映射
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .schema("mybatis-plus")
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .build();
```


## 全局配置 (GlobalConfig)

全局配置提供了对代码生成器整体行为的设置，包括输出目录、作者信息、Kotlin 模式、Swagger 集成、时间类型策略等。

### 方法说明

| 方法                      | 说明                                 | 示例                                                    |
| ------------------------- | ------------------------------------ | ------------------------------------------------------- |
| disableOpenDir()          | 禁止自动打开输出目录                 | 默认值: `true`                                          |
| outputDir(String)         | 指定代码生成的输出目录               | `/opt/baomidou` 默认值: Windows: `D://` Linux/Mac: `/tmp` |
| author(String)            | 设置作者名                           | `baomidou` 默认值: 配置文件中的作者名                   |
| enableKotlin()            | 开启 Kotlin 模式                     | 默认值: `false`                                         |
| enableSwagger()           | 开启 Swagger 模式                    | 默认值: `false`                                         |
| dateType(DateType)        | 设置时间类型策略                     | `DateType.ONLY_DATE` 默认值: `DateType.TIME_PACK`       |
| commentDate(String)       | 设置注释日期格式                     | 默认值: `yyyy-MM-dd`                                    |

### 示例配置

```java
GlobalConfig globalConfig = new GlobalConfig.Builder()
    .disableOpenDir(false) // 允许自动打开输出目录
    .outputDir("/path/to/output") // 设置输出目录
    .author("Your Name") // 设置作者名
    .enableKotlin(true) // 开启 Kotlin 模式
    .enableSwagger(true) // 开启 Swagger 模式
    .dateType(DateType.ONLY_DATE) // 设置时间类型策略
    .commentDate("yyyy-MM-dd") // 设置注释日期格式
    .build();
```

## 包配置 (PackageConfig)

包配置用于定义生成代码的包结构，包括父包名、模块名、实体类包名、服务层包名等。

### 方法说明

| 方法                              | 说明              | 示例                                                   |
| --------------------------------- | ----------------- | ------------------------------------------------------ |
| parent(String)                    | 设置父包名        | 默认值: `com.baomidou`                                 |
| moduleName(String)                | 设置父包模块名    | 默认值: 无                                             |
| entity(String)                    | 设置 Entity 包名  | 默认值: `entity`                                       |
| service(String)                   | 设置 Service 包名 | 默认值: `service`                                      |
| serviceImpl(String)               | 设置 Service Impl 包名 | 默认值: `service.impl`                                 |
| mapper(String)                    | 设置 Mapper 包名  | 默认值: `mapper`                                       |
| xml(String)                       | 设置 Mapper XML 包名 | 默认值: `mapper.xml`                                   |
| controller(String)                | 设置 Controller 包名 | 默认值: `controller`                                   |
| pathInfo(Map<OutputFile, String>) | 设置路径配置信息  | `Collections.singletonMap(OutputFile.mapperXml, "D://")` |

### 示例配置

```java
PackageConfig packageConfig = new PackageConfig.Builder()
    .parent("com.example") // 设置父包名
    .moduleName("myapp") // 设置父包模块名
    .entity("model") // 设置 Entity 包名
    .service("service") // 设置 Service 包名
    .serviceImpl("service.impl") // 设置 Service Impl 包名
    .mapper("dao") // 设置 Mapper 包名
    .xml("mappers") // 设置 Mapper XML 包名
    .controller("controller") // 设置 Controller 包名
    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "/path/to/xml")) // 设置路径配置信息
    .build();
```

## 模板配置 (TemplateConfig)

注意：自 MyBatis-Plus 3.5.6 版本开始，模板配置已迁移至 `StrategyConfig` 中。以下是迁移后的配置方式。

### 方法说明

| 方法                                                         | 说明                | 示例                                                                                           |
| ------------------------------------------------------------ | ------------------- |----------------------------------------------------------------------------------------------|
| entityBuilder()                                              | 设置实体类模板      |                                                                                              |
| javaTemplate(String)                                         | 设置 Java 实体模板  | `/templates/entity.java`                                                                     |
| disable()                                                    | 禁用实体类生成      |                                                                                              |
| serviceBuilder()                                             | 设置 Service 层模板 |                                                                                              |
| disableService()                                             | 禁用 Service 层生成 |                                                                                              |
| serviceTemplate(String)                                      | 设置 Service 模板   | `/templates/service.java`                                                                    |
| serviceImplTemplate(String)                                  | 设置 ServiceImpl 模板| `/templates/serviceImpl.java`                                                               |

### 示例配置

```java
// 3.5.6 之前的配置示例
TemplateConfig templateConfig = new TemplateConfig.Builder()
    .disable(TemplateType.ENTITY)
    .entity("/templates/entity.java")
    .service("/templates/service.java")
    .serviceImpl("/templates/serviceImpl.java")
    .mapper("/templates/mapper.java")
    .mapperXml("/templates/mapper.xml")
    .controller("/templates/controller.java")
    .build();

// 3.5.6 之后的配置示例
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .entityBuilder()
    .javaTemplate("/templates/entity.java") // 设置实体类模板
    .disable() // 禁用实体类生成
    .serviceBuilder()
    .disableService() // 禁用 Service 层生成
    .serviceTemplate("/templates/service.java") // 设置 Service 模板
    .serviceImplTemplate("/templates/serviceImpl.java") // 设置 ServiceImpl 模板
    .build();
```

## 注入配置 (InjectionConfig)

注入配置允许开发者自定义代码生成器的行为，包括在输出文件之前执行的逻辑、自定义配置 Map 对象、自定义配置模板文件等。

### 方法说明

| 方法                                                         | 说明                | 示例                                                                                           |
| ------------------------------------------------------------ | ------------------- |----------------------------------------------------------------------------------------------|
| beforeOutputFile(BiConsumer<TableInfo, Map<String, Object>>) | 输出文件之前执行的逻辑 | 在生成文件之前执行自定义逻辑，如打印表信息或修改配置数据                                     |
| customMap(Map<String, Object>)                               | 自定义配置 Map 对象 | 用于在模板中访问自定义的配置信息，如项目名称、作者等                                         |
| customFile(Map<String, String>)                              | 自定义配置模板文件  | 用于指定自定义的模板文件路径，可以格式化文件名，参考测试用例 H2CodeGeneratorTest.testCustomFileByList |

### 示例配置

```java
InjectionConfig injectionConfig = new InjectionConfig.Builder()
    .beforeOutputFile((tableInfo, objectMap) -> {
        System.out.println("准备生成文件: " + tableInfo.getEntityName());
        // 可以在这里添加自定义逻辑，如修改 objectMap 中的配置
    })
    .customMap(Collections.singletonMap("projectName", "MyBatis-Plus Generator"))
    .customFile(Collections.singletonMap("custom.txt", "/templates/custom.vm"))
    .build();
```

通过上述配置，开发者可以根据自己的需求，灵活地定制代码生成器的行为。例如，在生成文件之前执行特定的逻辑，或者使用自定义的模板文件来生成代码。这些配置选项提供了极大的灵活性，使得 MyBatis-Plus 代码生成器能够适应各种复杂的项目需求。

## 策略配置 (StrategyConfig)

策略配置是 MyBatis-Plus 代码生成器的核心部分，它允许开发者根据项目需求定制代码生成的规则，包括命名模式、表和字段的过滤、以及各个代码模块的生成策略。

### 方法说明

| 方法                        | 说明             | 示例                                                        |
|---------------------------|----------------|-----------------------------------------------------------|
| enableCapitalMode         | 开启大写命名         | 默认值: `false`                                                 |
| enableSkipView            | 开启跳过视图         | 默认值: `false`                                                 |
| disableSqlFilter          | 禁用 SQL 过滤      | 默认值: `true`，如果 SQL 过滤不支持，可以关闭此选项                     |
| enableSchema              | 启用 schema      | 默认值: `false`，多 schema 场景时启用                                |
| likeTable(LikeTable)      | 模糊表匹配(SQL 过滤)  | 与 `notLikeTable` 互斥，只能配置一项                           |
| notLikeTable(LikeTable)   | 模糊表排除(SQL 过滤)  | 与 `likeTable` 互斥，只能配置一项                           |
| addInclude(String...)     | 增加表匹配(内存过滤)    | 与 `addExclude` 互斥，只能配置一项，支持正则匹配，如 `^t_.*` 匹配所有以 `t_` 开头的表名 |
| addExclude(String...)     | 增加表排除匹配(内存过滤)  | 与 `addInclude` 互斥，只能配置一项，支持正则匹配，如 `.*st$` 匹配所有以 `st` 结尾的表名 |
| addTablePrefix(String...) | 增加过滤表前缀        |                                                           |
| addTableSuffix(String...) | 增加过滤表后缀        |                                                           |
| addFieldPrefix(String...) | 增加过滤字段前缀       |                                                           |
| addFieldSuffix(String...) | 增加过滤字段后缀       |                                                           |
| outputFile                | 内置模板输出文件处理   | 参考测试用例 `H2CodeGeneratorTest.testOutputFile`                |
| entityBuilder             | 实体策略配置         |                                                           |
| controllerBuilder         | Controller 策略配置 |                                                           |
| mapperBuilder             | Mapper 策略配置    |                                                           |
| serviceBuilder            | Service 策略配置   |                                                           |

### 示例配置

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .enableCapitalMode() // 开启大写命名
    .enableSkipView() // 开启跳过视图
    .disableSqlFilter() // 禁用 SQL 过滤
    .likeTable(new LikeTable("USER")) // 模糊匹配表名
    .addInclude("t_simple") // 增加表匹配
    .addTablePrefix("t_", "c_") // 增加过滤表前缀
    .addFieldSuffix("_flag") // 增加过滤字段后缀
    .build();
```

### Entity 策略配置

实体策略配置用于定制实体类的生成规则，包括父类、序列化版本 UID、文件覆盖、字段常量、链式模型、Lombok 模型等。

#### 方法说明

| 方法                                        | 说明                              | 示例                                                         |
| ------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| nameConvert(INameConvert)                   | 名称转换实现                      |                                                              |
| superClass(Class<?>)                        | 设置父类                          | `BaseEntity.class`                                           |
| superClass(String)                          | 设置父类                          | `com.baomidou.global.BaseEntity`                             |
| disableSerialVersionUID                     | 禁用生成 serialVersionUID         | 默认值: `true`                                               |
| enableFileOverride                          | 覆盖已生成文件                    | 默认值: `false`                                              |
| enableColumnConstant                        | 开启生成字段常量                  | 默认值: `false`                                              |
| enableChainModel                            | 开启链式模型                      | 默认值: `false`                                              |
| enableLombok                                | 开启 Lombok 模型                  | 默认值: `false`  默认只有Getter,Setter,自3.5.10后增加ToString |
| enableRemoveIsPrefix                        | 开启 Boolean 类型字段移除 is 前缀 | 默认值: `false`                                              |
| enableTableFieldAnnotation                  | 开启生成实体时生成字段注解        | 默认值: `false`                                              |
| enableActiveRecord                          | 开启 ActiveRecord 模型            | 默认值: `false`                                              |
| versionColumnName(String)                   | 乐观锁字段名(数据库字段)          | `versionColumnName` 与 `versionPropertyName` 二选一即可      |
| versionPropertyName(String)                 | 乐观锁属性名(实体)                | `versionColumnName` 与 `versionPropertyName` 二选一即可      |
| logicDeleteColumnName(String)               | 逻辑删除字段名(数据库字段)        | `logicDeleteColumnName` 与 `logicDeletePropertyName` 二选一即可 |
| logicDeletePropertyName(String)             | 逻辑删除属性名(实体)              | `logicDeleteColumnName` 与 `logicDeletePropertyName` 二选一即可 |
| naming                                      | 数据库表映射到实体的命名策略      | 默认下划线转驼峰命名: `NamingStrategy.underline_to_camel`    |
| columnNaming                                | 数据库表字段映射到实体的命名策略  | 默认为 `null`，未指定按照 `naming` 执行                      |
| addSuperEntityColumns(String...)            | 添加父类公共字段                  |                                                              |
| addIgnoreColumns(String...)                 | 添加忽略字段                      |                                                              |
| addTableFills(IFill...)                     | 添加表字段填充                    |                                                              |
| addTableFills(List<IFill\>)                 | 添加表字段填充                    |                                                              |
| idType(IdType)                              | 全局主键类型                      |                                                              |
| convertFileName(ConverterFileName)          | 转换文件名称                      |                                                              |
| formatFileName(String)                      | 格式化文件名称                    |                                                              |
| toString(boolean)                           | 是否生成ToString方法              | 默认为true, 自3.5.10开始                                     |
| fieldUseJavaDoc                             | 启用字段文档注释                  | 默认为true, 自3.5.10开始                                     |
| classAnnotations(ClassAnnotationAttributes) | 添加实体类注解                    | 自3.5.10开始                                                 |
| tableAnnotationHandler                      | 表注解处理器                      | 自3.5.10开始                                                 |
| tableFieldAnnotationHandler                 | 字段注解处理器                    | 自3.5.10开始                                                 |
| enableLombok(ClassAnnotationAttributes...)  | 开启 Lombok 模型并设置Lombok注解  | 自3.5.10开始.   使用@Data示例: enableLombok(new ClassAnnotationAttributes("@Data","lombok.Data")) |

#### 示例配置

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

### Controller 策略配置

Controller 策略配置用于定制 Controller 类的生成规则，包括父类、文件覆盖、驼峰转连字符、RestController 注解等。

#### 方法说明

| 方法                               | 说明                           | 示例                               |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| superClass(Class<?>)               | 设置父类                       | `BaseController.class`               |
| superClass(String)                 | 设置父类                       | `com.baomidou.global.BaseController` |
| enableFileOverride                 | 覆盖已生成文件                 | 默认值: `false`                       |
| enableHyphenStyle                  | 开启驼峰转连字符               | 默认值: `false`                       |
| enableRestStyle                    | 开启生成@RestController 控制器 | 默认值: `false`                       |
| convertFileName(ConverterFileName) | 转换文件名称                   |                                    |
| formatFileName(String)             | 格式化文件名称                 |                                    |

#### 示例配置

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

Service 策略配置用于定制 Service 接口和实现类的生成规则，包括父类、文件覆盖、文件名称转换等。

#### 方法说明

| 方法                                          | 说明                          | 示例                                |
| --------------------------------------------- | ----------------------------- | ----------------------------------- |
| superServiceClass(Class<?>)                   |接口父类         | `BaseService.class`                   |
| superServiceClass(String)                     | 设置 Service 接口父类         | `com.baomidou.global.BaseService`     |
| superServiceImplClass(Class<?>)               | 设置 Service 实现类父类       | `BaseServiceImpl.class`               |
| superServiceImplClass(String)                 | 设置 Service 实现类父类       | `com.baomidou.global.BaseServiceImpl` |
| enableFileOverride                            | 覆盖已生成文件                | 默认值: `false`                        |
| convertServiceFileName(ConverterFileName)     | 转换 Service 接口文件名称     |                                         |
| convertServiceImplFileName(ConverterFileName) | 转换 Service 实现类文件名称   |                                         |
| formatServiceFileName(String)                 | 格式化 Service 接口文件名称   |                                         |
| formatServiceImplFileName(String)             | 格式化 Service 实现类文件名称 |                                         |

#### 示例配置

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .serviceBuilder()
    .superServiceClass(BaseService.class)
    .superServiceImplClass(BaseServiceImpl.class)
    .formatServiceFileName("%sService")
    .formatServiceImplFileName("%sServiceImp")
    .build();
```

### Mapper 策略配置

Mapper 策略配置用于定制 Mapper 接口和对应的 XML 映射文件的生成规则，包括父类、文件覆盖、Mapper 注解、结果映射、列列表、缓存实现类等。

#### 方法说明

| 方法                                     | 说明                      | 示例                           |
| ---------------------------------------- | ------------------------- | ------------------------------ |
| superClass(Class<?>)                     | 设置父类                  | `BaseMapper.class`               |
| superClass(String)                       | 设置父类                  | `com.baomidou.global.BaseMapper` |
| enableFileOverride                       | 覆盖已生成文件            | 默认值: `false`                   |
| enableMapperAnnotation                   | 开启 @Mapper 注解         | 默认值: `false`                   |
| enableBaseResultMap                      | 启用 BaseResultMap 生成   | 默认值: `false`                   |
| enableBaseColumnList                     | 启用 BaseColumnList       | 默认值: `false`                   |
| cache(Class<? extends Cache>)            | 设置缓存实现类            | `MyMapperCache.class`            |
| convertMapperFileName(ConverterFileName) | 转换 Mapper 类文件名称    |                                    |
| convertXmlFileName(ConverterFileName)    | 转换 XML 文件名称         |                                    |
| formatMapperFileName(String)             | 格式化 Mapper 文件名称    |                                    |
| formatXmlFileName(String)                | 格式化 XML 实现类文件名称 |                                    |
| generateMapperMethodHandler | 自定义生成Mapper方法实现 | 自3.5.10开始                     |

#### 示例配置

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

## 自定义模板支持 (DTO/VO 等) 配置

MyBatis-Plus 代码生成器支持自定义模板，如 DTO (Data Transfer Object) 和 VO (Value Object) 等，通过扩展 `FreemarkerTemplateEngine` 类来实现。

以下是如何配置和使用自定义 Freemarker 模板的示例。

首先，创建一个自定义的 Freemarker 模板引擎类，该类继承自 `FreemarkerTemplateEngine`，并重写 `outputCustomFile` 方法来输出自定义文件。

```java
/**
 * 代码生成器支持自定义[DTO\VO等]模版
 */
public class EnhanceFreemarkerTemplateEngine extends FreemarkerTemplateEngine {

    @Override
    protected void outputCustomFile(@NotNull Map<String, String> customFile, @NotNull TableInfo tableInfo, @NotNull Map<String, Object> objectMap) {
        String entityName = tableInfo.getEntityName();
        String otherPath = this.getPathInfo(OutputFile.other);
        customFile.forEach((key, value) -> {
            String fileName = String.format(otherPath + File.separator + entityName + "%s", key);
            this.outputFile(new File(fileName), objectMap, value);
        });
    }
}
```

在配置代码生成器时，可以通过 `injectionConfig` 方法添加自定义文件配置。以下是一个使用自定义 Freemarker 模板的示例。

```java
FastAutoGenerator.create(url, username, password)
    .globalConfig(builder -> {
        builder.author("abc") // 设置作者
            .enableSwagger() // 开启 swagger 模式
            .fileOverride() // 覆盖已生成文件
            .disableOpenDir() // 禁止打开输出目录
            .outputDir(finalProjectPath + "/src/main/java"); // 指定输出目录
    })
    .packageConfig(builder -> {
        builder.parent("com.baomidou.mybatisplus.samples") // 设置父包名
            .moduleName("test") // 设置父包模块名
            .entity("model.entity") // 设置实体类包名
            .other("model.dto") // 设置 DTO 包名
            .pathInfo(Collections.singletonMap(OutputFile.xml, finalProjectPath + "/src/main/resources/mapper")); // 设置 Mapper XML 文件生成路径
    })
    .injectionConfig(consumer -> {
        Map<String, String> customFile = new HashMap<>();
        // DTO
        customFile.put("DTO.java", "/templates/entityDTO.java.ftl");
        consumer.customFile(customFile);
    })
    .templateEngine(new EnhanceFreemarkerTemplateEngine()) // 使用自定义的模板引擎
    .execute(); // 执行生成
```

在上面的示例中，我们定义了一个名为 `entityDTO.java.ftl` 的自定义 Freemarker 模板，并将其路径添加到 `customFile` 映射中。在生成代码时，代码生成器将使用这个模板来生成 DTO 类。

:::note

- 自定义模板文件应放置在项目的 `templates` 目录下，或者指定一个有效的路径。
- 模板文件的命名应遵循一定的规则，例如 `entityDTO.java.ftl`，其中 `entityDTO` 是生成的类名，`.java` 表示生成的文件类型，`.ftl` 是 Freemarker 模板的扩展名。
- 在模板文件中，可以使用 Freemarker 的语法来访问 `objectMap` 中的数据，例如 `${entityName}` 可以获取实体类的名称。

:::

通过上述配置，开发者可以根据项目需求自定义代码生成器的模板，从而生成符合特定项目结构的代码文件。
