---
title: Block Attack Plugin
sidebar:
  order: 8
---

`BlockAttackInnerInterceptor` is a security plugin provided by the MyBatis-Plus framework, specifically designed to prevent malicious full table update and delete operations. This plugin intercepts `update` and `delete` statements, ensuring these operations do not inadvertently affect the entire data table, thus protecting data integrity and security.

## Features

- **Prevent Full Table Update/Delete**: The plugin identifies and blocks `update` and `delete` statements without specified conditions, which could lead to the modification or deletion of the entire table's data.
- **Protect Data Security**: By restricting full table operations, it reduces the risk of data loss due to accidental operations or malicious attacks.

## Usage

1. **Inject the Plugin**: In the Spring Boot configuration class, inject `MybatisPlusInterceptor` into the Spring container using the `@Bean` annotation, and add `BlockAttackInnerInterceptor` as an inner interceptor.

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
        return interceptor;
    }
}
```

2. **Configure Interception Rules**: By default, the plugin intercepts `update` and `delete` statements without specified conditions. Refer to the MyBatis-Plus documentation for custom rule configuration if needed.

## Test Examples

### Full Table Update Test

The following test example demonstrates how `BlockAttackInnerInterceptor` prevents full table update operations.

```java
@SpringBootTest
public class QueryWrapperTest {

    @Autowired
    private UserService userService;

    /**
     * SQL：UPDATE user  SET name=?,email=?;
     */
    @Test
    public void testFullUpdate() {
        User user = new User();
        user.setId(999L);
        user.setName("custom_name");
        user.setEmail("xxx@mail.com");
        // Because no update condition is specified, the plugin will throw an exception
        // com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation
        Assertions.assertThrows(MybatisPlusException.class, () -> {
            userService.saveOrUpdate(user, null);
        });
    }
}
```

### Partial Update Test

The following test example shows how to correctly perform partial update operations, which the plugin will not intercept.

```java
@SpringBootTest
public class QueryWrapperTest {

    @Autowired
    private UserService userService;

    /**
     * SQL：UPDATE user  SET name=?, email=? WHERE id = ?;
     */
    @Test
    public void testPartialUpdate() {
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(User::getId, 1);
        User user = new User();
        user.setId(10L);
        user.setName("custom_name");
        user.setEmail("xxx@mail.com");
        // Because an update condition is specified, the plugin will not intercept this operation
        userService.saveOrUpdate(user, wrapper);
    }
}
```

:::note

- **Reasonable Configuration**: Ensure the plugin configuration considers the actual project requirements to avoid restricting normal operations excessively.
- **Test Verification**: Thoroughly test the plugin's functionality before deploying it in a production environment to ensure it works as expected.

:::

The `BlockAttackInnerInterceptor` plugin is an important security tool provided by MyBatis-Plus. It effectively prevents full table update and delete operations, protecting the database from accidental or malicious data corruption. By configuring and using this plugin reasonably, you can significantly enhance the data security of your application.
