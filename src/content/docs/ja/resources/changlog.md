---
title: 更新履歴
description: バージョン更新履歴
---
## [v3.5.14] 2025.08.29
- feat: `bom`に`mybatis-plus-spring-boot4-starter`と`mybatis-plus-spring-boot4-starter-test`の管理を追加

## [v3.5.13] 2025.08.29
- fix: `Spring`環境で`@PostConstruct`を使用して`Db`メソッドを呼び出しクエリを実行した際に警告ログが出力される問題を修正
- fix: `Db`で`count`を使用した際に`null`が返された場合に発生するヌルポインタ例外を修正
- fix: `BaseMapper`が非`Spring`プロジェクトでエラーを報告する問題を修正
- feat: `Jsqlparser`を5.2にアップグレード
- feat: `OrderItem`に`withExpression`を追加し、式に基づく並べ替えをサポート（注意: シリアライズ方式での使用はサポートされていません。`SQL`インジェクションはご自身で制御してください）
- feat: `OracleDdlGenerator`が特定の`schema`モードでの実行をサポート
- feat: 華為雲`GaussDb`データベースへの対応を追加
- feat: スノーフレークID生成器の初期化エラーに対するフォールバック処理を追加
- feat: `spring-boot4`のサポートを新規追加
- feat: `gradle`を8.13にアップグレード
- opt: `SqlUtils`の`replaceSqlPlaceholder`メソッドにキャッシュ処理を追加
- opt: `DDL`実行レコードテーブルの存在チェックを最適化
- opt: コンテナ環境での`workerId`取得を最適化

## [v3.5.12] 2025.04.27

- fix: バッチ操作の非同期実行で初回に発生する可能性があった`NoSuchElementException`エラーを修正
- fix: デフォルトの`SQL`解析スレッドプールが`JVM`終了時にシャットダウンされることで発生するタスク拒否を修正
- fix: `entity.java.btl`で生成される`toString`メソッドのスタイルエラーを修正
- fix: `entity.java.ftl`テンプレートのクラスコメントとインポート文の間の改行不足を修正
- opt: `SqlRunner`の`SQL`文実行をリファクタリング (動的パラメータ渡し、パラメータ値に基づく実行`SQL`の生成を廃止)
- opt: `SqlRunner`の実行を強化 (単一パラメータでの`Map`({key}), `List`({index}), `JavaBean`({property})を使用した値取得をサポート)
- opt: `MybatisUtils`による`SqlSessionFactory`からの抽出を改善 (カスタム`SqlSessionTemplate`サブクラスをサポート)
- opt: データベースの自動認識で`TDengine`データベースの`websocket`接続をサポート
- opt: `Db`ユーティリティクラスでのマルチデータソース対応をサポート
- opt: `MapperProxy`の属性アクセスを最適化
- opt: `CompatibleSet`インターフェースに`getBean`と`getProxyTargetObject`メソッドを追加
- opt: `CompatibleSet`と`CompatibleHelper`を`com.baomidou.mybatisplus.core.spi`パッケージに移動
- opt: `CompatibleSet`実装の手動指定をサポート
- opt: コードジェネレータがドライバから返されるインデックス情報の`null`を処理
- opt: コードジェネレータが`PRIMARY_KEY_`で始まる主キーインデックスのケースを処理
- opt: `entity.kt.btl`テンプレートの`@Override`アノテーションを除去
- opt: `serviceImpl.java.ej`の生成フォーマット不統一を解決
- opt: `mapper.java.ftl`の余分な改行生成を除去
- opt: `entity.kt.vm`,`entity.kt.ej`,`entity.kt.btl`のインポート文終了区切り文字を除去
- opt: `controller.java.ej`,`controller.java.vm`の余分な改行を除去
- opt: `entity.kt.btl`で生成されるプロパティの余分なスペースを除去
- opt: `entity.java.btl`,`entity.java.ej`,`entity.java.ftl`,`entity.java.vm`で生成される`toString`メソッドのスタイルを統一

## [v3.5.11] 2025.03.23

- **fix**: コードジェネレータのチェーンモデルにおいて、非`lombok`環境で`@Accessors`アノテーションが生成される問題を修正
- **fix**: 主キーに`UUID`を使用した場合のバッチ削除実行エラーを修正
- **fix**: `Kotlin`で`select(predicate)`メソッドを使用した際のエラーを修正
- **fix**: `AbstractCaffeineJsqlParseCache`の非同期処理によるエラーを修正
- **fix**: 動的SQL解析においてSQLコメント（-- または #）を含む場合のマージエラーを修正（動的スクリプト文では改行処理を行わなくなりました。改行を除去する必要がある場合は、ご自身で処理してください）
- **fix**: `DataChangeRecorderInnerInterceptor`のデータ比較時に発生するキャスト例外を修正
- **fix**: `IllegalSQLInnerInterceptor`インターセプタプラグインにおける`catalog`と`schema`の取得エラーを修正
- **fix**: 動的テーブル解析における`create table if not exists`のテーブル名取得エラーを修正
- **fix**: 動的テーブル解析における`create [type] index`のテーブル名取得エラーを修正
- **feat**: `DynamicTableNameJsqlParserInnerInterceptor`を新規追加 - `JsqlParser`ベースの動的テーブル処理
- **feat**: `DdlScript`カスタムスクリプトランナーパラメータをサポート
- **feat**: `DdlHelper`カスタムスクリプトランナーパラメータをサポート
- **feat**: `DdlApplicationRunner`パラメータ設定をサポート（スクリプトエラー処理、カスタム`ScriptRunner`、マルチプロセッサ実行例外時の中断設定）
- **feat**: `BaseMultiTableInnerInterceptor`での条件追加モード指定をサポート（デフォルトでは条件を末尾に追加、`select`、`delete`、`update`にのみ作用）
- **feat**: ジェネレータで`Entity`の`serialVersionUID`指定時に`@Serial`アノテーションを追加する機能をサポート
- **feat**: ジェネレータでの`Entity`アノテーション（フィールド、クラスアノテーション）カスタム処理をサポート
- **feat**: ジェネレータでの`Entity`インポートカスタム処理をサポート
- **feat**: `崖山`データベースをサポート
- **feat**: `Hive2`のページネーションをサポート
- **feat**: `Gradle`を8.10にアップグレード
- **feat**: `DdlHelper`でのカスタム例外処理実行をサポート
- **opt**: `DynamicTableNameInnerInterceptor`のテーブル処理ロジックを調整し、`hook`の実行を保証
- **opt**: `DdlScript`クラスメソッドの実装を調整（DDLバージョン記録の分離、実行メソッドの最適化）
- **opt**: `DbType#GAUSS`のデータベース名を`gauss`に調整
- **opt**: `JsqlParserGlobal`解析スレッドプールの指定を調整
- **opt**: 非推奨となった`FieldStrategy.IGNORED`を削除
- **opt**: 非推奨となった`GlobalConfig.DbConfig#selectStrategy`を削除
- **opt**: 非推奨となった`MybatisSqlSessionFactoryBean#typeEnumsPackage`を削除
- **opt**: `DdlHelper`のリソースローディングを最適化（`Spring`またはその他の実装に依存しないように変更）
- **opt**: `DdlHelper`の`getScriptRunner`メソッドで指定されていた文字セットエンコーディングを除去
- **doc**: `DdlHelper`のコメント誤りを修正

`jsqlParser` 5.0バージョンと5.1バージョン間のアップグレード非互換性はそれほど大きくないため、後期に`mybatis-plus-jsqlparser-5.0`サポートモジュールの削除を計画しています。
  マルチバージョンサポートは比較的煩雑であるため、後期は`mybatis-plus-jsqlparser-4.9` と `mybatis-plus-jsqlparser`（最新版への追随を維持、次回のJDKバージョンアップまで）のみをメンテナンスします。

## [v3.5.10.1] 2025.01.13

- fix: 動的ノード処理エラーの修正

## [v3.5.10] 2025.01.12
- fix: フィールドに`TableField`アノテーションがあるが`value`値が指定されていない場合、グローバルな`columnFormat`が有効にならない問題を修正
- fix: enjoyテンプレートでKotlinコード生成時にエラーが発生する問題を修正
- fix: enjoyテンプレートで文字列コード生成時にエラーが発生する問題を修正
- fix: springdocによるアノテーション生成で二重引用符がエスケープされない問題を修正
- fix: データ変更プラグインで更新時に主キーがない場合にエラーが発生する問題を修正
- fix: 複数テーブル解析時のprocessJoinsでテーブル解析が範囲外になる問題を修正
- feat: TableNameアノテーションに`properties`属性を追加
- feat: @InterceptorIgnoreアノテーションをdefaultメソッドでサポート
- feat: jsqlparser 5.1バージョンに対応（5.0互換バージョンは`mybatis-plus-jsqlparser-5.0`を使用してください）
- feat: プラグインスキップ戦略を処理するための`InterceptorIgnoreHelper.execute`テンプレート実行メソッドを提供（手動でhandleメソッドを使用した際のスレッドリソース未クリーンアップによるエラーを防止）
- feat: コードジェネレーターのグローバルpackage設定属性でカスタムテンプレート情報の取得をサポート
- feat: コードジェネレーターにテーブルインデックス情報の取得を追加
- feat: コードジェネレーターが`Mapper.Builder.generateMapperMethodHandler`プロセッサーを提供し、インデックスに基づいたインデックスメソッドを生成
- feat: コードジェネレーターのEntityでカスタムClassアノテーションとフィールドアノテーションの生成をサポート
- feat: コードジェネレーターのEntityでlombokモード時の生成クラスアノテーション指定をサポート
- feat: コードジェネレーターのEntityでToString`(Entity.Builder.toString(boolean))`メソッドによる生成制御をサポート（デフォルトで生成、lombokモードでは@ToStringを生成、低バージョンのlombokでは生成されないため非互換変更となります）
- feat: コードジェネレーターのEntityでフィールドドキュメントコメント(`Entity.Builder.fieldUseJavaDoc(boolean)`)の生成制御をサポート（デフォルトで生成、低バージョンではswaggerまたはspringdoc使用時にフィールドドキュメントコメントが生成されないため非互換変更となります）
- feat: 動的ステートメント生成を再実装（生成される実行SQLに\n改行文字が含まれなくなります）
- feat: セキュリティ暗号化プロセッサーのキー取得で環境変数とシステムプロパティの受け渡しをサポート
- feat: mybatisを3.5.19にアップグレード
- feat: springbootを3.4.1にアップグレード
- feat: kotlinを2.1.0にアップグレード
- 実用性が低く、文法チェックが不十分なため、IllegalSQLInnerInterceptorプラグインの削除を計画
- 機能欠陥が多いため、DataChangeRecorderInnerInterceptorプラグインの削除を計画

## [v3.5.9] 2024.10.23
- **opt**: コードジェネレーターの可視化設定生成機能をサポートするように最適化
- **opt**: 拡張パッケージの依存関係を解消し、Spring開発フレームワークへの強制依存を廃止
- **opt**: jsqlparserサポートモジュールを分割し、mybatis-plus-jsqlparser（最新jsqlparserをサポート）とmybatis-plus-jsqlparser-4.9モジュールを提供。デフォルトでは同梱されないため、アップグレード後は手動での導入が必要です。
- **feat**: ServiceモジュールをCrudRepositoryとして再構築し、ビジネス層でのデータ混在を避けるためIServiceの使用を非推奨化
- **feat**: Solon起動プラグインのサポートを新規追加
- **feat**: SpringBoot 3.3.4へアップグレード
- **feat**: velocity 2.4へアップグレード

## [v3.5.8] 2024.09.18
- fix: `optimizeJoinOfCountSql`のデシリアライズ非サポート問題を解決
- fix: Dbユーティリティクラスのバッチ操作で`rewriteBatchedStatements=true`を使用した際の戻り値が不正確な問題を解決
- fix: 論理削除フィルと楽観ロックの競合を修正
- fix: `IllegalSQLInnerInterceptor`がネストされたcount文の解析を誤る問題を修正
- fix: jsqlParserを5.0にアップグレードし、`for update`文のエラーを解決
- fix: インクリメント/デクリメントにおける負数の処理が原因のjsqlParser解析最適化エラーを修正
- fix: `removeMapper`のキャッシュクリーンアップが不完全な問題を修正
- fix: `SqlServerQuery`でのテーブルコメント文字化けを修正
- opt: 関数インジェクションのバリデーションロジックを改善
- opt: `Page`プロパティのアクセスを`private`に変更し、`toString`メソッドをオーバーライド
- opt: 主キー生成戦略(uuid)で未サポートの型の場合、警告ログを出力するように変更
- opt: `MybatisPlusException`を`PersistenceException`のサブクラスに変換
- feat: `deleteByIds`での空コレクション処理を追加
- feat: `selectBatchIds`メソッドを`selectByIds`に名称変更
- feat: `tableName`と`schema`プロパティでのプレースホルダー設定をサポート
- feat: コードジェネレーターで仮想列の属性取得を追加
- feat: チェーンラッパーをラムダチェーンラッパーに #6314
- feat: コードジェネレーターでデータベースドライバーの手動指定を追加（自動登録できないドライバー実装との互換性確保）
- feat: Kotlinを2.0.0にアップグレード
- feat: Spring Bootを3.3.2にアップグレード
- feat: fastjson2を2.0.52にアップグレード
- feat: mybatis-springを3.0.4にアップグレード
- feat: spring-cloud-commonsを4.1.4にアップグレード
- feat: 一部のサポート依存関係をアップグレード更新
- feat: GoldenDBデータベースをサポート
- feat: DuckDBデータベースをサポート
- feat: Derbyデータベースをサポート
- feat: Vastbaseデータベースをサポート

