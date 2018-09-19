# 乐观锁插件

## 主要适用场景

意图： 

当要更新一条记录的时候，希望这条记录没有被别人更新

乐观锁实现方式：
* 取出记录时，获取当前version
* 更新时，带上这个version
* 执行更新时， set version = newVersion where version = oldVersion
* 如果version不对，就更新失败

**乐观锁配置需要2步 记得两步**

## 1.插件配置
spring xml:
```xml
<bean class="com.baomidou.mybatisplus.extension.plugins.OptimisticLockerInterceptor"/>
```
spring boot:
``` java
@Bean
public OptimisticLockerInterceptor optimisticLockerInterceptor() {
    return new OptimisticLockerInterceptor();
}
```

## 2.注解实体字段 `@Version` 必须要!
``` java
@Version
private Integer version;
```

::: tip 特别说明:
- **支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime**
- 整数类型下 `newVersion = oldVersion + 1`
- `newVersion` 会回写到 `entity` 中
- 仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法
- **在 `update(entity, wrapper)` 方法下, `wrapper` 不能复用!!!**
:::
 



## 示例

示例Java代码（参考[test case](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-optimistic-locker)代码）

``` java
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

```sql
update tbl_user set name = 'update',version = 3 where id = 100 and version = 2
```

