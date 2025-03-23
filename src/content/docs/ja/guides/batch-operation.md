---
title: バッチ操作
sidebar:
  order: 7
---
バッチ操作は大量のデータを効率的に処理する技術で、開発者は一度に複数のデータベース操作を実行することができ、データベースとの対話回数を減らし、データ処理の効率とパフォーマンスを向上させることができます。MyBatis-Plusでは、バッチ操作は主に以下のような場面で使用されます：

- データ挿入（Insert）：バッチ挿入はバッチ操作の中で最も一般的な使用例の1つです。複数のレコードを一度に挿入することで、SQL文の実行回数を大幅に削減し、データ書き込み速度を向上させることができます。これはデータ移行、データ初期化などの場面で特に有用です。
- データ更新（Update）：バッチ更新により、複数のレコードの特定のフィールドを同時に変更することができます。大量のデータを一括で変更する必要がある場合（ユーザー状態の一括変更、製品価格の更新など）に適しています。
- データ削除（Delete）：バッチ削除操作により、データベースから複数のレコードを素早く削除することができます。データクリーンアップ、ユーザー登録解除などの場面でよく使用されます。

## 機能概要

- サポートバージョン：`3.5.4 +`
- トランザクション制御：手動管理が必要（デフォルトでオフ）
- 実行結果：バッチ処理結果を返し、ビジネスロジックでの成功/失敗の判断が容易
- データ書き込み：`flushStatements`が正しく実行されるかどうかに依存
- 互換性：Springプロジェクトと非Springプロジェクトの両方をサポート
- 例外タイプ：実行時に`PersistenceException`をスロー
- 推奨事項：`saveOrUpdate`メソッドについては、シンプルな新規追加または更新操作を維持することを推奨

## クラス構造の説明

### MybatisBatch<?>

- ジェネリック：実際のデータ型
- sqlSessionFactory：コンテナから取得可能。非Springコンテナ環境ではMybatisを初期化し、コンテキストを記録する必要がある
- dataList：実際のバッチデータ処理リスト（nullは不可）

### MybatisBatch.Method<?>

実際にはBatchMethodで、フレームワーク内部の操作方法呼び出しを簡略化します。

- ジェネリック：実際のMapperメソッドパラメータ型
- mapperClass：具体的なMapperクラス

### BatchMethod<?>

- ジェネリック：実際のMapperメソッドパラメータ型
- statementId：実行するMappedStatement ID
- parameterConvert：パラメータ型変換ハンドラ。データ型とMapperメソッドパラメータが一致しない場合の変換に使用

## 使用手順

1. MybatisBatchインスタンスの作成（データとsqlSessionFactoryのバインド）
2. MybatisBatch.Methodインスタンスの作成（実行するMapperクラスメソッドの確定）
3. 操作の実行（バッチパラメータをMapperメソッドに必要なパラメータに変換）

## 戻り値の説明

戻り値の型：`List<BatchResult>`

戻り値の内容：各回のMappedStatement + SQLの実行結果をグループ化したもの。

**注意**：例えば、IDによるバッチ更新の際、10件のデータのうち5件が1つのフィールドを更新し、5件が2つのフィールドを更新する場合、戻り値は容量2のListとなり、それぞれ5件のレコードの更新状況を格納します。

## 使用例

フレームワークはMybatisBatchUtilsを提供し、静的メソッド呼び出しが可能です。

### executeメソッド

insert、update、delete操作に適用。

#### 例1：エンティティ型データ

```java
List<H2User> userList = Arrays.asList(new H2User(2000L, "テスト"), new H2User(2001L, "テスト"));
MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, userList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.insert());
```

#### 例2：非エンティティ型データ

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

#### 例3：カスタムメソッド挿入（アノテーションなし）

```java
// mapperメソッド定義
@Insert("insert into h2user(name,version) values( #{name}, #{version})")
int myInsertWithoutParam(H2User user1);

// データ準備
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    h2UserList.add(new H2User("myInsertWithoutParam" + i));
}

MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, h2UserList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.get("myInsertWithoutParam"));
```

#### 例4：カスタムメソッド挿入（アノテーション付き）

```java
// アノテーション付きのmapperメソッド定義
@Insert("insert into h2user(name,version) values( #{user1.name}, #{user1.version})")
int myInsertWithParam(@Param("user1") H2User user1);

// データ準備
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

### saveOrUpdateメソッド

保存または更新操作を実行。

**注意**：異なるsqlSession間ではキャッシュとデータの認識に関する問題に注意が必要です。

#### 異なるsqlSession間の例

```java
@Autowired
private H2UserMapper userMapper;

List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(40000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // insertメソッドの指定
    ((sqlSession, h2User) -> userMapper.selectById(h2User.getTestId()) == null), // 条件判断
    mapperMethod.updateById()); // updateメソッドの指定
```

#### 共通sqlSessionの例

```java
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(50000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // insertメソッドの指定
    ((sqlSession, h2User) -> sqlSession.selectList(mapperMethod.get("selectById").getStatementId(), h2User.getTestId()).isEmpty()), // 条件判断
    mapperMethod.updateById()); // updateメソッドの指定
```

### トランザクション処理例

#### Springトランザクション処理例

```java
@Autowired
private TransactionTemplate transactionTemplate;

transactionTemplate.execute((TransactionCallback<List<BatchResult>>) status -> {
    MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);
    // バッチ挿入の実行
    MybatisBatchUtils.execute(sqlSessionFactory, h2UserList, mapperMethod.insert());
    throw new RuntimeException("エラーが発生しました");
});
```

### SQL LOAD csv

> インポートテーブルにより高いパフォーマンスが要求される場合は、`SQL LOAD csv` を実行する方式を採用できます。以下は `MySQL` の例です：

```sql
LOAD DATA INFILE '/path/to/your/file.csv'
INTO TABLE your_table_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```
