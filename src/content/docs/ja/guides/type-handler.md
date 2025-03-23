---
title: タイプハンドラー
sidebar:
  order: 18
---

MyBatis では、タイプハンドラー（TypeHandler）は JavaType と JdbcType の間の変換の橋渡し役を果たします。これらは、SQLステートメントの実行時に、Java オブジェクトの値を PreparedStatement に設定したり、ResultSet や CallableStatement から値を取得したりするために使用されます。

MyBatis-Plus は、いくつかの組み込みタイプハンドラーを提供しており、`TableField` アノテーションを使用して MyBatis コンテナに簡単に注入できるため、開発プロセスを簡素化できます。

> サンプルプロジェクト：👉 [mybatis-plus-sample-typehandler](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-typehandler)

## JSON フィールドタイプハンドラー

MyBatis-Plus には、`AbstractJsonTypeHandler` とそのサブクラスである `Fastjson2TypeHandler`、`FastjsonTypeHandler`、`GsonTypeHandler`、`JacksonTypeHandler` など、複数の JSON タイプハンドラーが組み込まれています。これらのハンドラーは、JSON 文字列と Java オブジェクトを相互に変換することができます。

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
     * 対応する JSON ハンドラーを選択し、対応する JSON 解析依存パッケージが存在することを確認してください
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    // または FastjsonTypeHandler を使用
    // @TableField(typeHandler = FastjsonTypeHandler.class)
    private OtherInfo otherInfo;
}
```

### XML 設定の対応する書き方

XML マッピングファイルでは、`<result>` 要素を使用してフィールドのタイプハンドラーを指定できます。

```xml
<!-- 単一フィールドのタイプハンドラー設定 -->
<result column="other_info" jdbcType="VARCHAR" property="otherInfo" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />

<!-- 複数のフィールドのうち特定のフィールドのタイプハンドラー設定 -->
<resultMap id="departmentResultMap" type="com.baomidou...DepartmentVO">
    <result property="director" column="director" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />
</resultMap>
<select id="selectPageVO" resultMap="departmentResultMap">
   select id,name,director from department ...
</select>
```

### Wrapper クエリでの TypeHandler の使用

MyBatis-Plus 3.5.3.2 バージョンから、Wrapper クエリで直接 TypeHandler を使用できるようになりました。

```java
Wrappers.<H2User>lambdaQuery()
    .apply("name={0,typeHandler=" + H2userNameJsonTypeHandler.class.getCanonicalName() + "}", "{\"id\":101,\"name\":\"Tomcat\"}"))
```

上記の例から、MyBatis-Plus が複雑なデータ型を処理する際により便利になるよう、柔軟で強力なタイプハンドラーサポートを提供していることがわかります。使用する際は、適切な JSON ハンドラーを選択し、対応する JSON 解析ライブラリの依存関係を導入していることを確認してください。

## カスタムタイプハンドラー

MyBatis-Plus では、組み込みのタイプハンドラーを使用するだけでなく、開発者は必要に応じてカスタムタイプハンドラーを作成することもできます。

例えば、PostgreSQL データベースを使用する場合、JSONB 型のフィールドに遭遇することがありますが、その場合は JSONB データを処理するためのカスタムタイプハンドラーを作成できます。

以下は、カスタム JSONB タイプハンドラーの例です：

> サンプルプロジェクト：👉 [mybatis-plus-sample-jsonb](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-jsonb)

### カスタムタイプハンドラーの作成

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

    // 3.5.6 バージョンからジェネリクスをサポートするため、このコンストラクタが必要です
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

### カスタムタイプハンドラーの使用

エンティティクラスで、`TableField` アノテーションを使用してカスタムタイプハンドラーを指定します：

```java
@Data
@Accessors(chain = true)
@TableName(autoResultMap = true)
public class User {
    private Long id;

    ...

    /**
     * カスタム JSONB タイプハンドラーを使用
     */
    @TableField(typeHandler = JsonbTypeHandler.class)
    private OtherInfo otherInfo;
}
```

上記の手順により、MyBatis-Plus はカスタム JSONB タイプハンドラーを使用して、PostgreSQL データベースの JSONB 型フィールドを処理できます。カスタムタイプハンドラーは非常に柔軟性があり、開発者は特定のデータベース特性やビジネス要件に基づいてデータ処理ロジックをカスタマイズできます。
