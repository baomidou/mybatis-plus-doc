---
title: MyBatis X Plugin
sidebar:
  order: 20
---

MyBatisX is a rapid development plugin designed specifically for IntelliJ IDEA, aimed at enhancing development efficiency with the MyBatis and MyBatis-Plus frameworks.

### Installation Guide

1. Open IntelliJ IDEA.
2. Go to `File -> Settings -> Plugins -> Browse Repositories`.
3. Enter `mybatisx` in the search box.
4. Find the MyBatisX plugin and click Install.

:::note[Support the Developers]

If you find the MyBatisX plugin helpful, please give it a [five-star rating](https://plugins.jetbrains.com/plugin/10119-mybatisx) on the plugin page to support the developers' continuous improvement efforts.

Contributions to the MyBatisX plugin are also welcome. Source code repository: [MyBatisX Source Code](https://gitee.com/baomidou/MybatisX)

:::

## Core Features

### XML Mapping Navigation

MyBatisX provides convenient navigation between XML mapping files and Java interfaces, allowing developers to quickly switch between them and improve development efficiency.

![XML Navigation Demo](/images/content/mybatisx-jump.gif)

### Code Generation

With MyBatisX, you can easily generate corresponding Java entity classes, Mapper interfaces, and XML mapping files based on your database table structure.

![Code Generation Demo](/images/content/mybatisx-generate.gif)

### Template Reset

MyBatisX allows you to reset code generation templates to restore default settings or customize template content.

![Reset Template Demo](/images/content/mybatisx-reset-template.gif)

### JPA-Style Hints

MyBatisX supports JPA-style code hints, including automatic code generation for insert, select, update, and delete operations.

- Generate Insert Operation
  ![Generate Insert Demo](/images/content/mybatisx-tip-insert.gif)
- Generate Select Operation
  ![Generate Select Demo](/images/content/mybatisx-tip-select.gif)
- Generate Update Operation
  ![Generate Update Demo](/images/content/mybatisx-tip-update.gif)
- Generate Delete Operation
  ![Generate Delete Demo](/images/content/mybatisx-tip-delete.gif)

## Frequently Asked Questions

### JPA Hint Feature Not Working?

The JPA hint feature relies on the association between Mapper interfaces and entity classes. Ensure your Mapper meets any of the following conditions:

1. Extends mybatis-plus's BaseMapper.
2. Contains a resultMap tag in the Mapper.xml file.
3. Specifies the entity class via annotation on the Mapper class, e.g., `@Entity com.xx.xx.UserModel`.

### Generated Table Name Doesn't Match Expectations?

MyBatisX determines the table name based on the following rules:

1. JPA annotation on the entity class, e.g., `@Table(name="t_user")`.
2. mybatis-plus annotation on the entity class, e.g., `@TableName("t_user")`.
3. Comment on the entity class, e.g., `@TableName com.xx.xx.UserModel`.
4. If none of the above rules apply, the camel-case class name is converted to snake case, e.g., `UserModel` corresponds to table name `user_model`.

## Code Generation Template Configuration

MyBatisX provides flexible template configuration options, allowing developers to customize code generation templates according to their needs.

### Default Templates

You can find the default provided templates in the `Scratches and Consoles -> Extensions -> MyBatisX` directory, such as `default-all`, `default`, `mybatis-plus2`, `mybatis-plus3`, etc.

### Reset Default Templates

To reset templates to default settings, right-click the MyBatisX directory and select `Restore Default Extensions`.

![Code Generation Template Configuration Demo](/images/content/mybatisx-template-setting.jpg)

### Custom Template Content

MyBatisX allows you to customize template content according to project requirements, including entity classes, table names, field information, etc.

#### Entity Class Information

- `tableClass.fullClassName`: Fully qualified class name.
- `tableClass.shortClassName`: Short class name.
- `tableClass.tableName`: Table name.
- `tableClass.pkFields`: Primary key fields of the table.
- `tableClass.allFields`: All fields of the table.
- `tableClass.baseFields`: All fields excluding primary keys and blobs.
- `tableClass.baseBlobFields`: All fields excluding primary keys.
- `tableClass.remark`: Table comment.

#### Field Information

- `field.fieldName`: Field name.
- `field.columnName`: Column name.
- `field.jdbcType`: JDBC type.
- `field.columnLength`: Column length.
- `field.columnScale`: Column scale.
- `field.columnIsArray`: Whether the field type is an array.
- `field.shortTypeName`: Short Java type name.
- `field.fullTypeName`: Fully qualified Java type name.
- `field.remark`: Field comment.
- `field.autoIncrement`: Whether it's auto-increment.
- `field.nullable`: Whether it's nullable.

#### Configuration Information

- `baseInfo.shortClassName`: Configuration name.
- `baseInfo.tableName`: Configuration file name.
- `baseInfo.pkFields`: Configuration name.
- `baseInfo.allFields`: Suffix.
- `baseInfo.baseFields`: Package name.
- `baseInfo.baseBlobFields`: Template content.
- `baseInfo.remark`: Relative module resource file path.

With the MyBatisX plugin, you can significantly improve development efficiency with MyBatis and MyBatis-Plus frameworks, while enjoying convenient code generation and template customization features.
