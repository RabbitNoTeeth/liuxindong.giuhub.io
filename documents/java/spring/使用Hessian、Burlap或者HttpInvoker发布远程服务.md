[TOC]



# 1 简介

## 1.1 Hession/Burlap

**优点**

两者都是基于http的轻量级远程服务解决方案。

Hessian的消息是二进制的，可以移植到其他语言中，如php、python、c等，而Burlap的消息是xml，这使得它可以移植到任何能够解析xml的语言上。这两者都解决了RMI在防火墙和跨语言上的限制，并且Hessian的消息在带宽上更有优势，Burlap的消息可读性更好。



**缺点**

在传递的RPC消息中含有序列化对象时，RMI更有优势，因为Hession/Burlap采用了私有的序列化机制，RMI使用的是java本身的序列化机制，当数据模型非常复杂时，Hession/Burlap的序列化模型可能无法胜任。



## 1.2 Spring HttpInvoker

**优点**

基于http，使用java的序列化机制，解决了Hession、Burlap和RMI中的限制。



**缺点**

作为spring框架的一部分，这就要求服务端和客户端在都是java的同时，还都要使用spring。



# 2 发布服务

```
########## Hessian #########
@Bean
public HessianServiceExporter hessianUserService(UserService userService){
	HessianServiceExporter exporter = new HessianServiceExporter();
	exporter.setService(userService);
	exporter.setServiceInterface(UserService.class);
	return exporter;
}

######### Burlap #########
@Bean
public BurlapServiceExporter burlapUserService(UserService userService){
	BurlapServiceExporter exporter = new BurlapServiceExporter();
	exporter.setService(userService);
	exporter.setServiceInterface(UserService.class);
	return exporter;
}

######## HttpInvoker #######
@Bean
public HttpInvokerServiceExporter burlapUserService(UserService userService){
	HttpInvokerServiceExporter exporter = new HttpInvokerServiceExporter();
	exporter.setService(userService);
	exporter.setServiceInterface(UserService.class);
	return exporter;
}
```



# 3 配置控制器

因为三者都是基于http，所以三者的访问都需要SpringMVC控制器的拦截处理。

```
######## web.xml文件中配置 #########
<servlet-mapping>
	<servlet-name>userService</servlet-name>
	<url-pattern>*.service</url-pattern>
</servlet-mapping>

####### 如果使用javaConfig配置 ########
1.通过实现WebApplicationInitializer来配置DispatcherServlet时
ServletRegistration.Dynamic dispatcher = container.addServlet(
	"appServlet",new DispatcherServlet(dispatcherServletContext));
dispatcher.setLoadOnstartup(1);
dispatcher.addMapping("/");
dispatcher.addMapping("*.service");

2.通过扩展AbstractDispatcherServletInitializer或AbstractAnnotationConfigDispatcherServletInitializer来配置DispatherServlet时,
覆盖下面的方法
@Override
public String[] getServletMappings(){
	return new String[] {"/","*.service"};
}
```



# 4 配置映射器

```
@Bean
public HandlerMapping userServiceMapping(){
	SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
	Properties mappings = new Properties();
	mappings.setProperty("/user.service","hessianUserService");
	mapping.setMappings(mappings);
	return mapping;
}
```



# 5 访问服务

```
######## Hession ########
@Bean
public HessionProxyFactoryBean userService(){
	HessionProxyFactoryBean proxy = new HessionProxyFactoryBean();
	proxy.setServiceUrl("http://www.don9.cn/user/user.service");
	proxy.setServiceInterface(UserService.class);
	return proxy;
}

######## Burlap ########
@Bean
public BurlapProxyFactoryBean userService(){
	BurlapProxyFactoryBean proxy = new BurlapProxyFactoryBean();
	proxy.setServiceUrl("http://www.don9.cn/user/user.service");
	proxy.setServiceInterface(UserService.class);
	return proxy;
}

######## HttpInvoker ########
@Bean
public HttpInvokerProxyFactoryBean userService(){
	HttpInvokerProxyFactoryBean proxy = new HttpInvokerProxyFactoryBean();
	proxy.setServiceUrl("http://www.don9.cn/user/user.service");
	proxy.setServiceInterface(UserService.class);
	return proxy;
}
```