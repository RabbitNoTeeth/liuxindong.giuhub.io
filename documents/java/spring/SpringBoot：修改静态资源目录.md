对于前后端分离的项目，前端代码一定是单独打包单独部署，但是对于中小型项目，可能依然想通过后端端口号去访问页面，而不是使用一个单独的nginx去做请求转发，这样一来，也需要将前端文件所在的目录设置为静态资源目录，同时将后端的“/”根路径映射到前端首页文件上。



**配置方法：**

1. 首先在application.yaml配置文件中定义变量，表示前端静态文件的根目录。

   ```
   web:
     front-path: ./dist
   ```

   

2. 配置1中静态文件所在目录为spring的静态资源目录。

   注意：SpringBoot默认将classpath下 `/public` 等目录作为静态资源目录，如果在配置文件显式配置，那么默认的几个目录将失效，如果有需要，需要在后面显式配置。

   ```
   spring:
     resources:
       static-locations: file:${web.front-path}
   ```



3. 通过上面两步，就可以实现通过后端端口号直接访问上传文件及前端页面了。

   但是仍有一个小小的不足，那就是直接访问后端的根路径，如：http:localhost:8080，会出现错误页面，如果想要跳转到前端首页，还需要以下设置：

   ```
   /**
    * 将项目跟路径映射到前端首页
    * @param registry
   */
   @Override
   public void addViewControllers(ViewControllerRegistry registry) {
       registry.addViewController("/").setViewName("forward:/index.html");
       registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
   }
   ```

   