## [v3.5.7] 2024.06.10
- fix: 動的テーブル名処理における update ignore エラーを修正
- fix: SQLServer2005 のページネーション処理における空白文字エラーを修正
- fix: マルチテナントクエリで発生する問題を修正
- fix: 非汎用ジェネリックの場合にシリアライズ化 JSON のキャストを削減して修正
- fix: コードジェネレーターのテンプレート無効化が機能しない問題を修正
- fix: ページネーション count 最適化における distinct と orderBy の組み合わせ処理エラーを修正
- fix: 達夢データベースでのコード生成エラーを修正
- fix: テナントプラグインで特殊な exists 文が無効になる問題を修正
- fix: SQLite データベースの ddl_history エラーによるテーブル作成失敗を修正
- fix: DataChangeRecorderInnerInterceptor の Insert 時における設定無効化の問題を修正
- fix: コードジェネレーターが非標準の JdbcType を処理する際のヌルポインタ例外を修正
- feat: BaseMapper にバッチ操作と InsertOrUpdate メソッドを追加
- feat: BaseMapper のバッチ操作メソッドの戻り値として List<BatchResult> を追加
- feat: BaseMapper メソッドの論理削除でデフォルトでフィル対応をサポート
- feat: Service 層の論理削除フィル処理ロジックを調整
- feat: バッチ削除のパラメータフィル処理ロジックをリファクタリング
- feat: 自動増減処理で BigDecimal をサポート
- feat: スノーフレークID設定を追加（workerId と datacenterId の手動割り当て、またはネットワークインターフェース情報指定による自動取得をサポート）
- feat: ServiceImpl のジェネリックパラメータ抽出をリファクタリング
- feat: AES 鍵のランダム生成を変更
- feat: UpdateWrapper に checkSqlInjection メソッドを追加
- feat: DDL スクリプトの自動アセンブリロジックを調整（実装がない場合、または mybatis-plus-extension モジュールがない場合に DDL 実行 bean を注入しない）
- feat: 注入メソッド deleteBatchIds を deleteByIds に名称変更
- feat: SpringBoot を 2.7.18 および 3.2.6 にアップグレード
- feat: kotlin を 1.9.24 にアップグレード
- feat: lombok を 1.18.32 にアップグレード

## [v3.5.6] 2024.04.08
- fix: 汎用Serviceの多重プロキシによるエラーを修正
- fix: Jsonタイプハンドラによるデシリアライズ時のジェネリック型の元の型が失われる問題を修正
- fix: フィルターハンドラでの基本型配列におけるキャストエラーを修正
- fix: 前バージョンで削除されたPageメソッドをPageDtoクラスに保持するよう修正
- fix: IllegalSQLInnerInterceptorが括弧を処理しない問題を修正
- fix: IllegalSQLInnerInterceptorでのテーブル名やフィールド名のラッピングによるインデックス情報取得とインデックスフィールド検証の問題を修正
- fix: KtUpdateChainWrapperでsetSqlを呼び出す際にparamsが展開されない問題を修正
- fix: useGeneratedShortKey設定の不具合を修正
- fix: DataChangeRecorderInnerInterceptorの一連の問題を修正
- feat: sqlFirstとsqlCommentのエスケープを削除（エスケープ操作が必要な場合は、手動でエスケープを呼び出してから渡してください）
- feat: ServiceImplを抽象クラスに変更し、誤った直接インスタンス化を防止
- feat: コードジェネレータのTemplateConfig設定をリファクタリング、テンプレートの無効化とパス設定を対応する具体的な実装に変更
- feat: 複合アノテーションをサポート
- feat: LambdaUpdateWrapperにフィールドのインクリメントsetIncrBy、デクリメントsetDecrByメソッドを追加
- feat: 注入メソッドの取得時にorg.apache.ibatis.session.Configurationを渡すよう変更
- feat: 自動インクリメント主キーの互換性設定スイッチを追加（mybatis-plus.global-config.db-config.insert-ignore-auto-increment-column デフォルトfalse、有効時はINSERT文が主キーフィールドの生成を無視）
- feat: パラメータフィラーのスキップ方法を追加（MappedStatement#idベース）
- feat: SQLiteのDDL自動メンテナンス機能を追加
- feat: eqSqlメソッドを追加
- feat: SQL解析スレッドプールを追加
- feat: スノーフレークIDジェネレータの初期化ログ出力を追加（デフォルトで5秒を超える場合に警告ログを出力）
- feat: mybatisを3.5.16にアップグレード
- feat: spring-cloud-commonsをアップグレード
- feat: jsqlparserを4.9にアップグレード
- test: GitHubにCIを追加
- doc: update(Wrapper)関連APIで自動フィルができないことに関するコメントを追加

## [v3.5.5] 2023.12.24
- fix: 設定された databaseId が無効になる問題を修正
- fix: 自動インクリメント主キーの注入エラーを無視する際に、非自動インクリメント主キーの注入が無視される問題を修正
- fix: ChainWrapper モードで GroupBy が余分なカンマを生成する問題を修正
- fix: selectOne のキャッシュ問題を修正
- fix: データ権限のマルチテーブルサポートが特定のシナリオで無効になる問題を修正
- fix: ジェネレータの MySQL タイプコンバータにおける point 変換の誤りを修正
- fix: Kotlin で親クラスのプロパティを操作できない問題を修正
- fix: 自動注入される DdlApplicationRunner が null を返すことによる、高バージョンの Spring Boot 起動エラーを修正
- fix: ジェネレータのコードヒントにおける RuntimeUtils のセキュリティ脆弱性問題を修正
- feat: fastjson2 のサポートを追加
- feat: gradle-wrapper を 8.4 にアップグレード
- feat: kotlin-gradle-plugin を 1.9.21 にアップグレード
- feat: mybatis を 3.5.15 にアップグレード
- feat: lombok を 1.18.30 にアップグレード
- feat: spring-boot3 を 3.2.0 にアップグレード
- feat: spring-boot2 バージョンの mybatis-spring を 2.1.2 にアップグレード
- feat: spring-boot3 バージョンの mybatis-spring を 3.0.3 にアップグレード
- feat: 汎用 Service における saveOrUpdate のトランザクションを削除
- feat: Trino, Presto, GBase8s-pg, SUNDB データベースをサポート

## [v3.5.4.1] 2023.11.4
- fix: AOPによるMapper層の拡張が原因で発生していた変換エラーを修正しました。

## [v3.5.4] 2023.10.22

- **fix**: Insertでフィールドがない場合にSQL実行エラーが発生する問題を修正
- **fix**: 高バージョンのJDKでlambdaがIDEAデバッグを実行できない問題を修正
- **fix**: LambdaQueryにおけるselect、groupBy、orderBy、orderByAsc、orderByDescの警告を修正し、対応するdoXxxメソッドを追加してオーバーライドをサポート（非互換変更、apiメソッドをfinal処理）
- **fix**: inject-sql-session-on-mapper-scanの設定がない場合の警告を修正
- **fix**: @OrderByと@TableIdを併用した場合のソートフィールドエラーを修正（非互換変更、com.baomidou.mybatisplus.core.metadata.TableInfo.orderByFieldsの型を調整）
- **fix**: Serviceにおける主キーに基づく論理削除時の型不一致によるエラーを修正
- **fix**: ページネーションプラグインのCountとカスタムResultHandlerの競合を修正
- **fix**: フィールドフィルハンドラでの再入問題の可能性を修正
- **feat**: 自動増分主キーフィールドの挿入許可制御を追加。メソッドインジェクションでInsert(boolean ignoreAutoIncrementColumn)またはInsert(String name, boolean ignoreAutoIncrementColumn)をオーバーライドし、自動増分主キーの書き込み動作を制御可能
- **feat**: ActiveRecordモードでのdeleteById（論理削除）メソッドが自動フィル機能をサポート
- **feat**: 組み込みのジェネリック抽出を追加し、非Spring体系プロジェクトでの使用をサポート
- **feat**: BaseMapperにupdate(wrapper)更新メソッドを追加
- **feat**: BaseMapperにストリームクエリメソッドを追加し、大規模データクエリをサポート
- **feat**: コードジェネレータのメタデータ情報でtableNameとcolumnNameフィールドへのアクセスを公開
- **feat**: mybatis-plus-spring-boot3-starterとmybatis-plus-spring-boot3-starter-testを追加し、SpringBoot3をサポート
- **feat**: プラグインのデフォルトインジェクションをサポート。MybatisPlusInterceptorがない場合、com.baomidou.mybatisplus.extension.plugins.inner.InnerInterceptorの自動インジェクションをサポート
- **feat**: ソースコードのJDK開発バージョンをJava21にアップグレード
- **feat**: gradle-wrapperを8.4-rc-1にアップグレード
- **feat**: kotlin-gradle-pluginを1.9.20-Betaにアップグレード
- **feat**: SpringBoot2.xバージョンを2.7.15にアップグレード
- **feat**: lombokを1.18.30にアップグレード
- **opt**: mybatis-plus-extensionのmybatis-spring依存をオプション依存に変更（非互換変更、非springまたは非springBootプロジェクトで使用している場合は手動で依存を追加してください）
- **opt**: spring-boot-starterの不要な設定警告を削減（非互換変更、com.baomidou.mybatisplus.autoconfigure.MybatisPlusProperties.configurationの型を調整）
- **opt**: フィールドフィルハンドラの抽出で固定パラメータ抽出を除去し、より柔軟なmapperメソッドパラメータ抽出とフィル処理をサポート
- **opt**: com.baomidou.mybatisplus.core.toolkit.ReflectionKit.setAccessibleメソッド呼び出しを除去し、高バージョンJDKでの削除を防止
- **opt**: selectOneメソッドを調整（ストリーム処理に対応、最大2行のデータを抽出、ログで総レコード数を表示しない）
- **opt**: selectObjsメソッドの戻り値を最適化し、型強制変換を削減
- **opt**: 汎用Serviceが複数SqlSessionFactoryのインジェクションをサポート
- **opt**: TableInfo.newInstanceのインスタンス作成メソッドを最適化
- **opt**: 不要な@SuppressWarnings("serial")を除去

## [v3.5.3.2] 2023.08.08

- **feat**: MyBatisを3.5.13、mybatis-springを2.1.1にアップグレード
- **feat**: JSQLParserに統一解析クラスを提供、解析関数の設定可能化とキャッシュオプションを追加
- **feat**: Sequence初期化のデバッグログを追加
- **feat**: パラメータフィラーが複数パラメータのフィルをサポート
- **feat**: BaseMapperにselectMaps(page, wrapper)とselectList(page, wrapper)メソッドを追加
- **feat**: 楽観ロックフィールドがjava.time.Instantをサポート
- **feat**: `wrapper#apply`が`mapping`の設定をサポート（例: `column={0,javaType=int,jdbcType=NUMERIC,typeHandler=xxx.xxx.MyTypeHandler}`）
- **feat**: QueryWrapperのSQLインジェクションフィルタチェックを明示的に有効化するよう調整（wrapperのorderbyのSQLフィルタ機能を削除）
- **feat**: 星瑞格データベースのサポートを追加
- **feat**: `updateWrapper#setSql`メソッドが`動的パラメータ`をサポート（`wrapper#apply`メソッドを参照）
- **feat**: 自動SQLメンテナンスDDLがSQL実行ストアドプロシージャをサポート
- **perf**: `ktWrapper`のジェネリック制約を強化
- **fix**: SpringDocドキュメントコメント選択時のエンティティ記述異常を修正
- **fix**: 主キーの`IdType`が`AUTO`の場合の`Table#getAllInsertSqlColumnMaybeIf("xx.")`によるSQL生成エラーを修正
- **fix**: テナントプラグインが`update set subSelect`の場合をサポート
- **fix**: 高バージョンJDKでの不正リフレクション警告を修正（Illegal reflective access by com.baomidou.mybatisplus.core.toolkit.SetAccessibleAction）
- **fix**: 高バージョンJDKプラグインでの動的プロキシリフレクションエラーを修正（Unable to make field protected java.lang.reflect.InvocationHandler java.lang.reflect.Proxy.h accessible）
- **fix**: パス置換で既存の「.」がファイル区切り文字「/」に置き換えられる問題を修正
- **fix**: Beetlテンプレートエンジンでコメントが生成できない問題を修正
- **fix**: Types.DOUBLEタイプのマッピング失敗を修正
- **fix**: 親クラスの共通フィールド変換時のエラーを修正
- **fix**: ジェネレータでcfg.による値取得ができない問題を修正
- **fix**: 単体テストでのMockBean使用時のトランザクションロールバック失敗を修正
- **fix**: WarpperクラスのnonEmptyOfWhereメソッド命名不備によるOgnlキャッシュ不正と実行オーバーヘッドを修正
- **fix**: ClickHouseQueryクラスのtableComment()メソッドがテーブルコメントフィールドをcommentとして返すよう修正
- **fix**: SpringDocドキュメントコメント選択時のエンティティ記述異常問題を修正
- **fix**: Table\#getAllInsertSqlColumnMaybeIf("xx.")でのSQL生成エラー問題を修正
- **fix**: Dbクラスにエンティティの空でないフィールド条件による検索メソッドのオーバーロードを追加
- **fix**: ジェネレータのKotlinエンティティファイルでのsuperEntityClassのエラーを修正
- **fix**: SpringDoc Freemarkerモードでのテーブルコメント値取得失敗を修正
- **opt**: パラメータフィルプロセッサを強化、パラメータ名とフィル名が一致する場合のタイプ不一致による変換エラーを防止
- **opt**: メソッドインジェクションを最適化、SelectPage、SelectMapsPage、SelectByMap、DeleteByMapインジェクションを削除
- **opt**: MappedStatementのヒープメモリ使用量を削減
- **opt**: PluginUtilsのメタデータ重複取得によるパフォーマンス消費を解決
- **opt**: インジェクションメソッドから余分な改行文字を除去
- **opt**: SqlRunnerが保持するsqlSessionFactory変数を除去
- **opt**: Sequenceの多重初期化問題を解決（カスタム設定時はデフォルト主キージェネレータを作成しない）
- **opt**: SqlHelper#getMapperの戻り値ジェネリックを最適化
- **opt**: SqlRunnerが保持するsqlSessionFactory変数を除去
- **docs**: DdlHelperのコメント誤りを修正

