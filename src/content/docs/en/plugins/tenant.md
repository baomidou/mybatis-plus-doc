---
title: Multi-Tenant Plugin
sidebar:
  order: 3
---

`TenantLineInnerInterceptor` is a plugin provided by MyBatis-Plus for implementing multi-tenant data isolation. This plugin ensures that each tenant can only access their own data, thereby achieving secure data isolation.

## Example Project

To better understand how to use `TenantLineInnerInterceptor`, you can refer to the official example project: 👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

## Property Introduction

The key property of `TenantLineInnerInterceptor` is `tenantLineHandler`, which is an instance of the `TenantLineHandler` interface and is used to handle tenant-related logic.

| Property Name | Type | Default Value | Description |
| :-: | :-: | :-: | :-: |
| tenantLineHandler | TenantLineHandler |  | Tenant handler (TenantId row-level) |

The `TenantLineHandler` interface defines the following methods:

```java
public interface TenantLineHandler {

    /**
     * Gets the tenant ID value expression (supports only a single ID value)
     *
     * @return Tenant ID value expression
     */
    Expression getTenantId();

    /**
     * Gets the tenant column name
     * Default column name: tenant_id
     *
     * @return Tenant column name
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * Determines whether to ignore appending multi-tenant conditions based on the table name
     * By default, all tables are parsed and multi-tenant conditions are appended
     *
     * @param tableName Table name
     * @return Whether to ignore (true: ignore, false: parse and append multi-tenant conditions)
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }

    /**
     * Ignores the logic for inserting tenant fields
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

Implement the `TenantLineHandler` interface to create a tenant handler. In this example, we assume each tenant has a unique `tenantId`, and we retrieve the current tenant's `tenantId` from the request header.

```java
@Component
public class CustomTenantHandler implements TenantLineHandler {

    @Override
    public Expression getTenantId() {
        // Assume there is a tenant context to retrieve the current user's tenant
         Long tenantId = TenantContextHolder.getCurrentTenantId();
        // Return the tenant ID expression (LongValue is the JSQLParser class representing bigint type)
        return new LongValue(tenantId);;
    }

    @Override
    public String getTenantIdColumn() {
        return "tenant_id";
    }

    @Override
    public boolean ignoreTable(String tableName) {
        // Return whether to ignore the table based on requirements
        return false;
    }

}
```

### Step 2: Inject the Tenant Handler into the Plugin

Inject the custom tenant handler into `TenantLineInnerInterceptor`:

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

With the above steps, you have successfully configured the multi-tenant plugin in a Spring Boot project and implemented a simple tenant handler. Your application will now automatically handle multi-tenant data isolation based on the current request's tenant ID.

Note that in real-world applications, the method of obtaining the tenant ID may vary depending on your architecture and business requirements. Additionally, ensure security considerations when handling tenant IDs to avoid potential risks.

## Local SQL Parsing Cache

To improve performance, MyBatis-Plus supports local caching of SQL parsing. You can configure the cache handler as follows:

```java
static {
    // Default supports serialization: FstSerialCaffeineJsqlParseCache, JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## Automatically Adding Tenant Fields During Insert

> By default, insert SQL requires tenant condition checks. Therefore, it must be used with the [Auto-Fill Field](https://baomidou.com/guides/auto-fill-field/) feature to populate tenant fields; otherwise, tenant fields will not be automatically saved to the database.

## Notes

:::note[Note]

- Multi-tenancy is not equivalent to permission filtering; tenants are completely isolated from each other.
- After enabling multi-tenancy, all executed method SQL will be processed.
- Custom SQL must follow the standard format, especially when involving multiple tables. Each table must have an alias, particularly for `inner join`, which must be written in the standard `inner join` format.

:::

With the above configuration and usage, you can implement multi-tenant data isolation in MyBatis-Plus applications, ensuring data security for each tenant.
