---
title: Data Security Protection
sidebar:
  order: 16
---

MyBatis-Plus provides data security protection features designed to prevent sensitive information leaks caused by developer turnover. Starting from version 3.3.2, MyBatis-Plus supports enhanced database security through encrypted configurations and data security measures.

## Configuration Security

### YML Configuration Encryption

MyBatis-Plus allows you to use encrypted strings for configuring database connection information. In YML configuration files, items prefixed with `mpw:` are treated as encrypted content.

```yml
spring:
  datasource:
    url: mpw:qRhvCwF4GOqjessEB3G+a5okP+uXXr96wcucn2Pev6Bf1oEMZ1gVpPPhdDmjQqoM
    password: mpw:Hzy5iliJbwDHhjLs1L0j6w==
    username: mpw:Xb+EgsyuYRXw7U7sBJjBpA==
```

### Key Encryption

Use the AES algorithm to generate a random key and encrypt sensitive data.

```java
// Generate a 16-bit random AES key
String randomKey = AES.generateRandomKey();

// Encrypt data using the random key
String encryptedData = AES.encrypt(data, randomKey);
```

### How to Use

Pass the key via command-line arguments when starting the application.

Starting from version 3.5.10, system properties and environment variables are supported for passing the key.

```txt
// Example of Jar startup arguments (set as Program arguments in IDEA or as startup environment variables on the server)
--mpw.key=d1104d7c3b616f0b
```

:::note

- Encrypted configurations must start with the `mpw:` string.
- The random key should be securely stored by the responsible person, and the fewer people who know it, the better.

:::

## Data Security

MyBatis-Plus provides field encryption/decryption and field desensitization features to protect sensitive data stored in databases.

- **Field Encryption/Decryption**: Encrypts specific fields in the database for storage and decrypts them when needed.
- **Field Desensitization**: Processes sensitive fields to hide or obscure sensitive information.

## SQL Injection Protection

MyBatis-Plus offers both automatic and manual methods to check for SQL injection risks.

### Automatic Check

When using the `Wrappers.query()` method, automatic SQL injection checking can be enabled via `.checkSqlInjection()`.

```java
Wrappers.query()
// Enable automatic SQL injection check
.checkSqlInjection().orderByDesc("Any field passed from the frontend. We recommend whitelist processing as the best practice, as there may be cases where checks are not fully comprehensive.")
```

### Manual Validation

Use the `SqlInjectionUtils.check()` method for manual validation.

```java
// Manually validate whether fields passed from the frontend pose SQL injection risks
SqlInjectionUtils.check("Any field passed from the frontend. We recommend whitelist processing as the best practice, as there may be cases where checks are not fully comprehensive.")
```
:::danger[Note]
The best prevention method is still to **not allow any SQL fragments** to be passed from the frontend to the backend. We strongly advise against exposing too much dynamic SQL to the frontend, as this is the most secure approach.
:::

Through these measures, MyBatis-Plus helps you build a more secure database environment, protecting sensitive data from leaks.
