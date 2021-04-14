Spring3.2为如何统一处理Controller层抛出的异常问题提供了新的解决方案：控制器通知，即任意带有@ControllerAdvice注解的类可通过方法注解@ExceptionHandler、@InitBinder、@ModelAttribute来捕获应用到所有Controller控制器中带有@RequestMapping、@PostMapping、@GetMapping、@PutMapping、@DeleteMapper注解的方法抛出的一厂。



示例

```
@ControllerAdvice
public class MyControllerExceptionHandler{

    
    @ExceptionHandler(AException.class) // 捕获并处理AException类型异常
    public void handleA(){
        ...
    }
    
    @ExceptionHandler(BException.class) // 捕获并处理BException类型异常
    public void handleB(){
        ...
    }
    
    @ExceptionHandler(CException.class) // 捕获并处理CException类型异常
    public void handleC(){
        ...
    }
    
    @ExceptionHandler(Exception.class) // 捕获并处理Exception类型异常
    public void handleOther(){
       ...
    }
    
}
```



如果controller抛出AException，那么将进入方法 handleA 进行处理；如果抛出 DException，未找到指定标记的@ExceptionHandler，那么将进入方法 handleOther 进行处理。