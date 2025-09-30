---
title: Multi-Tenant Plugin
sidebar:
  order: 3
---

`TenantLineInnerInterceptor` is a plugin provided by MyBatis-Plus for implementing multi-tenant data isolation. This plugin ensures that each tenant can only access their own data, thereby achieving secure data isolation.

## Example Project

To better understand how to use `TenantLineInnerInterceptor`, you can refer to the official example project: 👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

## Property Introduction

The key property of `TenantLineInnerInterceptor` is `tenantLineHandler`, which is an instance of the `TenantLineHandler` interface used to handle tenant-related logic.

| Property Name | Type | Default Value | Description |
| :-: | :-: | :-: | :-: |
| tenantLineHandler | TenantLineHandler |  | Tenant Handler (TenantId Row Level) |

The `TenantLineHandler` interface defines the following methods:

```java
public interface TenantLineHandler {

    /**
     * Get the tenant ID value expression. Only supports a single ID value.
     *
     * @return Tenant ID value expression
     */
    Expression getTenantId();

    /**
     * Get the tenant field name.
     * Default field name is: tenant_id
     *
     * @return Tenant field name
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * Determine whether to ignore adding the multi-tenant condition based on the table name.
     * By default, all tables are parsed and the multi-tenant condition is added.
     *
     * @param tableName Table name
     * @return Whether to ignore. true: ignore, false: need to parse and add multi-tenant condition
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }

    /**
     * Ignore the logic for inserting the tenant field.
     *
     * @param columns        Insert fields
     * @param tenantIdColumn Tenant ID field
     * @return
     */
    default boolean ignoreInsert(List<Column> columns, String tenantIdColumn) {
        return columns.stream().map(Column::getColumnName).anyMatch(i -> i.equalsIgnoreCase(tenantIdColumn));
    }
}
```

## Usage

### Step 1: Implement the Tenant Handler

Implement the `TenantLineHandler` interface to create a tenant handler. In this example, we assume each tenant has a unique `tenantId`, and we obtain the current tenant's `tenantId` from the request header.

```java
@Component
public class CustomTenantHandler implements TenantLineHandler {

    @Override
    public Expression getTenantId() {
        // Assume there is a tenant context from which the current user's tenant can be obtained
         Long tenantId = TenantContextHolder.getCurrentTenantId();
        // Return the tenant ID expression. LongValue is the class representing the bigint type in JSQLParser
        return new LongValue(tenantId);;
    }

    @Override
    public String getTenantIdColumn() {
        return "tenant_id";
    }

    @Override
    public boolean ignoreTable(String tableName) {
        // Return whether to ignore this table based on your needs
        return false;
    }

}
```

### Step 2: Inject the Tenant Handler into the Plugin

Inject your custom tenant handler into the `TenantLineInnerInterceptor`:

```java
@Configuration
@MapperScan("com.yourpackage.mapper")
public class MybatisPlusConfig {

    @Autowired
    private CustomTenantHandler customTenantHandler;

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        TenantLineInnerInterceptor tenantInterceptor = new TenantLineInnerInterceptor();
        tenantInterceptor.setTenantLineHandler(customTenantHandler);
        interceptor.addInnerInterceptor(tenantInterceptor);
        return interceptor;
    }
}
```

By following the steps above, you have successfully configured the multi-tenant plugin in your Spring Boot project and implemented a simple tenant handler. Your application will now automatically handle multi-tenant data isolation based on the current request's tenant ID.

Please note that in practice, the method for obtaining the tenant ID may vary depending on your application architecture and business requirements. Additionally, ensure security considerations are taken into account when handling tenant IDs to avoid potential security risks.

## Local SQL Parsing Cache

To improve performance, MyBatis-Plus supports local caching of SQL parsing. You can set the cache handling class as follows:

```java
static {
    // Default supports serialization FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## Automatically Adding Tenant Field on Insert

> By default, insert SQL requires tenant condition checking. Therefore, it needs to be used in conjunction with the [Automatic Field Population](https://baomidou.com/guides/auto-fill-field/) feature to populate the tenant field; otherwise, the tenant field will not be automatically saved to the database.

## Notes

:::note[Note]

- Multi-tenancy is not equivalent to permission filtering; tenants are completely isolated from each other.
- After enabling multi-tenancy, the SQL for all executed methods will be processed.
- Custom SQL must be written according to the specification. In particular, every table involved, especially in `inner join` clauses, must be given an alias, and standard `inner join` syntax must be used.

:::

Through the above configuration and usage methods, you can implement multi-tenant data isolation in your MyBatis-Plus application, ensuring data security for each tenant.
