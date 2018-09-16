# 逻辑删除

SpringBoot 配置方式：

- 1.application.yml 加入配置(如果你的默认值和mp默认的一样,该配置可无):

  ```yaml
  mybatis-plus:
    global-config:
      db-config:
        logic-delete-value: 1 # 逻辑已删除值(默认为 1)
        logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
  ```

- 2.注册 Bean：

  ```java
  import com.baomidou.mybatisplus.core.injector.ISqlInjector;
  import com.baomidou.mybatisplus.extension.injector.LogicSqlInjector;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;

  @Configuration
  public class MyBatisPlusConfiguration {

      @Bean
      public ISqlInjector sqlInjector() {
          return new LogicSqlInjector();
      }
  }
  ```

- 3.实体类字段上加上`@TableLogic`注解

  ``` java
  @TableLogic
  private Integer deleted;
  ```