---
title: Mybatis X Plugin
sidebar:
  order: 20
---

MybatisX is a rapid development plugin designed specifically for IntelliJ IDEA, aimed at enhancing development efficiency for MyBatis and MyBatis-Plus frameworks.

### Installation Guide

1. Open IntelliJ IDEA.
2. Navigate to `File -> Settings -> Plugins -> Browse Repositories`.
3. Enter `mybatisx` in the search box.
4. Locate the MybatisX plugin and click Install.

:::note[Support the Developers]

If you find the MybatisX plugin helpful, please give it a [five-star rating](https://plugins.jetbrains.com/plugin/10119-mybatisx) on the plugin page to support continuous improvements by the developers.

Contributions to the MybatisX plugin are also welcome. Source code repository: [MybatisX Source Code](https://gitee.com/baomidou/MybatisX)

:::

## Core Features

### XML Mapping Navigation

MybatisX provides convenient navigation between XML mapping files and Java interfaces, allowing developers to quickly switch between the two, thereby improving development efficiency.

![XML Navigation Demo](/images/content/mybatisx-jump.gif)

### Code Generation

With MybatisX, you can effortlessly generate corresponding Java entity classes, Mapper interfaces, and XML mapping files based on database table structures.

![Code Generation Demo](/images/content/mybatisx-generate.gif)

### Template Reset

MybatisX allows you to reset code generation templates to restore default settings or customize template content.

![Template Reset Demo](/images/content/mybatisx-reset-template.gif)

### JPA-Style Hints

MybatisX supports JPA-style code hints, including automatic code generation for CRUD operations (Create, Read, Update, Delete).

- Generate Insert Operation
  ![Insert Operation Demo](/images/content/mybatisx-tip-insert.gif)
- Generate Select Operation
  ![Select Operation Demo](/images/content/mybatisx-tip-select.gif)
- Generate Update Operation
  ![Update Operation Demo](/images/content/mybatisx-tip-update.gif)
- Generate Delete Operation
  ![Delete Operation Demo](/images/content/mybatisx-tip-delete.gif)

## Frequently Asked Questions

### JPA Hint Feature Not Working?

The JPA hint feature relies on the association between Mapper interfaces and entity classes. Ensure your Mapper meets any of the following conditions:

1. Extends mybatis-plus's BaseMapper.
2. Contains a resultMap tag in the Mapper.xml file.
3. Specifies the entity class via annotation on the Mapper class, e.g., `@Entity com.xx.xx.UserModel`.

### Generated Table Name Doesn't Match Expectations?

MybatisX determines table names based on the following rules:

1. JPA annotations on the entity class, e.g., `@Table(name="t_user")`.
2. mybatis-plus annotations on the entity class, e.g., `@TableName("t_user")`.
3. Comments on the entity class, e.g., `@TableName com.xx.xx.UserModel`.
4. If none of the above apply, the camel-case class name is converted to underscore notation, e.g., `UserModel` corresponds to table name `user_model`.

## Code Generation Template Configuration

MybatisX offers flexible template configuration options, allowing developers to customize code generation templates as needed.

### Default Templates

Under `Scratches and Consoles -> Extensions -> MybatisX`, you can find default templates such as `default-all`, `default`, `mybatis-plus2`, `mybatis-plus3`, etc.

### Restore Default Templates

To reset templates to default settings, right-click the MybatisX directory and select `Restore Default Extensions`.

![Template Configuration Demo](/images/content/mybatisx-template-setting.jpg)

### Customize Template Content

MybatisX allows you to customize template content according to project requirements, including entity classes, table names, field information, etc.

#### Entity Class Information

- `tableClass.fullClassName`: Fully qualified class name.
- `tableClass.shortClassName`: Short class name.
- `tableClass.tableName`: Table name.
- `tableClass.pkFields`: Primary key fields of the table.
- `tableClass.allFields`: All fields of the table.
- `tableClass.baseFields`: All fields excluding primary keys and blobs.
- `tableClass.baseBlobFields`: All fields excluding primary keys.
- `tableClass.remark`: Table comments.

#### Field Information

- `field.fieldName`: Field name.
- `field.columnName`: Column name.
- `field.jdbcType`: JDBC type.
- `field.columnLength`: Column length.
- `field.columnScale`: Column precision.
- `field.columnIsArray`: Whether the field type is an array.
- `field.shortTypeName`: Short Java type name.
- `field.fullTypeName`: Fully qualified Java type name.
- `field.remark`: Field comments.
- `field.autoIncrement`: Whether it is auto-incremented.
- `field.nullable`: Whether it allows null values.

#### Configuration Information

- `baseInfo.shortClassName`: Configuration name.
- `baseInfo.tableName`: Configuration file name.
- `baseInfo.pkFields`: Configuration name.
- `baseInfo.allFields`: Suffix.
- `baseInfo.baseFields`: Package name.
- `baseInfo.baseBlobFields`: Template content.
- `baseInfo.remark`: Relative module resource file path.

With the MybatisX plugin, you can significantly improve development efficiency for MyBatis and MyBatis-Plus frameworks while enjoying convenient code generation and template customization features.
