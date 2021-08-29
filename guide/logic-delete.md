# 逻辑删除

::: tip 说明:
只对自动注入的sql起效:
- 插入: 不作限制
- 查找: 追加where条件过滤掉已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- 更新: 追加where条件防止更新到已删除数据,且使用 wrapper.entity 生成的where条件会忽略该字段
- 删除: 转变为 更新

例如:  
- 删除: `update user set deleted=1 where id = 1 and deleted=0`
- 查找: `select id,name,deleted from user where deleted=0`

字段类型支持说明: 
- 支持所有数据类型(推荐使用 `Integer`,`Boolean`,`LocalDateTime`)
- 如果数据库字段使用`datetime`,逻辑未删除值和已删除值支持配置为字符串`null`,另一个值支持配置为函数来获取值如`now()`

附录:
- 逻辑删除是为了方便数据恢复和保护数据本身价值等等的一种方案，但实际就是删除。
- 如果你需要频繁查出来看就不应使用逻辑删除，而是以一个状态去表示。
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
private Integer flag;
```

## 常见问题:

#### 1. 如何 insert ?
> 1. 字段在数据库定义默认值(推荐)
> 2. insert 前自己 set 值
> 3. 使用自动填充功能

#### 2. 删除接口自动填充功能失效
> 1. 使用 `update` 方法并: `UpdateWrapper.set(column, value)`(推荐)
> 2. 使用 `update` 方法并: `UpdateWrapper.setSql("column=value")`
> 3. 使用[Sql注入器](/guide/sql-injector.md)注入`com.baomidou.mybatisplus.extension.injector.methods.LogicDeleteByIdWithFill`并使用(推荐)
