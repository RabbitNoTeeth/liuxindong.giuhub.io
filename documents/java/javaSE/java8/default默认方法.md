[TOC]

在 java8 中，默认方法作为新特性出现，即在接口中可以定义默认方法，该方法并不是抽象方法，接口的实现类中可以不实现接口的默认方法而直接使用，也可以重新实现。



# 1 标识

方法返回类型前标识 default

```
// 定义接口
public interface DefaultA {
    // 定义默认方法
    default void print(){
        System.out.println("i am a default method!");
    }
}
// 实现接口
public class Aimpl implements DefaultA {
    public static void main(String[] args) {
        //实现类内并没有重新实现默认方法print（），却可以直接调用
        new Aimpl().print();
    }
}
输出结果：
i am a default method!
```



# 2 冲突问题

在java8引入默认方法后，需要解决的冲突就是有可能出现一个类实现或间接继承了多个接口，而这些接口中定义了具有同样函数签名的默认方法，那么这个类调用该方法名称时，到底使用的是谁的默认方法呢？



**解决原则**

1. 类中的方法优先级最高。类或者父类中声明的方法的优先级高于任何任何声明为默认方法的优先级。
2. 如果无法依据第一条进行判断，那么子接口的优先级更高：函数签名相同时，优先选择拥有最具体实现的默认方法的接口，即如果B继承了A，那么B就比A更具体。
3. 最后，如果还是无法判断，就必须显式的调用期望的方法。语法：`X.super.m()`，意思为：调用 X 接口的默认方法 m。