---
title: Data Security Protection
sidebar:
  order: 16
---

MyBatis-Plus provides data security protection features designed to prevent sensitive information leaks caused by developer turnover. Starting from version 3.3.2, MyBatis-Plus supports enhanced database security through encrypted configuration and data security measures.

## Configuration Security

### YML Configuration Encryption

MyBatis-Plus allows you to use encrypted strings to configure database connection information. In YML configuration files, configuration items starting with `mpw:` are treated as encrypted content.

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
// Example Jar startup parameter (set as Program arguments in IDEA, or as startup environment variables on the server)
--mpw.key=d1104d7c3b616f0b
```

:::note

- Encrypted configurations must start with the `mpw:` string.
- The random key should be properly safeguarded by the responsible person, and known by as few people as possible.

:::

## Data Security

MyBatis-Plus provides field encryption/decryption and field data masking features to protect sensitive data stored in the database.

- **Field Encryption/Decryption**: Encrypts specific fields in the database for storage and decrypts them when needed for use.
- **Field Data Masking**: Applies masking to sensitive fields to hide or obscure sensitive information.

## SQL Injection Security Protection

MyBatis-Plus provides both automatic and manual methods to check for SQL injection risks.

### Automatic Check

When using the `Wrappers.query()` method, automatic checking can be enabled via `.checkSqlInjection()`.

```java
Wrappers.query()
// Enable automatic SQL injection check
.checkSqlInjection().orderByDesc("Any field passed from the frontend; we recommend using an allowlist approach, as coverage might be incomplete")
```

### Manual Validation

Use the `SqlInjectionUtils.check()` method for manual validation.

```java
// Manually validate if fields passed from the frontend pose SQL injection risks
SqlInjectionUtils.check("Any field passed from the frontend; we recommend using an allowlist approach, as coverage might be incomplete")
```
:::danger[Note]
The best prevention method is still to **not allow any SQL fragments** to be passed from the frontend to the backend. We strongly advise against giving the frontend too much dynamic SQL capability, as this is the most secure approach.
:::

Through the above measures, MyBatis-Plus helps you build a more secure database environment, protecting sensitive data from being leaked.
