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
        public Expression getTenantId(boolean where) {
            // 该 where 条件 3.2.0 版本开始添加的，用于分区是否为在 where 条件中使用
            // 如果是in/between之类的多个tenantId的情况，参考下方示例
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
- 关于多租户实现条件tenant_id in (1,2,3)的解决方案

核心代码： MybatisPlusConfig
```java
    /**
     * 2019-8-1
     *
     * https://gitee.com/baomidou/mybatis-plus/issues/IZZ3M
     * 
     * 参考示例：
     * https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant
     *
     * tenant_id in (1,2)
     *
     * @return
     */
    @Override
    public Expression getTenantId(boolean where) {
        //如果是where，可以追加多租户多个条件in，不是where的情况：比如当insert时，不能insert into user(name, tenant_id) values('test', tenant_id IN (1, 2));
        final boolean multipleTenantIds = true;//自己判断是单个tenantId还是需要多个id in(1,2,3)
        if (where && multipleTenantIds) {
            //演示如何实现tenant_id in (1,2)
            return multipleTenantIdCondition();
        } else {
            //演示：tenant_id=1
            return singleTenantIdCondition();
        }
    }

    private Expression singleTenantIdCondition() {
        return new LongValue(1);//ID自己想办法获取到
    }

    private Expression multipleTenantIdCondition() {
        final InExpression inExpression = new InExpression();
        inExpression.setLeftExpression(new Column(getTenantIdColumn()));
        final ExpressionList itemsList = new ExpressionList();
        final List<Expression> inValues = new ArrayList<>(2);
        inValues.add(new LongValue(1));//ID自己想办法获取到
        inValues.add(new LongValue(2));
        itemsList.setExpressions(inValues);
        inExpression.setRightItemsList(itemsList);
        return inExpression;
    }


    public class MyTenantParser extends TenantSqlParser {

        //目前这种情况比较小众，自己定制可以参考
        //参考 https://gitee.com/baomidou/mybatis-plus-samples/blob/master/mybatis-plus-sample-tenant/src/main/java/com/baomidou/mybatisplus/samples/tenant/config/MyTenantParser.java
    }
```

- 相关 SQL 解析如多租户可通过 `@SqlParser(filter=true)` 排除 SQL 解析，~~注意！！全局配置 sqlParserCache 设置为 true 才生效。~~(3.1.1开始不再需要这一步)
```yaml



# 开启 SQL 解析缓存注解生效
mybatis-plus:
  global-config:
    sql-parser-cache: true
```


