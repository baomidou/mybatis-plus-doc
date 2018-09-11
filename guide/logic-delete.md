# 逻辑删除

1.SpringBoot
-----
application.yml加入配置:
```yaml
mybatis-plus:
　global-config:
　　db-config:
　　　logic-delete-value: 1 #默认值1<br>
　　　logic-not-delete-value: 0 #默认值0<br>
```

注册Bean:<br>
```java
import com.baomidou.mybatisplus.core.injector.ISqlInjector;
import com.baomidou.mybatisplus.extension.injector.LogicSqlInjector;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PlusConfiguration {

    @Bean
    public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
    }
}
```
