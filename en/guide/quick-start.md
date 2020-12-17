# Quick Start

Let's have a simple Demo to show how to use MP. But before that, we suppose you:

- Have environment and IDE for Java development
- Are familiar with Spring Boot
- Are familiar with Maven

---

Here is a table named `User` ：

| id  | name   | age | email              |
| --- | ------ | --- | ------------------ |
| 1   | Jone   | 18  | test1@baomidou.com |
| 2   | Jack   | 20  | test2@baomidou.com |
| 3   | Tom    | 28  | test3@baomidou.com |
| 4   | Sandy  | 21  | test4@baomidou.com |
| 5   | Billie | 24  | test5@baomidou.com |

Schema script as below：

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
	id BIGINT(20) NOT NULL COMMENT 'Primary key',
	name VARCHAR(30) NULL DEFAULT NULL COMMENT 'name',
	age INT(11) NULL DEFAULT NULL COMMENT 'age',
	email VARCHAR(50) NULL DEFAULT NULL COMMENT 'email',
	PRIMARY KEY (id)
);
```

Data script as below：

```sql
DELETE FROM user;

INSERT INTO user (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
```

---

::: danger Question
What should we do for CRUD by MP?
:::

## Initialization

Create a project of Spring Boot(will use [H2 Database](http://www.h2database.com) for showcase by default)

::: tip
You can use [Spring Initializer](https://start.spring.io/) for Spring Boot Quick Start
:::

## Dependency

Import Spring Boot Starter as parent：
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>spring-latest-version</version>
    <relativePath/>
</parent>
```

Import `spring-boot-starter`、`spring-boot-starter-test`、`mybatis-plus-boot-starter`、`lombok`、`h2` ：
```xml {18}
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>mybatis-plus-boot-starter-latest-version</version>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

## Configuration

Define H2 Database configuration in `application.yml` ：

```yaml
# DataSource Config
spring:
  datasource:
    driver-class-name: org.h2.Driver
    schema: classpath:db/schema-h2.sql
    data: classpath:db/data-h2.sql
    url: jdbc:h2:mem:test
    username: root
    password: test
```

Add  `@MapperScan` Annotation in Spring boot application class, configure Mapper's package：
```java {2}
@SpringBootApplication
@MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
public class QuickStartApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuickStartApplication.class, args);
    }

}
```

## Code

Write `User.java` as an entity(Here using [Lombok](https://www.projectlombok.org/) to simplify getter/setter methods)

```java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

Write a Mapper `UserMapper.java`

```java
public interface UserMapper extends BaseMapper<User> {

}
```

## Let's begin

Add a test case：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SampleTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        List<User> userList = userMapper.selectList(null);
        Assert.assertEquals(5, userList.size());
        userList.forEach(System.out::println);
    }

}
```

::: tip
The parameter of `selectList()` is a condition constructor built-in MP, null means no condition(fetch all records)
:::

Console log：

```
User(id=1, name=Jone, age=18, email=test1@baomidou.com)
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
User(id=5, name=Billie, age=24, email=test5@baomidou.com)
```

::: tip
For Complete codes, please refer to: [Spring Boot Quick Start Sample](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart)
:::

## Summary

We have achieved CURD for table `User` by the few steps above, even no XML file!

It's very simple to integrate `Mybatis-Plus`, just import `starter` and configure mapper's package.

But the powerful functions are far more than these. Keep going!
