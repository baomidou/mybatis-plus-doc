---
title: Preventing Security Vulnerabilities
sidebar:
  order: 5
---

Software vulnerabilities can cause severe harm to systems. If maliciously exploited, they may lead to virus infections, data leaks or corruption, and even direct or indirect financial losses. So, how can we prevent these vulnerabilities? Before delving into the issue, it's essential to first understand what a vulnerability is.

## What is a Vulnerability?

A vulnerability refers to a security weakness or flaw in software, systems, or networks that may allow the system to be attacked or misused. In the field of computer security, vulnerabilities typically stem from programming errors, design flaws, or configuration mistakes.

For Object-Relational Mapping (ORM) frameworks, vulnerabilities usually refer to security issues in design or implementation that may expose applications to risks such as SQL injection attacks.

:::note[SQL Injection Vulnerability]
If an ORM framework fails to properly filter or escape user input when executing SQL operations, attackers can exploit malicious input to perform unauthorized database operations, leading to data leaks, corruption, or tampering.
:::

Under what circumstances can SQL injection attacks occur? Typically, it happens in the following scenarios:

- **Table Structure Part**: Usually includes fixed content such as table fields and table names.
- **Field Parameters/Variables Part**: Involves various dynamic SQL parameters.

Most SQL injection vulnerabilities in ORMs occur because these two parts allow parameters to be passed from the frontend.

## How to Prevent Vulnerabilities

Understanding the root causes of vulnerabilities, we can mitigate attacks by controlling table structures and parameter-related data, ensuring they are not exposed to the frontend.

### Table Fields Part

For table fields, the backend should typically control them. However, some systems allow frontend dynamic input of database field names to maintain flexibility. While this meets system flexibility requirements, it poses significant SQL injection risks.

To mitigate these risks, system designers or developers must enforce field security. Never allow arbitrary frontend strings to be directly converted into SQL fields. Instead, use field mapping logic to block attacks, preventing frontend input from directly entering the SQL compilation phase.

### Field Parameters/Variables Part

For field parameters, ORM frameworks usually employ precompilation to prevent SQL injection attacks. In MyBatis, for example, using the `#` placeholder instead of `$` helps avoid SQL injection.

MyBatis-Plus generates SQL using the same underlying capabilities as MyBatis, so it also supports the `#` placeholder to prevent attacks—though this step is automated by MyBatis-Plus.

### Using Utility Classes for Prevention

Generally, the above measures suffice to prevent SQL injection attacks. If additional assurance is needed, MyBatis-Plus provides the utility class `SqlInjectionUtils.check(content)` to validate strings for SQL injection. If detected, it throws an exception.

```java
// Enable automatic SQL injection checks (supported in version 3.5.3.2+)
Wrappers.query().checkSqlInjection().orderByDesc("Any frontend-passed field. We recommend whitelisting due to potential coverage gaps.")
​
// Manual validation (supported in version 3.4.3.2+)
SqlInjectionUtils.check("Any frontend-passed field. We recommend whitelisting due to potential coverage gaps.")
```

:::danger[Note]
The best prevention is still to **never allow any SQL fragments** to be passed from the frontend to the backend. We strongly advise against exposing too much dynamic SQL to the frontend for maximum security.
:::

## Clarification on Malicious Vulnerabilities

MyBatis-Plus-related code and JARs have been submitted for CVE vulnerabilities by individuals with ulterior motives. Below is the official statement on these vulnerabilities.

**Reminder!** Please note that these "CVE vulnerabilities," **not officially recognized**, significantly impact the framework, users, and project delivery. Your **harmful actions** cause substantial financial losses to others.

If an unsafe design exists, the best approach is to submit an **issue or pull request** to assist the official team in fixing it promptly.

The official documentation has **repeatedly emphasized** that **SQL fragments must be checked for security**. Any **ORM framework, including JDBC**, allows **direct string concatenation for SQL**. Therefore, we recommend never allowing frontend-passed SQL fragments.

### CVE-2024-35548

Details: [CVE-2024-35548](https://www.cve.org/CVERecord?id=CVE-2024-35548)

This "vulnerability" also involves frontend-passed **SQL fragments** leading to SQL injection attacks. The framework's `QueryWrapper` and `UpdateWrapper` allow subqueries in field parts, so frontend-passed SQL fragments should never be permitted.

If such functionality is needed, use `SqlInjectionUtils.check(content)` or `xxWrapper.checkSqlInjection()` to validate. If the check passes, no exception is thrown.

The framework also provides stricter condition builders like `LambdaQueryWrapper` and `LambdaUpdateWrapper`, which we recommend using.

### CVE-2023-25330

Details: [CVE-2023-25330](https://nvd.nist.gov/vuln/detail/CVE-2023-25330)

This "vulnerability" describes a so-called multi-tenant plugin issue, claiming it causes SQL injection attacks. Let's examine how this works.

The submitter maliciously exposed the tenant ID to the frontend, allowing it to be passed and stored in the context, which the plugin directly reads and uses during execution.

For those familiar with tenant isolation, the standard practice is for the backend to query the tenant associated with the logged-in user and maintain the context automatically to ensure the plugin functions correctly.

Even if tenant switching is required, the frontend-passed tenant ID should never be directly used by the plugin—it must first be verified.

If this is labeled a problem, it stems from improper usage. As a foundational framework, it cannot dictate how users employ its features. If everything requires the framework to handle, why bother contributing to open source? Just be a freeloader.

### CVE-2022-25517

Details: [CVE-2022-25517](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-25517). Since the original repository has been deleted, [view the analysis here](https://mp.weixin.qq.com/s/NdtCuDFK-aTgaQUADtdfnA).

This "vulnerability" is even more absurd. It involves passing table fields as frontend input for direct concatenation, then falsely labeling it a vulnerability. The reasoning? Because MyBatis-Plus allows String-type field parameters, they can be used to pass SQL attack scripts.

We all know MyBatis-Plus provides `LambdaQueryWrapper` for type-safe queries, and we believe most users employ it this way. Even with the standard `QueryWrapper`, String-type fields are never passed from the frontend—if fields come from the frontend, what’s the backend for? Just let the frontend write SQL directly.

------

For genuine vulnerabilities, we actively address them. However, the above two "vulnerabilities" are such low-level mistakes that submitting CVE applications without prior communication makes it hard to believe these were善意提醒 (good-faith reminders). To us, this is纯粹坏心思 (pure malice).
