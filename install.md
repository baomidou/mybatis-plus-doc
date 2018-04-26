# 安装

## 依赖配置

?> 查询最高版本或历史版本方式：[Maven中央库](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.baomidou%22%20AND%20a%3A%22mybatis-plus%22) | [Maven阿里库](http://maven.aliyun.com/nexus/#nexus-search;quick~mybatis-plus)
```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>仓库最高版本号</version>
</dependency>

<!--快照版本使用,正式版本无需添加此仓库-->
<repository>
    <id>snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
</repository>

```	
?>
!> 特别说明：**`Mybatis`及`Mybatis-Spring`依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus会自动帮你维护！**

## 如何集成

Mybatis-Plus 的集成非常简单，对于 Spring，我们仅仅需要把 Mybatis 自带的`MybatisSqlSessionFactoryBean`替换为 MP 自带的即可。

!> MP 大部分配置都和传统 Mybatis 一致，少量配置为 MP 特色功能配置，**此处仅对 MP 的特色功能进行讲解，其余请参考 _Mybatis-Spring_ 配置说明**。

示例工程：

👉 [mybatisplus-spring-mvc](https://git.oschina.net/baomidou/mybatisplus-spring-mvc)

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)

```
# PostgreSql 自定义 SQL 注入器
sql-injector: com.baomidou.mybatisplus.mapper.LogicSqlInjector
```


示例代码：

> XML 配置

?> 详细配置可参考参数说明中的 [MybatisSqlSessionFactoryBean](/api?id=mybatissqlsessionfactorybean) 和 [GlobalConfiguration](/api?id=globalconfiguration)

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <!-- 配置实体扫描路径，多个package可以用分号; 逗号, 分隔， 支持通配符*-->
    <!-- com.a.b.entity;com.a.c.entity;com.d.*.entity-->
    <property name="typeAliasesPackage" value="com.baomidou.mybatisplus.test.h2.entity"/>
    <property name="configuration" ref="mybatisConfig"/>
    <!-- MP 全局配置注入 -->
    <property name="globalConfig" ref="globalConfig"/>
    <property name="plugins">
        <array>
            <!-- 分页插件配置 -->
            <bean id="paginationInterceptor"
                  class="com.baomidou.mybatisplus.plugins.PaginationInterceptor"/>
            <!-- 乐观锁插件 -->    
            <bean id="optimisticLockerInterceptor"
                  class="com.baomidou.mybatisplus.plugins.OptimisticLockerInterceptor">
            </bean>
            <!-- 性能拦截器，兼打印sql，不建议生产环境配置-->
            <bean id="performanceInterceptor"
                  class="com.baomidou.mybatisplus.plugins.PerformanceInterceptor"/>
        </array>
    </property>
</bean>

<bean id="mybatisConfig" class="com.baomidou.mybatisplus.MybatisConfiguration">
    <property name="mapUnderscoreToCamelCase" value="true"/>
    <!-- 部分数据库不识别默认的NULL类型（比如oracle，需要配置该属性 -->
    <property name="jdbcTypeForNull">
        <util:constant static-field="org.apache.ibatis.type.JdbcType.NULL"/>
    </property>
</bean>

<!-- 定义 MP 全局策略 -->
<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
    <!-- 逻辑删除 定义下面3个参数-->
    <property name="sqlInjector" ref="logicSqlInjector"/>
    <property name="logicDeleteValue" value="-1"/>
    <property name="logicNotDeleteValue" value="1"/>
    <!-- 全局ID类型： 0, "数据库ID自增"， 1, "用户输入ID", 2, "全局唯一ID", 3, "全局唯一ID"-->
    <property name="idType" value="2"/>
    <!-- 2.1-gamma+ 数据库自动识别，无需配置数据库类型
    <property name="dbType" value="mysql" />
    -->
    <!--主键Sequence-->
    <property name="keyGenerator" ref="keyGenerator"/>
    <!-- 公共字段填充处理器 -->
    <property name="metaObjectHandler" ref="myMetaObjectHandler"/>
    <!--数据库关键字转义符，'desc', "desc" 2.1-gamma+不需要制定-->
    <!--<property name="identifierQuote" value="'" />-->
</bean>

<!-- 配置oracle主键Sequence， 其他类型数据库，请配置相应的类型-->
<bean id="keyGenerator" class="com.baomidou.mybatisplus.incrementer.OracleKeyGenerator"/>
 
<!-- 自定义处理器 -->
<bean id="myMetaObjectHandler" class="com.baomidou.test.MyMetaObjectHandler" />
<!-- 逻辑删除Sql注入器-->
<bean id="logicSqlInjector" class="com.baomidou.mybatisplus.mapper.LogicSqlInjector"/>

<!-- 配置mybatis 扫描mapper接口的路径, 相当于注解@MapperScan，@MapperScan("com.baomidou.mybatisplus.test.h2.entity.mapper")-->
<bean id="mapperScannerConfigurer" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.baomidou.mybatisplus.test.h2.entity.mapper"/>
</bean>
```

!> 特别注意 `MybatisSqlSessionFactoryBean` 非原生的类，必须如上配置 ！

> Spring Bean Configuration[示例](https://gitee.com/baomidou/mybatis-plus/tree/dev/mybatis-plus-core/src/test/java/com/baomidou/mybatisplus/test/h2/config)

```java
@Configuration
@MapperScan("com.baomidou.mybatisplus.test.h2.entity.mapper")
public class MybatisConfigMetaObjOptLockConfig {

    @Bean("mybatisSqlSession")
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource, ResourceLoader resourceLoader, GlobalConfiguration globalConfiguration) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        sqlSessionFactory.setTypeAliasesPackage("com.baomidou.mybatisplus.test.h2.entity.persistent");
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
        configuration.setJdbcTypeForNull(JdbcType.NULL);
        sqlSessionFactory.setConfiguration(configuration);
        sqlSessionFactory.setPlugins(new Interceptor[]{
                new PaginationInterceptor(),
                new PerformanceInterceptor(),
                new OptimisticLockerInterceptor()
        });
        sqlSessionFactory.setGlobalConfig(globalConfiguration);
        return sqlSessionFactory.getObject();
    }

    @Bean
    public GlobalConfiguration globalConfiguration() {
        GlobalConfiguration conf = new GlobalConfiguration(new LogicSqlInjector());
        conf.setLogicDeleteValue("-1");
        conf.setLogicNotDeleteValue("1");
        conf.setIdType(2);
        conf.setMetaObjectHandler(new H2MetaObjectHandler());
        return conf;
    }
}
```

## 优秀案例

- Java EE（J2EE）快速开发框架 [SpringWind](https://gitee.com/baomidou/SpringWind)

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

- JeeWeb敏捷开发平台 [jeeweb-mybatis](https://git.oschina.net/dataact/jeeweb-mybatis)

- CMS 平台 [youngcms](https://gitee.com/fumiao/youngcms)

- 前后端分离的基础权限管理后台 [king-admin](https://github.com/oukingtim/king-admin)

- 前后端分离 Vue 快速开发平台 [jeefast](https://gitee.com/theodo/jeefast)

- SpringBoot + Shiro +FreeMarker 制作的通用权限管理 [bing-upms](https://gitee.com/xiaobingby/bing-upms)

- SpringBoot 企业级快速开发脚手架 [slife](https://gitee.com/jamen/slife)

- 微服务 Spring Cloud 架构 [pig](https://gitee.com/log4j/pig)

- 系统后台 [mysiteforme](https://gitee.com/wanglingxiao/mysiteforme)

- 基础权限框架 [watchdog-framework](https://github.com/watchdog-framework/watchdog-framework)

- Java快速开发平台 [iartisan-admin-template](https://gitee.com/iartisan/iartisan-admin-template)

!> 需！加入列表的童鞋可以告诉我们。


