# 多租户 SQL 解析器

- 这里配合 分页拦截器 使用， spring boot 例子配置如下：

示例工程：

👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)


``` java
@Bean
public PaginationInterceptor paginationInterceptor() {
    PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
    /*
     * 【测试多租户】 SQL 解析处理拦截器<br>
     * 这里固定写成住户 1 实际情况你可以从cookie读取，因此数据看不到 【 麻花藤 】 这条记录（ 注意观察 SQL ）<br>
     */
    List<ISqlParser> sqlParserList = new ArrayList<>();
    TenantSqlParser tenantSqlParser = new TenantSqlParser();
    tenantSqlParser.setTenantHandler(new TenantHandler() {
        @Override
        public Expression getTenantId() {
            return new LongValue(1L);
        }

        @Override
        public String getTenantIdColumn() {
            return "tenant_id";
        }

        @Override
        public boolean doTableFilter(String tableName) {
            // 这里可以判断是否过滤表
            /*
            if ("user".equals(tableName)) {
                return true;
            }*/
            return false;
        }
    });
    sqlParserList.add(tenantSqlParser);
    paginationInterceptor.setSqlParserList(sqlParserList);
    paginationInterceptor.setSqlParserFilter(new ISqlParserFilter() {
        @Override
        public boolean doFilter(MetaObject metaObject) {
            MappedStatement ms = SqlParserHelper.getMappedStatement(metaObject);
            // 过滤自定义查询此时无租户信息约束【 麻花藤 】出现
            if ("com.baomidou.springboot.mapper.UserMapper.selectListBySQL".equals(ms.getId())) {
                return true;
            }
            return false;
        }
    });
    return paginationInterceptor;
}
```

- 相关 SQL 解析如多租户可通过 `@SqlParser(filter=true)` 排除 SQL 解析，~~注意！！全局配置 sqlParserCache 设置为 true 才生效。~~(3.1.1开始不再需要这一步)
```yaml
# 开启 SQL 解析缓存注解生效
mybatis-plus:
  global-config:
    sql-parser-cache: true
```


