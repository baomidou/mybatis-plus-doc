---
title: 全テーブル更新・削除防止プラグイン
sidebar:
  order: 8
---

`BlockAttackInnerInterceptor` は MyBatis-Plus フレームワークが提供するセキュリティプラグインで、悪意のある全テーブル更新および削除操作を防止するために特別に設計されています。このプラグインは `update` および `delete` ステートメントをインターセプトし、これらの操作が意図せずにデータテーブル全体に影響を与えないようにすることで、データの完全性と安全性を保護します。

## 機能特性

- **全テーブル更新・削除の防止**: 条件を指定しない `update` および `delete` ステートメントを識別してブロックし、テーブルデータ全体が変更または削除されるのを防ぎます。
- **データセキュリティの保護**: 全テーブル操作を制限することで、誤操作や悪意のある攻撃によるデータ損失のリスクを軽減します。

## 使用方法

1. **プラグインの注入**: Spring Boot の設定クラスで、`@Bean` アノテーションを使用して `MybatisPlusInterceptor` を Spring コンテナに注入し、`BlockAttackInnerInterceptor` を内部インターセプターとして追加します。

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

2. **インターセプトルールの設定**: プラグインはデフォルトで条件を指定しない `update` および `delete` ステートメントをインターセプトします。カスタムのインターセプトルールが必要な場合は、MyBatis-Plus のドキュメントを参照して設定してください。

## テスト例

### 全テーブル更新テスト

以下のテスト例は、`BlockAttackInnerInterceptor` を使用して全テーブル更新操作を防止する方法を示しています。

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
        // 更新条件が指定されていないため、プラグインは例外をスローします
        // com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation
        Assertions.assertThrows(MybatisPlusException.class, () -> {
            userService.saveOrUpdate(user, null);
        });
    }
}
```

### 部分更新テスト

以下のテスト例は、部分更新操作を正しく実行する方法を示しており、プラグインはこのような操作をインターセプトしません。

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
        // 更新条件が指定されているため、プラグインはこの操作をインターセプトしません
        userService.saveOrUpdate(user, wrapper);
    }
}
```

:::note

- **適切な設定**: プラグインを設定する際は、プロジェクトの実際のニーズを考慮し、通常の操作が妨げられないように過度な制限を避けてください。
- **テスト検証**: 本番環境にデプロイする前に、プラグインの機能を十分にテストし、期待通りに動作することを確認してください。

:::

`BlockAttackInnerInterceptor` プラグインは、MyBatis-Plus が提供する重要なセキュリティツールであり、全テーブル更新および削除操作を効果的に防止し、データベースを予期せぬまたは悪意のあるデータ破壊から保護します。このプラグインを適切に設定して使用することで、アプリケーションのデータセキュリティを大幅に向上させることができます。
