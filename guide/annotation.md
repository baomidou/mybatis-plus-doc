# 注解

> 介绍 `MybatisPlus` 注解包相关类详解

注解类包：

👉 [mybatis-plus-annotation](https://gitee.com/baomidou/mybatis-plus/tree/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation)

## @TableName
- 描述：表名注解

| 属性 | 是否必须指定 | 默认值 | 意义 | 解释 |
| :-: | :-: | :-: | :-: | :-: |
| value | 否 | "" | 表名 | 有值设置则按设置的值为准 |
| resultMap | 否 | "" | xml 中 resultMap 的 id | 设置此值则按指定的 resultMap 封装数据 |


## TableId

- 描述：主键注解
- 属性：value、type

#### value

- 描述：主键字段数据库真实值
- 默认：`空` 框架自动赋值 `非空` 按照设置值处理

#### type

- 描述：定义主键策略
- 类型：`Enum`
- 默认值：类中 `IdType.NONE` 框架启动会赋值为 `IdType.ID_WORKER`
- 可选值：AUTO、INPUT、ID_WORKER、UUID、ID_WORKER_STR

Java                      | XML | 描述
------------------------- | --- | ---
IdType.AUTO               |  0  | 数据库自增
IdType.INPUT              |  1  | 自行输入
IdType.ID_WORKER          |  2  | 分布式全局唯一ID 长整型类型
IdType.UUID               |  3  | 32 位UUID字符串
IdType.NONE               |  4  | 无状态
IdType.ID_WORKER_STR      |  5  | 分布式全局唯一ID 字符串类型

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


## TableField

- 描述：非主键字段注解
- 属性：value、el、exist、condition、update、strategy、fill、select

#### value

- 描述：非主键字段数据库真实值
- 默认：`空` 框架自动赋值 `非空` 按照设置值处理

### el

- 描述：映射为原生 `#{ ... }` 逻辑
- 默认：`空` 不处理
```txt
当该Field为类对象时, 可使用#{对象.属性}来映射到数据表.
支持：@TableField(el = "role, jdbcType=BIGINT)
支持：@TableField(el = "role, typeHandler=com.baomidou.springcloud.typehandler.PhoneTypeHandler")
```

#### exist

- 描述：是否为数据库表字段
- 默认：`true` 存在 `false` 不存在

#### condition

- 描述：字段 `where` 实体查询比较条件
- 默认：`=` 等值

::: warning 注意！
- 该条件影响所有自动方法的 `where` 条件部分
- 通常用来处理 `like` 查询，更多查看注解包 `SqlCondition` 常量类
:::

#### update

- 描述：字段 `update set` 部分注入, 该注解优于 `el` 注解使用
- 默认：`=` 等值
```txt
例如：@TableField(.. , update="%s+1") 其中 %s 会填充为字段
输出 SQL 为：update 表 set 字段=字段+1 where ...
例如：@TableField(.. , update="now()") 使用数据库时间
输出 SQL 为：update 表 set 字段=now() where ...
```

#### strategy

- 描述：字段验证策略
- 默认：追随全局配置
- 可选值：IGNORED、NOT_NULL、NOT_EMPTY、DEFAULT

Java                      | 描述
------------------------- | ---
FieldStrategy.IGNORED     |  忽略判断
FieldStrategy.NOT_NULL    |  非NULL判断
FieldStrategy.NOT_EMPTY   |  非空判断
FieldStrategy.DEFAULT     |  追随全局配置

#### select

- 描述：是否进行 `select` 查询
- 默认：`true` 大字段可设置为 `false` 不加入 `select` 查询范围


## Version

- 描述：乐观锁注解、标记 `@Verison` 在字段上
- 属性：无


## EnumValue

- 描述：通枚举类注解
- 属性：无


## TableLogic

- 描述：表字段逻辑处理注解（逻辑删除）
- 属性：value、delval

#### value

- 描述：逻辑未删除值
- 默认：该值可无、会自动获取全局配置

#### delval

- 描述：逻辑删除值
- 默认：该值可无、会自动获取全局配置


## SqlParser

- 描述：租户注解 `目前只支持注解在 mapper 的方法上`
- 属性：filter

#### filter

- 描述：过滤 SQL 解析
- 默认：`false` 不处理 `true` 过滤


## KeySequence

- 描述：序列主键策略 `oracle`
- 属性：value、resultMap

#### value

- 描述：序列名
- 默认：`空` 可指定为数据库对应的序列

#### clazz

- 描述：ID 类型
- 默认：`Long.class`

