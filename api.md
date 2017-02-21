# 参数说明

## MybatisSqlSessionFactoryBean

MP 创建 SqlSession 示例工厂类（与 _Mybatis-Spring_ 的工厂 Bean 相类似，只是加入了 MP 特色功能配置），用法参考原生 Mybatis-Spring 的使用方法。

!> 本处只针对 MP 特有参数进行讲解，其余请参考原生 Mybatis

### globalConfig

- 类型：GlobalConfiguration
- 描述：MP 全局策略配置

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    ......

    <!-- MP 全局配置注入 -->
    <property name="globalConfig" ref="globalConfig" />
</bean>

<!-- 定义 MP 全局策略 -->
<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
    ......
</bean>
```

```java
// TODO
```

## GlobalConfiguration

MP 全局配置类，用于配置 MP 的各项策略（如：主键策略、数据库方言等），需要注入到 `MybatisSqlSessionFactoryBean` 中。

### dbType

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

### idType

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

### dbColumnUnderline

- 描述：表名和字段名是否使用下划线命名
- 类型：`boolean`
- 默认值：`false`
