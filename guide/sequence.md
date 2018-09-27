# Sequence主键

实体主键支持Sequence

- oracle等数据库主键策略配置Sequence

* GlobalConfiguration配置KeyGenerator

```java
  GlobalConfiguration gc = new GlobalConfiguration();
  gc.setKeyGenerator(new OracleKeyGenerator());
```

* mybatis-plus-boot-starter[配置参考](/config)

```java

@Bean
public OracleKeyGenerator oracleKeyGenerator(){
  return new OracleKeyGenerator();
}

```

* 实体类配置主键Sequence,指定主键@TableId(type=IdType.INPUT)//不能使用AUTO

```java
@TableName("TEST_SEQUSER")
@KeySequence("SEQ_TEST")//类注解
public class TestSequser{
  @TableId(value = "ID", type = IdType.INPUT)
  private Long id;

}
```

* 支持父类定义@KeySequence, 子类使用，这样就可以几个表共用一个Sequence

```java
@KeySequence("SEQ_TEST")
public abstract class Parent{

}

public class Child extends Parent{

}
```

以上步骤就可以使用Sequence当主键了。

Spring MVC：xml配置，请参考【[安装集成](/install)】


## 如何使用Sequence作为主键，但是实体主键类型是String
也就是说，表的主键是varchar2, 但是需要从sequence中取值

* 1.实体定义@KeySequence 注解clazz指定类型String.class
* 2.实体定义主键的类型String
```java
@KeySequence(value = "SEQ_ORACLE_STRING_KEY", clazz = String.class)
public class YourEntity{
    
    @TableId(value = "ID_STR", type = IdType.INPUT)
    private String idStr;
    ...
}
```
* 3.正常配置GlobalConfiguration.keyGenerator
```java
@Bean
public GlobalConfiguration globalConfiguration() {
    GlobalConfiguration conf = new GlobalConfiguration();
    conf.setKeyGenerator(new OracleKeyGenerator());
    return conf;
}
```
