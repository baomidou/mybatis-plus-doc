---
title: 字段类型处理器
sidebar:
  order: 18
---

在 MyBatis 中，类型处理器（TypeHandler）扮演着 JavaType 与 JdbcType 之间转换的桥梁角色。它们用于在执行 SQL 语句时，将 Java 对象的值设置到 PreparedStatement 中，或者从 ResultSet 或 CallableStatement 中取出值。

MyBatis-Plus 给大家提供了提供了一些内置的类型处理器，可以通过 `TableField` 注解快速注入到 MyBatis 容器中，从而简化开发过程。

> 示例工程：👉 [mybatis-plus-sample-typehandler](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-typehandler)

## JSON 字段类型处理器

MyBatis-Plus 内置了多种 JSON 类型处理器，包括 `AbstractJsonTypeHandler` 及其子类 `Fastjson2TypeHandler`、`FastjsonTypeHandler`、`GsonTypeHandler`、`JacksonTypeHandler` 等。这些处理器可以将 JSON 字符串与 Java 对象相互转换。

### 配置

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * 必须开启映射注解
     *
     * @TableName(autoResultMap = true)
     *
     * 选择对应的 JSON 处理器，并确保存在对应的 JSON 解析依赖包
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    // 或者使用 FastjsonTypeHandler
    // @TableField(typeHandler = FastjsonTypeHandler.class)
    private OtherInfo otherInfo;
}
```

### XML 配置对应写法

在 XML 映射文件中，可以使用 `<result>` 元素来指定字段的类型处理器。

```xml
<!-- 单个字段的类型处理器配置 -->
<result column="other_info" jdbcType="VARCHAR" property="otherInfo" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />

<!-- 多个字段中某个字段的类型处理器配置 -->
<resultMap id="departmentResultMap" type="com.baomidou...DepartmentVO">
    <result property="director" column="director" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />
</resultMap>
<select id="selectPageVO" resultMap="departmentResultMap">
   select id,name,director from department ...
</select>
```

### Wrapper 查询中的 TypeHandler 使用

从 MyBatis-Plus 3.5.3.2 版本开始，可以在 Wrapper 查询中直接使用 TypeHandler。

```java
Wrappers.<H2User>lambdaQuery()
    .apply("name={0,typeHandler=" + H2userNameJsonTypeHandler.class.getCanonicalName() + "}", "{\"id\":101,\"name\":\"Tomcat\"}"))
```

通过上述示例，你可以看到 MyBatis-Plus 提供了灵活且强大的类型处理器支持，使得在处理复杂数据类型时更加便捷。在使用时，请确保选择了正确的 JSON 处理器，并引入了相应的 JSON 解析库依赖。

## 自定义类型处理器

在 MyBatis-Plus 中，除了使用内置的类型处理器外，开发者还可以根据需要自定义类型处理器。

例如，当使用 PostgreSQL 数据库时，可能会遇到 JSONB 类型的字段，这时可以创建一个自定义的类型处理器来处理 JSONB 数据。

以下是一个自定义的 JSONB 类型处理器的示例：

> 示例工程：👉 [mybatis-plus-sample-jsonb](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-jsonb)

### 创建自定义类型处理器

```java
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.postgresql.util.PGobject;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedTypes({Object.class})
@MappedJdbcTypes(JdbcType.VARCHAR)
public class JsonbTypeHandler<T> extends JacksonTypeHandler<T> {

    private final Class<T> clazz;

    public JsonbTypeHandler(Class<T> clazz) {
        if (clazz == null) {
            throw new IllegalArgumentException("Type argument cannot be null");
        }
        this.clazz = clazz;
    }

    // 自3.5.6版本开始支持泛型,需要加上此构造.
    public JsonbTypeHandler(Class<?> type, Field field) {
        super(type, field);
    }

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, T parameter, JdbcType jdbcType) throws SQLException {
        PGobject jsonbObject = new PGobject();
        jsonbObject.setType("jsonb");
        jsonObject.setValue(toJson(parameter));
        ps.setObject(i, jsonbObject);
    }
}
```

### 使用自定义类型处理器

在实体类中，通过 `TableField` 注解指定自定义的类型处理器：

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * 使用自定义的 JSONB 类型处理器
     */
    @TableField(typeHandler = JsonbTypeHandler.class)
    private OtherInfo otherInfo;
}
```

通过上述步骤，你可以在 MyBatis-Plus 中使用自定义的 JSONB 类型处理器来处理 PostgreSQL 数据库中的 JSONB 类型字段。自定义类型处理器提供了极大的灵活性，使得开发者可以根据具体的数据库特性和业务需求来定制数据处理逻辑。
