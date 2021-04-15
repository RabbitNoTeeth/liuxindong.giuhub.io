[TOC]



# 1 自定义监听器

J2EE规范中，提供了多种不同的监听器，分别用于监听指定的事件，下面是开发中常用的几种监听器：

1. ServletContextListener

   监听context的创建和销毁。

2. ServletContextAttributeListener

   监听context中的属性变化（添加、更新、移除）。

3. ServletRequestListener

   监听request请求的创建与销毁。

4. ServletRequestAttributeListener

   监听request中的属性变化（添加、更新、移除）。

5. HttpSessionLister

   监听session的创建与销毁。

6. HttpSessionAttributeLister

   监听session中的属性变化（添加、更新、移除）。

7. HttpSessionBindingListener

   监听session中对象的绑定，当对象被添加到session中时，执行valueBound方法；当对象从session中删除时，执行valueUnbound方法。

8. HttpSessionActivationListener

   服务器关闭时，会执行sessionWillPassivate方法将session中的内容保存到硬盘中，也称之为钝化；对象被重新加载时，执行sessionDidActivate方法 。



此处以ServletRequestListener为例，创建自定义监听：

```
public class TestListener implements ServletRequestListener {
    @Override
    public void requestDestroyed(ServletRequestEvent servletRequestEvent) {
        System.out.println("ServletRequest init");
    }

    @Override
    public void requestInitialized(ServletRequestEvent servletRequestEvent) {
        System.out.println("ServletRequest destroy");
    }
}
```



# 2 注册监听器

## 2.1 注解方式

① 在SpringBoot启动类中配置@ServletComponentScan扫描@WebListener注解。

② 对自定义的监听器TestListener 使用@WebListener注解。



示例

```
@SpringBootApplication
@ServletComponentScan   // ①
public class JeeDemoApplication {

   public static void main(String[] args) {
      SpringApplication.run(JeeDemoApplication.class, args);
   }
}


@WebListener	// ②
public class TestListener implements ServletRequestListener {
    @Override
    public void requestDestroyed(ServletRequestEvent servletRequestEvent) {
        System.out.println("ServletRequest init");
    }

    @Override
    public void requestInitialized(ServletRequestEvent servletRequestEvent) {
        System.out.println("ServletRequest destroy");
    }
}
```



## 2.2 JavaConfig方式

```
@Configuration
public class ListenerConfiguration {
    
    @Bean
    public ServletListenerRegistrationBean addListener(){
        ServletListenerRegistrationBean<TestListener> servletListenerRegistrationBean = new ServletListenerRegistrationBean<>();
        servletListenerRegistrationBean.setListener(new TestListener());
        return servletListenerRegistrationBean;
    }
    
}
```