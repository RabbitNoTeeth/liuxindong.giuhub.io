[TOC]



# 1 自定义拦截器

自定义拦截器有两种方式：

1. 实现HandlerInterceptor接口，需要实现所有方法。
2. 继承HandlerInterceptorAdapter，重写感兴趣的方法，一般选择此方法。



示例（方式2）

```
public class TestInterrupter extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //进行请求预处理

        //preHandle方法返回true时，请求会继续向下传递到controller；如果返回false，则不再向下传递
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        //进行请求后处理（在视图被controller渲染之前）

        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

        //请求结束后处理（在视图被controller渲染之后）

        super.afterCompletion(request, response, handler, ex);
    }
}
```



# 2 注册拦截器

创建InterrupterConfiguration作为注册拦截器的JavaConfig，继承WebMvcConfigurerAdapter ，重写addInterceptors方法。



示例

```
@Component
public class InterrupterConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        InterceptorRegistration ir = registry.addInterceptor(new TestInterrupter());
        // 配置拦截的路径
        ir.addPathPatterns("/**");
        // 配置不拦截的路径
        ir.excludePathPatterns("/**.html");
        
        /*注册多个拦截器
        InterceptorRegistration ir2 = registry.addInterceptor(new TestInterrupter2());
        ir2.addPathPatterns("/**");
        ir2.excludePathPatterns("/**.html");*/
    }
}
```

