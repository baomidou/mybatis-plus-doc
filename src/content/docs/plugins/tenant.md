---
title: 多租户插件
sidebar:
  order: 3
---

`TenantLineInnerInterceptor` 是 MyBatis-Plus 提供的一个插件，用于实现多租户的数据隔离。通过这个插件，可以确保每个租户只能访问自己的数据，从而实现数据的安全隔离。

## 示例工程

为了更好地理解如何使用 `TenantLineInnerInterceptor`，你可以参考官方提供的示例工程：👉 [mybatis-plus-sample-tenant](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-tenant)

## 属性介绍

`TenantLineInnerInterceptor` 的关键属性是 `tenantLineHandler`，它是一个 `TenantLineHandler` 接口的实例，用于处理租户相关的逻辑。

| 属性名 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: |
| tenantLineHandler | TenantLineHandler |  | 租户处理器（ TenantId 行级 ） |

`TenantLineHandler` 接口定义了以下方法：

```java
public interface TenantLineHandler {

    /**
     * 获取租户 ID 值表达式，只支持单个 ID 值
     *
     * @return 租户 ID 值表达式
     */
    Expression getTenantId();

    /**
     * 获取租户字段名
     * 默认字段名叫: tenant_id
     *
     * @return 租户字段名
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * 根据表名判断是否忽略拼接多租户条件
     * 默认都要进行解析并拼接多租户条件
     *
     * @param tableName 表名
     * @return 是否忽略, true:表示忽略，false:需要解析并拼接多租户条件
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }

    /**
     * 忽略插入租户字段逻辑
     *
     * @param columns        插入字段
     * @param tenantIdColumn 租户 ID 字段
     * @return
     */
    default boolean ignoreInsert(List<Column> columns, String tenantIdColumn) {
        return columns.stream().map(Column::getColumnName).anyMatch(i -> i.equalsIgnoreCase(tenantIdColumn));
    }
}
```

## 使用方法

### 步骤 1：实现租户处理器

实现 `TenantLineHandler` 接口，创建一个租户处理器。在这个例子中，我们假设每个租户都有一个唯一的 `tenantId`，并且我们通过请求头来获取当前租户的 `tenantId`。

```java
@Component
public class CustomTenantHandler implements TenantLineHandler {

    @Override
    public Expression getTenantId() {
        // 假设有一个租户上下文，能够从中获取当前用户的租户
         Long tenantId = TenantContextHolder.getCurrentTenantId();
        // 返回租户ID的表达式，LongValue 是 JSQLParser 中表示 bigint 类型的 class
        return new LongValue(tenantId);;
    }

    @Override
    public String getTenantIdColumn() {
        return "tenant_id";
    }

    @Override
    public boolean ignoreTable(String tableName) {
        // 根据需要返回是否忽略该表
        return false;
    }

}
```

### 步骤 2：将租户处理器注入插件

将自定义的租户处理器注入到 `TenantLineInnerInterceptor` 中：

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

通过以上步骤，你已经成功地在 Spring Boot 项目中配置了多租户插件，并实现了一个简单的租户处理器。现在，你的应用将能够根据当前请求的租户ID自动处理多租户数据隔离。

请注意，实际应用中，获取租户ID的方式可能会有所不同，这取决于你的应用架构和业务需求。此外，确保在处理租户ID时考虑到安全性，避免潜在的安全风险。

## 本地缓存 SQL 解析

为了提高性能，MyBatis-Plus 支持本地缓存 SQL 解析。你可以通过以下方式设置缓存处理类：

```java
static {
    // 默认支持序列化 FstSerialCaffeineJsqlParseCache，JdkSerialCaffeineJsqlParseCache
    JsqlParserGlobal.setJsqlParseCache(new JdkSerialCaffeineJsqlParseCache(
      (cache) -> cache.maximumSize(1024)
      .expireAfterWrite(5, TimeUnit.SECONDS))
    );
}
```

## 插入时自动添加租户字段

> 默认插入 SQL 是需要判断租户条件，因此需要配合[自动填充字段](https://baomidou.com/guides/auto-fill-field/)功能填充租户字段，否则租户字段不会自动保存到数据库。

## 注意事项

:::note[说明]

- 多租户不等于权限过滤，租户之间是完全隔离的。
- 启用多租户后，所有执行的 method 的 SQL 都会进行处理。
- 自定义的 SQL 请按规范书写，特别是涉及到多个表的每个表都要给别名，特别是 `inner join` 的要写标准的 `inner join`。

:::

通过以上配置和使用方法，你可以在 MyBatis-Plus 应用中实现多租户的数据隔离，确保每个租户的数据安全。
