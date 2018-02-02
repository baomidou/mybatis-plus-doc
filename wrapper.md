# 条件构造器

实体包装器，用于处理 sql 拼接，排序，实体参数查询等！

!> 补充说明： 使用的是数据库字段，不是Java属性!

实体包装器 EntityWrapper 继承 Wrapper

## 简单示例

- 翻页查询

```java
public Page<T> selectPage(Page<T> page, EntityWrapper<T> entityWrapper) {
  if (null != entityWrapper) {
      entityWrapper.orderBy(page.getOrderByField(), page.isAsc());
  }
  page.setRecords(baseMapper.selectPage(page, entityWrapper));
  return page;
}
```

- 拼接 sql 方式 一

```java
@Test
public void testTSQL11() {
    /*
     * 实体带查询使用方法  输出看结果
     */
    EntityWrapper<User> ew = new EntityWrapper<User>();
    ew.setEntity(new User(1));
    ew.where("user_name={0}", "'zhangsan'").and("id=1")
            .orNew("user_status={0}", "0").or("status=1")
            .notLike("user_nickname", "notvalue")
            .andNew("new=xx").like("hhh", "ddd")
            .andNew("pwd=11").isNotNull("n1,n2").isNull("n3")
            .groupBy("x1").groupBy("x2,x3")
            .having("x1=11").having("x3=433")
            .orderBy("dd").orderBy("d1,d2");
    System.out.println(ew.getSqlSegment());
}
```

- 拼接 sql 方式 二

```java
int buyCount = selectCount(Condition.create()
                .setSqlSelect("sum(quantity)")
                .isNull("order_id")
                .eq("user_id", 1)
                .eq("type", 1)
                .in("status", new Integer[]{0, 1})
                .eq("product_id", 1)
                .between("created_time", startDate, currentDate)
                .eq("weal", 1));
```

- 自定义 SQL 方法如何使用 Wrapper

mapper java 接口方法

```java
List<User> selectMyPage(RowBounds rowBounds, @Param("ew") Wrapper<T> wrapper);
```

mapper xml 定义

```xml
<select id="selectMyPage" resultType="User">
  SELECT * FROM user 
  <where>
  ${ew.sqlSegment}
  </where>
</select>
```
!> 关于 ${ew.sqlSegment} 使用了 $ 不要误以为就会被 sql 注入，请放心使用 mp 内部对 wrapper 进行了字符转义处理！

## 条件参数说明

查询方式          |     	说明
---------------- | ----------------
setSqlSelect     |    设置 SELECT 查询字段
where            |    WHERE 语句，拼接 + `WHERE 条件`
and              |    AND 语句，拼接 + `AND 字段=值`
andNew           |    AND 语句，拼接 + `AND (字段=值)`
or               |    OR 语句，拼接 + `OR 字段=值`
orNew            |    OR 语句，拼接 + `OR (字段=值)`
eq               |    等于=
allEq            |    基于 map 内容等于=
ne               |    不等于<>
gt               |    大于>
ge               |    大于等于>=
lt               |    小于<
le               |    小于等于<=
like             |    模糊查询 LIKE
notLike          |    模糊查询 NOT LIKE
in               |    IN 查询
notIn            |    NOT IN 查询
isNull           |    NULL 值查询
isNotNull        |    IS NOT NULL
notEmpty         |    字段不为空，非NULL且有内容
isEmpty          |    字段为NULL或者为
groupBy          |    分组 GROUP BY
having           |    HAVING 关键词
orderBy          |    排序 ORDER BY
orderAsc         |    ASC 排序 ORDER BY
orderDesc        |    DESC 排序 ORDER BY
exists           |    EXISTS 条件语句
notExists        |    NOT EXISTS 条件语句
between          |    BETWEEN 条件语句
notBetween       |    NOT BETWEEN 条件语句
addFilter        |    自由拼接 SQL
last             |    拼接在最后，例如：last("LIMIT 1")


!> 注意！ xxNew 都是另起 `( ... )` 括号包裹。



