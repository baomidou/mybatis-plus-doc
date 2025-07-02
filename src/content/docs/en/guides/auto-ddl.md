---
title: Automatic DDL Maintenance
sidebar:
  order: 10
---

In MyBatis-Plus version `3.5.3+`, a powerful feature was introduced: automatic maintenance of database DDL (Data Definition Language) table structures. This functionality achieves database schema initialization and upgrades by executing SQL scripts. Compared to traditional tools like `flyway`, it not only supports sharding databases but also provides control over the code execution process of SQL scripts.

## Feature Overview

- **Automatic DDL History Maintenance**: On first use, the system creates a table named `ddl_history` in the database to record version information of each executed SQL script.
- **Flexible Script Execution**: Supports switching data sources between different databases and dynamically executing corresponding script commands.
- **Enterprise-Grade Feature**: This functionality is considered an advanced enterprise-grade feature and is part of the open-source version.

## Notes

- When performing DDL operations, if the script includes actions to switch data sources for database creation, exceptions may occur. The solution is to dynamically execute script commands after switching to a different database.

## Code Example

The following is a Java component example using MyBatis-Plus for automatic DDL maintenance:

```java
@Component
public class MysqlDdl implements IDdl {

    /**
     * Get the list of SQL script files to execute
     */
    @Override
    public List<String> getSqlFiles() {
        return Arrays.asList(
                "db/tag-schema.sql",
                // Starting from version `3.5.3.2`, stored procedure execution is supported. Append `#$$` after the filename, where `$$` is a custom full SQL delimiter.
                // Stored procedure scripts end with `END`, and the delimiter `END;$$` is appended to indicate script completion.
                "db/procedure.sql#$$",
                "D:\\db\\tag-data.sql"
        );
    }
}

// Switch to the MySQL secondary database and execute SQL scripts (this feature is not available in the open-source version)
ShardingKey.change("mysqlt2");
ddlScript.run(new StringReader("DELETE FROM user;\n" +
        "INSERT INTO user (id, username, password, sex, email) VALUES\n" +
        "(20, 'Duo', '123456', 0, 'Duo@baomidou.com');"));
```

In this example, we define a `MysqlDdl` component that implements the `IDdl` interface and provides a list of SQL script files to execute. By calling the `ShardingKey.change` method, we can switch to the MySQL secondary database and use the `ddlScript.run` method to execute specific SQL scripts.

This approach provides an efficient and automated way to manage database DDL operations, significantly simplifying the management and maintenance of database structures.

## Custom Runner

If the MyBatis-Plus starter is integrated, a `DdlApplicationRunner` instance will be automatically instantiated to execute DDL scripts.

The execution mode is auto-commit transactions, and errors are ignored to continue execution (other script parameters are as follows).

If custom control is needed, manually inject a `DdlApplicationRunner` instance into the container.

```java
    @Bean
    public DdlApplicationRunner ddlApplicationRunner(List<IDdl> ddlList) {
          DdlApplicationRunner ddlApplicationRunner = new DdlApplicationRunner(ddlList);
        // The following properties are available starting from 3.5.11 ...
        // Set whether to auto-commit. Default: true
        ddlApplicationRunner.setAutoCommit(false);
        // Set the error handling mode for scripts. Default: Ignore errors, log exceptions (if set to throw exceptions, it will terminate the next SQL file processing)
        ddlApplicationRunner.setDdlScriptErrorHandler(DdlScriptErrorHandler.ThrowsErrorHandler.INSTANCE);
        // Whether to throw exceptions to interrupt the next handler. Default: false
        ddlApplicationRunner.setThrowException(true);
        ddlApplicationRunner.setScriptRunnerConsumer(scriptRunner -> {
            scriptRunner.setLogWriter(null);   // Disable execution log printing. Default: System.out
            scriptRunner.setErrorLogWriter(null); // Disable error log printing. Default: System.err
            scriptRunner.setStopOnError(true); // Whether to stop on exceptions
            scriptRunner.setRemoveCRs(false); // Whether to replace \r\n with \n. Default: false
        });
        return ddlApplicationRunner;
    }
```
