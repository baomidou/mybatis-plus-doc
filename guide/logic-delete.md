# 逻辑删除

SpringBoot 配置方式：

- application.yml 加入配置(如果你的默认值和mp默认的一样,该配置可无):

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

- 实体类字段上加上`@TableLogic`注解

  ``` java
  @TableLogic
  private Integer deleted;
  ```
  
  - 效果: 使用mp自带方法删除和查找都会附带逻辑删除功能 (自己写的xml不会)

  ``` sql
  example
  删除时 update user set deleted=1 where id =1
  查找时 select * from user where deleted=1
  ```
