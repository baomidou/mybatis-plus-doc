# 注解

> 介绍 `MybatisPlus` 注解包相关类详解

注解类包：

👉 [mybatis-plus-annotation](https://gitee.com/baomidou/mybatis-plus/tree/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation)

## [@TableName](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableName.java)
- 描述：表名注解

| 属性 | 类型 | 必须指定 | 默认值 | 意义 | 解释 |
| :-: | :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 表名 | 有值设置则按设置的值为准 |
| resultMap | String | 否 | "" | xml 中 resultMap 的 id | 设置此值则按指定的 resultMap 封装数据 |


## [@TableId](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableId.java)
- 描述：主键注解

| 属性 | 类型 | 必须指定 | 默认值 | 意义 | 解释 |
| :-: | :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 字段名 | 有值设置则按设置的值为准 |
| type | Enum | 否 | IdType.NONE | 主键类型 | 主键是为何种类型 |
  
#### [IdType](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/IdType.java)

| 值 | 描述 |
| :-: | :-: |
| AUTO | 数据库自增 |
| INPUT | 自行输入 |
| ID_WORKER | 分布式全局唯一ID 长整型类型 |
| UUID | 32位UUID字符串 |
| NONE | 无状态 |
| ID_WORKER_STR | 分布式全局唯一ID 字符串类型 |


## [@TableField](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableField.java)
- 描述：字段注解(非主键)

| 属性 | 类型 | 必须指定 | 默认值 | 意义 | 解释 |
| :-: | :-: | :-: | :-: | :-: | :-: |
| value | String | 否 | "" | 字段名 | 有值设置则按设置的值为准 |
| el | String | 否 | "" | 映射为原生 `#{ ... }` 逻辑 | 相当于写在 xml 里的 `#{ ... }` 部分 |
| exist | boolean | 否 | true | 是否为数据库表字段 | 标识该字段是数据库表字段 |
| condition | String | 否 | "" | 字段 `where` 实体查询比较条件 | 有值设置则按设置的值为准,没有则为默认全局的 `%s=#{%s}`,[参考](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/SqlCondition.java) |
| update | String | 否 | "" | 字段 `update set` 部分注入 | 该属性优先级高于 `el` 属性 |
| strategy | Enum | 否 | FieldStrategy.DEFAULT | 字段验证策略 | 构建的所有能根据 entity 产出 sql 的字段验证策略,类比于 xml 里的 `if` 标签 |
| fill | Enum | 否 | FieldFill.DEFAULT | 字段自动填充策略 | 启动自动填充功能所需要的注解 |
| select | boolean | 否 | true | 是否进行 select 查询 | 大字段可设置为 false 不自动加入 select 查询字段 |

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

