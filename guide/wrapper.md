---
sidebarDepth: 3
---

# 条件构造器
1. 以下出现的第一个入参`boolean condition`表示该条件**是否**加入最后生成的sql中
2. 以下方法在入参中出现的`R`为泛型,在普通wrapper中是`String`,在LambdaWrapper中是**函数**(例:`Entity::getId`,`Entity`为实体类,`getId`为字段`id`的**getMethod**)
3. 以下方法入参中的`R column`均表示数据库字段,当`R`为`String`时则为数据库字段名(**字段名是数据库关键字的自己用转义符包裹!**)!而不是实体类数据字段名!!!
4. 以下举例均为使用普通wrapper,入参为`map`和`list`的均以`json`形式表现!
5. 有任何疑问就点开源码看!看不懂**函数**的[点击我](https://www.jianshu.com/p/613a6118e2e0)学习新知识!

## AbstractWrapper
> 用于生成 sql 的 where 条件
>> QueryWrapper(LambdaQueryWrapper) 和 UpdateWrapper(LambdaUpdateWrapper) 的父类  

### allEq
```
allEq(boolean condition, Map<R, V> params, boolean null2IsNull)
allEq(Map<R, V> params, boolean null2IsNull) //省略condition,默认true
allEq(Map<R, V> params) //再次省略null2IsNull,默认true
```
> 全部 = (或 is null)  
> column1 = #{value} and column2 = #{value} and column3 is null ...
>* params : map,key为数据库字段名,value为字段值, !!!注意!!! 如果此参为空,则不加入sql
>* null2IsNull : 为true则在map的value为null时调用`isNull`方法,为false时则忽略value为null的(默认为`true`)
* 例1: `allEq({id:1,name:"老王",age:null})`->`id = 1 and name = '老王' and age is null`
* 例2: `allEq({id:1,name:"老王",age:null}, false)`->`id = 1 and name = '老王'`

```
allEq(boolean condition, BiPredicate<R, V> filter, Map<R, V> params, boolean null2IsNull) 
allEq(BiPredicate<R, V> filter, Map<R, V> params, boolean null2IsNull) //省略condition,默认true
allEq(BiPredicate<R, V> filter, Map<R, V> params) //再次省略null2IsNull,默认true
```
> column1 = #{value} and column2 = #{value} and column3 is null ...
>* filter : 过滤函数,是否允许字段传入比对条件中
>* params 与 null2IsNull : 同上
* 例1: `allEq((k,v) -> k.indexOf("a") > 0,{id:1,name:"老王",age:null})`->`name = '老王' and age is null`
* 例2: `allEq((k,v) -> k.indexOf("a") > 0,{id:1,name:"老王",age:null}, false)`->`name = '老王'`

### eq
```
eq(boolean condition, R column, Object val)
eq(R column, Object val) //省略condition,默认true
```
> 等于 =  
column = #{val}
* 例: `eq("name", "老王")`->`name = '老王'`

### ne
```
ne(boolean condition, R column, Object val)
ne(R column, Object val) //省略condition,默认true
```
> 不等于 <>  
column <> #{val}
* 例: `ne("name", "老王")`->`name <> '老王'`

### gt
```
gt(boolean condition, R column, Object val)
gt(R column, Object val) //省略condition,默认true
```
> 大于 >  
column > #{val}
* 例: `gt("age", 18)`->`age > 18`

### ge
```
ge(boolean condition, R column, Object val)
ge(R column, Object val) //省略condition,默认true
```
> 大于等于 >=  
column >= #{val}
* 例: `ge("age", 18)`->`age >= 18`

### lt
```
lt(boolean condition, R column, Object val)
lt(R column, Object val) //省略condition,默认true
```
> 小于 <  
column < #{val}
* 例: `lt("age", 18)`->`age < 18`

### le
```
le(boolean condition, R column, Object val)
le(R column, Object val) //省略condition,默认true
```
> 小于等于 <=  
column <= #{val}
* 例: `le("age", 18)`->`age <= 18`

### between
```
between(boolean condition, R column, Object val1, Object val2)
between(R column, Object val1, Object val2) //省略condition,默认true
```
> BETWEEN 值1 AND 值2  
column between #{val1} and #{val2} 
* 例: `between("age", 18, 30)`->`age between 18 and 30`

### notBetween
```
notBetween(boolean condition, R column, Object val1, Object val2)
notBetween(R column, Object val1, Object val2) //省略condition,默认true
```
> NOT BETWEEN 值1 AND 值2  
column not between #{val1} and #{val2} 
* 例: `notBetween("age", 18, 30)`->`age not between 18 and 30`

### like
```
like(boolean condition, R column, Object val)
like(R column, Object val) //省略condition,默认true
```
> LIKE '%值%'  
column like #{val}
* 例: `like("name", "王")`->`name like '%王%'`

### notLike
```
notLike(boolean condition, R column, Object val)
notLike(R column, Object val) //省略condition,默认true
```
> NOT LIKE '%值%'  
column not like #{val}
* 例: `notLike("name", "王")`->`name not like '%王%'`

### likeLeft
```
likeLeft(boolean condition, R column, Object val)
likeLeft(R column, Object val) //省略condition,默认true
```
> LIKE '%值'  
column like #{val}
* 例: `likeLeft("name", "王")`->`name like '%王'`

### likeRight
```
likeRight(boolean condition, R column, Object val)
likeRight(R column, Object val) //省略condition,默认true
```
> LIKE '值%'  
column like #{val}
* 例: `likeRight("name", "王")`->`name like '王%'`

## 下面这些欢迎有志之士参照如上例子来帮忙pr补全(源码里有注释可以cv的那种)

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
> 继承自 AbstractWrapper ,自身的内部属性 entity 也用于生成 where 条件
>> 及 LambdaQueryWrapper, LambdaQueryWrapper 不能 new 出来,只能通过 new QueryWrapper().lambda() 方法获取!

### set

### setSql

## UpdateWrapper
> 继承自 AbstractWrapper ,自身的内部属性 entity 也用于生成 where 条件  
>> 及 LambdaUpdateWrapper, LambdaUpdateWrapper 不能 new 出来,只能通过 new UpdateWrapper().lambda() 方法获取!

### select

### excludeColumns