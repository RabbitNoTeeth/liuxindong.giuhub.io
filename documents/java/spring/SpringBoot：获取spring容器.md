SpringBoot提供了ApplicationContextAware接口，我们可以实现通过实现该接口来获取spring容器，进而操作容器内的各种bean。



### 示例：

```
@Component
public class SpringUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext = null;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

        if (SpringUtil.applicationContext == null) {
            SpringUtil.applicationContext = applicationContext;
        }
    }
}

//下面就可以定义一些工具方法，用来从容器上下文ApplicationContext中获取或者操作各种bean
```