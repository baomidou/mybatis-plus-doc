# 常见问题

## 如何排除非表中字段？

> 三种方式选择一种即可！

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


## 异常：Invalid bound statement(not found)

- 配置 Mapper 未扫描，或命名空间错误。

- selectById 相关 ID 无法操作，请 @TableId 注解表 ID 主键

- mapper.xml 在 src 下配置：

  ```xml
  <build>    
      <resources>
          <resource>
              <directory>src/main/java</directory>
              <includes>
                  <include>**/*.xml</include>
              </includes>
          </resource>
          <!--指定资源的位置-->
          <resource>
              <directory>src/main/resources</directory>
          </resource>
      </resources>
  </build>
  ```
  
  
