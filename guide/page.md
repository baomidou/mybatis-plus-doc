# 分页插件

示例工程：

👉 [mybatis-plus-sample-pagination](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-pagination)


```xml
<!-- spring xml 方式 -->
<plugins>
    <plugin interceptor="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
        <property name="sqlParser" ref="自定义解析类、可以没有" />
        <property name="dialectClazz" value="自定义方言类、可以没有" />
    </plugin>
</plugins>
```

```java
//Spring boot方式
@EnableTransactionManagement
@Configuration
@MapperScan("com.baomidou.cloud.service.*.mapper*")
public class MybatisPlusConfig {

    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}

```

# XML 自定义分页

- UserMapper.java 方法内容

```java
public interface UserMapper{//可以继承或者不继承BaseMapper
    /**
     * <p>
     * 查询 : 根据state状态查询用户列表，分页显示
     * 注意!!: 如果入参是有多个,需要加注解指定参数名才能在xml中取值
     * </p>
     *
     * @param page 翻页对象，可以作为 xml 参数直接使用，传递参数 Page 即自动分页,必须放在第一位
     * @param state 状态
     * @return
     */
    IPage<User> selectPageVo(Page page, @Param("state") Integer state);
}
```

- UserMapper.xml 等同于编写一个普通 list 查询，mybatis-plus 自动替你分页

```xml
<select id="selectPageVo" resultType="com.baomidou.cloud.entity.UserVo">
    SELECT id,name FROM user WHERE state=#{state}
</select>
```

- UserServiceImpl.java 调用翻页方法，需要 page.setRecords 回传给页面

```java
public IPage<User> selectUserPage(Page<User> page, Integer state) {
    // 不进行 count sql 优化，解决 MP 无法自动优化 SQL 问题，这时候你需要自己查询 count 部分
    // page.setOptimizeCountSql(false);
    // 当 total 为 null 或者大于 0 分页插件不在查询总数
    // page.setTotal(0);
    // 注意！！ 分页 total 是经过插件自动 回写 到传入 page 对象
    return userMapper.selectPageVo(page, state));
}
```

