---
title: Configuration
sidebar:
  order: 3
---

Integrating MyBatis-Plus is extremely simple! We only need some basic configuration to utilize the powerful features of MyBatis-Plus.

:::tip
Before diving into the configuration, please ensure you have installed MyBatis-Plus. If you haven't installed it yet, refer to the [Installation](/getting-started/install) chapter.
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

- Adjust SqlSessionFactory to MyBatis-Plus's SqlSessionFactory

  ```xml {1}
  <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
      <property name="dataSource" ref="dataSource"/>
  </bean>
  ```

Generally, for simple projects, the above configurations are sufficient to use MyBatis-Plus normally. You can refer to the following sample projects: [Spring Boot Quick Start Example](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart), [Spring MVC Quick Start Example](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart-springmvc).

Additionally, MyBatis-Plus provides extensive customization options to meet the needs of projects with varying complexity. You can select configurations as needed for your project. For detailed configurations, refer to the [Configuration Reference](/reference/) article.

For complex table structures, we also offer a rich set of field annotations to address special requirements. For details, refer to the [Annotations](/reference/annotation/) article.
