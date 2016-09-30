title: 通用CRUD方法
---
通过代码生成器，可生成Entity层、Mapper层、Service层、Service实现层以及Mapper对应的XML文件，通用Mapper和通用Service通过集成的方式以及集成了单表CRUD的大部分方法，能够满足各类型的开发~

# 参数说明

```java 插入一条记录
insert(T entity)

参数：entity 需要插入的实体类
返回值：boolean 成功与否
描述：插入entity实体
```

```java 选择性插入一条记录
insertSelective(T entity)

参数：entity 需要插入的实体类
返回值：boolean 成功与否
描述：null字段不插入
```

```java 批量插入
insertBatch(List<T> entityList)

参数：entityList 需要插入的实体类集合
返回值：boolean 成功与否
描述：推荐批量操作的时候使用对应的批量操作，for循环性能很低的。注意！该方法不适合 Oracle！
```

```java 删除一条记录
deleteById(PK id)

参数：id 需要删除数据的主键ID
返回值：boolean 成功与否
描述：根据id删除数据
```

```java 根据自定义Map来进行删除
deleteByMap(Map<String, Object> columnMap)

参数：columnMap 自定义Map作为删除条件
返回值：boolean 成功与否
描述：比如 columnMap.put("name", "zhangsan")，删除的时候将会去删除name为zhangsan的数据。
```

```java 根据实体类选择性删除
deleteSelective(T entity)

参数：entity Entity的属性值作为删除条件
返回值：boolean 成功与否
描述：比如 entity.setName("zhangsan")，删除的时候将会去删除name为zhangsan的数据。
```

```java 批量删除
deleteBatchIds(List<PK> idList)

参数：idList 需要删除数据的ID集合
返回值：boolean 成功与否
描述：根据idList集合进行批量删除
```

```java 通过ID更新数据
updateById(T entity)

参数：entity 需要更新的实体类
返回值：boolean 成功与否
描述：通过ID更新entity
```

```java 通过ID选择性更新数据
updateSelectiveById(T entity)

参数：entity 需要更新的实体类
返回值：boolean 成功与否
描述：null字段不更新
```

```java 通过实体类构造where条件进行更新
update(T entity, T whereEntity)

参数：entity 需要更新的实体类 whereEntity 条件实体
返回值：boolean 成功与否
描述：比如 whereEntity.setName("zhangsan")，查找name为zhangsan的数据进行更新，更新的内容是entity中的数据
```

```java 通过实体类构造where条件进行选择性更新
updateSelective(T entity, T whereEntity)

参数：entity 需要更新的实体类 whereEntity 条件实体
返回值：boolean 成功与否
描述：null字段不更新
```

```java 通过ID批量更新
updateBatchById(List<T> entityList)

参数：entityList 需要更新的实体类集合
返回值：boolean 成功与否
描述：通过entityList实体集合批量更新数据
```

```java 通过ID查询一条数据
selectById(PK id)

参数：id 主键ID
返回值：T 封装后的实体
描述：根据ID查询数据
```

```java 通过ID批量查询
selectBatchIds(List<PK> idList)

参数：idList 需要查询的ID集合
返回值：List<T> 查询到的数据集合
描述：通过idList集合批量查询
```

```java 根据自定义Map来进行查询
selectByMap(Map<String, Object> columnMap)

参数：columnMap 自定义Map作为where条件
返回值：List<T> 查询到的数据集合
描述：通过自定义Map进行查询
```

```java 根据entity条件，查询一条记录
selectOne(T entity)

参数：entity 查询条件实体对象
返回值：T 封装后的实体
描述：比如 entity.setName("zhangsan")，将会去查询name为zhangsan的数据。
```

``` 根据entity条件，查询总记录数
selectCount(T entity)

参数：entity 查询条件实体对象
返回值：int 数值
描述：通过entity构造条件进行统计查询
```

```java 根据entityWrapper进行查询
selectList(EntityWrapper<T> entityWrapper)

参数：entityWrapper 实体包装类（主要用于构建查询条件）
返回值：List<T> 查询到的实体集合
描述：entityWrapper请详看查询条件构造器EntityWrapper文档。
```

```java 翻页查询
selectPage(Page<T> page, EntityWrapper<T> entityWrapper)

参数：page 分页对象 entityWrapper 实体包装类（主要用于构建查询条件）
返回值：Page<T> 返回Page对象
描述：page请详看分页插件文档，entityWrapper请详看条件构造器EntityWrapper文档。
selectPage查询后，将会把查询到的数据set进Page的records属性中，而其他的分页相关的代码也会set进对应的属性。
```

如果需要示例，请参考源码中Test中的相应示例，[点此去查看](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/mysql/UserMapperTest.java)。
