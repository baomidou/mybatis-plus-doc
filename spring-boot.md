# Spring Boot 相关介绍

## 快速入门 mybatisplus-spring-boot-starter
spring boot 项目集成mp可以使用starter
* pom.xml引入
```xml
<dependencies>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>2.2.0</version>
    </dependency>
</dependencies>
<!-- 如果mapper.xml是放在src/main/java目录下，需配置以下-->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <filtering>false</filtering>
            <includes>
                <include>**/mapper/*.xml</include>
            </includes>
        </resource>
    </resources>
</build>
```
* application.yml配置文件
```yaml
mybatis-plus:
  # 如果是放在src/main/java目录下 classpath:/com/yourpackage/*/mapper/*Mapper.xml
  # 如果是放在resource目录 classpath:/mapper/*Mapper.xml
  mapper-locations: classpath:/mapper/*Mapper.xml
  #实体扫描，多个package用逗号或者分号分隔
  typeAliasesPackage: com.yourpackage.*.entity
  global-config:
    #主键类型  0:"数据库ID自增", 1:"用户输入ID",2:"全局唯一ID (数字类型唯一ID)", 3:"全局唯一ID UUID";
    id-type: 3
    #字段策略 0:"忽略判断",1:"非 NULL 判断"),2:"非空判断"
    field-strategy: 2
    #驼峰下划线转换
    db-column-underline: true
    #mp2.3+ 全局表前缀 mp_
    #table-prefix: mp_
    #刷新mapper 调试神器
    #refresh-mapper: true
    #数据库大写下划线转换
    #capital-mode: true
    # Sequence序列接口实现类配置
    key-generator: com.baomidou.mybatisplus.incrementer.OracleKeyGenerator
    #逻辑删除配置（下面3个配置）
    logic-delete-value: 1
    logic-not-delete-value: 0
    sql-injector: com.baomidou.mybatisplus.mapper.LogicSqlInjector
    #自定义填充策略接口实现
    meta-object-handler: com.baomidou.springboot.MyMetaObjectHandler
  configuration:
    #配置返回数据库(column下划线命名&&返回java实体是驼峰命名)，自动匹配无需as（没开启这个，SQL需要写as： select user_id as userId） 
    map-underscore-to-camel-case: true
    cache-enabled: false
    #配置JdbcTypeForNull, oracle数据库必须配置
    jdbc-type-for-null: 'null' 
```
* Java Configuration配置[更多配置参考](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/master/src/main/java/com/baomidou/springboot/config/MybatisPlusConfig.java)
```java
@Configuration
@MapperScan("com.yourpackage.*.mapper*")
public class MybatisPlusConfig {
     /*
      * 分页插件，自动识别数据库类型
      * 多租户，请参考官网【插件扩展】
      */
     @Bean
     public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
     }
     
     /*
      * oracle数据库配置JdbcTypeForNull
      * 参考：https://gitee.com/baomidou/mybatisplus-boot-starter/issues/IHS8X
      不需要这样配置了，参考 yml:
      mybatis-plus:
        confuguration
          dbc-type-for-null: 'null' 
     @Bean
     public ConfigurationCustomizer configurationCustomizer(){
         return new MybatisPlusCustomizers();
     }
     
     class MybatisPlusCustomizers implements ConfigurationCustomizer {
     
         @Override
         public void customize(org.apache.ibatis.session.Configuration configuration) {
             configuration.setJdbcTypeForNull(JdbcType.NULL);
         }
     }
     */
}
```
