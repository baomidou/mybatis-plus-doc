title: 安装及依赖说明
---
# 依赖说明

> [Mybatis-Plus](http://mvnrepository.com/artifact/com.baomidou/mybatis-plus) 仅仅依赖 [Mybatis](http://mvnrepository.com/artifact/org.mybatis/mybatis) 和 [Mybatis-Spring](http://mvnrepository.com/artifact/org.mybatis/mybatis-spring)

引入`Mybatis-Plus`时，不用担心依赖，`Mybatis-Plus`替您维护Jar包依赖关系，如果缺少依赖Jar包，将会自动拉取相应缺失的Jar包。

所以，Maven集成仅导入以下坐标即可！！

# Maven坐标 [![GitHub release](https://img.shields.io/github/release/baomidou/mybatis-plus.svg?maxAge=2592000)](https://github.com/baomidou/mybatis-plus)

> 查询最高版本或历史版本方式：
> - 访问：[Maven中央库-阿里源](http://maven.aliyun.com/nexus/#nexus-search;quick~mybatis-plus)
> - 访问：[Maven中央库-正统源](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.baomidou%22%20AND%20a%3A%22mybatis-plus%22)

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>最新版本</version>
</dependency>
```


# 特别说明

**`Mybatis`及`Mybatis-Spring`依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus会自动帮你维护！**
