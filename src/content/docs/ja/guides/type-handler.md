---
title: フィールド型ハンドラ
sidebar:
  order: 18
---

MyBatisでは、型ハンドラ（TypeHandler）はJavaTypeとJdbcTypeの間の変換を橋渡しする役割を果たします。これらは、SQL文を実行する際にJavaオブジェクトの値をPreparedStatementに設定したり、ResultSetやCallableStatementから値を取得するために使用されます。

MyBatis-Plusは、いくつかの組み込み型ハンドラを提供しており、`TableField`アノテーションを通じてMyBatisコンテナに素早く注入することができ、開発プロセスを簡素化します。

> サンプルプロジェクト：👉 [mybatis-plus-sample-typehandler](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-typehandler)

## JSONフィールド型ハンドラ

MyBatis-Plusは、`AbstractJsonTypeHandler`およびそのサブクラスである`Fastjson2TypeHandler`、`FastjsonTypeHandler`、`GsonTypeHandler`、`JacksonTypeHandler`など、複数のJSON型ハンドラを組み込みで提供しています。これらのハンドラは、JSON文字列とJavaオブジェクトを相互に変換することができます。

### 設定

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * マッピングアノテーションを有効にする必要があります
     *
     * @TableName(autoResultMap = true)
     *
     * 対応するJSONハンドラを選択し、適切なJSON解析依存ライブラリが存在することを確認してください
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    // または FastjsonTypeHandler を使用
    // @TableField(typeHandler = FastjsonTypeHandler.class)
    private OtherInfo otherInfo;
}
```

### XML設定での対応する記述

XMLマッピングファイルでは、`<result>`要素を使用してフィールドの型ハンドラを指定できます。

```xml
<!-- 単一フィールドの型ハンドラ設定 -->
<result column="other_info" jdbcType="VARCHAR" property="otherInfo" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />

<!-- 複数フィールド内の特定フィールドの型ハンドラ設定 -->
<resultMap id="departmentResultMap" type="com.baomidou...DepartmentVO">
    <result property="director" column="director" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />
</resultMap>
<select id="selectPageVO" resultMap="departmentResultMap">
   select id,name,director from department ...
</select>
```

### WrapperクエリでのTypeHandlerの使用

MyBatis-Plus バージョン 3.5.3.2 以降、Wrapperクエリ内で直接TypeHandlerを使用できます。

```java
Wrappers.<H2User>lambdaQuery()
    .apply("name={0,typeHandler=" + H2userNameJsonTypeHandler.class.getCanonicalName() + "}", "{\"id\":101,\"name\":\"Tomcat\"}"))
```

上記の例から、MyBatis-Plusが複雑なデータ型を扱う際に、より便利で強力な型ハンドラサポートを提供していることがわかります。使用する際は、正しいJSONハンドラを選択し、対応するJSON解析ライブラリの依存関係を導入していることを確認してください。

## カスタム型ハンドラ

MyBatis-Plusでは、組み込みの型ハンドラを使用する以外に、開発者は必要に応じてカスタム型ハンドラを定義できます。

例えば、PostgreSQLデータベースを使用する場合、JSONB型のフィールドに遭遇することがあり、その際はカスタムの型ハンドラを作成してJSONBデータを処理することができます。

以下は、カスタムJSONB型ハンドラの例です：

> サンプルプロジェクト：👉 [mybatis-plus-sample-jsonb](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-jsonb)

### カスタム型ハンドラの作成

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

    // バージョン3.5.6以降、ジェネリックをサポートするため、このコンストラクタが必要です.
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

### カスタム型ハンドラの使用

エンティティクラスで、`TableField`アノテーションを使用してカスタム型ハンドラを指定します：

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * カスタムJSONB型ハンドラを使用
     */
    @TableField(typeHandler = JsonbTypeHandler.class)
    private OtherInfo otherInfo;
}
```

上記の手順により、PostgreSQLデータベースのJSONB型フィールドを処理するために、MyBatis-PlusでカスタムのJSONB型ハンドラを使用できます。カスタム型ハンドラは非常に高い柔軟性を提供し、開発者が特定のデータベース特性やビジネスニーズに基づいてデータ処理ロジックをカスタマイズできるようにします。
