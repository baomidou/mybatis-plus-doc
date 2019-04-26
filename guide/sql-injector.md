# Sql 注入器

::: tip 注入器配置
全局配置 `sqlInjector` 用于注入 `ISqlInjector` 接口的子类，实现自定义方法注入。

例如逻辑删除注入器 [LogicSqlInjector](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/LogicSqlInjector.java)
:::

- SQL 自动注入器接口 `ISqlInjector`
```java
public interface ISqlInjector {

    /**
     * <p>
     * 检查SQL是否注入(已经注入过不再注入)
     * </p>
     *
     * @param builderAssistant mapper 信息
     * @param mapperClass      mapper 接口的 class 对象
     */
    void inspectInject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass);
}
```

- 实现接口抽象类 `AbstractSqlInjector`
```java
public abstract class AbstractSqlInjector implements ISqlInjector {

    @Override
    public void inspectInject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass) {
        String className = mapperClass.toString();
        Set<String> mapperRegistryCache = GlobalConfigUtils.getMapperRegistryCache(builderAssistant.getConfiguration());
        if (!mapperRegistryCache.contains(className)) {
            List<AbstractMethod> methodList = this.getMethodList();
            Assert.notEmpty(methodList, "No effective injection method was found.");
            // 循环注入自定义方法
            methodList.forEach(m -> m.inject(builderAssistant, mapperClass));
            mapperRegistryCache.add(className);
            /**
             * 初始化 SQL 解析
             */
            if (GlobalConfigUtils.getGlobalConfig(builderAssistant.getConfiguration()).isSqlParserCache()) {
                SqlParserHelper.initSqlParserInfoCache(mapperClass);
            }
        }
    }

    /**
     * <p>
     * 获取 注入的方法
     * </p>
     *
     * @return 注入的方法集合
     */
    public abstract List<AbstractMethod> getMethodList();
}
```

自定义自己的通用方法可以实现接口 `ISqlInjector` 也可以继承抽象类  `AbstractSqlInjector` 注入通用方法 `SQL 语句` 然后继承 `BaseMapper` 添加自定义方法，全局配置 `sqlInjector` 注入 MP 会自动将类所有方法注入到 `mybatis` 容器中。
