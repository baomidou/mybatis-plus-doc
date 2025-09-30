---
title: Block Attack Interceptor
sidebar:
  order: 8
---

`BlockAttackInnerInterceptor` is a security plugin provided by the MyBatis-Plus framework, specifically designed to prevent malicious full-table update and delete operations. This plugin intercepts `update` and `delete` statements to ensure these operations don't inadvertently affect entire database tables, thereby protecting data integrity and security.

## Features

- **Prevents Full-Table Updates and Deletes**: The plugin can identify and block `update` and `delete` statements that lack specified conditions, which could otherwise modify or delete all data in a table.
- **Protects Data Security**: By restricting full-table operations, it reduces the risk of data loss due to accidental mistakes or malicious attacks.

## Usage

1. **Inject the Plugin**: In a Spring Boot configuration class, inject `MybatisPlusInterceptor` into the Spring container using the `@Bean` annotation, and add `BlockAttackInnerInterceptor` as an inner interceptor.

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

2. **Configure Interception Rules**: The plugin by default intercepts `update` and `delete` statements without specified conditions. If you need to customize interception rules, refer to the MyBatis-Plus documentation for configuration details.

## Test Examples

### Full-Table Update Test

The following test example demonstrates how `BlockAttackInnerInterceptor` prevents full-table update operations.

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
        // Since no update condition is specified, the plugin will throw an exception
        // com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation
        Assertions.assertThrows(MybatisPlusException.class, () -> {
            userService.saveOrUpdate(user, null);
        });
    }
}
```

### Partial Update Test

The following test example demonstrates how to correctly perform partial update operations, which the plugin will not intercept.

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
        // Since an update condition is specified, the plugin won't intercept this operation
        userService.saveOrUpdate(user, wrapper);
    }
}
```

:::note

- **Proper Configuration**: Ensure that when configuring the plugin, you consider your project's actual requirements to avoid overly restrictive settings that might block legitimate operations.
- **Test Verification**: Thoroughly test the plugin's functionality before deploying to production to ensure it works as expected.

:::

The `BlockAttackInnerInterceptor` plugin is an important security tool provided by MyBatis-Plus. It effectively prevents full-table update and delete operations, protecting your database from accidental or malicious data destruction. By properly configuring and using this plugin, you can significantly enhance your application's data security.
