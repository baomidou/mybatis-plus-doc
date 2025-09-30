---
title: 設定
sidebar:
  order: 3
---

MyBatis-Plus の統合は非常に簡単で、いくつかの簡単な設定だけで MyBatis-Plus の強力な機能を使用できます！

:::tip
設定の説明の前に、MyBatis-Plus が既にインストールされていることを確認してください。まだインストールしていない場合は、[インストール](/getting-started/install)の章を参照してください。
:::

## Spring Boot プロジェクト

- MapperScan アノテーションの設定

  ```java {2}
  @SpringBootApplication
  @MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
  public class Application {

      public static void main(String[] args) {
          SpringApplication.run(Application.class, args);
      }

  }
  ```

## Spring プロジェクト

- MapperScan の設定

  ```xml {2}
  <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
      <property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
  </bean>
  ```

- SqlSessionFactory を MyBatis-Plus の SqlSessionFactory に変更

  ```xml {1}
  <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  ```

通常、一般的なシンプルなプロジェクトでは、上記の設定で MyBatis-Plus を正常に使用できます。詳細は以下のプロジェクトを参照してください：[Spring Boot クイックスタートサンプル](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart)、[Spring MVC クイックスタートサンプル](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart-springmvc)。

また、MyBatis-Plus はさまざまな複雑さのプロジェクトに対応するために、多数のカスタマイズ設定を提供しています。プロジェクトに応じて必要に応じて設定してください。詳細な設定については、[設定の使用](/reference/)を参照してください。

複雑なテーブル構造に対しては、特殊なニーズを満たすための豊富なフィールドアノテーションも提供しています。詳細については、[アノテーション](/reference/annotation/)を参照してください。
