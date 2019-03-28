---
home: true
heroImage: /img/logo.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Simple
  details: MyBatis-Plus is an powerful enhanced tool for MyBatis. it provides many efficient operations for MyBatis. and you can seamlessly switch to MyBatis-Plus from MyBatis.
- title: Powerful
  details: MyBatis-Plus can automatically inject basic SQL fragments, have a powerful and flexible where condition wrapper, using it can save you a lot of development time.
- title: Extensibility
  details: MyBatis-Plus has many useful plugins(e.g. code generator, auto paging, performance analysis and so on), it has provided everything you need. why not try?
footer: Apache License 2.0 | © 2016-2018 baomidou
---

### The latest version

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>latest-version</version>
</dependency>
```

<p align="center">
Hosted by <a href="https://pages.coding.me" target="_blank" style="font-weight:bold">Coding Pages</a> & <a href="https://pages.github.com" target="_blank" style="font-weight:bold">Github Pages</a>
</p>

<script>
export default {
  mounted () {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://img.shields.io/maven-central/v/com.baomidou/mybatis-plus.json", false)
    xmlHttp.send(null)
    var versionInfo = JSON.parse(xmlHttp.responseText).value.replace('v', '')
    var codeNodeList = document.querySelectorAll('code')
    for (var i = 0; i < codeNodeList.length; i++) {
        codeNodeList[i].innerHTML = codeNodeList[i].innerHTML.replace('latest-version', versionInfo)
    }
  }
}
</script>
