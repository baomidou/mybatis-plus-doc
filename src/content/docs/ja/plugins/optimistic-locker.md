---
title: 楽観ロックプラグイン
sidebar:
  order: 3
---

楽観ロックは、レコードを更新する際に、そのレコードが他のトランザクションによって変更されていないことを保証するための同時実行制御メカニズムです。MyBatis-Plus は `OptimisticLockerInnerInterceptor` プラグインを提供しており、アプリケーションでの楽観ロックの実装を容易にします。

## 楽観ロックの実装原理

楽観ロックの実装には通常、以下のステップが含まれます：

1. レコードを読み取る際に、現在のバージョン番号（version）を取得します。
2. レコードを更新する際に、このバージョン番号も一緒に渡します。
3. 更新操作を実行する際に、`version = newVersion` の条件を `version = oldVersion` に設定します。
4. バージョン番号が一致しない場合、更新は失敗します。

## 楽観ロックプラグインの設定

楽観ロックプラグインを使用するには、2つのステップで設定を行う必要があります：

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
@MapperScan("必要に応じて変更")
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

エンティティクラス内で、バージョン番号を表すフィールドに `@Version` アノテーションを追加する必要があります：

```java
import com.baomidou.mybatisplus.annotation.Version;

public class YourEntity {
    @Version
    private Integer version;
    // その他のフィールド...
}
```

## 注意事項

- サポートされているデータ型：`int`, `Integer`, `long`, `Long`, `Date`, `Timestamp`, `LocalDateTime`。
- 整数型の場合、`newVersion` は `oldVersion + 1` です。
- `newVersion` は自動的にエンティティオブジェクトに書き戻されます。
- 組み込みの `updateById(entity)`、`update(entity, wrapper)`、`saveOrUpdate(entity)`、`insertOrUpdate(entity) (version >=3.5.7)` メソッドをサポートしています。
- カスタムメソッドで更新する場合、組み込みパラメータの条件を満たせば楽観ロックのロジックも実行されます。例えば、カスタムの `myUpate(entity)` は `updateById(entity)` と同等であり、パラメータを抽出して楽観ロックを適用しますが、更新の実装は自身で行う必要があります。
- `update(entity, wrapper)` メソッドでは、`wrapper` は再利用できません。

## 例

以下は完全な Spring Boot 設定の例です：

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

上記の設定とエンティティクラスの `@Version` アノテーションにより、MyBatis-Plus アプリケーションで楽観ロックを簡単に実装し、同時更新時のデータ競合を効果的に防止できます。
