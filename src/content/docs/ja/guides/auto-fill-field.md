---
title: 自動フィールド埋め込み
sidebar:
  order: 9
---

MyBatis-Plusは、挿入または更新時に作成日時や更新日時などの特定のフィールドを自動的に埋め込むための便利な自動埋め込み機能を提供します。以下は、この機能の使用方法に関する詳細な説明です。

## 原理概要

自動埋め込み機能は、`com.baomidou.mybatisplus.core.handlers.MetaObjectHandler` インターフェースを実装することで実現されます。このインターフェースを実装するクラスを作成し、挿入時と更新時の埋め込みロジックを定義する必要があります。

## 使用方法

### 1. エンティティクラスの定義

エンティティクラスでは、`@TableField` アノテーションを使用して、自動埋め込みが必要なフィールドをマークし、埋め込み戦略を指定します。

```java
public class User {
    @TableField(fill = FieldFill.INSERT)
    private String createTime;

    @TableField(fill = FieldFill.UPDATE)
    private String updateTime;

    // その他のフィールド...
}
```

### 2. MetaObjectHandlerの実装

`MetaObjectHandler` インターフェースを実装するクラスを作成し、`insertFill` メソッドと `updateFill` メソッドをオーバーライドします。

```java
// java example
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("開始插入填充...");
        this.strictInsertFill(metaObject, "createUserId", Long.class, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("開始更新填充...");
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
    
    // 注意：Kotlinの型をJavaの型に変換するには、xxx::class.javaObjectTypeを使用してください。一部の型がxxx::class.javaを使用して基本型に変換され、型が一致せず埋め込みができないことを防ぎます。
    override fun insertFill(metaObject: MetaObject) {
        log.info("開始插入填充...");
        this.strictInsertFill(metaObject, "createUserId", Long::class.javaObjectType, 123456L)
        this.strictInsertFill(metaObject, "createTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

    override fun updateFill(metaObject: MetaObject) {
        log.info("開始更新填充...");
        this.strictUpdateFill(metaObject, "updateUserId", Long::class.javaObjectType, 123456L)
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime::class.javaObjectType, LocalDateTime.now())
    }

}
```
### 3. 自動埋め込みハンドラーの設定

`MyMetaObjectHandler` クラスが Spring によって管理されていることを確認してください。`@Component` または `@Bean` アノテーションを使用して実現できます。

## 注意事項

- 自動埋め込みは、エンティティクラスのプロパティに直接値を設定します。
- プロパティに値がない場合、データベースに保存される際は `null` になります。
- `MetaObjectHandler` が提供するデフォルトのメソッド戦略は次の通りです：プロパティに値がある場合は上書きせず、埋め込み値が `null` の場合は埋め込みません。
- フィールドには `@TableField` アノテーションを宣言し、`fill` 属性を設定して埋め込み戦略を選択する必要があります。
- 埋め込みハンドラーは Spring Boot で `@Component` または `@Bean` として宣言する必要があります。
- `strictInsertFill` または `strictUpdateFill` メソッドを使用すると、アノテーション `FieldFill.xxx`、フィールド名、フィールドタイプに基づいて埋め込みロジックを区別できます。
- 区別が必要ない場合は、`fillStrategy` メソッドを使用できます。
- `update(T entity, Wrapper<T> updateWrapper)` を使用する場合、`entity` を null にすることはできません。そうしないと自動埋め込みが機能しません。
- `update(Wrapper<T> updateWrapper)` を使用する場合、自動埋め込みは行われず、フィールド条件を手動で割り当てる必要があります。

## パラメータ埋め込みの例

```java
// 挿入埋め込みの例
insertFillByCustomMethod1(H2User h2User);
insertFillByCustomMethod8(H2User[] h2Users);
insertFillByCustomMethod4(Collection<H2User> h2User);

// 更新埋め込みの例
updateFillByCustomMethod2(@Param("coll") Collection<Long> ids, @Param("et") H2User h2User);
updateFillByCustomMethod4(@Param("colls") Collection<Long> ids, @Param("et") H2User h2User);
```

## 埋め込みができない例

```java
// メソッドパラメータ名が埋め込み条件を満たしていません。user を et に変更する必要があります
updateFillByCustomMethod3(@Param("coll") Collection<Long> ids, @Param("user") H2User h2User);
```

## FieldFill 列挙型

```java
public enum FieldFill {
    DEFAULT,       // デフォルトでは処理しない
    INSERT,        // 挿入時にフィールドを埋め込む
    UPDATE,        // 更新時にフィールドを埋め込む
    INSERT_UPDATE  // 挿入時と更新時にフィールドを埋め込む
}
```

以上の手順に従うことで、MyBatis-Plus で自動埋め込み機能を簡単に実装し、開発効率を向上させることができます。
