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