---
title: 流式查询
sidebar:
  order: 5
---
# 流式查询
- `3.5.4 +` 版本支持
- 功能为Mybatis原生功能,通过ResultHandler进行结果集流式查询
- 适用数据跑批或大数据业务处理场景
- BaseMapper新增重载方法 `selectList`,`selectByMap`,`selectBatchIds`,`selectMaps`,`selectObjs`
- 低版本下自定义ResultHandler结合分页会出现错误,需要手动将count查询关闭  [分页插件问题无法正确处理使用ResultHandler参数的查询接口](https://github.com/baomidou/mybatis-plus/issues/5691#top)

# 常用方法

- getResultObject:  获取数据库每一条记录
- getResultCount: 获取下一条结果集都会滚动+1, 等同于下标记录,从1开始
- stop: 停止继续处理,等同于break出去

# 使用示例

```java
// 结合分页,按批次从数据库拉去数据出来跑批,例如从数据库获取10w记录,做数据处理
Page<H2User> page = new Page<>(1, 100000);
baseMapper.selectList(page, Wrappers.emptyWrapper(), resultContext -> {
    // 依次得到每条业务记录
    System.out.println("当前处理第" + resultContext.getResultCount() + "条记录.");
    H2User h2User = resultContext.getResultObject();
    System.out.println(h2User);
    //做自己的业务处理,比如分发任务
});

// 从数据库获取表所有记录,做数据处理
baseMapper.selectList(Wrappers.emptyWrapper(), resultContext -> {
    // 依次得到每条业务记录
    System.out.println("当前处理第" + resultContext.getResultCount() + "条记录.");
    H2User h2User = resultContext.getResultObject();
    System.out.println(h2User);
    //做自己的业务处理,比如分发任务
});
```