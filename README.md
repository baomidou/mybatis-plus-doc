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
    <version>latest-version</version>
</dependency>
```

### 致谢

- MyBatis-Plus 荣获[【2018 年度开源中国最受欢迎的中国软件】](https://www.oschina.net/question/2896879_2290300) TOP5，感谢各位支持者的一路同行，我们会秉承 【为简化开发而生】 这一理念继续前行！
- 感谢 【**[huaix](https://gitee.com/youthdream)**】 捐赠的域名（[https://mybatis.plus](https://mybatis.plus)），非常的契合 MyBatis-Plus，非常感谢！

### 广而告之

- [【全民云计算】云主机低至 2 折](https://promotion.aliyun.com/ntms/act/qwbk.html?userCode=5wbjwd1y)

<p align="center">
Hosted by <a href="https://pages.coding.me" target="_blank" style="font-weight:bold">Coding Pages</a> & <a href="https://pages.github.com" target="_blank" style="font-weight:bold">Github Pages</a>  & <a href="http://www.jetbrains.com" target="_blank" style="font-weight:bold">Idea</a>
</p>

<script>
import { Notification } from 'element-ui'
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
    // Notify
    this.$notify({
      offset: 50,
      title: '【双12】主会场 低至1折',
      message: '新老用户都有，各种福利&折扣&代金券 新用户低至1折',
      type: 'success',
      // showClose: false,
      duration: 0,
      onClick: function() {
        Notification.closeAll()
        window.open("https://www.aliyun.com/1212/2019/home?userCode=5wbjwd1y")
      }
    });
  }
}
</script>
