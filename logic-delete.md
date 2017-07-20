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


##全局配置注入LogicSqlInjector
Java Config方式：
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

XML配置方式：

```xml
<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
	<property name="sqlInjector" ref="logicSqlInjector" />
	<property name="logicDeleteValue" value="-1" />
	<property name="logicNotDeleteValue" value="1" />
	<property name="idType" value="2" />
</bean>

<bean id="logicSqlInjector" class="com.baomidou.mybatisplus.mapper.LogicSqlInjector" />
```

## 逻辑删除效果
> 会在mp自带查询和更新方法的sql后面，追加『逻辑删除字段』=『LogicNotDeleteValue默认值』