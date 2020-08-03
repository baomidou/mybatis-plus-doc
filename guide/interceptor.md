# 内置插件(since 3.3.3(暂未发布正式版))

## 主体
> MybatisPlusInterceptor

### 子体
- 分页插件: PaginationInnerInterceptor
- 多租户插件: TenantLineInnerInterceptor
- 动态表名插件: DynamicTableNameInnerInterceptor
- 乐观锁插件: OptimisticLockerInnerInterceptor
- sql性能规范插件: IllegalSQLInnerInterceptor
- 防止全表更新与删除插件: BlockAttackInnerInterceptor

::: tip 注意:
新提供的插件不得和同功能的旧插件一同使用
:::

### 使用方式(以分页插件举例)

#### spring-mvc
``` xml
<!-- spring xml 方式 -->
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

#### spring-boot
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

::: tip 注意:
如果内部插件都是使用,需要注意顺序关系,建议使用如下顺序
- 多租户插件,动态表名插件
- 分页插件,乐观锁插件
- sql性能规范插件,防止全表更新与删除插件

总结: 对sql进行单次改造的优先放入,不对sql进行改造的最后放入
:::

### 各插件详解 todo