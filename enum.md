

# 通用枚举扫描并自动关联注入

解决了繁琐的配置，让 mybatis 优雅的使用枚举属性！

# 1、配置扫描通用枚举


> 枚举属性，必须实现 IEnum 接口如下：

```
public enum AgeEnum implements IEnum {
    ONE(1, "一岁"),
    TWO(2, "二岁");

    private int value;
    private String desc;

    AgeEnum(final int value, final String desc) {
        this.value = value;
        this.desc = desc;
    }

    @Override
    public Serializable getValue() {
        return this.value;
    }

    @JsonValue // Jackson 注解，可序列化该属性为中文描述【可无】
    public String getDesc(){
        return this.desc;
    }
}
```

# 2、配置扫描通用枚举

- 注意!! spring mvc 配置参考，安装集成 MybatisSqlSessionFactoryBean 枚举包扫描，spring boot 例子配置如下：

示例工程：

👉 [mybatisplus-spring-boot](https://git.oschina.net/baomidou/mybatisplus-spring-boot)

> 配置文件 resources/application.yml

```
mybatis-plus:
    # 支持统配符 * 或者 ; 分割
    typeEnumsPackage: com.baomidou.springboot.entity.enums
  ....
```
