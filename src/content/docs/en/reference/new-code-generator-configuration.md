---
title: Code Generator Configuration
sidebar:
  order: 3
  badge:
    text: New
---

MyBatis-Plus's new code generator, while inheriting the original functionality, introduces a more flexible and efficient builder pattern, enabling developers to quickly generate code that meets requirements while maintaining elegance and cleanliness. This new feature aims to further enhance development efficiency, reduce repetitive work, and allow developers to focus more on implementing business logic.

### Feature Description  

1. **Builder Pattern**: Through the builder pattern, developers can chain configuration methods to intuitively construct the code generator's settings, making the code clearer and more readable.  

2. **Quick Configuration**: The new code generator provides quick configuration options, such as global settings, package settings, strategy settings, etc., allowing one-click setup of common options to quickly start the code generation process.  

3. **Template Engine**: Supports template engines like Freemarker, enabling developers to customize code templates to generate code that aligns with their project's specific style.  

4. **Lombok Integration**: The new code generator enables Lombok by default, reducing boilerplate code and improving code readability and maintainability.  

5. **Multi-Database Support**: Compatible with various database types, such as MySQL, Oracle, SQL Server, etc. Simply configure the corresponding database connection details.  

6. **Flexible Data Source Configuration**: Offers extensive data source configuration options, including database query methods, type converters, keyword handlers, etc., to meet the needs of different databases.

### Example Configuration

```java
// Quickly configure the code generator using FastAutoGenerator
FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8", "root", "password")
    .globalConfig(builder -> {
        builder.author("Your Name") // Set author
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
        builder.addInclude("table1", "table2") // Set tables to generate
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

| Property | Description       | Example                                     |
| -------- | ---------- | ---------------------------------------- |
| url      | JDBC URL  | jdbc:mysql://127.0.0.1:3306/mybatis-plus |
| username | Database username | root                                     |
| password | Database password | 123456                                   |

```java
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456").build();
```

#### Optional Configurations

| Method                                      | Description                          | Example                                                        |
| ----------------------------------------- | ----------------------------- | ----------------------------------------------------------- |
| dbQuery(IDbQuery)                         | Database query                    | new MySqlQuery(), only effective under SQLQuery                         |
| schema(String)                            | Database schema (applicable to some databases) | mybatis-plus                                                |
| typeConvert(ITypeConvert)                 | Database type converter              | new MySqlTypeConvert(), only effective under SQLQuery                   |
| keyWordsHandler(IKeyWordsHandler)         | Database keyword handler            | new MySqlKeyWordsHandler()                                  |
| typeConvertHandler(ITypeConvertHandler)   | Type converter (default)              | Custom implementation of ITypeConvertHandler, only effective under DefaultQuery        |
| databaseQueryClass(AbstractDatabaseQuery) | Database query method                | Default: DefaultQuery.class (universal metadata), SQLQuery.class (SQL query) |

```java
// Using SQL query to generate code, which belongs to the old code generation method. It has poor universality. Legacy code can continue to use it. Adapting to databases requires extending dbQuery and typeConvert. This method will no longer be maintained in the future.
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .dbQuery(new MySqlQuery())
    .schema("mybatis-plus")
    .typeConvert(new MySqlTypeConvert())
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .databaseQueryClass(SQLQuery.class)
    .build();

// Using metadata query to generate code. By default, it adapts Java types based on jdbcType. Supports using typeConvertHandler to map the required type mappings.
DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/mybatis-plus", "root", "123456")
    .schema("mybatis-plus")
    .keyWordsHandler(new MySqlKeyWordsHandler())
    .build();
```

## Global Configuration (GlobalConfig)

Global configuration provides settings for the overall behavior of the code generator, including output directory, author information, Kotlin mode, Swagger integration, time type strategy, and more.

### Method Description

| Method                     | Description                              | Example                                                    |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| disableOpenDir()          | Disable automatically opening the output directory | Default: `true`                                            |
| outputDir(String)         | Specify the output directory for code generation | `/opt/baomidou` Default: Windows: `D://` Linux/Mac: `/tmp` |
| author(String)            | Set the author name                      | `baomidou` Default: Author name in the configuration file  |
| enableKotlin()            | Enable Kotlin mode                       | Default: `false`                                           |
| enableSwagger()           | Enable Swagger mode                      | Default: `false`                                           |
| dateType(DateType)        | Set the date type strategy               | `DateType.ONLY_DATE` Default: `DateType.TIME_PACK`         |
| commentDate(String)       | Set the comment date format              | Default: `yyyy-MM-dd`                                      |

