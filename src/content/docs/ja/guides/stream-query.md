---
title: ストリームクエリ
sidebar:
  order: 5
---

MyBatis-Plusは `3.5.4` バージョンからストリームクエリをサポートしています。これは MyBatis のネイティブ機能で、`ResultHandler` インターフェースを使用して結果セットのストリームクエリを実現します。このクエリ方式はデータバッチ処理やビッグデータ処理のビジネスシナリオに適しています。

`BaseMapper` では、`selectList`、`selectByMap`、`selectBatchIds`、`selectMaps`、`selectObjs` などの複数のオーバーロードメソッドが追加され、これらはストリームクエリと組み合わせて使用できます。

注意点として、低バージョンのMyBatis-Plusでは、カスタム `ResultHandler` とページングクエリを組み合わせた場合、エラーが発生する可能性があります。この場合、countクエリを手動で無効にする必要があります。具体的な問題と解決策については、GitHub上の関連issueを参照してください。

## よく使用されるメソッド

- `getResultObject`: データベースの各レコードを取得します。
- `getResultCount`: 現在処理中の結果セットのレコード数を取得します。レコードを1件処理するごとにカウンターが1増加し、カウントは1から開始します。
- `stop`: 結果セットの処理を停止します。ループ内での `break` 文と同等の効果があります。

## 使用例

以下はストリームクエリの使用例で、ページングと組み合わせてデータベースからデータを取得してバッチ処理を行う方法と、テーブルの全レコードを取得して処理する方法を示しています。

```java
// ページングと組み合わせて、データベースからバッチでデータを取得して処理する（例：データベースから10万件のレコードを取得してデータ処理を行う）
Page<H2User> page = new Page<>(1, 100000);
baseMapper.selectList(page, Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("現在" + (++count) + "件目のレコードを処理中: " + h2User);
        // ここでビジネス処理を実行、例：タスクの振り分けなど
    }
});

// データベースからテーブルの全レコードを取得して処理
baseMapper.selectList(Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("現在" + (++count) + "件目のレコードを処理中: " + h2User);
        // ここでビジネス処理を実行、例：タスクの振り分けなど
    }
});
```

上記の例では、ページングパラメータを指定するために `Page` オブジェクトを作成し、`selectList` メソッドを呼び出して `ResultHandler` を渡すことで各レコードを処理しています。`ResultHandler` の `handleResult` メソッド内では、現在処理中のレコードを取得し、適切なビジネス処理を実行できます。カウンター `count` を使用することで、現在処理中のレコードが何件目かを知ることができます。
