# 代码生成器

在代码生成之前，首先进行配置，MP提供了大量的自定义设置，生成的代码完全能够满足各类型的需求，如果你发现配置不能满足你的需求，欢迎提交issue和pull-request，有兴趣的也可以查看[源码](https://gitee.com/baomidou/mybatis-plus/tree/dev/mybatis-plus-generate)进行了解。

默认配置，[懒人直达电梯](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/dev/src/test/java/com/baomidou/springboot/test/generator/GeneratorServiceEntity.java)

> 参数说明

参数相关的配置，详见源码

> 主键策略选择

MP支持以下4中主键策略，可根据需求自行选用：

值                | 描述
---------------- | ---------------------
IdType.AUTO      | 数据库ID自增
IdType.INPUT     | 用户输入ID
IdType.ID_WORKER | 全局唯一ID，内容为空自动填充（默认配置）
IdType.UUID      | 全局唯一ID，内容为空自动填充

AUTO、INPUT和UUID大家都应该能够明白，这里主要讲一下ID_WORKER。首先得感谢开源项目`Sequence`，感谢作者`李景枫`。

什么是Sequence？简单来说就是一个分布式高效有序ID生产黑科技工具，思路主要是来源于`Twitter-Snowflake算法`。这里不详细讲解Sequence，有兴趣的朋友请[点此去了解Sequence](http://git.oschina.net/yu120/sequence)。

MP在Sequence的基础上进行部分优化，用于产生全局唯一ID，好的东西希望推广给大家，所以我们将ID_WORDER设置为默认配置。

> 表及字段命名策略选择

在MP中，我们建议`数据库表名` 和 `表字段名`采用`驼峰命名方式`， 如果采用`下划线命名方式` 请开启全局下划线开关，如果表名字段名`命名方式不一致`请注解指定，我们建议最好保持一致。

这么做的原因是为了避免在对应实体类时产生的性能损耗，这样字段不用做映射就能直接和实体类对应。当然如果项目里不用考虑这点性能损耗，那么你采用下滑线也是没问题的，只需要在生成代码时配置`dbColumnUnderline`属性就可以。

> 如何生成代码

> 方式一、代码生成

!> 注意！模板引擎根据您的具体情况选择，自定义模板引擎请继承类 com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine

```依赖jars
<!-- 模板引擎 -->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>最新版本</version>
</dependency>

<!-- 模板引擎，需要指定 mpg.setTemplateEngine(new FreemarkerTemplateEngine()); -->
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>最新版本</version>
</dependency>

<!-- MP 核心库 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>最新版本</version>
</dependency>
```

> 代码生成、示例一

```java
import java.util.HashMap;
import java.util.Map;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

/**
 * <p>
 * 代码生成器演示
 * </p>
 */
public class MpGenerator {

    /**
     * <p>
     * MySQL 生成演示
     * </p>
     */
    public static void main(String[] args) {
        AutoGenerator mpg = new AutoGenerator();
	// 选择 freemarker 引擎，默认 Veloctiy
	// mpg.setTemplateEngine(new FreemarkerTemplateEngine());

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        gc.setOutputDir("D://");
        gc.setFileOverride(true);
        gc.setActiveRecord(true);// 不需要ActiveRecord特性的请改为false
        gc.setEnableCache(false);// XML 二级缓存
        gc.setBaseResultMap(true);// XML ResultMap
        gc.setBaseColumnList(false);// XML columList
	// .setKotlin(true) 是否生成 kotlin 代码
        gc.setAuthor("Yanghu");

        // 自定义文件命名，注意 %s 会自动填充表实体属性！
        // gc.setMapperName("%sDao");
        // gc.setXmlName("%sDao");
        // gc.setServiceName("MP%sService");
        // gc.setServiceImplName("%sServiceDiy");
        // gc.setControllerName("%sAction");
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setDbType(DbType.MYSQL);
        dsc.setTypeConvert(new MySqlTypeConvert(){
            // 自定义数据库表字段类型转换【可选】
            @Override
            public DbColumnType processTypeConvert(String fieldType) {
                System.out.println("转换类型：" + fieldType);
		// 注意！！processTypeConvert 存在默认类型转换，如果不是你要的效果请自定义返回、非如下直接返回。
                return super.processTypeConvert(fieldType);
            }
        });
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("521");
        dsc.setUrl("jdbc:mysql://127.0.0.1:3306/mybatis-plus?characterEncoding=utf8");
        mpg.setDataSource(dsc);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
	// strategy.setCapitalMode(true);// 全局大写命名 ORACLE 注意
        strategy.setTablePrefix(new String[] { "tlog_", "tsys_" });// 此处可以修改为您的表前缀
        strategy.setNaming(NamingStrategy.underline_to_camel);// 表名生成策略
        // strategy.setInclude(new String[] { "user" }); // 需要生成的表
        // strategy.setExclude(new String[]{"test"}); // 排除生成的表
        // 自定义实体父类
        // strategy.setSuperEntityClass("com.baomidou.demo.TestEntity");
        // 自定义实体，公共字段
        // strategy.setSuperEntityColumns(new String[] { "test_id", "age" });
        // 自定义 mapper 父类
        // strategy.setSuperMapperClass("com.baomidou.demo.TestMapper");
        // 自定义 service 父类
        // strategy.setSuperServiceClass("com.baomidou.demo.TestService");
        // 自定义 service 实现类父类
        // strategy.setSuperServiceImplClass("com.baomidou.demo.TestServiceImpl");
        // 自定义 controller 父类
        // strategy.setSuperControllerClass("com.baomidou.demo.TestController");
        // 【实体】是否生成字段常量（默认 false）
        // public static final String ID = "test_id";
        // strategy.setEntityColumnConstant(true);
        // 【实体】是否为构建者模型（默认 false）
        // public User setName(String name) {this.name = name; return this;}
        // strategy.setEntityBuilderModel(true);
        mpg.setStrategy(strategy);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setParent("com.baomidou");
        pc.setModuleName("test");
        mpg.setPackageInfo(pc);

        // 注入自定义配置，可以在 VM 中使用 cfg.abc 【可无】
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
                this.setMap(map);
            }
        };

        // 自定义 xxList.jsp 生成
        List<FileOutConfig> focList = new ArrayList<FileOutConfig>();
		focList.add(new FileOutConfig("/template/list.jsp.vm") {
			@Override
			public String outputFile(TableInfo tableInfo) {
				// 自定义输入文件名称
				return "D://my_" + tableInfo.getEntityName() + ".jsp";
			}
		});
		cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

	// 调整 xml 生成目录演示
         focList.add(new FileOutConfig("/templates/mapper.xml.vm") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return "/develop/code/xml/" + tableInfo.getEntityName() + ".xml";
            }
        });
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 关闭默认 xml 生成，调整生成 至 根目录
        TemplateConfig tc = new TemplateConfig();
        tc.setXml(null);
        mpg.setTemplate(tc);

        // 自定义模板配置，可以 copy 源码 mybatis-plus/src/main/resources/templates 下面内容修改，
        // 放置自己项目的 src/main/resources/templates 目录下, 默认名称一下可以不配置，也可以自定义模板名称
        // TemplateConfig tc = new TemplateConfig();
        // tc.setController("...");
        // tc.setEntity("...");
        // tc.setMapper("...");
        // tc.setXml("...");
        // tc.setService("...");
        // tc.setServiceImpl("...");
	// 如上任何一个模块如果设置 空 OR Null 将不生成该模块。
        // mpg.setTemplate(tc);

        // 执行生成
        mpg.execute();

        // 打印注入设置【可无】
        System.err.println(mpg.getCfg().getMap().get("abc"));
    }

}
```


> 代码生成 [点此去了解](https://gitee.com/baomidou/mybatisplus-spring-boot/blob/dev/src/test/java/com/baomidou/springboot/test/generator/GeneratorServiceEntity.java) 、示例二 

```java
new AutoGenerator().setGlobalConfig(
	...
).setDataSource(
	...
).setStrategy(
	...
).setPackageInfo(
	...
).setCfg(
	...
).setTemplate(
	...
).execute();

```

> 自定义模板，自定义参数 [查看示例](https://gitee.com/baomidou/mybatis-plus/blob/dev/mybatis-plus-generate/src/test/java/com/baomidou/mybatisplus/test/generator/CodeGeneratorCustomTemplate.java) 

```java
TemplateConfig templateConfig = new TemplateConfig()
    .setXml("/templates/mapper2.xml");//注意，不需要带上.vm
InjectionConfig injectionConfig = new InjectionConfig() {
    @Override
    public void initMap() {//自定义参数
        Map<String, Object> map = new HashMap<>();
        map.put("abc", "自定义abc的值");
        this.setMap(map);
    }
};
new AutoGenerator()
.setTemplate(templateConfig)//生成器配置自定义模板路径
.setCfg(injectionConfig)//生成器配置自定义参数
.xxx
```
```xml
模板里面用自定义参数：${cfg.abc} 
--cfg是固定写法, 参考AbstractTemplateEngine.batchOutput()方法;
--abc就是map里put的参数名;

```

> 其他方式、 Maven插件生成


待补充（Maven代码生成插件 待完善） <http://git.oschina.net/baomidou/mybatisplus-maven-plugin>
