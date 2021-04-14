面向切面编程AOP，能让我们实现应用中日志、安全、事务管理等系统功能模块与业务模块解耦，在不对业务代码进行入侵的前提下实现日志、安全、事务管理等系统功能。

Spring自身的aop实现是基于动态代理，所以只能支持方法连接点，对于对象创建和字段的修改等都不支持，而AspectJ对方法、类创建、字段变化等都是支持的，所以本节通过代码示例展示在Spring中借助AspectJ来定义aop切面。



```
@Component
@Aspect    // @Aspect注解声明该类作为aop切面
public class LoginLogAop {

    @Pointcut("@annotation(cn.don9.annotation.LoginLogAnnotation)")
    public void log(){
        // @Pointcut注解定义了切入点,可以通过aspectj提供的不同切入点表达式匹配不同连接点,如 方法调用/类创建/字段值变化 等
    }

    @Before("log()")
    public void beforeExce(JoinPoint joinPoint) throws NoSuchMethodException {
        // @Before注解: 切入点执行前调用自定义的动作
    }

    @After("log()")
    public void afterExce(JoinPoint joinPoint){
         // @After注解: 切入点执行后调用自定义的动作,注意并不是在切入点返回值之后调用
    }

    @AfterThrowing(value = "log()",throwing = "e")
    public Object throwException(JoinPoint joinPoint,Throwable e){
        // @AfterThrowing注解: 切入点抛出异常后调用自定义的动作
    }

    @AfterReturning("log()")
    public Object throwException(JoinPoint joinPoint){
       // @AfterReturning注解: 切入点返回值后调用,也就是在return后调用
    }

    @Around("log()")
    public Object aroundExec(ProceedingJoinPoint pjp) throws Throwable{
        // @Around注解: 环绕通知,pip.proceed()为真正的切入点调用执行,可以在这之前和之后自定义动作
        Object obj = pjp.proceed();
        // pjp.proceed()执行完毕,此时会调用 @After 注解定义的动作
        return obj;
        // return之后调用@AfterReturning注解定义的动作
    }
}
```

