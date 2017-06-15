# 逻辑删除

## 开启配置

```xml
1、修改 集成  全局注入器为  LogicSqlInjector
2、全局注入值：
logicDeleteValue  // 逻辑删除全局值
logicNotDeleteValue // 逻辑未删除全局值

3、逻辑删除的字段需要注解  @TableLogic
```
[Mybatis-Plus逻辑删除视频教程](http://v.youku.com/v_show/id_XMjc4ODY0MDI5Ng==.html?spm=a2hzp.8244740.userfeed.5!2~5~5~5!3~5~A)


## Spring boot 参考配置
```java
    @Bean
    public GlobalConfiguration globalConfiguration() {
        GlobalConfiguration conf = new GlobalConfiguration(new LogicSqlInjector());
        conf.setLogicDeleteValue("-1");
        conf.setLogicNotDeleteValue("1");
        conf.setIdType(2);
        return conf;
    }
```

```java
    @Bean("mybatisSqlSession")
    public SqlSessionFactory sqlSessionFactory(GlobalConfiguration globalConfiguration) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        ...//其他配置：比如数据源等
        sqlSessionFactory.setGlobalConfig(globalConfiguration);
        return sqlSessionFactory.getObject();
    }
```

## 逻辑删除效果
> 会在mp自带查询和更新方法的sql后面，追加<逻辑删除字段>=<LogicNotDeleteValue默认值>