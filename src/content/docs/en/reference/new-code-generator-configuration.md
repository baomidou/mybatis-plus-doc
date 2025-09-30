---
title: Code Generator Configuration
sidebar:
  order: 3
  badge:
    text: New
---
MyBatis-Plus introduces a brand new code generator that builds upon existing functionality by incorporating a more flexible and efficient builder pattern. This approach enables you to quickly generate code that meets your specific requirements while maintaining clean and elegant code structure. This new feature is designed to further enhance development efficiency, reduce repetitive work, and allow you to focus more on implementing business logic.

### Feature Description

1. **Builder Pattern**: Using the builder pattern, you can chain configuration methods to intuitively build the code generator's configuration, making the code clearer and more readable.

2. **Rapid Configuration**: The new code generator provides quick configuration options, such as global configuration, package configuration, and strategy configuration. You can set common options with one click to quickly start the code generation process.

3. **Template Engine**: It supports template engines like Freemarker, allowing you to customize code templates to generate code that matches your project's specific style.

4. **Lombok Integration**: The new code generator enables Lombok by default, reducing the need for boilerplate code and improving code readability and maintainability.

5. **Multi-Database Support**: It supports multiple database types, such as MySQL, Oracle, and SQL Server. You only need to configure the corresponding database connection information.

6. **Flexible Data Source Configuration**: It offers extensive data source configuration options, including database query methods, type converters, and keyword handlers, to meet the requirements of different databases.

### Example Configuration

```java
// Use FastAutoGenerator to quickly configure the code generator
FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8", "root", "password")
    .globalConfig(builder -> {
        builder.author("Your Name") // Set author name
            .outputDir("src/main/java"); // Output directory
    })
    .packageConfig(builder -> {
        builder.parent("com.example") // Set parent package name
            .entity("model") // Set entity class package name
            .mapper("dao") // Set Mapper interface package name
            .service("service") // Set Service interface package name
            .serviceImpl("service.impl") // Set Service implementation class package name
            .xml("mappers"); // Set Mapper XML file package name
    })
    .strategyConfig(builder -> {
        builder.addInclude("table1", "table2") // Set table names to generate
            .entityBuilder()
            .enableLombok() // Enable Lombok
            .enableTableFieldAnnotation() // Enable field annotations
            .controllerBuilder()
            .enableRestStyle(); // Enable REST style
    })
    .templateEngine(new FreemarkerTemplateEngine()) // Use Freemarker template engine
    .execute(); // Execute generation
```

### Database Configuration (DataSourceConfig)

#### Basic Configuration

| Property | Description | Example |
| -------- | ----------- | ------- |
| url      | JDBC URL    | jdbc:mysql://127.0.0.1:3306/mybatis-plus |
| username | Database username | root |
| password | Database password | 123456 |

```java
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456").build();
```

#### Optional Configuration

| Method | Description | Example |
| ------ | ----------- | ------- |
| dbQuery(IDbQuery) | Database query | new MySqlQuery(), only takes effect with SQLQuery |
| schema(String) | Database schema (applicable for some databases) | mybatis-plus |
| typeConvert(ITypeConvert) | Database type converter | new MySqlTypeConvert(), only takes effect with SQLQuery |
| keyWordsHandler(IKeyWordsHandler) | Database keywords handler | new MySqlKeyWordsHandler() |
| typeConvertHandler(ITypeConvertHandler) | Type converter (default) | Custom implementation of ITypeConvertHandler, only takes effect with DefaultQuery |
| databaseQueryClass(AbstractDatabaseQuery) | Database query method | Default: DefaultQuery.class (universal metadata), SQLQuery.class (SQL query) |

```java
// Use SQL query method for code generation. This is the legacy approach with limited universality. Existing code can continue using it, but adapting to different databases requires extending dbQuery and typeConvert. This method will not be maintained in the future.
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .dbQuery(new MySqlQuery())
    .schema("mybatis-plus")
    .typeConvert(new MySqlTypeConvert())
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .databaseQueryClass(SQLQuery.class)
    .build();

// Use metadata query method for code generation. By default, it adapts Java types based on jdbcType. You can use typeConvertHandler to convert the type mappings you need.
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .schema("mybatis-plus")
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .build();
```

## Global Configuration

Global configuration provides settings for the overall behavior of the code generator, including the output directory, author information, Kotlin mode, Swagger integration, date type strategy, and more.

### Method Description

