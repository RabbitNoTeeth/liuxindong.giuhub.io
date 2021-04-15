[TOC]



# 1 提供Filter接口实现

示例

```
public class TestFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("TestFilter.doFilter");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```



# 2 注册Filter

## 2.1 注解方式

① SpringBoot启动类中配置 @ServletComponentScan （该注解将扫描 @WebFilter 注解）。

② 在Filter接口实现类配置 @WebFilter 注解。



```
@SpringBootApplication
@ServletComponentScan // ①
public class JeeDemoApplication {

   public static void main(String[] args) {
      SpringApplication.run(JeeDemoApplication.class, args);
   }
}

@WebFilter(filterName = "TestFilter",urlPatterns = "/*") // ②
public class TestFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("TestFilter.doFilter");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```



## 2.2 JavaConfig方式

创建FilterConfiguration 类作为注册Filter的JavaConfig，通过方法@Bean注解并返回FilterRegistrationBean 对象来注册Filter（FilterRegistrationBean是对自定义的Filter拦截器的一个包装类）。

如果需要注册多个Filter，那么可以声明多个使用@Bean注解标记的方法，返回FilterRegistrationBean 对象，拦截器的执行顺序与方法的声明顺序相同。

在下面的示例代码中，拦截器TestFilter会先于TestFilter2执行。

```
@Configuration
public class FilterConfiguration {

    @Bean
    public FilterRegistrationBean testRegister1(){
        //通过自定义的过滤器来创建FilterRegistrationBean实体
        FilterRegistrationBean<TestFilter> registration = new FilterRegistrationBean<>(new TestFilter());
        //定义拦截路径
        registration.addUrlPatterns("/*");
        //返回实体
        return registration;
    }

    //通过声明多个方法来添加多个过滤器，过滤器的执行顺序与方法的声明顺序相同
    @Bean
    public FilterRegistrationBean testRegister2(){
        FilterRegistrationBean<TestFilter2> registration = new FilterRegistrationBean<>(new TestFilter2());
        registration.addUrlPatterns("/*");
        return registration;
    }

}
```