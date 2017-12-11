# 参数说明

## 基础类API

### MybatisSqlSessionFactoryBean

MP 创建 SqlSession 示例工厂类（与 _Mybatis-Spring_ 的工厂 Bean 相类似，只是加入了 MP 特色功能配置），用法参考原生 Mybatis-Spring 的使用方法。

!> 本处只针对 MP 特有参数进行讲解，其余请参考原生 Mybatis

#### globalConfig

- 类型：GlobalConfiguration
- 描述：MP 全局策略配置

#### Spring MVC [配置参考](https://gitee.com/baomidou/mybatis-plus/blob/dev/mybatis-plus-core/src/test/resources/h2/spring-test-h2-mvc.xml)

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

#### Spring Bean Configuration[示例](https://gitee.com/baomidou/mybatis-plus/tree/dev/mybatis-plus-core/src/test/java/com/baomidou/mybatisplus/test/h2/config)
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
        PaginationInterceptor pagination = new PaginationInterceptor();
        sqlSessionFactory.setPlugins(new Interceptor[]{
                pagination,
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

### GlobalConfiguration

MP 全局配置类，用于配置 MP 的各项策略（如：主键策略、数据库方言等），需要注入到 `MybatisSqlSessionFactoryBean` 中。

#### dbType

!> 从2.1-gamma版本，不需要配置dbType，自动识别

- 描述：指定数据库类型（如无您所需的数据库类型，可以向我们提交 `issue` 或者 `自行扩展数据库方言`）
- 类型：`Enum`
- 默认值：`DBType.MYSQL`
- 可选值：MYSQL、ORACLE、DB2、H2、HSQL、SQLITE、POSTGRE、SQLSERVER2005、SQLSERVER

Java                 | XML
-------------------- | -------------
DBType.MYSQL         | mysql
DBType.ORACLE        | oracle
DBType.DB2           | db2
DBType.H2            | h2
DBType.HSQL          | hsql
DBType.SQLITE        | sqlite
DBType.POSTGRE       | postgresql
DBType.SQLSERVER2005 | sqlserver2005
DBType.SQLSERVER     | sqlserver

#### idType

- 描述：定义主键策略
- 类型：`Enum`
- 默认值：`IdType.ID_WORKER`
- 可选值：AUTO（数据库自增）、INPUT(自行输入)、ID_WORKER（分布式全局唯一ID）、UUID（32位UUID字符串）

Java             | XML
---------------- | ---
IdType.AUTO      | 0
IdType.INPUT     | 1
IdType.ID_WORKER | 2
IdType.UUID      | 3

#### dbColumnUnderline

- 描述：表名和字段名是否使用下划线命名
- 类型：`boolean`
- 默认值：`false`

#### keyGenerator

- Sequence生成器：根据数据库类型，可选值：

DB2KeyGenerator
OracleKeyGenerator
PostgreKeyGenerator

#### 逻辑删除注入

```java
    @Bean
    public GlobalConfiguration globalConfiguration() {
        GlobalConfiguration conf = new GlobalConfiguration(new LogicSqlInjector());
        conf.setLogicDeleteValue("-1");
        conf.setLogicNotDeleteValue("1");
        conf.setIdType(2);
        return conf;
    }
```


