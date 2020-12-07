# 分页

## PaginationInnerInterceptor

### 支持的数据库
- mysql 、mariadb 、oracle 、db2 、h2 、hsql 、sqlite 、postgresql 、sqlserver 、presto 、Gauss 、Firebird

- Phoenix 、clickhouse 、Sybase ASE 、 OceanBase 、达梦数据库 、虚谷数据库 、人大金仓数据库 、南大通用数据库

### 属性介绍

| 属性名 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: |
| overflow | boolean | false | 溢出总页数后是否进行处理(默认不处理,参见 `插件#continuePage` 方法) |
| maxLimit | Long |  | 单页分页条数限制(默认无限制,参见 `插件#handlerLimit` 方法) |
| dbType | DbType |  | 数据库类型(根据类型获取应使用的分页方言,参见 `插件#findIDialect` 方法) |
| dialect | IDialect |  | 方言实现类(参见 `插件#findIDialect` 方法) |

> 建议单一数据库类型的均设置 dbType

### 自定义的 mapper#method 使用分页

``` java
IPage<User> selectPageVo(IPage<?> page, Integer state);
// or
List<User> selectPageVo(IPage<User> page, Integer state);
```

```xml
<select id="selectPageVo" resultType="com.baomidou.cloud.entity.UserVo">
    SELECT id,name FROM user WHERE state=#{state}
</select>
```

> 如果返回类型是 IPage 则入参的 IPage 不能为null,因为 返回的IPage == 入参的IPage  
> 如果返回类型是 List 则入参的 IPage 可以为 null(为 null 则不分页),但需要你手动 入参的IPage.setRecords(返回的 List);  
> 如果 xml 需要从 page 里取值,需要 `page.属性` 获取