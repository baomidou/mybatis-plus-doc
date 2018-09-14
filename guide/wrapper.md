---
sidebarDepth: 3
---

# 条件构造器
1. 以下出现的第一个入参`boolean condition`表示该条件**是否**加入最后生成的sql中
2. 以下方法均有至少省略入参`boolean condition`的同名方法(`condition`默认为`true`)
3. 以下方法出现在入参出现的`R`为泛型,在普通wrapper中是`String`,在LambdaWrapper中是**函数**(例:`Entity::getId`,`Entity`为实体类,`getId`为字段`id`的**get方法**)
4. 以下方法入参中的`R column`均表示数据库字段,当`R`为`String`时则为数据库字段名(**字段名是数据库关键字的自己用转义符包裹!**)!而不是实体类数据字段名!!!
4. 以下举例均为使用普通wrapper,并调用的同方法名最少入参的方法,入参为`map`和`list`的均以`json`形式表现!
5. 有任何疑问就点开源码看!看不懂**函数**的[点击我](https://www.jianshu.com/p/613a6118e2e0)学习新知识!
## AbstractWrapper: QueryWrapper(LambdaQueryWrapper) 和 UpdateWrapper(LambdaUpdateWrapper) 的父类

### allEq :全部 = (或 is null)
`allEq(boolean condition, Map<R, V> params, boolean null2IsNull)`
> column1 = #{value} and column2 = #{value} ...
* params : map,key为数据库字段名,value为字段值, !!!注意!!! 如果此参为空,则不加入sql
* null2IsNull : 为true则在map的value为null时调用`isNull`方法,为false时则忽略value为null的(默认为`true`)
* 例: `allEq({id:1,name:"老王",age:null})`->`id = 1 and name = '老王' and age is null`

`allEq(boolean condition, BiPredicate<R, V> filter, Map<R, V> params, boolean null2IsNull)`
> column1 = #{value} and column2 = #{value} ...
* filter : 过滤函数,是否允许字段传入比对条件中
* params : 如上
* null2IsNull : 如上
* 例: `allEq((k,v) -> k.indexOf("a") > 0,{id:1,name:"老王",age:null})`->`name = '老王' and age is null`

### eq : 等于 = 
`eq(boolean condition, R column, Object val)`
> column = #{val}
* 例: `eq("name", "老王")`->`name = '老王'`

### ne : 不等于 <>
`ne(boolean condition, R column, Object val)`
> column <> #{val}
* 例: `ne("name", "老王")`->`name <> '老王'`

### gt : 大于 >
`gt(boolean condition, R column, Object val)`
> column > #{val}
* 例: `gt("age", 18)`->`age > 18`

### ge : 大于等于 >=
`ge(boolean condition, R column, Object val)`
> column >= #{val}
* 例: `ge("age", 18)`->`age >= 18`

### lt : 小于 <
`lt(boolean condition, R column, Object val)`
> column < #{val}
* 例: `lt("age", 18)`->`age < 18`

### le : 小于等于 <=
`le(boolean condition, R column, Object val)`
> column <= #{val}
* 例: `le("age", 18)`->`age <= 18`

### between : BETWEEN 值1 AND 值2
`between(boolean condition, R column, Object val1, Object val2)`
> column between #{val1} and #{val2} 
* 例: `between("age", 18, 30)`->`age between 18 and 30`

### notBetween : NOT BETWEEN 值1 AND 值2
`notBetween(boolean condition, R column, Object val1, Object val2)`
> column not between #{val1} and #{val2} 
* 例: `notBetween("age", 18, 30)`->`age not between 18 and 30`

### like : LIKE '%值%'
`like(boolean condition, R column, Object val)`
> column like #{val}
* 例: `like("name", "王")`->`name like '%王%'`

### notLike : NOT LIKE '%值%'
`notLike(boolean condition, R column, Object val)`
> column not like #{val}
* 例: `notLike("name", "王")`->`name not like '%王%'`

### likeLeft
`likeLeft(boolean condition, R column, Object val)`
> column like #{val}
* 例: `likeLeft("name", "王")`->`name like '%王'`

### likeRight
`likeRight(boolean condition, R column, Object val)`
> column like #{val}
* 例: `likeRight("name", "王")`->`name like '王%'`

##下面这些欢迎有志之士参照如上例子来帮忙pr补全(源码里有注释可以cv的那种)

### and

### apply

### exists

### groupBy

### having

### in

### inSql

### isNotNull

### isNull

### last

### nested

### not

### notExists

### notIn

### notInSql

### or

### orderBy

## QueryWrapper

### set

### setSql

## UpdateWrapper

### select

### excludeColumns