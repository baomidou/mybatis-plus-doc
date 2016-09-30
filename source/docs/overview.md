title: 概览
---
也许你第一眼看到Mybatis-Plus（以下简称MP），会认为这尼玛是哪里来的山寨货？还Plus？这难道是要替代Mybatis的地位么？！！！

No！我们不是山寨Mybatis，我们只是一个Mybatis增强辅助工具，通过这个工具我们可以极其方便的进行单表的CRUD，从枯燥单一的CRUD中脱离出来。

你也许会说这不就是通用Mapper么？对，MP是具有通用Mapper的功能，但是又不仅仅限于此，使用MP，能够有效的提升您的开发效率！因为MP就是为简化开发工作、提高生产率而生！

口说无凭，我们来看看使用MP开发到底多有效率~

# 前瞻

> MP自带了代码生成器，包含代码生成类和Maven插件，你可以灵活的调整生成代码的方式。

进行开发你需要做什么呢？你仅仅需要配置好数据库和代码生成路径，然后生成代码就可以开撸Controller层代码了，MP已经把 Entity层、Mapper层、Service层的代码以及Mapper对应的XML文件生成好了！

我们来看看生成后的代码是什么样子：

> 示例中，我们假设有一张表叫foo，里面包含id和name两个字段，通过MP来生成代码

```java Foo.java
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

```java FooMapper.java
/**
 *
 * Foo 表数据库控制层接口
 *
 */
public interface FooMapper extends AutoMapper<Foo> {

}
```

```xml FooMapper.xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xxx.mapper.FooMapper">

    <!-- 通用查询结果列-->
    <sql id="Base_Column_List">
         id, name
    </sql>

</mapper>
```

```java FooService.java
/**
 *
 * Foo 表数据服务层接口
 *
 */
public interface IFooService extends ISuperService<Foo> {

}
```

```java FooServiceImpl.java
/**
 *
 * Foo 表数据服务层接口实现类
 *
 */
@Service
public class FooServiceImpl extends SuperServiceImpl<FooMapper, Foo> implements IFooService {

}
```

纳尼？！！怎么可以这么简洁？！！xml怎么什么东西都没有？！！

对，你没有看错，这就是MP生成代码，非常的简洁而且还生成了对应的注释（备注：实体类字段的注释需要在数据库设计的时候就填写好备注），要是你喜欢，甚至可以配置为无xml（如果不进行扩展，只需要基本CRUD的话）。

# 方法说明

你可以看到MP采用了继承的方式来提取CRUD方法，那么我们到底有哪些方法呢？

```java insert相关
boolean insert(T entity); //插入

boolean insertSelective(T entity); //选择性插入，null字段不插入

boolean insertBatch(List<T> entityList); //批量插入
```

```java delete相关
boolean deleteById(I id); //通过ID删除

boolean deleteByMap(Map<String, Object> columnMap); // 通过自定义MAP删除

boolean deleteSelective(T entity); //通过entity实体选择性删除，null字段不作为条件

boolean deleteBatchIds(List<I> idList); //批量删除
```

```java update相关
boolean updateById(T entity); //通过ID更新

boolean updateSelectiveById(T entity); //通过ID选择性更新，null字段不更新

boolean update(T entity, T whereEntity); //通过whereEntity实体构造where条件进行更新

boolean updateSelective(T entity, T whereEntity); //通过whereEntity实体构造where条件进行选择性更新

boolean updateBatchById(List<T> entityList); //批量更新
```

```java select相关
T selectById(I id); //通过ID查询

List<T> selectBatchIds(List<I> idList); //通过ID集合批量查询

List<T> selectByMap(Map<String, Object> columnMap); //通过自定义MAP查询

T selectOne(T entity); //通过实体entity查询

int selectCount(T entity); //统计查询

List<T> selectList(EntityWrapper<T> entityWrapper); //List查询，entityWrapper为查询条件构造器

Page<T> selectPage(Page<T> page, EntityWrapper<T> entityWrapper); //分页查询，page为分页实体，entityWrapper为查询条件构造器
```

只要生成了代码，就已经带有上述的所有方法，单表的CRUD已经完全能够满足了。

你也许会问，那多表或者复杂业务怎么办？之前说了，MP是一个增强辅助工具，不会改变Mybatis，如果有多表业务和复杂业务，就可以像正常Mybatis一样使用，没有任何冲突。

> 文档君吐槽：其实也是由于复杂业务多而杂，不好归纳整理，所以我们希望能够维护好单表的CRUD，让开发者能够专注于复杂业务，脱离单调枯燥的CRUD，可以疯狂的输出代码，缩短开发周期，开发周期一短领导就高兴，领导一高兴就要加薪，一加薪就从此走上人生巅峰，赢取白富美~ `↖(^ω^)↗`

**看完上面的概述和优点描述，是不是蠢蠢欲动？那么赶紧来看接下来的文章，快速上手Mybatis-Plus！**
