# 乐观锁插件

##主要使用场景：

意图： 

当要更新一条记录的时候，希望这条记录没有被别人更新

乐观锁实现方式：
* 取出记录时，获取当前version
* 更新时，带上这个version
* 执行更新时， set version = yourVersion+1 where version = yourVersion
* 如果version不对，就更新失败

**乐观锁配置需要2步 记得两步**

## 1.插件配置
spring xml
```xml
<bean class="com.baomidou.mybatisplus.plugins.OptimisticLockerInterceptor"/>
```
spring boot
```java
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }
```

## 2.注解实体字段 `@Version` 必须要！
```java
public class User {

    @Version
    private Integer version;

    ...
}
```

!> 特别说明： **仅支持int,Integer,long,Long,Date,Timestamp


##示例

示例Java代码（参考[test case](https://gitee.com/baomidou/mybatis-plus/blob/2.x/mybatis-plus-core/src/test/java/com/baomidou/mybatisplus/test/h2/H2UserExtendsTest.java)代码）

```java
int id = 100;
int version = 2;

User u = new User();
u.setId(id);
u.setVersion(version);
u.setXXX(xxx);

if(userService.updateById(u)){
    System.out.println("Update successfully");
}else{
    System.out.println("Update failed due to modified by others");
}

```

示例SQL原理

```text
update tbl_user set name='update',version=3 where id=100 and version=2;
```

