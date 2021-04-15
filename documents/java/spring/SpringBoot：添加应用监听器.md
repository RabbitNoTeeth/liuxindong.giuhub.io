[TOC]

SpringBoot提供了自身生命周期内的多种事件，可以针对每个特定的事件编写监听，实现一些特殊的需求，比如在spring容器中类全部装载完毕后做一些事情，或者在spring boot应用启动成功或者失败后记录日志等。



# 1 监听器接口

Spring boot提供了一个监听器接口，ApplicationListener，下面是其源码：

```
@FunctionalInterface
public interface ApplicationListener<E extends ApplicationEvent> extends EventListener {

   /**
    * Handle an application event.
    * @param event the event to respond to
    */
   void onApplicationEvent(E event);

}
```

我们在定义自己的监听器时，只需要实现该接口即可，接口泛型E表示spring应用的各种事件，稍后会重点介绍几个常用的时间。（仔细看该接口的注解，发现该接口被声明为一个函数式接口，也就是说也可以通过lamda表达式的方式来创建监听器，后面将给出具体示例）



# 2 常用的spring应用事件



|                事件                 |                                                              |
| :---------------------------------: | :----------------------------------------------------------: |
|        ContextRefreshedEvent        |           容器刷新，包括加载完毕或者添加/删除bean            |
|      ApplicationStartingEvent       | 应用开始运行时触发，此时除了监听器和初始化器已经注册之外，其他动作都还没有执行 |
| ApplicationEnvironmentPreparedEvent |         应用环境配置加载完毕，但是还未创建容器上下文         |
|      ApplicationPreparedEvent       |          应用刷新前触发，此时bean已经被定义加载完毕          |
|       ApplicationStartedEvent       |           应用刷新后触发，但是在应用程序被调用之前           |
|        ApplicationReadyEvent        |    应用程序被调用后触发，此时表示应用程序已经完全准备完毕    |
|       ApplicationFailedEvent        |                  应用由于异常启动失败时触发                  |



# 3 添加自定义的监听器

## 3.1 注解方式

```
@Component
public class MyListener implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // do something...
    }
}
```



## 3.2 编程方式

```
springApplication.addListeners((ContextRefreshedEvent event) -> {
    // do something...
});
```