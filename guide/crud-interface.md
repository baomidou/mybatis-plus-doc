---
sidebarDepth: 3
---

# CRUD 接口

## Mapper CRUD 接口

::: tip 说明:
- 通用 CRUD 封装[BaseMapper<T>](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/mapper/BaseMapper.java)接口，为 `Mybatis-Plus` 启动时自动解析实体表关系映射转换为 `Mybatis` 内部对象注入容器
- 泛型 `T` 为任意实体对象
- 参数 `Serializable` 为任意类型主键 `Mybatis-Plus` 不推荐使用复合主键约定每一张表都有自己的唯一 `id` 主键
- 对象 `Wrapper` 为 [条件构造器](http://mp.baomidou.com/guide/wrapper.html) 
:::

### insert
```java
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
```java
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
```java
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
```java
/**
 * <p>
 * 根据 entity 条件，删除记录
 * </p>
 *
 * @param queryWrapper 实体对象封装操作类（可以为 null）
 * @return 删除成功记录数
 */
int delete(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

### deleteBatchIds
```java
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
```java
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
```java
/**
 * <p>
 * 根据 whereEntity 条件，更新记录
 * </p>
 *
 * @param entity        实体对象 (set 条件值,不能为 null)
 * @param updateWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
 * @return 修改成功记录数
 */
int update(@Param(Constants.ENTITY) T entity, @Param(Constants.WRAPPER) Wrapper<T> updateWrapper);
```

### selectById
```java
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
```java
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
```java
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
```java
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
```java
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
```java
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
```java
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
```java
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
```java
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
```java
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

### save

### saveBatch

### saveOrUpdateBatch

### saveOrUpdateBatch

### removeById

### removeByMap

### remove

### removeByIds

### updateById

### update

### updateBatchById

### saveOrUpdate

### getById

### listByIds

### listByMap

### getOne

### getMap

### getObj

### count

### list

### page

### listMaps

### listObjs

### pageMaps
