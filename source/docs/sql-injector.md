title: 注入自定义SQL
---
> 自定义注入全表删除方法  deteleAll

## 自定义 MySqlInjector 注入类 `java` 代码如下：

```java
public class MySqlInjector extends AutoSqlInjector {

	@Override
	public void inject(Configuration configuration, MapperBuilderAssistant builderAssistant, Class<?> mapperClass,
			Class<?> modelClass, TableInfo table) {
		/* 添加一个自定义方法 */
		deleteAllUser(mapperClass, modelClass, table);
	}

	public void deleteAllUser(Class<?> mapperClass, Class<?> modelClass, TableInfo table) {

		/* 执行 SQL ，动态 SQL 参考类 SqlMethod */
		String sql = "delete from " + table.getTableName();

		/* mapper 接口方法名一致 */
		String method = "deleteAll";
		SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
		this.addMappedStatement(mapperClass, method, sqlSource, SqlCommandType.DELETE, Integer.class);
	}

}
```

## 当然你的 mapper.java 接口类需要申明使用方法 deleteAll 如下

```java
public interface UserMapper extends AutoMapper<User> {

	/**
	 * 自定义注入方法
	 */
	int deleteAll();

}
```

## 最后一步注入启动

```xml
<!-- MyBatis SqlSessionFactoryBean 配置 -->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
	.....
	
  <!-- 自定义注入 deleteAll 方法  -->
  <property name="sqlInjector" ref="mySqlInjector" />
</bean>

<!-- 自定义注入器 -->
<bean id="mySqlInjector" class="com.baomidou.test.MySqlInjector" />
```

* 完成如上几步共享，注入完成！可以开始使用了。。。
