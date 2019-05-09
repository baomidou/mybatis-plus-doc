---
sidebarDepth: 3
---

# CRUD 接口

## Mapper CRUD 接口

::: tip 说明:
- 通用 CRUD 封装[BaseMapper](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/mapper/BaseMapper.java)接口，为 `Mybatis-Plus` 启动时自动解析实体表关系映射转换为 `Mybatis` 内部对象注入容器
- 泛型 `T` 为任意实体对象
- 参数 `Serializable` 为任意类型主键 `Mybatis-Plus` 不推荐使用复合主键约定每一张表都有自己的唯一 `id` 主键
- 对象 `Wrapper` 为 [条件构造器](./wrapper.html) 
:::

### insert
``` java
/**
 * <p>
 * 插入一条记录
 * </p>
 *
 * @param entity 实体对象
 * @return 插入成功记录数
 */
int insert(T entity);
```

### deleteById
``` java
/**
 * <p>
 * 根据 ID 删除
 * </p>
 *
 * @param id 主键ID
 * @return 删除成功记录数
 */
int deleteById(Serializable id);
```

### deleteByMap
``` java
/**
 * <p>
 * 根据 columnMap 条件，删除记录
 * </p>
 *
 * @param columnMap 表字段 map 对象
 * @return 删除成功记录数
 */
int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);
```

### delete
``` java
/**
 * <p>
 * 根据 entity 条件，删除记录
 * </p>
 *
 * @param wrapper 实体对象封装操作类（可以为 null）
 * @return 删除成功记录数
 */
int delete(@Param(Constants.WRAPPER) Wrapper<T> wrapper);
```

### deleteBatchIds
``` java
/**
 * <p>
 * 删除（根据ID 批量删除）
 * </p>
 *
 * @param idList 主键ID列表(不能为 null 以及 empty)
 * @return 删除成功记录数
 */
int deleteBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);
```

### updateById
``` java
/**
 * <p>
 * 根据 ID 修改
 * </p>
 *
 * @param entity 实体对象
 * @return 修改成功记录数
 */
int updateById(@Param(Constants.ENTITY) T entity);
```

### update
``` java
/**
 * <p>
 * 根据 whereEntity 条件，更新记录
 * </p>
 *
 * @param entity        实体对象 (set 条件值,可为 null)
 * @param updateWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
 * @return 修改成功记录数
 */
int update(@Param(Constants.ENTITY) T entity, @Param(Constants.WRAPPER) Wrapper<T> updateWrapper);
```

### selectById
``` java
/**
 * <p>
 * 根据 ID 查询
 * </p>
 *
 * @param id 主键ID
 * @return 实体
 */
T selectById(Serializable id);
```

### selectBatchIds
``` java
/**
 * <p>
 * 查询（根据ID 批量查询）
 * </p>
 *
 * @param idList 主键ID列表(不能为 null 以及 empty)
 * @return 实体集合
 */
List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);
```

### selectByMap
``` java
/**
 * <p>
 * 查询（根据 columnMap 条件）
 * </p>
 *
 * @param columnMap 表字段 map 对象
 * @return 实体集合
 */
List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

```

### selectOne
``` java
/**
 * <p>
 * 根据 entity 条件，查询一条记录
 * </p>
 *
 * @param queryWrapper 实体对象
 * @return 实体
 */
T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### selectCount
``` java
/**
 * <p>
 * 根据 Wrapper 条件，查询总记录数
 * </p>
 *
 * @param queryWrapper 实体对象
 * @return 满足条件记录数
 */
Integer selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### selectList
``` java
/**
 * <p>
 * 根据 entity 条件，查询全部记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类（可以为 null）
 * @return 实体集合
 */
List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### selectMaps
``` java
/**
 * <p>
 * 根据 Wrapper 条件，查询全部记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类（可以为 null）
 * @return 字段映射对象 Map 集合
 */
List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### selectObjs
``` java
/**
 * <p>
 * 根据 Wrapper 条件，查询全部记录
 * 注意： 只返回第一个字段的值
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类（可以为 null）
 * @return 字段映射对象集合
 */
List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### selectPage
``` java
/**
 * <p>
 * 根据 entity 条件，查询全部记录（并翻页）
 * </p>
 *
 * @param page         分页查询条件（可以为 RowBounds.DEFAULT）
 * @param queryWrapper 实体对象封装操作类（可以为 null）
 * @return 实体分页对象
 */
IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### selectMapsPage
``` java
/**
 * <p>
 * 根据 Wrapper 条件，查询全部记录（并翻页）
 * </p>
 *
 * @param page         分页查询条件
 * @param queryWrapper 实体对象封装操作类
 * @return 字段映射对象 Map 分页对象
 */
IPage<Map<String, Object>> selectMapsPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

## Service CRUD 接口

::: tip 说明:
- 通用 Service CRUD 封装[IService](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/service/IService.java)接口，进一步封装 CRUD 采用 `get 查询单行` `remove 删除` `list 查询集合` `page 分页` 前缀命名方式区分 `Mapper` 层避免混淆，
- 泛型 `T` 为任意实体对象
- 建议如果存在自定义通用 Service 方法的可能，请创建自己的 `IBaseService` 继承 `Mybatis-Plus` 提供的基类
- 对象 `Wrapper` 为 [条件构造器](./wrapper.html) 
:::

### save
``` java
/**
 * <p>
 * 插入一条记录（选择字段，策略插入）
 * </p>
 *
 * @param entity 实体对象
 */
boolean save(T entity);
```

### saveBatch
``` java
/**
 * 插入（批量）
 *
 * @param entityList 实体对象集合
 * @param batchSize  插入批次数量
 */
