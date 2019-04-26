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

- ~~注册 Bean~~(3.1.1开始不再需要这一步)：

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
  删除时 update user set deleted=1 where id =1 and deleted=0
  查找时 select * from user where deleted=0
  ```
  
::: tip 附件说明
- 逻辑删除是为了方便数据恢复和保护数据本身价值等等的一种方案，但实际就是删除。
- 如果你需要再查出来就不应使用逻辑删除，而是以一个状态去表示。

如： 员工离职，账号被锁定等都应该是一个状态字段，此种场景不应使用逻辑删除。

- 若确需查找删除数据，如老板需要查看历史所有数据的统计汇总信息，请单独手写sql。
:::
