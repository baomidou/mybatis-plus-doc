---
sidebarDepth: 3
---

# 代码生成器

AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，极大的提升了开发效率。

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
