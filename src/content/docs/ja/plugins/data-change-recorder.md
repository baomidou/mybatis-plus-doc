---
title: データ変更記録プラグイン
sidebar:
  order: 6
---

データベース操作において、データの変更を記録し、操作の安全性を制御することは非常に重要です。MyBatis-Plusはデータ変更記録プラグイン `DataChangeRecorderInnerInterceptor` を提供しており、操作ログの自動記録が可能で、一括更新または削除の安全閾値制御もサポートしています。

## プラグイン概要

`DataChangeRecorderInnerInterceptor` は MyBatis-Plus が提供するインターセプターで、データベース操作実行時にデータ変更を自動記録し、設定された安全閾値に基づいて操作を制御できます。例えば、一度の一括更新または削除のレコード数を1000件以下に制限することが可能です。

`DataChangeRecorderInnerInterceptor` の使用方法をより理解するために、公式が提供するテストケースを参照できます：

- 👉 [testOptLocker4WrapperIsNull](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserTest.java)

このテストケースは、プラグインを使用したデータ変更記録と安全制御の方法を示しています。

## 使用方法

### インターセプターの設定

Spring Boot の設定クラスで、`DataChangeRecorderInnerInterceptor` をインターセプターチェーンに追加し、必要に応じて安全閾値を設定します：

```java
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.DataChangeRecorderInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        DataChangeRecorderInnerInterceptor dataChangeRecorderInnerInterceptor = new DataChangeRecorderInnerInterceptor();
        // 安全閾値を設定し、一括更新または削除のレコード数を1000件以下に制限
        dataChangeRecorderInnerInterceptor.setBatchUpdateLimit(1000).openBatchUpdateLimitation();
        interceptor.addInnerInterceptor(dataChangeRecorderInnerInterceptor);
        return interceptor;
    }
}
```

この例では、一括更新または削除の安全閾値を1000レコードに設定しています。

### プラグインの使用

プラグインを設定した後、MyBatis-Plus を通じて操作を実行すると、プラグインは自動的にデータ変更を記録し、安全制御を実行します：

一括更新または削除操作を実行する際、操作対象のレコード数が設定された安全閾値を超える場合、プラグインは例外をスローします。

## 注意事項

- 安全でない一括操作を防ぐため、インターセプター設定時に適切な安全閾値を設定してください。
- プラグインはデータ変更を自動記録しますが、ログ記録のロジックは自身で実装する必要があります。
- プラグインの設定と使用時には、データベースのパフォーマンスと操作の実際のニーズを考慮してください。

`DataChangeRecorderInnerInterceptor` は強力なツールであり、データ変更の自動記録と操作の安全性制御を支援します。適切に設定することで、データベース操作の安全性とデータの完全性を確保できます。使用時にはベストプラクティスに従い、システムの安全性と安定性を確保するようにしてください。
