# 关于多数据源，使用 Spring AbstractRoutingDataSource 实现

>  第一步：扩展Spring的AbstractRoutingDataSource抽象类，实现动态数据源。
AbstractRoutingDataSource中的抽象方法determineCurrentLookupKey是实现数据源的route的核心，这里对该方法进行Override。
【上下文DbContextHolder为一线程安全的ThreadLocal】具体代码如下：

```java
public class DynamicDataSource extends AbstractRoutingDataSource {

/**
 * 取得当前使用哪个数据源
 * @return
 */
@Override
protected Object determineCurrentLookupKey() {
    return DbContextHolder.getDbType();
}
}

public class DbContextHolder {
private static final ThreadLocal contextHolder = new ThreadLocal<>();

/**
 * 设置数据源
 * @param dbTypeEnum
 */
public static void setDbType(DBTypeEnum dbTypeEnum) {
    contextHolder.set(dbTypeEnum.getValue());
}

/**
 * 取得当前数据源
 * @return
 */
public static String getDbType() {
    return contextHolder.get();
}

/**
 * 清除上下文数据
 */
public static void clearDbType() {
    contextHolder.remove();
}
}

public enum DBTypeEnum {
one("dataSource_one"), two("dataSource_two");
private String value;

DBTypeEnum(String value) {
    this.value = value;
}

public String getValue() {
    return value;
}
}
```

> 第二步：配置动态数据源将DynamicDataSource Bean加入到Spring的上下文xml配置文件中去，同时配置DynamicDataSource的targetDataSources(多数据源目标)属性的Map映射。 代码如下【我省略了dataSource_one和dataSource_two的配置】：

```xml
<bean id="dataSource" class="com.miyzh.dataclone.db.DynamicDataSource">
    <property name="targetDataSources">
        <map key-type="java.lang.String">
            <entry key="dataSource_one" value-ref="dataSource_one" />
            <entry key="dataSource_two" value-ref="dataSource_two" />
        </map>
    </property>
    <property name="defaultTargetDataSource" ref="dataSource_two" />
</bean>
```

> 第三步：使用动态数据源：DynamicDataSource是继承与AbstractRoutingDataSource，而AbstractRoutingDataSource又是继承于org.springframework.jdbc.datasource.AbstractDataSource，AbstractDataSource实现了统一的DataSource接口，所以DynamicDataSource同样可以当一个DataSource使用。

```java
@Test 
public void test() {
DbContextHolder.setDbType(DBTypeEnum.one);
List userList = iUserService.selectList(new EntityWrapper());
for (User user : userList) {
log.debug(user.getId() + "#" + user.getName() + "#" + user.getAge());
}

    DbContextHolder.setDbType(DBTypeEnum.two);
    List<IdsUser> idsUserList = iIdsUserService.selectList(new EntityWrapper<IdsUser>());
    for (IdsUser idsUser : idsUserList) {
        log.debug(idsUser.getMobile() + "#" + idsUser.getUserName());
    }
}  
```

!> 说明：
- 1、事务管理：使用动态数据源的时候，可以看出和使用单数据源的时候相比，在使用配置上几乎没有差别，在进行性事务管理配置的时候也没有差别：
- 2、通过扩展Spring的AbstractRoutingDataSource可以很好的实现多数据源的rout效果，而且对扩展更多的数据源有良好的伸缩性，只要增加数据源和修改DynamicDataSource的targetDataSources属性配置就好。在数据源选择控制上，可以采用手动控制(业务逻辑并不多的时候)，也可以很好的用AOP的@Aspect在Service的入口加入一个切面@Pointcut，在@Before里判断JoinPoint的类容选定特定的数据源。

