---
title: 快速测试
date: 2021-12-16 09:00:01
permalink: /pages/b7dae0/
article: false
---

自动导入 MyBatis-Plus 测试所需相关配置，通过 `@MybatisPlusTest` 注解快速配置测试类。

## 示例工程

源码：👉 [mybatis-plus-boot-starter-test](https://github.com/baomidou/mybatis-plus/tree/master/mybatis-plus-boot-starter-test)

## 使用教程

### 添加测试依赖

Maven:

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter-test</artifactId>
    <version>latest-version</version>
</dependency>
```

Gradle：

```groovy
compile group: 'com.baomidou', name: 'mybatis-plus-boot-starter-test', version: 'latest-version'
```

### 编写测试用例

通过 `@MybatisPlusTest` 可快速编写 Mapper 对应的测试类，实现快速测试代码

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

@MybatisPlusTest
class MybatisPlusSampleTest {

    @Autowired
    private SampleMapper sampleMapper;

    @Test
    void testInsert() {
        Sample sample = new Sample();
        sampleMapper.insert(sample);
        assertThat(sample.getId()).isNotNull();
    }
}
```

<script>
export default {
  mounted () {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://img.shields.io/maven-central/v/com.baomidou/mybatis-plus-boot-starter-test.json", false)
    xmlHttp.send(null)
    var mpVersion = JSON.parse(xmlHttp.responseText).value.replace('v', '')
    var codeNodeList = document.querySelectorAll('code')
    for (var i = 0; i < codeNodeList.length; i++) {
        codeNodeList[i].innerHTML = codeNodeList[i].innerHTML.replace('latest-version', mpVersion)
    }
  }
}
</script>
