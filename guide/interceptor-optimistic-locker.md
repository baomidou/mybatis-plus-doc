# 乐观锁

## OptimisticLockerInnerInterceptor

> 当要更新一条记录的时候，希望这条记录没有被别人更新  
> 乐观锁实现方式：  
>> - 取出记录时，获取当前version  
>> - 更新时，带上这个version  
>> - 执行更新时， set version = newVersion where version = oldVersion  
>> - 如果version不对，就更新失败  

### 使用方法

字段上加上`@Version`注解

``` java
@Version
private Integer version;
```

::: tip 说明:
- **支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime**
- 整数类型下 `newVersion = oldVersion + 1`
- `newVersion` 会回写到 `entity` 中
- 仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法
- **在 `update(entity, wrapper)` 方法下, `wrapper` 不能复用!!!**
:::

示例：

```java
// Spring Boot 方式
@Configuration
@MapperScan("按需修改")
public class MybatisPlusConfig {
    /**
     * 旧版
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }
    
    /**
     * 新版
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }
}
```
