---
title: 数据安全保护
date: 2021-12-14 19:09:20
permalink: /pages/e0a5ce/
article: false
---

> 该功能为了保护数据库配置及数据安全，在一定的程度上控制开发人员流动导致敏感信息泄露。

- 3.3.2 开始支持

- 配置安全

YML 配置：

```yml
// 加密配置 mpw: 开头紧接加密内容（ 非数据库配置专用 YML 中其它配置也是可以使用的 ）
spring:
  datasource:
    url: mpw:qRhvCwF4GOqjessEB3G+a5okP+uXXr96wcucn2Pev6Bf1oEMZ1gVpPPhdDmjQqoM
    password: mpw:Hzy5iliJbwDHhjLs1L0j6w==
    username: mpw:Xb+EgsyuYRXw7U7sBJjBpA==
```

密钥加密：

```java
// 生成 16 位随机 AES 密钥
String randomKey = AES.generateRandomKey();

// 随机密钥加密
String result = AES.encrypt(data, randomKey);
```

如何使用：

```txt
// Jar 启动参数（ idea 设置 Program arguments , 服务器可以设置为启动环境变量 ）
--mpw.key=d1104d7c3b616f0b
```

- 数据安全：

👉 [字段加密解密](https://baomidou.com/pages/1864e1/#%E5%AD%97%E6%AE%B5%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86)

👉 [字段脱敏](https://baomidou.com/pages/1864e1/#%E5%AD%97%E6%AE%B5%E8%84%B1%E6%95%8F)

- SQL 注入安全保护说明

```java
Wrappers.query()
// 开启自动检查 SQL 注入
.checkSqlInjection().orderByDesc("任意前端传入字段")
​
// 手动校验方式
SqlInjectionUtils.check("任意前端传入字段")
```

::: warning 注意！

- 加密配置必须以 mpw: 字符串开头
- 随机密钥请负责人妥善保管，当然越少人知道越好。

:::
