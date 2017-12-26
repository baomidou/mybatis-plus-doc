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


## 全局配置注入LogicSqlInjector
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

## 逻辑删除实体

```java

@TableName("tbl_user")
public class UserLogicDelete {
    
    private Long id;
    ...
    
    @TableField(value = "delete_flag")
    @TableLogic
    private Integer deleteFlag;
}
```

## 逻辑删除效果
> 会在mp自带查询和更新方法的sql后面，追加『逻辑删除字段』=『LogicNotDeleteValue默认值』
> 删除方法: deleteById()和其他delete方法, 底层SQL调用的是update tbl_xxx set 『逻辑删除字段』=『logicDeleteValue默认值』


## Spring Boot mp-starter配置参考
[application.yml](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/dev/src/main/resources/application.yml)
```yaml
mybatis-plus:
  mapper-locations: classpath:/mapper/*Mapper.xml
  #实体扫描，多个package用逗号或者分号分隔
  typeAliasesPackage: com.baomidou.springboot.entity
  typeEnumsPackage: com.baomidou.springboot.entity.enums
  global-config:
    #主键类型  0:"数据库ID自增", 1:"用户输入ID",2:"全局唯一ID (数字类型唯一ID)", 3:"全局唯一ID UUID";
    id-type: 2
    #字段策略 0:"忽略判断",1:"非 NULL 判断"),2:"非空判断"
    field-strategy: 2
    db-column-underline: true
    #逻辑删除配置
    logic-delete-value: 0
    logic-not-delete-value: 1
    sql-injector: com.baomidou.mybatisplus.mapper.LogicSqlInjector

```