# 自动填充功能

示例工程：

👉 [mybatis-plus-sample-auto-fill-metainfo](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-auto-fill-metainfo)


- 实现元对象处理器接口：com.baomidou.mybatisplus.core.handlers.MetaObjectHandler

- 注解填充字段 `@TableField(.. fill = FieldFill.INSERT)` 生成器策略部分也可以配置！

```java
public class User {

    // 注意！这里需要标记为填充字段
    @TableField(.. fill = FieldFill.INSERT)
    private String fillField;

    ....
}
```


- 自定义实现类 MyMetaObjectHandler

```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(MyMetaObjectHandler.class);

    @Override
    public void insertFill(MetaObject metaObject) {
        LOGGER.info("start insert fill ....");
        this.setFieldValByName("operator", "Jerry", metaObject);//版本号3.0.6以及之前的版本
        //this.setInsertFieldValByName("operator", "Jerry", metaObject);//@since 快照：3.0.7.2-SNAPSHOT， @since 正式版暂未发布3.0.7
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        LOGGER.info("start update fill ....");
        this.setFieldValByName("operator", "Tom", metaObject);
        //this.setUpdateFieldValByName("operator", "Tom", metaObject);//@since 快照：3.0.7.2-SNAPSHOT， @since 正式版暂未发布3.0.7
    }
}
```
::: warning 注意事项：
- 字段必须声明`TableField`注解，属性`fill`选择对应策略，该申明告知 `Mybatis-Plus` 需要预留注入 `SQL` 字段
- 填充处理器`MyMetaObjectHandler` 在 Spring Boot 中需要声明`@Component` 注入
- 必须使用父类的setFieldValByName()或者setInsertFieldValByName/setUpdateFieldValByName方法，否则不会根据注解FieldFill.xxx来区分
:::

```java
public enum FieldFill {
    /**
     * 默认不处理
     */
    DEFAULT,
    /**
     * 插入填充字段
     */
    INSERT,
    /**
     * 更新填充字段
     */
    UPDATE,
    /**
     * 插入和更新填充字段
     */
    INSERT_UPDATE
}
```
