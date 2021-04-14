[TOC]



在java原生的RMI服务的发布过程中，我们需要经历“编写服务->创建接口->运行RMI编译器”，“创建客户端和服务端->启动RMI注册表->注册服务”，工作步骤繁琐，同时我们需要强制捕获很多的异常，而这些异常通常都是不能在catch中解决的致命错误。

spring提供了更简单的方式来发布和使用RMI服务，我们不需要在编写捕获那些异常模版，只需要关注服务的创建即可。同时在使用RMI服务时，可以直接作为bean使用@AutoWired自动注入。



# 1 服务端

将 UserServiceImpl 发布为RMI服务。

```
@Bean
public RmiServiceExporter rmiExporter(UserService userService){
    RmiServiceExporter rmiExporter = new RmiServiceExporter();
    rmiExporter.setService(userService);
    rmiExporter.setServiceName("UserService");
    rmiExporter.setServiceInterface(UserService.class);
    //也可以将服务绑定到不同的端口或主机上的RMI注册表
    rmiExporter.setRegistryHost("www.don9.cn");
    rmiExporter.setRegistryPort(9999);
    return rmiExporter;
} 
```

只需上述简单的配置,我们便成功发布了一个RMI服务。



# 2 客户端

```
@Bean
public RmiProxyFactoryBean userService(){
    RmiProxyFactoryBean rmiProxy = new RmiProxyFactoryBean();
    rmiProxy.setServiceUrl("rmi://www.don9.cn/UserService");
    rmiProxy.setServiceInterface(UserService.class);
    return rmiProxy;
}
```



# 3 限制

1. RMI很难穿越防火墙，因为RMI使用任意端口来交互，通常这是防火墙不允许的。

2. RMI是基于java的，这就要求客户端和服务端必须是java开发的。