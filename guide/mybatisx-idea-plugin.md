# MybatisX 快速开发插件

MybatisX 是一款基于 IDEA 的快速开发插件，为效率而生。

安装方法：打开 IDEA，进入 File -> Settings -> Plugins -> Browse Repositories，输入 `mybatisx` 搜索并安装。

::: tip
如果各位觉得好用，请为该插件打一个[五分好评](https://plugins.jetbrains.com/plugin/10119-mybatisx) 哦！

源码地址：[MybatisX 源码](https://gitee.com/baomidou/MybatisX)
:::

## 功能
**XML跳转**
 ![跳转](/img/mybatisx-jump.gif)
 
 
**生成代码**
 ![生成代码](/img/mybatisx-generate.gif)
 
**重置模板**
 ![生成代码](/img/mybatisx-reset-template.gif)
  
**JPA提示**

生成新增  
  ![生成新增](/img/mybatisx-tip-insert.gif)
  
生成查询  
  ![生成查询](/img/mybatisx-tip-select.gif)
  
生成修改  
  ![生成修改](/img/mybatisx-tip-update.gif)
  
生成删除  
  ![生成删除](/img/mybatisx-tip-delete.gif)



## 常见问答

**为什么JPA不能使用?**  
JPA提示的方式需要根据Mapper找到实体类, 找到实体类有以下五种方式
1. 继承mybatis-plus的BaseMapper
2. Mapper.xml 文件有 resultMap 标签
3. 在Mapper类上增加注释指定实体类, 例如: `@Entity com.xx.xx.UserModel`

**为什么生成的表名和期望的表名不一致**  
JPA提示生成代码, 按照以下规则找到表名
1. 实体类有JPA注解, 例如: `@Table(name="t_user")`
2. 实体类有mybais-plus注解, 例如: `@TableName("t_user")`
3. 实体类有注释: `@TableName com.xx.xx.UserModel`
4. 如果不存在以上规则, 将驼峰转下划线. 例如 UserMode 的表名为: user_model


# 生成代码的模板配置
按照指定目录找到插件模板配置目录
Scratches and Consoles -> Extensions -> MybatisX  
这里会提供默认模板: 例如在1.4.13 提供了模板: `default-all`,`default`,`mybatis-plus2`,`mybatis-plus3`  
如果想重置默认模板, 可以右键点击MybatisX目录,选择 `Restore Default Extensions` 选项

 ![代码生成模板配置](/img/mybatisx-template-setting.jpg)
 
自定义模板内容
```
类信息
tableClass.fullClassName 类的全称(包括包名)
tableClass.shortClassName 类的简称
tableClass.tableName 表名
tableClass.pkFields  表的所有主键字段
tableClass.allFields 表的所有字段
tableClass.baseFields 排除主键和blob的所有字段
tableClass.baseBlobFields 排除主键的所有字段
tableClass.remark 表注释

字段信息
field.fieldName 字段名称
field.columnName 列名称
field.jdbcType  jdbc类型
field.remark 字段注释

配置信息
baseInfo.configName 配置名称
baseInfo.configFile 配置文件名称
baseInfo.fileName 配置名称
baseInfo.suffix 后缀
baseInfo.packageName 包名
baseInfo.templateText 模板内容
baseInfo.basePath 相对模块的资源文件路径

```