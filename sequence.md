# Sequence主键

实体主键支持Sequence @since 2.0.8

- oracle主键策略配置Sequence

* GlobalConfiguration配置KeyGenerator

```java
  GlobalConfiguration gc = new GlobalConfiguration();
  //gc.setDbType("oracle");//不需要这么配置了
  gc.setKeyGenerator(new OracleKeyGenerator());
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

* 支持父类定义@KeySequence, 子类使用

```java
@KeySequence("SEQ_TEST")
public abstract class Parent{

}

public class Child extends Parent{

}
```

以上步骤就可以使用Sequence当主键了。

Spring MVC：xml配置，请参考【[安装集成](/install)】