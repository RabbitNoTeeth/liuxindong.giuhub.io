[TOC]

实现Singleton的三种方法

# 1 公有域方法 

```
public class Manager {
    
    public static final Manager INSTANCE = new Manager();
    
    private Manager(){}
    
}
```

优点： 类成员声明很清楚的表明了该类是一个Singleton。
缺点：性能上不能优化。



# 2 静态工厂方法 

```
public class Manager {

    private static final Manager INSTANCE = new Manager();

    private Manager(){}
    
    public static Manager getInstance(){
        return INSTANCE;
    }

}
```

优点：提供了更强的灵活性，在静态工厂方法体中，可以实现更多的优化。如延迟初始化，或者为每个线程返回唯一的实例等。

但是上述两种方式有一个共同的缺点:：在类实现了序列化后，反序列化时依旧会不断创建新的实例，虽然是隐式的，但是依旧打破了Singleton的特性。为了防止这种情况，必须声明所有实例都是瞬时的(transient)，并提供一个readResolve方法：

```
public class Manager {

    private static final transient Manager INSTANCE = new Manager();

    private Manager(){}

    public static Manager getInstance(){
        return INSTANCE;
    }
    
    private Object readResolve(){
        return INSTANCE;
    }

}
```



# 3 单元素枚举

```
public enum  Manager {

    INSTANCE;

}
```

该方法在功能上与公有域方法接近，但是它更加简洁，并且无偿提供了序列化机制，绝对防止多次序列化，即使是在面对复杂的序列化或者反射攻击时。



# 4 总结

实际应用中，使用最多的是第二种方式，但是实际上单元素枚举类型是实现Singleton的最佳方法，只是并没有被广泛使用。