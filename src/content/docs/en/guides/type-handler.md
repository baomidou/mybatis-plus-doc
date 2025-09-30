---
title: Field Type Handlers
sidebar:
  order: 18
---

In MyBatis, Type Handlers act as a bridge for conversion between JavaType and JdbcType. They are used to set Java object values into a PreparedStatement when executing SQL statements, or to retrieve values from a ResultSet or CallableStatement.

MyBatis-Plus provides several built-in type handlers. They can be quickly injected into the MyBatis container via the `TableField` annotation, simplifying the development process.

> Sample Project: 👉 [mybatis-plus-sample-typehandler](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-typehandler)

## JSON Field Type Handlers

MyBatis-Plus includes various built-in JSON type handlers, such as `AbstractJsonTypeHandler` and its subclasses `Fastjson2TypeHandler`, `FastjsonTypeHandler`, `GsonTypeHandler`, `JacksonTypeHandler`, etc. These handlers can convert between JSON strings and Java objects.

### Configuration

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * The mapping annotation must be enabled
     *
     * @TableName(autoResultMap = true)
     *
     * Select the corresponding JSON handler and ensure the corresponding JSON parsing dependency exists
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    // Or use FastjsonTypeHandler
    // @TableField(typeHandler = FastjsonTypeHandler.class)
    private OtherInfo otherInfo;
}
```

### Corresponding XML Configuration

In the XML mapping file, you can use the `<result>` element to specify the type handler for a field.

```xml
<!-- Type handler configuration for a single field -->
<result column="other_info" jdbcType="VARCHAR" property="otherInfo" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />

<!-- Type handler configuration for a specific field among multiple fields -->
<resultMap id="departmentResultMap" type="com.baomidou...DepartmentVO">
    <result property="director" column="director" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />
</resultMap>
<select id="selectPageVO" resultMap="departmentResultMap">
   select id,name,director from department ...
</select>
```

### Using Type Handlers in Wrapper Queries

Starting from MyBatis-Plus version 3.5.3.2, you can use Type Handlers directly in Wrapper queries.

```java
Wrappers.<H2User>lambdaQuery()
    .apply("name={0,typeHandler=" + H2userNameJsonTypeHandler.class.getCanonicalName() + "}", "{\"id\":101,\"name\":\"Tomcat\"}"))
```

Through the examples above, you can see that MyBatis-Plus provides flexible and powerful type handler support, making it more convenient to handle complex data types. When using them, ensure you select the correct JSON handler and include the corresponding JSON parsing library dependency.

## Custom Type Handlers

In MyBatis-Plus, besides using the built-in type handlers, developers can also create custom type handlers as needed.

For example, when using a PostgreSQL database, you might encounter fields of type JSONB. In this case, you can create a custom type handler to process JSONB data.

Here is an example of a custom JSONB type handler:

> Sample Project: 👉 [mybatis-plus-sample-jsonb](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-jsonb)

### Creating a Custom Type Handler

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

    // Support for generics added starting from version 3.5.6, this constructor is required.
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

### Using a Custom Type Handler

In the entity class, specify the custom type handler via the `TableField` annotation:

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * Use the custom JSONB type handler
     */
    @TableField(typeHandler = JsonbTypeHandler.class)
    private OtherInfo otherInfo;
}
```

By following the steps above, you can use a custom JSONB type handler in MyBatis-Plus to handle JSONB type fields in a PostgreSQL database. Custom type handlers offer great flexibility, allowing developers to tailor data processing logic according to specific database characteristics and business requirements.
