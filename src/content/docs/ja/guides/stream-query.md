---
title: ストリーミングクエリ
sidebar:
  order: 5
---

MyBatis-Plus はバージョン `3.5.4` からストリーミングクエリをサポートしています。これは MyBatis のネイティブ機能であり、`ResultHandler` インターフェースを使用して結果セットのストリーミングクエリを実現します。このクエリ方式は、データのバッチ処理や大量データを扱うビジネスシナリオに適しています。

`BaseMapper` には、`selectList`、`selectByMap`、`selectBatchIds`、`selectMaps`、`selectObjs` といった複数のオーバーロードメソッドが追加されており、これらのメソッドはストリーミングクエリと組み合わせて使用できます。

注意点として、古いバージョンの MyBatis-Plus では、カスタム `ResultHandler` をページネーションクエリと組み合わせて使用すると、エラーが発生する可能性があります。このような場合、count クエリを手動で無効にする必要があります。具体的な問題と解決策については、GitHub 上の関連 issue を参照してください。

## 主なメソッド

- `getResultObject`: データベースから取得した各レコードを取得します。
- `getResultCount`: 現在処理中の結果セットのレコード数を取得します。各レコードを処理するごとにこのカウンターが1ずつ増加し、カウントは1から始まります。
- `stop`: 結果セットの処理を停止します。ループ内で `break` 文を使用するのと同等です。

## 使用例

以下は、ストリーミングクエリの使用例です。ページネーションと組み合わせてデータベースからデータを取得しバッチ処理を行う方法、およびテーブル内の全レコードを取得して処理する方法を示しています。

```java
// ページネーションと組み合わせ、データベースからバッチでデータを取得して処理する例（例：データベースから10万件のレコードを取得し、データ処理を行う）
Page<H2User> page = new Page<>(1, 100000);
baseMapper.selectList(page, Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("現在処理中のレコードは" + (++count) + "件目です: " + h2User);
        // ここでタスクの分配などの業務処理を行います
    }
});

// データベースからテーブルの全レコードを取得し、データ処理を行う例
baseMapper.selectList(Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("現在処理中のレコードは" + (++count) + "件目です: " + h2User);
        // ここでタスクの分配などの業務処理を行います
    }
});
```

上記の例では、ページネーションパラメータを指定するために `Page` オブジェクトを作成し、その後 `selectList` メソッドを呼び出して `ResultHandler` を渡し、各レコードを処理しています。`ResultHandler` の `handleResult` メソッド内では、現在処理中のレコードを取得し、対応する業務処理を行うことができます。カウンター `count` を使用することで、現在処理中のレコードが何件目であるかを把握できます。
