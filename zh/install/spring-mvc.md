# SpringMVC方式

> 配置使用

* <a href="https://yangyang0507.gitbooks.io/mybatis-plus-doc/content/zh/intro/dependency.html">依赖导入，查看依赖说明</a>

> spring 配置

```
<!-- MyBatis SqlSessionFactoryBean 配置 -->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
	<property name="dataSource" ref="dataSource" />
	<property name="configLocation" value="classpath:xml/mybatis-config.xml" />
	<property name="typeAliasesPackage" value="xxx.entity" />
	<property name="mapperLocations" value="classpath:com/xx/mapper/xml/*Mapper.xml" />
    <property name="plugins">
        <array>
            <!-- 分页插件配置 -->
            <bean id="paginationInterceptor" class="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
		        <property name="dialectType" value="mysql" />
		    </bean>
        </array>
    </property>
    <!-- oracle 添加
    <property name="dbType" value="oracle" />
    -->
    <!-- 全局表为下划线命名设置 true
    <property name="dbColumnUnderline" value="true" />
    -->
</bean>

<!-- 加载 mapper.xml 接口 配置文件 -->
<bean id="mapperScannerConfigurer" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
	<property name="basePackage" value="xxx.mapper" />
</bean>
```

