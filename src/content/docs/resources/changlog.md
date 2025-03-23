---
title: 更新日志
description: 版本更新日志
---
## [v3.5.11] 2025.03.23
- fix: 修复代码生成器链式模型非`lombok`下生成了`@Accessors`注解
- fix: 修复主键使用`UUID`执行批量删除错
- fix: 修复`Kotlin`使用`select(predicate)`方法错误
- fix: 修复`AbstractCaffeineJsqlParseCache`异步产生的错误
- fix: 修复动态SQL解析包含SQL注释(--或#)导致的合并错误 (动态脚本语句不再处理换行,如果需要去除换行请自行处理)
- fix: 修复`DataChangeRecorderInnerInterceptor`数据比较出现强转异常
- fix: 修复`IllegalSQLInnerInterceptor`拦截插件获取`catalog`与`schema`错误
- fix: 修复动态表解析`create table if not exists` 获取表名错误
- fix: 修复动态表解析`create [type] index` 获取表名错误
- feat: 新增`DynamicTableNameJsqlParserInnerInterceptor` 基于`JsqlParser`动态表处理
- feat: 支持`DdlScript`自定义脚本运行器参数
- feat: 支持`DdlHelper`自定义脚本运行器参数
- feat: 支持`DdlApplicationRunner`参数配置(脚本错误处理,自定义`ScriptRunner`,多处理器执行异常是否中断)
- feat: 支持`BaseMultiTableInnerInterceptor`指定追加条件模式 (默认条件追加至末尾,仅作用于`select`,`delete`,`update`)
- feat: 支持生成器`Entity`指定`serialVersionUID`添加`@Serial`注解
- feat: 支持生成器`Entity`注解(字段,类注解)自定义处理
- feat: 支持生成器`Entity`导包自定义处理
- feat: 支持`崖山`数据库
- feat: 支持`Hive2`分页
- feat: 升级`Gradle`至8.10
- feat: 支持`DdlHelper`执行自定义异常处理
- opt: 调整`DynamicTableNameInnerInterceptor`表处理逻辑并保证`hook`运行
- opt: 调整`DdlScript`类方法实现(分离DDL版本记录,优化执行方法)
- opt: 调整`DbType#GAUSS`数据库名为`gauss`
- opt: 调整`JsqlParserGlobal`解析线程池指定
- opt: 移除过时的`FieldStrategy.IGNORED`
- opt: 移除过时的`GlobalConfig.DbConfig#selectStrategy`
- opt: 移除过时的`MybatisSqlSessionFactoryBean#typeEnumsPackage`
- opt: 优化`DdlHelper`资源加载(不再依赖`Spring`或者其他实现)
- opt: 去除`DdlHelper`中`getScriptRunner`方法指定的字符集编码
- doc: 修正`DdlHelper`中注释错误

由于`jsqlParser`5.0版本与5.1版本升级不兼容性不是很大，计划后期移除`mybatis-plus-jsqlparser-5.0`支持模块。
  多版本支持相对来说比较麻烦，后期只维护`mybatis-plus-jsqlparser-4.9` 与 `mybatis-plus-jsqlparser`(保持最新版跟进,直到再提升jdk)


## [v3.5.10.1] 2025.01.13

- fix: 修复动态节点处理错误

## [v3.5.10] 2025.01.12
- fix: 修复字段有`TableField`注解但未指定`value`值下全局`columnFormat`未生效问题
- fix: 修复enjoy模板生成kotlin代码报错
- fix: 修复enjoy模板生成字符串代码报错
- fix: 修复springdoc生成注解未转义双引号
- fix: 修复数据变动插件更新无主键报错
- fix: 修复多表解析processJoins解析表出现越界
- feat: TableName注解新增`properties`属性
- feat: 支持@InterceptorIgnore注解在default方法上
- feat: 适配jsqlparser5.1版本(5.0兼容版本请使用`mybatis-plus-jsqlparser-5.0`)
- feat: 提供`InterceptorIgnoreHelper.execute`模板执行方法处理插件跳过策略(防止手动使用handle方法出现未清理线程资源造成的错误)
- feat: 代码生成器全局package配置属性支持自定义模板信息获取
- feat: 代码生成器新增表索引信息获取
- feat: 代码生成器提供`Mapper.Builder.generateMapperMethodHandler`处理器基于索引生成索引方法
- feat: 代码生成器Entity支持自定义Class注解和字段注解生成
- feat: 代码生成器Entity支持lombok模式指定生成类注解
- feat: 代码生成器Entity支持ToString`(Entity.Builder.toString(boolean))`方法控制生成 (默认生成,lombok模式下将会生成@ToString,低版本下lombok不生成,属于不兼容改动)
- feat: 代码生成器Entity支持字段文档注释(`Entity.Builder.fieldUseJavaDoc(boolean)`)控制生成 (默认生成,低版本下,使用swagger或springdoc不会生成字段文档注释,属于不兼容改动)
- feat: 重写动态语句生成(生成执行SQL将不再包含\n换行符)
- feat: 安全加密处理器密钥获取支持环境变量与系统属性传入
- feat: 升级mybatis至3.5.19
- feat: 升级springboot至3.4.1
- feat: 升级kotlin至2.1.0
- 实用性低,检查语法不完善,计划移除IllegalSQLInnerInterceptor插件
- 功能缺陷较多,计划移除DataChangeRecorderInnerInterceptor插件

## [v3.5.9] 2024.10.23
- opt: 优化代码生成器支持可视化配置生成能力
- opt: 解耦扩展包不再强制依赖 spring 开发框架
- opt: 拆分jsqlparser支持模块,提供mybatis-plus-jsqlparser(支持最新jsqlparser)与mybatis-plus-jsqlparser-4.9模块, 默认不携带,升级后需要自行引入.
- feat: 重构 service 模块抽象为 CrudRepository 不再建议使用 IService 避免业务层数据混乱
- feat: 新增 solon 启动插件支持
- feat: 升级SpringBoot3.3.4
- feat: 升级velocity2.4

## [v3.5.8] 2024.09.18
- fix: 解决optimizeJoinOfCountSql反序列化不支持问题
- fix: 解决Db工具类批量操作使用rewriteBatchedStatements=true返回值不准确
- fix: 修复逻辑删除填充与乐观锁冲突
- fix: 修复IllegalSQLInnerInterceptor分析嵌套count语句错误
- fix: 升级jsqlParser5.0 解决 for update 语句错误
- fix: 修复处自增自减负数情况导致jsqlParser解析优化错误
- fix: 修复removeMapper缓存清理不完全
- fix: 修复SqlServerQuery查询表注释乱码
- opt: 完善函数注入校验逻辑
- opt: Page属性访问调整为private,重写toString方法
- opt: 主键生成策略(uuid)不支持的类型打印警告日志
- opt: MybatisPlusException转化为PersistenceException子类
- feat: 增加deleteByIds空集合处理
- feat: 重命名selectBatchIds方法为selectByIds
- feat: 支持tableName与schema属性占位符配
- feat: 代码生成器增加对虚拟列的属性获取
- feat: chain wrapper to lambda chain wrapper #6314
- feat: 代码生成器增加手动指定数据库驱动兼容不能自动注册的驱动实现
- feat: 升级kotlin2.0.0
- feat: 升级SpringBoot3.3.2
- feat: 升级fastjson2.0.52
- feat: 升级mybatis-spring3.0.4
- feat: 升级spring-cloud-commons4.1.4
- feat: 部分支持依赖升级更新
- feat: 支持GoldenDB数据库
- feat: 支持Duckdb数据库
- feat: 支持Derby数据库
- feat: 支持Vastbase数据库

## [v3.5.7] 2024.06.10
- fix: 修复动态表名处理 update ignore 错误
- fix: 修复SQLServer2005分页处理空格错误
- fix: 修复多租户查询出现问题
- fix: 修正非通用泛型情况下序列化json减少强转
- fix: 修复代码生成器禁用模板失效
- fix: 修复分页count优化distinct搭配orderBy处理错误
- fix: 修复达梦数据库生成代码错误
- fix: 修复租户插件特殊exists语句会失效
- fix: 修复sqlite数据库ddl_history错误导致无法创建表
- fix: 修复DataChangeRecorderInnerInterceptor在Insert时配置忽略无效
- fix: 修复代码生成器处理不标准的JdbcType导致空指针错误
- feat: BaseMapper新增批量操作与InsertOrUpdate方法
- feat: BaseMapper新增批量操作方法返回值List<BatchResult>
- feat: BaseMapper方法逻辑删除默认支持填充
- feat: 调整Service层逻辑删除填充逻辑处理
- feat: 重构批量删除参数填充处理逻辑.
- feat: 自增自减处理BigDecimal
- feat: 新增雪花ID配置（支持手动分配workerId与datacenterId或指定网卡信息自动获取方式）
- feat: 重构ServiceImpl泛型参数提取
- feat: 修改AES密钥随机性生成
- feat: UpdateWrapper增加checkSqlInjection方法
- feat: 调整DDL脚本自动装配逻辑(当无实现时或无mybatis-plus-extension模块时不注入DDL运行bean)
- feat: 注入方法deleteBatchIds重命名deleteByIds
- feat: SpringBoot升级至2.7.18和3.2.6
- feat: 升级kotlin至1.9.24
- feat: 升级lombok至1.18.32

## [v3.5.6] 2024.04.08
- fix: 修复通用Service多层代理引发的错误
- fix: 修复Json类型处理器反序列化泛型丢失原始类型
- fix: 修复填充器处理器基本类型数组出现强制错误
- fix: 修复上版本移除掉Page方法保留至PageDto类之中
- fix: 修复IllegalSQLInnerInterceptor未处理Parenthesis
- fix: 修复IllegalSQLInnerInterceptor表名或字段名包裹导致无法获取索引信息和索引字段校验问题
- fix: 修复KtUpdateChainWrapper调用setSql的时候params没有展开
- fix: 修复useGeneratedShortKey配置失效
- fix: 修复DataChangeRecorderInnerInterceptor一系列问题
- feat: 去除sqlFirst与sqlComment转义(如有需要转义操作,请手动调用转义后传入)
- feat: ServiceImpl修改为抽象类,防止错误直接实例化
- feat: 重构代码生成器TemplateConfig配置,模板禁用与路径配置更改至对应具体实现之上
- feat: 支持组合注解
- feat: 新增 LambdaUpdateWrapper 字段自增 setIncrBy 自减 setDecrBy 方法
- feat: 获取注入方法时传递org.apache.ibatis.session.Configuration
- feat: 新增自增主键兼容配置开关(mybatis-plus.global-config.db-config.insert-ignore-auto-increment-column 默认false,开启INSERT语句无视主键字段生成)
- feat: 新增参数填充器跳过方式(基于MappedStatement#id)
- feat: 新增SQLite的DDL自动维护功
- feat: 新增eqSql方法
- feat: 新增SQL解析线程池
- feat: 增加雪花ID生成器初始化日志打印(默认超过5秒打印警告日志)
- feat: 升级mybatis至3.5.16
- feat: 升级spring-cloud-commons
- feat: 升级jsqlparser至4.9
- test: Github增加CI
- doc: 增加update(Wrapper)相关api无法自动填充注释

## [v3.5.5] 2023.12.24
- fix: 修复配置databaseId失效
- fix: 修复自增主键忽略注入错误忽略非自增主键注入问题
- fix: 修复ChainWrapper模式下GroupBy生成多的逗
- fix: 修复selectOne缓存问题
- fix: 修复数据权限多表支持在某些场景下失效问题
- fix: 修复生成器mysql类型转换器point转换错误
- fix: 修复kotlin下无法使用父类属性操作
- fix: 修复自动注入DdlApplicationRunner返回null导致的高版本springboot启动错误
- fix: 修复生成器代码提示的RuntimeUtils安全性漏洞问题
- feat: 新增fastjson2支持
- feat: 升级gradle-wrapper至8.4
- feat: 升级kotlin-gradle-plugin至1.9.21
- feat: 升级mybatis至3.5.15
- feat: 升级lombok至1.18.30
- feat: 升级spring-boot3至3.2.0
- feat: 升级spring-boot2版本mybatis-spring至2.1.2
- feat: 升级spring-boot3版本mybatis-spring至3.0.3
- feat: 移除通用service中saveOrUpdate的事务
- feat: 支持Trino,Presto,GBase8s-pg,SUNDB数据库

## [v3.5.4.1] 2023.11.4
- fix: 修复Aop增强Mapper层导致的转换错误.

## [v3.5.4] 2023.10.22

- fix: 修复Insert无字段时执行SQL报错.
- fix: 修复高版本JDK下lambda无法执行IDEA调试.
- fix: 修复LambdaQuery中select,groupBy,orderBy,orderByAsc,orderByDesc提示的警告,新增对应doXxx方法支持重写(不兼容改动,api方法做了final处理).
- fix: 修复inject-sql-session-on-mapper-scan无配置提示.
- fix: 修复@OrderBy搭配@TableId排序字段错误(不兼容改动,com.baomidou.mybatisplus.core.metadata.TableInfo.orderByFields调整了类型).
- fix: 修复Service中根据主键逻辑删除时类型不匹配导致的错误.
- fix: 修复分页插件Count与自定义ResultHandler冲突.
- fix: 修复字段填充处理器可能会出现重入问题
- feat: 新增自增主键字段是否允许插入控制,可使用方法注入覆盖Insert(boolean ignoreAutoIncrementColumn)或Insert(String name, boolean ignoreAutoIncrementColumn)控制自增主键是否支持写入行为.
- feat: ActiveRecord模式下deleteById(逻辑删除)方法支持自动填充功能.
- feat: 内置泛型提取,支持非Spring体系项目使用.
- feat: BaseMapper新增update(wrapper)更新方法.
- feat: BaseMapper新增流式查询方法对大数据查询支持.
- feat: 代码生成器元数据信息公开tableName与columnName字段访问.
- feat: 新增mybatis-plus-spring-boot3-starter与mybatis-plus-spring-boot3-starter-test支持SpringBoot3.
- feat: 支持插件缺省注入,当无MybatisPlusInterceptor注入时,支持com.baomidou.mybatisplus.extension.plugins.inner.InnerInterceptor自动注入.
- feat: 升级源码Jdk开发版本至Java21.
- feat: 升级gradle-wrapper至8.4-rc-1.
- feat: 升级kotlin-gradle-plugin至1.9.20-Beta.
- feat: 升级SpringBoot2.x版本至2.7.15.
- feat: 升级lombok至1.18.30.
- opt: mybatis-plus-extension中mybatis-spring依赖修改为可选依赖(不兼容改动,如果项目在非spring或非springBoot下使用到了请手动添加依赖).
- opt: spring-boot-starter减少无用的配置提示(不兼容改动,调整了com.baomidou.mybatisplus.autoconfigure.MybatisPlusProperties.configuration类型).
- opt: 字段填充处理器提取去除固定参数提取,支持更宽松的mapper方法参数提取填充处理,
- opt: 去除com.baomidou.mybatisplus.core.toolkit.ReflectionKit.setAccessible方法调用,防止高版本Jdk移除
- opt: 调整selectOne方法(配合流式处理,最多提取两行数据,日志不再打印总记录数).
- opt: 优化selectObjs方法返回值,减少类型强制转换.
- opt: 通用Service支持多SqlSessionFactory注入.
- opt: 优化TableInfo.newInstance创建实例方法.
- opt: 去除多余的@SuppressWarnings("serial")


## [v3.5.3.2] 2023.08.08

- feat: 升级mybatis至3.5.13,mybatis-spring至2.1.1
- feat: jsqlparser提供统一解析类,可配置解析函数,并加入缓存选项
- feat: 增加Sequence初始化debug日志
- feat: 参数填充器支持多参数填充
- feat: BaseMapper新增selectMaps(page, wrapper)与selectList(page, wrapper)方法
- feat: 乐观锁字段支持 java.time.Instant
- feat: `wrapper#apply`支持配置`mapping`比如`column={0,javaType=int,jdbcType=NUMERIC,typeHandler=xxx.xxx.MyTypeHandler}`
- feat: 调整 QueryWrapper 需要主动开启检查 SQL 注入过滤（移除掉wrapper的orderby的sql过滤功能）
- feat: 新增星瑞格数据库支持
- feat: `updateWrapper#setSql`方法支持`动态入参`参考`wrapper#apply`方法
- feat: 自动 SQL 维护 DDL 支持 SQL 执行存储过程
- perf: `ktWrapper`加强泛型限制
- fix: 修复在选择springdoc文档注释时entity描述异常
- fix: 在主键的`IdType`为`AUTO`的情况下,`Table#getAllInsertSqlColumnMaybeIf("xx.")`所生成sql错误问题
- fix: 租户插件支持`update set subSelect`的情况
- fix: 修复高版本Jdk提示非法反射警告(Illegal reflective access by com.baomidou.mybatisplus.core.toolkit.SetAccessibleAction)
- fix: 修复高版本Jdk插件动态代理反射错误 (Unable to make field protected java.lang.reflect.InvocationHandler java.lang.reflect.Proxy.h accessible)
- fix: 修复路径替换将原有的“.”替换成了文件分隔符“/”
- fix: 修复Beetl模板引擎无法生成注释
- fix: 修复Types.DOUBLE类型无法映射
- fix: 修复转换父类公共字段报错
- fix: 修复生成器无法通过cfg.取值
- fix: 修复单元测试下MockBean时事务回滚失败
- fix: 修复Warpper类nonEmptyOfWhere方法命名不规范,导致Ognl未正确缓存带来的执行开销
- fix: ClickHouseQuery类的tableComment()方法返回表注释字段为comment
- fix: 修复在选择springdoc文档注释时entity描述异常问题
- fix: Table\#getAllInsertSqlColumnMaybeIf("xx.")下的sql生成错误问题
- fix: Db类增加根据实体不为空的字段条件查询方法重载
- fix: 生成器对于Kotlin的Entity文件的superEntityClass的错误
- fix: 修复springdoc freemarker模式下 表注释取值取不到
- opt: 增强参数填充处理器,防止因参数名称与填充名称一致类型不匹配导致转换错误
- opt: 优化方法注入,去除SelectPage,SelectMapsPage,SelectByMap,DeleteByMap注入
- opt: 减少MappedStatement堆内存占用
- opt: 解决PluginUtils重复获取元数据带来的性能消耗
- opt: 注入方法去除多余的换行符
- opt: 去除SqlRunner持有的sqlSessionFactory变量
- opt: 解决Sequence初始化多次问题(自定义情况下可不创建默认主键生成器)
- opt: 优化 SqlHelper#getMapper 返回泛型
- opt: 去除SqlRunner持有的sqlSessionFactory变量
- docs: 修正DdlHelper注释错误


## [v3.5.3.1] 2022.12.29

- bug:生成模块pg和dm语句模式名增加
- feat: 优化 ChainWrapper#getEntityClass
- fix: 修复在 IService.lambdaQuery().one() 使用场景在数据库无数据时报错问题
- est 以及租户插件解析sql遇到多表必须给表起别名


## [v3.5.3] 2022.12.28

- 多租户插件:多表join表名必需起别名,否则追加的过滤条件不带前缀
- InterceptorIgnore 不能过滤 selectKey 的问题
- 分页新增`informix数据库`支持
- 分页新增`优炫数据库`支持
- 分页新增`TDengine数据库`支持
- 分页新增`亚马逊redshift数据库`支持
- 支持spring-boot 2.7以上版本
- 雪花id新增反解时间戳方法`Sequence#parseIdTimestamp`
- BaseMapper.selectCount生成语句加入中`AS total`
- 修复IllegalSQLInnerInterceptor类ClassCastException异常，并优化日志
- 移除注解`OrderBy`的过时属性`isDesc`
- 移除`TableInfo`过时方法
- 加入`JoinTableInfoInitHandler`类参与`TableInfo`初始化
- 修复StringUtils.sqlInjectionReplaceBlank方法过滤sql不全，可能会导致sql注入的情况
- 增加IService.lambdaQuery(entity)支持，写法更便捷
- 新增数据变更记录（数据审计）插件`DataChangeRecorderInnerInterceptor`
- 新增查询条件方法 notLikeLeft 和 notLikeRight
- 数据权限多表解析部分处理优化
- 允许子类重写 orderBy 基础方法 gitee issues/I61F51
- 新增Db类，调整 SimpleQuery 类
- 新增脚本自动维护功能
- 新增支持手动拦截器忽略策略，例如 `InterceptorIgnoreHelper.handle(IgnoreStrategy.builder().tenantLine(true).build());`
- 支持 PG 数据字段大写 ID 自增 fixed issues/I4T0YJ
- 代码生成器重构完成，合并回 MP 核心代码库
- 代码生成器增加是否生成service接口的开关


## [v3.5.2] 2022.06.01

- 升级 mybatis 3.5.10
- 升级 jsqlparser 4.4
- 添加 vertical 数据库分页支持
- 添加对Gbase 8s 数据库支持
- 添加对 行云 数据库分页的支持
- 添加对 Firebird 数据库分页的支持
- 修复参数填充判断错误，标记替换字段常量
- DbType 清理以及 IDialect 实现类的清理
- 新增SqlHelper.execute，通过entityClass获取BaseMapper
- 枚举处理优化,不再需要'typeEnumsPackage'这个配置
- fix 租户id获取的执行顺序
- 新增Firebird数据库的KeyGenerator
- 新增达梦Dm数据库的KeyGenerator
- Merge pull request #4343 from LK820/fix-IdType.java
- Merge pull request #4495 from nieqiurong/fix-parameter
- Merge pull request #4314 from tomalloc/3.0


## [v3.5.1] 2022.01.25

- 新增 impala 数据库支~~持
- 缓存动态获取数据库类型~~
- 新增可控分配 id 方法 fixed github pull/4231
- 延迟枚举扫描注册
- 乐观锁插件支持根据wrapper填充 github pull/3664
- H2KeyGenerator 语法修改
- SimpleQuery 优化及Bug修改
- fixed gitee issues/I4P9EN
- SybaseDialect 关键词替换优化


## [v3.5.0] 2022.01.01

- 升级 mybatis 3.5.9
- 升级 jsqlparser 4.3
- 新增移除 Mapper 相关缓存，支持 GroovyClassLoader 动态注入 Mapper
- 添加动态表名的钩子函数 https://github.com/baomidou/mybatis-plus/pull/3965
- 注入类 DefaultSqlInjector 优化调整
- 反射类 ReflectionKit 优化 field -> field 改为 Function.identity()
- baseMapper 新增方法 exist 方法
- 解决 sysbase 小写 from 导致 index 取不到正确的索引值问题
- 新增通过 entityClass 获取 Mapper 方法 `BaseMapper<Entity> mapper = SqlHelper.getMapper(Entity.class);`
- 注入方法 byId 注入优化
- 多租户 right join bug https://gitee.com/baomidou/mybatis-plus/issues/I4FP6E  https://github.com/baomidou/mybatis-plus/pull/4035
- 自定义注入方法名优化 https://github.com/baomidou/mybatis-plus/pull/4159
- 新增 sap hana 内存数据库
- 新增 SimpleQuery 工具栏查询
- SQL 注入验证工具类 代码修改写法
- 整理字符串常量的使用
- upgrade license-gradle-plugin version
- 自定义注入方法名优化 (不兼容)
- 重载columnsToString方法允许子类调整
- 修复 et 判断逻辑 fixed gitee issues/I4L4XV
- 逻辑删除 byId 支持转换为实体删除填充



## [v3.4.3.4] 2021.09.22

- order by wrapper 存在条件不排序问题处理
- 解决引入 cloud InetUtils 类编译错误
- 升级 sql 解析依赖 jsqlparser 版本 4.2
- fix: 修复 JDK16 中增加模块化校验后，导致 lambda 序列化失败问题
- fix: java 17 的支持 #I4A7I5
- bug: fix left join 条件构造会多一个的问题
- fix: 当逻辑删除字段默认值为null时，阻止全表更新插件失效
- 分页 count(*) as total
- 允许注入自定义事务工厂 TransactionFactory


## [v3.4.3.3] 2021.09.05

- 移除不在实用类 ISqlParserFilter AbstractJsqlParser 需要使用从旧版本复制
- 移除全局配置workerId，datacenterId参数，推荐直接初始化identifierGenerator
- count 方法 Integer 修改为 Long 涉及升级成本【注意】，对于涉及缺陷调整给您造成困扰表示抱歉
- 修复主键 @0rderby 注解 bug
- 修复 String 主键删除失败
- 主键类型增加 BigDecimal BigInteger 支持
- 隔离 spring 框架强依赖，非 spring 框架用 mp 注入 GenericTypeUtils.setGenericTypeResolver


## [v3.4.3.2] 2021.08.21

- 增加 goldilocks 数据库 csiidb 数据库 的支持
- 增加对南大通用GBase 8s数据库的支持（GBASEDBT)，区别于原有定义（GBASE)
- 优化 selectOne 查询方式，精简 SQL 注入
- PropertyMapper.whenNotBlack to whenNotBlank
- BaseMapper新增deleteById(T entity)方法
- jsqlparser 版本 4.0 升级 4.1
- TableInfo新增原生Reflector反射操作.
- 解决 lambda 构造器在 JDK16 中无法运行的问题
- wrapper clear 将sqlSegment重置为空串 缓存标志重置为true
- 注入器调整无主键不注入ById方法
- 自动构建 resultMap 处理主键获取真正的字段名
- Wrapper optimized: 优化警告
- Wrapper 新增 gtSql geSql ltSql leSql 方法
- 新增对CUBRID数据库的支持
- fix github pull/3557 乐观锁新增版本号 null 自定义异常，租户插入忽略逻辑允许自定义
- fix github issues/2931 解决结果集大于 Integer 异常问题
- fix github issues/3652 k8s 网络获取失败问题
- fix gitee issues/I3Z2RG 优化 Order By SQL 注入识别率
- fix gitee issues/3826 优化动态表名处理器
- fix gitee issues/I3UQH5 修复注解@OrderBy，使用limit 异常
- fix github issues/3768 mysql 批量自增 bug
- 修复自动构建resultMap时主键字段映射错误&OrderBySegmentList懒加载执行
- 源代码升级相关测试依赖，构建环境 gradle 升级为 7.1 新增更多测试用例


