# 安装

全新的 `MyBatis-Plus` 3.0 版本基于 JDK8，提供了 `lambda` 形式的调用，所以安装集成 MP3.0 要求如下：

- JDK 8+
- Maven or Gradle

::: tip
JDK7 以及下的请参考 MP2.0 版本，地址：[2.0 文档](https://baomidou.gitee.io/mybatis-plus-doc/#/)
:::

## Release

### Spring Boot

Maven：

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.0.6</version>
</dependency>
```

Gradle：

```groovy
compile group: 'com.baomidou', name: 'mybatis-plus-boot-starter', version: '3.0.6'
```

### Spring MVC

Maven:

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.0.6</version>
</dependency>
```

Gradle：

```groovy
compile group: 'com.baomidou', name: 'mybatis-plus', version: '3.0.6'
```

---

::: warning
引入 `MyBatis-Plus` 之后请不要再次引入 `MyBatis` 以及 `MyBatis-Spring`，以避免因版本差异导致的问题。
:::

## Snapshot

快照 SNAPSHOT 版本需要添加仓库，且版本号为快照版本。

Maven：

```xml
<repository>
    <id>snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
</repository>
```

Gradle：

```groovy
repositories {
    maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
}
```
