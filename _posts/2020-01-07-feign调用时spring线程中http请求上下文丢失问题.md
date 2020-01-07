---
title: feign调用时spring线程中http请求上下文丢失问题
tags: 
- feign
- hystrix
---

#### 问题描述：

最近在公司微服务项目中，前端页面在调用A服务接口时，网关解析用户token后将用户信息存入http请求头中，然后将请求转发给下游的A服务，此时A服务通过feign调用B服务接口，在调用前，将http请求头中的用户信息写入到即将发起的feign请求的请求头中，但是在请求到达B服务后，发现请求头中用户信息已丢失



#### 问题分析：

在B服务接口对应的feign客户端类中，`@FeignClient`注解配置如下：

```
@FeignClient(
    name = "offline-programming",
    configuration = {FeignHeaderInterceptor.class},
    fallbackFactory = TorqueProcessReleaseOneFeignFallbackFactory.class
)
```

通过`FeignHeaderInterceptor`类将A服务http请求中的用户信息写入B服务接口的feign调用请求中，`FeignHeaderInterceptor`类代码如下：

```
public class FeignHeaderInterceptor implements RequestInterceptor {
    public FeignHeaderInterceptor() {
    }

    public void apply(RequestTemplate template) {
        template.header("source", new String[]{"feign"});
        template.header("userId", new String[]{HttpSimpleUtils.getRequestUserId()});
        template.header("username", new String[]{HttpSimpleUtils.getRequestUsername()});
        template.header("cardNumber", new String[]{HttpSimpleUtils.getRequestUserCardNumber()});
        template.header("identifier", new String[]{HttpSimpleUtils.getRequestIdentifier()});
    }
}
```

`HttpSimpleUtils`用于从http请求获取各种信息，`HttpSimpleUtils`通过 `RequestContextHolder.getRequestAttributes()` 获取当前线程中的http请求上下文，经过断点调试，发现代码执行到`FeignHeaderInterceptor.apply`方法中时，通过`RequestContextHolder.getRequestAttributes()`获取http请求上下文为null，进一步调试发现请求在到达A服务controller时线程id为55，执行到`FeignHeaderInterceptor.apply`方法时，线程id为23，说明发生了线程切换，导致http请求上下文丢失。

feign框架支持hystrix熔断器，并且hystrix熔断器默认使用线程池隔离策略，而在A服务中中的feign启用了hystrix，并且使用了hystrix默认的线程池隔离策略，这就导致A服务调用B服务接口feign时的线程与feign框架处理请求的线程不是同一线程，从而使得http上下文丢失



#### 问题解决：

1.feign禁用hystrix，这样就不会发生线程切换，也就不会丢失http请求上下文

2.设置hystrix隔离策略为信号量，不会发生线程切换



#### 注：

关于hystrix隔离策略的讲解，可以查看[这篇文章](https://www.cnblogs.com/duanxz/p/9681470.html)，写的比较详细