## [v3.4.3.1] 2021.06.15

- 支持多重继承获取泛型
- 应要求 pageDto 修改为 PageDTO
- 分页排序优化
- TableField 新增 ResultMapping#property 注解支持
- fixed github pull/3550 优化排序
- fix #I3T0LA
- 开放KtUpdateChainWrapper、KtQueryChainWrapper的继承
- 新增 exists 方法判断 count 存在
- 优化数据方言获取方式减少对象创建
- feat GlobalConfig增加whereStrategy属性和适配selectStrategy的getWhereStrategy()方法
- 扩展 p6spy 优化
- fix github#3390 SqlRunner.selectPage()方法未释放连接克隆
- 优化 JDK 默认不推荐泛型数组
- perf: 替换为 JVM 中本身的方法
- 当用户指定ID时，不用自动生成，不指定时自增
- Github Merge pull request #3549 #3555 #3565 #3571 #3587 #3591 #3592 #3595 #3599 #3605 #3606
- 提供处理Map多key取值工具方法
- 调整 page 注解泛型 E 为 P 方便阅读
- Pattern定义为静态常量，优化正则匹配速度
- Fix 主键添加@OrderBy无效
- 去除addMappedStatement日志打印
- NoKeyGenerator Jdbc3KeyGenerator shared instance

