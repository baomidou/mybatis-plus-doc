# 热加载

`3.0.6`版本上移除了该功能,不过最新快照版已加回来并打上废弃标识,`3.1.0`版本上已完全移除

> 开启动态加载 mapper.xml

- 多数据源配置多个 MybatisMapperRefresh 启动 bean
- 默认情况下,eclipse保存会自动编译,idea需自己手动编译一次

```
参数说明：
      sqlSessionFactory:session工厂
      mapperLocations:mapper匹配路径
      enabled:是否开启动态加载  默认:false
      delaySeconds:项目启动延迟加载时间  单位：秒  默认:10s
      sleepSeconds:刷新时间间隔  单位：秒 默认:20s
  提供了两个构造,挑选一个配置进入spring配置文件即可：

构造1:
    <bean class="com.baomidou.mybatisplus.spring.MybatisMapperRefresh">
        <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
        <constructor-arg name="mapperLocations" value="classpath*:mybatis/mappers/*/*.xml"/>
        <constructor-arg name="enabled" value="true"/>
    </bean>

构造2:
    <bean class="com.baomidou.mybatisplus.spring.MybatisMapperRefresh">
        <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"/>
        <constructor-arg name="mapperLocations" value="classpath*:mybatis/mappers/*/*.xml"/>
        <constructor-arg name="delaySeconds" value="10"/>
        <constructor-arg name="sleepSeconds" value="20"/>
        <constructor-arg name="enabled" value="true"/>
    </bean>
```


