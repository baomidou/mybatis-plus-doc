---
title: Multi-Tenant Plugin
sidebar:
  order: 3
---

`TenantLineInnerInterceptor` is a plugin provided by MyBatis-Plus for implementing multi-tenant data isolation. With this plugin, each tenant can only access their own data, thus ensuring secure data isolation.

## Example Project

To better understand how to use `TenantLineInnerInterceptor`, you can refer to the official example project: 👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

## Property Introduction

The key property of `TenantLineInnerInterceptor` is `tenantLineHandler`, which is an instance of the `TenantLineHandler` interface used to handle tenant-related logic.

| Property Name | Type | Default Value | Description |
| :-: | :-: | :-: | :-: |
| tenantLineHandler | TenantLineHandler |  | Tenant handler (TenantId row-level) |

The `TenantLineHandler` interface defines the following methods:

```java
public interface TenantLineHandler {

    /**
     * Get the tenant ID value expression, only supports a single ID value
     *
     * @return Tenant ID value expression
     */
    Expression getTenantId();

    /**
     * Get the tenant column name
     * The default column name is: tenant_id
     *
     * @return Tenant column name
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * Determine whether to ignore appending multi-tenant conditions based on the table name
     * By default, all tables are parsed and appended with multi-tenant conditions
     *
     * @param tableName Table name
     * @return Whether to ignore, true: ignore, false: need to parse and append multi-tenant conditions
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }

    /**
     * Ignore logic for inserting tenant fields
     *
     * @param columns        Inserted columns
     * @param tenantIdColumn Tenant ID column
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
        // Return the expression for the tenant ID, LongValue is the class in JSQLParser representing bigint type
        return new LongValue(tenantId);;
    }

    @Override
    public String getTenantIdColumn() {
        return "tenant_id";
    }

    @Override
    public boolean ignoreTable(String tableName) {
        // Return whether to ignore this table as needed
        return false;
    }

}
```

### Step 2: Inject the Tenant Handler into the Plugin

Inject the custom tenant handler into the `TenantLineInnerInterceptor`:

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

With the above steps, you have successfully configured the multi-tenant plugin in your Spring Boot project and implemented a simple tenant handler. Now, your application will automatically handle multi-tenant data isolation based on the tenant ID of the current request.

Please note that in actual applications, the way to obtain the tenant ID may vary depending on your application architecture and business requirements. In addition, make sure to consider security when handling tenant IDs to avoid potential security risks.

## Local Cache SQL Parsing

To improve performance, MyBatis-Plus supports local cache SQL parsing. You can set the cache handler class as follows:

```java
static {
    // By default, FstSerialCaffeineJsqlParseCache and JdkSerialCaffeineJsqlParseCache support serialization
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## Automatically Add Tenant Field on Insert

> By default, insert SQL needs to check the tenant condition, so you need to use the [auto-fill field](/en/guides/auto-fill-field/) feature to fill the tenant field, otherwise the tenant field will not be automatically saved to the database.

## Notes

:::note[Note]

- Multi-tenancy is not the same as permission filtering; tenants are completely isolated from each other.
- After enabling multi-tenancy, the SQL of all executed methods will be processed.
- Please write custom SQL according to the specification, especially when involving multiple tables, each table must have an alias. In particular, `inner join` must be written as a standard `inner join`.

:::

With the above configuration and usage, you can implement multi-tenant data isolation in your MyBatis-Plus application to ensure the security of each tenant's data.
