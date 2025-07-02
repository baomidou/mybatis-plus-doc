---
title: Block Full Table Update and Delete Plugin
sidebar:
  order: 8
---

`BlockAttackInnerInterceptor` is a security plugin provided by the MyBatis-Plus framework, specifically designed to prevent malicious full-table update and delete operations. By intercepting `update` and `delete` statements, this plugin ensures these operations do not inadvertently affect entire database tables, thereby safeguarding data integrity and security.

## Features

- **Prevents Full-Table Updates and Deletes**: The plugin identifies and blocks `update` and `delete` statements that lack specified conditions, which could otherwise modify or delete all data in a table.
- **Enhances Data Security**: By restricting full-table operations, it reduces the risk of data loss due to accidental or malicious actions.

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

2. **Configure Interception Rules**: By default, the plugin intercepts `update` and `delete` statements without specified conditions. For custom interception rules, refer to the MyBatis-Plus documentation.

## Test Examples

### Full-Table Update Test

The following test demonstrates how `BlockAttackInnerInterceptor` prevents full-table update operations.

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
        // Since no update condition is specified, the plugin throws an exception
        // com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation
        Assertions.assertThrows(MybatisPlusException.class, () -> {
            userService.saveOrUpdate(user, null);
        });
    }
}
```

### Partial Update Test

The following test demonstrates how to correctly perform partial updates, which the plugin will not intercept.

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
        // Since an update condition is specified, the plugin will not intercept this operation
        userService.saveOrUpdate(user, wrapper);
    }
}
```

:::note

- **Proper Configuration**: Ensure the plugin is configured according to the project's actual requirements to avoid overly restrictive settings that might hinder normal operations.
- **Testing and Validation**: Thoroughly test the plugin's functionality before deploying to production to ensure it works as expected.

:::

The `BlockAttackInnerInterceptor` plugin is a critical security tool provided by MyBatis-Plus, effectively preventing full-table update and delete operations and protecting databases from accidental or malicious data corruption. Proper configuration and use of this plugin can significantly enhance an application's data security.