## [v3.4.3] 2021.05.21

- 增加瀚高数据库支持
- 增加注解 Order By 支持默认排序
- Wrapper exists notExists orderBy groupBy 支持参数绑定
- Wrapper 支持 setParamAlias 其它优化
- 优化 KeyGenerator 支持多实现多数据源注入
- 增强 ServiceImpl 泛型推断，解决多继承与代理问题
- 新增 PageDto 用于微服务对象传输序列化
- 新增 Page 提供静态 of 构造方式
- 增加代理 MethodHandleProxies 对 lambda 调试支持
- 调整 ActiveRecord 日志对象初始化
- 调整 ActiveRecord 模式 Model 类开发 pkVal 方法外部可用
- 删除标记过时代码
- 优化枚举值获取方式
- 分页 count 安全处理
- Sequence 方法支持重写支持
- 升级 Mybatis 3.5.7
- 修复自动配置 lazy-initialization 无属性提示
- 修复 mysql on duplicate key update 字段名判断为表名问题
- 修复 lambda 条件 npe 异常
- 重构 lambda 信息提取方法
- 获取 lambda 信息不在序列化
- 合并 gitee pulls/ 141
- fixed github issues/3208 3016
- fixed github issues/3482 数据权限处理器支持 union all
- 调整事务未启用打印提示信息
- 单元测试优化相关依赖升级

## [v3.4.2] 2021.01.15

