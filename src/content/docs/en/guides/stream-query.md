---
title: Stream Query
sidebar:
  order: 5
---

MyBatis-Plus has supported stream queries since version `3.5.4`. This is a native MyBatis feature implemented through the `ResultHandler` interface for streaming result sets. This query method is suitable for batch data processing or business scenarios handling large datasets.

In `BaseMapper`, several overloaded methods have been added, including `selectList`, `selectByMap`, `selectBatchIds`, `selectMaps`, and `selectObjs`. These methods can be used in combination with stream queries.

Note that in older versions of MyBatis-Plus, using a custom `ResultHandler` with pagination queries might cause errors. In such cases, you need to manually disable the count query. For specific issues and solutions, please refer to the relevant GitHub issue.

## Common Methods

- `getResultObject`: Retrieves each record from the database.
- `getResultCount`: Gets the current count of processed result set records. This counter increments by 1 for each processed record, starting from 1.
- `stop`: Stops further processing of the result set, equivalent to using a `break` statement in a loop.

## Usage Examples

The following example code demonstrates how to use stream queries, showing how to pull data from the database in batches using pagination for processing, and how to retrieve all records from a table for processing.

```java
// Using pagination to pull data from the database in batches for processing, e.g., fetching 100,000 records from the database for data processing
Page<H2User> page = new Page<>(1, 100000);
baseMapper.selectList(page, Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("Currently processing record " + (++count) + ": " + h2User);
        // Perform your business logic here, such as distributing tasks
    }
});

// Retrieve all records from the database table for data processing
baseMapper.selectList(Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("Currently processing record " + (++count) + ": " + h2User);
        // Perform your business logic here, such as distributing tasks
    }
});
```

In the examples above, we create a `Page` object to specify pagination parameters, then call the `selectList` method and pass in a `ResultHandler` to process each record. Inside the `handleResult` method of the `ResultHandler`, we can access the currently processed record and perform corresponding business logic. Using the `count` variable, we can track which record number is currently being processed.
