title: 公共字段自动填充
---
# 公共字段字段填充

* 实现元对象处理器接口： com.baomidou.mybatisplus.mapper.IMetaObjectHandler

* 自定义实现类 MyMetaObjectHandler

```java
/**  自定义填充公共 name 字段  */
public class MyMetaObjectHandler implements IMetaObjectHandler {

	/**
	 * 测试 user 表 name 字段为空自动填充
	 */
	public void insertFill(MetaObject metaObject) {
		Object name = metaObject.getValue("name");
		if (null == name) {
			metaObject.setValue("name", "instert-fill");
		}
	}

}
```

* spring 启动注入 MyMetaObjectHandler 配置

```xml
<!-- MyBatis SqlSessionFactoryBean 配置 -->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
	....

    <!-- 公共字段填充处理器 -->
    <property name="metaObjectHandler" ref="myMetaObjectHandler" />
</bean>

<!-- 自定义处理器 -->
<bean id="myMetaObjectHandler" class="com.baomidou.test.MyMetaObjectHandler" />
```

