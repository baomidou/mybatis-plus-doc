# Annotation

> It's about the annotations in `MybatisPlus` (For more details, pls refer to the source code)

Packages：

👉 [mybatis-plus-annotation](https://gitee.com/baomidou/mybatis-plus/tree/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation)

## [@TableName](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableName.java)
- Description：annotation for DB table name

| Properties | Type | Required | Default val | Description |
| :-: | :-: | :-: | :-: | --- |
| value | String | N | "" | DB table name |
| resultMap | String | N | "" | resultMap id in *mapper.xml |
| schema | String | N | "" | schema(@since 3.1.1) |
| keepGlobalPrefix | boolean | N | false | true: keep using the tablePrefix in Global Configuration(if tablePrefix configurated in Global, will set the Global value here automatically)(@since 3.1.1) |


## [@TableId](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableId.java)
- Description：annotation for Primary Key

| Properties | Type | Required | Default val | Description |
| :-: | :-: | :-: | :-: | :-: |
| value | String | N | "" | column name of the PK, if java entity propertyName is "id", will be recognized as PK |
| type | Enum | N | IdType.NONE | PK type(e.g. AUTO, UUID, ID_WORKER, INPUT) |
  
#### [IdType](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/IdType.java)

| Val | Descp |
| :-: | :-: |
| AUTO | autoincrement by DB |
| INPUT | user specify manually |
| ID_WORKER | distributed union ID, Long type |
| UUID | UUID String with length of 32 |
| NONE | nothing |
| ID_WORKER_STR | String value of ID_WORKER |


## [@TableField](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableField.java)
- Description：annotation for column(non-PK)

| Properties | Type | Required | Default val | Description |
| :-: | :-: | :-: | :-: | :-: |
| value | String | N | "" | column name |
| el | String | N | "" | Mapped to  `#{ ... }` for native, equivalently write `#{ ... }` in *mapper.xml |
| exist | boolean | N | true | false: NOT a column, just temporary property |
| condition | String | N | "" | config the expression in where condition, by default it's `%s=#{%s}`, [reference](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/SqlCondition.java) |
| update | String | N | "" | e.g. value="version", update="%s+1", when do update, 'version=version+1' will be appended to  `update xx_table set xxx=xxx` (this property has higher priority than `el` ) |
| insertStrategy | Enum | N | DEFAULT | specify the strategy of this column when do insert, e.g.  NOT_NULL: `insert into table_a(<if test="columnProperty != null">column</if>) values (<if test="columnProperty != null">#{columnProperty}</if>)` (since v_3.1.2)  |
| updateStrategy | Enum | N | DEFAULT | specify the strategy of this column when do update, e.g.  IGNORED: `update table_a set column=#{columnProperty}` (since v_3.1.2)  |
| whereStrategy | Enum | N | DEFAULT | specify the strategy of this column when do query, e.g.  NOT_EMPTY: `where <if test="columnProperty != null and columnProperty!=''">column=#{columnProperty}</if>` (since v_3.1.2)  |
| fill | Enum | N | DEFAULT | auto fill strategy: INSERT, UPDATE, INSERT_UPDATE |
| select | boolean | N | true | false: this column will not appear in select expression |
| keepGlobalFormat | boolean | N | false | whether keep the Global column name format(e.g. UnderscoreToCamelCase) (@since 3.1.1) |

#### [FieldStrategy](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/FieldStrategy.java)

| Val | Descp |
| :-: | :-: |
| IGNORED | ignored |
| NOT_NULL | &lt;if test="columnProperty != null"&gt;column=#{columnProperty}&lt;/if&gt; |
| NOT_EMPTY | &lt;if test="columnProperty != null and columnProperty!=''"&gt;(only support String column, for other types, will processed as NOT_NULL) |
| DEFAULT | keep the Global config |

#### [FieldFill](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/FieldFill.java)

| Val | Descp |
| :-: | :-: |
| DEFAULT | bypass |
| INSERT | fill the column when do insert(should specify the filled value in MetaObjectHandler) |
| UPDATE | fill the column when do update |
| INSERT_UPDATE | fill the column when do both insert/update |

## [@Version](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/Version.java)
- Description：annotation for Optimistic Lock, drop `@Verison` on the version property


## [@EnumValue](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/EnumValue.java)
- Description：annotation for enum property, to specify the real column value, and map to enum property 


## [@TableLogic](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/TableLogic.java)

- Description：annotation to specify the Logic delete column

| Properties | Type | Required | Defalut val | Description |
| :-: | :-: | :-: | :-: | :-: |
| value | String | N | "" | value for non-deleted records |
| delval | String | N | "" | value for deleted records |


## [@SqlParser](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/SqlParser.java)

- Description：annotation for tenant (annotation for mapper is supportted since 3.1.1)

| Properties | Type | Required | Default Val | Description |
| :-: | :-: | :-: | :-: | :-: |
| filter | boolean | N | false | true: bypass ISqlParser.doFilter(), otherwise sql will be parsed in ISqlParser chain and append addition conditions such as tenant_id, etc. |


## [@KeySequence](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/KeySequence.java)

- Description：use DB sequence as PK, such as `oracle`.sequence

| Properties | Type | Required | Defalut val | Description |
| :-: | :-: | :-: | :-: | :-: |
| value | String | Y | "" | sequence name |
| clazz | Class | N | Long.class | return value type, if String.class, will return Number.toString: "1" |