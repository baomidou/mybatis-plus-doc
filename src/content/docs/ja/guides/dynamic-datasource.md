---
title: マルチデータソースサポート
sidebar:
  order: 14
---

プロジェクト規模の拡大に伴い、単一データソースでは複雑な業務要件を満たせなくなり、マルチデータソース（動的データソース）が登場しました。本稿では、MyBatis-Plusの2つのマルチデータソース拡張プラグイン、オープンソースエコシステムの `dynamic-datasource` とエンタープライズエコシステムの `mybatis-mate` を紹介します。

## dynamic-datasource

`dynamic-datasource` はオープンソースのSpring Bootマルチデータソーススターターで、データソースのグループ化、機密情報の暗号化、独立したテーブル構造の初期化など、豊富な機能を提供します。

### 特徴

- **データソースグループ化**: 読み書き分離、1マスタ-複数スレーブなど、様々なシナリオに適用可能。
- **機密情報暗号化**: `ENC()` を使用してデータベース設定情報を暗号化。
- **独立初期化**: 各データベースのテーブル構造とデータベースを独立して初期化することをサポート。
- **カスタムアノテーション**: カスタムアノテーションをサポート。`DS` を継承する必要があります。
- **簡素化された統合**: Druid、HikariCPなどのコネクションプールとの迅速な統合を提供。
- **コンポーネント統合**: Mybatis-Plus、Quartzなどのコンポーネントの統合ソリューションをサポート。
- **動的データソース**: プロジェクト起動後のデータソースの動的な追加や削除をサポート。
- **分散トランザクション**: Seataベースの分散トランザクションソリューションを提供。

### 規約

- 本フレームワークはデータソース切り替えに特化しており、具体的な操作を制限しません。
- 設定ファイルにおいて、アンダースコア `_` で分割されたデータソースの先頭部分はグループ名です。
- データソースの切り替えは、グループ名または特定のデータソース名で行えます。
- デフォルトのデータソース名は `master` です。`spring.datasource.dynamic.primary` で変更可能です。
- メソッド上のアノテーションはクラス上のアノテーションより優先されます。

### 使用方法

1. **依存関係の追加**:
  - SpringBoot2
  ```xml
  <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>${version}</version>
  </dependency>
  ```

 - SpringBoot3
 ```xml
 <dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>dynamic-datasource-spring-boot3-starter</artifactId>
  <version>${version}</version>
 </dependency>
 ```  

2. **データソースの設定**:

```yaml
spring:
  datasource:
    dynamic:
      primary: master
      strict: false
      datasource:
        master:
          url: jdbc:mysql://xx.xx.xx.xx:3306/dynamic
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
        slave_1:
          url: jdbc:mysql://xx.xx.xx.xx:3307/dynamic
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
        slave_2:
          url: ENC(xxxxx)
          username: ENC(xxxxx)
          password: ENC(xxxxx)
          driver-class-name: com.mysql.jdbc.Driver
```

3. **`@DS` を使用したデータソースの切り替え**:

```java
@Service
@DS("slave")
public class UserServiceImpl implements UserService {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  @DS("slave_1")
  public List selectByCondition() {
    return jdbcTemplate.queryForList("select * from user where age >10");
  }
}
```

より詳細な使用方法については、[Dynamic-Datasource 公式サイト](https://github.com/baomidou/dynamic-datasource)を参照してください。

## mybatis-mate

`mybatis-mate` は MyBatis-Plus の有償エンタープライズコンポーネントであり、多くの便利な高度な機能が組み込まれており、その中にはマルチデータソース拡張コンポーネントも含まれ、効率的でシンプルなマルチデータソースサポートを提供します。

### 特徴

- **アノテーション `@Sharding`**: アノテーションによるデータソース切り替えをサポート。
- **設定**: 柔軟なデータソース設定をサポート。
- **動的ロード/アンロード**: データソースの動的なロードとアンロードをサポート。
- **マルチデータソーストランザクション**: JTA Atomikos 分散トランザクションをサポート。

### 使用方法

1. **データソースの設定**:

```xml
mybatis-mate:
  sharding:
    primary: mysql
    datasource:
      mysql:
        - key: node1
          ...
        - key: node2
          cluster: slave
          ...
      postgres:
        - key: node1
          ...
```

2. **`@Sharding` を使用したデータソースの切り替え**:

```java
@Mapper
@Sharding("mysql")
public interface UserMapper extends BaseMapper<User> {

    @Sharding("postgres")
    Long selectByUsername(String username);

}
```

3. **指定したデータベースノードへの切り替え**:

```java
// mysql スレーブライブラリ node2 ノードに切り替え
ShardingKey.change("mysqlnode2");
```

その他の使用例については、以下を参照してください。

- マルチデータソース動的ロード/アンロード: 👉 [mybatis-mate-sharding-dynamic](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-dynamic)

- マルチデータソーストランザクション (jta atomikos): 👉 [mybatis-mate-sharding-jta-atomikos](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-jta-atomikos)

上記の紹介から、`dynamic-datasource` と `mybatis-mate` の両方が強力なマルチデータソースサポートを提供していることがわかります。開発者はプロジェクトの要件に応じて適切なプラグインを選択し、データソースの柔軟な管理を実現できます。
