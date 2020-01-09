# 注解

> 介绍 `MybatisPlus` 注解包相关类详解(更多详细描述可点击查看源码注释)

注解类包：

👉 [mybatis-plus-annotation](https://gitee.com/baomidou/mybatis-plus/tree/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation)

## [@TableName](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableName.java)
- 描述：表名注解

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| value | String | 否 | "" | 表名 |
| schema | String | 否 | "" | schema(@since 3.1.1) |
| keepGlobalPrefix | boolean | 否 | false | 是否保持使用全局的 tablePrefix 的值(如果设置了全局 tablePrefix 且自行设置了 value 的值)(@since 3.1.1) |
| resultMap | String | 否 | "" | xml 中 resultMap 的 id |
| autoResultMap | boolean | 否 | false | 是否自动构建 resultMap 并使用(如果设置 resultMap 则不会进行 resultMap 的自动构建并注入)(@since 3.1.2) |

::: warning 关于`autoResultMap`的说明:
从mp的原理上讲,因为底层是mybatis,所以一些mybatis的常识你要知道,mp只是帮你注入了常用crud
注入之前可以说是动态的(根据你entity的字段以及注解变化而变化),但是注入之后是静态的(等于你写在xml的东西)
而对于直接指定`typeHandler`,mybatis只支持你写在2个地方:
1. 定义在resultMap里,只作用于select查询的返回结果封装
2. 定义在`insert`和`update`sql的`#{property}`里的`property`后面(例:`#{property,typehandler=xxx.xxx.xxx}`),只作用于`设置值`
而除了这两种直接指定`typeHandler`,mybatis有一个全局的扫描你自己的`typeHandler`包的配置,这是根据你的`property`的类型去找`typeHandler`并使用
这个属性的作用就是:如果你的`property`类型... todo
:::


## [@TableId](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableId.java)
- 描述：主键注解

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 主键字段名 |
| type | Enum | 否 | IdType.NONE | 主键类型 |
  
#### [IdType](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/IdType.java)

| 值 | 描述 |
| :-: | :-: |
| AUTO | 数据库ID自增 |
| NONE | 无状态,该类型为未设置主键类型(注解里等于跟随全局,全局里约等于 INPUT) |
| INPUT | insert前自行set主键值 |
| ASSIGN_ID | 分配ID(主键类型为Number(Long和Integer)或String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
| ASSIGN_UUID | 分配UUID,主键类型为String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认default方法)
| ~~ID_WORKER~~ | 分布式全局唯一ID 长整型类型(please use `ASSIGN_ID`) |
| ~~UUID~~ | 32位UUID字符串(please use `ASSIGN_UUID`) |
| ~~ID_WORKER_STR~~ | 分布式全局唯一ID 字符串类型(please use `ASSIGN_ID`) |


## [@TableField](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableField.java)
- 描述：字段注解(非主键)

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 字段名 |
| el | String | 否 | "" | 映射为原生 `#{ ... }` 逻辑,相当于写在 xml 里的 `#{ ... }` 部分 |
| exist | boolean | 否 | true | 是否为数据库表字段 |
| condition | String | 否 | "" | 字段 `where` 实体查询比较条件,有值设置则按设置的值为准,没有则为默认全局的 `%s=#{%s}`,[参考](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/SqlCondition.java) |
| update | String | 否 | "" | 字段 `update set` 部分注入, 例如：update="%s+1"：表示更新时会set version=version+1(该属性优先级高于 `el` 属性) |
| ~~strategy~~ | Enum | 否 | FieldStrategy.DEFAULT | 字段验证策略 3.1.2+使用下面3个替代 |
| insertStrategy | Enum | N | DEFAULT | 举例：NOT_NULL: `insert into table_a(<if test="columnProperty != null">column</if>) values (<if test="columnProperty != null">#{columnProperty}</if>)` (since v_3.1.2)  |
| updateStrategy | Enum | N | DEFAULT | 举例：IGNORED: `update table_a set column=#{columnProperty}` (since v_3.1.2)  |
| whereStrategy | Enum | N | DEFAULT | 举例：NOT_EMPTY: `where <if test="columnProperty != null and columnProperty!=''">column=#{columnProperty}</if>` (since v_3.1.2)  |
| fill | Enum | 否 | FieldFill.DEFAULT | 字段自动填充策略 |
| select | boolean | 否 | true | 是否进行 select 查询 |
| keepGlobalFormat | boolean | 否 | false | 是否保持使用全局的 format 进行处理(@since 3.1.1) |

#### [FieldStrategy](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/FieldStrategy.java)

| 值 | 描述 |
| :-: | :-: |
| IGNORED | 忽略判断 |
| NOT_NULL | 非NULL判断 |
| NOT_EMPTY | 非空判断(只对字符串类型字段,其他类型字段依然为非NULL判断) |
| DEFAULT | 追随全局配置 |

#### [FieldFill](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/FieldFill.java)

| 值 | 描述 |
| :-: | :-: |
| DEFAULT | 默认不处理 |
| INSERT | 插入时填充字段 |
| UPDATE | 更新时填充字段 |
| INSERT_UPDATE | 插入和更新时填充字段 |

## [@Version](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/Version.java)
- 描述：乐观锁注解、标记 `@Verison` 在字段上


## [@EnumValue](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/EnumValue.java)
- 描述：通枚举类注解(注解在枚举字段上)


## [@TableLogic](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableLogic.java)

- 描述：表字段逻辑处理注解（逻辑删除）

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 逻辑未删除值 |
| delval | String | 否 | "" | 逻辑删除值 |


## [@SqlParser](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/SqlParser.java)

- 描述：租户注解 ~~目前只支持注解在 mapper 的方法上~~(3.1.1开始支持注解在mapper上)

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| filter | boolean | 否 | false | true: 表示过滤SQL解析，即不会进入ISqlParser解析链，否则会进解析链并追加例如tenant_id等条件 |


## [@KeySequence](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/KeySequence.java)

- 描述：序列主键策略 `oracle`
- 属性：value、resultMap

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 序列名 |
| clazz | Class | 否 | Long.class | id的类型, 可以指定String.class，这样返回的Sequence值是字符串"1" |
