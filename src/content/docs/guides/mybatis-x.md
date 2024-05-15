---
title: Mybatis X 插件
sidebar:
  order: 20
---

MybatisX 是一款专为 IntelliJ IDEA 设计的快速开发插件，旨在提升 MyBatis 与 MyBatis-Plus 框架的开发效率。

### 安装指南

1. 打开 IntelliJ IDEA。
2. 进入 `File -> Settings -> Plugins -> Browse Repositories`。
3. 在搜索框中输入 `mybatisx`。
4. 找到 MybatisX 插件并点击安装。

:::note[支持开发者]

如果您觉得 MybatisX 插件对您有帮助，请在插件页面给予[五分好评](https://plugins.jetbrains.com/plugin/10119-mybatisx)，以支持开发者持续改进。

也欢迎大家参与 MyBatisX 插件的贡献，源码地址：[MybatisX 源码](https://gitee.com/baomidou/MybatisX)

:::

## 核心功能

### XML 映射跳转

MybatisX 提供了便捷的 XML 映射文件与 Java 接口之间的跳转功能，让开发者能够快速地在两者之间切换，提高开发效率。

![XML 跳转示例](/images/content/mybatisx-jump.gif)

### 代码生成

通过 MybatisX，您可以轻松地根据数据库表结构生成对应的 Java 实体类、Mapper 接口及 XML 映射文件。

![代码生成示例](/images/content/mybatisx-generate.gif)

### 重置模板

MybatisX 允许您重置代码生成模板，以恢复到默认设置或自定义模板内容。

![重置模板示例](/images/content/mybatisx-reset-template.gif)

### JPA 风格提示

MybatisX 支持 JPA 风格的代码提示，包括新增、查询、修改和删除操作的自动代码生成。

- 生成新增操作
  ![生成新增示例](/images/content/mybatisx-tip-insert.gif)
- 生成查询操作
  ![生成查询示例](/images/content/mybatisx-tip-select.gif)
- 生成修改操作
  ![生成修改示例](/images/content/mybatisx-tip-update.gif)
- 生成删除操作
  ![生成删除示例](/images/content/mybatisx-tip-delete.gif)

## 常见问题解答

### JPA 提示功能无法使用？

JPA 提示功能依赖于 Mapper 接口与实体类之间的关联。确保您的 Mapper 满足以下任一条件：

1. 继承了 mybatis-plus 的 BaseMapper。
2. Mapper.xml 文件中包含 resultMap 标签。
3. 在 Mapper 类上通过注释指定了实体类，例如：`@Entity com.xx.xx.UserModel`。

### 生成的表名与预期不符？

MybatisX 根据以下规则确定表名：

1. 实体类上的 JPA 注解，如：`@Table(name="t_user")`。
2. 实体类上的 mybatis-plus 注解，如：`@TableName("t_user")`。
3. 实体类上的注释，如：`@TableName com.xx.xx.UserModel`。
4. 若以上规则均不满足，则将驼峰命名的类名转换为下划线命名，如：`UserModel` 对应表名 `user_model`。

## 代码生成模板配置

MybatisX 提供了灵活的模板配置选项，允许开发者根据需要自定义代码生成模板。

### 默认模板

在 `Scratches and Consoles -> Extensions -> MybatisX` 目录下，您可以找到默认提供的模板，如 `default-all`、`default`、`mybatis-plus2`、`mybatis-plus3` 等。

### 重置默认模板

如需重置模板到默认设置，右键点击 MybatisX 目录，选择 `Restore Default Extensions`。

![代码生成模板配置示例](/images/content/mybatisx-template-setting.jpg)

### 自定义模板内容

MybatisX 允许您根据项目需求自定义模板内容，包括实体类、表名、字段信息等。

#### 实体类信息

- `tableClass.fullClassName`: 类的全限定名。
- `tableClass.shortClassName`: 类的简称。
- `tableClass.tableName`: 表名。
- `tableClass.pkFields`: 表的主键字段。
- `tableClass.allFields`: 表的所有字段。
- `tableClass.baseFields`: 排除主键和 blob 的所有字段。
- `tableClass.baseBlobFields`: 排除主键的所有字段。
- `tableClass.remark`: 表注释。

#### 字段信息

- `field.fieldName`: 字段名称。
- `field.columnName`: 列名称。
- `field.jdbcType`: JDBC 类型。
- `field.columnLength`: 列长度。
- `field.columnScale`: 列精度。
- `field.columnIsArray`: 字段类型是否为数组。
- `field.shortTypeName`: Java 类型短名称。
- `field.fullTypeName`: Java 类型全限定名。
- `field.remark`: 字段注释。
- `field.autoIncrement`: 是否自增。
- `field.nullable`: 是否允许为空。

#### 配置信息

- `baseInfo.shortClassName`: 配置名称。
- `baseInfo.tableName`: 配置文件名称。
- `baseInfo.pkFields`: 配置名称。
- `baseInfo.allFields`: 后缀。
- `baseInfo.baseFields`: 包名。
- `baseInfo.baseBlobFields`: 模板内容。
- `baseInfo.remark`: 相对模块的资源文件路径。

通过 MybatisX 插件，您可以大幅提升 MyBatis 与 MyBatis-Plus 框架的开发效率，同时享受便捷的代码生成和模板自定义功能。
