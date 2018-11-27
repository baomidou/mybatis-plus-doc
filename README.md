---
home: true
heroImage: /img/logo.png
actionText: 快速开始 →
actionLink: /guide/
features:
- title: 润物无声
  details: 只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑。
- title: 效率至上
  details: 只需简单配置，即可快速进行 CRUD 操作，从而节省大量时间。
- title: 丰富功能
  details: 热加载、代码生成、分页、性能分析等功能一应俱全。
footer: Apache License 2.0 | © 2016-2018 baomidou
---

### 当前最新版本

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>last-version</version>
</dependency>
```

### 广而告之
- [【2018年度最受欢迎中国开源软件】投票](https://www.oschina.net/project/top_cn_2018?sort=1)：希望您能为 MyBatis-Plus 投上宝贵的一票
- [【全民云计算】云主机低至2折](https://promotion.aliyun.com/ntms/act/qwbk.html?userCode=5wbjwd1y)

<p align="center">
Hosted by <a href="https://pages.coding.me" target="_blank" style="font-weight:bold">Coding Pages</a> & <a href="https://pages.github.com" target="_blank" style="font-weight:bold">Github Pages</a>
</p>

<script>
export default {
  mounted () {
    // 自动获取 MyBatis Plus 最新版本
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://img.shields.io/maven-central/v/com.baomidou/mybatis-plus.json", false)
    xmlHttp.send(null)
    let versionInfo = JSON.parse(xmlHttp.responseText).value.replace('v', '')
    let codeNodeList = document.querySelectorAll('code')
    for (var i = 0; i < codeNodeList.length; i++) {
        codeNodeList[i].innerHTML = codeNodeList[i].innerHTML.replace('last-version', versionInfo)
    }
  }
}
</script>