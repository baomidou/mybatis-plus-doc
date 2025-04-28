---
title: Configuration
sidebar:
  order: 3
---

Integrating MyBatis-Plus is very simple. We only need some basic configuration to leverage the powerful features of MyBatis-Plus!

:::tip
Before discussing configuration, please ensure that you have installed MyBatis-Plus. If you haven't installed it yet, please refer to the [Install](/getting-started/install) chapter.
:::

## Spring Boot Application

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

## Spring Application

- Configure MapperScan

  ```xml {2}
  <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
      <property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
  </bean>
  ```

- Adjust SqlSessionFactory to MyBatis-Plus's SqlSessionFactory

  ```xml {1}
  <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  ```

Typically, for simple projects, the configurations above are sufficient to use MyBatis-Plus normally. For specific examples, refer to the following projects: [Spring Boot Quick Start Sample](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart), [Spring MVC Quick Start Sample](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart-springmvc).

Additionally, MyBatis-Plus provides numerous personalized configurations to meet the needs of projects with varying complexities. You can choose them according to your project requirements. For detailed configuration, please refer to the [Using Configuration](/en/reference/) article.

For complex table structures, we also offer a rich set of field annotations to meet your special needs. For details, please refer to the [Annotations](/en/reference/annotation/) article.
