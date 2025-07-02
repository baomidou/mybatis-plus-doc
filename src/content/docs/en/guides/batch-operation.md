---
title: Batch Operations
sidebar:
  order: 7
---
Batch operations are an efficient technique for processing large volumes of data, allowing developers to perform multiple database operations in a single execution. This reduces the number of interactions with the database, improving efficiency and performance in data processing. In MyBatis-Plus, batch operations are primarily used in the following scenarios:

- **Data Insertion (Insert)**: Batch insertion is one of the most common use cases for batch operations. By inserting multiple records at once, the number of SQL statement executions is significantly reduced, speeding up data writing. This is particularly useful for scenarios like data migration or initializing data.
- **Data Update (Update)**: Batch updates allow modifying specific fields of multiple records simultaneously, making them suitable for scenarios requiring uniform changes to large datasets, such as updating user statuses or product prices in bulk.
- **Data Deletion (Delete)**: Batch deletion operations enable the rapid removal of multiple records from the database, often used for data cleanup or user account termination.

## Feature Overview

- **Supported Versions**: `3.5.4 +`
- **Transaction Control**: Requires manual management (disabled by default)
- **Execution Results**: Returns batch processing results for business logic to determine success or failure
- **Data Writing**: Depends on whether the code correctly executes `flushStatements`
- **Compatibility**: Supports both Spring and non-Spring projects
- **Exception Type**: Throws `PersistenceException` on execution
- **Recommendation**: For the `saveOrUpdate` method, it is advised to keep operations simple (either insert or update).

## Class Structure Explanation

### MybatisBatch<?>

- **Generic Type**: Actual data type
- **sqlSessionFactory**: Can be obtained from the container; in non-Spring environments, Mybatis must be initialized manually with context recorded.
- **dataList**: List of actual batch data to be processed (cannot be empty).

### MybatisBatch.Method<?>

Simplifies internal framework method calls, essentially a BatchMethod.

- **Generic Type**: Actual Mapper method parameter type
- **mapperClass**: Specific Mapper class

### BatchMethod<?>

- **Generic Type**: Actual Mapper method parameter type
- **statementId**: ID of the executed MappedStatement
- **parameterConvert**: Parameter type conversion handler for cases where data types do not match Mapper method parameters.

## Usage Steps

1. Create a MybatisBatch instance (bind data and sqlSessionFactory).
2. Create a MybatisBatch.Method instance (specify the Mapper class method to execute).
3. Execute the operation (convert batch parameters to Mapper method parameters).

## Return Value Explanation

**Return Type**: `List<BatchResult>`

**Return Content**: Grouped results of each MappedStatement + SQL execution.

**Note**: For example, in a batch update by ID, if 5 records update one field and 5 update two fields, the return value is a List of size 2, storing the update results for each group of 5 records.

## Usage Examples

The framework provides MybatisBatchUtils for static method calls.

### execute Method

Suitable for insert, update, and delete operations.

#### Example 1: Entity-Type Data

```java
List<H2User> userList = Arrays.asList(new H2User(2000L, "测试"), new H2User(2001L, "测试"));
MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, userList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.insert());
```

#### Example 2: Non-Entity-Type Data

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

#### Example 3: Custom Method Insert (No Annotation)

```java
// mapper method definition
@Insert("insert into h2user(name,version) values( #{name}, #{version})")
int myInsertWithoutParam(H2User user1);

// prepare data
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    h2UserList.add(new H2User("myInsertWithoutParam" + i));
}

MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, h2UserList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.get("myInsertWithoutParam"));
```

#### Example 4: Custom Method Insert (With Annotation)

```java
// annotated mapper method definition
@Insert("insert into h2user(name,version) values( #{user1.name}, #{user1.version})")
int myInsertWithParam(@Param("user1") H2User user1);

// prepare data
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

### saveOrUpdate Method

Performs save or update operations.

**Note**: Be mindful of caching and data awareness issues across sqlSessions.

#### Cross-sqlSession Example

```java
@Autowired
private H2UserMapper userMapper;

List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(40000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // specify insert method
    ((sqlSession, h2User) -> userMapper.selectById(h2User.getTestId()) == null), // condition
    mapperMethod.updateById()); // specify update method
```

#### Shared sqlSession Example

```java
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(50000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // specify insert method
    ((sqlSession, h2User) -> sqlSession.selectList(mapperMethod.get("selectById").getStatementId(), h2User.getTestId()).isEmpty()), // condition
    mapperMethod.updateById()); // specify update method
```

### Transaction Handling Example

#### Spring Transaction Handling Example

```java
@Autowired
private TransactionTemplate transactionTemplate;

transactionTemplate.execute((TransactionCallback<List<BatchResult>>) status -> {
    MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);
    // execute batch insert
    MybatisBatchUtils.execute(sqlSessionFactory, h2UserList, mapperMethod.insert());
    throw new RuntimeException("出错了");
});
```
### SQL LOAD csv

> For higher performance requirements when importing tables, you can use the `SQL LOAD csv` approach. Below is an example for `MySQL`:

```sql
LOAD DATA INFILE '/path/to/your/file.csv'
INTO TABLE your_table_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```
