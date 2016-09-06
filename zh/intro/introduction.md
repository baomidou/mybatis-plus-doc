# 概述

也许你第一眼看到Mybatis-Plus（以下简称MP），会认为这尼玛是哪里来的山寨货？还Plus？这难道是要替代Mybatis的地位么？！！！

No！我们不是山寨Mybatis，我们只是一个Mybatis增强辅助工具，通过这个工具我们可以极其方便的进行单表的CRUD，从枯燥单一的CRUD中脱离出来。

你也许会说这不就是通用Mapper么？对，MP是具有通用Mapper的功能，但是又不仅仅限于此，使用MP，能够有效的提升您的开发效率！因为我们所做的一切都是为了简化开发工作、提高生产率！口说无凭，我们来看看使用MP开发到底多有效率~

# 前瞻

> MP自带了代码生成器，包含代码生成类和Maven插件，你可以灵活的调整生成代码的方式。

进行开发你需要做什么呢？你仅仅需要配置好数据库和代码生成路径，然后生成代码就可以开撸Controller层代码了，MP已经把 Entity层、Mapper层、Service层的代码以及Mapper对应的XML文件生成好了！

我们来看看生成后的代码是什么样子：

> 示例中，我们假设有一张表叫foo，里面包含id和name两个字段，通过MP来生成代码

!FILENAME Foo.java

```java
/**
 *
 * Foo表
 *
 */
@TableName("foo")
public class Foo implements Serializable {

    @TableField(exist = false)
    protected static final long serialVersionUID = 1L;

    /** ID */
    @TableId
    protected Long id;

    /** 名称 */
    protected String name;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
```

!FILENAME FooMapper.java

```java
/**
 *
 * Foo 表数据库控制层接口
 *
 */
public interface FooMapper extends AutoMapper<Foo> {

}
```

!FILENAME FooMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xxx.mapper.FooMapper">

    <!-- 通用查询结果列-->
    <sql id="Base_Column_List">
         id, name
    </sql>

</mapper>
```

!FILENAME FooService.java

```java
/**
 *
 * Foo 表数据服务层接口
 *
 */
public interface IFooService extends ISuperService<Foo> {

}
```

!FILENAME FooServiceImpl.java

```java
/**
 *
 * Foo 表数据服务层接口实现类
 *
 */
@Service
public class FooServiceImpl extends SuperServiceImpl<FooMapper, Foo> implements IFooService {

}
```

这就是MP生成代码，非常的简洁而且还生成了对应的注释（实体类字段的注释需要在数据库设计的时候就填写好备注），你可以看到MP采用了继承的方式来提取CRUD方法，那么我们到底有哪些方法呢？

```java
/**
 * <p>
 * 插入一条记录
 * </p>
 *
 * @param entity
 *            实体对象
 * @return boolean
 */
boolean insert(T entity);

/**
 * <p>
 * 插入一条记录（选择字段， null 字段不插入）
 * </p>
 *
 * @param entity
 *            实体对象
 * @return boolean
 */
boolean insertSelective(T entity);

/**
 * <p>
 * 插入（批量），该方法不适合 Oracle
 * </p>
 *
 * @param entityList
 *            实体对象列表
 * @return boolean
 */
boolean insertBatch(List<T> entityList);

/**
 * <p>
 * 根据 ID 删除
 * </p>
 *
 * @param id
 *            主键ID
 * @return boolean
 */
boolean deleteById(I id);

/**
 * <p>
 * 根据 columnMap 条件，删除记录
 * </p>
 *
 * @param columnMap
 *            表字段 map 对象
 * @return boolean
 */
boolean deleteByMap(Map<String, Object> columnMap);

/**
 * <p>
 * 根据 entity 条件，删除记录
 * </p>
 *
 * @param entity
 *            实体对象
 * @return boolean
 */
boolean deleteSelective(T entity);

/**
 * <p>
 * 删除（根据ID 批量删除）
 * </p>
 *
 * @param idList
 *            主键ID列表
 * @return boolean
 */
boolean deleteBatchIds(List<I> idList);

/**
 * <p>
 * 根据 ID 修改
 * </p>
 *
 * @param entity
 *            实体对象
 * @return boolean
 */
boolean updateById(T entity);

/**
 * <p>
 * 根据 ID 选择修改
 * </p>
 *
 * @param entity
 *            实体对象
 * @return boolean
 */
boolean updateSelectiveById(T entity);

