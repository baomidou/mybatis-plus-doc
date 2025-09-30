---
title: Preventing Security Vulnerabilities
sidebar:
  order: 5
---

Software vulnerabilities can cause serious harm to systems. If maliciously exploited, they can lead to virus infections, data leakage or corruption risks, and may also result in direct or indirect financial losses. So, how should we prevent these vulnerabilities? Before delving into vulnerability issues, we first need to understand what a vulnerability is.

## What is a Vulnerability?

A vulnerability refers to a security weakness or flaw present in software, systems, or networks. These weaknesses may allow the system to be attacked or misused. In the field of computer security, vulnerabilities typically stem from programming errors, design defects, or configuration mistakes.

For Object-Relational Mapping (ORM) frameworks, vulnerabilities usually refer to security issues in design or implementation that might expose applications to the risk of SQL injection attacks.

:::note[SQL Injection Vulnerability]
If an ORM framework does not properly filter or escape user input when executing SQL operations, attackers can exploit malicious input data to perform unauthorized database operations, leading to data leakage, corruption, or tampering.
:::

Under what circumstances can SQL injection attacks occur? Typically, it happens in the following situations:

- **Table Structure Part:** Usually contains fixed content like table fields, table names, etc.
- **Table Field Parameters/Variables Part:** Involves various dynamic SQL parameters.

Usually, SQL injection vulnerabilities in ORMs occur because these two parts allow parameters to be passed from the frontend.

## How to Prevent Vulnerabilities

Understanding the main causes of vulnerabilities, we only need to control the data related to the table structure and parameters, preventing them from being exposed to the frontend to avoid vulnerability attacks.

### Table Field Part

The table field part should generally be controlled by the backend. However, some systems, to maintain sufficient flexibility, allow the frontend to dynamically pass database field names. While this practice meets the system's flexibility requirements, it faces significant SQL injection risks.

To mitigate this risk, system designers or developers must control the security of the fields themselves. They must absolutely prevent arbitrary strings passed from the frontend interface from being directly converted into SQL fields. Field mapping logic should be used to block attacks, ensuring that field content passed from the frontend interface does not directly enter the SQL compilation stage to generate the final SQL.

### Field Parameter/Variable Part

For the field parameter part, ORM frameworks usually have precompilation logic to prevent SQL injection attacks. In MyBatis, this is achieved by using the `#` placeholder instead of the `$` placeholder to avoid SQL injection attacks.

MyBatis-Plus's underlying capability for generating related SQL also comes from MyBatis, so it similarly can use the `#` placeholder to prevent attacks. However, this step is automatically handled by MyBatis-Plus.

### Using Utility Classes for Prevention

Generally, the above measures are sufficient to prevent SQL injection attacks. If you are still concerned, you can use the utility class provided by MyBatis-Plus: `SqlInjectionUtils.check(content)` to verify if a string contains SQL injection. If it does, a corresponding exception will be thrown.

```java
// Enable automatic SQL injection check (Supported in version 3.5.3.2+)
Wrappers.query().checkSqlInjection().orderByDesc("Any field passed from the frontend. We recommend using a whitelist approach, as there might be cases not fully covered by the check.")

// Manual verification method (Supported in version 3.4.3.2+)
SqlInjectionUtils.check("Any field passed from the frontend. We recommend using a whitelist approach, as there might be cases not fully covered by the check.")
```

:::danger[Note]
The best prevention method is still to **not allow any SQL fragments** to be passed from the frontend to the backend. We strongly advise against giving the frontend too much freedom with dynamic SQL; this is the safest approach.
:::

## Statement Regarding Malicious Vulnerabilities

MyBatis-Plus related code and JAR packages have been submitted for CVE vulnerabilities by individuals with ulterior motives. Below is the official statement regarding these vulnerabilities.

Reminder! `Please note that these "CVE vulnerabilities," which are not recognized by the official team,` have a very significant impact on the framework itself, its users, and project delivery. Your `actions, which harm others without benefiting yourself,` cause substantial economic losses to others.

If there is an unsafe design, the best approach is to assist the official team in fixing it as soon as possible via `issue or pull request`.

The official documentation has also `repeatedly` emphasized that `SQL fragments` must be checked for security. Any `ORM framework, including JDBC,` allows situations where `strings are directly concatenated into SQL`. Therefore, we recommend not allowing the frontend to pass SQL fragments whenever possible.

### CVE-2024-35548

Details link: [CVE-2024-35548](https://www.cve.org/CVERecord?id=CVE-2024-35548)

This "vulnerability" also involves passing `SQL fragments` from the frontend leading to SQL injection attacks. The framework's `QueryWrapper` and `UpdateWrapper` allow subqueries in the field section, so one should not manually allow the frontend to pass SQL fragments.

If users have such a requirement, they can use the `SqlInjectionUtils.check(content)` or `xxWrapper.checkSqlInjection()` methods to check. If the check passes, no exception will be thrown.

The framework also provides very strict condition constructors: `LambdaQueryWrapper` and `LambdaUpdateWrapper`, which are recommended for use.

### CVE-2023-25330

Details link: [CVE-2023-25330](https://nvd.nist.gov/vuln/detail/CVE-2023-25330)

This "vulnerability" describes a so-called vulnerability caused by the multi-tenant plugin, claiming it leads to SQL injection attacks. Let's see how this is supposedly done?

The submitter of this "vulnerability" maliciously exposed the tenant ID to the frontend, allowed the frontend to pass the tenant ID, and maintained it in the context, which was then directly read and used during the plugin's execution phase.

If we have worked on tenant isolation requirements, we understand that the usual practice is for the backend to query the user's corresponding tenant after login and maintain the context itself to ensure the proper operation of the multi-tenant plugin.

Even if there is a need to switch tenants, the tenant ID passed from the frontend for switching cannot be directly used by the plugin; it must be checked to see if the switch is permissible.

If one insists this is a problem, it is caused by improper usage considerations. As an underlying framework, it cannot constrain how users ultimately use these features. If the underlying framework has to handle everything, then everyone might as well be a passive recipient; let's not engage in open source at all.

### CVE-2022-25517

Details link: [CVE-2022-25517](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-25517). Since the original vulnerability repository has been deleted, you can [view the detailed analysis here](https://mp.weixin.qq.com/s/NdtCuDFK-aTgaQUADtdfnA).

This "vulnerability" is even more absurd. It involves using table fields as a part that can be passed from the frontend for direct concatenation and then forcefully labeling this as a vulnerability. The reasoning is that because MyBatis-Plus exposes String-type field parameters, they can be used to pass SQL attack scripts.

We all know that MyBatis-Plus provides `LambdaQueryWrapper`, which can be used to perform type-safe queries. We believe the vast majority of users utilize it this way. Even if the ordinary `QueryWrapper` is used with String-type fields, those fields are definitely not passed by the frontend. If fields are all passed by the frontend, what is the purpose of the backend? Just let the frontend write the SQL directly.

------

If they were genuine vulnerability issues, we would actively correct them. However, given the low-level nature of the errors mentioned above and the fact that the CVE vulnerability applications were submitted without prior communication with us, it is difficult to believe these vulnerabilities were submitted with good intentions by well-meaning individuals. In our view, this is purely malicious intent.
