---
title: Field Type Handlers
sidebar:
  order: 18
---

In MyBatis, TypeHandlers act as bridges for conversion between JavaType and JdbcType. They are used to set Java object values into PreparedStatements during SQL execution or retrieve values from ResultSets or CallableStatements.

MyBatis-Plus provides several built-in TypeHandlers that can be quickly injected into the MyBatis container through the `TableField` annotation, simplifying the development process.

> Example project: 👉 [mybatis-plus-sample-typehandler](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-typehandler)

## JSON Field Type Handlers

MyBatis-Plus includes various JSON TypeHandlers, such as `AbstractJsonTypeHandler` and its subclasses `Fastjson2TypeHandler`, `FastjsonTypeHandler`, `GsonTypeHandler`, `JacksonTypeHandler`, etc. These handlers can convert JSON strings to Java objects and vice versa.

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
     * Select the corresponding JSON handler and ensure the required JSON parsing dependency is included
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    // Alternatively, use FastjsonTypeHandler
    // @TableField(typeHandler = FastjsonTypeHandler.class)
    private OtherInfo otherInfo;
}
```

### XML Configuration

In XML mapping files, the `<result>` element can be used to specify a field's TypeHandler.

```xml
<!-- Single field TypeHandler configuration -->
<result column="other_info" jdbcType="VARCHAR" property="otherInfo" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />

<!-- TypeHandler configuration for a specific field among multiple fields -->
<resultMap id="departmentResultMap" type="com.baomidou...DepartmentVO">
    <result property="director" column="director" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />
</resultMap>
<select id="selectPageVO" resultMap="departmentResultMap">
   select id,name,director from department ...
</select>
```

### Using TypeHandlers in Wrapper Queries

Starting from MyBatis-Plus 3.5.3.2, TypeHandlers can be directly used in Wrapper queries.

```java
Wrappers.<H2User>lambdaQuery()
    .apply("name={0,typeHandler=" + H2userNameJsonTypeHandler.class.getCanonicalName() + "}", "{\"id\":101,\"name\":\"Tomcat\"}"))
```

The above examples demonstrate MyBatis-Plus's flexible and powerful TypeHandler support, making it easier to handle complex data types. When using them, ensure you select the correct JSON handler and include the corresponding JSON parsing library dependency.

## Custom Type Handlers

In MyBatis-Plus, besides using built-in TypeHandlers, developers can also create custom TypeHandlers as needed.

For example, when working with PostgreSQL databases, you might encounter JSONB-type fields. In such cases, you can create a custom TypeHandler to handle JSONB data.

Here’s an example of a custom JSONB TypeHandler:

> Example project: 👉 [mybatis-plus-sample-jsonb](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-jsonb)

### Creating a Custom TypeHandler

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

    // Support for generics added in version 3.5.6. This constructor is required.
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

### Using Custom TypeHandlers

In entity classes, specify the custom TypeHandler using the `TableField` annotation:

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * Use a custom JSONB TypeHandler
     */
    @TableField(typeHandler = JsonbTypeHandler.class)
    private OtherInfo otherInfo;
}
```

Through the above steps, you can use custom JSONB TypeHandlers in MyBatis-Plus to handle JSONB-type fields in PostgreSQL databases. Custom TypeHandlers provide great flexibility, allowing developers to tailor data processing logic to specific database features and business requirements.
