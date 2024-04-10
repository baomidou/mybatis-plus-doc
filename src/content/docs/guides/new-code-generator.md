---
title: 代码生成器
sidebar:
  order: 1
  badge:
    text: New
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

