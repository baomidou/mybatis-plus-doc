# 逻辑删除

SpringBoot 配置方式：

- application.yml 加入配置:

  ```yaml
  mybatis-plus:
    global-config:
      db-config:
        logic-delete-value: 1 # 逻辑已删除值(默认为 1)
        logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
  ```

- 注册 Bean：

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
