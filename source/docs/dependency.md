title: 安装及依赖说明
---
# 依赖说明

> [Mybatis-Plus](http://mvnrepository.com/artifact/com.baomidou/mybatis-plus) 仅仅依赖 [Mybatis](http://mvnrepository.com/artifact/org.mybatis/mybatis) 和 [Mybatis-Spring](http://mvnrepository.com/artifact/org.mybatis/mybatis-spring)

引入`Mybatis-Plus`时，不用担心依赖，`Mybatis-Plus`替您维护Jar包依赖关系，如果缺少依赖Jar包，将会自动拉取相应缺失的Jar包。

所以，Maven集成仅导入以下坐标即可！！

# Maven坐标

Maven地址：http://mvnrepository.com/artifact/com.baomidou/mybatis-plus

> 以上地址不是Maven中心库，而是一个Maven信息收集的网站，便于展示。版本更新后，它有一定的延迟，如果各位不能第一时间知道最高的版本，可以去[Maven官方库](http://search.maven.org/)搜索 `g:"com.baomidou" AND a:"mybatis-plus"` 查看最新版本。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>Maven 官方最新版本为准</version>
</dependency>
```


# 特别说明

**`Mybatis`及`Mybatis-Spring`依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus会自动帮你维护！**
