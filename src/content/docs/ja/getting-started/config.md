---
title: 設定
sidebar:
  order: 3
---

MyBatis-Plus は簡単に組み込むことができ、わずかな設定だけでその強力な機能をすぐに利用できます！

:::tip
設定について説明する前に、MyBatis-Plus がインストールされていることを確認してください。まだインストールされていない場合は、[インストール](/ja/getting-started/install) の章をご覧ください。
:::

## Spring Boot プロジェクト

- MapperScan アノテーションを設定します

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

- MapperScan を設定します

  ```xml {2}
  <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
      <property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
  </bean>
  ```

- SqlSessionFactory を MyBatis-Plus の SqlSessionFactory に切り替える

  ```xml {1}
  <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  ```

通常、一般的でシンプルなプロジェクトであれば、上記の設定だけで MyBatis-Plus を問題なく利用できます。具体的には、以下のプロジェクトを参考にしてください：[Spring Boot 快速启动示例](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart)、[Spring MVC 快速启动示例](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart-springmvc)。

また、MyBatis-Plus では、さまざまな複雑さのプロジェクトに対応できるよう、豊富なカスタマイズ設定を提供しています。プロジェクトの要件に応じて、必要な設定を柔軟に利用できます。詳しい設定内容については、[リファレンス](/ja/reference/)をご参照ください。

複雑なテーブル構造に対応するため、特別な要件に応じた豊富なフィールドアノテーションも提供しています。詳細については、[アノテーション](/ja/reference/annotation/)をご参照ください。
