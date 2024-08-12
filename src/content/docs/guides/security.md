---
title: 数据安全保护
sidebar:
  order: 16
---

MyBatis-Plus 提供了数据安全保护功能，旨在防止因开发人员流动而导致的敏感信息泄露。从3.3.2版本开始，MyBatis-Plus 支持通过加密配置和数据安全措施来增强数据库的安全性。

## 配置安全

### YML 配置加密

MyBatis-Plus 允许你使用加密后的字符串来配置数据库连接信息。在 YML 配置文件中，以 `mpw:` 开头的配置项将被视为加密内容。

```yml
spring:
  datasource:
    url: mpw:qRhvCwF4GOqjessEB3G+a5okP+uXXr96wcucn2Pev6Bf1oEMZ1gVpPPhdDmjQqoM
    password: mpw:Hzy5iliJbwDHhjLs1L0j6w==
    username: mpw:Xb+EgsyuYRXw7U7sBJjBpA==
```

### 密钥加密

使用 AES 算法生成随机密钥，并对敏感数据进行加密。

```java
// 生成16位随机AES密钥
String randomKey = AES.generateRandomKey();

// 使用随机密钥加密数据
String encryptedData = AES.encrypt(data, randomKey);
```

### 如何使用

在启动应用程序时，通过命令行参数或环境变量传递密钥。

```txt
// Jar 启动参数示例（在IDEA中设置Program arguments，或在服务器上设置为启动环境变量）
--mpw.key=d1104d7c3b616f0b
```

:::note

- 加密配置必须以 `mpw:` 字符串开头。
- 随机密钥应由负责人妥善保管，知晓的人越少越好。

:::

## 数据安全

MyBatis-Plus 提供了字段加密解密和字段脱敏功能，以保护存储在数据库中的敏感数据。

- **字段加密解密**：对数据库中的特定字段进行加密存储，并在需要时解密使用。
- **字段脱敏**：对敏感字段进行脱敏处理，以隐藏或模糊敏感信息。

## SQL 注入安全保护

MyBatis-Plus 提供了自动和手动两种方式来检查 SQL 注入风险。

### 自动检查

使用 `Wrappers.query()` 方法时，可以通过 `.checkSqlInjection()` 开启自动检查。

```java
Wrappers.query()
// 开启自动检查 SQL 注入
.checkSqlInjection().orderByDesc("任意前端传入字段，我们推荐最好是白名单处理，因为可能存在检查覆盖不全情况")
```

### 手动校验

使用 `SqlInjectionUtils.check()` 方法进行手动校验。

```java
// 手动校验前端传入的字段是否存在 SQL 注入风险
SqlInjectionUtils.check("任意前端传入字段，我们推荐最好是白名单处理，因为可能存在检查覆盖不全情况")
```
:::danger[注意]
最好的预防方式仍旧是不允许**任何SQL片段**由前端传到后台，我们强烈建议不要开放给前端太多的动态 SQL，这样最安全。
:::

通过上述措施，MyBatis-Plus 帮助你构建了一个更加安全的数据库环境，保护了敏感数据不被泄露。