| Method                      | Description                                 | Example                                                    |
| ------------------------- | ------------------------------------ | ------------------------------------------------------- |
| disableOpenDir()          | Disables automatic opening of the output directory                 | Default: `true`                                          |
| outputDir(String)         | Specifies the output directory for generated code               | `/opt/baomidou` Default: Windows: `D://` Linux/Mac: `/tmp` |
| author(String)            | Sets the author name                           | `baomidou` Default: The author name from the configuration file                   |
| enableKotlin()            | Enables Kotlin mode                     | Default: `false`                                         |
| enableSwagger()           | Enables Swagger mode                    | Default: `false`                                         |
| dateType(DateType)        | Sets the date type strategy                     | `DateType.ONLY_DATE` Default: `DateType.TIME_PACK`       |
| commentDate(String)       | Sets the comment date format                     | Default: `yyyy-MM-dd`                                    |

### Example Configuration

```java
GlobalConfig globalConfig = new GlobalConfig.Builder()
    .disableOpenDir(false) // Allow automatic opening of the output directory
    .outputDir("/path/to/output") // Set the output directory
    .author("Your Name") // Set the author name
    .enableKotlin(true) // Enable Kotlin mode
    .enableSwagger(true) // Enable Swagger mode
    .dateType(DateType.ONLY_DATE) // Set the date type strategy
    .commentDate("yyyy-MM-dd") // Set the comment date format
    .build();
```

## Package Configuration (PackageConfig)

Package configuration defines the package structure for generated code, including the parent package name, module name, entity class package name, service layer package name, and more.

### Method Description

| Method                              | Description              | Example                                                   |
| --------------------------------- | ----------------- | ------------------------------------------------------ |
| parent(String)                    | Sets the parent package name        | Default value: `com.baomidou`                                 |
| moduleName(String)                | Sets the parent module name    | Default value: None                                             |
| entity(String)                    | Sets the Entity package name  | Default value: `entity`                                       |
| service(String)                   | Sets the Service package name | Default value: `service`                                      |
| serviceImpl(String)               | Sets the Service Impl package name | Default value: `service.impl`                                 |
| mapper(String)                    | Sets the Mapper package name  | Default value: `mapper`                                       |
| xml(String)                       | Sets the Mapper XML package name | Default value: `mapper.xml`                                   |
| controller(String)                | Sets the Controller package name | Default value: `controller`                                   |
| pathInfo(Map<OutputFile, String>) | Sets the path configuration information  | `Collections.singletonMap(OutputFile.mapperXml, "D://")` |

### Example Configuration

```java
PackageConfig packageConfig = new PackageConfig.Builder()
    .parent("com.example") // Set parent package name
    .moduleName("myapp") // Set parent module name
    .entity("model") // Set Entity package name
    .service("service") // Set Service package name
    .serviceImpl("service.impl") // Set Service Impl package name
    .mapper("dao") // Set Mapper package name
    .xml("mappers") // Set Mapper XML package name
    .controller("controller") // Set Controller package name
    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "/path/to/xml")) // Set path configuration information
    .build();
```

## TemplateConfig

Note: Starting from MyBatis-Plus 3.5.6, template configuration has been moved to `StrategyConfig`. Below is the configuration method after migration.

### Method Description

| Method                                                       | Description               | Example                                                                                       |
| ------------------------------------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------- |
| entityBuilder()                                              | Sets the entity class template |                                                                                              |
| javaTemplate(String)                                         | Sets the Java entity template | `/templates/entity.java`                                                                     |
| disable()                                                    | Disables entity class generation |                                                                                              |
| serviceBuilder()                                             | Sets the Service layer template |                                                                                              |
| disableService()                                             | Disables Service layer generation |                                                                                              |
| serviceTemplate(String)                                      | Sets the Service template | `/templates/service.java`                                                                    |
| serviceImplTemplate(String)                                  | Sets the ServiceImpl template | `/templates/serviceImpl.java`                                                                |

### Example Configuration

```java
// Example configuration before version 3.5.6
TemplateConfig templateConfig = new TemplateConfig.Builder()
    .disable(TemplateType.ENTITY)
    .entity("/templates/entity.java")
    .service("/templates/service.java")
    .serviceImpl("/templates/serviceImpl.java")
    .mapper("/templates/mapper.java")
    .mapperXml("/templates/mapper.xml")
    .controller("/templates/controller.java")
    .build();

// Example configuration after version 3.5.6
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .entityBuilder()
    .javaTemplate("/templates/entity.java") // Set entity class template
    .disable() // Disable entity class generation
    .serviceBuilder()
    .disableService() // Disable Service layer generation
    .serviceTemplate("/templates/service.java") // Set Service template
    .serviceImplTemplate("/templates/serviceImpl.java") // Set ServiceImpl template
    .build();
```

