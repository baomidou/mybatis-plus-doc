

# 通用枚举扫描并自动关联注入

解决了繁琐的配置，让 mybatis 优雅的使用枚举属性！

# 1、申明通用枚举属性


> 方式一： 使用 @EnumValue 注解枚举属性

> 方式二： 枚举属性，实现 IEnum 接口如下：

```
public enum AgeEnum implements IEnum<String> {
    ...
    @Override
    public String getValue() {
        return this.value;
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
# 3.JSON序列化处理
## 一、Jackson
	1.在需要响应描述字段的get方法上添加@JsonValue注解即可
		
## 二、Fastjson
1.全局处理方式
```
		FastJsonConfig config = new FastJsonConfig();
		//设置WriteEnumUsingToString
		config.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
		converter.setFastJsonConfig(config);
```
2.局部处理方式
```	
		@JSONField(serialzeFeatures= SerializerFeature.WriteEnumUsingToString)
		private UserStatus status;
```
以上两种方式任选其一,然后在枚举中复写toString方法即可.


