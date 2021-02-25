**考虑下面的一个单例模式:**

```
//代码清单1
public class Singleton implements Serializable{
    
    private static final Singleton INSTANCE = new Singleton();
    
    private Singleton(){}

    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

如果Singleton类实现了Serializable接口，那么就不再能保证是单例的。因为攻击者可以通过反序列化创建新的实例，在上一章节就讲到readObject方法就相当于一个公有的构造器。



**可以通过readResolve方法来控制readObject创建的实例，修复上面的bug：**

```
//代码清单2
public class Singleton implements Serializable {

    //如果依赖readResolve进行实例控制,那么带有对象引用的所有实例域都要声明为transient的
    private static final transient Singleton INSTANCE = new Singleton();

    private Singleton(){}

    public static Singleton getInstance() {
        return INSTANCE;
    }

    private Object readResolve(){
        return INSTANCE;
    }
}
```

对于一个正在被反序列化的对象，如果它的类定义了一个readResolve方法，并且具有正确的声明，那么在反序列化之后，新建对象上的readResolve方法就会被调用，然后该方法返回的对象将取代新创建的对象被返回。



**还有一个更加简单的方法来修复代码清单1中的bug，那就是之前介绍过的声明为单元素枚举类型：**

```
//代码清单3
public enum Singleton2 implements Serializable {
    INSTANCE
}
```

可以看到，使用单元素枚举来声明单例类，非常简单和安全，但是在java中的使用度却并不高。在Kotlin中，一个被object关键字修饰的类表示一个单例类，其实现原理就是编译器将该类声明为一个单元素枚举类。