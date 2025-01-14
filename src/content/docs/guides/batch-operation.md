---
title: 批量操作
sidebar:
  order: 7
---
批量操作是一种高效处理大量数据的技术，它允许开发者一次性执行多个数据库操作，从而减少与数据库的交互次数，提高数据处理的效率和性能。在MyBatis-Plus中，批量操作主要用于以下几个方面：

- 数据插入（Insert）：批量插入是批量操作中最常见的应用场景之一。通过一次性插入多条记录，可以显著减少SQL语句的执行次数，加快数据写入速度。这在数据迁移、初始化数据等场景中尤为有用。
- 数据更新（Update）：批量更新允许同时修改多条记录的特定字段，适用于需要对大量数据进行统一变更的情况，如批量修改用户状态、更新产品价格等。
- 数据删除（Delete）：批量删除操作可以快速移除数据库中的多条记录，常用于数据清理、用户注销等场景。

## 功能概览

- 支持版本：`3.5.4 +`
- 事务控制：需手动管理（默认关闭）
- 执行结果：返回批量处理结果，便于业务判断成功与否
- 数据写入：取决于代码是否正确执行到`flushStatements`
- 兼容性：支持Spring与非Spring项目
- 异常类型：执行抛出`PersistenceException`
- 建议：对于`saveOrUpdate`方法，建议保持简单的新增或更新操作

## 类结构说明

### MybatisBatch<?>

- 泛型：实际数据类型
- sqlSessionFactory：可通过容器获取，非Spring容器下需自行初始化Mybatis并记录上下文
- dataList：实际批量数据处理列表（不可为空）

### MybatisBatch.Method<?>

实际为BatchMethod，简化框架内部操作方法调用。

- 泛型：实际Mapper方法参数类型
- mapperClass：具体的Mapper类

### BatchMethod<?>

- 泛型：实际Mapper方法参数类型
- statementId：执行的MappedStatement ID
- parameterConvert：参数类型转换处理器，用于数据类型与Mapper方法参数不一致时的转换

## 使用步骤

1. 创建MybatisBatch实例（绑定数据与sqlSessionFactory）
2. 创建MybatisBatch.Method实例（确定执行的Mapper类方法）
3. 执行操作（将批量参数转换为Mapper方法所需参数）

## 返回值说明

返回类型：`List<BatchResult>`

返回内容：每次执行MappedStatement + SQL的操作结果分组。

**注意**：例如批量根据ID更新，若10条数据中5条更新一个字段，5条更新两个字段，则返回值为容量为2的List，分别存储5条记录的更新情况。

## 使用示例

框架提供MybatisBatchUtils进行静态方法调用。

### execute方法

适用于insert, update, delete操作。

#### 示例一：实体类型数据

```java
List<H2User> userList = Arrays.asList(new H2User(2000L, "测试"), new H2User(2001L, "测试"));
MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, userList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.insert());
```

#### 示例二：非实体类型数据

```java
List<Long> ids = Arrays.asList(120000L, 120001L);
MybatisBatch<Long> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, ids);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.insert(id -> {
    H2User h2User = new H2User();
    h2User.setTestId(id);
    return h2User;
}));
```

#### 示例三：自定义方法插入（无注解）

```java
// mapper方法定义
@Insert("insert into h2user(name,version) values( #{name}, #{version})")
int myInsertWithoutParam(H2User user1);

// 准备数据
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    h2UserList.add(new H2User("myInsertWithoutParam" + i));
}

MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, h2UserList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.get("myInsertWithoutParam"));
```

#### 示例四：自定义方法插入（带注解）

```java
// 带注解的mapper方法定义
@Insert("insert into h2user(name,version) values( #{user1.name}, #{user1.version})")
int myInsertWithParam(@Param("user1") H2User user1);

// 准备数据
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    h2UserList.add(new H2User("myInsertWithParam" + i));
}

MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, h2UserList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.get("myInsertWithParam", (user) -> {
    Map<String, Object> map = new HashMap<>();
    map.put("user1", user);
    return map;
}));
```

### saveOrUpdate方法

执行保存或更新操作。

**注意**：跨sqlSession下需注意缓存和数据感知问题。

#### 跨sqlSession示例

```java
@Autowired
private H2UserMapper userMapper;

List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(40000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // 指定insert方法
    ((sqlSession, h2User) -> userMapper.selectById(h2User.getTestId()) == null), // 判断条件
    mapperMethod.updateById()); // 指定update方法
```

#### 共用sqlSession示例

```java
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(50000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // 指定insert方法
    ((sqlSession, h2User) -> sqlSession.selectList(mapperMethod.get("selectById").getStatementId(), h2User.getTestId()).isEmpty()), // 判断条件
    mapperMethod.updateById()); // 指定update方法
```

### 事务处理示例

#### Spring事务处理示例

```java
@Autowired
private TransactionTemplate transactionTemplate;

transactionTemplate.execute((TransactionCallback<List<BatchResult>>) status -> {
    MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);
    // 执行批量插入
    MybatisBatchUtils.execute(sqlSessionFactory, h2UserList, mapperMethod.insert());
    throw new RuntimeException("出错了");
});
```
### SQL LOAD csv

> 如果对导入表有更高的性能要求，可以采用执行 `SQL LOAD csv` 的方式，如下为 `MySQL` 的示例：

```sql
LOAD DATA INFILE '/path/to/your/file.csv'
INTO TABLE your_table_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```