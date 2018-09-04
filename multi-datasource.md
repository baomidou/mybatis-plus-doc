## dynamic-datasource-spring-boot-starter (官方推荐)

官网地址 https://gitee.com/baomidou/dynamic-datasource-spring-boot-starter

示例项目 https://gitee.com/baomidou/dynamic-datasource-spring-boot-starter/tree/master/samples

对mybatis-plus 2.x 和3.x 做专门适配。

在springboot下最简单集成多数据源的方案。

1. 引入dynamic-datasource-spring-boot-starter。

```xml
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
  <version>2.x.x</version>
</dependency>
```
2. 配置主从数据源。（更多案例查看官方文档）

```yaml
spring:
  datasource:
    dynamic:
      primary: master #设置默认的数据源或者数据源组,默认值即为master,如果你主从默认下主库的名称就是master可不定义此项。
      datasource:
        master:
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
          url: jdbc:mysql://47.100.20.186:3306/dynamic?characterEncoding=utf8&useSSL=false
        slave_1:
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
          url: jdbc:mysql://47.100.20.186:3307/dynamic?characterEncoding=utf8&useSSL=false
        slave_2:
          username: root
          password: 123456
          driver-class-name: com.mysql.jdbc.Driver
          url: jdbc:mysql://47.100.20.186:3308/dynamic?characterEncoding=utf8&useSSL=false
       #......省略
       #以上会配置一个默认库master，一个组slave下有两个子库slave_1,slave_2
```

3. 切换数据源。

使用 **@DS**  注解切换数据源。

> 可以注解在方法上,可以注解在service实现或mapper接口方法上。

|     注解      |                   结果                   |
| :-----------: | :--------------------------------------: |
|    没有@DS    |                默认数据源                |
| @DS("dsName") | dsName可以为组名也可以为具体某个库的名称 |


## 读写分离

> 引入 mybatis-plus sharding-jdbc 依赖

[点击参考](https://gitee.com/nieqiurong/spring-boot-plus-kotlin)


> yaml 配置
```
sharding:
  jdbc:
    datasource:
      names: ds_master,ds_slave_0,ds_slave_1
      ds_master:
        ...
      ds_slave_0:
        ...
      ds_slave_1:
        ...
    config:
      masterslave:
        load-balance-algorithm-type: round_robin
        name: ds_ms
        master-data-source-name: ds_master
        slave-data-source-names: ds_slave_0,ds_slave_1
```


## 多数据源使用 shardingjdbc 实现

点击 [mybatisplus-sharding-jdbc](https://gitee.com/baomidou/mybatisplus-sharding-jdbc) 查看

# 读写分离 & 多数据源

> 推荐使用 [shardingjdbc](http://shardingjdbc.io/index_zh.html) 分布式数据库中间件，实现分库分表、读写分离。

