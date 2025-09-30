---
title: Configuration
sidebar:
  order: 3
---

Integrating MyBatis-Plus is incredibly simple! With just a few basic configuration steps, you can start leveraging the powerful features of MyBatis-Plus.

:::tip
Before we dive into the configuration, please make sure you have installed MyBatis-Plus. If you haven't installed it yet, please refer to the [Installation](/getting-started/install) chapter.
:::

## Spring Boot Project

- Configure the MapperScan annotation

  ```java {2}
  @SpringBootApplication
  @MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
  public class Application {

      public static void main(String[] args) {
          SpringApplication.run(Application.class, args);
      }

  }
  ```

## Spring Project

- Configure MapperScan

  ```xml {2}
  <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
      <property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
  </bean>
  ```

- Change SqlSessionFactory to MyBatis-Plus's SqlSessionFactory

  ```xml {1}
  <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  ```

Typically, for most simple projects, the configurations above are sufficient to start using MyBatis-Plus normally. You can refer to the following sample projects for details: [Spring Boot Quick Start Sample](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart), [Spring MVC Quick Start Sample](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart-springmvc).

Additionally, MyBatis-Plus offers a wide range of customizable configurations to meet the needs of projects with varying complexity. You can select the configurations you need based on your project requirements. For detailed configuration options, please refer to the [Configuration Reference](/reference/) article.

For complex table structures, we also provide comprehensive field annotations to meet your specific needs. For more information, please see the [Annotations](/reference/annotation/) article.
