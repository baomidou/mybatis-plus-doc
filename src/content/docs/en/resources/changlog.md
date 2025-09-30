---
title: Release Notes
description: Version update history
---
## [v3.5.14] 2025.08.29
- feat: Add `bom` management for `mybatis-plus-spring-boot4-starter` and `mybatis-plus-spring-boot4-starter-test`

## [v3.5.13] 2025.08.29
- fix: Fixed warning logs when calling `Db` methods for queries using `@PostConstruct` in `Spring`
- fix: Fixed null pointer exception caused by `Db` returning `null` when using `count`
- fix: Fixed errors with `BaseMapper` in non-`Spring` projects
- feat: Upgraded `Jsqlparser` to 5.2
- feat: Added `withExpression` to `OrderItem` for sorting by expression (Note: Not supported for serialization usage; you must control `SQL` injection yourself)
- feat: `OracleDdlGenerator` now supports running in specified `schema` mode
- feat: Added compatibility for Huawei Cloud `GaussDb` database
- feat: Added fallback handling for snowflake generator initialization errors
- feat: Added `spring-boot4` support
- feat: Upgraded `gradle` to 8.13
- opt: Added cache processing to the `replaceSqlPlaceholder` method in `SqlUtils`
- opt: Optimized DDL execution record table existence checks
- opt: Optimized `workerId` acquisition in container environments

## [v3.5.12] 2025.04.27

- fix: Fix potential `NoSuchElementException` error during first execution of batch operations in asynchronous execution
- fix: Fix task rejection caused by default `SQL` parser thread pool shutdown during `JVM` exit
- fix: Fix incorrect `toString` method style generation in `entity.java.btl`
- fix: Fix missing line breaks between class comments and import statements in `entity.java.ftl` template
- opt: Refactor `SqlRunner` to execute `SQL` statements (dynamic parameter passing, no longer generates execution `SQL` based on parameter values)
- opt: Enhance `SqlRunner` execution (support single parameter value retrieval using `Map` ({key}), `List` ({index}), `JavaBean` ({property}))
- opt: Improve `MybatisUtils` extraction from `SqlSessionFactory` (support custom `SqlSessionTemplate` subclasses)
- opt: Automatically identify database support for `TDengine` database `websocket` connections
- opt: Support multiple data sources in `Db` utility class
- opt: Optimize `MapperProxy` property access
- opt: Add `getBean` and `getProxyTargetObject` methods to `CompatibleSet` interface
- opt: Move `CompatibleSet` and `CompatibleHelper` to `com.baomidou.mybatisplus.core.spi` package
- opt: Support manual specification of `CompatibleSet` implementation
- opt: Code generator handles driver-returned index information being `null`
- opt: Code generator handles primary key indexes starting with `PRIMARY_KEY_`
- opt: Remove `@Override` annotation from `entity.kt.btl` template
- opt: Resolve inconsistent generation format in `serviceImpl.java.ej`
- opt: Remove extra line breaks in `mapper.java.ftl` generation
- opt: Remove import end delimiters in `entity.kt.vm`, `entity.kt.ej`, `entity.kt.btl`
- opt: Remove extra line breaks in `controller.java.ej`, `controller.java.vm`
- opt: Remove extra spaces in property generation in `entity.kt.btl`
- opt: Standardize `toString` method style generation across `entity.java.btl`, `entity.java.ej`, `entity.java.ftl`, `entity.java.vm`

## [v3.5.11] 2025.03.23

