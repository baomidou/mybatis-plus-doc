---
title: マルチデータソースサポート
sidebar:
  order: 14
---

プロジェクト規模の拡大に伴い、単一のデータソースでは複雑なビジネス要件を満たすことができなくなり、マルチデータソース（動的データソース）が生まれました。本稿では、MyBatis-Plus の2つのマルチデータソース拡張プラグインについて紹介します：オープンソースエコシステムの `dynamic-datasource` とエンタープライズエコシステムの `mybatis-mate` です。

## dynamic-datasource

`dynamic-datasource` は、オープンソースの Spring Boot マルチデータソーススターターで、データソースのグループ化、機密情報の暗号化、独立したテーブル構造の初期化など、豊富な機能を提供しています。

### 特徴

- **データソースのグループ化**：読み書き分離、一主多従など、様々なシナリオに適用可能です。
- **機密情報の暗号化**：`ENC()` を使用してデータベース設定情報を暗号化します。
- **独立した初期化**：各データベースのテーブル構造とデータベースを独立して初期化することをサポートします。
- **カスタムアノテーション**：`DS` を継承したカスタムアノテーションをサポートします。
- **簡素化された統合**：Druid、HikariCP などのコネクションプールへの迅速な統合を提供します。
- **コンポーネント統合**：Mybatis-Plus、Quartz などのコンポーネントの統合ソリューションをサポートします。
- **動的データソース**：プロジェクト起動後にデータソースを動的に追加または削除することをサポートします。
- **分散トランザクション**：Seata ベースの分散トランザクションソリューションを提供します。

### 規約

- 本フレームワークはデータソースの切り替えに特化しており、具体的な操作は制限しません。
- 設定ファイルでアンダースコア `_` で区切られたデータソースの先頭がグループ名となります。
- データソースの切り替えはグループ名または具体的なデータソース名で行えます。
- デフォルトのデータソース名は `master` で、`spring.datasource.dynamic.primary` で変更可能です。
- メソッド上のアノテーションはクラス上のアノテーションよりも優先されます。

### 使用方法

1. **依存関係の追加**：

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

2. **データソースの設定**：

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

3. **`@DS` を使用してデータソースを切り替え**：

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

より詳細な使用方法については[Dynamic-Datasource 公式サイト](https://github.com/baomidou/dynamic-datasource)を参照してください。

## mybatis-mate

`mybatis-mate` は、MyBatis-Plus の有料エンタープライズコンポーネントで、便利かつ高度な機能が数多く組み込まれており、その中にはマルチデータソース拡張コンポーネントも含まれています。効率的でシンプルなマルチデータソースサポートを提供します。

### 特徴

- **`@Sharding` アノテーション**：アノテーションを使用してデータソースを切り替えることをサポートします。
- **設定**：柔軟なデータソース設定をサポートします。
- **動的ロード/アンロード**：データソースの動的なロードとアンロードをサポートします。
- **マルチデータソーストランザクション**：JTA Atomikos 分散トランザクションをサポートします。

### 使用方法

1. **データソースの設定**：

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

2. **`@Sharding` を使用してデータソースを切り替え**：

```java
@Mapper
@Sharding("mysql")
public interface UserMapper extends BaseMapper<User> {

    @Sharding("postgres")
    Long selectByUsername(String username);

}
```

3. **指定したデータベースノードに切り替え**：

```java
// mysql のスレーブノード node2 に切り替え
ShardingKey.change("mysqlnode2");
```

より詳細な使用例については以下を参照してください

- マルチデータソースの動的ロード/アンロード：👉 [mybatis-mate-sharding-dynamic](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-dynamic)

- マルチデータソーストランザクション（jta atomikos）：👉 [mybatis-mate-sharding-jta-atomikos](https://gitee.com/baomidou/mybatis-mate-examples/tree/master/mybatis-mate-sharding-jta-atomikos)

上記の紹介から、`dynamic-datasource` と `mybatis-mate` の両方が強力なマルチデータソース対応を提供していることがわかります。開発者はプロジェクトの要件に応じて適切なプラグインを選択し、データソースを柔軟に管理することができます。