### Example Configuration

```java
GlobalConfig globalConfig = new GlobalConfig.Builder()
    .disableOpenDir(false) // Allow automatically opening the output directory
    .outputDir("/path/to/output") // Set the output directory
    .author("Your Name") // Set the author name
    .enableKotlin(true) // Enable Kotlin mode
    .enableSwagger(true) // Enable Swagger mode
    .dateType(DateType.ONLY_DATE) // Set the date type strategy
    .commentDate("yyyy-MM-dd") // Set the comment date format
    .build();
```

## Package Configuration (PackageConfig)

Package configuration is used to define the package structure of the generated code, including the parent package name, module name, entity class package name, service layer package name, etc.

### Method Description

| Method                              | Description              | Example                                                   |
| --------------------------------- | ----------------- | ------------------------------------------------------ |
| parent(String)                    | Set parent package name        | Default: `com.baomidou`                                 |
| moduleName(String)                | Set parent module name    | Default: None                                             |
| entity(String)                    | Set Entity package name  | Default: `entity`                                       |
| service(String)                   | Set Service package name | Default: `service`                                      |
| serviceImpl(String)               | Set Service Impl package name | Default: `service.impl`                                 |
| mapper(String)                    | Set Mapper package name  | Default: `mapper`                                       |
| xml(String)                       | Set Mapper XML package name | Default: `mapper.xml`                                   |
| controller(String)                | Set Controller package name | Default: `controller`                                   |
| pathInfo(Map<OutputFile, String>) | Set path configuration information  | `Collections.singletonMap(OutputFile.mapperXml, "D://")` |

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
    .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "/path/to/xml")) // Set path configuration
    .build();
```

## Template Configuration (TemplateConfig)

Note: Starting from MyBatis-Plus 3.5.6, template configuration has been migrated to `StrategyConfig`. Below is the configuration method after migration.

### Method Description

| Method                                                       | Description               | Example                                                                                      |
| ------------------------------------------------------------ | ------------------------- |----------------------------------------------------------------------------------------------|
| entityBuilder()                                              | Set entity class template |                                                                                              |
| javaTemplate(String)                                         | Set Java entity template  | `/templates/entity.java`                                                                     |
| disable()                                                    | Disable entity generation |                                                                                              |
| serviceBuilder()                                             | Set Service layer template|                                                                                              |
| disableService()                                             | Disable Service generation|                                                                                              |
| serviceTemplate(String)                                      | Set Service template      | `/templates/service.java`                                                                    |
| serviceImplTemplate(String)                                 | Set ServiceImpl template  | `/templates/serviceImpl.java`                                                               |

### Example Configuration

```java
// Configuration example before version 3.5.6
TemplateConfig templateConfig = new TemplateConfig.Builder()
    .disable(TemplateType.ENTITY)
    .entity("/templates/entity.java")
    .service("/templates/service.java")
    .serviceImpl("/templates/serviceImpl.java")
    .mapper("/templates/mapper.java")
    .mapperXml("/templates/mapper.xml")
    .controller("/templates/controller.java")
    .build();

// Configuration example after version 3.5.6
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

## Injection Configuration (InjectionConfig)

InjectionConfig allows developers to customize the behavior of the code generator, including logic executed before file output, custom configuration Map objects, and custom template file configurations.

### Method Description

| Method                                                       | Description               | Example                                                                                           |
| ------------------------------------------------------------ | ------------------------- |----------------------------------------------------------------------------------------------|
| beforeOutputFile(BiConsumer<TableInfo, Map<String, Object>>) | Logic executed before file output | Executes custom logic before generating files, such as printing table information or modifying configuration data |
| customMap(Map<String, Object>)                               | Custom configuration Map object | Used to access custom configuration information in templates, such as project name, author, etc. |
| customFile(Map<String, String>)                              | Custom template file configuration | Used to specify custom template file paths, with support for filename formatting. Refer to test case H2CodeGeneratorTest.testCustomFileByList |

