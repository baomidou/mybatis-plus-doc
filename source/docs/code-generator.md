title: 代码生成器
---
在代码生成之前，首先进行配置，MP提供了大量的自定义设置，生成的代码完全能够满足各类型的需求，如果你发现配置不能满足你的需求，欢迎提交issue和pull-request，有兴趣的也可以查看[源码](https://github.com/baomidou/mybatis-plus/tree/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/generator)进行了解。

# 参数说明

参数相关的配置，详见[ConfigGenerator](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/generator/ConfigGenerator.java)类

```java saveDir
类型：String
描述：生成代码存放目录
```

```java entityPackage
类型：String
描述：Entity类路径
```

```java mapperPackage
类型：String
描述：Mapper类路径
```

```java xmlPackage
类型：String
描述：Mapper对应的XML文件存放路径（默认为Mapper目录下的xml文件夹）
```

```java servicePackage
类型：String
描述：Service类路径
```

```java serviceImplPackage
类型：String
描述：ServiceImpl类路径（默认为Service目录下的impl文件夹）
```

```java superService
类型：String
描述：Service 父类包路径（通过该项，你可以自定义Service层的父类，实现自定义通用方法。若无需求，不用配置）
```

```java superServiceImpl
类型：String
描述：ServiceImpl 父类包路径（同上）
```

```java mapperName
类型：String
描述：自定义Mapper名称（采用"%s"做占位符，默认为"%sMapper"，生成后为FooMapper.java）
```

```java mapperXMLName
类型：String
描述：自定义XML名称（采用"%s"做占位符，默认为"%sMapper"，生成后为FooMapper.xml）
```

```java serviceName
类型：String
描述：自定义 Service 名称（采用"%s"做占位符，默认为"I%sService"，生成后为IFooService.java）
```

```java serviceImplName
类型：String
描述：自定义 ServiceImpl 名称（采用"%s"做占位符，默认为"%sServiceImpl"，生成后为FooServiceImpl.java）
```

```java tableNames
类型：String[]
描述：要生成代码的表名称（若为空就直接指定所有表，格式为逗号分割）
```

```java fileOverride
类型：boolean
描述：是否覆盖当前已有文件（true为覆盖，false为不覆盖）
```

```java dbPrefix
类型：boolean
描述：设置是否取消数据库前缀（例如`mp_user`生成实体类，false 为 MpUser.java , true 为 User.java）
```

```java dbColumnUnderline
类型：boolean
描述：设置数据库是否为下划线
```

```java dbDriverName
类型：String
描述：数据库驱动名（如com.mysql.jdbc.Driver）
```

```java dbUser
类型：String
描述：数据库username
```

```java dbPassword
类型：String
描述：数据库密码
```

```java dbUrl
类型：String
描述：数据库URL
```

```java idType
类型：boolean
描述：ID主键策略（表主键 ID 生成类型, 自增该设置无效。详见主键策略选择）
```

# 主键策略选择

MP支持以下4中主键策略，可根据需求自行选用：

值                | 描述
---------------- | ---------------------
IdType.AUTO      | 数据库ID自增
IdType.INPUT     | 用户输入ID
IdType.ID_WORKER | 全局唯一ID，内容为空自动填充（默认配置）
IdType.UUID      | 全局唯一ID，内容为空自动填充

AUTO、INPUT和UUID大家都应该能够明白，这里主要讲一下ID_WORKER。首先得感谢开源项目`Sequence`，感谢作者`李景枫`。

什么是Sequence？简单来说就是一个分布式高效有序ID生产黑科技工具，思路主要是来源于`Twitter-Snowflake算法`。这里不详细讲解Sequence，有兴趣的朋友请[点此去了解Sequence](http://git.oschina.net/yu120/sequence)。

MP在Sequence的基础上进行部分优化，用于产生全局唯一ID，好的东西希望推广给大家，所以我们将ID_WORDER设置为默认配置。

# 表及字段命名策略选择

在MP中，我们建议`数据库表名`采用`下划线命名方式`，而`表字段名`采用`驼峰命名方式`。

这么做的原因是为了避免在对应实体类时产生的性能损耗，这样字段不用做映射就能直接和实体类对应。当然如果项目里不用考虑这点性能损耗，那么你采用下滑线也是没问题的，只需要在生成代码时配置`dbColumnUnderline`属性就可以。

# 如何生成代码

## 方式一、代码生成

```java 生成示例
public class CustomGenerator{
    public static void main(String[] args) {
        ConfigGenerator cg = new ConfigGenerator();

        // 配置 MySQL 连接
        cg.setDbDriverName("com.mysql.jdbc.Driver");
        cg.setDbUser("username");
        cg.setDbPassword("password");
        cg.setDbUrl("jdbc:mysql://127.0.0.1:3306/mybatis-plus?characterEncoding=utf8");

        // 配置包名
        cg.setEntityPackage("com.baomidou.entity");
        cg.setMapperPackage("com.baomidou.mapper");
        cg.setServicePackage("com.baomidou.service");
        cg.setXmlPackage("com.baomidou.mapper.xml");
        cg.setServiceImplPackage("com.baomidou.service.impl");
        
        // 配置表主键策略
        cg.setIdType(IdType.AUTO);
        
        // 配置保存路径
        cg.setSaveDir("/path/to/src");

        // 其他参数请根据上面的参数说明自行配置，当所有配置完善后，运行AutoGenerator.run()方法生成Code
        // 生成代码
        AutoGenerator.run(cg);
    }
}
```

## 方式二、Maven插件生成

待补充（Maven代码生成插件尚未发布到中央库）