## InjectionConfig

InjectionConfig allows you to customize the behavior of the code generator, including logic executed before outputting files, custom configuration Map objects, and custom template file configurations.

### Method Description

| Method                                                       | Description                | Example                                                                                           |
| ------------------------------------------------------------ | -------------------------- |-------------------------------------------------------------------------------------------------|
| beforeOutputFile(BiConsumer<TableInfo, Map<String, Object>>) | Logic executed before file output | Execute custom logic before generating files, such as printing table information or modifying configuration data |
| customMap(Map<String, Object>)                               | Custom configuration Map object | Used to access custom configuration information in templates, such as project name, author, etc. |
| customFile(Map<String, String>)                              | Custom template file configuration | Used to specify custom template file paths, can format file names, refer to test case H2CodeGeneratorTest.testCustomFileByList |

### Example Configuration

```java
InjectionConfig injectionConfig = new InjectionConfig.Builder()
    .beforeOutputFile((tableInfo, objectMap) -> {
        System.out.println("Preparing to generate file: " + tableInfo.getEntityName());
        // You can add custom logic here, such as modifying configurations in objectMap
    })
    .customMap(Collections.singletonMap("projectName", "MyBatis-Plus Generator"))
    .customFile(Collections.singletonMap("custom.txt", "/templates/custom.vm"))
    .build();
```

With the above configuration, you can flexibly customize the behavior of the code generator according to your needs. For example, you can execute specific logic before generating files or use custom template files to generate code. These configuration options provide significant flexibility, enabling the MyBatis-Plus code generator to adapt to various complex project requirements.

## StrategyConfig

Strategy configuration is the core component of the MyBatis-Plus code generator. It allows you to customize code generation rules according to your project requirements, including naming patterns, table and field filtering, and generation strategies for various code modules.

### Method Description

| Method                      | Description             | Example                                                        |
|---------------------------|----------------|-----------------------------------------------------------|
| enableCapitalMode         | Enable uppercase naming | Default: `false`                                                 |
| enableSkipView            | Enable view skipping    | Default: `false`                                                 |
| disableSqlFilter          | Disable SQL filtering   | Default: `true`, you can disable this option if SQL filtering is not supported |
| enableSchema              | Enable schema           | Default: `false`, enable this for multi-schema scenarios         |
| likeTable(LikeTable)      | Fuzzy table matching (SQL filter) | Mutually exclusive with `notLikeTable`, you can only configure one |
| notLikeTable(LikeTable)   | Fuzzy table exclusion (SQL filter) | Mutually exclusive with `likeTable`, you can only configure one |
| addInclude(String...)     | Add table inclusion (memory filter) | Mutually exclusive with `addExclude`, you can only configure one. Supports regex matching, e.g., `^t_.*` matches all table names starting with `t_` |
| addExclude(String...)     | Add table exclusion (memory filter) | Mutually exclusive with `addInclude`, you can only configure one. Supports regex matching, e.g., `.*st$` matches all table names ending with `st` |
| addTablePrefix(String...) | Add table prefix filtering |                                                           |
| addTableSuffix(String...) | Add table suffix filtering |                                                           |
| addFieldPrefix(String...) | Add field prefix filtering |                                                           |
| addFieldSuffix(String...) | Add field suffix filtering |                                                           |
| outputFile                | Built-in template output file handling | Refer to test case `H2CodeGeneratorTest.testOutputFile`                |
| entityBuilder             | Entity strategy configuration |                                                           |
| controllerBuilder         | Controller strategy configuration |                                                           |
| mapperBuilder             | Mapper strategy configuration |                                                           |
| serviceBuilder            | Service strategy configuration |                                                           |

### Example Configuration

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .enableCapitalMode() // Enable uppercase naming
    .enableSkipView() // Enable view skipping
    .disableSqlFilter() // Disable SQL filtering
    .likeTable(new LikeTable("USER")) // Fuzzy match table names
    .addInclude("t_simple") // Add table matching
    .addTablePrefix("t_", "c_") // Add table prefix filtering
    .addFieldSuffix("_flag") // Add field suffix filtering
    .build();
