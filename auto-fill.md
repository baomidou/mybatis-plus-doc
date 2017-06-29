# 公共字段自动填充

- 实现元对象处理器接口： com.baomidou.mybatisplus.mapper.IMetaObjectHandler

- 注解填充字段 @TableField(.. fill = FieldFill.INSERT) 生成器策略部分也可以配置！
```java
public class User {

    // 注意！这里需要标记为填充字段
    @TableField(.. fill = FieldFill.INSERT)
    private String fillField;

    ....
}

```


- 自定义实现类 MyMetaObjectHandler

```java
/**  自定义填充公共 name 字段  */
public class MyMetaObjectHandler extends MetaObjectHandler {

    /**
     * 测试 user 表 name 字段为空自动填充
     */
    public void insertFill(MetaObject metaObject) {
        // 更多查看源码测试用例
        System.out.println("*************************");
        System.out.println("insert fill");
        System.out.println("*************************");

        // 测试下划线
        Object testType = getFieldValByName("testType", metaObject);//mybatis-plus版本2.0.9+
        System.out.println("testType=" + testType);
        if (testType == null) {
            setFieldValByName("testType", 3, metaObject);//mybatis-plus版本2.0.9+
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        //更新填充
        System.out.println("*************************");
        System.out.println("update fill");
        System.out.println("*************************");
        //mybatis-plus版本2.0.9+
        setFieldValByName("lastUpdatedDt", new Timestamp(System.currentTimeMillis()), metaObject);
    }
}

```

!> 特别说明：** 一点要注解填充字段，查看文档问题部分！ **

> spring 启动注入 MyMetaObjectHandler 配置

```xml
<!-- MyBatis SqlSessionFactoryBean 配置 -->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
    <property name="globalConfig" ref="globalConfig"></property>
</bean>
<bean id="globalConfig" class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
    <!-- 公共字段填充处理器 -->
    <property name="metaObjectHandler" ref="myMetaObjectHandler" />
</bean>
<!-- 自定义处理器 -->
<bean id="myMetaObjectHandler" class="com.baomidou.test.MyMetaObjectHandler" />
```
