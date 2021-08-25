# 企业高级特性

::: tip

mybatis-mate 为 mp 企业级模块，旨在更敏捷优雅处理数据。

- mybatis-mate 示例 ：[传送门](https://gitee.com/baomidou/mybatis-mate-examples)

:::


## 数据审计（对账）

- 对比两对象属性差异，例如：银行流水对账。

``` java
 applicationEventPublisher.publishEvent(new DataAuditEvent((t) -> {
    // 异步回调
    List<Change> changes = t.apply(newVersion, oldVersion);
    for (Change valueChange : changes) {
        ValueChange change = (ValueChange) valueChange;
        System.err.println(String.format("%s不匹配，期望值 %s 实际值 %s", change.getPropertyName(), change.getLeft(), change.getRight()));
    }
}));
```


## 数据范围（数据权限）

- 行级粒度权限控制，例如：上级部门可以查看子部门信息。

``` java
// 测试 test 类型数据权限范围，混合分页模式
@DataScope(type = "test", value = {
        // 关联表 user 别名 u 指定部门字段权限
        @DataColumn(alias = "u", name = "department_id"),
        // 关联表 user 别名 u 指定手机号字段（自己判断处理）
        @DataColumn(alias = "u", name = "mobile")
})
@Select("select u.* from user u")
List<User> selectTestList(IPage<User> page, Long id, @Param("name") String username);

// 测试数据权限，最终执行 SQL 语句
SELECT u.* FROM user u WHERE (u.department_id IN ('1', '2', '3', '5')) AND u.mobile LIKE '%1533%' LIMIT 1,10
```


## 表结构自动维护

- 数据库 Schema 初始化，升级 SQL 自动维护，区别于 `flyway` 支持分表库、可控制代码执行 SQL 脚本

```java
@Component
public class MysqlDdl implements IDdl {

    /**
     * 执行 SQL 脚本方式
     */
    @Override
    public List<String> getSqlFiles() {
        return Arrays.asList(
                "db/tag-schema.sql",
                "D:\\db\\tag-data.sql"
        );
    }
}

// 切换到 mysql 从库，执行 SQL 脚本
ShardingKey.change("mysqlt2");
ddlScript.run(new StringReader("DELETE FROM user;\n" +
        "INSERT INTO user (id, username, password, sex, email) VALUES\n" +
        "(20, 'Duo', '123456', 0, 'Duo@baomidou.com');"));
```


## 字段数据字典自动映射

- 数据库 `sex` 值 `0`、`1` 自动映射为 `男`、`女`

```java
@FieldDict(type = "user_sex", target = "sexText")
private Integer sex;
// 绑定显示属性，非表字典（排除）
@TableField(exist = false)
private String sexText;

```


## 字段加密解密

- 注解 `FieldEncrypt` 实现数据加解密，支持多种加密算法

```java
@FieldEncrypt
private String email;

```


## 字段脱敏

- 注解 `FieldSensitive` 实现数据脱敏，内置 `手机号`、`邮箱`、`银行卡号` 等 9 种常用脱敏规则

```java
@FieldSensitive(type = "testStrategy")
private String username;

@Configuration
public class SensitiveStrategyConfig {

    /**
     * 注入脱敏策略
     */
    @Bean
    public ISensitiveStrategy sensitiveStrategy() {
        // 自定义 testStrategy 类型脱敏处理
        return new SensitiveStrategy().addStrategy("testStrategy", t -> t + "***test***");
    }
}

```


## 数据库分库分表（读写分离）

- 配置

```xml
mybatis-mate:
  sharding:
    health: true # 健康检测
    primary: mysql # 默认选择数据源
    datasource:
      mysql: # 数据库组
        - key: node1
          ...
        - key: node2
          cluster: slave # 从库读写分离时候负责 sql 查询操作，主库 master 默认可以不写
          ...
      postgres:
        - key: node1 # 数据节点
          ...
```

- 注解 `Sharding` 切换数据源，组内节点默认随机选择（查从写主）

```java
@Mapper
@Sharding("mysql")
public interface UserMapper extends BaseMapper<User> {

    @Sharding("postgres")
    Long selectByUsername(String username);

}
```

- 切换指定数据库节点

```java
// 切换到 mysql 从库 node2 节点
ShardingKey.change("mysqlnode2");
```