### Example Configuration

```java
InjectionConfig injectionConfig = new InjectionConfig.Builder()
    .beforeOutputFile((tableInfo, objectMap) -> {
        System.out.println("Preparing to generate file: " + tableInfo.getEntityName());
        // Custom logic can be added here, such as modifying configurations in objectMap
    })
    .customMap(Collections.singletonMap("projectName", "MyBatis-Plus Generator"))
    .customFile(Collections.singletonMap("custom.txt", "/templates/custom.vm"))
    .build();
```

With the above configuration, developers can flexibly customize the behavior of the code generator according to their needs. For example, executing specific logic before generating files or using custom template files to generate code. These configuration options provide significant flexibility, enabling the MyBatis-Plus code generator to adapt to various complex project requirements.

## Strategy Configuration (StrategyConfig)  

Strategy configuration is the core part of the MyBatis-Plus code generator, allowing developers to customize code generation rules according to project requirements. This includes naming patterns, table and field filtering, as well as generation strategies for various code modules.

### Method Description

| Method                      | Description             | Example                                                        |
|---------------------------|----------------|-----------------------------------------------------------|
| enableCapitalMode         | Enable uppercase naming | Default: `false`                                                 |
| enableSkipView            | Enable skipping views   | Default: `false`                                                 |
| disableSqlFilter          | Disable SQL filtering   | Default: `true`. Can be disabled if SQL filtering is not supported. |
| enableSchema              | Enable schema           | Default: `false`. Enable for multi-schema scenarios.             |
| likeTable(LikeTable)      | Fuzzy table matching (SQL filtering) | Mutually exclusive with `notLikeTable`. Only one can be configured. |
| notLikeTable(LikeTable)   | Fuzzy table exclusion (SQL filtering) | Mutually exclusive with `likeTable`. Only one can be configured. |
| addInclude(String...)     | Add table matching (in-memory filtering) | Mutually exclusive with `addExclude`. Supports regex, e.g., `^t_.*` matches all table names starting with `t_`. |
| addExclude(String...)     | Add table exclusion (in-memory filtering) | Mutually exclusive with `addInclude`. Supports regex, e.g., `.*st$` matches all table names ending with `st`. |
| addTablePrefix(String...) | Add table prefix filtering |                                                           |
| addTableSuffix(String...) | Add table suffix filtering |                                                           |
| addFieldPrefix(String...) | Add field prefix filtering |                                                           |
| addFieldSuffix(String...) | Add field suffix filtering |                                                           |
| outputFile                | Built-in template output file handling | Refer to test case `H2CodeGeneratorTest.testOutputFile`.         |
| entityBuilder             | Entity strategy configuration |                                                           |
| controllerBuilder         | Controller strategy configuration |                                                           |
| mapperBuilder             | Mapper strategy configuration |                                                           |
| serviceBuilder            | Service strategy configuration |                                                           |

### Example Configuration

```java
StrategyConfig strategyConfig = new StrategyConfig.Builder()
    .enableCapitalMode() // Enable uppercase naming
    .enableSkipView() // Enable skipping views
    .disableSqlFilter() // Disable SQL filtering
    .likeTable(new LikeTable("USER")) // Fuzzy match table names
    .addInclude("t_simple") // Add table matching
    .addTablePrefix("t_", "c_") // Add table prefix filtering
    .addFieldSuffix("_flag") // Add field suffix filtering
    .build();
```

### Entity Strategy Configuration  

Entity strategy configuration is used to customize the generation rules for entity classes, including parent classes, serial version UID, file overwriting, field constants, chained models, Lombok models, and more.

#### Method Description

