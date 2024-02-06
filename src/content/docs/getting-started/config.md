---
title: 配置
date: 2021-12-14 18:08:57
permalink: /pages/3b5af0/
article: false
---

MyBatis-Plus 的配置异常的简单，我们仅需要一些简单的配置即可使用 MyBatis-Plus 的强大功能！

::: tip
在讲解配置之前，请确保您已经安装了 MyBatis-Plus，如果您尚未安装，请查看 [安装](/pages/bab2db/) 一章。
:::

## Spring Boot 工程

- 配置 MapperScan 注解

  ```java {2}
  @SpringBootApplication
  @MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
  public class Application {

      public static void main(String[] args) {
          SpringApplication.run(Application.class, args);
      }

  }
  ```

## Spring 工程

- 配置 MapperScan

  ```xml {2}
  <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
      <property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
  </bean>
  ```

- 调整 SqlSessionFactory 为 MyBatis-Plus 的 SqlSessionFactory

  ```xml {1}
  <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  ```

通常来说，一般的简单工程，通过以上配置即可正常使用 MyBatis-Plus，具体可参考以下项目：[Spring Boot 快速启动示例](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart)、[Spring MVC 快速启动示例](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart-springmvc)。

同时 MyBatis-Plus 提供了大量的个性化配置来满足不同复杂度的工程，大家可根据自己的项目按需取用，详细配置请参考[使用配置](/pages/56bac0/)一文。

针对复杂的表结构，我们也提供了丰富的字段注解以满足大家的特殊需求，详情请参考[注解](/pages/223848/)一文。
