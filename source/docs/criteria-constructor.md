title: 条件构造器
---
> 实体包装器，用于处理 sql 拼接，排序，实体参数查询等！

* 例如：

+ 翻页查询
```java
public Page<T> selectPage(Page<T> page, EntityWrapper<T> entityWrapper) {
	if (null != entityWrapper) {
		entityWrapper.orderBy(page.getOrderByField(), page.isAsc());
	}
	page.setRecords(baseMapper.selectPage(page, entityWrapper));
	return page;
}
```

+ 拼接 sql
```java
@Test
public void testTSQL11() {
    /*
     * 实体带查询使用方法  输出看结果
     */
    ew.setEntity(new User(1));
    ew.where("name={0}", "'zhangsan'").and("id=1")
            .orNew("status={0}", "0").or("status=1")
            .notLike("nlike", "notvalue")
            .andNew("new=xx").like("hhh", "ddd")
            .andNew("pwd=11").isNotNull("n1,n2").isNull("n3")
            .groupBy("x1").groupBy("x2,x3")
            .having("x1=11").having("x3=433")
            .orderBy("dd").orderBy("d1,d2");
    System.out.println(ew.getSqlSegment());
}
```

