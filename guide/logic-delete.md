# 逻辑删除

::: tip 效果:
只对自动注入的sql起效:
- insert 的不作限制
- select 的会追加条件过滤掉已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- update 的也会追加条件防止更新到已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- deleted 会转变为 update
:::

## 使用方法：

### 步骤1: 配置`com.baomidou.mybatisplus.core.config.GlobalConfig$DbConfig`

- 例: application.yml
```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag  # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

### 步骤2: 实体类字段上加上`@TableLogic`注解

``` java
@TableLogic
private Integer deleted;
```

::: tip 说明:
- 字段支持所有数据类型(推荐使用 `Integer`,`Boolean`,`LocalDateTime`)
- 如果使用`LocalDateTime`,建议逻辑未删除值设置为字符串`null`,逻辑删除值只支持数据库函数例如`now()`
:::
  
- 效果: 使用mp自带方法删除和查找都会附带逻辑删除功能 (自己写的xml不会)

``` sql
example
删除 update user set deleted=1 where id =1 and deleted=0
查找 select * from user where deleted=0
```
  
- 全局逻辑删除: since 3.3.0

  如果公司代码比较规范，比如统一了全局都是flag为逻辑删除字段。
  
  使用此配置则不需要在实体类上添加 @TableLogic。
  
  但如果实体类上有 @TableLogic 则以实体上的为准，忽略全局。  即先查找注解再查找全局，都没有则此表没有逻辑删除。

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag  #全局逻辑删除字段值
```
  
  
::: tip 附件说明
- 逻辑删除是为了方便数据恢复和保护数据本身价值等等的一种方案，但实际就是删除。
- 如果你需要再查出来就不应使用逻辑删除，而是以一个状态去表示。

如： 员工离职，账号被锁定等都应该是一个状态字段，此种场景不应使用逻辑删除。

- 若确需查找删除数据，如老板需要查看历史所有数据的统计汇总信息，请单独手写sql。
:::

## 常见问题:

#### 如何 insert ?
> 1. 字段在数据库定义默认值(推荐)
> 2. insert 前自己 set 值
> 3. 使用自动填充功能

