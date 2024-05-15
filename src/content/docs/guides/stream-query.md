---
title: 流式查询
sidebar:
  order: 5
---

MyBatis-Plus 从 `3.5.4` 版本开始支持流式查询，这是 MyBatis 的原生功能，通过 `ResultHandler` 接口实现结果集的流式查询。这种查询方式适用于数据跑批或处理大数据的业务场景。

在 `BaseMapper` 中，新增了多个重载方法，包括 `selectList`, `selectByMap`, `selectBatchIds`, `selectMaps`, `selectObjs`，这些方法可以与流式查询结合使用。

需要注意的是，在低版本的 MyBatis-Plus 中，如果自定义 `ResultHandler` 结合分页查询，可能会出现错误。在这种情况下，需要手动关闭 count 查询。具体问题和解决方案可以参考 GitHub 上的相关 issue。

## 常用方法

- `getResultObject`: 获取数据库中的每一条记录。
- `getResultCount`: 获取当前处理的结果集条数，每处理一条记录，该计数器会加1，计数从1开始。
- `stop`: 停止继续处理结果集，相当于在循环中使用 `break` 语句。

## 使用示例

以下是使用流式查询的示例代码，展示了如何结合分页从数据库中拉取数据进行批量处理，以及如何获取表中的所有记录进行处理。

```java
// 结合分页，按批次从数据库拉取数据出来跑批，例如从数据库获取10万记录，做数据处理
Page<H2User> page = new Page<>(1, 100000);
baseMapper.selectList(page, Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("当前处理第" + (++count) + "条记录: " + h2User);
        // 在这里进行你的业务处理，比如分发任务
    }
});

// 从数据库获取表所有记录，做数据处理
baseMapper.selectList(Wrappers.emptyWrapper(), new ResultHandler<H2User>() {
    int count = 0;
    @Override
    public void handleResult(ResultContext<? extends H2User> resultContext) {
        H2User h2User = resultContext.getResultObject();
        System.out.println("当前处理第" + (++count) + "条记录: " + h2User);
        // 在这里进行你的业务处理，比如分发任务
    }
});
```

在上述示例中，我们创建了一个 `Page` 对象来指定分页参数，然后调用 `selectList` 方法并传入 `ResultHandler` 来处理每一条记录。在 `ResultHandler` 的 `handleResult` 方法中，我们可以获取当前处理的记录，并进行相应的业务处理。通过计数器 `count`，我们可以知道当前处理的是第几条记录。