```

### Entity Strategy Configuration

Entity strategy configuration allows you to customize the generation rules for entity classes, including parent class, serial version UID, file override, field constants, chain model, Lombok model, and more.

#### Method Description

| Method                                        | Description                              | Example                                                         |
| ------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| nameConvert(INameConvert)                   | Name conversion implementation                      |                                                              |
| superClass(Class<?>)                        | Set parent class                          | `BaseEntity.class`                                           |
| superClass(String)                          | Set parent class                          | `com.baomidou.global.BaseEntity`                             |
| disableSerialVersionUID                     | Disable serialVersionUID generation         | Default: `true`                                               |
| enableFileOverride                          | Overwrite existing files                    | Default: `false`                                              |
| enableColumnConstant                        | Enable field constant generation                  | Default: `false`                                              |
| enableChainModel                            | Enable chain model                      | Default: `false`                                              |
| enableLombok                                | Enable Lombok model                  | Default: `false`  Default includes only Getter,Setter; ToString added since 3.5.10 |
| enableRemoveIsPrefix                        | Remove 'is' prefix from Boolean type fields | Default: `false`                                              |
| enableTableFieldAnnotation                  | Generate field annotations when creating entities        | Default: `false`                                              |
| enableActiveRecord                          | Enable ActiveRecord model            | Default: `false`                                              |
| versionColumnName(String)                   | Optimistic lock column name (database field)          | Use either `versionColumnName` or `versionPropertyName`      |
| versionPropertyName(String)                 | Optimistic lock property name (entity)                | Use either `versionColumnName` or `versionPropertyName`      |
| logicDeleteColumnName(String)               | Logical delete column name (database field)        | Use either `logicDeleteColumnName` or `logicDeletePropertyName` |
| logicDeletePropertyName(String)             | Logical delete property name (entity)              | Use either `logicDeleteColumnName` or `logicDeletePropertyName` |
| naming                                      | Naming strategy for database table to entity mapping      | Default underscore to camel case: `NamingStrategy.underline_to_camel`    |
| columnNaming                                | Naming strategy for database table field to entity mapping  | Default: `null`, follows `naming` if not specified                      |
| addSuperEntityColumns(String...)            | Add parent class common fields                  |                                                              |
| addIgnoreColumns(String...)                 | Add ignored fields                      |                                                              |
| addTableFills(IFill...)                     | Add table field fills                    |                                                              |
| addTableFills(List<IFill\>)                 | Add table field fills                    |                                                              |
| idType(IdType)                              | Global primary key type                      |                                                              |
| convertFileName(ConverterFileName)          | Convert file name                      |                                                              |
| formatFileName(String)                      | Format file name                    |                                                              |
| toString(boolean)                           | Whether to generate ToString method              | Default: true, since 3.5.10                                     |
| fieldUseJavaDoc                             | Enable field JavaDoc comments                  | Default: true, since 3.5.10                                     |
| classAnnotations(ClassAnnotationAttributes) | Add entity class annotations                    | Since 3.5.10                                                 |
| tableAnnotationHandler                      | Table annotation handler                      | Since 3.5.10                                                 |
| tableFieldAnnotationHandler                 | Field annotation handler                    | Since 3.5.10                                                 |
| enableLombok(ClassAnnotationAttributes...)  | Enable Lombok model and set Lombok annotations  | Since 3.5.10.   Example using @Data: enableLombok(new ClassAnnotationAttributes("@Data","lombok.Data")) |

#### Example Configuration

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

### Controller Strategy Configuration

Controller strategy configuration allows you to customize the generation rules for Controller classes, including parent class, file override, camel case to hyphen conversion, RestController annotation, and more.

#### Method Description

| Method                               | Description                           | Example                               |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| superClass(Class<?>)               | Sets the parent class                       | `BaseController.class`               |
| superClass(String)                 | Sets the parent class                       | `com.baomidou.global.BaseController` |
| enableFileOverride                 | Overwrites existing files                 | Default: `false`                       |
| enableHyphenStyle                  | Enables camel case to hyphen conversion               | Default: `false`                       |
| enableRestStyle                    | Enables @RestController generation | Default: `false`                       |
| convertFileName(ConverterFileName) | Converts file names                   |                                    |
| formatFileName(String)             | Formats file names                 |                                    |

#### Example Configuration

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .controllerBuilder()
    .superClass(BaseController.class)
    .enableHyphenStyle()
    .enableRestStyle()
    .formatFileName("%sAction")
    .build();
```

### Service Strategy Configuration

Service strategy configuration allows you to customize the generation rules for Service interfaces and implementation classes, including parent classes, file overwriting, and file name conversion.

#### Method Description

