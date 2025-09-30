---
title: バッチ操作
sidebar:
  order: 7
---
バッチ操作は、大量のデータを効率的に処理する技術であり、開発者が一度に複数のデータベース操作を実行できるようにし、データベースとのやり取り回数を減らすことで、データ処理の効率とパフォーマンスを向上させます。MyBatis-Plusでは、バッチ操作は主に以下のような場面で使用されます：

- データ挿入（Insert）：バッチ挿入はバッチ操作の中で最も一般的な適用シーンの一つです。複数のレコードを一度に挿入することで、SQL文の実行回数を大幅に減らし、データ書き込み速度を向上させます。これはデータ移行や初期データ設定などの場面で特に有効です。
- データ更新（Update）：バッチ更新は複数のレコードの特定フィールドを同時に変更することを可能にし、大量のデータに対して一括変更が必要な状況（ユーザーステータスの一括変更、商品価格の更新など）に適しています。
- データ削除（Delete）：バッチ削除操作はデータベース内の複数レコードを素早く削除するために使用され、データクリーンアップやユーザー削除などの場面でよく利用されます。

## 機能概要

- サポートバージョン：`3.5.4 +`
- トランザクション制御：手動で管理する必要があります（デフォルトではオフ）
- 実行結果：バッチ処理結果を返し、業務ロジックでの成功・失敗判断を容易にします
- データ書き込み：コードが正しく`flushStatements`まで実行されるかどうかに依存します
- 互換性：Springプロジェクトと非Springプロジェクトの両方をサポート
- 例外タイプ：実行時に`PersistenceException`をスロー
- 推奨事項：`saveOrUpdate`メソッドについては、シンプルな新規追加または更新操作に留めることを推奨

## クラス構造説明

### MybatisBatch<?>

- ジェネリック型：実際のデータ型
- sqlSessionFactory：コンテナから取得可能。非Springコンテナ環境ではMybatisを自前で初期化しコンテキストを保持する必要があります
- dataList：実際のバッチ処理データリスト（空不可）

### MybatisBatch.Method<?>

実際にはBatchMethodであり、フレームワーク内部の操作メソッド呼び出しを簡略化します。

- ジェネリック型：実際のMapperメソッドのパラメータ型
- mapperClass：具体的なMapperクラス

### BatchMethod<?>

- ジェネリック型：実際のMapperメソッドのパラメータ型
- statementId：実行するMappedStatementのID
- parameterConvert：パラメータ型変換ハンドラ。データ型とMapperメソッドのパラメータ型が一致しない場合の変換に使用

## 使用手順

1. MybatisBatchインスタンスを作成（データとsqlSessionFactoryをバインド）
2. MybatisBatch.Methodインスタンスを作成（実行するMapperクラスのメソッドを決定）
3. 操作を実行（バッチパラメータをMapperメソッドで必要なパラメータに変換）

## 戻り値説明

戻り値の型：`List<BatchResult>`

戻り値の内容：MappedStatement + SQLの実行結果をグループ化したもの。

**注意**：例えばIDによるバッチ更新で、10件のデータのうち5件が1つのフィールドを更新し、5件が2つのフィールドを更新する場合、戻り値はサイズ2のListとなり、それぞれ5件ずつの更新状況を保持します。

## 使用例

フレームワークはMybatisBatchUtilsによる静的メソッド呼び出しを提供します。

### executeメソッド

insert、update、delete操作に適用されます。

#### 例一：エンティティ型データ

```java
List<H2User> userList = Arrays.asList(new H2User(2000L, "テスト"), new H2User(2001L, "テスト"));
MybatisBatch<H2User> mybatisBatch = new MybatisBatch<>(sqlSessionFactory, userList);
MybatisBatch.Method<H2User> method = new MybatisBatch.Method<>(H2UserMapper.class);
mybatisBatch.execute(method.insert());
```

#### 例二：非エンティティ型データ

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

#### 例三：カスタムメソッド挿入（アノテーションなし）

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

#### 例四：カスタムメソッド挿入（アノテーションあり）

```java
// アノテーション付きmapperメソッド定義
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

保存または更新操作を実行します。

**注意**：異なるsqlSession間では、キャッシュとデータ認識の問題に注意が必要です。

#### 異なるsqlSessionの例

```java
@Autowired
private H2UserMapper userMapper;

List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(40000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // insertメソッドを指定
    ((sqlSession, h2User) -> userMapper.selectById(h2User.getTestId()) == null), // 条件判断
    mapperMethod.updateById()); // updateメソッドを指定
```

#### 同一sqlSessionの例

```java
List<H2User> h2UserList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    h2UserList.add(new H2User(Long.valueOf(50000 + i), "test" + i));
}
MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);

new MybatisBatch<>(sqlSessionFactory, h2UserList).saveOrUpdate(
    mapperMethod.insert(), // insertメソッドを指定
    ((sqlSession, h2User) -> sqlSession.selectList(mapperMethod.get("selectById").getStatementId(), h2User.getTestId()).isEmpty()), // 条件判断
    mapperMethod.updateById()); // updateメソッドを指定
```

### トランザクション処理例

#### Springトランザクション処理例

```java
@Autowired
private TransactionTemplate transactionTemplate;

transactionTemplate.execute((TransactionCallback<List<BatchResult>>) status -> {
    MybatisBatch.Method<H2User> mapperMethod = new MybatisBatch.Method<>(H2UserMapper.class);
    // バッチ挿入を実行
    MybatisBatchUtils.execute(sqlSessionFactory, h2UserList, mapperMethod.insert());
    throw new RuntimeException("出错了");
});
```
### SQL LOAD csv

> テーブルへのインポートにより高いパフォーマンスが要求される場合は、`SQL LOAD csv`を実行する方法を採用できます。以下は`MySQL`の例です：

```sql
LOAD DATA INFILE '/path/to/your/file.csv'
INTO TABLE your_table_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```
