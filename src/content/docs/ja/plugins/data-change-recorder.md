---
title: データ変更記録プラグイン
sidebar:
  order: 6
---

データベース操作において、データ変更の記録と操作のセキュリティ制御は非常に重要です。MyBatis-Plus は、データ変更記録プラグイン `DataChangeRecorderInnerInterceptor` を提供しています。これは、操作ログを自動的に記録し、さらに一括更新・削除のセキュリティ閾値制御をサポートします。

## プラグイン概要

`DataChangeRecorderInnerInterceptor` は MyBatis-Plus が提供するインターセプターであり、データベース操作を実行する際に自動的にデータ変更を記録し、設定されたセキュリティ閾値に基づいて操作を制御できます。例えば、一度の一括更新または削除のレコード数を 1000 件以下に制限するなどです。

`DataChangeRecorderInnerInterceptor` の使用方法をより深く理解するために、公式が提供するテストケースを参照できます：

- 👉 [testOptLocker4WrapperIsNull](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserTest.java)

このテストケースは、プラグインを使用してデータ変更記録とセキュリティ制御を行う方法を示しています。

## 使用方法

### インターセプターの設定

Spring Boot の設定クラスで、`DataChangeRecorderInnerInterceptor` をインターセプターチェーンに追加し、必要に応じてセキュリティ閾値を設定します：

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
        // セキュリティ閾値を設定し、一括更新または削除のレコード数を 1000 件以下に制限します
        dataChangeRecorderInnerInterceptor.setBatchUpdateLimit(1000).openBatchUpdateLimitation();
        interceptor.addInnerInterceptor(dataChangeRecorderInnerInterceptor);
        return interceptor;
    }
}
```

この例では、一括更新または削除のセキュリティ閾値を 1000 レコードに設定しています。

### プラグインの使用

プラグインを設定した後、MyBatis-Plus を介して操作を実行すると、プラグインは自動的にデータ変更を記録し、セキュリティ制御を実行します：

一括更新または削除操作を実行する際、操作するレコード数が設定されたセキュリティ閾値を超えた場合、プラグインは例外をスローします。

## 注意事項

- 安全でない一括操作を防ぐために、インターセプターを設定する際に適切なセキュリティ閾値を設定してください。
- プラグインは自動的にデータ変更を記録しますが、ログ記録のロジックは自分で実装する必要があります。
- プラグインを設定および使用する際には、データベースのパフォーマンスと操作の実際の要件を考慮してください。

`DataChangeRecorderInnerInterceptor` は強力なツールであり、データ変更の自動記録と操作のセキュリティ制御に役立ちます。適切な設定により、データベース操作の安全性とデータの整合性を確保できます。使用する際には、システムの安全性と安定性を確保するために、ベストプラクティスに従うことを忘れないでください。