- fix: 移除 BlockAttackInnerInterceptor 内引用的 commons 的 utils
- feat: PaginationInnerInterceptor 添加 optimizeJoin 属性控制是否在count时对sql的join进行优化
- feat: 可通过Resources.setDefaultClassLoader设置默认类加载器.
- feat: InterceptorIgnore 注解新增 others 属性
- feat: IService 增加 kotlin 链式调用支持(ktQuery() 和 ktUpdate())
- style: jsqlparser up to 4.0
- style: 移除 com.baomidou.mybatisplus.extension.injector.methods.additional 包下的过时类
- style: generator 模块另开仓库 [generator](https://github.com/baomidou/generator)

## [v3.4.1] 2020.11.10

- fix: 新多租户插件完善子查询,支持 比较符号,in,EXISTS,NOT EXISTS
- feat: 公开 AbstractWrapper.getEntityClass
- feat: 新增 FakeTenantLineInnerInterceptor 对 TenantSqlParser 进行过度
- feat: 分页count识别 `left join (subSelect)` 优化
- feat: 所有 count 从 count(1) 变更为 count(*)
- style: mybatis up to 3.5.6

## [v3.4.0] 2020.8.23
- fix: @TableName.autoResultMap=true 情况下, 内置的 selectBody 将不会进行 as ,使用了的需要注意!!!
- feat: 新增 mybatis-plus-boot-starter-test 模块
- fix: MetaObjectHandler 重载错误(解决办法是参数位置对调),填充值在泛型上支持字段类型的子类
- feat: mybatis up to 3.5.5, mybatis-spring up to 2.0.5
- feat: jsqlparser up to 3.2
- feat: 新增 MybatisParameterHandler, 废弃 MybatisDefaultParameterHandler
- feat: 分页插件加入 GBase,ClickHouse,oscar,OceanBase 数据库连接自动识别的支持
- feat: Wrapper 新增api not(boolean condition, Consumer consumer)
- feat: 新增 MybatisPlusInterceptor 解决 多租户和分页 插件一级和二级缓存不正确问题
- feat: 新分页插件优化 size<0 时继续拼接 orderBy
- feat: 新增 IdentifierGenerator 一个实现类 ImadcnIdentifierGenerator
- fix: chainWrapper#func 强转异常
- fix(mybatis-plus-generator.main): 重构生成器数据库类型转换器，修复部分支条，提交选择器测试
- fix: 修复复杂情况中动态表名替换产生的问题：正则由空白检测转为单词边界检测
- refactor: 重构动态表名解析器，去除正则替换程序，改为按表名位置进行替换
- refactor: 将表名解析重构为访问者模式，现在不会对原有 SQL 做改动


## [v3.3.2] 2020.5.26
- 分页参数提取,单元测试用例修复
- 达梦数据库代码生成器表过滤支持
- 微软数据库代码生成器表过滤支持
- 修复代码生成器属性字段规则错误
- SelectById 支持自定义方法名
- 修复分页插件获取数据库类型问题
- Json转换器空值处理
- bugfix(mybatis-plus-generator):SQL类型返回错误问题
- 调整未知方言异常,自动识别url转换小写匹配.
- fix: 初始化 TableInfo 中遇到多个字段有 @TableId 注解时未能抛出异常的问题
- SuperController有Class参数的set方法
- 增加方法StrategyConfig.setSuperServiceImplClass(java.lang.Class<?>).
- 代码生成器命名策略调整.
- 扩展分页缓存key值计算.
- 去除方法推测,直接访问属性字段.
- 修正枚举处理器类型不匹配比较.
- 修改表前缀匹配方式
- 修改在Mybatis全局配置文件中设置分页插件参数不生效问题
- 修复PR未指定解析器的时候引发空指针
- 增加分页插件limit参数配置
- 修复指定superEntityClass重复生成父类字段问题
- 无主键的情况无需导入IdType与TableId包
- 调整生成BaseResultMap格式
- 支持lombok模式下选择是否进行链式set生成
- 修复解析器for update错误
- 过滤PG约束列(只留下主键约束)
- 增加生成器禁用模板生成
- fix(kotlin): 修复动态表名 BUG，最大努力替换表名
- 修复PG约束生成重复属性字段问题
- fix(kotlin): 将 LambdaUtils 中缓存的 key 改为 String
- 代码生成器增加数据库关键字处理接口
- fix github/issues/2454 支持注解可继承
- 新增 AES 加密数据库用户名密码
- 优化方法入参泛型，支持更多类型
- 修复代码生成器开启移除is前缀生成实体缺少包导入
- fixed github issues/2470


## [v3.3.1] 2020.1.17
- 新增`TableName`注解属性`excludeProperty`支持排除字段
- 新增ServiceImpl#entityClass属性，减少泛型提取
- 新增phoenix支持
- 新增支持hbase的选装件`Upsert`
- 新增生成器策略配置enableSqlFilter属性来控制是否启用SQL过滤表支持
- 新增批量执行方法，方便用户自定义批量执行操作
- `Wrapper`支持`clear`清空
- `Wrapper`子类新增`func`方法,主要为了支持在`if else`情况下使用`Wrapper`的不同method不会导致断链(链式调用不能一链到底)
- `BaseMapper`部分入参为`Wrapper`的select方法支持`wrapper.first`来设置RDS的hint
- `KtUpdateWrapper#set`支持value为null
- 支持泛型主键支持
- 优化分页拦截器数据类型与方言实现类配置
- 二级缓存复用count查询缓存
- `IService`部分method调整为default方法
- 二级缓存兼容json序列化情况（主要出现默认缓存count出现long反序列化回来为int的情况）
- 处理批量操作嵌套事物问题（二级缓存更新问题）
- 修复启用乐观锁下updateById时自动填充不生效的问题
- 修复自动填充接口的default方法(`setFieldValByName`和`getFieldValByName`)某些情况下会发生异常的问题
- 修复`KtWrapper`嵌套函数问题
- 修复Freemarker生成Kotlin类的常量错误
- 修复StringUtils#guessGetterName错误
- 修复SerializationUtils资源未释放问题

## [v3.3.0] 2019.12.06
- BaseMapper 接口两个 page 方法优化
- IService 以及 ServiceImpl 对应 page 方法优化,个别返回 collection 的方法修改为返回 list
- 逻辑删除字段的两个表示已删除和未删除的定义支持字符串 `"null"`
- 修复批量操作未清空缓存
- 批量操作异常转换为DataAccessException
- mybatis up 3.5.3, mybatis-spring up 2.0.3, jsqlparser up 3.1
- mapper 选装件包调整, chainWrapper 包调整
- 新增 ChainWrappers 工具类
- 新增 IdentifierGenerator 接口,支持自定义Id生成
- 代码生成工具废弃正则表名匹配,新增likeTable与notLikeTable
- 分页插件支持自定义处理页数限制与溢出总页数处理
- 修复SqlExplainInterceptor导致的Oracle序列自增两次
- 分页二级缓存支持
- 扩展p6spy日志打印
- DbConfig加入新属性propertyFormat,TableFieldInfo移除属性related
- 优化序列生成器,过时KeySequence的clazz属性
- 修复Ognl表达式关键字导致的null值判断失效
- 修复更新填充开关失效
- 优化填充逻辑
- ISqlRunner支持selectPage
- 支持全局逻辑删除字段
- BaseMapper的方法可自定义
- 添加【虚谷】【Oracle12c】【Kingbase】数据库支持
- 解决数据库字段与实体字段名称不同时出现`null as xxx`的情况
- 过时ID_WORKER_STR,自动识别主键类型
- 配置开启注解，TableName也强制生成

## [v3.2.0] 2019.08.26
- 代码生成器添加达梦数据库支持
- 修复多主键查询表字段SQL的Bug
- 新增 updateWrapper 尝试更新，否继续执行saveOrUpdate(T)方法
- 代码生成器 pg 增加 numeric instant 类型支持
- 修复InjectionConfig不存在时无法生成代码的问题
- fix: #1386(github) 逻辑删除字段为Date类型并且非删除数据日期为null
- 升级依赖 mybatis 版本为 3.5.2
- 升级依赖 jsqlparser 版本为 2.1
- 应 EasyScheduler 计划提交 Apache 孵化请求移除 996NPL 协议限制
- 调整 SQL 移除 SET 部分 Github/1460
- 移除 SqlMethod 枚举 UPDATE_ALL_COLUMN_BY_ID 属性，推荐使用 AlwaysUpdateSomeColumnById 套
- fix: #1412(github) github:mybatis-plus-generator can't support oracle
- fix: github 1380
- 移除全局配置的 dbType 和 columnLike
- 移除 fieldStrategy, 使用上个版本新增的三个替代
- 移除 PerformanceInterceptor 相关, 建议使用 p6spy
- 移除 el 拆分为 jdbcType typeHandler 等具体属性
- 升级 gradle-5.5.1,lombok-1.18.4
- 当selectStatement.getSelectBody()的类型为SetOperationList
- 移除 GlobalConfig#sqlParserCache 属性,移除 LogicSqlInjector, OrderItem 新增2个快捷生成的method, page 新增一个入参是 List<OrderItem> 的 addOrder method
- Nested 接口个别入参是 `Function<Param, Param> func` 的method,入参更改为 `Consumer<Param> consumer`,不影响规范的使用
- fixed gitee/I10XWC 允许根据 TableField 信息判断自定义类型
- Merge pull request #1445 from kana112233/3.0
- 支持过滤父类属性功能
- 添加批量异常捕获测试
- 多租户ID 值表达式，支持多个 ID 条件查询
- 扩展新增 json 类型处理器 jackson fastjson 两种实现


## [v3.1.2] 2019.06.26
- EnumTypeHandler 更名为 MybatisEnumTypeHandler,移除 EnumAnnotationTypeHandler
- 新增自动构建 resultMap 功能,去除转义符
- 注解增加变量控制是否自动生成resultmap
- 修改分页缓存Key值错误
- TableField.el 属性标记过时
- 取消 MybatisMapWrapperFactory 的自动注册
- starter 增加默认xml路径扫描
- 新增 MybatisPlusPropertiesCustomizer 及配置使用
- ConfigurationCustomizer 内部方法入参更新为 MybatisConfiguration
- 原有 fieldStrategy 标记过时,新增 3 种 fieldStrategy 进行区分
- 获取注入方法时传递当前mapperClass
- 增加sqlite代码自动生成测试代码及测试用的数据库文件
- JsqlParserCountOptimize 对 left join 的 sql 优化 count 更精确
- fix(AbstractWrapper.java): 修复 lambda 表达式在 order、groupBy 只有条件一个时引起的类型推断错误
- apply plugin: 'kotlin'
- refactor(order): 修复排序字段优先级问题(#IX1QO)
- 启动就缓存 lambdacache
- Merge pull request #1213 from sandynz/feature/sqlComment 支持SQL注释
- 去除 wrapper 的一些变量,wrapper 内部 string 传递优化
- fix: #1160(github) 分页组件orderBy: 同时存在group by 和order by，且IPage 参数中存在排序属性时，拼接
- Merge pull request #1253 from ShammgodYoung/patch-1 代码生成器输入表名忽略大小写
- 新增渲染对象 MAP 信息预处理注入
- 修改 dts rabbitAdmin bean 判断方式
- Merge pull request #1255 from ShammgodYoung/patch-2 对serialVersionUID属性进行缩进
- JsqlParserCountOptimize 加入 boolean 字段,判断是否优化 join
- Merge pull request #1256 from baomidou/master Master
- freemarker entity 模板缩进调整
- 增加jdbcType,typeHandler属性, 合并el属性


## [v3.1.1] 2019.04.25
- 新增 996icu license 协议
- 新增 mybatis-plus-dts 分布式事务 rabbit 可靠消息机制
- 新增 DynamicTableNameParser 解析器、支持动态表名
- 优化 getOne 日志打印
- sql 优化跳过存储过程
- 优化分页查询(count为0不继续查询)
- 修复分页一级缓存无法继续翻页问题
- MybatisMapWrapperFactory 自动注入
- 支持纯注解下使用 IPage 的子类作为返回值
- 逻辑删除不再需要 LogicInject
- GlobalConfig 加入 enableSqlRunner 属性控制是否注入 SqlRunner ,默认 false
- SqlParser注解不再需要全局设置参数才会缓存,以及支持注解在 mapper 上
- GlobalConfig 的 sqlParserCache 设置为过时
- mybatis 升级到 3.5.1 , mybatis-spring 升级到 2.0.1 , jsqlparser 降级到 1.2
- ISqlInjector 接口 移除 injectSqlRunner 方法
- SqlFormatter 类设置为过时
- 解决自动注入的 method 的 SqlCommandType 在逻辑删除下混乱问题
- 新增 AlwaysUpdateSomeColumnById 选装件
- SFunction 继承 Function
- DbConfig 的 columnLike 和 dbType 属性设置为过时
- DbConfig 新增 schema 和 columnFormat 属性
- TableField 注解增加 keepGlobalFormat 属性
- TableName 注解增加 schema 和 keepGlobalPrefix 属性
- fixed bug tmp文件格式错乱 github #1048
- 处理表/字段名称抽象 INameConvert 接口策略 github #1038
- DB2支持动态 schema 配置 github #1035
- 把字段缓存的key从className替换成了.class, 如果使用dev-tools会导致：MybatisPlusException: Your property named "xxxx" cannot find the corresponding database column name!(解决方案：去掉dev-tools)


## [v3.1.0] 2019.02.24
- 升级 `mybatis` 到 `3.5.0` 版本
- 升级 `mybatis-spring` 到 `2.0.0` 版本
- 升级 `jsqlparser` 到 `1.4` 版本
- 新增 p6spy 日志打印支持
- 变更 `IService` 的 `getOne(Wrapper<T> queryWrapper)` 方法如果获取到多条数据将会抛出 `TooManyResultsException` 异常
- 修复 自定义分页功能不支持注解 `@select` 问题
- 修复 生成器的配置 kotlin 模式下 swagger 模式无效问题
- 修复 生成器 is 开头字段无法自动注解问题
- 修复 生成器 Serializable Active 模式继承父类包自动导入异常问题
- 修复 生成器 支持公共字段自动读取父类 class 属性问题
- 修复 枚举(注解方式)转换器在存储过程中转换失败
- 修复 beetl 模板逻辑删除注解错误问题
- 修复 通过 `mybatis-config.xml` 方式构建的 `Configuration` 的 `mapUnderscoreToCamelCase` 默认值非 `true` 的问题
- 修复 sql解析器动态代理引发的bug
- 修复 `mapper` 使用纯注解下可能触发的重试机制在个别情况下启动报错的问题
- 优化 支持指定 `defaultEnumTypeHandler` 来进行通用枚举处理
- 优化 从 hibernate copy 最新代码到 SqlFormatter
- 移除 `wrapper` 的 `in` 以及 `notIn` 方法内部对入参 `coll` 及 `动态数组` 的非empty判断(**注意: 如果以前有直接使用以上的方法的入参可能为 empty 的现在会产出如下sql: `in ()` 或 `not in ()` 导致报错**)
- 移除 `wrapper` 的 `notInOrThrow` 和 `inOrThrow` 方法(**使用新版的 `in` 以及 `notIn` 效果一样,异常则为sql异常**)
- 移除 `IService` 的 `query` 链式调用的 `delete` 操作
- 移除 xml 热加载相关配置项,只保留`MybatisMapperRefresh`该类并打上过时标志
- 日常优化

## [v3.0.7.1] 2019.01.02
- 修复 lambdaWrapper 的获取不到主键缓存的问题
- 优化 `IService` 新增的 `update` 链式调用支持 `remove` 操作
- 过时 `IService` 新增的 `query` 链式调用的 `delete` 打上过时标识
- 日常优化


## [v3.0.7] 2019.01.01
- 优化 generator 的 postgresSql 数据库支持生成 java8 时间类型
- 优化 generator 的 sqlServer 数据库支持生成 java8 时间类型
- 优化 LambdaWrapper 反射获取字段信息支持首字母大写的字段
- 优化 仅 LambdaWrapper 的 select 优化(支持字段对不上数据库时自动 as)
- 优化 重复扫描 `BaseMapper` 子类时,`TableInfo` 缓存的 `Configuration` 只保留最后一个
- 优化 `MergeSegments` 获取 `getSqlSegment` 方式
- 优化 SQL 自动注入器的初始化 modelClass 过程,提高初始化速度
- 优化 `BaseMapper` 的 `update` 方法的第一个入参支持为 `null`
- 新增 `IService` 增加4个链式调用方法
- 新增 代码生成器增加 `beetl` 模板
- 新增 `IdWorker` 增加毫秒时间 ID 可用于订单 ID
- 新增 wrapper 新增 `inOrThrow` 方法,入参为 empty 则抛出 `MybatisPlusExcuption` 异常
- 新增 `MetaObjectHandler` 新提供几个能根据注解才插入值的 `default` 方法
- 新增 kotlin 下 lambda 的支持,`KtQueryWrapper` 和 `KtUpdateWrapper`类
- 新增 简化MP自定义SQL使用方法,现在可以使用 `自定义sql` + ${ew.customSqlSegment} 方式
- 新增 提供新的 `InsertBatchSomeColumn` 选装件
- 修复 Page` 的 `setTotal(Long total)` -> `setTotal(long total)`
- 修复 `Page` 的 `setSearchCount` 为 `public`
- 修复 `TenantSqlParser` 如果 where 条件的开头是一个 `orExpression`，直接在左边用and拼接租户信息会造成逻辑不符合预期的问题
- 修复 wrapper 的 `lambda` 方法会向下传递 sqlSelect
- 修复 `ServiceImpl` 个别 batch 操作 `flushStatements` 问题
- 修复 selectObjs 泛型错误问题
- 移除 `InsertBatchAllColumn` 选装件
- 移除 `ServiceImpl` 的 batch 操作之外的事务注解
- 移除 `Model` 的事务注解
- 移除 `AbstractSqlInjector` 的 `isInjectSqlRunner` 方法(SqlRunner初始化较早，目前isInjectSqlRunner无法控制)
- 移除 `MybatisSessionFactoryBuilder`
- 移除 对 `mybatis-plus-generator` 包的依赖,自己按需引入
- 还原 xml 热加载,打上过时标识
- 升级 jsqlparser 依赖到 1.3
- 日常优化


## [v3.0.6] 2018.11.18
- 修复entity中2个以上条件并且拼接ODER BY 或 GROUP BY 产生的 WHERE X1 =? AND X2
- refactor(SerializedLambda.java):重构方法增加反序列化安全性，优化命名
- 基础Mapper优化支持自定义父类Mapper构造自己需要的注入方法
- 使用<where><set>代替<trim>
- 部分优化: 直到抛出异常时才进行字符串 format
- 优化 IdWorker 生成UUID使用并发性能
- feat: 动态分页模型、优化分页方言重新修正db2分页语句
- Assert 支持 i18n 多语言错误提示
- 支持 total 控制是否 count sql 新增 isSearchCount 方法
- feat: move spring dependency from core module to extension
- fix: Junit.assertTrue
- 强制使用自定义ParameterHandler,去除byId类型限制.
- 新增选装件的 InsertBatch 通用方法,以及相应测试,以及代码和性能的优化
- IPage 新增功能,泛型转换
- 自动填充判断填充值是否为空,为空时跳过填充逻辑
- batchsize 阈值设 30 修改为 1000 提升效率
- 修复在极端情况下saveOrUpdate执行错误
- 移除 MybatisSqlSessionTemplate
- 移除 xml 热加载
- 其他优化


## [v3.0.5] 2018.10.11
- 移除 ApiAssert 改为 Assert
- 移除 ApiResult 改为 R
- SQL 注入器优化
- 移除 excludeColumns 方法
- 修复 last 方法的 condition 入参不生效的问题
- 修复去除1=1 BUG
- 移除对 spring-devtools 的支持
- 修复实体属性都为null时Sql拼接出错问题
- 缓存Class反射信息,提升效率
- 继承Model类的实体中,现在无需重写pkVal()方法
- 解决在设置了config-location的情况下报mpe的bug,以及优化初始化逻辑
- 修复存在 mapper.xml 情况下逻辑删除失效
- 调整 关于ServiceImpl中的事务问题 gitee issue/IN8T8
- 修复 DB2分页方言 github issues/526


## [v3.0.4] 2018.09.28
- 修正全局配置 FieldStrategy 为非默认值
- 修正批量事务异常问题
- Api 层 R 类自动处理逻辑失败
- 修改h2脚本初始化加载,去除测试用例注入.
- 新增注释其它


## [v3.0.3] 2018.09.17
- 新增筛选查询字段方法
- fixed orderBy多入参的bug
- 新增 LogicDeleteByIdWithFill 组件
- fixed github issues/476 issues/473
- fixed github issues/360 gitee issues/IMIHN IM6GM
- 改进 allEq入参的value改用泛型
- fixed saveOrUpdateBatch使用BatchExecutor
- fixed 修正getOne获取多条数据为抛出异常
- 修正service 的getOne 方法
- 修正service 的个别方法为default方法
- 修复了page在set了desc下,sql有bug的问题
- 去除不再需要的方法
- 解决 generator 的 optional 的俩 jar 问题
- 重载 select(Predicate<TableFieldInfo> predicate)
- 其他优化


## [v3.0.2] 2018.09.11
- 新增 Wrapper 条件辅助类
- 新增 banner 属性控制是否打印
- 修复 gitee #IMMF4:批量插入(AR)事务无效
- fix: entity 无主键,生成 ew 的 where 条件的 bug
- 处理SqlRunner的sqlSession获取与释放
- 去除全局缓存sqlSession,增加Model,通用service层sqlSession释放
- ext: 抽象原生枚举处理类注册，方便扩展
- 优化扩展性其他


## [v3.0.1] 2018.08.31
- 修复代码生成器设置表前缀异常
- 新增 EnumValue 注解方式扫描通用枚举处理
- 修复逻辑删除混用失败
- DB2 方言改进何鹏举优化
- 新增测试用例及其他


## [v3.0-RELEASE] 2018.08.28 代号：超级棒棒糖 🍭
- 乐观锁 update(et,ew)方法 et带上 version 注解字段回写
- 优化改进优化代码生成器
- 包扫描为空时不抛出异常(枚举,别名）
- 去除 SqlSession
- 修改 issue 模板,完善注释
- 优化初始化过程,添加逻辑删除注解次数检测
- SQL检查允许跳过检查
- 支持达梦数据库
- 修改 code 为数值型严谨限制简化 api 层命名及初始值规则
- 初始化 SQL 解析移至 SqlInjector
- 其他代码优化


## [v3.0-RC3] 2018.08.19 代号：超级棒棒糖 🍭 RC3
- 支持 TableField select 属性 false 排除默认注入大字段查询
- 解决 page 反序列化 pages 属性报错
- 合并2.x dataSource被代理处理
- 去除DbConfig.columnUnderline属性
- 过滤掉selectObjs查询结果集为空的情况
- baseMapper 的 insert 和 update 返回值不再使用包装类
- fixed Gitee issues/IM3NW
- 优化代码完善注释等


## [v3.0-RC2] 2018.08.10 代号：超级棒棒糖 🍭 RC2
- 生成器加回 MODULE_NAME 开放配置 config
- 修复setting - defaultEnumTypeHandler属性配置无效
- 兼容 Spring boot 1.x 启动.
- 日常优化 , 测试用例 , 优化抛出异常的过程
- 新增 Gitee Github issue,pull_request模板
- 移除数据库关键字转义, 只支持注解模式转义
- 优化掉抛异常为使用 assert 或者 exceptionUtils
- 设置下划线转驼峰到 configuration 优化 ColumnUnderline
- 解决 page 序列化 asc desc 多态序列化异常
- 默认的 dbType 改为 other, 如果用户没有配置才会自动获取 dbType
- 优化,ColumnUnderline与MapUnderscoreToCamelCase意义相同
- fixed ILY8C 生成器指定 IdType 场景导入包
- 补充注释新增大量测试用例


## [v3.0-RC1] 2018.08.01 代号：超级棒棒糖 🍭 RC1
- 优化工具类部分代码，并修复一个在多线程环境下可能会引发死锁的BUG
- 新增断言类,顺便修改几处地方的判断抛异常为使用断言
- 去掉多余的 "implements Serializable"
- 魔法值都改为全局常量模式
- 咩咩说了 MP 3.0 分页已经飘飘欲仙了，不在需要迁就使用 PageHelper 模式
- issue #384 QueryWrapper 支持排除指定字段模式
- 全新 banner，全新感觉
- 再优化一下抛异常的过程
- 修改 class 实例化对象的方式，现在可以实例化私有 class
- 支持无配置可启动使用 Gitee issues/ILJQA
- 释放sqlSession,待优化 ActiveRecord单元测试
- 解决只调用 last 产生的 sql 会出的问题
- 修复Lambda首位属性为基类属性时错误.
- 增加泛型限制,格式化下代码.
- 优化一下 AbstractWrapper 使用的 ISqlSegment
- 其他


## [v3.0-RC] 2018.07.23 代号：超级棒棒糖 🍭 RC
- 优化 page 当 size 小于 0 自动调整为 list 模式
- 新增 攻击 SQL 阻断解析器
- 优化解析核心方法名，新增 querywrapper lambda 转换参数测试
- 调整通用 service 层方法命名为阿里规范 （ 小白鼠，对不起，请唾弃我们吧！然后修改下您的项目。）
- 代码生成器允许正则表达式匹配表名
- 乐观锁 回写更新后的version到实体
- Github #385:查询动态表名能利用Wrapper
- 修复 Gitee issues/ILEYD
- Page 的序列化接口挪到 IPage 接口
- 解决了 gamma 不能自动赋值 ID
- 代码改个常量引用优化


## [v3.0-gamma] 2018.07.15 代号：超级棒棒糖 🍭 伽玛
- IPage 新增 listMode 集合模式
- fixd gitee issues/IL7W4
- fixed gitee issues/IL7W4
- 优化生成器包导入
- 解决 Page ascs，descs 异常
- 逻辑删除无法 set where entity 一个参数并存逻辑
- 合并 PR 修改typeAliasesPackage扫描多维度
- 完善 3.0 测试用例
- 代码性能优化及其他


## [v3.0-beta] 2018.07.07 代号：超级棒棒糖 🍭 贝塔
- 新增字段 LIKE 查询注入全局配置，默认 true 开启
- 修改 dbtype 的 oracle db2 修改 CONCAT 方式
- 修正无论 update 的入参 updateWrapper 如何变化,逻辑删除下依然存在限制条件
- 注释加上告警，完善注释
- 修复 github issues/377 378 389
- 解决逻辑删除同时存在非逻辑删除逻辑
- 逻辑删除支持 delete set 其他字段，update 排除逻辑删除字段
- 支持 typeAliasesPackage 多项每项都有通配符 com.a.b.*.po, com.c.*.po
- 修复 gitee issues/IKJ48 IL0B2
- 其他完善


## [v3.0-alpha] 2018.07.01 代号：超级棒棒糖 🍭
- 升级 JDK 8 + 优化性能 Wrapper 支持 lambda 语法
- 模块化 MP 合理的分配各个包结构
- 重构注入方法，支持任意方法精简注入模式
- 全局配置下划线转换消灭注入 AS 语句
- 改造 Wrapper 更改为 QueryWrapper UpdateWrapper
- 重构 分页插件 消灭固定分页模型，支持 Mapper 直接返回 IPage 接口
- 新增 Rest Api 通过 Controller 层
- 实体 String 类型字段默认使用 LIKE 查询 SelectOne 默认 LIMIT 1
- 辅助支持 selectMaps 新增 bean map 互转工具类
- 增加 db2 支持 starter 改为 Spring boot 2+ 支持
- 重构生成器提供自定义 DB 多种模板引擎支持
- 相关 BUG 修复


## [v2.1.9] 2018.01.28 代号：怀念（纪念 2017 baomidou 组织小伙伴 MP 共同成长之路，奔向 2018 旺旺旺）
- page 分页新增控制是否优化 Count Sql 设置
```
// 不进行 count sql 优化
page.setOptimizeCountSql(false);
```
- 注入定义填充，支持sql注入器,主键生成器.
- fixed github issues/231
- fixed github issues/234
- 修改逻辑删除 selectByIds coll 问题
- fixed gitee issues/IHF7N
- fixed gitee issues/IHH83
- 兼容配置方式,优先使用自定义注入.
- 其他优化


## [v2.1.9-SNAPSHOT] 2018.01.16
- 调整 Gradle 依赖模式
- IdType 可选 ID_WORKER_STR `字符串类型` IdWorker.getIdStr() 字符串类型
- TableField 注解新增属性 `update` 预处理 set 字段自定义注入 fixed gitee IHART
```
 例如：@TableField(.. , update="%s+1") 其中 %s 会填充为字段
 输出 SQL 为：update 表 set 字段=字段+1 where ...
```
```
 例如：@TableField(.. , update="now()") 使用数据库时间
 输出 SQL 为：update 表 set 字段=now() where ...
```
- TableField 注解新增属性 `condition` 预处理 WHERE 实体条件自定义运算规则
```
@TableField(condition = SqlCondition.LIKE)
private String name;
输出 SQL 为：select 表 where name LIKE CONCAT('%',值,'%')
```
- 添加 spring-boot-starter 模块内置 `jdbc mp 包不需要单独引入` 更舒服的使用 boot
- 添加对 SQL Server 视图生成的支持
- 允许字段策略独立设置，默认为 naming 策略
```
strategy.setNaming(NamingStrategy.underline_to_camel);// 表名生成策略
strategy.setColumnNaming(NamingStrategy.underline_to_camel);// 允许字段策略独立设置，默认为 naming 策略
```
- 代码生成器抽象 AbstractTemplateEngine 模板引擎抽象类，可自定义模板引擎，新增内置 freemarker 可选
```
// 选择 freemarker 引擎
mpg.setTemplateEngine(new FreemarkerTemplateEngine());
```
- 相关 SQL 解析如多租户可通过 `@SqlParser(filter=true)` 排除 SQL 解析
```
# 开启 SQL 解析缓存注解生效
mybatis-plus:
    global-config:
        sql-parser-cache: true
```
- 解决xml加载顺序问题，可随意引入其他 xml sql 片段
- 修复 author 带123的bug
- fix #IGQGE:Wrapper为空,但是page.getCondition()不为空的情况,Condition无法传递问题
- fix #IH6ED:Pagination dubbo 排序等属性序列化不支持
- 判断Wrapper是否为空，使用==，避免被equals方法重载的影响
- 避免注入自定义基类
- 剥离 sql 单独提出至 SqlUtils
- 统一缩进编码风格
- 优化生成代码执行性能 github issues/219
- 优化 sql 解析过程
- fixed gitee issues/IHCQB
- springboot-configuration-processor 修改 compileOnly为optional
- 其他


## [v2.1.8] 2018.01.02 代号：囍
- 修复代码生成器>字段前缀导致的bug
- 使用类全名替代手写的全名
- build修改
- 脚本警告,忽略目录
- 其他优化


## [v2.1.8-SNAPSHOT] 2017.12.28 代号：翻车鱼（秋秋赐名）
- 返回Map自动下划线转驼峰
- kotlin entity 静态常量支持
- 优化 pagination 构造模式
- Merge pull request #201
- fix: selectByMap @alexqdjay
- 增加sqlRuner测试用例，修复selectObjs只获取一个字段的bug
- 新增 BlobTypeHandler
- 去掉参数map的初始大小配置
- 增加.editorconfig,模板空格问题修复.
- Hikaricp连接池无法打印sql
- 全局中去掉了路径,mapperLocations不可缺少了.
- k 神 全部覆盖测试用例


## [v2.1.7] 2017.12.11 代号：清风徐来 ， 该版本号存在 bug 请改为 2.1.8-SNAPSHOT +
- 枚举处理：基本类型，Number类型，String类型
- IGDRW:源码注释错误，容易给人误导 注释错误问题
- 炮灰 PR !42:添加分页构造方法重载 添加分页构造方法重载
- 代码生成 > oracle > 解决超出最大游标的问题
- fixed gitee IGNL9
- k 神 一大波 testcase 来袭
- 使用transient关键字去除Page中部分字段参与序列化
- 去除无效日志
- fix #IGI3H:selectBatchIds 参数改为Collection类型
- bugfix for logic delete sql injector
- 添加多个排序字段支持
- fixed github #185:2.0.2版本 自增主键 批量插入问题 pr
- 其他优化`


## [v2.1.6] 2017.11.22 代号：小秋秋之吻
- 模块拆分为 support core generate 代码生成分离可选择依赖
- 解决 gitee issue IFX30 拆分 mybatis-plus-support 包支持
- 解决 gitee issue IGAPX 通用枚举 bigdecimal 类型映射
- druid补充,填充字段修改
- 修复 kotlin 代码生成部分逻辑 Bug
- 合并 gitee pr 40 updateAllColumn****等方法排除fill = FieldFill.INSERT注释的字段 感谢 Elsif
- 构造模式设置 kotlin 修改
- Sql 工具类反射实例优化
- 其他优化


## [v2.1.5] 2017.11.11 代号：离神
- 通用枚举 spring boot 兼容调整
- PostgreSQL 支持关键词非关键词转换问题
- Cat73  PR 稍微调整下自动生成的代码
- 支持 kotlin 代码生成
- bugfix for metaObj handler set val which not included in ...
- alibaba 规范调整
- 其他


## [v2.1.3 - 2.1.4] 2017.10.15
- 新增通用枚举处理器，参考 spring boot demno
- 优化 SQL 解析器
- 新增 schema 租户解析器待完善
- 其他优化


## [v2.1.2] 2017.09.17 代号： X
- 修复代码生成器 Bug
- fixed gitee issues/IF2DY
- 修改 page 可链式操作
- 去掉转义 oracle
- fixed github issues/119
- fixed gitee issues/IF2OI


## [v2.1.1] 2017.09.12 代号：小锅盖
- 修改分页超过总记录数自动设置第一页 bug @wujing 感谢 pr
- fixed IEID6
- 升级 mybatis 3.4.5
- 升级生成器模板引擎 veloctiy 2.0
- 升级 jsqlparser 1.1
- 新增 SQL 解析链可动态扩展自定义 SQL 解析
- 新增 多租户 SQL 解析逻辑，具体查看 spring boot 演示 demo
- jasonlong10 PR 性能分析拦截器 支持OraclePreparedStatementWrapper的情况打印 SQL
- fixed github issues/145
- fixed gitee issue/IF1OF
- add sqlSelect("distinct test_type") test case
- 添加填充生成器遗漏 TableField 导入类
- fixed github issues/MYSQL表名含有保留字代码生成时报错 #124:字段全为 大写 下划线命名支持
- fixed github issues/134
- PostgreSQL 代码生成支持指定 schema 表字段按照默认排序
- 其他优化调整


## [v2.1.0] 2017.08.01 代号：小秋秋

####主体功能
- 批量sqlSession没有关闭问题修复
- 处理sql格式化报错问题,添加填充信息
- #91:关于insertBatch在大数据量的时候优化 github
- 新增 uuid 主键测试用例
- 修复BUG自动填充会覆盖之前的值
- 升级pom依赖，spring-test作用域test
- 更改sqlServer驱动,去掉乐观锁不需要的string类型测试
- #86:关于plus的底层映射设计问题 github issue
- SqlHelper处理Wrapper为空,但是page.getCondition()不为空的情况
- Merge pull request !33:生成实体增加字段排序 from 老千/master
- 解决使用代理对象导致无法获取实例缓存信息
- 解决布尔类型is开头生成sql错误问题
- DBType设置错误
- fix #351:DB2Dialect返回NULL
- fix #356:自动代码生成的Boolean类型的get方法不对
- fix #353:代码生成@TableLogic问题
- 新增 PostgreSqlInjector 自动注入器，处理字段大小写敏感，自动双引号转义。
- 仓库地址与用户信息使用自定义传入.
- fix #357:代码生成@TableLogic引入包Bug
- Sequence 新增 mac 判断，分页 pageHelper 模式新增 freeTotal() 方法
- #95:分页插件俩个建议 Github, selectItems contains #{} ${},
- 添加 Wrapper#setSqlSelect(String... columns) 方法,方便通过自动生成的实体...
- fixed github 116 issue
- fixed osgit IE436  IDVPZ  IDTZH

####代码生成
- 修改实体生成模板
- 修复自动填充代码生成错误
- 新增 postgresql schemaname 生成器支持
- 调整序列化导入问题
- 其他


## [v2.1-gamma] 2017.06.29

####主体功能
- 修正之前sqlserver自动获取类型错误问题
- 修复用户无法自定义分页数据库方言问题

####代码生成
- 完善了自动填充代码生成
- 修复postgresql生成重复字段问题

####上个版本（2.0.9）升级导致的问题
- 修复实体主键不在第一位无法读取的问题
- 修复在自定义insert操作时报`Insert not found et`异常，见#331
- 修复Sql生成错误问题(普通注入Group,Having,Order)
- 修复逻辑删除生成Sql顺序错误
- 感谢各路小伙伴及时反馈的问题,上个版本给大家带来的问题深感抱歉

###Mybatis-Plus-Boot-Start [1.0.4]

####主体变动
- 去除Mybatis-plus直接依赖
- 去除SpringBoot jdbc-starter直接依赖

## [v2.0.9] 2017.06.26 代号：K 神
###Mybaits-Plus
####主体功能
- 修正乐观锁和逻辑删除冲突问题
- 处理在生成注入SQL时之前没有考虑到存在且打开下划线配置情况
- 修复EntityWrapper继承关系问题
- Wrapper添加条件判断
- 性能分析插件支持记录日志提示
- Wrapper重写了toString方式,解决之前Debug时显示为null给用户造成错觉
- 处理Sequence非毫秒内并发偶数居多问题
- 忽略策略优化处理更改了注解的属性
- 注入Sql的方式优化,去除之前XML注入方式
- 处理逻辑删除出现2个Where的问题
- 添加其他数据库序列的实现方式,并开放出接口给用户自行扩展
- 乐观锁优化调整
- 优化Wrapper中Where AND OR 去除之前基于反射方式实现,提高代码运行效率
- 处理不添加mybatis-config.xml主键无法填充问题
- MybatisPlus添加支持gradle构建方式
- Wrapper 添加 `and()` `or()` 方法
- 优化GlobalConfiguration,抽离出GlobalConfigUtils减少耦合
- 修复Sqlserver2008与SqlServer2005分页问题
- 新增自动识别数据库,减少用户显式配置
- 优化分页插件减少用户显示配置属性
- 自动填充字段问题解决
- 新增PageHelper,获取当前线程来管理分页(之前老用户最好不要使用,改方式只用户适用MybatisPageHelper用户习惯)
- 大幅度的添加测试用例(感谢K神支持)
- 代码的其他优化
- 添加了JSqlparser的依赖以后不用手动去添加该Jar包

####代码生成
- 支持逻辑删除方式生成
- 支持乐观锁方式生成
- 修复生成器不能识别sqlServer的自增主键代码生成器不能识别SqlServer自增主键的问题
- 支持Lombok方式生成
- 支持构建模式方式生成
- 添加Clob和Blob类型转换
- 修复Oracle的Number类型字段转换错误问题

###Mybatis-Plus-Boot-Start [1.0.2] 代号：清风
####主体功能
- 处理AR模式devtool替换数据源失效问题
- 添加逻辑删除支持
- 添加序列支持

## [v2.0.8] 2017.05.15
- Wrapper添加设置对象sqlSelect
- 兼容无注解情况
- 乐观锁去除默认short实现,优化绑定注册器在扫描阶段绑定. 测试改为h2环境.
- 优化热加载,去除mapper路径配置.
- 减少刷新Mapper配置
- 修复tableFiled value 为空情况，开启下划线命名
- sequence 升级提示
- 开放表信息、预留子类重写
- 修改Idwork测试
- 支持 devtools
- fixed 259 支持 xml resultMap 公共字段生成
- fixed pulls 28 支持属性重载


## [v2.0.6  2.0.7] 2017.04.20
- 新增 逻辑删除
- 新增 Oracle Sequence
- 新增 jdk1.8 时间类型
- 完善支持乐观锁
- 完善字段填充器，支持更新填充
- 升级 mybatis 依赖为 3.4.4
- 代码调整优化，支持 wrapper limit 等逻辑
- 修复 Id 策略 auto bug ，生成器 bug 其他


## [v2.0.5] 2017.03.25

- 修复分页连接池没有关闭的bug
- issues fixed 217
- IMetaObjectHandler当主键类型是AUTO或者INPUT的时候不起效的bug
- 修复 like 占位符问题
- 生成代码的时候如果目录不存在则新建


## [v2.0.3 - v2.0.4] 2017.03.22

- 优化Wrapper代码结构
- 优化原有数据库连接获取
- 解决Page初始化问题(之前只能通过构造方法生效,现在可以通过setget也可以生效)
- 支持乐观锁插件
- 改造Wrapper让JDBC底层来处理参数,更好的与PreparedStatement结合
- 修复相关错误日志提示级别
- Wrapper开放isWhere方法,现在可以自定义是否拼接"WHERE"
- JDK版本向下兼容,之前相关代码用到了1.7新特性,当前版本解除
- sqlserver生成bug修复以及代码优化
- 优化MybatisPlus,SqlSession获取
- 解决未配置切点的情况下获取的sqlSession提交不属于当前事务的问题以及多个sqlSession造成的事务问题
- 增强执行sql类,sqlRunner
- Model添加序列化ID,避免以后在修改Model后没有设置序列号ID时序列号ID可以会变动的情况
- 添加重写默认BaseMapper测试用例
- 感谢各路小伙伴提问的好的建议以及贡献代码,就不一一点名了


## [v2.0.2] 2017.02.13
- 修复全局配置不起作用 2.0.1 逻辑
- 去除byId强制配置类型
- Wrapper Page 等程序优化
- 优化AR模式自动关闭数据库连接(之前需要手动设置事务)
- 优化代码生成器，下划线名称注解不处理驼峰，支持自定义更多的模板例如 jsp html 等
- 新增 service 层测试
- sql日志记录整合至性能分析插件.
- 处理多数据源分页插件支持多重数据库


## [v2.0.1] 2017.01.15

- 解决EntityWrapper对布尔类型构造sql语句错误
- 全局配置初始化日志提示调整
- Mybatis依赖升级至3.4.2,Mybatis-Spring依赖升级至1.3.1
- Service中补充方法(selectObjs,selectMaps)
- 解决selectCount数据库返回null报错问题
- 支持PostgreSql代码生成
- 拓展支持外部提供转义字符以及关键字列表
- 开放数据库表无主键依然注入MP的CRUD(无主键不能使用MP的xxById方法)
- 解决EntityWrapper拼接SQL时,首次调用OR方法不起作用的问题
- sqlServer代码生成(基于2008版本)
- 解决生成代码时未导入BigDecimal问题.
- 释放自动读取数据库时的数据库连接
- 优化全局校验机制(机制为EMPTY增加忽略Date类型)
- 优化注入,避免扫描到BaseMapper
- 优化注入,去除多余注入方法
- SQLlikeType改名为SqlLike
- 解决热加载关联查询错误问题
- SqlQuery改名为SqlRunner
- 优化完善代码生成器
- 修复代码生成器未导入@tableName
- 全局配置需要手动添加MP的默认注入类,更改为自动注入简化配置
- Wrapper增加ne方法
- 修复Mybatis动态参数无法生成totalCount问题
- 代码结构优化，生成器模板优化
- 解决issus[138,140,142,148,151,152,153,156,157]，具体请查看里程碑[mybatis-plus 2.0.1 计划](https://gitee.com/baomidou/mybatis-plus/milestones/2)中所有issus

## [v2.0.0] 2016.12.11

- 支持全局大写命名策略
- 自动分页Count语句优化
- 优化现有全局配置策略
- 优化全局验证策略
- 优化代码生成器(之前硬编码，现使用模板形式)
- 优化注入通用方法ByMap逻辑
- 添加自动选择数据库类型
- 改善SqlExplainInterceptor（自行判断MySQL版本不支持该拦截器则直接放行（版本过低小于5.6.3））
- 修复部分特殊字符字符多次转义的问题
- 优化现有EntityWrapper添加Wrapper父类以及Condition链式查询
- Wrapper类使LIKE方法兼容多种数据库
- 优化日志使用原生Mybatis自带的日志输出提示信息
- 修复使用缓存导致使用分页无法计算Count值
- 修复PerformanceInterceptor替换`?`导致打印SQL不准确问题，并添加格式化SQL选项
- 添加多种数据库支持，请查看DBType
- 添加字符串类型字段非空校验策略（字符串类型自动判断非空以及非空字符串）
- Wrapper添加类似QBC查询(eq、gt、lt等等)
- 支持AR模式（需继承Model）
- 合并所有Selective通用方法（例如:去除之前的insert方法并把之前的insetSelective改名为insert）
- 解决sql剥离器会去除`--`的情况
- 支持MySQL关键词，自动转义
- 精简底层Service、Mapper继承结构
- 不喜欢在XML中写SQL的福音，新增执行SQL方式，具体请查看SqlQuery
- 优化代码结构
- 解决issus[95,96,98,100,103,104,108,114,119,121,123,124,125,126,127,128,131,133,134,135]，具体请查看里程碑[mybatis-plus 2.0 计划](https://gitee.com/baomidou/mybatis-plus/milestones/1)中所有issus

## [v1.4.9] 2016.10.28

- ServiceImpl去除@Transactional注解、去除Slf4j依赖
- 解决使用EntityWrapper查询时，参数为特殊字符时，存在sql注入问题
- 调整Mybatis驼峰配置顺序 MybatisPlus > Mybatis
- 优化分页插件并修复分页溢出设置不起作用问题
- 去除DBKeywordsProcessor，添加MySQL自动转义关键词
- 代码生成器新增支持TEXT、TIME、TIMESTAMP类型生成
- 新增批量插入方法
- 代码生成器新增Controller层代码生成
- 调整EntityWrapper类部分List入参为Collection
- 代码生成器优化支持 resultMap

## [v1.4.8] 2016.10.12

- insertOrUpdate增加主键空字符串判断
- 支持Mybatis原生驼峰配置 mapUnderscoreToCamelCase 开关设置
- 支持 TableField FieldStrategy 注解全局配置
- SelectOne、SelectCount方法支持EntityWrapper方式
- oracle 代码生成器支持 Integer Long Dobule 类型区分
- 修复INPUT主键策略InsertOrUpdate方法Bug
- EntityWrapper IN 添加可变数组支持
- 基础Mapper、Servcie通用方法PK参数类型更改至Serializable
- 当selectOne结果集不唯一时,添加警告提示(需开启日志warn模式)
- baseService添加logger,子类直接调用logger不用重新定义(需slf4j依赖)

## [v1.4.7] 2016.09.27

- 主键注解 I 改为 PK 方便理解，去掉 mapper 注解
- 性能分析插件，特殊处理 $ 符内容
- 添加自动提交事务说明，新增事务测试
- 支持 resultMap 实体结果集映射
- 增加#TableField(el = "")表达式，当该Field为对象时, 可使用#{对象.属性}来映射到数据表、及测试
- 新增 typeHanler 级联查询支持
- 新增验证字段策略枚举类
- 代码生成器支持实体构建者模型设置
- 代码生成器新增实体常量生成支持
- CRUD 新增 insertOrUpdate 方法
- 解决MessageFormat.format格式化数字类型sql错误
- EntityWrapper添加 EXISTS、IN、BETWEEN AND(感谢D.Yang提出)方法支持
- 支持 mysql5.7+ json enum 类型，代码生成
- 支持无XML依然注入CRUD方法
- 修改Mybatis原生配置文件加载顺序

## [v1.4.6] 2016.09.05

- 新增无 @TableId 注解跳过注入SQL
- 支持非表映射对象插入不执行填充
- xxxByMap 支持 null 查询

## [v1.4.5] 2016.08.28

- 新增 XML 修改自动热加载功能
- 添加自动处理EntityWrapper方法中的MessageFormat Params类型为字符串的参数
- 新增表公共字段自动填充功能

## [v1.4.4] 2016.08.25

- entitywrapper所有条件类方法支持传入null参数，该条件不会附件到SQL语句中
- TSQLPlus更名为TSqlPlus与整体命名保持一致。
- 修复mysql关键字bug----将关键字映射转换加上``符号，增加xml文件生成时可自定义文件后缀名
- 关闭资源前增加非空判断,避免错误sql引起的空指针错误,增加选择 current>pages 判断
- TSQL 相关类实现序列化支持 dubbo
- 增加 mybatis 自动热加载插件
- 支持数据库 order key 等关键词转义 curd 操作

## [v1.4.3] 2016.08.23

- 优化 Sequence 兼容无法获取 mac 情况
- 兼容用户设置 ID 空字符串，自动填充
- 纯大写命名，转为小写属性
- 修改EntityWrapper符合T-SQL语法标准的条件进行方法封装定义
- 升级 1.4.3 测试传递依赖

## [v1.4.0] 2016.08.17

- 增加自定义 select 结果集，优化 page 分页
- 未考虑 函数，去掉 field 优化
- 新增 delete update 全表操作禁止执行拦截器

## [v1.3.9] 2016.08.09

- 修复 bug
- 解决插入 map 异常
- 插入 map 不处理，原样返回
- 优化 IdWorker 生成器
- 支持自定义 LanguageDriver
- 支持代码生成自定义类名
- 升级 mybatis 3.4.1 依赖

## [v1.3.6] 2016.07.28

- 支持全局表字段下划线命名设置
- 增加自定义 注入 sql 方法
- 优化分页总记录数为0不执行列表查询逻辑
- 自动生成 xml 基础字段增加 AS 处理
- 支持字段子查询

## [v1.3.5] 2016.07.24

- 升级 1.3.5 支持全局表字段下划线命名设置
- 添加发现设置多个主键注解抛出异常
- 添加无主键主键启动异常
- 去掉重置 getDefaultScriptingLanuageInstance
- 修改歧义重载方法

## [v1.3.3] 2016.07.15

- 处理 SimpleDateFormat 非现场安全问题
- 修改 oracle 分页 bug 修复
- oracle TIMESTAMP 生成支持 bug 修复

## [v1.3.2] 2016.07.12

- service 暴露 sqlSegment 的方法调用
- 新增 sql 执行性能分析 plugins
- 新增 deleteByMap ， selectByMap

## [v1.3.0] 2016.07.07

- 支持 like 比较等查询 sqlSegment 实现
- 支持 typeAliasesPackage 通配符扫描, 无 count 分页查询
- mybatis mapper 方法调用执行原理测试
- 添加 IOC 演示用例

## [v1.2.17] 2016.06.15

- 优化 代码生成器 感谢 yanghu pull request
- 调整 sql 加载顺序 xmlSql > curdSql
- 支持 CURD 二级缓存
- 增加缓存测试，及特殊字符测试

## [v1.2.15] 2016.04.27

- 新增 支持oracle 自动代码生成，测试 功能
- 新增 UUID 策略
- 演示demo 点击 spring-wind
- 新增支持单表 count 查询

## [v1.2.12] 2016.04.22

- 添加 service 层支持泛型 id 支持，自动生成代码优化
- 升级 mybatis 为 3.4.0 ，mybatis-spring 为 1.3.0

## [v1.2.11] 2016.04.18

- 新增批量更新，支持 oracle 批量操作
- 去掉，移植至 spring-wind 的文档
- 支持 jdk1.5 修改 param 描述
- 添加数据库类型

## [v1.2.9] 2016.04.10

- EntityWrapper 新增无 order by 构造方法
- MailHelper 重载 sendMail 方法
- 新增 String 主键ID 支持 CommonMapper
- 原来方法 selectList 分离为 selectList ， selectPage 两个方法
- 优化代码生成器，添加文档说明、其他

## [v1.2.8] 2016.04.02

- 优化生成代码处理大写字段，支持自动生成 entity mapper service 文件
- 优化分页 index 超出逻辑，新增 5 个 CRUD 操作方法
- 开放模板引擎 getHtmltext 方法
- 优化邮件发送配置添加说明文档
- 添加文档说明、其他

## [v1.2.6] 2016.03.29

- 优化代码 service 层封装，抽离 list 、 page 方法
- 优化分页 count sql 语句
- 改进 mail 工具类
- 完善 framework 对 spring 框架的支持
- 添加文档说明、其他

## [v1.2.5] 2016.03.25

- 独立支持id泛型的 baseMapper
- 更完善的自动生成工具
- 支持实体封装排序
- 分页插件完善
- 抽离 service 主键泛型支持

## [v1.2.2] 2016.03.14

- 注解 ID 区分 AUTO 数据库自增，ID_WORKER 自动填充自定义自增ID , INPUT 手动输入 。
- 优化代码及自动生成器功能。
- 其他