/**
 * <p>
 * 根据 whereEntity 条件，更新记录
 * </p>
 *
 * @param entity
 *            实体对象
 * @param whereEntity
 *            实体查询条件（可以为 null）
 * @return boolean
 */
boolean update(T entity, T whereEntity);

/**
 * <p>
 * 根据 whereEntity 条件，选择更新记录
 * </p>
 *
 * @param entity
 *            实体对象
 * @param whereEntity
 *            实体查询条件（可以为 null）
 * @return boolean
 */
boolean updateSelective(T entity, T whereEntity);

/**
 * <p>
 * 根据ID 批量更新
 * </p>
 *
 * @param entityList
 *            实体对象列表
 * @return boolean
 */
boolean updateBatchById(List<T> entityList);

/**
 * <p>
 * 根据 ID 查询
 * </p>
 *
 * @param id
 *            主键ID
 * @return T
 */
T selectById(I id);

/**
 * <p>
 * 查询（根据ID 批量查询）
 * </p>
 *
 * @param idList
 *            主键ID列表
 * @return List<T>
 */
List<T> selectBatchIds(List<I> idList);

/**
 * <p>
 * 查询（根据 columnMap 条件）
 * </p>
 *
 * @param columnMap
 *            表字段 map 对象
 * @return List<T>
 */
List<T> selectByMap(Map<String, Object> columnMap);

/**
 * <p>
 * 根据 entity 条件，查询一条记录
 * </p>
 *
 * @param entity
 *            实体对象
 * @return T
 */
T selectOne(T entity);

/**
 * <p>
 * 根据 entity 条件，查询总记录数
 * </p>
 *
 * @param entity
 *            实体对象
 * @return int
 */
int selectCount(T entity);

/**
 * <p>
 * 查询列表
 * </p>
 *
 * @param entityWrapper
 *            实体包装类 {@link EntityWrapper}
 * @return
 */
List<T> selectList(EntityWrapper<T> entityWrapper);

/**
 * <p>
 * 翻页查询
 * </p>
 *
 * @param page
 *            翻页对象
 * @param entityWrapper
 *            实体包装类 {@link EntityWrapper}
 * @return
 */
Page<T> selectPage(Page<T> page, EntityWrapper<T> entityWrapper);
```

只要生成了代码，就已经带有上述的所有方法，单表的CRUD已经完全能够满足了。你也许会问，那多表或者复杂业务怎么办？之前说了，MP是一个增强辅助工具，不会改变Mybatis，如果有多表业务和复杂业务，就可以像正常Mybatis一样使用，没有任何冲突。

> 文档君吐槽：其实也是由于复杂业务多而杂，不好归纳整理，所以我们希望能够维护好单表的CRUD，让开发者能够专注于复杂业务，脱离单调枯燥的CRUD，可以疯狂的输出代码，缩短开发周期，开发周期一短领导就高兴，领导一高兴就要加薪，一加薪就从此走上人生巅峰，赢取白富美~ `↖(^ω^)↗`

# 优点：

- **纯正血统**：完全继承原生 `Mybatis` 的所有特性
- **最少依赖**：仅仅依赖`Mybatis`以及`Mybatis-Spring`
- **性能损耗小**：启动即会自动注入基本CURD ，性能无损耗，直接面向对象操作
- **自动热加载**：Mapper对应的xml可以热加载，大大减少重启Web服务器时间，提升开发效率
- **自动生成代码**：包含自动生成代码类以及Maven插件，通过少量配置，即可快速生成Mybatis对应的xml、mapper、entity、service、serviceimpl层代码，减少开发时间
- **自定义操作**：支持自定义Sql注入，实现个性化操作
- **自定义转义规则**：支持数据库关键词（例如：`order`、`key`等）自动转义，支持自定义关键词
- **多种主键策略**：支持多达4种主键策略，可自由配置，若无将会自动填充，更有充满黑科技的`分布式全局唯一ID生成器`
- **无缝分页插件**：基于Mybatis物理分页，无需关心具体操作，等同于编写基本`selectList`查询
- **性能分析**：自带Sql性能分析插件，开发测试时，能有效解决慢查询
- **全局拦截**：提供全表`delete`、`update`操作智能分析阻断
- **避免Sql注入**：内置Sql注入内容剥离器，预防Sql注入攻击

> 欢迎大家提出issue和pull-request，包括新功能建议、BUG反馈以及维护代码等，让我们一起把MP变得更加的强大！

**看完上面的概述和优点描述，是不是蠢蠢欲动？那么赶紧来看接下来的文章，快速上手Mybatis-Plus！**
