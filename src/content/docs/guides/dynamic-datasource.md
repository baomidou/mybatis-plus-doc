---
title: 多数据源支持
sidebar:
  order: 14
---

MyBatis-Plus 提供两类多数据源方案：内置的 `ShardingInnerInterceptor`（3.5.18+）和生态组件。内置方案负责在 MyBatis 执行语句前选择数据源，不改写 SQL，也不负责跨库事务、结果合并或分库分表 SQL 改写。

## 内置分片插件

### 能力边界

`ShardingInnerInterceptor` 实现 `InnerInterceptor`，在 `beforeQuery` 和 `beforeUpdate` 阶段触发路由：

- `SELECT`、`INSERT`、`UPDATE`、`DELETE` 会参与路由；`UNKNOWN` 和 `FLUSH` 直接跳过。
- 先调用可注入的 `IShardingProcessor`。处理器返回 `true` 表示已完成自定义切换；返回 `false`（默认处理器行为）才进入内置注解路由。
- 内置路由按 `MappedStatement` 的 statement id 缓存映射。方法上的 `@Sharding` 优先于 Mapper 类型上的注解；类型注解会沿接口和父类查找。无法解析 XML 独立命名空间或反射失败时回退到主库组。
- 数据源上下文使用线程本地状态，业务代码可通过 `ShardingKey` 临时指定节点；请求结束后应清理上下文，避免线程复用造成串库。

### 配置模型

通过 `ShardingProperties` 初始化 `ShardingHelper.initDbSharding`：`primary` 必填，为默认数据源组；`datasource` 是“组名 -> 节点列表”；未指定策略时使用随机策略。数据源键由 `group#key` 组成，写操作会追加写标记并优先选择主节点。

#### 配置项说明

| 配置项/属性 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | :---: | --- | --- |
| `primary` | `String` | 是 | 无 | 默认数据源组名称；为空时分片配置不启用。 |
| `shardingStrategy` | `IShardingStrategy` | 否 | `RandomShardingStrategy` | 组内节点选择策略，也可使用 `ConsistentHashShardingStrategy` 或自定义实现。 |
| `datasource` | `Map<String, List<DataSourceProperty>>` | 否 | 空 Map | 数据源组映射，键为组名，值为该组节点列表。 |
| `datasource.<group>[].key` | `String` | 是 | 无 | 节点标识，与组名组成完整键 `group#key`。 |
| `datasource.<group>[].url` | `String` | 是 | 无 | JDBC 连接地址，具体连接属性由数据源装配实现决定。 |
| `datasource.<group>[].username` | `String` | 否 | 无 | 数据库用户名。 |
| `datasource.<group>[].password` | `String` | 否 | 无 | 数据库密码，生产环境应使用安全配置管理。 |

`DataSourceProperty` 还可携带驱动、连接池等实现相关属性；这些属性不会改变拦截器的路由规则。写操作通过 `SqlCommandType` 区分主节点和只读节点，具体主从节点集合由数据源组健康状态提供。

```yaml
mybatis-plus:
  sharding:
    primary: orders
    datasource:
      orders:
        - key: node1
          url: jdbc:mysql://db1/orders
          username: app
          password: secret
        - key: node2
          url: jdbc:mysql://db2/orders
          username: app
          password: secret
```

具体属性绑定方式取决于项目的数据源装配代码；核心要求是创建并初始化 `ShardingProperties`，再把 `ShardingInnerInterceptor` 加入 `MybatisPlusInterceptor`：

```java
ShardingHelper.initDbSharding(properties);

MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
interceptor.addInnerInterceptor(new ShardingInnerInterceptor());
```

完整可运行案例请参考：[mybatis-plus-sample-sharding](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-sharding)。

### 注解路由

`@Sharding` 可标注 Mapper 接口或方法。`value` 指定数据源组，留空使用主库组；`strategy` 指定实现 `IShardingStrategy` 且具有无参构造器的策略类。

```java
@Mapper
@Sharding("orders")
public interface OrderMapper extends BaseMapper<Order> {
    @Sharding(value = "orders", strategy = ConsistentHashShardingStrategy.class)
    Order selectById(Long id);
}
```

方法注解优先级高于类型注解。一个 statement id 首次执行后会缓存解析结果；动态改变注解或策略需要重新初始化 `ShardingHelper`。

案例中的 Mapper、数据源初始化和拦截器装配可直接作为 Spring Boot 项目的集成模板：先初始化 `ShardingProperties`，再注册 `ShardingInnerInterceptor`，最后通过 `@Sharding` 或 `ShardingKey` 选择组和节点。

### 手动切换与策略

```java
// 直接指定完整数据源键
ShardingKey.change(ShardingKey.getDatabaseKey("orders", "node2"));

// 按读写类型从组中选择节点；写操作自动追加写标记
ShardingKey.change("orders", SqlCommandType.SELECT,
    group -> group.getSlaveKeys().get(0));
```

内置提供随机和一致性哈希策略，也可实现 `IShardingStrategy`。选择器找不到健康节点时抛出异常。`ShardingKey.clearDatabaseKey()` 用于清理当前线程上下文；`getDatabaseKeyOrElsePrimaryKey()` 可获取当前键或主键。

### 自定义处理器

需要按租户、请求参数或外部路由中心决定数据源时，实现 `IShardingProcessor` 并注入：

```java
IShardingProcessor processor = (statement, parameter, currentKey) -> {
    // 完成切换后返回 true；否则返回 false 使用 @Sharding 默认路由
    return false;
};
new ShardingInnerInterceptor(processor);
```

处理器接收 `MappedStatement`、原始参数和当前上下文键，可完全接管该次路由。插件只在执行前切换数据源，不提供跨数据源事务、分布式一致性、分页结果合并或 SQL 分片改写；这些能力需要由上层事务框架或专用分库分表中间件提供。

## 开源组件：dynamic-datasource

适合 Spring Boot 项目的数据源切换、分组读写、加密配置、动态加载和 Seata 集成。它与内置插件是替代关系，通常二选一，避免多个上下文同时接管同一条 SQL。

- [项目主页与完整文档](https://github.com/baomidou/dynamic-datasource)
- [Gitee 源码与示例](https://gitee.com/baomidou/dynamic-datasource-spring-boot-starter)

## 企业组件：mybatis-mate

提供注解式数据源切换、动态加载卸载和 JTA Atomikos 等企业能力。适合需要配套商业支持或跨库事务的场景；它同样不建议与内置路由器叠加使用。

- [多数据源动态加载示例](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-dynamic)
- [JTA Atomikos 事务示例](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-jta-atomikos)
- [mybatis-mate 官网](https://mybatis-mate.com/)
