# 攻击 SQL 阻断解析器

> 作用！阻止恶意的全表更新删除

```java
@Bean
public PaginationInterceptor paginationInterceptor() {
    PaginationInterceptor paginationInterceptor = new PaginationInterceptor();

    ...

    List<ISqlParser> sqlParserList = new ArrayList<>();
    // 攻击 SQL 阻断解析器、加入解析链
    sqlParserList.add(new BlockAttackSqlParser() {
            @Override
            public void processDelete(Delete delete) {
                // 如果你想自定义做点什么，可以重写父类方法像这样子
                if ("user".equals(delete.getTable().getName())) {
                    // 自定义跳过某个表，其他关联表可以调用 delete.getTables() 判断
                    return ;
                }
                super.processDelete(delete);
            }
        });
    paginationInterceptor.setSqlParserList(sqlParserList);

    ...

    return paginationInterceptor;
}
```
