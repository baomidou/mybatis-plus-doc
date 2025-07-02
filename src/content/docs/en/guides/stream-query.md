---
title: Streaming Query
sidebar:
  order: 5
---

MyBatis-Plus has supported streaming queries since version `3.5.4`, which is a native feature of MyBatis implemented through the `ResultHandler` interface. This query method is suitable for batch data processing or business scenarios involving large datasets.

In `BaseMapper`, several overloaded methods have been added, including `selectList`, `selectByMap`, `selectBatchIds`, `selectMaps`, and `selectObjs`, which can be used in combination with streaming queries.

Note that in older versions of MyBatis-Plus, errors may occur when custom `ResultHandler` is combined with pagination queries. In such cases, the count query needs to be manually disabled. Specific issues and solutions can be found in the related GitHub issue.

## Common Methods

- `getResultObject`: Retrieves each record from the database.
- `getResultCount`: Gets the current count of processed result sets. The counter increments by 1 for each processed record, starting from 1.
- `stop`: Stops further processing of the result set, equivalent to using a `break` statement in a loop.

## Usage Example

The following example demonstrates how to use streaming queries, showing how to fetch data in batches from the database with pagination and how to process all records in a table.

```java
// Using pagination to fetch data in batches for processing, e.g., retrieving 100,000 records from the database for data processing
Page<H2User> page = new Page<>(1, 100000);
baseMapper.selectList(page, Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("Currently processing record " + (++count) + ": " + h2User);
        // Perform your business logic here, such as task distribution
    }
});

// Fetch all records from the database for processing
baseMapper.selectList(Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("Currently processing record " + (++count) + ": " + h2User);
        // Perform your business logic here, such as task distribution
    }
});
```

In the above example, we created a `Page` object to specify pagination parameters, then called the `selectList` method and passed a `ResultHandler` to process each record. In the `handleResult` method of `ResultHandler`, we can retrieve the currently processed record and perform corresponding business logic. The counter `count` allows us to track the number of records processed.
