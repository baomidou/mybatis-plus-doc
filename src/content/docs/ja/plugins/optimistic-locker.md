---
title: 楽観的ロックプラグイン
sidebar:
  order: 3
---

楽観的ロックは、レコードを更新する際にそのレコードが他のトランザクションによって変更されていないことを保証するための並行制御メカニズムです。MyBatis-Plusは `OptimisticLockerInnerInterceptor` プラグインを提供しており、アプリケーションで楽観的ロックを簡単に実装できるようにします。

## 楽観的ロックの実装原理

楽観的ロックの実装は通常、以下の手順を含みます：

1. レコードを読み取る際に、現在のバージョン番号（version）を取得します。
2. レコードを更新する際に、このバージョン番号も一緒に渡します。
3. 更新操作を実行する際に、`version = newVersion` という条件を `version = oldVersion` として設定します。
4. バージョン番号が一致しない場合、更新は失敗します。

## 楽観的ロックプラグインの設定

楽観的ロックプラグインを使用するには、以下の2つの設定を行う必要があります：

### 1. プラグインの設定

#### Spring XML 方式

```xml
<bean id="optimisticLockerInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor"/>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="optimisticLockerInnerInterceptor"/>
        </list>
    </property>
</bean>
```

#### Spring Boot アノテーション方式

```java
@Configuration
@MapperScan("按需修改")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

### 2. エンティティクラスのフィールドに `@Version` アノテーションを追加

エンティティクラスでは、バージョン番号を表すフィールドに `@Version` アノテーションを追加する必要があります：

```java
import com.baomidou.mybatisplus.annotation.Version;

public class YourEntity {
    @Version
    private Integer version;
    // その他のフィールド...
}
```

## 注意事項

- サポートされているデータ型は次の通りです：`int`, `Integer`, `long`, `Long`, `Date`, `Timestamp`, `LocalDateTime`。
- 整数型の場合、`newVersion` は `oldVersion + 1` となります。
- `newVersion` は自動的にエンティティオブジェクトに書き戻されます。
- 組み込みの `updateById(entity)`、`update(entity, wrapper)`、`saveOrUpdate(entity)`、`insertOrUpdate(entity) (version >=3.5.7)` メソッドをサポートしています。
- カスタムメソッドで更新を行う場合、組み込みパラメータの条件を満たす場合も楽観的ロックロジックが実行されます。例えば、カスタムの `myUpate(entity)` は `updateById(entity)` と同等であり、パラメータを抽出して楽観的ロックの処理を行いますが、更新の実装は自身で処理する必要があります。
- `update(entity, wrapper)` メソッドでは、`wrapper` を再利用することはできません。

## サンプル

以下は、完全な Spring Boot 設定のサンプルです：

```java
@Configuration
@MapperScan("com.yourpackage.mapper")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

上記の設定とエンティティクラスへの `@Version` アノテーションの追加により、MyBatis-Plus アプリケーションで楽観的ロックを簡単に実装でき、同時更新時のデータ競合を効果的に防止できます。
