# 安装

## 依赖配置

?> 查询最高版本或历史版本方式：[Maven中央库](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.baomidou%22%20AND%20a%3A%22mybatis-plus%22) | [Maven阿里库](http://maven.aliyun.com/nexus/#nexus-search;quick~mybatis-plus)

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>仓库最高版本号</version>
</dependency>
```

!> 特别说明：**`Mybatis`及`Mybatis-Spring`依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus会自动帮你维护！**

## 如何集成

Mybatis-Plus 的集成非常简单，对于 Spring，我们仅仅需要把 Mybatis 自带的`MybatisSqlSessionFactoryBean`替换为 MP 自带的即可。

!> MP 大部分配置都和传统 Mybatis 一致，少量配置为 MP 特色功能配置，**此处仅对 MP 的特色功能进行讲解，其余请参考 _Mybatis-Spring_ 配置说明**。

示例工程：

👉 [mybatisplus-spring-mvc](https://git.oschina.net/baomidou/mybatisplus-spring-mvc)

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)

示例代码：

> XML 配置

?> 详细配置可参考参数说明中的 [MybatisSqlSessionFactoryBean](/api?id=mybatissqlsessionfactorybean) 和 [GlobalConfiguration](/api?id=globalconfiguration)

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <!-- 配置数据源 -->
    <property name="dataSource" ref="dataSource"/>
    <!-- 自动扫描 Xml 文件位置 -->
    <property name="mapperLocations" value="classpath:mybatis/*/*.xml"/>
    <!-- 配置 Mybatis 配置文件（可无） -->
    <property name="configLocation" value="classpath:mybatis/mybatis-config.xml"/>
    <!-- 配置包别名 -->
    <property name="typeAliasesPackage" value="com.baomidou.springmvc.model"/>

    <!-- 以上配置和传统 Mybatis 一致 -->

    <!-- 插件配置 -->
    <property name="plugins">
        <array>
            <!-- 分页插件配置, 参考文档分页插件部分！！ -->
            <!-- 如需要开启其他插件，可配置于此 -->
        </array>
    </property>

    <!-- MP 全局配置注入 -->
    <property name="globalConfig" ref="globalConfig"/>
</bean>

<!-- 定义 MP 全局策略 -->
<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
    <!-- 主键策略配置 -->
    <!-- 可选参数
        AUTO->`0`("数据库ID自增")
        INPUT->`1`(用户输入ID")
        ID_WORKER->`2`("全局唯一ID")
        UUID->`3`("全局唯一ID")
    -->
    <property name="idType" value="2"/>

    <!-- 数据库类型配置 -->
    <!-- 可选参数（默认mysql）
        MYSQL->`mysql`
        ORACLE->`oracle`
        DB2->`db2`
        H2->`h2`
        HSQL->`hsql`
        SQLITE->`sqlite`
        POSTGRE->`postgresql`
        SQLSERVER2005->`sqlserver2005`
        SQLSERVER->`sqlserver`
    -->
    <property name="dbType" value="oracle"/>

    <!-- 全局表为下划线命名设置 true -->
    <property name="dbColumnUnderline" value="true"/>
</bean>
```

!> 特别注意 `MybatisSqlSessionFactoryBean` 非原生的类，必须如上配置 ！

> Java Config

```java
// TODO
```

## 优秀案例

- Java EE（J2EE）快速开发框架 [SpringWind](https://git.oschina.net/juapk/SpringWind)

- SSM 后台框架 [KangarooAdmin](https://git.oschina.net/zhougaojun/KangarooAdmin)

- JAVA分布式快速开发基础平台 [iBase4J](https://git.oschina.net/iBase4J/iBase4J) 

- 又一个 SSM 后台管理框架 [framework](https://git.oschina.net/sunhan521/framework)

- 猫宁Morning公益商城 [Morning](https://git.oschina.net/Morning_/Morning)

- 基础权限开发框架 [BMS](https://git.oschina.net/eric.xu/BMS)  Shiro 案例

- 简单实用的权限系统 [spring-shiro-training](https://git.oschina.net/wangzhixuan/spring-shiro-training)  Shiro 案例

- 系统管理中心系统 [center](https://git.oschina.net/willenfoo/center)

- Springboot-Shiro 脚手架 [skeleton](https://github.com/fengchangsheng/skeleton)

- Springboot-Shiro 美女图片爬虫 [springboot_mybatisplus](https://git.oschina.net/z77z/springboot_mybatisplus)

- guns 后台管理系统 [guns](http://git.oschina.net/naan1993/guns)

- maple 企业信息化的开发基础平台 [maple](https://git.oschina.net/blind/maple)

!> 需！加入列表的童鞋可以告诉我们。
