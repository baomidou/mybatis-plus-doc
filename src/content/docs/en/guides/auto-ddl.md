---
title: Automatic DDL Maintenance
sidebar:
  order: 10
---

Starting from MyBatis-Plus version `3.5.3+`, a powerful feature has been introduced: automatic maintenance of database DDL (Data Definition Language) table structures. This feature achieves database schema initialization and upgrades by executing SQL scripts. Compared to traditional tools like `flyway`, it not only supports sharding databases but also allows control over the code execution process of SQL scripts.

## Feature Overview

- **Automatic DDL History Maintenance**: Upon first use, the system automatically creates a table named `ddl_history` in the database to record version information for each executed SQL script.
- **Flexible Script Execution**: Supports switching data sources between different databases and dynamically executing corresponding script commands.
- **Enterprise-Grade Feature**: This functionality is considered an advanced, enterprise-grade feature and is included as part of the open-source version.

## Important Notes

- When performing DDL operations, if the script includes actions to switch data sources for database creation, exceptions might occur. The solution is to dynamically execute the script command after switching to the target database.

## Code Example

The following is a Java component example demonstrating the use of MyBatis-Plus for automatic DDL maintenance:

```java
@Component
public class MysqlDdl implements IDdl {

    /**
     * Get the list of SQL script files to be executed.
     */
    @Override
    public List<String> getSqlFiles() {
        return Arrays.asList(
                "db/tag-schema.sql",
                // Starting from version `3.5.3.2`, stored procedure execution is supported. Append `#$$` to the filename, where `$$` is a custom full SQL delimiter.
                // Stored procedure scripts end with `END`, and the delimiter `END;$$` is appended to signify the script's end.
                "db/procedure.sql#$$",
                "D:\\db\\tag-data.sql"
        );
    }
}

// Switch to the MySQL replica and execute SQL script (This feature is not available in the open-source version)
ShardingKey.change("mysqlt2");
ddlScript.run(new StringReader("DELETE FROM user;\n" +
        "INSERT INTO user (id, username, password, sex, email) VALUES\n" +
        "(20, 'Duo', '123456', 0, 'Duo@baomidou.com');"));
```

In this example, we define a `MysqlDdl` component that implements the `IDdl` interface and provides the list of SQL script files to be executed. By calling the `ShardingKey.change` method, we can switch to a MySQL replica and use the `ddlScript.run` method to execute specific SQL scripts.

This approach provides an efficient and automated way to manage database DDL operations with MyBatis-Plus, significantly simplifying the management and maintenance of database structures.

## Custom Runner

If the MyBatis-Plus starter is integrated, a `DdlApplicationRunner` instance will be automatically instantiated to execute the DDL scripts.

By default, execution uses auto-commit transactions and ignores errors to continue execution (see other script parameters below).

If you need custom control, please manually inject a `DdlApplicationRunner` instance into the container.

```java
    @Bean
    public DdlApplicationRunner ddlApplicationRunner(List<IDdl> ddlList) {
          DdlApplicationRunner ddlApplicationRunner = new DdlApplicationRunner(ddlList);
        // The following properties are available starting from 3.5.11 ...
        // Set whether to auto-commit. Default: true
        ddlApplicationRunner.setAutoCommit(false);
        // Set the error handling strategy for scripts. Default: Ignore errors, print exception (If set to throw exception, it will terminate processing of the next SQL file)
        ddlApplicationRunner.setDdlScriptErrorHandler(DdlScriptErrorHandler.ThrowsErrorHandler.INSTANCE);
        // Whether to throw an exception and interrupt processing by the next handler. Default: false
        ddlApplicationRunner.setThrowException(true);
        ddlApplicationRunner.setScriptRunnerConsumer(scriptRunner -> {
            scriptRunner.setLogWriter(null);   // Turn off execution log printing. Default: System.out
            scriptRunner.setErrorLogWriter(null); // Turn off error log printing. Default: System.err
            scriptRunner.setStopOnError(true); // Whether to stop on error
            scriptRunner.setRemoveCRs(false); // Whether to replace \r\n with \n. Default: false
        });
        return ddlApplicationRunner;
    }
```
