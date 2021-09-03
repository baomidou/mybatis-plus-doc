# 企业高级特性

::: tip

mybatis-mate 为 mp 企业级模块，旨在更敏捷优雅处理数据。

- mybatis-mate 示例 ：[传送门](https://gitee.com/baomidou/mybatis-mate-examples)

:::


## 数据审计（对账）

👉 [mybatis-mate-audit](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-audit)

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

👉 [mybatis-mate-dict](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-dict)

- 注解 @DataScope

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| type | String | 否 | "" | 范围类型，用于区分对于业务分类，默认空 |
| value | DataColumn[] | 否 | {} | 数据权限字段，支持多字段组合 |
| ignore | boolean | 否 | false | 忽略权限处理逻辑 true 是 false 否 |

- 注解 @DataColumn

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| alias | String | 否 | "" | 关联表别名 |
| name | String | 是 |  | 字段名 |


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

::: warning 关于`IDataScopeProvider`的说明:
请注意必须注入IDataScopeProvider实现类处理数据权限，关于数据传参支持2种方式：
1，自定义 mapper 方法通过方法参数传递，在 setWhere 方法 `Object[] args` 参数中获取
2，利用 ThreadLocal 传递参数，你可以拦截 controller 层或者 service 层设置数据权限处理参数，更多可以👉[参考](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-dynamic-tablename)
:::


## 表结构自动维护

👉 [mybatis-mate-ddl-mysql](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-ddl-mysql)
👉 [mybatis-mate-ddl-postgres](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-ddl-postgres)

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


## 字段数据绑定（字典回写）

👉 [mybatis-mate-dict](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-dict)

- 注解 @FieldBind

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| sharding | String | 否 | "" | 分库分表数据源指定 |
| type | String | 是 | | 类型（用于区分不同业务） |
| target | String | 是 | | 目标显示属性（待绑定属性，注意非数据库字段请排除） |


- 数据库 `sex` 值 `0`、`1` 自动映射为 `男`、`女`
- 可以绑定映射为对象，例如：根据订单ID 映射 订单对象或者编号

```java
@FieldBind(type = "user_sex", target = "sexText")
private Integer sex;
// 绑定显示属性，非表字典（排除）
@TableField(exist = false)
private String sexText;

```

- 绑定业务处理类需要实现 IDataBind 接口，注入 spring 容器

```java
@Component
public class DataBind implements IDataBind {
  ...
}
```

## 字段加密解密

👉 [mybatis-mate-encrypt](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-encrypt)

- 注解 @FieldEncrypt

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| password | String | 否 | "" | 加密密码 |
| algorithm | Algorithm | 否 | PBEWithMD5AndDES | PBE MD5 DES 混合算法 |
| encryptor | Class | 否 | IEncryptor | 加密处理器 |


- 算法 Algorithm

| 算法 | 描述 |
| :-: | :-: |
| MD5_32 | 32 位 md5 算法 |
| MD5_16 | 16 位 md5 算法 |
| AES | AES 对称算法 |
| SM4 | 国密 SM4 算法 |
| PBEWithMD5AndDES | 混合算法 |
| PBEWithMD5AndTripleDES | 混合算法 |
| PBEWithHMACSHA512AndAES_256 | 混合算法 |
| PBEWithSHA1AndDESede | 混合算法 |
| PBEWithSHA1AndRC2_40 | 混合算法 |

::: warning
MD5 算法为不可逆算法，存储数据库及查询结果都是密文
SM4 算法必须依赖 bouncycastle 加密库
混合算法必须依赖 jasypt 加密库
:::

- 注解 `FieldEncrypt` 实现数据加解密，支持多种加密算法

```java
@FieldEncrypt
private String email;

```


## 字段脱敏

👉 [mybatis-mate-sensitive-jackson](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sensitive-jackson)

- 注解 @FieldSensitive

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| type | String | 是 | "" | 脱敏类型 |

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

👉 [mybatis-mate-sharding](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding)

- 注解 @Sharding

| 属性 | 类型 | 必须指定 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- |
| value | String | 是 | "" | 分库组名，空使用默认主数据源 |
| strategy | Class | 否 | RandomShardingStrategy | 分库&分表策略 |


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
