# 快速开始

## 简单示例(传统)

!> 假设我们已存在一张 User 表，且已有对应的实体类 User，实现 User 表的 CRUD 操作我们需要做什么呢？

```java
/** User 对应的 Mapper 接口 */
public interface UserMapper extends BaseMapper<User> { }
```

以上就是您所需的所有操作，甚至不需要您创建XML文件，我们如何使用它呢？

> 基本CRUD

```java
// 初始化 影响行数
int result = 0;
// 初始化 User 对象
User user = new User();

// 插入 User (插入成功会自动回写主键到实体类)
user.setName("Tom");
result = userMapper.insert(user);

// 更新 User
user.setAge(18);
result = userMapper.updateById(user);

// 查询 User
User exampleUser = userMapper.selectById(user.getId());

// 查询姓名为‘张三’的所有用户记录
List<User> userList = userMapper.selectList(
        new EntityWrapper<User>().eq("name", "张三")
);

// 删除 User
result = userMapper.deleteById(user.getId());
```

以上是基本的 CRUD 操作，当然我们可用的 API 远不止这几个，我们提供了多达 17 个方法给大家使用，可以极其方便的实现单一、批量、分页等操作，接下来我们就来看看 MP 是如何使用分页的。

> 分页操作

```java
// 分页查询 10 条姓名为‘张三’的用户记录
List<User> userList = userMapper.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
);
```

如您所见，我们仅仅需要继承一个 BaseMapper 即可实现大部分单表 CRUD 操作，极大的减少的开发负担。

有人也许会质疑：这难道不是通用 Mapper 么？别急，咱们接着往下看。

!> 现有一个需求，我们需要`分页查询` User 表中，`年龄在18~50之间性别为男且姓名为张三的所有用户`，这时候我们该如何实现上述需求呢？

传统做法是 Mapper 中定义一个方法，然后在 Mapper 对应的 XML 中填写对应的 SELECT 语句，且我们还要集成分页，实现以上一个简单的需求，往往需要我们做很多重复单调的工作，普通的通用 Mapper 能够解决这类痛点么？

> 用 MP 的方式打开以上需求

```java
// 分页查询 10 条姓名为‘张三’、性别为男，且年龄在18至50之间的用户记录
List<User> userList = userMapper.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
                .eq("sex", 0)
                .between("age", "18", "50")
);
```

以上操作，等价于

```sql
SELECT *
FROM sys_user
WHERE (name='张三' AND sex=0 AND age BETWEEN '18' AND '50')
LIMIT 0,10
```

Mybatis-Plus 通过 EntityWrapper（简称 EW，MP 封装的一个查询条件构造器）或者 Condition（与EW类似） 来让用户自由的构建查询条件，简单便捷，没有额外的负担，能够有效提高开发效率。

## 简单示例(ActiveRecord)

ActiveRecord 一直广受动态语言（ PHP 、 Ruby 等）的喜爱，而 Java 作为准静态语言，对于 ActiveRecord 往往只能感叹其优雅，所以我们也在 AR 道路上进行了一定的探索，喜欢大家能够喜欢，也同时欢迎大家反馈意见与建议。

我们如何使用 AR 模式？

```java
@TableName("sys_user") // 注解指定表名
public class User extends Model<User> {

  ... // fields

  ... // getter and setter

  /** 指定主键 */
  @Override
  protected Serializable pkVal() {
      return this.id;
  }
}
```

我们仅仅需要继承 Model 类且实现主键指定方法 即可让实体开启 AR 之旅，开启 AR 之路后，我们如何使用它呢？

> 基本CRUD

```java
// 初始化 成功标识
boolean result = false;
// 初始化 User
User user = new User();

// 保存 User
user.setName("Tom");
result = user.insert();

// 更新 User
user.setAge(18);
result = user.updateById();

// 查询 User
User exampleUser = user.selectById();

// 查询姓名为‘张三’的所有用户记录
List<User> userList1 = user.selectList(
        new EntityWrapper<User>().eq("name", "张三")
);

// 删除 User
result = user.deleteById();
```

> 分页操作

```java
// 分页查询 10 条姓名为‘张三’的用户记录
List<User> userList = user.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
).getRecords();
```

> 复杂操作

```java
// 分页查询 10 条姓名为‘张三’、性别为男，且年龄在18至50之间的用户记录
List<User> userList = user.selectPage(
        new Page<User>(1, 10),
        new EntityWrapper<User>().eq("name", "张三")
                .eq("sex", 0)
                .between("age", "18", "50")
).getRecords();
```

?> AR 模式提供了一种更加便捷的方式实现 CRUD 操作，其本质还是调用的 Mybatis 对应的方法，类似于语法糖。

通过以上两个简单示例，我们简单领略了 Mybatis-Plus 的*魅力*与*高效率*，**值得注意的一点是：我们提供了强大的`代码生成器`，可以快速生成各类代码，真正的做到了`即开即用`。**
