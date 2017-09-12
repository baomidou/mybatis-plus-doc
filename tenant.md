# 多租户 SQL 解析器

- 这里配合 分页拦截器 使用， spring boot 例子配置如下：

示例工程：

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)

```
@Bean
public PaginationInterceptor paginationInterceptor() {
    PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
    paginationInterceptor.setLocalPage(true);// 开启 PageHelper 的支持
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
            MappedStatement ms = PluginUtils.getMappedStatement(metaObject);
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

