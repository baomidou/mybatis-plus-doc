---
title: 防全表更新与删除插件
sidebar:
  order: 8
---

`BlockAttackInnerInterceptor` 是 MyBatis-Plus 框架提供的一个安全插件，专门用于防止恶意的全表更新和删除操作。该插件通过拦截 `update` 和 `delete` 语句，确保这些操作不会无意中影响到整个数据表，从而保护数据的完整性和安全性。

## 功能特性

- **阻止全表更新删除**：插件能够识别并阻止没有指定条件的 `update` 和 `delete` 语句，这些语句可能会导致全表数据被修改或删除。
- **保护数据安全**：通过限制全表操作，减少因误操作或恶意攻击导致的数据丢失风险。

## 使用方法

1. **注入插件**：在 Spring Boot 配置类中，通过 `@Bean` 注解将 `MybatisPlusInterceptor` 注入到 Spring 容器中，并添加 `BlockAttackInnerInterceptor` 作为内部拦截器。

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

2. **配置拦截规则**：插件默认拦截没有指定条件的 `update` 和 `delete` 语句。如果需要自定义拦截规则，可以参考 MyBatis-Plus 的文档进行配置。

## 测试示例

### 全表更新测试

以下测试示例展示了如何使用 `BlockAttackInnerInterceptor` 来防止全表更新操作。

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
        // 由于没有指定更新条件，插件将抛出异常
        // com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation
        Assertions.assertThrows(MybatisPlusException.class, () -> {
            userService.saveOrUpdate(user, null);
        });
    }
}
```

### 部分更新测试

以下测试示例展示了如何正确地执行部分更新操作，插件不会对此类操作进行拦截。

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
        // 由于指定了更新条件，插件不会拦截此操作
        userService.saveOrUpdate(user, wrapper);
    }
}
```

:::note

- **合理配置**：确保在配置插件时，考虑到项目的实际需求，避免过度限制导致正常操作受阻。
- **测试验证**：在生产环境部署前，应充分测试插件的功能，确保其按预期工作。

:::

`BlockAttackInnerInterceptor` 插件是 MyBatis-Plus 提供的一个重要的安全工具，它能够有效地防止全表更新和删除操作，保护数据库免受意外或恶意的数据破坏。通过合理配置和使用该插件，可以显著提高应用程序的数据安全性。
