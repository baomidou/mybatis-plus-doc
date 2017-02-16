# 如何排除非表中字段？

> 如果三种方式选择一种即可！

- 使用 transient 修饰
```java
private transient String noColumn;
```

- 使用 static 修饰
```java
private static String noColumn;
```
- 使用 TableField 注解
```java
@TableField(exist=false)
private String noColumn;
```