## [v3.5.3.1] 2022.12.29

- **bug**: 生成モジュールのPostgreSQLおよびDameng文のモード名を追加
- **feat**: ChainWrapper#getEntityClass を最適化
- **fix**: IService.lambdaQuery().one() 使用時にデータベースにデータが存在しない場合のエラーを修正
- **test**: テナントプラグインがSQLを解析する際、複数テーブルがある場合はテーブルにエイリアスを付与する必要がある問題を修正

## [v3.5.3] 2022.12.28

- マルチテナントプラグイン: 複数テーブルのJOINにおいてテーブル名にエイリアスが必須となりました。エイリアスがない場合、追加されるフィルタ条件にプレフィックスが付きません
- InterceptorIgnore が selectKey をフィルタリングできない問題を修正
- ページネーションに `informixデータベース` のサポートを追加
- ページネーションに `優炫データベース` のサポートを追加
- ページネーションに `TDengineデータベース` のサポートを追加
- ページネーションに `Amazon Redshiftデータベース` のサポートを追加
- Spring Boot 2.7以降のバージョンをサポート
- スノーフレークIDにタイムスタンプを逆解析するメソッド `Sequence#parseIdTimestamp` を追加
- BaseMapper.selectCount で生成されるSQLステートメントに `AS total` を追加
- IllegalSQLInnerInterceptor クラスの ClassCastException 例外を修正し、ログを最適化
- アノテーション `OrderBy` の非推奨属性 `isDesc` を削除
- `TableInfo` の非推奨メソッドを削除
- `TableInfo` の初期化に参加する `JoinTableInfoInitHandler` クラスを追加
- StringUtils.sqlInjectionReplaceBlank メソッドによるSQLフィルタリングが不完全で、SQLインジェクションが発生する可能性がある問題を修正
- IService.lambdaQuery(entity) のサポートを追加、より簡潔な記述が可能に
- データ変更記録（データ監査）プラグイン `DataChangeRecorderInnerInterceptor` を新規追加
- クエリ条件メソッド notLikeLeft と notLikeRight を新規追加
- データ権限における複数テーブル解析部分の処理を最適化
- サブクラスが orderBy 基本メソッドをオーバーライドすることを許可 gitee issues/I61F51
- Dbクラスを新規追加、SimpleQuery クラスを調整
- スクリプト自動メンテナンス機能を新規追加
- 手動インターセプター無視戦略のサポートを追加。例: `InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());`
- PostgreSQLデータベースの大文字フィールド名（例: ID）での自動インクリメントをサポート fixed issues/I4T0YJ
- コードジェネレーターのリファクタリングが完了し、MPコアコードライブラリにマージ
- コードジェネレーターにServiceインターフェースを生成するかどうかの切り替えスイッチを追加

## [v3.5.2] 2022.06.01

- MyBatis 3.5.10 へアップグレード
- jsqlparser 4.4 へアップグレード
- 垂直データベースのページネーションサポートを追加
- Gbase 8s データベースのサポートを追加
- 行云データベースのページネーションサポートを追加
- Firebird データベースのページネーションサポートを追加
- パラメータ埋め込みの判定エラーを修正、置換フィールド定数をマーク
- DbType の整理および IDialect 実装クラスの整理
- SqlHelper.execute を新規追加、entityClass を通じて BaseMapper を取得
- 列挙型処理を最適化、'typeEnumsPackage' 設定が不要に
- テナントID取得の実行順序を修正
- Firebird データベース用 KeyGenerator を新規追加
- 達夢Dmデータベース用 KeyGenerator を新規追加
- Merge pull request #4343 from LK820/fix-IdType.java
- Merge pull request #4495 from nieqiurong/fix-parameter
- Merge pull request #4314 from tomalloc/3.0

## [v3.5.1] 2022.01.25

- Impala データベースサポートを追加
- データベースタイプの動的取得をキャッシュ
- 制御可能なID割り当てメソッドを追加 fixed github pull/4231
- 列挙型スキャン登録の遅延処理を追加
- 楽観ロックプラグインがWrapperに基づく設定をサポート github pull/3664
- H2KeyGenerator の構文を修正
- SimpleQuery の最適化とバグ修正
- fixed gitee issues/I4P9EN
- SybaseDialect のキーワード置換を最適化

## [v3.5.0] 2022.01.01

- MyBatis 3.5.9 へアップグレード
- jsqlparser 4.3 へアップグレード
- Mapper 関連キャッシュの削除機能を追加、GroovyClassLoader による Mapper の動的注入をサポート
- 動的テーブル名のフック関数を追加 https://github.com/baomidou/mybatis-plus/pull/3965
- 注入クラス DefaultSqlInjector の最適化調整
- リフレクションクラス ReflectionKit の最適化 field -> field を Function.identity() に変更
- baseMapper に exist メソッドを追加
- sysbase の小文字 from による index の正しいインデックス値取得失敗問題を解決
- entityClass による Mapper 取得メソッドを追加 `BaseMapper<Entity> mapper = SqlHelper.getMapper(Entity.class);`
- 注入メソッド byId の注入最適化
- マルチテナント right join バグ修正 https://gitee.com/baomidou/mybatis-plus/issues/I4FP6E  https://github.com/baomidou/mybatis-plus/pull/4035
- カスタム注入メソッド名の最適化 https://github.com/baomidou/mybatis-plus/pull/4159
- SAP HANA メモリデータベースを追加
- SimpleQuery ツールクラスによるクエリを追加
- SQL 注入検証ツールクラスのコード記述方法を修正
- 文字列定数の使用を整理
- license-gradle-plugin バージョンをアップグレード
- カスタム注入メソッド名の最適化 (非互換)
- columnsToString メソッドのオーバーロードによりサブクラスでの調整を許可
- et 判定ロジックを修正 gitee issues/I4L4XV を修正
- 論理削除 byId がエンティティ削除への変換とフィルをサポート

## [v3.4.3.4] 2021.09.22

- order by ラッパーの条件存在時の非ソート問題を修正
- cloud InetUtils クラス導入によるコンパイルエラーを解決
- SQL 解析依存 jsqlparser のバージョンを 4.2 にアップグレード
- fix: JDK16 でモジュール化検証が追加された後の lambda シリアライズ失敗問題を修正
- fix: Java 17 のサポート #I4A7I5
- bug: left join 条件構築で余分な条件が生成される問題を修正
- fix: 論理削除フィールドのデフォルト値が null の場合の全表更新プラグイン無効化問題を修正
- ページネーション count(*) as total
- カスタムトランザクションファクトリー TransactionFactory の注入を許可

## [v3.4.3.3] 2021.09.05

- 使用されていないユーティリティクラス `ISqlParserFilter` を削除。`AbstractJsqlParser` を使用する場合は旧バージョンからコピーしてください
- グローバル設定の `workerId`、`datacenterId` パラメータを削除。直接 `identifierGenerator` を初期化することを推奨します
- `count` メソッドの戻り値型を `Integer` から `Long` に変更。アップグレードに伴う対応コストに【注意】してください。不具合調整によりご迷惑をおかけしたことをお詫び申し上げます
- 主キー `@0rderby` アノテーションのバグを修正
- `String` 型主キーの削除失敗を修正
- 主キー型に `BigDecimal`、`BigInteger` のサポートを追加
- Spring フレームワークへの強依存を分離。非 Spring フレームワークで MyBatis-Plus を使用する場合は `GenericTypeUtils.setGenericTypeResolver` で注入してください

## [v3.4.3.2] 2021.08.21

- goldilocks データベースおよび csiidb データベースのサポートを追加
- 南京大学通用GBase 8sデータベース（GBASEDBT）のサポートを追加（既存の定義（GBASE）とは区別）
- selectOne クエリ方式を最適化し、SQLインジェクションを簡素化
- PropertyMapper.whenNotBlack を whenNotBlank に変更
- BaseMapperにdeleteById(T entity)メソッドを新規追加
- jsqlparser バージョン 4.0 から 4.1 にアップグレード
- TableInfoにネイティブReflector反射操作を新規追加
- lambda コンストラクタが JDK16 で実行できない問題を解決
- wrapper clear が sqlSegment を空文字列にリセットし、キャッシュフラグを true にリセット
- インジェクターを調整し、主キーがない場合にByIdメソッドを注入しないように修正
- 自動構築 resultMap が主キーを処理し、実際のフィールド名を取得するように改善
- Wrapper 最適化: 警告を最適化
- Wrapper に gtSql geSql ltSql leSql メソッドを新規追加
- CUBRIDデータベースのサポートを新規追加
- fix github pull/3557 楽観ロックでバージョン番号 null カスタム例外を追加、テナント挿入無視ロジックでカスタマイズを許可
- fix github issues/2931 結果セットが Integer を超える場合の例外問題を解決
- fix github issues/3652 k8s ネットワーク取得失敗問題を解決
- fix gitee issues/I3Z2RG Order By SQL インジェクション認識率を最適化
- fix gitee issues/3826 動的テーブル名ハンドラーを最適化
- fix gitee issues/I3UQH5 注釈@OrderByでlimitを使用した際の例外を修正
- fix github issues/3768 mysql バッチ自動増分バグを修正
- 自動構築resultMap時の主キーフィールドマッピングエラーとOrderBySegmentListの遅延読み込み実行を修正
- ソースコード関連テスト依存関係をアップグレード、ビルド環境の gradle を 7.1 にアップグレード、さらに多くのテストケースを追加

## [v3.4.3.1] 2021.06.15

- 多重継承によるジェネリック型の取得をサポート
- 要望に応じて pageDto を PageDTO に変更
- ページネーションとソートの最適化
- TableField に ResultMapping#property アノテーションのサポートを追加
- fixed github pull/3550 ソートの最適化
- fix #I3T0LA
- KtUpdateChainWrapper、KtQueryChainWrapper の継承を公開
- count の存在を判定する exists メソッドを新規追加
- データ方言の取得方法を最適化し、オブジェクト生成を削減
- feat GlobalConfig に whereStrategy 属性と selectStrategy に適合した getWhereStrategy() メソッドを追加
- p6spy 拡張の最適化
- fix github#3390 SqlRunner.selectPage() メソッドの接続クローン解放漏れ
- JDK デフォルトのジェネリック配列非推奨対応の最適化
- perf: JVM 組み込みのメソッドに置き換え
- ユーザーが ID を指定した場合、自動生成せず、未指定時は自動インクリメント
- Github Merge pull request #3549 #3555 #3565 #3571 #3587 #3591 #3592 #3595 #3599 #3605 #3606
- Map の複数キー値取得を処理するユーティリティメソッドを提供
- page アノテーションのジェネリック型 E を P に調整し可読性を向上
- Pattern を静的定数として定義、正規表現マッチング速度を最適化
- Fix 主キーへの @OrderBy が無効になる問題
- addMappedStatement のログ出力を除去
- NoKeyGenerator Jdbc3KeyGenerator 共有インスタンス

## [v3.4.3] 2021.05.21

- ハイゴー（瀚高）データベースのサポートを追加
- アノテーション `Order By` によるデフォルトソートのサポートを追加
- Wrapper の `exists`、`notExists`、`orderBy`、`groupBy` でパラメータバインディングをサポート
- Wrapper で `setParamAlias` をサポート、その他の最適化
- `KeyGenerator` を最適化し、複数の実装とマルチデータソースへの注入をサポート
- `ServiceImpl` のジェネリック型推論を強化し、多重継承とプロキシの問題を解決
- マイクロサービスでのオブジェクト転送シリアライゼーション用に `PageDto` を新規追加
- `Page` に静的 `of` コンストラクタ方式を新規追加
- ラムダ式のデバッグサポートのため、プロキシ `MethodHandleProxies` を追加
- `ActiveRecord` のログオブジェクト初期化を調整
- `ActiveRecord` モードの Model クラスで `pkVal` メソッドを外部利用可能に調整
- 非推奨となったコードを削除
- 列挙値の取得方法を最適化
- ページネーションの `count` を安全に処理
- `Sequence` メソッドのオーバーライドサポートを追加
- Mybatis 3.5.7 にアップグレード
- 自動設定 `lazy-initialization` のプロパティなし警告を修正
- `mysql on duplicate key update` のフィールド名がテーブル名と判定される問題を修正
- ラムダ条件での NPE 例外を修正
- ラムダ情報抽出メソッドをリファクタリング
- ラムダ情報の取得をシリアライゼーション対象外に変更
- gitee pulls/141 をマージ
- fixed github issues/3208 3016
- fixed github issues/3482 データ権限プロセッサが `union all` をサポート
- トランザクションが無効な場合のヒントメッセージ出力を調整
- 単体テストの最適化と関連依存関係のアップグレード

