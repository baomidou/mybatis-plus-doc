# Configuration

Configuration for MyBatis-Plus is so easy, we just need a few configurations so that can have powerful functions. 

::: tip
Make sure you have installed MP. If not, please refer to [Install](install.md)
:::

- Spring Boot Structure：

  - Configure MapperScan Annotation

    ```java {2}
    @SpringBootApplication
    @MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
    public class Application {

        public static void main(String[] args) {
            SpringApplication.run(QuickStartApplication.class, args);
        }

    }
    ```

- Spring MVC Structure：

  - Configure `MapperScan` in application.xml

    ```xml {2}
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
    </bean>
    ```

  - Change SqlSessionFactory to `MybatisSqlSessionFactoryBean` of MP

    ```xml {1}
    <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    ```

General speaking, for general projects, we can use MP just for configurations above. You also can refer to [Spring Boot Quick Start](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart)

BTW, MP provides a lot of customized configurations to meet different needs. Refer to [Configurations](../config/README.md) 