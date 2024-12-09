---
title: 多数据源支持
sidebar:
  order: 14
---

随着项目规模的扩大，单一数据源已无法满足复杂业务需求，多数据源（动态数据源）应运而生。本文将介绍两种 MyBatis-Plus 的多数据源扩展插件：开源生态的 `dynamic-datasource` 和 企业级生态的 `mybatis-mate`。

## dynamic-datasource

`dynamic-datasource` 是一个开源的 Spring Boot 多数据源启动器，提供了丰富的功能，包括数据源分组、敏感信息加密、独立初始化表结构等。

### 特性

- **数据源分组**：适用于多种场景，如读写分离、一主多从等。
- **敏感信息加密**：使用 `ENC()` 加密数据库配置信息。
- **独立初始化**：支持每个数据库独立初始化表结构和数据库。
- **自定义注解**：支持自定义注解，需继承 `DS`。
- **简化集成**：提供对 Druid、HikariCP 等连接池的快速集成。
- **组件集成**：支持 Mybatis-Plus、Quartz 等组件的集成方案。
- **动态数据源**：支持项目启动后动态增加或移除数据源。
- **分布式事务**：提供基于 Seata 的分布式事务方案。

### 约定

- 本框架专注于数据源切换，不限制具体操作。
- 配置文件中以下划线 `_` 分割的数据源首部为组名。
- 切换数据源可以是组名或具体数据源名。
- 默认数据源名为 `master`，可通过 `spring.datasource.dynamic.primary` 修改。
- 方法上的注解优先于类上的注解。

### 使用方法

1. **引入依赖**：
  - SpringBoot2
  ```xml
  <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>${version}</version>
  </dependency>
  ```

 - SpringBoot3
 ```xml
 <dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>dynamic-datasource-spring-boot3-starter</artifactId>
  <version>${version}</version>
 </dependency>
 ```  

2. **配置数据源**：

```yaml
spring:
  datasource:
    dynamic:
      primary: master
      strict: false
      datasource:
        master:
          url: jdbc:mysql://xx.xx.xx.xx:3306/dynamic
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
        slave_1:
          url: jdbc:mysql://xx.xx.xx.xx:3307/dynamic
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
        slave_2:
          url: ENC(xxxxx)
          username: ENC(xxxxx)
          password: ENC(xxxxx)
          driver-class-name: com.mysql.jdbc.Driver
```

3. **使用 `@DS` 切换数据源**：

```java
@Service
@DS("slave")
public class UserServiceImpl implements UserService {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  @DS("slave_1")
  public List selectByCondition() {
    return jdbcTemplate.queryForList("select * from user where age >10");
  }
}
```

更多使用教程请参考[Dynamic-Datasource 官网](https://github.com/baomidou/dynamic-datasource)

## mybatis-mate

`mybatis-mate` 是一个 MyBatis-Plus 的付费企业组件，内置很多好用的高级特性，其中包括多数据源扩展组件，提供了高效简单的多数据源支持。

### 特性

- **注解 `@Sharding`**：支持通过注解切换数据源。
- **配置**：支持灵活的数据源配置。
- **动态加载卸载**：支持动态加载和卸载数据源。
- **多数据源事务**：支持 JTA Atomikos 分布式事务。

### 使用方法

1. **配置数据源**：

```xml
mybatis-mate:
  sharding:
    primary: mysql
    datasource:
      mysql:
        - key: node1
          ...
        - key: node2
          cluster: slave
          ...
      postgres:
        - key: node1
          ...
```

2. **使用 `@Sharding` 切换数据源**：

```java
@Mapper
@Sharding("mysql")
public interface UserMapper extends BaseMapper<User> {

    @Sharding("postgres")
    Long selectByUsername(String username);

}
```

3. **切换指定数据库节点**：

```java
// 切换到 mysql 从库 node2 节点
ShardingKey.change("mysqlnode2");
```

更多使用示例请参考

- 多数据源动态加载卸载：👉 [mybatis-mate-sharding-dynamic](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-dynamic)

- 多数据源事务（jta atomikos）：👉 [mybatis-mate-sharding-jta-atomikos](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-jta-atomikos)

通过上述介绍，我们可以看到 `dynamic-datasource` 和 `mybatis-mate` 都提供了强大的多数据源支持，开发者可以根据项目需求选择合适的插件来实现数据源的灵活管理。
