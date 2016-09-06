# 代码生成

在代码生成之前，首先进行配置，MP提供了大量的自定义设置，生成的代码完全能够满足各类型的需求，如果你发现配置不能满足你的需求，欢迎提交issue和pull-request，有兴趣的也可以查看[源码](https://github.com/baomidou/mybatis-plus/tree/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/generator)进行了解。

# 参数说明

参数相关的配置，详见[ConfigGenerator](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus/src/main/java/com/baomidou/mybatisplus/generator/ConfigGenerator.java)类

!FILENAME saveDir

```
类型：String
描述：生成代码存放目录
备注：无
```

!FILENAME entityPackage

```
类型：String
描述：Entity类路径
备注：无
```

!FILENAME mapperPackage

```
类型：String
描述：Mapper类路径
备注：无
```

!FILENAME xmlPackage

```
类型：String
描述：Mapper对应的XML文件存放路径
备注：默认为Mapper目录下的xml文件夹
```

!FILENAME servicePackage

```
类型：String
描述：Service类路径
备注：无
```

!FILENAME serviceImplPackage

```
类型：String
描述：ServiceImpl类路径
备注：默认为Service目录下的impl文件夹
```

!FILENAME superService

```
类型：String
描述：Service 父类包路径
备注：通过该项，你可以自定义Service层的父类，实现自定义通用方法。若无需求，不用配置。
```

!FILENAME superServiceImpl

```
类型：String
描述：ServiceImpl 父类包路径
备注：同上
```

!FILENAME mapperName

```
类型：String
描述：自定义Mapper名称
备注：采用"%s"做占位符，默认为"%sMapper"，生成后为FooMapper.java
```

!FILENAME mapperXMLName

```
类型：String
描述：自定义XML名称
备注：采用"%s"做占位符，默认为"%sMapper"，生成后为FooMapper.xml
```

!FILENAME serviceName

```
类型：String
描述：自定义 Service 名称
备注：采用"%s"做占位符，默认为"I%sService"，生成后为IFooService.java
```

!FILENAME serviceImplName

```
类型：String
描述：自定义 ServiceImpl 名称
备注：采用"%s"做占位符，默认为"%sServiceImpl"，生成后为FooServiceImpl.java
```

!FILENAME tableNames

```
类型：String[]
描述：要生成代码的表名称
备注：若为空就直接指定所有表，格式为逗号分割
```

!FILENAME fileOverride

```
类型：boolean
描述：是否覆盖当前已有文件
备注：true为覆盖，false为不覆盖
```

!FILENAME dbPrefix

```
类型：boolean
描述：设置数据库前缀
备注：例如`mp_user`生成实体类，false 为 MpUser.java , true 为 User.java
```

!FILENAME dbColumnUnderline

```
类型：boolean
描述：设置数据库是否为下划线
备注：
```

!FILENAME dbDriverName

```
类型：String
描述：数据库驱动名
备注：如com.mysql.jdbc.Driver
```

!FILENAME dbUser

```
类型：String
描述：数据库username
备注：无
```

!FILENAME dbPassword

```
类型：String
描述：数据库密码
备注：无
```

!FILENAME dbUrl

```
类型：String
描述：数据库URL
备注：无
```

!FILENAME idType

```
类型：boolean
描述：ID主键策略
备注：表主键 ID 生成类型, 自增该设置无效。详见主键策略选择。
```

# 主键策略选择

MP支持以下4中主键策略，可根据需求自行选用：

值                | 描述
---------------- | ---------------------
IdType.AUTO      | 数据库ID自增
IdType.INPUT     | 用户输入ID
IdType.ID_WORKER | 全局唯一ID，内容为空自动填充（默认配置）
IdType.UUID      | 全局唯一ID，内容为空自动填充

# 表及字段命名策略选择

# 如何生成代码
