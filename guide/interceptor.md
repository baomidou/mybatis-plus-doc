# 内置插件(since 3.3.3(暂未发布正式版))

主体插件: MybatisPlusInterceptor  
该插件内部插件集:

- 分页插件: PaginationInnerInterceptor
- 多租户插件: TenantLineInnerInterceptor
- 动态表名插件: DynamicTableNameInnerInterceptor
- 乐观锁插件: OptimisticLockerInnerInterceptor
- sql性能规范插件: IllegalSQLInnerInterceptor
- 防止全表更新与删除插件: BlockAttackInnerInterceptor

::: tip 注意:
新提供的插件不得和同功能的旧插件一同使用
:::

## 使用方式(以分页插件举例)

### spring-mvc
``` xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <!-- 其他属性 略 --> 
    <property name="configuration" ref="configuration"/>
    <property name="plugins">
        <array>
            <ref bean="mybatisPlusInterceptor"/>
        </array>
    </property>
</bean>

<bean id="configuration" class="com.baomidou.mybatisplus.core.MybatisConfiguration">
    <!-- 需配置该值为false,避免1或2级缓存可能出现问题,该属性会在旧插件移除后一同移除 -->
    <property name="useDeprecatedExecutor" value="false"/>
</bean>

<bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="interceptors">
        <list>
            <ref bean="paginationInnerInterceptor"/>
        </list>
    </property>
</bean>

<bean id="paginationInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor">
    <!-- 对于单一数据库类型来说,都建议配置该值,避免每次分页都去抓取数据库类型 -->
    <constructor-arg name="dbType" value="H2"/>
</bean>
```

### spring-boot
``` java
@Configuration
@MapperScan("scan.your.mapper.package")
public class MybatisPlusConfig {

    /**
     * 新的分页插件,一缓和二缓遵循mybatis的规则,需要设置 MybatisConfiguration#useDeprecatedExecutor = false 避免缓存出现问题(该属性会在旧插件移除后一同移除)
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }

    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration -> configuration.setUseDeprecatedExecutor(false);
    }
}
```

### mybatis-config.xml

```xml
<plugins>
  <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
    <property name="@page" value="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
    <property name="page:dbType" value="h2"/>
  </plugin>
</plugins>
```

> property 的配置说明详见 `MybatisPlusInterceptor#setProperties` 的源码方法注释

::: tip 注意:
如果内部插件都是使用,需要注意顺序关系,建议使用如下顺序
- 多租户插件,动态表名插件
- 分页插件,乐观锁插件
- sql性能规范插件,防止全表更新与删除插件

总结: 对sql进行单次改造的优先放入,不对sql进行改造的最后放入
:::

## 分页插件: PaginationInnerInterceptor

### 属性介绍

| 属性名 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: |
| overflow | boolean | false | 溢出总页数后是否进行处理(默认不处理,参见 `插件#continuePage` 方法) |
| maxLimit | Long |  | 单页分页条数限制(默认无限制,参见 `插件#handlerLimit` 方法) |
| dbType | DbType |  | 数据库类型(根据类型获取应使用的分页方言,参见 `插件#findIDialect` 方法) |
| dialect | IDialect |  | 方言实现类(参见 `插件#findIDialect` 方法) |

> 建议单一数据库类型的均设置 dbType

### 自定义的 mapper#method 使用分页

``` java
IPage<User> selectPageVo(IPage<?> page, Integer state);
// or
List<User> selectPageVo(IPage<User> page, Integer state);
```

```xml
<select id="selectPageVo" resultType="com.baomidou.cloud.entity.UserVo">
    SELECT id,name FROM user WHERE state=#{state}
</select>
```

> 如果返回类型是 IPage 则入参的 IPage 不能为null,因为 返回的IPage == 入参的IPage  
> 如果返回类型是 List 则入参的 IPage 可以为 null(为 null 则不分页),但需要你手动 入参的IPage.setRecords(返回的 List);  
> 如果 xml 需要从 page 里取值,需要 `page.属性` 获取


## 多租户插件: TenantLineInnerInterceptor

### 属性介绍

| 属性名 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: |
| tenantLineHandler | TenantLineHandler |  | 租户处理器（ TenantId 行级 ） |

```java
public interface TenantLineHandler {

    /**
     * 获取租户 ID 值表达式，只支持单个 ID 值
     * <p>
     *
     * @return 租户 ID 值表达式
     */
    Expression getTenantId();

    /**
     * 获取租户字段名
     * <p>
     * 默认字段名叫: tenant_id
     *
     * @return 租户字段名
     */
    default String getTenantIdColumn() {
        return "tenant_id";
    }

    /**
     * 根据表名判断是否忽略拼接多租户条件
     * <p>
     * 默认都要进行解析并拼接多租户条件
     *
     * @param tableName 表名
     * @return 是否忽略, true:表示忽略，false:需要解析并拼接多租户条件
     */
    default boolean ignoreTable(String tableName) {
        return false;
    }
}
```

::: tip 说明:
多租户 != 权限过滤,不要乱用,租户之间是完全隔离的!!!  
启用多租户后所有执行的method的sql都会进行处理.  
自写的sql请按规范书写(sql涉及到多个表的每个表都要给别名,特别是 inner join 的要写标准的 inner join)
:::


## 相关注解 @InterceptorIgnore

| 属性名 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: |
| tenantLine | String | "" | 行级租户 |
| dynamicTableName | String | "" | 动态表名 |
| blockAttack | String | "" | 攻击 SQL 阻断解析器,防止全表更新与删除 |
| illegalSql | String | "" | 垃圾SQL拦截 |

> 各属性代表对应的插件  
> 各属性不给值则默认为false  
> 更多说明详见源码注释