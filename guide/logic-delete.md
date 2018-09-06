# 逻辑删除

1.SpringBoot
-----
application.yml加入配置:

mybatis-plus:<br>
　global-config:<br>
　　db-config:<br>
　　　logic-delete-value: 1 #默认值1<br>
　　　logic-not-delete-value: 0 #默认值0<br>


注册Bean:<br>

import com.baomidou.mybatisplus.core.injector.ISqlInjector;<br>
import com.baomidou.mybatisplus.extension.injector.LogicSqlInjector;<br>
import org.springframework.context.annotation.Bean;<br>
import org.springframework.context.annotation.Configuration;<br>

@Configuration<br>
public class PlusConfiguration {

    @Bean
    public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
    }
}
