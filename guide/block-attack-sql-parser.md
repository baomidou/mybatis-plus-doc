# 攻击 SQL 阻断解析器

> 作用！阻止恶意的全表更新删除

```java
@Bean
public PaginationInterceptor paginationInterceptor() {
    PaginationInterceptor paginationInterceptor = new PaginationInterceptor();

    ...

    List<ISqlParser> sqlParserList = new ArrayList<>();
    // 攻击 SQL 阻断解析器、加入解析链
    sqlParserList.add(new BlockAttackSqlParser());
    paginationInterceptor.setSqlParserList(sqlParserList);

    ...

    return paginationInterceptor;
}
```
