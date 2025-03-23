---
title: 自動フィールド補完
sidebar:
  order: 9
---

MyBatis-Plus は、データの挿入や更新時に作成日時や更新日時などの特定のフィールドを自動的に補完する便利な自動補完機能を提供しています。以下はこの機能の使用方法の詳細な説明です。

## 原理概要

自動補完機能は、`com.baomidou.mybatisplus.core.handlers.MetaObjectHandler` インターフェースを実装することで実現されます。このインターフェースを実装するクラスを作成し、その中で挿入時および更新時の補完ロジックを定義する必要があります。

## 使用手順

### 1. エンティティクラスを定義する

エンティティクラス内では、`@TableField` アノテーションを使用して自動補完が必要なフィールドを指定し、補完の戦略を設定する必要があります。

```java
public class User {
    @TableField(fill = FieldFill.INSERT)
    private String createTime;

    @TableField(fill = FieldFill.UPDATE)
    private String updateTime;

    // 他のフィールド...
}
```

### 2. MetaObjectHandler を実装する

`MetaObjectHandler` インターフェースを実装するクラスを作成し、`insertFill` および `updateFill` メソッドをオーバーライドします。

```java
// java example
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("挿入補完の開始...");
        this.strictInsertFill(metaObject, "createUserId", Long.class, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("更新補完の開始...");
        this.strictInsertFill(metaObject, "updateUserId", Long.class, 123456L)
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
    }
}
```

```kotlin
// kotlin example
@Component
class MyMetaObjectHandler : MetaObjectHandler {
    
    private val log = LoggerFactory.getLogger(MyMetaObjectHandler::class.java)
    
    // 注意将kotlin类型转为java类型请使用 xxx::class.javaObjectType，防止部分类型使用xxx::class.java转换为基本类型导致类型不一致无法填充
    override fun insertFill(metaObject: MetaObject) {
        log.info("挿入補完の開始...");
        this.strictInsertFill(metaObject, "createUserId", Long::class.javaObjectType, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

    override fun updateFill(metaObject: MetaObject) {
        log.info("更新補完の開始...");
        this.strictUpdateFill(metaObject, "updateUserId", Long::class.javaObjectType, 123456L)
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

}
```

### 3. 自動補完ハンドラーを設定する

`MyMetaObjectHandler` クラスが Spring によって管理されるようにする必要があります。これには `@Component` または `@Bean` アノテーションを使用します。

## 注意事項

- 自動補完はエンティティクラスのプロパティに直接値を設定します。
- プロパティに値がない場合、データベースに保存されるときは `null` になります。
- `MetaObjectHandler` が提供するデフォルトの処理方針は「プロパティに値がある場合は上書きしない」「補完値が `null` の場合は補完しない」です。
- フィールドには必ず `@TableField` を宣言し、`fill` 属性で補完戦略を指定する必要があります。
- 補完ハンドラーは Spring Boot において `@Component` または `@Bean` として宣言する必要があります。
- 使用 `strictInsertFill` 或 `strictUpdateFill` 方法可以根据注解 `FieldFill.xxx`、字段名和字段类型来区分填充逻辑。
- 区別する必要がない場合は、`fillStrategy` メソッドを使用できます。
- `update(T entity, Wrapper<T> updateWrapper)` の場合、`entity` が空だと自動補完が無効になります。
- `update(Wrapper<T> updateWrapper)` の場合は自動補完が実行されず、フィールド条件を手動で設定する必要があります。

## パラメーター補完の例

```java
// 挿入補完例
insertFillByCustomMethod1(H2User h2User);
insertFillByCustomMethod8(H2User[] h2Users);
insertFillByCustomMethod4(Collection<H2User> h2User);

// 更新補完例
updateFillByCustomMethod2(@Param("coll") Collection<Long> ids, @Param("et") H2User h2User);
updateFillByCustomMethod4(@Param("colls") Collection<Long> ids, @Param("et") H2User h2User);
```

## 補完できない例

```java
// メソッドのパラメーター名が補完条件を満たしていない場合、user を et に変更することで正しく補完されるようになります。
updateFillByCustomMethod3(@Param("coll") Collection<Long> ids, @Param("user") H2User h2User);
```

## FieldFill 列挙型

```java
public enum FieldFill {
    DEFAULT,       // デフォルト（処理しない）
    INSERT,        // 挿入時にフィールドを補完
    UPDATE,        // 更新時にフィールドを補完
    INSERT_UPDATE  // 挿入および更新時にフィールドを補完
}
```

以上の手順に従うことで、MyBatis-Plus において自動補完機能を簡単に実現でき、開発効率を向上させることができます。
