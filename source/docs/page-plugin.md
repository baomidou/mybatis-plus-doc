title: 分页插件
---
* mybatis 配置文件中配置插件 [mybatis-config.xml]

```xml
<plugins>
    <!-- 
     | 分页插件配置 
     | 插件提供二种方言选择：1、默认方言 2、自定义方言实现类，两者均未配置则抛出异常！
     | dialectType 数据库方言  
     |             默认支持  mysql  oracle  hsql  sqlite  postgre  sqlserver
     | dialectClazz 方言实现类
     |              自定义需要实现 com.baomidou.mybatisplus.plugins.pagination.IDialect 接口
     | -->
    <!-- 配置方式一、使用 MybatisPlus 提供方言实现类 -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
        <property name="dialectType" value="mysql" />
    </plugin>
    <!-- 配置方式二、使用自定义方言实现类 -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
        <property name="dialectClazz" value="xxx.dialect.XXDialect" />
    </plugin>
</plugins>
```

* UserMapper.java 方法内容

```java
/**
 * <p>
 * 查询 state 状态，用户列表，分页显示
 * </p>
 * 
 * @param page
 *            翻页对象，可以作为 xml 参数直接使用，传递参数 Page 即自动分页
 * @param state
 *            状态
 * @return
 */
List<User> selectUserList(Pagination page, Integer state);
```


* UserServiceImpl.java 调用翻页方法，需要 page.setRecords 回传给页面

```java
public Page<User> selectUserPage(Page<User> page, Integer state) {
	page.setRecords(baseMapper.selectUserList(page, state));
	return page;
}
```


* UserMapper.xml 等同于编写一个普通 list 查询，mybatis-plus 自动替你分页

```xml
<select id="selectUserList" resultType="User">
	SELECT * FROM user WHERE state=#{state}
</select>
```