| Method                                          | Description                          | Example                                |
| --------------------------------------------- | ----------------------------- | ----------------------------------- |
| superServiceClass(Class<?>)                   | Sets the Service interface parent class         | `BaseService.class`                   |
| superServiceClass(String)                     | Sets the Service interface parent class         | `com.baomidou.global.BaseService`     |
| superServiceImplClass(Class<?>)               | Sets the Service implementation class parent class       | `BaseServiceImpl.class`               |
| superServiceImplClass(String)                 | Sets the Service implementation class parent class       | `com.baomidou.global.BaseServiceImpl` |
| enableFileOverride                            | Overwrites existing generated files                | Default: `false`                        |
| convertServiceFileName(ConverterFileName)     | Converts Service interface file names     |                                         |
| convertServiceImplFileName(ConverterFileName) | Converts Service implementation class file names   |                                         |
| formatServiceFileName(String)                 | Formats Service interface file names   |                                         |
| formatServiceImplFileName(String)             | Formats Service implementation class file names |                                         |

#### Example Configuration

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .serviceBuilder()
    .superServiceClass(BaseService.class)
    .superServiceImplClass(BaseServiceImpl.class)
    .formatServiceFileName("%sService")
    .formatServiceImplFileName("%sServiceImp")
    .build();
```

### Mapper Strategy Configuration

Mapper strategy configuration allows you to customize the generation rules for Mapper interfaces and their corresponding XML mapping files. This includes settings for the parent class, file overwriting, Mapper annotations, result maps, column lists, cache implementation classes, and more.

#### Method Description

| Method                                     | Description                      | Example                           |
| ---------------------------------------- | ----------------------------- | ------------------------------ |
| superClass(Class<?>)                     | Sets the parent class          | `BaseMapper.class`               |
| superClass(String)                       | Sets the parent class          | `com.baomidou.global.BaseMapper` |
| enableFileOverride                       | Overwrites existing generated files | Default: `false`                   |
| enableMapperAnnotation                   | Enables @Mapper annotation     | Default: `false`                   |
| enableBaseResultMap                      | Enables BaseResultMap generation | Default: `false`                   |
| enableBaseColumnList                     | Enables BaseColumnList         | Default: `false`                   |
| cache(Class<? extends Cache>)            | Sets the cache implementation class | `MyMapperCache.class`            |
| convertMapperFileName(ConverterFileName) | Converts Mapper class file name |                                    |
| convertXmlFileName(ConverterFileName)    | Converts XML file name         |                                    |
| formatMapperFileName(String)             | Formats Mapper file name       |                                    |
| formatXmlFileName(String)                | Formats XML implementation class file name |                                    |
| generateMapperMethodHandler | Customizes Mapper method implementation generation | Available since 3.5.10                     |

#### Example Configuration

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

## Custom Template Support (DTO/VO, etc.) Configuration

The MyBatis-Plus code generator supports custom templates, such as DTO (Data Transfer Object) and VO (Value Object).

```java
FastAutoGenerator.create(url, username, password)
    .globalConfig(builder -> {
        builder.author("abc") // Set author
            .enableSwagger() // Enable swagger mode
            .disableOpenDir() // Disable opening output directory
            .outputDir(finalProjectPath + "/src/main/java"); // Specify output directory
    })
    .packageConfig(builder -> {
        builder.parent("com.baomidou.mybatisplus.samples") // Set parent package name
            .moduleName("test") // Set parent package module name
            .entity("model.entity") // Set entity class package name
            .pathInfo(Collections.singletonMap(OutputFile.xml, finalProjectPath + "/src/main/resources/mapper")); // Set Mapper XML file generation path
    })
     .injectionConfig(injectConfig -> {
                Map<String,Object> customMap = new HashMap<>();
                customMap.put("abc","1234");
                injectConfig.customMap(customMap); // Inject custom attributes
                injectConfig.customFile(new CustomFile.Builder()
                    .fileName("entityDTO.java") // File name
                    .templatePath("templates/entityDTO.java.ftl") // Specify template path
                    .packageName("dto") // Package name. Starting from version 3.5.10, you can get the full custom package path through the package. Lower versions cannot obtain this. Example: package.entityDTO
                    .build());
      })
    .templateEngine(new FreemarkerTemplateEngine())
    .execute(); // Execute generation
```

In the example above, we defined a custom Freemarker template named `entityDTO.java.ftl` and added its path to the `customFile` mapping. When generating code, the code generator will use this template to generate the DTO class.

:::note

- Custom template files should be placed in the project's `templates` directory, or you should specify a valid path.
- Template file names should follow certain conventions, such as `entityDTO.java.ftl`, where `entityDTO` is the generated class name, `.java` indicates the generated file type, and `.ftl` is the Freemarker template extension.
- In template files, you can use Freemarker syntax to access data in the `objectMap`, for example `${entityName}` retrieves the entity class name.

:::

With the above configuration, developers can customize the code generator's templates according to project requirements, thereby generating code files that conform to specific project structures.