- fix: Fixed code generator chain model generating `@Accessors` annotation when not using `lombok`
- fix: Fixed batch delete error when using `UUID` as primary key
- fix: Fixed `select(predicate)` method error in `Kotlin`
- fix: Fixed error caused by asynchrony in `AbstractCaffeineJsqlParseCache`
- fix: Fixed merge error caused by SQL comments (-- or #) in dynamic SQL parsing (Dynamic script statements no longer handle line breaks. Handle line break removal yourself if needed)
- fix: Fixed casting exception during data comparison in `DataChangeRecorderInnerInterceptor`
- fix: Fixed incorrect `catalog` and `schema` retrieval in `IllegalSQLInnerInterceptor` plugin
- fix: Fixed incorrect table name retrieval when parsing `create table if not exists` for dynamic tables
- fix: Fixed incorrect table name retrieval when parsing `create [type] index` for dynamic tables
- feat: Added `DynamicTableNameJsqlParserInnerInterceptor` for dynamic table handling based on `JsqlParser`
- feat: Support custom script runner parameters for `DdlScript`
- feat: Support custom script runner parameters for `DdlHelper`
- feat: Support parameter configuration for `DdlApplicationRunner` (script error handling, custom `ScriptRunner`, whether to interrupt on multi-processor execution exception)
- feat: Support specifying append condition mode in `BaseMultiTableInnerInterceptor` (appends conditions to the end by default, only applies to `select`, `delete`, `update`)
- feat: Support adding `@Serial` annotation for generated `Entity` when specifying `serialVersionUID`
- feat: Support custom handling of `Entity` annotations (field, class annotations) in the generator
- feat: Support custom import handling for generated `Entity`
- feat: Support for `崖山` database
- feat: Support `Hive2` pagination
- feat: Upgrade `Gradle` to 8.10
- feat: Support custom exception handling in `DdlHelper` execution
- opt: Adjusted `DynamicTableNameInnerInterceptor` table handling logic and ensured `hook` execution
- opt: Adjusted `DdlScript` class method implementation (separated DDL version recording, optimized execution methods)
- opt: Adjusted `DbType#GAUSS` database name to `gauss`
- opt: Adjusted `JsqlParserGlobal` parsing thread pool specification
- opt: Removed deprecated `FieldStrategy.IGNORED`
- opt: Removed deprecated `GlobalConfig.DbConfig#selectStrategy`
- opt: Removed deprecated `MybatisSqlSessionFactoryBean#typeEnumsPackage`
- opt: Optimized `DdlHelper` resource loading (no longer depends on `Spring` or other implementations)
- opt: Removed charset encoding specification in the `getScriptRunner` method within `DdlHelper`
- doc: Fixed comment errors in `DdlHelper`

Due to the minimal breaking changes between jsqlParser versions 5.0 and 5.1, we plan to remove the `mybatis-plus-jsqlparser-5.0` support module in the future.
  Supporting multiple versions is relatively cumbersome. We will only maintain `mybatis-plus-jsqlparser-4.9` and `mybatis-plus-jsqlparser` (keeping up with the latest version until the JDK requirement increases again) going forward.

## [v3.5.10.1] 2025.01.13

- fix: Fixed dynamic node processing error

## [v3.5.10] 2025.01.12
- fix: Fixed global `columnFormat` not taking effect when fields have `TableField` annotation but no `value` specified
- fix: Fixed Kotlin code generation error in Enjoy template
- fix: Fixed string code generation error in Enjoy template
- fix: Fixed unescaped double quotes in springdoc generated annotations
- fix: Fixed data change plugin update error when no primary key exists
- fix: Fixed index out of bounds issue in multi-table parsing processJoins
- feat: Added `properties` attribute to TableName annotation
- feat: Support @InterceptorIgnore annotation on default methods
- feat: Adapted to jsqlparser 5.1 version (use `mybatis-plus-jsqlparser-5.0` for 5.0 compatibility)
- feat: Provided `InterceptorIgnoreHelper.execute` template execution method to handle plugin skip strategies (prevents errors caused by uncleaned thread resources when manually using handle methods)
- feat: Code generator global package configuration properties support custom template information retrieval
- feat: Code generator added table index information retrieval
- feat: Code generator provides `Mapper.Builder.generateMapperMethodHandler` processor for generating index methods based on indexes
- feat: Code generator Entity supports custom Class annotations and field annotations generation
- feat: Code generator Entity supports lombok mode for specifying generated class annotations
- feat: Code generator Entity supports ToString `(Entity.Builder.toString(boolean))` method control generation (generated by default, will generate @ToString in lombok mode, not generated in lower lombok versions, this is an incompatible change)
- feat: Code generator Entity supports field documentation comments (`Entity.Builder.fieldUseJavaDoc(boolean)`) control generation (generated by default, in lower versions, field documentation comments won't be generated when using swagger or springdoc, this is an incompatible change)
- feat: Rewrote dynamic statement generation (generated execution SQL will no longer contain \n line breaks)
- feat: Security encryption processor key retrieval supports environment variables and system properties
- feat: Upgraded mybatis to 3.5.19
- feat: Upgraded springboot to 3.4.1
- feat: Upgraded kotlin to 2.1.0
- Planned removal of IllegalSQLInnerInterceptor plugin due to low practicality and incomplete syntax checking
- Planned removal of DataChangeRecorderInnerInterceptor plugin due to numerous functional defects

## [v3.5.9] 2024.10.23
- **opt:** Enhanced the code generator to support visual configuration capabilities
- **opt:** Decoupled extension packages so they no longer require a mandatory dependency on the Spring framework
- **opt:** Split the jsqlparser support module, providing `mybatis-plus-jsqlparser` (supports the latest jsqlparser) and `mybatis-plus-jsqlparser-4.9` modules. These are not included by default; you must manually introduce them after upgrading.
- **feat:** Refactored the service module abstraction to `CrudRepository`. Using `IService` is no longer recommended to avoid data confusion in the business layer.
- **feat:** Added Solon startup plugin support
- **feat:** Upgraded to Spring Boot 3.3.4
- **feat:** Upgraded to Velocity 2.4

## [v3.5.8] 2024.09.18
- fix: Resolve `optimizeJoinOfCountSql` deserialization support issue
- fix: Fix inaccurate return values in Db utility class batch operations when using `rewriteBatchedStatements=true`
- fix: Resolve conflict between logical delete filling and optimistic locking
- fix: Fix `IllegalSQLInnerInterceptor` analysis error with nested count statements
- fix: Upgrade jsqlParser5.0 to resolve `for update` statement errors
- fix: Fix jSQLParser parsing optimization errors caused by negative numbers in auto-increment/decrement operations
- fix: Fix incomplete cache cleanup in `removeMapper`
- fix: Fix SqlServerQuery table comment garbled characters
- opt: Improve function injection validation logic
- opt: Change Page property access to private and override toString method
- opt: Print warning log for unsupported types in primary key generation strategy (uuid)
- opt: Convert MybatisPlusException to PersistenceException subclass
- feat: Add empty collection handling for `deleteByIds`
- feat: Rename `selectBatchIds` method to `selectByIds`
- feat: Support placeholder configuration for `tableName` and `schema` properties
- feat: Code generator adds property retrieval for virtual columns
- feat: Chain wrapper to lambda chain wrapper #6314
- feat: Code generator adds manual database driver specification for compatibility with drivers that cannot auto-register
- feat: Upgrade kotlin2.0.0
- feat: Upgrade SpringBoot3.3.2
- feat: Upgrade fastjson2.0.52
- feat: Upgrade mybatis-spring3.0.4
- feat: Upgrade spring-cloud-commons4.1.4
- feat: Update some dependency versions for compatibility
- feat: Support GoldenDB database
- feat: Support Duckdb database
- feat: Support Derby database
- feat: Support Vastbase database

## [v3.5.7] 2024.06.10
- fix: Fixed dynamic table name handling for update ignore errors
- fix: Fixed SQL Server 2005 pagination handling space errors
- fix: Fixed issues with multi-tenant queries
- fix: Reduced forced casting in JSON serialization for non-generic generic cases
- fix: Fixed code generator disabled template failure
- fix: Fixed pagination count optimization distinct with orderBy handling errors
- fix: Fixed Dameng database code generation errors
- fix: Fixed tenant plugin special exists statement failures
- fix: Fixed SQLite database ddl_history errors preventing table creation
- fix: Fixed DataChangeRecorderInnerInterceptor configuration ignore being invalid during Insert
- fix: Fixed code generator handling non-standard JdbcType causing null pointer errors
- feat: Added batch operations and InsertOrUpdate methods to BaseMapper
- feat: Added return value List<BatchResult> for BaseMapper batch operation methods
- feat: BaseMapper method logic delete now supports filling by default
- feat: Adjusted Service layer logic delete filling logic handling
- feat: Refactored batch delete parameter filling processing logic
- feat: Auto-increment and auto-decrement now handle BigDecimal
- feat: Added Snowflake ID configuration (supports manual assignment of workerId and datacenterId, or automatic acquisition via specified network card information)
- feat: Refactored ServiceImpl generic parameter extraction
- feat: Modified AES key randomness generation
- feat: Added checkSqlInjection method to UpdateWrapper
- feat: Adjusted DDL script auto-configuration logic (DDL execution bean is not injected when no implementation exists or when mybatis-plus-extension module is absent)
- feat: Renamed injected method deleteBatchIds to deleteByIds
- feat: Upgraded Spring Boot to 2.7.18 and 3.2.6
- feat: Upgraded Kotlin to 1.9.24
- feat: Upgraded Lombok to 1.18.32

## [v3.5.6] 2024.04.08
- fix: Fixed errors caused by multi-layer proxies in generic Service
- fix: Fixed generic type loss during deserialization in Json type handler
- fix: Fixed cast errors with primitive type arrays in filler handlers
- fix: Fixed Page method removal from previous version, now retained in PageDto class
- fix: Fixed IllegalSQLInnerInterceptor not processing Parenthesis
- fix: Fixed IllegalSQLInnerInterceptor table/column name wrapping preventing index information retrieval and index field validation
- fix: Fixed params not being expanded when calling setSql in KtUpdateChainWrapper
- fix: Fixed useGeneratedShortKey configuration becoming ineffective
- fix: Fixed a series of issues with DataChangeRecorderInnerInterceptor
- feat: Removed escaping from sqlFirst and sqlComment (if escaping is needed, manually call escape before passing)
- feat: Changed ServiceImpl to abstract class to prevent incorrect direct instantiation
- feat: Refactored code generator TemplateConfig configuration, moved template disabling and path configuration to corresponding implementations
- feat: Added support for composite annotations
- feat: Added field increment setIncrBy and decrement setDecrBy methods to LambdaUpdateWrapper
- feat: Pass org.apache.ibatis.session.Configuration when obtaining injection methods
- feat: Added auto-increment primary key compatibility configuration switch (mybatis-plus.global-config.db-config.insert-ignore-auto-increment-column, default false, enables INSERT statements to ignore primary key field generation)
- feat: Added new parameter filler skip method (based on MappedStatement#id)
- feat: Added SQLite DDL auto-maintenance functionality
- feat: Added eqSql method
- feat: Added SQL parsing thread pool
- feat: Added Snowflake ID generator initialization log printing (prints warning log if exceeding 5 seconds by default)
- feat: Upgraded MyBatis to 3.5.16
- feat: Upgraded spring-cloud-commons
- feat: Upgraded jsqlparser to 4.9
- test: Added CI to GitHub
- doc: Added comments explaining that update(Wrapper) related APIs cannot support automatic filling

## [v3.5.5] 2023.12.24
- fix: Fixed the issue where configuring databaseId was not taking effect
- fix: Fixed auto-increment primary key injection error where non-auto-increment primary keys were incorrectly ignored
- fix: Fixed extra comma generation in GroupBy when using ChainWrapper mode
- fix: Fixed selectOne caching issue
- fix: Fixed multi-table data permission support failing in certain scenarios
- fix: Fixed point conversion error in generator MySQL type converter
- fix: Fixed inability to use parent class properties in Kotlin
- fix: Fixed high-version Spring Boot startup error caused by auto-injected DdlApplicationRunner returning null
- fix: Fixed RuntimeUtils security vulnerability issue in generator code hints
- feat: Added Fastjson2 support
- feat: Upgraded gradle-wrapper to 8.4
- feat: Upgraded kotlin-gradle-plugin to 1.9.21
- feat: Upgraded MyBatis to 3.5.15
- feat: Upgraded Lombok to 1.18.30
- feat: Upgraded Spring Boot 3 to 3.2.0
- feat: Upgraded mybatis-spring for Spring Boot 2 version to 2.1.2
- feat: Upgraded mybatis-spring for Spring Boot 3 version to 3.0.3
- feat: Removed transaction from saveOrUpdate in generic service
- feat: Added support for Trino, Presto, GBase8s-pg, and SUNDB databases

## [v3.5.4.1] 2023.11.4
- fix: Fixed conversion errors caused by AOP-enhanced Mapper layer.

## [v3.5.4] 2023.10.22

- fix: Fixed SQL execution errors when Insert has no fields.
- fix: Fixed lambda debugging issues in IDEA with higher JDK versions.
- fix: Fixed warnings for select, groupBy, orderBy, orderByAsc, and orderByDesc in LambdaQuery. Added corresponding doXxx methods to support overriding (breaking change: API methods are now final).
- fix: Fixed missing configuration prompt for inject-sql-session-on-mapper-scan.
- fix: Fixed incorrect sorting field when using @OrderBy with @TableId (breaking change: adjusted the type of com.baomidou.mybatisplus.core.metadata.TableInfo.orderByFields).
- fix: Fixed type mismatch errors during logical deletion by primary key in Service.
- fix: Fixed conflict between pagination plugin Count and custom ResultHandler.
- fix: Fixed potential reentrancy issues in field fill handlers.
- feat: Added control for whether auto-increment primary key fields can be inserted. You can use method injection to override Insert(boolean ignoreAutoIncrementColumn) or Insert(String name, boolean ignoreAutoIncrementColumn) to control whether auto-increment primary keys support write operations.
- feat: ActiveRecord mode deleteById (logical delete) method now supports automatic field population.
- feat: Built-in generic extraction now supports non-Spring framework projects.
- feat: BaseMapper added update(wrapper) update method.
- feat: BaseMapper added streaming query methods for large data queries.
- feat: Code generator metadata information now exposes tableName and columnName field access.
- feat: Added mybatis-plus-spring-boot3-starter and mybatis-plus-spring-boot3-starter-test to support Spring Boot 3.
- feat: Supports default plugin injection. When no MybatisPlusInterceptor is injected, it supports automatic injection of com.baomidou.mybatisplus.extension.plugins.inner.InnerInterceptor.
- feat: Upgraded source code JDK development version to Java 21.
- feat: Upgraded gradle-wrapper to 8.4-rc-1.
- feat: Upgraded kotlin-gradle-plugin to 1.9.20-Beta.
- feat: Upgraded Spring Boot 2.x version to 2.7.15.
- feat: Upgraded lombok to 1.18.30.
- opt: Modified mybatis-spring dependency in mybatis-plus-extension to optional (breaking change: if your project uses this in non-Spring or non-Spring Boot environments, manually add the dependency).
- opt: Reduced unnecessary configuration prompts in spring-boot-starter (breaking change: adjusted the type of com.baomidou.mybatisplus.autoconfigure.MybatisPlusProperties.configuration).
- opt: Field fill handler extraction now removes fixed parameter extraction, supporting more flexible mapper method parameter extraction for fill processing.
- opt: Removed com.baomidou.mybatisplus.core.toolkit.ReflectionKit.setAccessible method calls to prevent removal in higher JDK versions.
- opt: Adjusted selectOne method (compatible with streaming processing, extracts at most two rows of data, no longer logs total record count).
- opt: Optimized selectObjs method return value to reduce type casting.
- opt: Generic Service now supports multiple SqlSessionFactory injection.
- opt: Optimized TableInfo.newInstance creation method.
- opt: Removed redundant @SuppressWarnings("serial") annotations.

## [v3.5.3.2] 2023.08.08

- feat: Upgrade MyBatis to 3.5.13 and mybatis-spring to 2.1.1
- feat: Provide a unified parsing class for jsqlparser with configurable parsing functions and cache options
- feat: Add debug log for Sequence initialization
- feat: Parameter filler now supports multi-parameter filling
- feat: BaseMapper adds new `selectMaps(page, wrapper)` and `selectList(page, wrapper)` methods
- feat: Optimistic lock field now supports `java.time.Instant`
- feat: `wrapper#apply` supports configuring `mapping`, such as `column={0,javaType=int,jdbcType=NUMERIC,typeHandler=xxx.xxx.MyTypeHandler}`
- feat: Adjust QueryWrapper to require explicit enabling of SQL injection filtering check (removes SQL filtering functionality for wrapper's orderby)
- feat: Add support for SunRidge database
- feat: `updateWrapper#setSql` method supports dynamic parameters, referencing the `wrapper#apply` method
- feat: Automatic SQL maintenance DDL supports SQL stored procedure execution
- perf: Strengthen generic restrictions for `ktWrapper`
- fix: Fix entity description exception when selecting springdoc documentation comments
- fix: Fix SQL generation issue with `Table#getAllInsertSqlColumnMaybeIf("xx.")` when primary key `IdType` is `AUTO`
- fix: Tenant plugin now supports `update set subSelect` scenarios
- fix: Fix illegal reflection warnings in higher JDK versions (Illegal reflective access by com.baomidou.mybatisplus.core.toolkit.SetAccessibleAction)
- fix: Fix dynamic proxy reflection errors in higher JDK version plugins (Unable to make field protected java.lang.reflect.InvocationHandler java.lang.reflect.Proxy.h accessible)
- fix: Fix path replacement incorrectly replacing existing "." with file separator "/"
- fix: Fix Beetl template engine unable to generate comments
- fix: Fix Types.DOUBLE type mapping failure
- fix: Fix error when converting parent class common fields
- fix: Fix generator unable to get values via cfg.
- fix: Fix transaction rollback failure when using MockBean in unit tests
- fix: Fix non-standard naming of `nonEmptyOfWhere` method in Wrapper class, which caused execution overhead due to incorrect Ognl caching
- fix: Change ClickHouseQuery class `tableComment()` method to return table comment field as 'comment'
- fix: Fix entity description exception when selecting springdoc documentation comments
- fix: Fix SQL generation issue with `Table#getAllInsertSqlColumnMaybeIf("xx.")`
- fix: Add overloaded method to Db class for querying based on non-empty field conditions of entities
- fix: Fix generator error with superEntityClass for Kotlin Entity files
- fix: Fix inability to retrieve table comments in springdoc freemarker mode
- opt: Enhance parameter filler processor to prevent conversion errors caused by parameter name matching fill name but type mismatch
- opt: Optimize method injection by removing SelectPage, SelectMapsPage, SelectByMap, DeleteByMap injections
- opt: Reduce heap memory usage of MappedStatement
- opt: Resolve performance consumption caused by repeated metadata retrieval in PluginUtils
- opt: Remove extra line breaks in injection methods
- opt: Remove sqlSessionFactory variable held by SqlRunner
- opt: Resolve multiple Sequence initialization issues (default primary key generator may not be created in custom scenarios)
- opt: Optimize return generic type for `SqlHelper#getMapper`
- opt: Remove sqlSessionFactory variable held by SqlRunner
- docs: Correct DdlHelper comment errors

## [v3.5.3.1] 2022.12.29

- **bug**: Add schema name support for PostgreSQL and DM statements in the generator module
- **feat**: Optimize ChainWrapper#getEntityClass
- **fix**: Fix an issue where IService.lambdaQuery().one() throws an error when no data exists in the database
- **test**: Require table aliases for multi-table SQL parsing in test and tenant plugins

## [v3.5.3] 2022.12.28

- **Multi-tenant Plugin**: Table names in multi-table joins must be aliased; otherwise, the appended filter conditions will not include the prefix.
- Fixed an issue where `InterceptorIgnore` could not filter `selectKey`.
- Added pagination support for the **Informix** database.
- Added pagination support for the **UXDB** database.
- Added pagination support for the **TDengine** database.
- Added pagination support for the **Amazon Redshift** database.
- Added support for **Spring Boot 2.7** and later versions.
- Added the `Sequence#parseIdTimestamp` method to decode timestamps from Snowflake IDs.
- Added `AS total` to the generated SQL statement in `BaseMapper.selectCount`.
- Fixed a `ClassCastException` in the `IllegalSQLInnerInterceptor` class and optimized logging.
- Removed the deprecated `isDesc` attribute from the `@OrderBy` annotation.
- Removed deprecated methods from `TableInfo`.
- Added the `JoinTableInfoInitHandler` class to participate in `TableInfo` initialization.
- Fixed incomplete SQL filtering in `StringUtils.sqlInjectionReplaceBlank`, which could potentially lead to SQL injection.
- Added `IService.lambdaQuery(entity)` support for more concise syntax.
- Added the Data Change Recording (Data Audit) plugin: `DataChangeRecorderInnerInterceptor`.
- Added new query condition methods: `notLikeLeft` and `notLikeRight`.
- Optimized multi-table parsing in data permission handling.
- Allowed subclasses to override the base `orderBy` method (Gitee issues/I61F51).
- Added the `Db` class and adjusted the `SimpleQuery` class.
- Added automatic script maintenance functionality.
- Added support for manual interceptor ignore strategies, e.g., `InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());`
- Supported uppercase field names for ID auto-increment in **PostgreSQL** (fixed issues/I4T0YJ).
- The code generator refactoring is complete and has been merged back into the core MyBatis-Plus codebase.
- Added a switch to the code generator to control whether to generate the service interface.

## [v3.5.2] 2022.06.01

- Upgraded MyBatis to version 3.5.10
- Upgraded jsqlparser to version 4.4
- Added vertical database pagination support
- Added support for Gbase 8s database
- Added pagination support for Xingyun database
- Added pagination support for Firebird database
- Fixed parameter filling judgment errors and marked replacement field constants
- Cleaned up DbType and IDialect implementation classes
- Added `SqlHelper.execute` to get BaseMapper through entityClass
- Optimized enum handling, no longer requires the 'typeEnumsPackage' configuration
- Fixed execution order for tenant ID retrieval
- Added KeyGenerator for Firebird database
- Added KeyGenerator for Dameng Dm database
- Merge pull request #4343 from LK820/fix-IdType.java
- Merge pull request #4495 from nieqiurong/fix-parameter
- Merge pull request #4314 from tomalloc/3.0

## [v3.5.1] 2022.01.25

- Added Impala database support
- Cache dynamically retrieves database type
- Added controllable ID allocation method fixed GitHub pull/4231
- Delayed enum scanning registration
- Optimistic lock plugin supports population based on wrapper GitHub pull/3664
- H2KeyGenerator syntax modification
- SimpleQuery optimization and bug fixes
- Fixed Gitee issues/I4P9EN
- SybaseDialect keyword replacement optimization

## [v3.5.0] 2022.01.01

- Upgraded MyBatis to version 3.5.9
- Upgraded jsqlparser to version 4.3
- Added support for removing Mapper-related caches and dynamic Mapper injection using GroovyClassLoader
- Added a hook function for dynamic table names https://github.com/baomidou/mybatis-plus/pull/3965
- Optimized and adjusted the injection class DefaultSqlInjector
- Optimized ReflectionKit class by changing field -> field to Function.identity()
- Added an `exist` method to baseMapper
- Fixed an issue where lowercase "from" in sysbase caused incorrect index values
- Added a method to get Mapper by entityClass: `BaseMapper<Entity> mapper = SqlHelper.getMapper(Entity.class);`
- Optimized the byId injection method
- Fixed multi-tenant right join bug https://gitee.com/baomidou/mybatis-plus/issues/I4FP6E https://github.com/baomidou/mybatis-plus/pull/4035
- Optimized custom injection method names https://github.com/baomidou/mybatis-plus/pull/4159
- Added SAP HANA in-memory database support
- Added SimpleQuery utility for queries
- Modified the SQL injection verification utility class code implementation
- Organized the usage of string constants
- Upgraded license-gradle-plugin version
- Optimized custom injection method names (incompatible change)
- Overloaded columnsToString method to allow subclass adjustments
- Fixed entity type judgment logic (fixed gitee issues/I4L4XV)
- Logical deletion byId now supports conversion to entity deletion with fill capabilities

## [v3.4.3.4] 2021.09.22

- Fixed an issue where conditional ordering in order by wrapper was not working
- Resolved compilation errors when introducing cloud InetUtils class
- Upgraded SQL parsing dependency jsqlparser to version 4.2
- fix: Fixed lambda serialization failure caused by enhanced modular validation in JDK16
- fix: Added Java 17 support #I4A7I5
- bug: Fixed issue where left join condition construction would generate an extra condition
- fix: Fixed full table update plugin failure when logical delete field default value is null
- Changed pagination count(*) to use count(*) as total
- Allowed injection of custom transaction factory TransactionFactory

## [v3.4.3.3] 2021.09.05

- Removed deprecated utility classes ISqlParserFilter and AbstractJsqlParser. You need to copy them from older versions if required
- Removed global configuration parameters workerId and datacenterId. We recommend directly initializing identifierGenerator instead
- Changed return type of count method from Integer to Long. **Note:** This change may involve upgrade costs. We apologize for any inconvenience caused by this breaking change
- Fixed bug with the @Orderby annotation on primary keys
- Fixed issue where deletion failed for String primary keys
- Added BigDecimal and BigInteger support for primary key types
- Reduced strong dependency on Spring framework. Non-Spring projects using MyBatis-Plus can now inject GenericTypeUtils.setGenericTypeResolver

## [v3.4.3.2] 2021.08.21

- Added support for goldilocks database and csiidb database
- Added support for Nanda General GBase 8s database (GBASEDBT), distinct from the original definition (GBASE)
- Optimized the `selectOne` query method to streamline SQL injection
- Renamed `PropertyMapper.whenNotBlack` to `whenNotBlank`
- Added `deleteById(T entity)` method to BaseMapper
- Upgraded jsqlparser from version 4.0 to 4.1
- Added native Reflector reflection operations to TableInfo
- Fixed an issue where lambda constructors could not run in JDK16
- Wrapper `clear` method now resets sqlSegment to an empty string and cache flag to true
- Injector adjusted to not inject ById methods when no primary key exists
- Auto-built resultMap now handles primary keys to get the real field names
- Wrapper optimized: warning optimizations
- Added `gtSql`, `geSql`, `ltSql`, and `leSql` methods to Wrapper
- Added support for CUBRID database
- Fix github pull/3557: Added custom exception for null version number in optimistic lock, tenant insertion ignore logic now allows customization
- Fix github issues/2931: Resolved exception when result set size exceeds Integer maximum
- Fix github issues/3652: Fixed k8s network acquisition failure issue
- Fix gitee issues/I3Z2RG: Optimized Order By SQL injection recognition rate
- Fix gitee issues/3826: Optimized dynamic table name handler
- Fix gitee issues/I3UQH5: Fixed annotation `@OrderBy` exception when using limit
- Fix github issues/3768: Fixed MySQL batch auto-increment bug
- Fixed primary key field mapping errors during auto resultMap building & lazy loading execution of OrderBySegmentList
- Upgraded source code test dependencies, build environment Gradle upgraded to 7.1, and added more test cases

## [v3.4.3.1] 2021.06.15

- Support multiple inheritance for generic type acquisition
- Changed `pageDto` to `PageDTO` as requested
- Pagination sorting optimization
- Added `ResultMapping#property` annotation support for `TableField`
- Fixed GitHub pull/3550 - Optimized sorting
- Fix #I3T0LA
- Made `KtUpdateChainWrapper` and `KtQueryChainWrapper` inheritable
- Added `exists` method to check count existence
- Optimized data dialect acquisition to reduce object creation
- Added `whereStrategy` property to `GlobalConfig` and adapted `getWhereStrategy()` method for `selectStrategy`
- Extended p6spy optimization
- Fix GitHub#3390 - `SqlRunner.selectPage()` method not releasing connection clone
- Optimized JDK default non-recommended generic arrays
- perf: Replaced with native JVM methods
- When user specifies ID, don't auto-generate; auto-increment only when not specified
- GitHub Merge pull request #3549 #3555 #3565 #3571 #3587 #3591 #3592 #3595 #3599 #3605 #3606
- Added utility method for handling multi-key value retrieval from Map
- Changed page annotation generic from E to P for better readability
- Defined Pattern as static constant to optimize regex matching speed
- Fix @OrderBy being invalid for primary keys
- Removed `addMappedStatement` log printing
- `NoKeyGenerator` `Jdbc3KeyGenerator` shared instance

## [v3.4.3] 2021.05.21

- Added support for HighGo database
- Added support for default sorting with the `@OrderBy` annotation
- Wrapper methods `exists`, `notExists`, `orderBy`, and `groupBy` now support parameter binding
- Wrapper supports `setParamAlias` and other optimizations
- Optimized `KeyGenerator` to support multiple implementations and multi-data source injection
- Enhanced `ServiceImpl` generic type inference to resolve multi-inheritance and proxy issues
- Added `PageDto` for microservice object transmission serialization
- Added static `of` constructor method to `Page`
- Added `MethodHandleProxies` for better lambda debugging support
- Adjusted ActiveRecord log object initialization
- Adjusted ActiveRecord mode to make the `Model` class's `pkVal` method externally accessible
- Removed deprecated code
- Optimized enum value retrieval method
- Added safe handling for pagination count
- `Sequence` method now supports override capability
- Upgraded to MyBatis 3.5.7
- Fixed automatic configuration hint for missing properties when `lazy-initialization` is enabled
- Fixed issue where field names in `mysql on duplicate key update` were incorrectly identified as table names
- Fixed NPE exception in lambda conditions
- Refactored lambda information extraction method
- Lambda information retrieval no longer requires serialization
- Merged Gitee pulls/141
- Fixed GitHub issues/3208, 3016
- Fixed GitHub issues/3482 - Data permission handler now supports `union all`
- Adjusted transaction warning message when transactions are not enabled
- Upgraded related dependencies for unit test optimization

## [v3.4.2] 2021.01.15

- fix: Remove reference to commons utils in BlockAttackInnerInterceptor
- feat: Add `optimizeJoin` property to PaginationInnerInterceptor to control whether to optimize SQL join during count queries
- feat: Set default class loader via `Resources.setDefaultClassLoader`
- feat: Add `others` property to `@InterceptorIgnore` annotation
- feat: Add Kotlin chain call support to IService (`ktQuery()` and `ktUpdate()`)
- style: Upgrade jsqlparser to version 4.0
- style: Remove deprecated classes from `com.baomidou.mybatisplus.extension.injector.methods.additional` package
- style: Generator module moved to separate repository [generator](https://github.com/baomidou/generator)

## [v3.4.1] 2020.11.10

- fix: Enhanced new multi-tenant plugin subquery support for comparison operators, IN, EXISTS, and NOT EXISTS
- feat: Made AbstractWrapper.getEntityClass public
- feat: Added FakeTenantLineInnerInterceptor as a transition for TenantSqlParser
- feat: Improved pagination count recognition for `left join (subSelect)` optimization
- feat: Changed all count queries from count(1) to count(*)
- style: Updated MyBatis to version 3.5.6

## [v3.4.0] 2020.8.23
- **fix**: When `@TableName.autoResultMap=true`, the built-in `selectBody` will not perform `as` operations. Users who have implemented this feature should take note!
- **feat**: Added the new `mybatis-plus-boot-starter-test` module
- **fix**: Fixed MetaObjectHandler overload error (resolved by swapping parameter positions). The fill value now supports subclasses of the field type in generics
- **feat**: MyBatis updated to 3.5.5, mybatis-spring updated to 2.0.5
- **feat**: JSqlParser updated to 3.2
- **feat**: Added `MybatisParameterHandler` and deprecated `MybatisDefaultParameterHandler`
- **feat**: Pagination plugin now adds support for automatic recognition of GBase, ClickHouse, Oscar, and OceanBase database connections
- **feat**: Wrapper adds new API `not(boolean condition, Consumer consumer)`
- **feat**: Added `MybatisPlusInterceptor` to resolve incorrect Level 1 and Level 2 caching issues with multi-tenant and pagination plugins
- **feat**: New pagination plugin optimizes `orderBy` concatenation when `size<0`
- **feat**: Added `ImadcnIdentifierGenerator`, an implementation class of `IdentifierGenerator`
- **fix**: Fixed casting exception in `chainWrapper#func`
- **fix(mybatis-plus-generator.main)**: Refactored the generator database type converter, fixed some branch conditions, and submitted selector tests
- **fix**: Fixed issues with dynamic table name replacement in complex scenarios: changed regex from whitespace detection to word boundary detection
- **refactor**: Refactored the dynamic table name resolver, removing the regex replacement process and replacing it with table name position-based replacement
- **refactor**: Refactored table name parsing to use the visitor pattern, which no longer modifies the original SQL

## [v3.3.2] 2020.5.26
- Extracted pagination parameters and fixed unit test cases
- Added table filtering support for Dameng database code generator
- Added table filtering support for Microsoft SQL Server code generator
- Fixed attribute field rule errors in the code generator
- SelectById now supports custom method names
- Fixed database type detection issues in the pagination plugin
- Added null value handling for JSON converters
- bugfix(mybatis-plus-generator): Fixed incorrect SQL type returns
- Adjusted unknown dialect exceptions; automatically converts URLs to lowercase for matching
- fix: Fixed issue where multiple fields with @TableId annotation didn't throw exceptions during TableInfo initialization
- SuperController now has set methods with Class parameters
- Added method StrategyConfig.setSuperServiceImplClass(java.lang.Class<?>)
- Adjusted naming strategies for the code generator
- Extended pagination cache key value calculation
- Removed method inference and directly accesses property fields
- Fixed type mismatch comparisons in enum processors
- Modified table prefix matching method
- Fixed pagination plugin parameters not taking effect when set in MyBatis global configuration file
- Fixed null pointer exception when PR doesn't specify a parser
- Added limit parameter configuration for pagination plugin
- Fixed duplicate parent class field generation when specifying superEntityClass
- Removed unnecessary imports of IdType and TableId packages when no primary key exists
- Adjusted BaseResultMap format generation
- Added support for choosing whether to generate chain set methods in Lombok mode
- Fixed parser for update errors
- Filtered PG constraint columns (keeping only primary key constraints)
- Added ability to disable template generation in the generator
- fix(kotlin): Fixed dynamic table name BUG, implementing best-effort table name replacement
- Fixed duplicate attribute field generation from PG constraints
- fix(kotlin): Changed cached key in LambdaUtils to String
- Added database keyword processing interface to the code generator
- fix github/issues/2454 Added support for inheritable annotations
- Added AES encryption for database usernames and passwords
- Optimized method parameter generics to support more types
- Fixed missing package imports when generating entities with "is" prefix removal enabled in code generator
- fixed github issues/2470

## [v3.3.1] 2020.1.17
- Added `excludeProperty` attribute to the `TableName` annotation to support field exclusion
- Added `ServiceImpl#entityClass` property to reduce generic type extraction
- Added Phoenix support
- Added `Upsert` optional component for HBase support
- Added `enableSqlFilter` property to generator strategy configuration to control whether SQL table filtering support is enabled
- Added batch execution methods to facilitate custom batch operations
- `Wrapper` now supports `clear` method for clearing conditions
- Added `func` method to `Wrapper` subclasses, primarily to support using different methods in `if else` scenarios without breaking the chain (maintaining fluent method chaining)
- `BaseMapper` select methods with `Wrapper` parameters now support `wrapper.first` to set RDS hints
- `KtUpdateWrapper#set` now supports null values
- Added generic primary key support
- Optimized pagination interceptor data types and dialect implementation class configuration
- Secondary cache now reuses count query cache
- Some `IService` methods have been adjusted to default methods
- Secondary cache made compatible with JSON serialization scenarios (primarily addressing long values being deserialized as int in default count cache)
- Fixed nested transaction issues in batch operations (secondary cache update problems)
- Fixed issue where automatic population didn't work with `updateById` when optimistic lock was enabled
- Fixed issue where default methods in automatic population interface (`setFieldValByName` and `getFieldValByName`) could throw exceptions in certain scenarios
- Fixed nested function issues in `KtWrapper`
- Fixed constant errors in Freemarker-generated Kotlin classes
- Fixed `StringUtils#guessGetterName` errors
- Fixed resource leak issue in `SerializationUtils`

## [v3.3.0] 2019.12.06
- Optimized the two page methods in the BaseMapper interface
- Optimized the corresponding page methods in IService and ServiceImpl, modified some methods returning collection to return list instead
- Logical delete field definitions for deleted and not deleted now support the string `"null"`
- Fixed batch operations not clearing cache
- Converted batch operation exceptions to DataAccessException
- Updated mybatis to 3.5.3, mybatis-spring to 2.0.3, jsqlparser to 3.1
- Adjusted mapper optional package, adjusted chainWrapper package
- Added ChainWrappers utility class
- Added IdentifierGenerator interface to support custom ID generation
- Code generator deprecated regular table name matching, added likeTable and notLikeTable
- Pagination plugin supports custom handling of page number limits and overflow total page processing
- Fixed Oracle sequence auto-incrementing twice due to SqlExplainInterceptor
- Added pagination second-level cache support
- Extended p6spy log printing
- Added new propertyFormat attribute to DbConfig, removed related attribute from TableFieldInfo
- Optimized sequence generator, deprecated KeySequence's clazz attribute
- Fixed null value judgment failure caused by Ognl expression keywords
- Fixed update fill switch failure
- Optimized fill logic
- ISqlRunner now supports selectPage
- Added support for global logical delete fields
- BaseMapper methods can be customized
- Added support for **【虚谷】【Oracle12c】【Kingbase】** databases
- Fixed `null as xxx` occurrences when database field names differ from entity field names
- Deprecated ID_WORKER_STR, now automatically identifies primary key type
- Configuration enables annotations, TableName also forces generation

## [v3.2.0] 2019.08.26
- Code generator adds support for Dameng database
- Fix bug in SQL for querying table fields with multiple primary keys
- Add updateWrapper attempt update, otherwise continue to execute saveOrUpdate(T) method
- Code generator adds support for numeric instant type in PostgreSQL
- Fix issue where code generation fails when InjectionConfig doesn't exist
- fix: #1386(github) Logical delete field is Date type and non-deleted data date is null
- Upgrade dependency mybatis version to 3.5.2
- Upgrade dependency jsqlparser version to 2.1
- Remove 996NPL protocol restrictions in response to EasyScheduler's plan to submit Apache incubation request
- Adjust SQL to remove SET part Github/1460
- Remove SqlMethod enum UPDATE_ALL_COLUMN_BY_ID property, recommend using AlwaysUpdateSomeColumnById set
- fix: #1412(github) github:mybatis-plus-generator can't support oracle
- fix: github 1380
- Remove global configuration dbType and columnLike
- Remove fieldStrategy, use the three alternatives added in the previous version
- Remove PerformanceInterceptor related components, recommend using p6spy
- Remove el and split into specific properties like jdbcType typeHandler
- Upgrade gradle-5.5.1, lombok-1.18.4
- When selectStatement.getSelectBody() is of type SetOperationList
- Remove GlobalConfig#sqlParserCache property, remove LogicSqlInjector, OrderItem adds 2 quick generation methods, page adds an addOrder method with List<OrderItem> parameter
- For individual methods in Nested interface with parameter `Function<Param, Param> func`, change parameter to `Consumer<Param> consumer`, doesn't affect standard usage
- fixed gitee/I10XWC Allow custom type judgment based on TableField information
- Merge pull request #1445 from kana112233/3.0
- Support parent class property filtering functionality
- Add batch exception capture testing
- Multi-tenant ID value expression, supports multiple ID conditional queries
- Extend and add JSON type handlers with two implementations: jackson and fastjson

## [v3.1.2] 2019.06.26
- `EnumTypeHandler` renamed to `MybatisEnumTypeHandler`, removed `EnumAnnotationTypeHandler`
- Added automatic `resultMap` construction functionality, removed escape characters
- Added variable in annotations to control whether `resultMap` is automatically generated
- Fixed incorrect pagination cache key value
- Marked `TableField.el` property as deprecated
- Removed automatic registration of `MybatisMapWrapperFactory`
- Starter added default XML path scanning
- Added `MybatisPlusPropertiesCustomizer` and configuration usage
- Updated internal method parameters of `ConfigurationCustomizer` to `MybatisConfiguration`
- Marked original `fieldStrategy` as deprecated, added 3 new `fieldStrategy` types for differentiation
- Pass current `mapperClass` when obtaining injection methods
- Added SQLite code generation test code and test database files
- `JsqlParserCountOptimize` provides more accurate count optimization for `left join` SQL
- fix(AbstractWrapper.java): Fixed type inference error caused by lambda expressions in `order`, `groupBy` with only one condition
- apply plugin: 'kotlin'
- refactor(order): Fixed sorting field priority issue(#IX1QO)
- Cache `lambdacache` on startup
- Merge pull request #1213 from sandynz/feature/sqlComment Support SQL comments
- Removed some variables from wrapper, optimized internal string passing in wrapper
- fix: #1160(github) Pagination component `orderBy`: Fixed concatenation when both `group by` and `order by` exist, and sorting properties exist in IPage parameters
- Merge pull request #1253 from ShammgodYoung/patch-1 Code generator input table name case insensitive
- Added rendering object MAP information preprocessing injection
- Modified DTS `rabbitAdmin` bean judgment method
- Merge pull request #1255 from ShammgodYoung/patch-2 Indented `serialVersionUID` property
- Added boolean field to `JsqlParserCountOptimize` to determine whether to optimize join
- Merge pull request #1256 from baomidou/master Master
- Adjusted Freemarker entity template indentation
- Added `jdbcType`, `typeHandler` properties, merged `el` property

## [v3.1.1] 2019.04.25
- Added 996icu license agreement
- Added mybatis-plus-dts distributed transaction with RabbitMQ reliable message mechanism
- Added DynamicTableNameParser to support dynamic table names
- Optimized log printing for getOne method
- SQL optimization now skips stored procedures
- Optimized pagination queries (no further querying when count is 0)
- Fixed issue where first-level cache prevented pagination from continuing
- MybatisMapWrapperFactory now auto-injects
- Support using IPage subclasses as return values in pure annotation mode
- Logic deletion no longer requires LogicInject
- GlobalConfig adds enableSqlRunner property to control SqlRunner injection, default is false
- SqlParser annotation no longer requires global parameter setting for caching and supports annotation on mapper
- GlobalConfig's sqlParserCache property is now deprecated
- Upgraded MyBatis to 3.5.1, mybatis-spring to 2.0.1, downgraded jsqlparser to 1.2
- Removed injectSqlRunner method from ISqlInjector interface
- SqlFormatter class is now deprecated
- Fixed SqlCommandType confusion for auto-injected methods under logic deletion
- Added AlwaysUpdateSomeColumnById optional component
- SFunction now extends Function
- DbConfig's columnLike and dbType properties are now deprecated
- DbConfig adds schema and columnFormat properties
- TableField annotation adds keepGlobalFormat property
- TableName annotation adds schema and keepGlobalPrefix properties
- Fixed tmp file format corruption issue github #1048
- Implemented INameConvert interface strategy for table/field name processing github #1038
- Added DB2 dynamic schema configuration support github #1035
- Changed field cache key from className to .class; using dev-tools may cause: MybatisPlusException: Your property named "xxxx" cannot find the corresponding database column name! (Solution: remove dev-tools)

## [v3.1.0] 2019.02.24
- Upgraded `mybatis` to version `3.5.0`
- Upgraded `mybatis-spring` to version `2.0.0`
- Upgraded `jsqlparser` to version `1.4`
- Added p6spy log printing support
- Changed `IService`'s `getOne(Wrapper<T> queryWrapper)` method to throw `TooManyResultsException` when multiple records are found
- Fixed custom pagination not supporting the `@select` annotation
- Fixed generator issue where swagger mode was invalid in Kotlin mode
- Fixed generator issue where fields starting with "is" couldn't be automatically annotated
- Fixed generator issue with automatic package import when inheriting parent class in Serializable Active mode
- Fixed generator issue with automatically reading parent class properties for common fields
- Fixed enum (annotation method) converter failure during stored procedures
- Fixed incorrect logical delete annotation in beetl template
- Fixed issue where `mapUnderscoreToCamelCase` default value wasn't `true` for `Configuration` built via `mybatis-config.xml`
- Fixed bug caused by dynamic proxy in SQL parser
- Fixed issue where retry mechanism might cause startup errors when using pure annotations in `mapper`
- Optimized support for specifying `defaultEnumTypeHandler` for common enum processing
- Optimized SqlFormatter by copying latest code from Hibernate
- Removed non-empty checks for `coll` parameters and dynamic arrays in wrapper's `in` and `notIn` methods (**Note: If you previously used these methods with potentially empty parameters, they will now generate SQL like `in ()` or `not in ()` which will cause errors**)
- Removed `notInOrThrow` and `inOrThrow` methods from wrapper (**Using the new `in` and `notIn` methods has the same effect, with SQL exceptions being thrown**)
- Removed `delete` operation from `IService`'s `query` chain calls
- Removed XML hot-reloading related configuration items, keeping only the `MybatisMapperRefresh` class marked as deprecated
- Routine optimizations

## [v3.0.7.1] 2019.01.02
- Fixed an issue where lambdaWrapper could not retrieve the primary key cache
- Optimized the `update` chain call in `IService` to support `remove` operations
- Deprecated the `delete` method in the `query` chain call of `IService`
- Routine optimizations

## [v3.0.7] 2019.01.01
- Optimized generator support for generating Java 8 time types with PostgreSQL database
- Optimized generator support for generating Java 8 time types with SQL Server database
- Optimized LambdaWrapper field reflection to support fields with capitalized first letters
- Optimized select functionality for LambdaWrapper only (supports automatic "as" when field names don't match database columns)
- Optimized TableInfo cache Configuration to only keep the last one when BaseMapper subclasses are repeatedly scanned
- Optimized how MergeSegments retrieves getSqlSegment
- Optimized the initialization modelClass process for SQL auto-injectors to improve initialization speed
- Optimized BaseMapper's update method to support null as the first parameter
- Added 4 chain-calling methods to IService
- Added Beetl templates to the code generator
- Added millisecond time ID to IdWorker for use in order IDs
- Added inOrThrow method to wrapper that throws MybatisPlusException when input parameters are empty
- Added several new default methods to MetaObjectHandler that insert values based on annotations
- Added Kotlin lambda support with KtQueryWrapper and KtUpdateWrapper classes
- Added simplified usage for custom SQL in MyBatis-Plus, now you can use custom SQL + ${ew.customSqlSegment}
- Added new InsertBatchSomeColumn optional component
- Fixed Page's setTotal(Long total) -> setTotal(long total)
- Fixed Page's setSearchCount to be public
- Fixed TenantSqlParser issue where adding tenant information with "and" at the beginning of a where condition starting with "orExpression" caused unexpected logic
- Fixed wrapper's lambda method incorrectly passing down sqlSelect
- Fixed flushStatements issue with certain batch operations in ServiceImpl
- Fixed generic type error in selectObjs
- Removed InsertBatchAllColumn optional component
- Removed transaction annotations from non-batch operations in ServiceImpl
- Removed transaction annotations from Model
- Removed isInjectSqlRunner method from AbstractSqlInjector (SqlRunner initializes early, making isInjectSqlRunner uncontrollable)
- Removed MybatisSessionFactoryBuilder
- Removed dependency on mybatis-plus-generator package; you now need to introduce it as needed
- Restored XML hot loading with deprecation marker
- Upgraded jsqlparser dependency to version 1.3
- Routine optimizations

## [v3.0.6] 2018.11.18
- Fixed an issue where using two or more conditions in an entity combined with ODER BY or GROUP BY generated an incorrect WHERE X1 =? AND X2
- refactor(SerializedLambda.java): Refactored methods to increase deserialization security and optimized naming
- Optimized the base Mapper to support custom parent class Mappers for constructing required injection methods
- Replaced `<trim>` with `<where>` and `<set>`
- Partial optimization: String formatting now only occurs when an exception is thrown
- Optimized IdWorker's UUID generation for better concurrency performance
- feat: Dynamic pagination model, optimized pagination dialect, and re-corrected DB2 pagination statements
- Assert now supports i18n multilingual error messages
- Added support for controlling whether to count SQL via `total`, and added the `isSearchCount` method
- feat: Moved Spring dependency from the core module to the extension
- fix: Junit.assertTrue
- Forced the use of a custom ParameterHandler and removed the byId type restriction
- Added a universal `InsertBatch` method for optional components, along with corresponding tests, and code and performance optimizations
- Added new functionality to IPage for generic type conversion
- Auto-fill logic now checks if the fill value is empty and skips filling if it is
- Increased the batchsize threshold from 30 to 1000 for improved efficiency
- Fixed execution errors in `saveOrUpdate` under extreme conditions
- Removed MybatisSqlSessionTemplate
- Removed XML hot loading
- Other optimizations

## [v3.0.5] 2018.10.11
- Removed ApiAssert and replaced it with Assert
- Removed ApiResult and replaced it with R
- SQL injector optimization
- Removed the excludeColumns method
- Fixed an issue where the condition parameter in the last method was not taking effect
- Fixed the bug where "1=1" was incorrectly removed
- Removed support for spring-devtools
- Fixed SQL concatenation errors when all entity properties are null
- Cached Class reflection information to improve performance
- Entities that inherit from the Model class no longer need to override the pkVal() method
- Resolved the mpe bug that occurred when config-location was set, and optimized initialization logic
- Fixed logical deletion failure when mapper.xml files are present
- Adjusted transaction issues in ServiceImpl - gitee issue/IN8T8
- Fixed DB2 pagination dialect - github issues/526

## [v3.0.4] 2018.09.28
- Fixed global configuration FieldStrategy not being the default value
- Fixed batch transaction exception issues
- Fixed automatic processing logic failure in the API layer R class
- Modified H2 script initialization loading, removed test case injection
- Added other comments

## [v3.0.3] 2018.09.17
- Added field filtering method for queries
- Fixed bug with multiple parameters in orderBy
- Added LogicDeleteByIdWithFill component
- Fixed github issues/476 and issues/473
- Fixed github issues/360 and gitee issues/IMIHN, IM6GM
- Improved allEq parameter by changing value to use generics
- Fixed saveOrUpdateBatch to use BatchExecutor
- Fixed getOne throwing exception when retrieving multiple records
- Corrected getOne method in service
- Modified some service methods to be default methods
- Fixed SQL bug when page had desc set
- Removed methods that are no longer needed
- Resolved two jar issues with generator's optional dependencies
- Overloaded select(Predicate<TableFieldInfo> predicate)
- Other optimizations

## [v3.0.2] 2018.09.11
- Added Wrapper conditional helper class
- Added banner property to control whether it gets printed
- Fixed gitee #IMMF4: Batch insert (AR) transaction invalid
- Fix: Bug where entity without primary key generated ew's where condition
- Handled SqlRunner's sqlSession acquisition and release
- Removed global sqlSession cache, added sqlSession release for Model and generic service layer
- Ext: Abstracted native enum handler class registration for easier extension
- Other extensibility optimizations

## [v3.0.1] 2018.08.31
- Fixed abnormal table prefix setting in the code generator
- Added generic enumeration processing via EnumValue annotation scanning
- Fixed failure when mixing logical delete operations
- DB2 dialect improvements optimized by He Pengju
- Added test cases and other improvements

## [v3.0-RELEASE] 2018.08.28 Codename: Super Lollipop 🍭
- Optimistic lock: The `update(et,ew)` method now rewrites the version-annotated field in the `et` parameter
- Optimized and improved the code generator
- No longer throws exceptions when package scanning returns empty results (enums, aliases)
- Removed SqlSession
- Modified issue templates and improved code comments
- Optimized the initialization process and added detection for logical delete annotation usage
- SQL inspection now allows skipping checks
- Added support for Dameng database
- Modified code to use numeric types with strict constraints and simplified API layer naming and default value rules
- Moved initial SQL parsing to SqlInjector
- Other code optimizations

## [v3.0-RC3] 2018.08.19 Codename: Super Lollipop 🍭 RC3
- Support TableField select attribute set to false to exclude large fields from default query injection
- Fix deserialization error with pages property in page objects
- Merge 2.x dataSource proxy handling
- Remove DbConfig.columnUnderline property
- Filter empty result sets in selectObjs queries
- baseMapper insert and update methods no longer use wrapper classes for return values
- Fixed Gitee issues/IM3NW
- Code optimizations and improved documentation

## [v3.0-RC2] 2018.08.10 Codename: Super Lollipop 🍭 RC2
- Re-added MODULE_NAME configuration in the generator and opened the config for customization
- Fixed invalid configuration for the `setting - defaultEnumTypeHandler` property
- Added compatibility for Spring Boot 1.x startup
- Routine optimizations, test cases, and improved exception throwing processes
- Added issue and pull request templates for Gitee and GitHub
- Removed automatic database keyword escaping, now only supports escaping via annotation mode
- Replaced exception throwing with `assert` or `ExceptionUtils` for optimization
- Moved underscore to camel case conversion to configuration and optimized `ColumnUnderline`
- Fixed polymorphic serialization exceptions for `page` serialization `asc` and `desc`
- Changed default `dbType` to `other`; `dbType` is now automatically detected only if not configured by the user
- Optimized code: `ColumnUnderline` and `MapUnderscoreToCamelCase` now have the same meaning
- Fixed ILY8C generator package imports when specifying `IdType`
- Added extensive comments and numerous new test cases

## [v3.0-RC1] 2018.08.01 Codename: Super Lollipop 🍭 RC1
- Optimized utility class code and fixed a BUG that could cause deadlocks in multi-threaded environments
- Added assertion class and replaced several manual exception checks with assertions
- Removed redundant "implements Serializable" declarations
- Converted magic values to global constant patterns
- According to Miemie, MP 3.0 pagination is now excellent and no longer needs to accommodate the PageHelper pattern
- issue #384 QueryWrapper now supports excluding specified field patterns
- New banner, fresh new feel
- Further optimized the exception throwing process
- Modified class instantiation method - private classes can now be instantiated
- Supports startup without configuration Gitee issues/ILJQA
- Released sqlSession - ActiveRecord unit tests pending optimization
- Fixed issues with SQL generated when only calling last() method
- Fixed error when Lambda's first property is a base class property
- Added generic restrictions and formatted code
- Optimized ISqlSegment usage in AbstractWrapper
- Other improvements

## [v3.0-RC] 2018.07.23 Codename: Super Lollipop 🍭 RC
- Optimized page to automatically switch to list mode when size is less than 0
- Added attack SQL blocker parser
- Optimized core method name parsing, added querywrapper lambda conversion parameter testing
- Adjusted generic service layer method names to follow Alibaba specifications (We apologize, guinea pigs! Please scorn us! Then update your projects accordingly.)
- Code generator now supports regular expression table name matching
- Optimistic lock now writes back the updated version to the entity
- GitHub #385: Dynamic table name queries can now utilize Wrapper
- Fixed Gitee issues/ILEYD
- Moved Page serialization interface to IPage interface
- Fixed issue where gamma couldn't automatically assign IDs
- Optimized code by changing constant references

## [v3.0-gamma] 2018.07.15 Codename: Super Lollipop 🍭 Gamma
- Added listMode collection pattern to IPage
- Fixed Gitee issues/IL7W4
- Fixed Gitee issues/IL7W4
- Optimized generator package imports
- Resolved Page ascs, descs exception
- Fixed issue where logical delete couldn't set where entity with a single parameter while maintaining logical delete
- Merged PR to modify typeAliasesPackage scanning for multiple dimensions
- Improved 3.0 test cases
- Code performance optimization and other improvements

## [v3.0-beta] 2018.07.07 Codename: Super Lollipop 🍭 Beta
- Added global configuration for field LIKE query injection, enabled by default (true)
- Modified CONCAT method for Oracle and DB2 in dbtype
- Fixed issue where logical delete constraints persisted regardless of changes to updateWrapper parameters in update operations
- Added warnings to comments and improved comment documentation
- Fixed GitHub issues/377, 378, 389
- Resolved coexistence of logical delete and non-logical delete logic
- Logical delete now supports setting other fields with delete, and update excludes logical delete fields
- Added support for multiple wildcards in typeAliasesPackage (e.g., com.a.b.*.po, com.c.*.po)
- Fixed Gitee issues/IKJ48, IL0B2
- Other improvements

## [v3.0-alpha] 2018.07.01 Codename: Super Lollipop 🍭
- Upgraded to JDK 8 + optimized performance. Wrapper now supports lambda syntax
- Modularized MyBatis-Plus with a reasonable package structure distribution
- Refactored injection methods to support simplified injection patterns for any method
- Global configuration for underscore-to-camelcase conversion, eliminating injection AS statements
- Renamed Wrapper to QueryWrapper and UpdateWrapper
- Refactored pagination plugin to eliminate fixed pagination models and support direct IPage interface returns from Mapper
- Added REST API support through the Controller layer
- String type fields in entities now default to LIKE queries. SelectOne defaults to LIMIT 1
- Added helper support for selectMaps and new bean-to-map conversion utility classes
- Added DB2 support. Starter updated to support Spring Boot 2+
- Refactored code generator to provide custom database support and multiple template engine options
- Various bug fixes

## [v2.1.9] 2018.01.28 Codename: Remembrance (Commemorating the 2017 growth journey of baomidou organization members with MP, heading towards a prosperous 2018)
- Pagination: Added setting to control whether to optimize Count SQL
```
// Disable count sql optimization
page.setOptimizeCountSql(false);
```
- Injection definition population, supporting SQL injector and primary key generator
- Fixed GitHub issues/231
- Fixed GitHub issues/234
- Fixed logical deletion selectByIds collection issue
- Fixed Gitee issues/IHF7N
- Fixed Gitee issues/IHH83
- Configuration compatibility: Prioritizes using custom injections
- Other optimizations

## [v2.1.9-SNAPSHOT] 2018.01.16
- Adjust Gradle dependency mode
- IdType now supports ID_WORKER_STR `string type` IdWorker.getIdStr() string type
- TableField annotation adds new `update` attribute for custom injection in preprocessed SET fields fixed gitee IHART
```
 For example: @TableField(.. , update="%s+1") where %s is filled with the field name
 Output SQL: update table set field=field+1 where ...
```
```
 For example: @TableField(.. , update="now()") uses database time
 Output SQL: update table set field=now() where ...
```
- TableField annotation adds new `condition` attribute for custom operation rules in preprocessed WHERE entity conditions
```
@TableField(condition = SqlCondition.LIKE)
private String name;
Output SQL: select table where name LIKE CONCAT('%',value,'%')
```
- Add spring-boot-starter module with built-in `jdbc mp package doesn't need separate introduction` for better Boot usage
- Add support for SQL Server view generation
- Allow independent field strategy configuration, defaults to naming strategy
```
strategy.setNaming(NamingStrategy.underline_to_camel);// Table name generation strategy
strategy.setColumnNaming(NamingStrategy.underline_to_camel);// Allow independent field strategy configuration, defaults to naming strategy
```
- Code generator abstracts AbstractTemplateEngine template engine abstract class, allowing custom template engines, with new built-in freemarker option
```
// Choose freemarker engine
mpg.setTemplateEngine(new FreemarkerTemplateEngine());
```
- Related SQL parsing such as multi-tenant can exclude SQL parsing via `@SqlParser(filter=true)`

# Enable SQL Parser Cache Annotation to Take Effect
```yaml
mybatis-plus:
    global-config:
        sql-parser-cache: true
```
- Resolves XML loading order issues, allowing you to freely reference other XML SQL fragments
- Fixes bug where author contained 123
- fix #IGQGE: Issue where Condition couldn't be passed when Wrapper was empty but page.getCondition() wasn't empty
- fix #IH6ED: Pagination dubbo sorting and other attribute serialization not supported
- Uses == to check if Wrapper is empty, avoiding impact from overloaded equals methods
- Prevents injection of custom base classes
- Extracts SQL separately into SqlUtils
- Standardizes indentation and coding style
- Optimizes generated code execution performance github issues/219
- Optimizes SQL parsing process
- fixed gitee issues/IHCQB
- Changes springboot-configuration-processor from compileOnly to optional
- Other improvements

## [v2.1.8] 2018.01.02 Codename: 囍
- Fixed a bug in the code generator caused by field prefixes
- Replaced manually written fully qualified names with class full names
- Build modifications
- Script warnings, ignore directories
- Other optimizations

## [v2.1.8-SNAPSHOT] 2017.12.28 Codename: Sunfish (Named by Qiuqiu)
- Automatically convert underscore to camel case when returning Map
- Add static constant support for Kotlin entities
- Optimize pagination builder pattern
- Merge pull request #201
- fix: selectByMap @alexqdjay
- Add SQL runner test cases, fix bug where selectObjs only retrieved one field
- Add new BlobTypeHandler
- Remove initial size configuration for parameter map
- Add .editorconfig, fix template spacing issues
- HikariCP connection pool unable to print SQL
- Remove path from global configuration, mapperLocations is now required
- K Shen completes full test case coverage

## [v2.1.7] 2017.12.11 Codename: Gentle Breeze - This version number has a bug, please change to 2.1.8-SNAPSHOT +
- Enum handling: primitive types, Number types, String types
- IGDRW: Fixed misleading source code comments
- Cannon fodder PR !42: Added pagination constructor overloads
- Code generation > Oracle > Fixed maximum cursor exceeded issue
- Fixed gitee IGNL9
- K-shen: A large wave of test cases incoming
- Used transient keyword to exclude certain Page fields from serialization
- Removed invalid logs
- Fix #IGI3H: Changed selectBatchIds parameter to Collection type
- Bugfix for logic delete SQL injector
- Added support for multiple sort fields
- Fixed github #185: Auto-increment primary key batch insert issue in version 2.0.2 PR
- Other optimizations

## [v2.1.6] 2017.11.22 Codename: Little Qiu Qiu's Kiss
- Module split into support, core, and generate; code generation separated as an optional dependency
- Resolve Gitee issue IFX30: Split mybatis-plus-support package support
- Resolve Gitee issue IGAPX: Generic enum BigDecimal type mapping
- Druid supplement, modified field population logic
- Fixed partial logic bugs in Kotlin code generation
- Merged Gitee PR 40: updateAllColumn**** and other methods now exclude fields annotated with fill = FieldFill.INSERT. Thanks to Elsif
- Modified constructor pattern settings for Kotlin
- Optimized reflection instance handling in SQL utility class
- Other optimizations

## [v2.1.5] 2017.11.11 Codename: Departing God
- Compatibility adjustments for general enums in Spring Boot
- Fixed PostgreSQL keyword/non-keyword conversion issues
- Cat73 PR: Minor adjustments to automatically generated code
- Added Kotlin code generation support
- Bug fix for metaObj handler setting values not included in...
- Alibaba specification adjustments
- Other fixes

## [v2.1.3 - 2.1.4] 2017.10.15
- Added a general enumeration handler. Refer to the Spring Boot demo for details.
- Optimized the SQL parser.
- Added a schema tenant parser (requires further refinement).
- Other optimizations.

## [v2.1.2] 2017.09.17 Codename: X
- Fixed a code generator bug
- Fixed Gitee issues/IF2DY
- Modified Page to support chainable operations
- Removed Oracle escaping
- Fixed GitHub issues/119
- Fixed Gitee issues/IF2OI

## [v2.1.1] 2017.09.12 Codename: Little Pot Lid
- Fixed bug where pagination automatically reset to the first page when exceeding total record count @wujing Thanks for the PR
- Fixed IEID6
- Upgraded MyBatis to 3.4.5
- Upgraded generator template engine Velocity to 2.0
- Upgraded JSqlParser to 1.1
- Added dynamically extensible SQL parsing chain for custom SQL parsing
- Added multi-tenant SQL parsing logic, see the Spring Boot demo for details
- jasonlong10 PR: Performance analysis interceptor now supports printing SQL for OraclePreparedStatementWrapper cases
- Fixed GitHub issues/145
- Fixed Gitee issue/IF1OF
- Added test case for sqlSelect("distinct test_type")
- Added missing TableField import class for the filler generator
- Fixed GitHub issues/MYSQL table names containing reserved words causing errors during code generation #124: Added support for all uppercase field names with underscore naming
- Fixed GitHub issues/134
- PostgreSQL code generation now supports specifying schema table fields with default sorting
- Other optimizations and adjustments

## [v2.1.0] 2017.08.01 Codename: Xiao Qiu Qiu

#### Core Features
- Fixed the issue where batch SQL sessions were not being closed
- Resolved SQL formatting errors and added padding information
- #91: Optimized insertBatch for large data volumes GitHub
- Added UUID primary key test cases
- Fixed the bug where auto-fill would overwrite previous values
- Upgraded POM dependencies, set spring-test scope to test
- Changed SQL Server driver, removed unnecessary String type tests for optimistic locking
- #86: Regarding the underlying mapping design of Plus GitHub issue
- SqlHelper now handles cases where Wrapper is empty but page.getCondition() is not empty
- Merge pull request !33: Add field sorting when generating entities from Laoqian/master
- Resolved the issue where using proxy objects prevented accessing instance cache information
- Fixed SQL generation errors for Boolean types starting with "is"
- Fixed incorrect DBType settings
- fix #351: DB2Dialect returning NULL
- fix #356: Incorrect getter method generation for Boolean types in auto code generation
- fix #353: Issues with @TableLogic in code generation
- Added PostgreSqlInjector auto-injector to handle case-sensitive fields and automatic double quote escaping
- Repository URLs and user information now use custom inputs
- fix #357: Package import bug with @TableLogic in code generation
- Sequence now includes Mac detection, PageHelper pagination mode adds freeTotal() method
- #95: Two suggestions for the pagination plugin GitHub, selectItems contains #{} ${},
- Added Wrapper#setSqlSelect(String... columns) method for easier use with auto-generated entities...
- fixed GitHub 116 issue
- fixed osgit IE436 IDVPZ IDTZH

#### Code Generation
- Modified entity generation templates
- Fixed auto-fill code generation errors
- Added PostgreSQL schema name generator support
- Adjusted serialization import issues
- Other

## [v2.1-gamma] 2017.06.29

#### Core Features
- Fixed the issue where SQL Server automatically retrieved incorrect data types
- Fixed the issue where users couldn't customize pagination database dialects

#### Code Generation
- Improved auto-fill code generation
- Fixed the issue where PostgreSQL generated duplicate fields

#### Issues Caused by Previous Version (2.0.9) Upgrade
- Fixed the issue where entity primary keys couldn't be read if not in the first position
- Fixed the `Insert not found et` exception when performing custom insert operations, see #331
- Fixed SQL generation errors (regular injection of Group, Having, Order)
- Fixed incorrect SQL generation order for logical deletion
- Thanks to all the developers who promptly reported issues. We sincerely apologize for the problems caused by the previous version.

### Mybatis-Plus-Boot-Start [1.0.4]

#### Core Changes
- Removed direct dependency on Mybatis-plus
- Removed direct dependency on SpringBoot jdbc-starter

## [v2.0.9] 2017.06.26 Codename: K God
### MyBatis-Plus
#### Core Features
- Fixed the conflict between optimistic locking and logical deletion
- Fixed SQL injection generation not considering underscore configuration when enabled
- Resolved EntityWrapper inheritance issues
- Added conditional judgment to Wrapper
- Performance analysis plugin now supports logging output
- Wrapper's toString method was rewritten to fix null display during Debug that caused user confusion
- Fixed Sequence concurrency issue where even numbers dominated within non-millisecond intervals
- Optimized ignore strategy and changed annotation properties
- Optimized SQL injection method by removing previous XML injection approach
- Fixed issue where logical deletion generated two WHERE clauses
- Added implementations for other database sequences and exposed interfaces for user extension
- Optimized and adjusted optimistic locking
- Optimized Wrapper's WHERE AND/OR by removing reflection-based implementation, improving code execution efficiency
- Fixed primary key auto-fill issue when mybatis-config.xml is not added
- MyBatis-Plus now supports Gradle build method
- Wrapper added `and()` and `or()` methods
- Optimized GlobalConfiguration by extracting GlobalConfigUtils to reduce coupling
- Fixed pagination issues with SqlServer2008 and SqlServer2005
- Added automatic database recognition to reduce explicit user configuration
- Optimized pagination plugin to reduce required user configuration properties
- Resolved auto-fill field issues
- Added PageHelper to manage pagination using current thread (not recommended for previous users, only for those accustomed to MyBatisPageHelper)
- Significantly increased test case coverage (thanks to K God for support)
- Other code optimizations
- Added JSqlparser dependency so manual JAR addition is no longer required

#### Code Generation
- Support for logical deletion generation
- Support for optimistic locking generation
- Fixed code generator failing to recognize SQL Server auto-increment primary keys
- Support for Lombok-style generation
- Support for builder pattern generation
- Added Clob and Blob type conversion
- Fixed Oracle Number type field conversion errors

### MyBatis-Plus-Boot-Starter [1.0.2] Codename: Breeze
#### Core Features
- Fixed AR mode devtool data source replacement failure issue
- Added logical deletion support
- Added sequence support

## [v2.0.8] 2017.05.15
- Added sqlSelect object setting to Wrapper
- Added compatibility for scenarios without annotations
- Removed default short implementation for optimistic locking and optimized binder registration to bind during the scanning phase. Changed tests to use H2 environment.
- Optimized hot reloading and removed mapper path configuration
- Reduced Mapper configuration refresh frequency
- Fixed issue where tableField value was empty and enabled underscore naming
- Sequence upgrade notification
- Exposed table information and reserved subclass override capability
- Modified IdWorker tests
- Added support for devtools
- Fixed #259: Added support for XML resultMap common field generation
- Fixed pulls #28: Added support for property overloading

## [v2.0.6  2.0.7] 2017.04.20
- Added logical delete functionality
- Added Oracle Sequence support
- Added JDK 1.8 time type support
- Improved optimistic lock support
- Enhanced field filler to support update operations
- Upgraded MyBatis dependency to version 3.4.4
- Code refactoring and optimization, added support for wrapper limit logic
- Fixed ID strategy auto bug, generator bugs, and other issues

## [v2.0.5] 2017.03.25

- Fixed a bug where the pagination connection pool was not being closed
- Fixed issue #217
- Fixed a bug where `IMetaObjectHandler` was not working when the primary key type was AUTO or INPUT
- Fixed the LIKE placeholder issue
- When generating code, create the directory if it does not exist

## [v2.0.3 - v2.0.4] 2017.03.22

- Optimized Wrapper code structure
- Optimized existing database connection acquisition
- Fixed Page initialization issue (previously only worked through constructor, now works through setter/getter methods as well)
- Added support for optimistic lock plugin
- Refactored Wrapper to let JDBC handle parameters at the底层 level, better integrating with PreparedStatement
- Fixed relevant error log level indications
- Exposed the isWhere method in Wrapper, allowing you to customize whether to append "WHERE"
- Downward compatibility for JDK version - removed usage of JDK 1.7 specific features from previous code
- Fixed SQL Server generation bugs and optimized related code
- Optimized MyBatis-Plus SqlSession acquisition
- Fixed issues where sqlSession commits didn't belong to current transaction when no切点 was configured, and transaction problems caused by multiple sqlSessions
- Enhanced SQL execution class, sqlRunner
- Added serialization ID to Model to avoid potential changes in serialization ID when modifying Model without setting serialVersionUID
- Added test cases for overriding default BaseMapper
- Thanks to all the contributors for their great suggestions and code contributions - too many to list individually

## [v2.0.2] 2017.02.13
- Fixed the logic where global configuration was not taking effect in version 2.0.1
- Removed forced configuration type for `byId`
- Code optimizations for Wrapper, Page, and other programs
- Optimized AR mode to automatically close database connections (previously required manual transaction setup)
- Enhanced the code generator: underscore name annotations no longer process camel case, and added support for custom templates like JSP and HTML
- Added service layer testing
- Integrated SQL logging into the performance analysis plugin
- Enabled multi-datasource support for the pagination plugin across multiple database types

## [v2.0.1] 2017.01.15

- Fixed incorrect SQL statement construction for boolean types in EntityWrapper
- Adjusted global configuration initialization log messages
- Upgraded MyBatis dependency to 3.4.2 and MyBatis-Spring dependency to 1.3.1
- Added methods to Service interface (selectObjs, selectMaps)
- Fixed error when selectCount returns null from database
- Added PostgreSQL code generation support
- Extended support for externally provided escape characters and keyword lists
- Enabled MP CRUD injection for tables without primary keys (xxById methods cannot be used without primary keys)
- Fixed issue where first call to OR method in EntityWrapper SQL concatenation didn't work
- Added SQL Server code generation (based on 2008 version)
- Fixed missing BigDecimal import in generated code
- Released database connections when automatically reading database schema
- Optimized global validation mechanism (EMPTY validation now ignores Date types)
- Optimized injection to avoid scanning BaseMapper
- Optimized injection by removing redundant injection methods
- Renamed SQLlikeType to SqlLike
- Fixed hot reloading association query errors
- Renamed SqlQuery to SqlRunner
- Optimized and improved code generator
- Fixed missing @tableName import in code generator
- Changed global configuration to automatically inject MP default classes instead of requiring manual addition
- Added ne method to Wrapper
- Fixed issue where MyBatis dynamic parameters couldn't generate totalCount
- Optimized code structure and generator templates
- Resolved issues [138,140,142,148,151,152,153,156,157]. For details, see all issues in milestone [mybatis-plus 2.0.1 plan](https://gitee.com/baomidou/mybatis-plus/milestones/2)

## [v2.0.0] 2016.12.11

- Added support for global uppercase naming strategy
- Optimized automatic pagination Count SQL statements
- Improved existing global configuration strategies
- Enhanced global validation strategies
- Refactored code generator (replaced hard-coded implementation with template-based approach)
- Optimized the logic for injecting generic methods via Map
- Added automatic database type selection
- Improved SqlExplainInterceptor (now automatically bypasses if MySQL version is too low < 5.6.3 and doesn't support the interceptor)
- Fixed issue with multiple escapes of certain special characters
- Optimized existing EntityWrapper by adding Wrapper parent class and Condition chain query
- Made Wrapper class LIKE method compatible with multiple databases
- Optimized logging to use native MyBatis log output for提示信息
- Fixed issue where cache usage prevented Count value calculation in pagination
- Fixed PerformanceInterceptor replacing `?` causing inaccurate SQL printing, and added formatted SQL option
- Added support for multiple database types, see DBType for details
- Added non-empty validation strategy for string type fields (automatically checks for non-null and non-empty strings)
- Added QBC-style queries to Wrapper (eq, gt, lt, etc.)
- Support for Active Record mode (requires extending Model)
- Merged all Selective generic methods (e.g., removed previous insert method and renamed insertSelective to insert)
- Fixed issue where SQL stripper would remove `--` comments
- Support for MySQL keywords with automatic escaping
- Streamlined underlying Service and Mapper inheritance structure
- New way to execute SQL without writing it in XML - see SqlQuery for details
- Optimized code structure
- Resolved issues [95,96,98,100,103,104,108,114,119,121,123,124,125,126,127,128,131,133,134,135] - see milestone [mybatis-plus 2.0 plan](https://gitee.com/baomidou/mybatis-plus/milestones/1) for all issues

## [v1.4.9] 2016.10.28

- Removed `@Transactional` annotation from ServiceImpl and removed Slf4j dependency
- Fixed SQL injection vulnerability when using EntityWrapper for queries with special characters as parameters
- Adjusted MyBatis camel case configuration order: MyBatisPlus > MyBatis
- Optimized the pagination plugin and fixed the issue where overflow settings were not working
- Removed DBKeywordsProcessor and added MySQL automatic keyword escaping
- Code generator now supports generating TEXT, TIME, and TIMESTAMP types
- Added batch insert methods
- Code generator now supports generating Controller layer code
- Changed some List parameters to Collection in EntityWrapper class
- Code generator optimization to support resultMap

## [v1.4.8] 2016.10.12

- Added empty string check for primary keys in `insertOrUpdate`
- Added support for enabling/disabling MyBatis native camelCase configuration `mapUnderscoreToCamelCase`
- Added global configuration support for `TableField FieldStrategy` annotation
- `SelectOne` and `SelectCount` methods now support EntityWrapper
- Oracle code generator now distinguishes between Integer, Long, and Double types
- Fixed a bug in the `InsertOrUpdate` method with INPUT primary key strategy
- EntityWrapper IN clause now supports variable arrays
- Changed PK parameter type to `Serializable` for base Mapper and Service generic methods
- Added a warning when `selectOne` returns multiple results (requires log level set to WARN)
- Added logger to `baseService` so subclasses can use it directly without redefinition (requires slf4j dependency)

## [v1.4.7] 2016.09.27

- Changed primary key annotation from "I" to "PK" for better understanding, removed mapper annotation
- Performance analysis plugin now handles `$` symbol content with special processing
- Added documentation for auto-commit transactions and new transaction tests
- Added support for resultMap entity result set mapping
- Added `#TableField(el = "")` expression support - when a field is an object, you can use `#{object.property}` to map to database tables, including tests
- Added typeHandler support for cascading queries
- Added validation field strategy enum class
- Code generator now supports entity builder model configuration
- Code generator added support for entity constant generation
- CRUD operations now include insertOrUpdate method
- Fixed MessageFormat.format SQL errors when formatting numeric types
- EntityWrapper added support for EXISTS, IN, and BETWEEN AND methods (thanks to D.Yang for the suggestion)
- Added support for MySQL 5.7+ JSON and ENUM types in code generation
- CRUD methods are now injected even without XML configuration
- Modified the loading order of native MyBatis configuration files

## [v1.4.6] 2016.09.05

- Added support for skipping SQL injection when no `@TableId` annotation is present
- Support for disabling population execution when inserting non-table mapped objects
- `xxxByMap` methods now support null value queries

## [v1.4.5] 2016.08.28

- Added automatic hot-reloading for XML modifications
- Added automatic handling of MessageFormat parameters with string type in EntityWrapper methods
- Added automatic population of common table field functionality

## [v1.4.4] 2016.08.25

- All conditional class methods in EntityWrapper now support null parameters. These conditions will not be added to the SQL statement.
- TSQLPlus has been renamed to TSqlPlus to maintain consistent naming conventions.
- Fixed MySQL keyword bug - keyword mapping conversion now adds `` symbols. Added the ability to customize file extensions when generating XML files.
- Added non-null checks before closing resources to avoid NullPointerException caused by erroneous SQL. Added current > pages check.
- TSQL related classes now implement serialization to support Dubbo.
- Added MyBatis automatic hot-loading plugin.
- Supports escaping database keywords like "order" and "key" during CRUD operations.

## [v1.4.3] 2016.08.23

- Optimized Sequence compatibility for cases where MAC address cannot be obtained
- Added compatibility for user-set empty string IDs with automatic population
- Converted all-uppercase naming to lowercase properties
- Modified EntityWrapper to encapsulate method definitions for T-SQL syntax compliant conditions
- Upgraded to 1.4.3 for testing transitive dependencies

## [v1.4.0] 2016.08.17

- Add custom select result sets and optimize page pagination
- Remove field optimization as functions were not considered
- Add interceptor to prevent full table operations for delete and update

## [v1.3.9] 2016.08.09

- Fixed bugs
- Resolved map insertion exceptions
- Map insertion now returns unchanged results without processing
- Optimized IdWorker generator
- Added support for custom LanguageDriver
- Added support for custom class names in code generation
- Upgraded MyBatis dependency to version 3.4.1

## [v1.3.6] 2016.07.28

- Support global configuration for underscore naming of table fields
- Add custom SQL injection methods
- Optimize pagination logic to skip list queries when total record count is 0
- Add AS handling for automatically generated base fields in XML
- Support subqueries for fields

## [v1.3.5] 2016.07.24

- **Upgrade** 1.3.5 now supports global configuration for underscore naming of table fields
- **Add** Exception thrown when multiple primary key annotations are detected
- **Add** Startup exception for entities without a primary key
- **Remove** Reset of getDefaultScriptingLanuageInstance
- **Modify** Ambiguous overloaded methods

## [v1.3.3] 2016.07.15

- Fixed thread safety issues with SimpleDateFormat
- Fixed Oracle pagination bug
- Fixed Oracle TIMESTAMP generation support bug

## [v1.3.2] 2016.07.12

- Service layer exposes method calls for sqlSegment
- Added SQL execution performance analysis plugins
- Added deleteByMap and selectByMap methods

## [v1.3.0] 2016.07.07

- Added support for query sqlSegment implementation, including LIKE comparisons
- Added wildcard scanning for typeAliasesPackage and count-free pagination queries
- Tested the execution principle of MyBatis mapper method calls
- Added IOC demonstration examples

## [v1.2.17] 2016.06.15

- **Optimized** the code generator (thanks to yanghu pull request)
- **Adjusted** SQL loading order: xmlSql > curdSql
- **Added support** for CRUD second-level caching
- **Added** cache testing and special character testing

## [v1.2.15] 2016.04.27

- **New:** Added support for Oracle automatic code generation and testing functionality
- **New:** Added UUID strategy
- **Demo:** Click spring-wind to view the demonstration
- **New:** Added support for single table count queries

## [v1.2.12] 2016.04.22

- Added support for generic IDs in the service layer and optimized code generation
- Upgraded MyBatis to 3.4.0 and mybatis-spring to 1.3.0

## [v1.2.11] 2016.04.18

- Added batch update functionality with support for Oracle batch operations
- Removed and migrated documentation to spring-wind
- Modified parameter descriptions to support JDK 1.5
- Added database type support

## [v1.2.9] 2016.04.10

- Added a no `order by` constructor for EntityWrapper
- Overloaded the `sendMail` method in MailHelper
- Added String primary key ID support for CommonMapper
- Separated the original `selectList` method into two methods: `selectList` and `selectPage`
- Optimized the code generator and added documentation and other improvements

## [v1.2.8] 2016.04.02

- Optimized code generation for handling uppercase fields, supporting automatic generation of entity, mapper, and service files
- Enhanced pagination logic for handling out-of-bounds index values, added 5 new CRUD operation methods
- Exposed the template engine's `getHtmltext` method
- Improved email sending configuration with added documentation
- Added documentation and other improvements

## [v1.2.6] 2016.03.29

- Optimized code encapsulation in the service layer by extracting `list` and `page` methods
- Optimized the count SQL statement for pagination
- Improved the mail utility class
- Enhanced framework support for the Spring framework
- Added documentation and other improvements

## [v1.2.5] 2016.03.25

- BaseMapper with independent ID generic type support
- More comprehensive code generator
- Entity wrapper sorting support
- Pagination plugin improvements
- Service layer primary key generic type support extracted

## [v1.2.2] 2016.03.14

- The `@TableId` annotation distinguishes between: `AUTO` for database auto-increment, `ID_WORKER` for auto-filling custom incremental IDs, and `INPUT` for manual entry.
- Optimized code and the code generator functionality.
- Other improvements.