boolean saveBatch(Collection<T> entityList);
```

### saveBatch
``` java
/**
 * 插入（批量）
 * 
 * @param entityList 实体对象集合
 * @param batchSize  插入批次数量
 */
boolean saveBatch(Collection<T> entityList, int batchSize);
```

### saveOrUpdateBatch
``` java
/**
 * <p>
 * 批量修改插入
 * </p>
 *
 * @param entityList 实体对象集合
 */
boolean saveOrUpdateBatch(Collection<T> entityList);
```

### saveOrUpdateBatch
``` java
/**
 * <p>
 * 批量修改插入
 * </p>
 *
 * @param entityList 实体对象集合
 * @param batchSize  每次的数量
 */
boolean saveOrUpdateBatch(Collection<T> entityList, int batchSize);
```

### removeById
``` java
/**
 * <p>
 * 根据 ID 删除
 * </p>
 *
 * @param id 主键ID
 */
boolean removeById(Serializable id);
```

### removeByMap
``` java
/**
 * <p>
 * 根据 columnMap 条件，删除记录
 * </p>
 *
 * @param columnMap 表字段 map 对象
 */
boolean removeByMap(Map<String, Object> columnMap);
```

### remove
``` java
/**
 * <p>
 * 根据 entity 条件，删除记录
 * </p>
 *
 * @param queryWrapper 实体包装类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
boolean remove(Wrapper<T> queryWrapper);
```

### removeByIds
``` java
/**
 * <p>
 * 删除（根据ID 批量删除）
 * </p>
 *
 * @param idList 主键ID列表
 */
boolean removeByIds(Collection<? extends Serializable> idList);
```

### updateById
``` java
/**
 * <p>
 * 根据 ID 选择修改
 * </p>
 *
 * @param entity 实体对象
 */
boolean updateById(T entity);
```

### update
``` java
/**
 * <p>
 * 根据 whereEntity 条件，更新记录
 * </p>
 *
 * @param entity        实体对象
 * @param updateWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper}
 */
boolean update(T entity, Wrapper<T> updateWrapper);
```

### updateBatchById
``` java
/**
 * <p>
 * 根据ID 批量更新
 * </p>
 *
 * @param entityList 实体对象集合
 * @param batchSize  更新批次数量
 */
boolean updateBatchById(Collection<T> entityList, int batchSize);
```

### saveOrUpdate
``` java
/**
 * <p>
 * TableId 注解存在更新记录，否插入一条记录
 * </p>
 *
 * @param entity 实体对象
 */
boolean saveOrUpdate(T entity);
```

### getById
``` java
/**
 * <p>
 * 根据 ID 查询
 * </p>
 *
 * @param id 主键ID
 */
T getById(Serializable id);
```

### listByIds
``` java
/**
 * <p>
 * 查询（根据ID 批量查询）
 * </p>
 *
 * @param idList 主键ID列表
 */
Collection<T> listByIds(Collection<? extends Serializable> idList);
```

### listByMap
``` java
/**
 * <p>
 * 查询（根据 columnMap 条件）
 * </p>
 *
 * @param columnMap 表字段 map 对象
 */
Collection<T> listByMap(Map<String, Object> columnMap);
```

### getOne
``` java
/**
 * <p>
 * 根据 Wrapper，查询一条记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 * @param throwEx      有多个 result 是否抛出异常
 */
T getOne(Wrapper<T> queryWrapper, boolean throwEx);
```

### getMap
``` java
/**
 * <p>
 * 根据 Wrapper，查询一条记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
Map<String, Object> getMap(Wrapper<T> queryWrapper);
```

### getObj
``` java
/**
 * <p>
 * 根据 Wrapper，查询一条记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
Object getObj(Wrapper<T> queryWrapper);
```

### count
``` java
/**
 * <p>
 * 根据 Wrapper 条件，查询总记录数
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
int count(Wrapper<T> queryWrapper);
```

### list
``` java
/**
 * <p>
 * 查询列表
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
List<T> list(Wrapper<T> queryWrapper);
```

### page
``` java
/**
 * <p>
 * 翻页查询
 * </p>
 *
 * @param page         翻页对象
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
IPage<T> page(IPage<T> page, Wrapper<T> queryWrapper);
```

### listMaps
``` java
/**
 * <p>
 * 查询列表
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
List<Map<String, Object>> listMaps(Wrapper<T> queryWrapper);
```

### listObjs
``` java
/**
 * <p>
 * 根据 Wrapper 条件，查询全部记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
List<Object> listObjs(Wrapper<T> queryWrapper);
```

### pageMaps
``` java
/**
 * <p>
 * 翻页查询
 * </p>
 *
 * @param page         翻页对象
 * @param queryWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.query.QueryWrapper}
 */
IPage<Map<String, Object>> pageMaps(IPage<T> page, Wrapper<T> queryWrapper);
```

## mapper 层 选装件

::: tip 说明:
选装件位于 `com.baomidou.mybatisplus.extension.injector.methods.additional` 包下
需要配合[Sql 注入器](sql-injector.md)使用,[案例](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-sql-injector)  
使用详细见[源码注释](https://gitee.com/baomidou/mybatis-plus/tree/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods/additional)
:::

### [insertBatchSomeColumn](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods/additional/InsertBatchSomeColumn.java)
``` java
int insertBatchSomeColumn(List<T> entityList);
```

### [deleteByIdWithFill](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods/additional/LogicDeleteByIdWithFill.java)
``` java
int deleteByIdWithFill(T entity);
```