| Method                                        | Description                              | Example                                                         |
| ------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| nameConvert(INameConvert)                   | Name conversion implementation                      |                                                              |
| superClass(Class<?>)                        | Set parent class                          | `BaseEntity.class`                                           |
| superClass(String)                          | Set parent class                          | `com.baomidou.global.BaseEntity`                             |
| disableSerialVersionUID                     | Disable generating serialVersionUID         | Default: `true`                                               |
| enableFileOverride                          | Overwrite existing files                    | Default: `false`                                              |
| enableColumnConstant                        | Enable generating field constants                  | Default: `false`                                              |
| enableChainModel                            | Enable chain model                      | Default: `false`                                              |
| enableLombok                                | Enable Lombok model                  | Default: `false`  Only Getter/Setter by default, ToString added since 3.5.10 |
| enableRemoveIsPrefix                        | Enable removing 'is' prefix for Boolean fields | Default: `false`                                              |
| enableTableFieldAnnotation                  | Enable generating field annotations for entities        | Default: `false`                                              |
| enableActiveRecord                          | Enable ActiveRecord model            | Default: `false`                                              |
| versionColumnName(String)                   | Optimistic lock field name (database column)          | Either `versionColumnName` or `versionPropertyName` is sufficient      |
| versionPropertyName(String)                 | Optimistic lock property name (entity)                | Either `versionColumnName` or `versionPropertyName` is sufficient      |
| logicDeleteColumnName(String)               | Logical delete field name (database column)        | Either `logicDeleteColumnName` or `logicDeletePropertyName` is sufficient |
| logicDeletePropertyName(String)             | Logical delete property name (entity)              | Either `logicDeleteColumnName` or `logicDeletePropertyName` is sufficient |
| naming                                      | Naming strategy for database table to entity mapping      | Default underscore to camel case: `NamingStrategy.underline_to_camel`    |
| columnNaming                                | Naming strategy for database table columns to entity fields  | Default is `null`, follows `naming` if unspecified                      |
| addSuperEntityColumns(String...)            | Add parent class common fields                  |                                                              |
| addIgnoreColumns(String...)                 | Add ignored fields                      |                                                              |
| addTableFills(IFill...)                     | Add table field fills                    |                                                              |
| addTableFills(List<IFill\>)                 | Add table field fills                    |                                                              |
| idType(IdType)                              | Global primary key type                      |                                                              |
| convertFileName(ConverterFileName)          | Convert file name                      |                                                              |
| formatFileName(String)                      | Format file name                    |                                                              |
| toString(boolean)                           | Whether to generate ToString method              | Default: true, since 3.5.10                                     |
| fieldUseJavaDoc                             | Enable field documentation comments                  | Default: true, since 3.5.10                                     |
| classAnnotations(ClassAnnotationAttributes) | Add entity class annotations                    | Since 3.5.10                                                 |
| tableAnnotationHandler                      | Table annotation processor                      | Since 3.5.10                                                 |
| tableFieldAnnotationHandler                 | Field annotation processor                    | Since 3.5.10                                                 |
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

Controller strategy configuration is used to customize the generation rules for Controller classes, including parent classes, file overwriting, camelCase to hyphen conversion, RestController annotations, and more.

#### Method Description

| Method                               | Description                           | Example                               |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| superClass(Class<?>)               | Set parent class                       | `BaseController.class`               |
| superClass(String)                 | Set parent class                       | `com.baomidou.global.BaseController` |
| enableFileOverride                 | Overwrite existing files                 | Default: `false`                       |
| enableHyphenStyle                  | Enable camelCase to hyphen-case conversion               | Default: `false`                       |
| enableRestStyle                    | Enable @RestController generation | Default: `false`                       |
| convertFileName(ConverterFileName) | Convert file name                   |                                    |
| formatFileName(String)             | Format file name                 |                                    |

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

Service strategy configuration is used to customize the generation rules for Service interfaces and implementation classes, including parent classes, file overwriting, file name conversion, and more.

#### Method Description