## [v3.4.2] 2021.01.15

- **修正**: BlockAttackInnerInterceptor 内で参照されていた commons の utils を削除
- **機能**: PaginationInnerInterceptor に optimizeJoin 属性を追加し、count 時に SQL の join を最適化するかどうかを制御可能に
- **機能**: Resources.setDefaultClassLoader でデフォルトのクラスローダーを設定可能に
- **機能**: InterceptorIgnore アノテーションに others 属性を追加
- **機能**: IService に Kotlin チェーン呼び出しサポートを追加 (ktQuery() と ktUpdate())
- **スタイル**: jsqlparser を 4.0 にアップデート
- **スタイル**: com.baomidou.mybatisplus.extension.injector.methods.additional パッケージ下の非推奨クラスを削除
- **スタイル**: generator モジュールを別リポジトリ [generator](https://github.com/baomidou/generator) に移行

## [v3.4.1] 2020.11.10

- **修正**: 新しいマルチテナントプラグインのサブクエリを改善し、比較演算子、IN、EXISTS、NOT EXISTS をサポート
- **機能**: AbstractWrapper.getEntityClass を公開
- **機能**: TenantSqlParser への移行期間用に FakeTenantLineInnerInterceptor を新規追加
- **機能**: ページネーションの count で `left join (subSelect)` を認識するように最適化
- **機能**: すべての count を count(1) から count(*) に変更
- **スタイル**: mybatis を 3.5.6 にアップグレード

## [v3.4.0] 2020.8.23
- **修正**: @TableName.autoResultMap=true の場合、組み込みの selectBody は as を行わなくなりました。使用している場合は注意してください!!!
- **機能**: 新規モジュール mybatis-plus-boot-starter-test を追加
- **修正**: MetaObjectHandler のオーバーロードエラー（解決策はパラメータ位置の入れ替え）。ジェネリクスにおけるフィールド型のサブクラスへの値の埋め込みをサポート
- **機能**: MyBatis を 3.5.5 へ、mybatis-spring を 2.0.5 へアップデート
- **機能**: jsqlparser を 3.2 へアップデート
- **機能**: 新規 MybatisParameterHandler を追加、MybatisDefaultParameterHandler を非推奨化
- **機能**: ページネーションプラグインに GBase, ClickHouse, oscar, OceanBase データベース接続の自動認識サポートを追加
- **機能**: Wrapper に新しい API `not(boolean condition, Consumer consumer)` を追加
- **機能**: マルチテナンシーとページネーションプラグインにおける Level 1 および Level 2 キャッシュの不正確な問題を解決するため、新規 MybatisPlusInterceptor を追加
- **機能**: 新しいページネーションプラグインで、size<0 の場合でも orderBy の連結を継続するよう最適化
- **機能**: IdentifierGenerator の実装クラス ImadcnIdentifierGenerator を新規追加
- **修正**: chainWrapper#func のキャスト例外
- **修正(mybatis-plus-generator.main)**: ジェネレータのデータベース型コンバーターをリファクタリング、一部の分岐を修正、セレクターテストをコミット
- **修正**: 複雑な状況における動的テーブル名置換によって発生する問題を修正：正規表現を空白検出から単語境界検出へ変更
- **リファクタリング**: 動的テーブル名リゾルバーをリファクタリング、正規表現置換プログラムを除去し、テーブル名の位置に基づく置換へ変更
- **リファクタリング**: テーブル名の解析をビジターパターンにリファクタリング。これにより、元の SQL に対する変更は行われなくなります

## [v3.3.2] 2020.5.26
- ページネーションパラメータの抽出、単体テストケースの修正
- 達夢データベースコードジェネレータのテーブルフィルタリングサポート
- マイクロソフトデータベースコードジェネレータのテーブルフィルタリングサポート
- コードジェネレータの属性フィールドルールエラーを修正
- SelectById がカスタムメソッド名をサポート
- ページネーションプラグインのデータベースタイプ取得問題を修正
- Jsonコンバータのnull値処理
- bugfix(mybatis-plus-generator): SQLタイプ返却エラー問題
- 未知の方言例外を調整、URLの自動認識で小文字変換をマッチング
- fix: 初期化 TableInfo において複数のフィールドに @TableId アノテーションがある場合に例外がスローされない問題
- SuperControllerにClassパラメータのsetメソッドを追加
- メソッド StrategyConfig.setSuperServiceImplClass(java.lang.Class<?>) を追加
- コードジェネレータの命名戦略を調整
- ページネーションキャッシュキー値計算を拡張
- メソッド推測を除去、直接属性フィールドにアクセス
- 列挙型プロセッサのタイプ不一致比較を修正
- テーブルプレフィックスマッチング方式を変更
- Mybatisグローバル設定ファイルでのページネーションプラグインパラメータ設定が有効にならない問題を修正
- PRでパーサが指定されていない場合に発生するヌルポインタ例外を修正
- ページネーションプラグインのlimitパラメータ設定を追加
- superEntityClass指定時の親クラスフィールド重複生成問題を修正
- 主キーがない場合のIdTypeとTableIdパッケージの不要なインポートを排除
- BaseResultMapフォーマットの生成を調整
- lombokモードでのチェーンset生成の選択可否をサポート
- パーサのfor updateエラーを修正
- PG制約列のフィルタリング（主キー制約のみ残す）
- ジェネレータでのテンプレート生成無効化を追加
- fix(kotlin): 動的テーブル名 BUG を修正、最大努力でテーブル名を置換
- PG制約による重複属性フィールド生成問題を修正
- fix(kotlin): LambdaUtils のキャッシュキーを String に変更
- コードジェネレータにデータベースキーワード処理インターフェースを追加
- fix github/issues/2454 アノテーションの継承をサポート
- AES暗号化によるデータベースユーザー名・パスワード機能を新規追加
- メソッド引数のジェネリクスを最適化、より多くの型をサポート
- コードジェネレータでisプレフィックス除去を有効にした際のエンティティパッケージインポート不足を修正
- fixed github issues/2470

## [v3.3.1] 2020.1.17
- `TableName`アノテーション属性`excludeProperty`を追加し、フィールドの除外をサポート
- ServiceImpl#entityClass属性を追加し、ジェネリック型の抽出を削減
- phoenixサポートを追加
- hbase用オプションコンポーネント`Upsert`を追加
- ジェネレータ戦略設定にenableSqlFilter属性を追加し、SQLフィルターテーブルサポートの有効化を制御
- バッチ実行メソッドを追加し、ユーザーカスタムのバッチ操作を容易に実現
- `Wrapper`で`clear`によるクリアをサポート
- `Wrapper`サブクラスに`func`メソッドを追加。`if else`条件下で`Wrapper`の異なるメソッドを使用してもチェーンが途切れないようにするため（チェーン呼び出しを最後まで維持）
- `BaseMapper`の`Wrapper`をパラメータとする一部のselectメソッドで`wrapper.first`をサポートし、RDSのhint設定を可能に
- `KtUpdateWrapper#set`でvalueがnullの場合をサポート
- ジェネリック主キーをサポート
- ページネーションインターセプタのデータ型とダイアレクト実装クラスの設定を最適化
- セカンダリキャッシュでcountクエリキャッシュを再利用
- `IService`の一部メソッドをdefaultメソッドに調整
- セカンダリキャッシュがJSONシリアライズ状況に対応（主にデフォルトキャッシュcountでlongがデシリアライズ時にintになる問題を解決）
- バッチ操作のネストされたトランザクション問題を処理（セカンダリキャッシュ更新問題）
- 楽観的ロック有効時におけるupdateByIdでの自動フィルが有効にならない問題を修正
- 自動フィルインターフェースのdefaultメソッド(`setFieldValByName`と`getFieldValByName`)が特定条件下で例外を発生させる問題を修正
- `KtWrapper`のネスト関数問題を修正
- FreemarkerによるKotlinクラス生成時の定数エラーを修正
- StringUtils#guessGetterNameのエラーを修正
- SerializationUtilsのリソース解放漏れ問題を修正

## [v3.3.0] 2019.12.06
- `BaseMapper` インターフェースの2つの page メソッドを最適化
- `IService` および `ServiceImpl` の対応する page メソッドを最適化、一部 collection を返すメソッドを list を返すように修正
- 論理削除フィールドの削除済みと未削除を定義する2つの値で文字列 `"null"` をサポート
- バッチ操作でキャッシュがクリアされない問題を修正
- バッチ操作の例外を `DataAccessException` に変換
- mybatis を 3.5.3 に、mybatis-spring を 2.0.3 に、jsqlparser を 3.1 にアップデート
- mapper オプションパッケージを調整、chainWrapper パッケージを調整
- `ChainWrappers` ユーティリティクラスを新規追加
- `IdentifierGenerator` インターフェースを新規追加、カスタムID生成をサポート
- コード生成ツールで正規表現によるテーブル名マッチングを非推奨化、`likeTable` と `notLikeTable` を新規追加
- ページネーションプラグインでページ数制限と総ページ数オーバーフロー処理のカスタマイズをサポート
- `SqlExplainInterceptor` が原因の Oracle シーケンスが2回インクリメントされる問題を修正
- ページネーションのセカンダリキャッシュをサポート
- p6spy ログ出力を拡張
- `DbConfig` に新属性 `propertyFormat` を追加、`TableFieldInfo` から `related` 属性を削除
- シーケンスジェネレータを最適化、`KeySequence` の `clazz` 属性を非推奨化
- Ognl 式のキーワードが原因の null 値判定失敗を修正
- 更新時のフィルタリングスイッチが無効になる問題を修正
- フィルタリングロジックを最適化
- `ISqlRunner` が `selectPage` をサポート
- グローバル論理削除フィールドをサポート
- `BaseMapper` のメソッドをカスタマイズ可能に
- 【虚谷】【Oracle12c】【Kingbase】データベースのサポートを追加
- データベースフィールドとエンティティフィールドの名前が異なる場合に `null as xxx` が発生する問題を解決
- `ID_WORKER_STR` を非推奨化、主キータイプを自動認識
- 設定でアノテーションを有効にすると、`TableName` も強制的に生成

## [v3.2.0] 2019.08.26
- コードジェネレータに達夢データベースのサポートを追加
- 複合主キーを持つテーブルのフィールドをクエリするSQLのバグを修正
- `updateWrapper` による更新を試行し、失敗した場合に `saveOrUpdate(T)` メソッドを継続して実行する機能を追加
- コードジェネレータの PostgreSQL で numeric instant 型のサポートを追加
- `InjectionConfig` が存在しない場合にコードが生成できない問題を修正
- fix: #1386(github) 論理削除フィールドがDate型で、非削除データの日付がnullの場合の問題
- 依存関係の MyBatis バージョンを 3.5.2 にアップグレード
- 依存関係の jsqlparser バージョンを 2.1 にアップグレード
- EasyScheduler の Apache インキュベーション申請に応じて 996NPL プロトコル制限を削除
- SQL の調整 SET 部分を削除 Github/1460
- `SqlMethod` 列挙型の `UPDATE_ALL_COLUMN_BY_ID` 属性を削除、`AlwaysUpdateSomeColumnById` の使用を推奨
- fix: #1412(github) github:mybatis-plus-generator が Oracle をサポートできない問題
- fix: github 1380
- グローバル設定の `dbType` と `columnLike` を削除
- `fieldStrategy` を削除、前バージョンで追加された3つの代替機能を使用
- `PerformanceInterceptor` 関連を削除、p6spy の使用を推奨
- `el` を削除し、`jdbcType` `typeHandler` などの具体的な属性に分割
- gradle-5.5.1, lombok-1.18.4 にアップグレード
- `selectStatement.getSelectBody()` の型が `SetOperationList` の場合の対応
- `GlobalConfig#sqlParserCache` 属性を削除、`LogicSqlInjector` を削除、`OrderItem` に2つの簡易生成メソッドを追加、`page` に引数が `List<OrderItem>` の `addOrder` メソッドを追加
- `Nested` インターフェースの一部の引数が `Function<Param, Param> func` のメソッドについて、引数を `Consumer<Param> consumer` に変更、標準的な使用には影響なし
- fixed gitee/I10XWC `TableField` 情報に基づいてカスタムタイプを判断できるように修正
- Merge pull request #1445 from kana112233/3.0
- 親クラスのプロパティをフィルタリングする機能をサポート
- バッチ例外キャッチのテストを追加
- マルチテナントID 値式で、複数の ID 条件クエリをサポート
- 新規追加の json 型ハンドラで jackson と fastjson の2つの実装をサポート

## [v3.1.2] 2019.06.26
- `EnumTypeHandler` を `MybatisEnumTypeHandler` に名称変更、`EnumAnnotationTypeHandler` を削除
- 自動構築 resultMap 機能を新規追加、エスケープ文字を除去
- アノテーションに resultMap の自動生成を制御する変数を追加
- ページネーションキャッシュの Key 値エラーを修正
- `TableField.el` 属性を非推奨としてマーク
- `MybatisMapWrapperFactory` の自動登録をキャンセル
- starter にデフォルトの xml パススキャンを追加
- `MybatisPlusPropertiesCustomizer` 及びその設定使用を新規追加
- `ConfigurationCustomizer` 内部メソッドの引数を `MybatisConfiguration` に更新
- 既存の `fieldStrategy` を非推奨としてマーク、新たに 3 種類の `fieldStrategy` を区別して追加
- 注入メソッド取得時に現在の mapperClass を渡す
- SQLite コード自動生成のテストコード及びテスト用データベースファイルを追加
- `JsqlParserCountOptimize` が left join を含む SQL の count 最適化をより正確に実施
- `fix(AbstractWrapper.java)`: order、groupBy の条件が一つだけの場合のラムダ式による型推論エラーを修正
- `apply plugin: 'kotlin'`
- `refactor(order)`: ソートフィールドの優先順位問題を修正(#IX1QO)
- 起動時から LambdaCache をキャッシュ
- `Merge pull request #1213 from sandynz/feature/sqlComment` SQL コメントをサポート
- wrapper の一部変数を除去、wrapper 内部の string 受け渡しを最適化
- `fix: #1160(github)` ページネーションコンポーネント orderBy: group by と order by が同時に存在し、かつ IPage パラメータにソート属性が存在する場合の連結
- `Merge pull request #1253 from ShammgodYoung/patch-1` コードジェネレーターの入力テーブル名で大文字小文字を区別しない
- レンダリングオブジェクト MAP 情報の事前処理注入を新規追加
- dts rabbitAdmin bean の判定方法を修正
- `Merge pull request #1255 from ShammgodYoung/patch-2` `serialVersionUID` 属性のインデントを修正
- `JsqlParserCountOptimize` に boolean フィールドを追加、join を最適化するかどうかを判断
- `Merge pull request #1256 from baomidou/master` Master
- freemarker entity テンプレートのインデントを調整
- `jdbcType`、`typeHandler` 属性を追加、`el` 属性を統合

## [v3.1.1] 2019.04.25
- **新規** 996icu ライセンス契約を追加
- **新規** mybatis-plus-dts 分散トランザクション Rabbit 信頼性のあるメッセージングメカニズムを追加
- **新規** DynamicTableNameParser パーサーを追加、動的テーブル名をサポート
- **最適化** getOne のログ出力を最適化
- **最適化** SQL 最適化でストアドプロシージャをスキップ
- **最適化** ページネーションクエリを最適化（countが0の場合はクエリを継続しない）
- **修正** ページネーションの1次キャッシュでページめくりが継続できない問題を修正
- **修正** MybatisMapWrapperFactory の自動注入を修正
- **サポート** 純粋なアノテーション環境で IPage のサブクラスを戻り値として使用することをサポート
- **変更** 論理削除で LogicInject が不要に
- **変更** GlobalConfig に enableSqlRunner プロパティを追加、SqlRunner の注入を制御（デフォルトは false）
- **変更** SqlParser アノテーションはグローバル設定パラメータがなくてもキャッシュされるように、また mapper へのアノテーションをサポート
- **非推奨** GlobalConfig の sqlParserCache 設定を非推奨に
- **更新** mybatis を 3.5.1 に、mybatis-spring を 2.0.1 にアップグレード、jsqlparser を 1.2 にダウングレード
- **削除** ISqlInjector インターフェースから injectSqlRunner メソッドを削除
- **非推奨** SqlFormatter クラスを非推奨に
- **修正** 自動注入された method の SqlCommandType が論理削除で混乱する問題を解決
- **新規** AlwaysUpdateSomeColumnById オプションコンポーネントを追加
- **変更** SFunction が Function を継承
- **非推奨** DbConfig の columnLike と dbType プロパティを非推奨に
- **新規** DbConfig に schema と columnFormat プロパティを追加
- **新規** TableField アノテーションに keepGlobalFormat プロパティを追加
- **新規** TableName アノテーションに schema と keepGlobalPrefix プロパティを追加
- **修正** 一時ファイルのフォーマット乱れを修正 github #1048
- **修正** テーブル/フィールド名の抽象化 INameConvert インターフェース戦略を処理 github #1038
- **修正** DB2の動的スキーマ設定をサポート github #1035
- **修正** フィールドキャッシュのキーを className から .class に置き換え、dev-tools 使用時の問題を解決：MybatisPlusException: Your property named "xxxx" cannot find the corresponding database column name!（解決策：dev-tools を削除）

## [v3.1.0] 2019.02.24
- `mybatis` を `3.5.0` バージョンにアップグレード
- `mybatis-spring` を `2.0.0` バージョンにアップグレード
- `jsqlparser` を `1.4` バージョンにアップグレード
- p6spy ログ出力サポートを追加
- `IService` の `getOne(Wrapper<T> queryWrapper)` メソッドを変更し、複数データを取得した場合に `TooManyResultsException` 例外をスローするように修正
- カスタムページネーション機能がアノテーション `@select` をサポートしていない問題を修正
- ジェネレーターの Kotlin モードにおける Swagger モードが無効な問題を修正
- ジェネレーターで「is」で始まるフィールドに自動的にアノテーションを付与できない問題を修正
- ジェネレーターの Serializable Active モードで親クラスのパッケージ継承時の自動インポートが異常な問題を修正
- ジェネレーターで共通フィールドが親クラスの class 属性を自動読み込みするサポートを修正
- 列挙型（アノテーション方式）コンバーターがストアドプロシージャ内で変換に失敗する問題を修正
- beetl テンプレートの論理削除アノテーションの誤りを修正
- `mybatis-config.xml` 方式で構築された `Configuration` の `mapUnderscoreToCamelCase` デフォルト値が `true` ではない問題を修正
- SQL パーサーの動的プロキシによって引き起こされるバグを修正
- `mapper` が純粋なアノテーションを使用する場合に、特定の状況で再試行メカニズムが起動エラーを引き起こす可能性がある問題を修正
- `defaultEnumTypeHandler` を指定して汎用列挙型処理をサポートするように最適化
- Hibernate から最新コードを SqlFormatter にコピーするように最適化
- `wrapper` の `in` および `notIn` メソッド内部の引数 `coll` および `動的配列` に対する非 empty チェックを削除 (**注意: 以前から上記メソッドを直接使用しており、引数が empty になる可能性がある場合、現在は `in ()` または `not in ()` のような SQL が生成され、エラーが発生します**)
- `wrapper` の `notInOrThrow` および `inOrThrow` メソッドを削除 (**新版の `in` および `notIn` を使用すると同じ効果が得られ、例外は SQL 例外となります**)
- `IService` の `query` チェーン呼び出しにおける `delete` 操作を削除
- XML ホットローディング関連の設定項目を削除し、`MybatisMapperRefresh` クラスのみを保持して非推奨マークを付与
- 日常的な最適化

## [v3.0.7.1] 2019.01.02
- `lambdaWrapper` で主キーのキャッシュが取得できない問題を修正
- `IService` に追加された `update` チェーン呼び出しでの `remove` 操作をサポートするように最適化
- `IService` に追加された `query` チェーン呼び出しの `delete` を非推奨としてマーク
- その他の日常的な最適化

## [v3.0.7] 2019.01.01
- **最適化** generator の PostgreSQL データベースサポートで Java8 時間型の生成を最適化
- **最適化** generator の SQLServer データベースサポートで Java8 時間型の生成を最適化
- **最適化** LambdaWrapper のリフレクションによるフィールド情報取得で、先頭大文字のフィールドをサポート
- **最適化** LambdaWrapper のみの select 最適化（フィールドがデータベースと一致しない場合の自動 as をサポート）
- **最適化** `BaseMapper` サブクラスの重複スキャン時、`TableInfo` キャッシュの `Configuration` を最後の1つのみ保持
- **最適化** `MergeSegments` の `getSqlSegment` 取得方法を最適化
- **最適化** SQL 自動インジェクターの初期化 modelClass プロセスを最適化し、初期化速度を向上
- **最適化** `BaseMapper` の `update` メソッドの最初のパラメータで `null` をサポート
- **新規** `IService` に4つのチェーン呼び出しメソッドを追加
- **新規** コードジェネレーターに `beetl` テンプレートを追加
- **新規** `IdWorker` にミリ秒時間 ID を追加（注文IDなどに利用可能）
- **新規** wrapper に `inOrThrow` メソッドを追加、パラメータが empty の場合 `MybatisPlusException` 例外をスロー
- **新規** `MetaObjectHandler` にアノテーションに基づいて値を挿入するいくつかの `default` メソッドを新規提供
- **新規** Kotlin での lambda サポート、`KtQueryWrapper` と `KtUpdateWrapper` クラスを追加
- **新規** MPカスタムSQLの使用方法を簡素化、`カスタムsql` + ${ew.customSqlSegment} 方式を利用可能に
- **新規** 新しい `InsertBatchSomeColumn` オプションコンポーネントを提供
- **修正** `Page` の `setTotal(Long total)` -> `setTotal(long total)`
- **修正** `Page` の `setSearchCount` を `public` に修正
- **修正** `TenantSqlParser` で where 条件の先頭が `orExpression` の場合、左側に直接 and でテナント情報を連結するとロジックが期待通りにならない問題を修正
- **修正** wrapper の `lambda` メソッドが sqlSelect を下方伝播する問題を修正
- **修正** `ServiceImpl` の一部の batch 操作における `flushStatements` 問題を修正
- **修正** selectObjs のジェネリックエラー問題を修正
- **削除** `InsertBatchAllColumn` オプションコンポーネントを削除
- **削除** `ServiceImpl` の batch 操作以外のトランザクションアノテーションを削除
- **削除** `Model` のトランザクションアノテーションを削除
- **削除** `AbstractSqlInjector` の `isInjectSqlRunner` メソッドを削除（SqlRunnerの初期化が早いため、現在 isInjectSqlRunner では制御不能）
- **削除** `MybatisSessionFactoryBuilder` を削除
- **削除** `mybatis-plus-generator` パッケージへの依存を削除、必要に応じて各自導入
- **復元** xml ホットローディングを復元、非推奨标识を付与
- **アップグレード** jsqlparser 依存を 1.3 にアップグレード
- **日常的な最適化**

## [v3.0.6] 2018.11.18
- Entity内で2つ以上の条件があり、かつODER BYまたはGROUP BYを連結した際に生成される「WHERE X1 =? AND X2」の問題を修正
- refactor(SerializedLambda.java): メソッドをリファクタリングし、デシリアライズの安全性を向上、命名を最適化
- 基本Mapperの最適化により、カスタム親クラスMapperが独自の注入メソッドを構築することをサポート
- `<trim>`の代わりに`<where>`と`<set>`を使用
- 部分的な最適化: 例外がスローされるまで文字列formatを実行しない
- IdWorkerのUUID生成で並行処理性能を最適化
- feat: 動的ページネーションモデル、ページネーション方言を最適化、db2ページネーション文を再修正
- Assertがi18nマルチ言語エラーメッセージをサポート
- totalによるcount sqlの制御をサポート、isSearchCountメソッドを新規追加
- feat: spring依存関係をcoreモジュールからextensionに移動
- fix: Junit.assertTrue
- カスタムParameterHandlerの使用を強制、byIdタイプ制限を除去
- 新規オプションのInsertBatch汎用メソッドを追加、対応するテスト、コードおよびパフォーマンスの最適化
- IPageに新機能を追加、ジェネリック型変換
- 自動フィルがフィル値が空かどうかを判断、空の場合はフィルロジックをスキップ
- batchsizeの閾値を30から1000に変更し効率を向上
- 極端な状況でのsaveOrUpdate実行エラーを修正
- MybatisSqlSessionTemplateを削除
- xmlホットローディングを削除
- その他の最適化

## [v3.0.5] 2018.10.11
- `ApiAssert` を `Assert` に名称変更
- `ApiResult` を `R` に名称変更
- SQL インジェクターの最適化
- `excludeColumns` メソッドの削除
- `last` メソッドの `condition` パラメータが有効にならない問題を修正
- 1=1 除去に関する BUG を修正
- spring-devtools のサポートを廃止
- エンティティのプロパティがすべて null の場合の SQL 連結エラーを修正
- Class リフレクション情報のキャッシュ化による効率向上
- Model クラスを継承したエンティティで、`pkVal()` メソッドのオーバーライドが不要になりました
- config-location 設定時の mpe バグを修正、および初期化ロジックを最適化
- mapper.xml 存在時の論理削除機能不具合を修正
- `ServiceImpl` におけるトランザクション問題の調整 gitee issue/IN8T8
- DB2 ページング方言の修正 github issues/526

## [v3.0.4] 2018.09.28
- グローバル設定の FieldStrategy がデフォルト値以外の場合の修正
- バッチトランザクションの例外問題を修正
- Api 層の R クラス自動処理ロジックの失敗を修正
- H2 スクリプトの初期化ロードを修正、テストケースの注入を除去
- その他のコメントを追加

## [v3.0.3] 2018.09.17
- クエリフィールドのフィルタリングメソッドを追加
- `orderBy`の複数引数に関するバグを修正
- `LogicDeleteByIdWithFill`コンポーネントを追加
- GitHub issues/476 と issues/473 を修正
- GitHub issues/360 と Gitee issues/IMIHN、IM6GM を修正
- `allEq`の引数`value`をジェネリック型に変更して改善
- `saveOrUpdateBatch`が`BatchExecutor`を使用するように修正
- `getOne`が複数データを取得した場合に例外をスローするように修正
- Serviceの`getOne`メソッドを修正
- Serviceの一部メソッドを`default`メソッドに修正
- `page`で`desc`を設定した場合のSQLバグを修正
- 不要なメソッドを削除
- Generatorの`optional`に関連する2つのJAR問題を解決
- `select(Predicate<TableFieldInfo> predicate)`のオーバーロードを追加
- その他の最適化

## [v3.0.2] 2018.09.11
- Wrapper条件補助クラスを新規追加
- banner属性による出力制御を新規追加
- gitee #IMMF4: バッチ挿入(AR)のトランザクションが無効である問題を修正
- fix: エンティティに主キーがない場合に、ewのwhere条件が生成されるバグを修正
- SqlRunnerのsqlSession取得と解放を処理
- グローバルキャッシュsqlSessionを削除し、Model、汎用service層のsqlSession解放を追加
- ext: ネイティブ列挙型処理クラスの登録を抽象化し、拡張を容易にしました
- 拡張性その他の最適化

## [v3.0.1] 2018.08.31
- コードジェネレーターのテーブルプレフィックス設定異常を修正
- EnumValue アノテーション方式による汎用列挙型処理のスキャンを追加
- 論理削除の混在使用時の不具合を修正
- DB2 方言の改善（何鵬挙による最適化）
- テストケースの追加およびその他

## [v3.0-RELEASE] 2018.08.28 コードネーム：スーパー・ロリポップ 🍭
- 楽観ロック update(et,ew) メソッドにおいて、etに付与された version アノテーションフィールドの再書き込みを対応
- コードジェネレータの最適化と改良
- パッケージスキャンが空の場合の例外スローを回避（列挙型、エイリアス）
- SqlSession の除去
- Issue テンプレートの修正、コメントの充実化
- 初期化プロセスの最適化、論理削除アノテーションの回数検出を追加
- SQL チェックのスキップを許可
- 達夢データベースのサポート
- コードを数値型に変更し、厳格な制限を実施、API 層の命名規則と初期値ルールを簡素化
- 初期化 SQL 解析の SqlInjector への移行
- その他のコード最適化

## [v3.0-RC3] 2018.08.19 コードネーム：スーパーロリポップ 🍭 RC3
- TableField の select 属性を false に設定することで、デフォルトの大フィールドクエリ注入を除外する機能をサポート
- page のデシリアライズ時に pages 属性でエラーが発生する問題を解決
- 2.x の dataSource がプロキシされた場合の処理を統合
- DbConfig.columnUnderline 属性を削除
- selectObjs のクエリ結果セットが空の場合をフィルタリング
- baseMapper の insert および update の戻り値でラッパークラスを使用しないよう変更
- Gitee issues/IM3NW を修正
- コードの最適化、コメントの充実など

## [v3.0-RC2] 2018.08.10 コードネーム：スーパーロリポップ 🍭 RC2
- ジェネレーターに MODULE_NAME 設定を再度追加し、config の設定を開放
- setting - defaultEnumTypeHandler 属性設定が無効になる問題を修正
- Spring Boot 1.x の起動に対応
- 日常的な最適化、テストケース、例外スロー処理の最適化
- Gitee、GitHub の issue および pull_request テンプレートを新規追加
- データベースキーワードのエスケープを削除し、アノテーションモードのエスケープのみをサポート
- 例外スローを assert または ExceptionUtils の使用に最適化
- アンダースコアからキャメルケースへの変換設定を configuration に移動し、ColumnUnderline を最適化
- page のシリアライズ asc desc 多態シリアライズ例外を解決
- デフォルトの dbType を other に変更、ユーザーが設定していない場合のみ自動取得
- ColumnUnderline と MapUnderscoreToCamelCase の意味が同一であるため最適化
- ILY8C ジェネレーターで IdType を指定した際のインポートパッケージ問題を修正
- コメントを補充し、多数のテストケースを新規追加

## [v3.0-RC1] 2018.08.01 コードネーム：スーパー棒棒糖 🍭 RC1
- ユーティリティクラスの一部コードを最適化し、マルチスレッド環境でデッドロックを引き起こす可能性のあるBUGを修正
- アサーションクラスを新規追加、併せて複数箇所の例外スロー判定をアサーション使用に変更
- 冗長な "implements Serializable" を削除
- マジックナンバーをグローバル定数パターンに変更
- MP 3.0 のページネーションは既に非常に優れたものとなっており、PageHelper モードに合わせて使用する必要はなくなりました
- issue #384 QueryWrapper が指定フィールド除外モードをサポート
- 全新のバナー、全新の感触
- 例外スロー処理をさらに最適化
- class インスタンス化の方式を変更、プライベート class のインスタンス化が可能に
- 設定なしで起動可能な Gitee issues/ILJQA をサポート
- sqlSession の解放、ActiveRecord 単体テストは最適化待ち
- last のみを呼び出した際に生成される SQL の問題を解決
- Lambda の先頭プロパティが基底クラスのプロパティである場合の誤りを修正
- ジェネリック制約を追加、コードをフォーマット
- AbstractWrapper で使用する ISqlSegment を最適化
- その他

## [v3.0-RC] 2018.07.23 コードネーム：スーパー・ロリポップ 🍭 RC
- **最適化** page の size が 0 未満の場合、自動的に list モードに調整
- **新規** 攻撃 SQL ブロックパーサーを追加
- **最適化** コアメソッド名の解析を最適化、querywrapper lambda 変換パラメータテストを追加
- **調整** 汎用 service レイヤーのメソッド名を阿里規範に合わせて調整 （ 実験台のみなさま、申し訳ありません。どうか私たちを唾棄してください！その後、プロジェクトを修正してください。）
- **機能追加** コードジェネレーターで正規表現によるテーブル名マッチングを許可
- **機能追加** 楽観的ロックが更新後の version をエンティティに書き戻す
- **対応** Github #385: 動的テーブル名のクエリが Wrapper を利用できるように対応
- **修正** Gitee issues/ILEYD を修正
- **変更** Page のシリアライズインターフェースを IPage インターフェースに移動
- **解決** gamma が ID を自動割り当てできない問題を解決
- **最適化** コードの定数参照を最適化

## [v3.0-gamma] 2018.07.15 コードネーム：スーパーロリポップ 🍭 ガンマ
- IPage に listMode コレクションモードを追加
- gitee issues/IL7W4 を修正
- gitee issues/IL7W4 を修正
- ジェネレータのパッケージインポートを最適化
- Page の ascs、descs 例外を解決
- 論理削除で where entity 1つのパラメータと論理削除の併用ができない問題を修正
- PR をマージし typeAliasesPackage の多次元スキャンを修正
- 3.0 テストケースを完善
- コードのパフォーマンス最適化およびその他

## [v3.0-beta] 2018.07.07 コードネーム：スーパー・ロリポップ 🍭 ベータ
- フィールド LIKE 検索インジェクションのグローバル設定を追加、デフォルトは true で有効
- dbtype の Oracle、DB2 の CONCAT 方式を修正
- update の引数 updateWrapper がどのように変化しても、論理削除条件下では制限条件が依然として存在する問題を修正
- コメントに警告を追加、コメントを完善化
- GitHub issues/377 378 389 を修正
- 論理削除と非論理削除ロジックが同時に存在する問題を解決
- 論理削除で delete set の他のフィールドをサポート、update で論理削除フィールドを除外
- typeAliasesPackage の複数項目で各項目にワイルドカードを使用可能に（例：com.a.b.*.po, com.c.*.po）
- Gitee issues/IKJ48 IL0B2 を修正
- その他の完善化

## [v3.0-alpha] 2018.07.01 コードネーム：スーパー・ロリポップ 🍭
- JDK 8 へのアップグレード + パフォーマンス最適化 Wrapper が lambda 構文をサポート
- モジュール化による MyBatis-Plus のパッケージ構造の適切な分割
- 注入メソッドをリファクタリングし、任意のメソッドに対する簡潔な注入モードをサポート
- グローバル設定によるアンダースコア変換の実装、注入時の AS 句を排除
- Wrapper を改造し、QueryWrapper と UpdateWrapper に変更
- ページネーションプラグインをリファクタリングし、固定ページネーションモデルを排除、Mapper が直接 IPage インターフェースを返すことをサポート
- Controller 層を通じた Rest API を新規追加
- エンティティの String 型フィールドはデフォルトで LIKE 検索を採用、SelectOne はデフォルトで LIMIT 1
- 補助機能として selectMaps をサポート、bean と map の相互変換ユーティリティクラスを新規追加
- db2 サポートを追加、starter を Spring Boot 2+ サポートに変更
- ジェネレーターをリファクタリングし、カスタム DB と複数のテンプレートエンジンをサポート
- 関連する BUG の修正

## [v2.1.9] 2018.01.28 コードネーム：懐かしみ（2017年 baomidou 組織の仲間たちとの MP 共同成長の道を記念し、2018 年へ向けて旺旺旺）
- page ページネーションに Count SQL の最適化を制御する設定を追加
```
// count sql の最適化を行わない
page.setOptimizeCountSql(false);
```
- 注入定義のフィルをサポート、SQL インジェクターと主キージェネレーターをサポート
- github issues/231 を修正
- github issues/234 を修正
- 論理削除 selectByIds の coll 問題を修正
- gitee issues/IHF7N を修正
- gitee issues/IHH83 を修正
- 設定方式との互換性を確保、カスタム注入を優先して使用
- その他の最適化

## [v2.1.9-SNAPSHOT] 2018.01.16
- Gradle 依存関係のモードを調整
- IdType に ID_WORKER_STR `文字列型` IdWorker.getIdStr() 文字列型を追加（オプション）
- TableField アノテーションに `update` 属性を追加 プリプロセス set フィールドのカスタム注入 fixed gitee IHART
```
 例：@TableField(.. , update="%s+1") ここで %s はフィールドに置き換えられます
 出力 SQL：update 表 set フィールド=フィールド+1 where ...
```
```
 例：@TableField(.. , update="now()") データベース時間を使用
 出力 SQL：update 表 set フィールド=now() where ...
```
- TableField アノテーションに `condition` 属性を追加 プリプロセス WHERE エンティティ条件のカスタム演算ルール
```
@TableField(condition = SqlCondition.LIKE)
private String name;
出力 SQL：select 表 where name LIKE CONCAT('%',値,'%')
```
- spring-boot-starter モジュールを追加 内蔵 `jdbc mp パッケージは個別に導入不要` boot をより快適に使用可能
- SQL Server ビュー生成のサポートを追加
- フィールド戦略の独立設定を許可、デフォルトは naming 戦略
```
strategy.setNaming(NamingStrategy.underline_to_camel);// テーブル名生成戦略
strategy.setColumnNaming(NamingStrategy.underline_to_camel);// フィールド戦略の独立設定を許可、デフォルトは naming 戦略
```
- コードジェネレーターを抽象化 AbstractTemplateEngine テンプレートエンジン抽象クラス、カスタムテンプレートエンジンが可能、内蔵 freemarker オプションを追加
```
// freemarker エンジンを選択
mpg.setTemplateEngine(new FreemarkerTemplateEngine());
```
- 関連する SQL 解析（マルチテナントなど）は `@SqlParser(filter=true)` で SQL 解析を除外可能

# SQL 解析キャッシュ注釈の有効化
mybatis-plus:
    global-config:
        sql-parser-cache: true
```
- xml 読み込み順序の問題を解決し、他の xml SQL フラグメントを自由に導入可能
- author に123が含まれるバグを修正
- fix #IGQGE: Wrapperが空だがpage.getCondition()が空でない場合、Conditionが伝達されない問題を修正
- fix #IH6ED: Pagination dubbo ソートなどの属性シリアライズがサポートされていない問題を修正
- Wrapperが空かどうかの判定に==を使用し、equalsメソッドのオーバーロードによる影響を回避
- カスタム基底クラスの注入を回避
- sql を分離し SqlUtils に独立して抽出
- インデントとコーディングスタイルを統一
- 生成コードの実行パフォーマンスを最適化 github issues/219
- sql 解析プロセスを最適化
- fixed gitee issues/IHCQB
- springboot-configuration-processor を compileOnly から optional に変更
- その他

## [v2.1.8] 2018.01.02 コードネーム：囍
- コードジェネレーター > フィールド接頭辞によるバグを修正
- 手書きの完全修飾名をクラスの完全修飾名で置き換え
- ビルドの修正
- スクリプトの警告、ディレクトリの無視
- その他の最適化

## [v2.1.8-SNAPSHOT] 2017.12.28 コードネーム：マンボウ（秋秋命名）
- Map返却時の自動アンダースコアからキャメルケースへの変換
- Kotlinエンティティの静的定数サポート
- ページネーション構築モードの最適化
- プルリクエスト #201 をマージ
- 修正: selectByMap @alexqdjay
- sqlRunnerテストケースを追加、selectObjsが1つのフィールドのみ取得するバグを修正
- BlobTypeHandlerを新規追加
- パラメータMapの初期サイズ設定を削除
- .editorconfigを追加、テンプレートのスペース問題を修正
- HikariCP接続プールでSQLが出力されない問題
- グローバル設定からパスを削除、mapperLocationsが必須に
- K神による全テストケースのカバレッジ達成

## [v2.1.7] 2017.12.11 コードネーム：清风徐来 、 このバージョン番号にはバグが存在するため、2.1.8-SNAPSHOT + に変更してください
- 列挙型処理：基本型、Number型、String型
- IGDRW: ソースコードのコメント誤り、誤解を招きやすい問題
- PR !42: ページネーションコンストラクタのオーバーロード追加
- コード生成 > Oracle > 最大カーソル数を超える問題の解決
- Gitee IGNL9 を修正
- k神による大量のテストケース追加
- transientキーワードを使用してPageクラスの一部フィールドのシリアライズ化を除外
- 無効なログの削除
- fix #IGI3H: selectBatchIds のパラメータをCollection型に変更
- 論理削除SQLインジェクターのバグ修正
- 複数ソートフィールドのサポート追加
- fixed GitHub #185: 2.0.2バージョンでの自動増分主キーのバッチ挿入問題 pr
- その他の最適化

## [v2.1.6] 2017.11.22 コードネーム：小秋秋のキス
- モジュールを support、core、generate に分割し、コード生成を分離して依存関係を選択可能にしました
- gitee issue IFX30 を解決し、mybatis-plus-support パッケージの分割サポートを対応しました
- gitee issue IGAPX を解決し、汎用列挙型の BigDecimal 型マッピングを対応しました
- Druid の補完、フィールドの自動入力設定を修正しました
- Kotlin コード生成の一部ロジックバグを修正しました
- gitee pr 40 をマージし、updateAllColumn**** などのメソッドで fill = FieldFill.INSERT が注釈されたフィールドを除外するよう修正しました（Elsif 氏に感謝）
- ビルダーパターンの Kotlin 設定を修正しました
- SQL ユーティリティクラスのリフレクションインスタンスを最適化しました
- その他の最適化

## [v2.1.5] 2017.11.11 コードネーム：離神
- 汎用列挙型の Spring Boot 互換性調整
- PostgreSQL のキーワード/非キーワード変換問題への対応
- Cat73 PR 自動生成コードの軽微な調整
- Kotlin コード生成のサポート
- metaObj ハンドラによる未包含値の設定に関するバグ修正
- Alibaba コーディング規約への準拠調整
- その他

## [v2.1.3 - 2.1.4] 2017.10.15
- 汎用列挙型ハンドラを追加、spring boot demno を参照
- SQL パーサーを最適化
- スキーマテナントパーサーを追加（改善待ち）
- その他の最適化

## [v2.1.2] 2017.09.17 コードネーム： X
- コードジェネレータのバグを修正
- fixed gitee issues/IF2DY
- ページのメソッドチェーン操作を修正
- Oracleのエスケープ処理を削除
- fixed github issues/119
- fixed gitee issues/IF2OI

## [v2.1.1] 2017.09.12 コードネーム：小鍋蓋
- ページネーションが総レコード数を超えた場合に自動的に1ページ目に設定されるバグを修正 @wujing 感謝 pr
- IEID6 を修正
- MyBatis 3.4.5 にアップグレード
- ジェネレーターのテンプレートエンジン Velocity 2.0 にアップグレード
- JSqlParser 1.1 にアップグレード
- SQL 解析チェーンの動的拡張によるカスタム SQL 解析機能を追加
- マルチテナント SQL 解析ロジックを追加。詳細は Spring Boot デモを参照してください
- jasonlong10 PR パフォーマンス分析インターセプターが OraclePreparedStatementWrapper の場合の SQL 出力をサポート
- GitHub issues/145 を修正
- Gitee issue/IF1OF を修正
- sqlSelect("distinct test_type") テストケースを追加
- フィル生成器で不足していた TableField インポートクラスを追加
- GitHub issues/MYSQLテーブル名に予約語が含まれる場合のコード生成エラー #124: フィールドがすべて大文字のアンダースコア命名をサポート
- GitHub issues/134 を修正
- PostgreSQL コード生成が特定のスキーマをサポートし、テーブルフィールドをデフォルト順序でソート
- その他の最適化と調整

## [v2.1.0] 2017.08.01 コードネーム：小秋秋

#### 主要機能
- バッチsqlSessionのクローズ漏れ問題を修正
- SQLフォーマットのエラー問題を処理し、パディング情報を追加
- #91: insertBatchの大規模データ時の最適化について github
- UUID主キーのテストケースを新規追加
- 自動フィルが以前の値を上書きするバグを修正
- pom依存関係をアップグレード、spring-testのスコープをtestに設定
- SQLServerドライバを変更、楽観ロックに不要なstring型テストを削除
- #86: MyBatis-Plusの基盤マッピング設計問題について github issue
- Wrapperが空でpage.getCondition()が空でない場合のSqlHelper処理を対応
- Merge pull request !33: エンティティ生成にフィールドソートを追加 from 老千/master
- プロキシオブジェクト使用によるインスタンスキャッシュ情報取得不能問題を解決
- ブール型のis始まりによるSQL生成エラー問題を解決
- DBType設定エラーを修正
- fix #351: DB2DialectがNULLを返す問題
- fix #356: 自動コード生成のBoolean型getメソッド不正問題
- fix #353: コード生成の@TableLogic問題
- PostgreSqlInjector自動インジェクターを新規追加、フィールド大文字小文字区別、自動二重引用符エスケープを処理
- リポジトリアドレスとユーザー情報にカスタム入力を使用
- fix #357: コード生成の@TableLogicパッケージ導入バグ
- Sequenceにmac判定を追加、ページネーションpageHelperモードにfreeTotal()メソッドを追加
- #95: ページネーションプラグインに関する2つの提案 Github, selectItemsに#{} ${}を含む問題
- Wrapper#setSqlSelect(String... columns)メソッドを追加、自動生成されたエンティティ経由での利用を容易に
- fixed github 116 issue
- fixed osgit IE436  IDVPZ  IDTZH

#### コード生成
- エンティティ生成テンプレートを修正
- 自動フィルコード生成エラーを修正
- postgresql schemanameジェネレーターサポートを新規追加
- シリアライズ化インポート問題を調整
- その他

## [v2.1-gamma] 2017.06.29

#### 主体機能
- SQLServerの自動型取得エラーを修正
- ユーザーがページネーションデータベース方言をカスタマイズできない問題を修正

#### コード生成
- 自動フィルコード生成を改善
- PostgreSQLでの重複フィールド生成問題を修正

#### 前バージョン（2.0.9）アップグレードによる問題
- エンティティの主キーが先頭にない場合に読み取れない問題を修正
- カスタムinsert操作時に`Insert not found et`例外が発生する問題を修正（#331参照）
- SQL生成エラーを修正（通常注入のGroup、Having、Order）
- 論理削除時のSQL生成順序エラーを修正
- 多くの皆様からの迅速なフィードバックに感謝申し上げます。前バージョンで生じた問題について深くお詫び申し上げます

### Mybatis-Plus-Boot-Start [1.0.4]

#### 主な変更点
- Mybatis-plusの直接依存を削除
- SpringBoot jdbc-starterの直接依存を削除

## [v2.0.9] 2017.06.26 コードネーム：K神
### Mybaits-Plus
#### 主要機能
- 楽観的ロックと論理削除の競合問題を修正
- 注入SQL生成時にアンダースコア設定が存在し有効な場合の考慮不足を対応
- EntityWrapperの継承関係の問題を修正
- Wrapperに条件判定を追加
- パフォーマンス分析プラグインがログ記録のヒントをサポート
- WrapperのtoString方式を再実装し、以前Debug時にnullと表示されユーザーに誤解を与えていた問題を解決
- Sequenceがミリ秒内で並行実行された際に偶数が多くなる問題を対応
- 無視戦略の最適化処理によりアノテーションの属性を変更
- SQL注入方式を最適化し、以前のXML注入方式を削除
- 論理削除で2つのWhereが出現する問題を対応
- 他のデータベースシーケンスの実装方式を追加し、インターフェースを公開してユーザー自身での拡張を可能に
- 楽観的ロックの最適化調整
- Wrapper内のWhere AND ORを最適化し、以前のリフレクションベースの実装を削除、コード実行効率を向上
- mybatis-config.xmlを追加しない場合に主キーが自動入力されない問題を対応
- MybatisPlusがgradleビルド方式のサポートを追加
- Wrapperに`and()` `or()`メソッドを追加
- GlobalConfigurationを最適化し、GlobalConfigUtilsを分離して結合度を低減
- Sqlserver2008とSqlServer2005のページネーション問題を修正
- データベースの自動認識を新規追加、ユーザーの明示的設定を削減
- ページネーションプラグインを最適化し、ユーザーの明示的設定プロパティを削減
- 自動入力フィールドの問題を解決
- PageHelperを新規追加、現在のスレッドを取得してページネーションを管理（以前のユーザーは使用しないことを推奨、この方式はMybatisPageHelperのユーザー習慣にのみ適用）
- 大幅にテストケースを追加（K神のサポートに感謝）
- その他のコード最適化
- JSqlparserの依存関係を追加、今後は手動でJarパッケージを追加する必要がなくなります

#### コード生成
- 論理削除方式の生成をサポート
- 楽観的ロック方式の生成をサポート
- ジェネレーターがsqlServerの自動増分主キーを認識できない問題を修正
- Lombok方式の生成をサポート
- ビルドモード方式の生成をサポート
- ClobとBlobの型変換を追加
- OracleのNumber型フィールド変換エラー問題を修正

### Mybatis-Plus-Boot-Start [1.0.2] コードネーム：清風
#### 主要機能
- ARモードでdevtoolがデータソースを置換した際の無効化問題を対応
- 論理削除のサポートを追加
- シーケンスのサポートを追加

## [v2.0.8] 2017.05.15
- WrapperにsqlSelectオブジェクトの設定を追加
- アノテーションがない状況との互換性を確保
- 楽観ロックからデフォルトのshort実装を除去し、バインディングレジストリのスキャン段階でのバインディングを最適化。テスト環境をh2に変更。
- ホットリロードを最適化し、mapperパス設定を除去
- Mapper設定のリフレッシュを削減
- tableFiled valueが空の場合の不具合を修正し、アンダースコア命名を有効化
- sequence アップグレードの通知
- テーブル情報を公開し、サブクラスでのオーバーライドを可能に
- Idworkテストを修正
- devtoolsをサポート
- fixed 259 xml resultMap の共通フィールド生成をサポート
- fixed pulls 28 プロパティのオーバーロードをサポート

## [v2.0.6  2.0.7] 2017.04.20
- 追加 論理削除
- 追加 Oracle Sequence
- 追加 jdk1.8 時間型
- 楽観ロックのサポートを改善
- フィールドフィラーを改善、更新時のフィルをサポート
- mybatis 依存を 3.4.4 にアップグレード
- コード調整と最適化、wrapper limit などのロジックをサポート
- Id 戦略 auto のバグを修正、ジェネレータのバグその他

## [v2.0.5] 2017.03.25

- ページネーションプールがクローズされないバグを修正
- issues fixed 217
- 主キータイプがAUTOまたはINPUTの場合にIMetaObjectHandlerが有効にならないバグを修正
- like プレースホルダーの問題を修正
- コード生成時にディレクトリが存在しない場合に新規作成

## [v2.0.3 - v2.0.4] 2017.03.22

- Wrapperのコード構造を最適化
- 既存のデータベース接続取得を最適化
- Page初期化の問題を解決（以前はコンストラクタ経由でのみ有効でしたが、現在はsetter/getterでも有効になります）
- 楽観的ロックプラグインをサポート
- Wrapperを改造し、JDBC層でパラメータを処理するように変更。PreparedStatementとの連携を改善
- 関連するエラーログの表示レベルを修正
- WrapperのisWhereメソッドを公開。WHERE句の拼接をカスタマイズ可能に
- JDKバージョンの下位互換性を確保。以前のコードで使用されていた1.7の新機能を、現在のバージョンで解除
- SQLServerでの生成バグを修正およびコードを最適化
- MybatisPlus、SqlSessionの取得を最適化
- ポイントカットが設定されていない場合に取得したsqlSessionが現在のトランザクションに属さない問題、および複数sqlSessionによるトランザクション問題を解決
- SQL実行クラス（sqlRunner）を強化
- ModelにシリアライズIDを追加。将来Modelを変更した際にシリアルバージョンIDが設定されていない場合にIDが変更される可能性を回避
- デフォルトBaseMapperをオーバーライドするテストケースを追加
- 多くの皆様からの優れた提案とコード貢献に感謝します。ここでは個別に指名は致しません

## [v2.0.2] 2017.02.13
- グローバル設定が機能しない問題を修正（2.0.1のロジック）
- byIdでの強制設定タイプを除去
- Wrapper、Pageなどのプログラム最適化
- ARモードの自動データベース接続クローズを最適化（以前は手動でのトランザクション設定が必要でした）
- コードジェネレータを最適化：アンダースコア名のアノテーションでキャメルケースを処理しない、jspやhtmlなどより多くのカスタムテンプレートをサポート
- サービス層のテストを新規追加
- SQLログ記録をパフォーマンス分析プラグインに統合
- マルチデータソースページネーションプラグインによる複数データベースのサポートを対応

## [v2.0.1] 2017.01.15

- EntityWrapper がブール型に対して誤った SQL 文を構築する問題を解決
- グローバル設定の初期化ログ表示を調整
- Mybatis 依存関係を 3.4.2 に、Mybatis-Spring 依存関係を 1.3.1 にアップグレード
- Service にメソッドを追加 (selectObjs, selectMaps)
- selectCount でデータベースが null を返した際にエラーが発生する問題を解決
- PostgreSQL のコード生成をサポート
- 外部からのエスケープ文字およびキーワードリストの提供を拡張サポート
- 主キーがないデータベーステーブルでも MP の CRUD を注入するように変更（主キーがない場合は MP の xxById メソッドは使用不可）
- EntityWrapper が SQL を連結する際、初回の OR メソッド呼び出しが機能しない問題を解決
- SQL Server のコード生成をサポート (2008 バージョン基準)
- コード生成時に BigDecimal がインポートされない問題を解決
- 自動データベース読み取り時のデータベース接続を解放
- グローバル検証メカニズムを最適化 (EMPTY メカニズムで Date 型を無視するように追加)
- 注入を最適化、BaseMapper がスキャンされるのを回避
- 注入を最適化、冗長な注入メソッドを削除
- SQLlikeType を SqlLike に名称変更
- ホットロード時の関連クエリエラー問題を解決
- SqlQuery を SqlRunner に名称変更
- コードジェネレーターを最適化および改善
- コードジェネレーターで @tableName がインポートされない不具合を修正
- グローバル設定で MP のデフォルト注入クラスを手動追加する必要があったのを、自動注入に変更して設定を簡素化
- Wrapper に ne メソッドを追加
- Mybatis 動的パラメータが totalCount を生成できない問題を修正
- コード構造を最適化、ジェネレーターテンプレートを最適化
- issus[138,140,142,148,151,152,153,156,157] を解決。詳細はマイルストーン [mybatis-plus 2.0.1 計画](https://gitee.com/baomidou/mybatis-plus/milestones/2) 内の全ての issus を参照してください

## [v2.0.0] 2016.12.11

- グローバルな大文字命名戦略をサポート
- 自動ページネーションCount文の最適化
- 既存のグローバル設定戦略の最適化
- グローバル検証戦略の最適化
- コードジェネレータの最適化（以前のハードコードからテンプレート形式へ変更）
- 汎用メソッドByMapの注入ロジックを最適化
- データベースタイプの自動選択を追加
- SqlExplainInterceptorの改善（MySQLバージョンが5.6.3未満で該当インターセプターをサポートしない場合、自動的に通過させる）
- 一部の特殊文字が複数回エスケープされる問題を修正
- 既存のEntityWrapperを最適化し、Wrapper親クラスおよびConditionチェーン検索を追加
- WrapperクラスのLIKEメソッドが複数データベースに対応
- ログを最適化し、ネイティブMybatisのログ出力情報を使用
- キャッシュ使用によるページネーションのCount値計算不能問題を修正
- PerformanceInterceptorの`?`置換によるSQL出力不正確問題を修正し、SQLフォーマットオプションを追加
- 複数データベースサポートを追加、DBTypeを参照してください
- 文字列型フィールドの非空検証戦略を追加（文字列型の自動非空判定および非空文字列判定）
- WrapperにQBC検索類似機能を追加（eq、gt、ltなど）
- ARモードをサポート（Modelの継承が必要）
- すべてのSelective汎用メソッドを統合（例：以前のinsertメソッドを削除し、以前のinsertSelectiveをinsertに改名）
- SQLストリッパーが`--`を除去する状況を解決
- MySQLキーワードをサポートし、自動エスケープ
- 基盤Service、Mapperの継承構造を簡素化
- XMLでのSQL記述が不要な方向けに、新しいSQL実行方式を追加。詳細はSqlQueryを参照してください
- コード構造を最適化
- issus[95,96,98,100,103,104,108,114,119,121,123,124,125,126,127,128,131,133,134,135]を解決。詳細はマイルストーン[mybatis-plus 2.0 計画](https://gitee.com/baomidou/mybatis-plus/milestones/1)のすべてのissusを参照してください

## [v1.4.9] 2016.10.28

- ServiceImplから@Transactionalアノテーションを削除、Slf4j依存関係を削除
- EntityWrapperを使用した検索時に、パラメータが特殊文字の場合にSQLインジェクションの問題が存在するのを解決
- Mybatisのキャメルケース設定の優先順位を調整 MybatisPlus > Mybatis
- ページネーションプラグインを最適化し、ページオーバーフロー設定が機能しない問題を修正
- DBKeywordsProcessorを削除し、MySQLの自動キーワードエスケープ機能を追加
- コードジェネレーターがTEXT、TIME、TIMESTAMPタイプの生成を新たにサポート
- バルク挿入メソッドを新規追加
- コードジェネレーターがController層のコード生成を新たにサポート
- EntityWrapperクラスの一部ListパラメータをCollectionに調整
- コードジェネレーターを最適化し、resultMapのサポートを追加

## [v1.4.8] 2016.10.12

- `insertOrUpdate`に主キーの空文字列チェックを追加
- MyBatisネイティブのキャメルケース設定 `mapUnderscoreToCamelCase` のスイッチ設定をサポート
- `TableField` `FieldStrategy` アノテーションのグローバル設定をサポート
- `SelectOne`、`SelectCount`メソッドが`EntityWrapper`方式をサポート
- Oracleコードジェネレーターが `Integer` `Long` `Double` 型の区別をサポート
- `INPUT`主キー戦略の`InsertOrUpdate`メソッドのバグを修正
- `EntityWrapper`の`IN`に可変配列サポートを追加
- 基本Mapper、Serviceの汎用メソッドのPKパラメータ型を`Serializable`に変更
- `selectOne`の結果セットが一意でない場合、警告を表示（ログのwarnモードを有効化する必要があります）
- `baseService`にloggerを追加、サブクラスはloggerを直接呼び出し可能（再定義不要、slf4j依存関係が必要）

## [v1.4.7] 2016.09.27

- 主キーアノテーションを「I」から「PK」に変更して理解しやすくし、mapperアノテーションを削除
- パフォーマンス分析プラグインで、$記号の内容を特別処理
- 自動コミットトランザクションの説明を追加、新規トランザクションテストを追加
- resultMapエンティティ結果セットマッピングをサポート
- `#TableField(el = "")`式を追加。このFieldがオブジェクトの場合、`#{オブジェクト.属性}`を使用してデータテーブルにマッピング可能、およびテストを追加
- typeHandler連鎖クエリのサポートを新規追加
- 検証フィールド戦略列挙クラスを新規追加
- コードジェネレーターでエンティティビルダーモデル設定をサポート
- コードジェネレーターでエンティティ定数生成のサポートを新規追加
- CRUDに`insertOrUpdate`メソッドを新規追加
- `MessageFormat.format`による数値型SQLのフォーマットエラーを解決
- EntityWrapperにEXISTS、IN、BETWEEN ANDメソッドのサポートを追加（D.Yang氏の提案に感謝）
- MySQL 5.7+のJSON列挙型をサポート、コード生成対応
- XMLなしでもCRUDメソッドが注入されることをサポート
- MyBatisネイティブ設定ファイルの読み込み順序を修正

## [v1.4.6] 2016.09.05

- `@TableId` アノテーションがない場合のSQLインジェクションをスキップする機能を追加
- テーブルマッピングされていないオブジェクトの挿入時にフィル処理を実行しないように対応
- xxxByMap が null クエリをサポート

## [v1.4.5] 2016.08.28

- XML変更の自動ホットリロード機能を追加
- EntityWrapperメソッド内のMessageFormat Paramsタイプが文字列のパラメータを自動処理する機能を追加
- テーブル共通フィールドの自動設定機能を追加

## [v1.4.4] 2016.08.25

- `EntityWrapper` のすべての条件クラスメソッドが null パラメータの入力をサポートします。この条件は SQL ステートメントに追加されません
- `TSQLPlus` を `TSqlPlus` に名称変更し、全体の命名規則との一貫性を保ちました
- MySQL キーワードのバグを修正----キーワードマッピング変換に `` 記号を追加し、XML ファイル生成時にカスタムファイル拡張子を設定可能にしました
- リソースを閉じる前に非 null チェックを追加し、誤った SQL による Null ポインタ例外を回避し、`current > pages` のチェック判定を追加しました
- TSQL 関連クラスがシリアライズを実装し、Dubbo をサポート
- MyBatis 自動ホットロードプラグインを追加
- データベースの `order`、`key` などのキーワードのエスケープをサポートし、CRUD 操作を可能にしました

## [v1.4.3] 2016.08.23

- MACアドレスが取得できない状況での Sequence の互換性を最適化
- ユーザーが設定した空文字列のIDを互換し、自動的にフィールドを埋める
- 純粋な大文字の命名を、小文字のプロパティに変換
- EntityWrapperを修正し、T-SQL構文標準に準拠した条件によるメソッドのカプセル化定義を実施
- 1.4.3 へのアップグレードと、依存関係の受け渡しテストを実施

## [v1.4.0] 2016.08.17

- カスタム select 結果セットを追加し、page ページネーションを最適化
- 関数を考慮せず、field 最適化を削除
- delete・update 全表操作の実行を禁止するインターセプターを新規追加

## [v1.3.9] 2016.08.09

- バグ修正
- Map挿入時の例外を解決
- Mapの挿入処理を行わず、そのまま返すように変更
- IdWorkerジェネレータの最適化
- カスタムLanguageDriverのサポート
- コード生成時のカスタムクラス名サポート
- MyBatis 3.4.1依存関係へのアップグレード

## [v1.3.6] 2016.07.28

- グローバルなテーブルフィールドのアンダースコア命名設定をサポート
- カスタムSQLメソッドの注入を追加
- ページネーションの総レコード数が0の場合、リストクエリロジックを実行しないように最適化
- 自動生成されるXMLの基本フィールドにAS処理を追加
- フィールドサブクエリをサポート

## [v1.3.5] 2016.07.24

- **アップグレード** 1.3.5 グローバルなテーブルフィールドのアンダースコア命名設定をサポート
- **追加** 複数の主キーアノテーションが設定されている場合に例外をスローする機能
- **追加** 主キーが存在しない場合の起動例外
- **削除** `getDefaultScriptingLanuageInstance` のリセット処理
- **修正** あいまいなオーバーロードメソッド

## [v1.3.3] 2016.07.15

- SimpleDateFormat のスレッドセーフでない問題に対応
- Oracle ページネーションのバグ修正を修正
- Oracle TIMESTAMP 生成サポートのバグ修正

## [v1.3.2] 2016.07.12

- Service が sqlSegment を公開するメソッド呼び出し
- SQL実行パフォーマンス分析プラグインの新規追加
- deleteByMap、selectByMap の新規追加

## [v1.3.0] 2016.07.07

- LIKE比較などのクエリにおけるsqlSegmentの実装をサポート
- typeAliasesPackageのワイルドカードスキャン、countなしページネーションクエリをサポート
- MyBatis mapperメソッド呼び出しの実行原理テスト
- IOCデモンストレーションケースを追加

## [v1.2.17] 2016.06.15

- コードジェネレーターを最適化 (yanghu さんの pull request に感謝)
- SQL の読み込み順序を調整 (xmlSql > curdSql)
- CURD のセカンダリキャッシュをサポート
- キャッシュテストおよび特殊文字テストを追加

## [v1.2.15] 2016.04.27

- **新規** Oracleの自動コード生成をサポート、テスト機能を追加
- **新規** UUID戦略を追加
- デモは spring-wind をクリックしてご覧ください
- **新規** 単一テーブルの count クエリをサポート

## [v1.2.12] 2016.04.22

- Service レイヤーでのジェネリック ID サポートを追加、自動生成コードを最適化
- MyBatis を 3.4.0 に、mybatis-spring を 1.3.0 にアップグレード

## [v1.2.11] 2016.04.18

- バッチ更新機能を追加、Oracleのバッチ操作をサポート
- 削除、spring-windのドキュメントに移植
- JDK1.5をサポート、param記述を修正
- データベースタイプを追加

## [v1.2.9] 2016.04.10

- EntityWrapper に order by なしのコンストラクタを追加
- MailHelper の sendMail メソッドをオーバーロード
- 文字列型の主キーIDをサポートする CommonMapper を追加
- 既存の selectList メソッドを selectList と selectPage の2つのメソッドに分離
- コードジェネレータを最適化、ドキュメント説明とその他を追加

## [v1.2.8] 2016.04.02

- 大文字フィールドのコード生成処理を最適化し、Entity、Mapper、Serviceファイルの自動生成をサポート
- ページネーションのインデックス超過ロジックを最適化、5つの新しいCRUD操作メソッドを追加
- テンプレートエンジンのgetHtmltextメソッドを公開
- メール送信設定の説明ドキュメントを追加して最適化
- ドキュメント説明、その他を追加

## [v1.2.6] 2016.03.29

- サービス層のコードカプセル化を最適化し、listメソッドとpageメソッドを分離
- ページネーションのcount SQL文を最適化
- メールユーティリティクラスを改良
- Springフレームワークに対するframeworkのサポートを強化
- ドキュメント説明を追加、その他

## [v1.2.5] 2016.03.25

- 独立したIDジェネリクスをサポートする baseMapper
- より完全な自動生成ツール
- エンティティカプセル化ソートのサポート
- ページネーションプラグインの改善
- サービス主キージェネリクスサポートの分離

## [v1.2.2] 2016.03.14

- アノテーションIDの区分: `AUTO` はデータベースの自動増分、`ID_WORKER` はカスタム自動増分IDの自動入力、`INPUT` は手動入力を表します。
- コードおよび自動生成ツールの機能を最適化しました。
- その他
