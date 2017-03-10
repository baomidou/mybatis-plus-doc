# 通用 CRUD

## 基本介绍(CRUD 增删改查)
TODO


## 注解说明

> 表名注解 `@TableName`

- com.baomidou.mybatisplus.annotations.TableName

值                | 描述
---------------- | ---------------------
value            | 表名（ 默认空 ）
resultMap        | xml 字段映射 resultMap ID


> 主键注解 `@TableId `

- com.baomidou.mybatisplus.annotations.TableId

值                | 描述
---------------- | ---------------------
value            | 字段值（驼峰命名方式，该值可无）
type             | 主键 ID 策略类型（ 默认 INPUT ，全局开启的是 ID_WORKER ）

!> 暂不支持组合主键


> 字段注解 `@TableField `

- com.baomidou.mybatisplus.annotations.TableField

值                | 描述
---------------- | ---------------------
value            | 字段值（驼峰命名方式，该值可无）
el               | 详看注释说明
exist            | 是否为数据库表字段（ 默认 true 存在，false 不存在 ）
validate         | 字段验证 （ 默认 非 null 判断，查看 com.baomidou.mybatisplus.enums.FieldStrategy ）

!> 排除非表字段、查看文档常见问题部分！