| Method                                          | Description                          | Example                                |
| --------------------------------------------- | ----------------------------- | ----------------------------------- |
| superServiceClass(Class<?>)                   | Parent interface class         | `BaseService.class`                   |
| superServiceClass(String)                     | Set Service interface parent class         | `com.baomidou.global.BaseService`     |
| superServiceImplClass(Class<?>)               | Set Service implementation class parent class       | `BaseServiceImpl.class`               |
| superServiceImplClass(String)                 | Set Service implementation class parent class       | `com.baomidou.global.BaseServiceImpl` |
| enableFileOverride                            | Overwrite existing files                | Default: `false`                        |
| convertServiceFileName(ConverterFileName)     | Convert Service interface file name     |                                         |
| convertServiceImplFileName(ConverterFileName) | Convert Service implementation class file name   |                                         |
| formatServiceFileName(String)                 | Format Service interface file name   |                                         |
| formatServiceImplFileName(String)             | Format Service implementation class file name |                                         |

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

Mapper strategy configuration is used to customize the generation rules for Mapper interfaces and their corresponding XML mapping files, including parent classes, file overwriting, Mapper annotations, result mappings, column lists, cache implementation classes, and more.

#### Method Description

| Method                                     | Description                      | Example                           |
| ---------------------------------------- | ------------------------- | ------------------------------ |
| superClass(Class<?>)                     | Set parent class                  | `BaseMapper.class`               |
| superClass(String)                       | Set parent class                  | `com.baomidou.global.BaseMapper` |
| enableFileOverride                       | Overwrite existing files            | Default: `false`                   |
| enableMapperAnnotation                   | Enable @Mapper annotation         | Default: `false`                   |
| enableBaseResultMap                      | Enable BaseResultMap generation   | Default: `false`                   |
| enableBaseColumnList                     | Enable BaseColumnList       | Default: `false`                   |
| cache(Class<? extends Cache>)            | Set cache implementation class            | `MyMapperCache.class`            |
| convertMapperFileName(ConverterFileName) | Convert Mapper class file name    |                                    |
| convertXmlFileName(ConverterFileName)    | Convert XML file name         |                                    |
| formatMapperFileName(String)             | Format Mapper file name    |                                    |
| formatXmlFileName(String)                | Format XML implementation class file name |                                    |
| generateMapperMethodHandler | Customize Mapper method implementation generation | Since 3.5.10                     |

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

MyBatis-Plus code generator supports custom templates, such as DTO (Data Transfer Object) and VO (Value Object).  

```java
FastAutoGenerator.create(url, username, password)
    .globalConfig(builder -> {
        builder.author("abc") // Set author
            .enableSwagger() // Enable Swagger mode
            .disableOpenDir() // Disable opening output directory
            .outputDir(finalProjectPath + "/src/main/java"); // Specify output directory
    })
    .packageConfig(builder -> {
        builder.parent("com.baomidou.mybatisplus.samples") // Set parent package name
            .moduleName("test") // Set parent module name
            .entity("model.entity") // Set entity package name
            .pathInfo(Collections.singletonMap(OutputFile.xml, finalProjectPath + "/src/main/resources/mapper")); // Set Mapper XML file output path
    })
     .injectionConfig(injectConfig -> {
                Map<String,Object> customMap = new HashMap<>();
                customMap.put("abc","1234");
                injectConfig.customMap(customMap); // Inject custom properties
                injectConfig.customFile(new CustomFile.Builder()
                    .fileName("entityDTO.java") // File name
                    .templatePath("templates/entityDTO.java.ftl") // Specify template path
                    .packageName("dto") // Package name (since 3.5.10, full package path can be obtained; lower versions cannot), e.g., package.entityDTO
                    .build());
      })
    .templateEngine(new FreemarkerTemplateEngine())
    .execute(); // Execute generation
```

In the example above, we defined a custom Freemarker template named `entityDTO.java.ftl` and added its path to the `customFile` mapping. During code generation, the generator will use this template to create the DTO class.  

:::note  

- Custom template files should be placed in the project's `templates` directory or a valid specified path.  
- Template file names should follow a certain convention, e.g., `entityDTO.java.ftl`, where `entityDTO` is the generated class name, `.java` indicates the file type, and `.ftl` is the Freemarker template extension.  
- In the template file, Freemarker syntax can be used to access data in `objectMap`, e.g., `${entityName}` retrieves the entity class name.  

:::  

With the above configuration, developers can customize the generator's templates according to project requirements, generating code files that match specific project structures.
