[TOC]

在java中，提供了Cloneable接口，但是并不是实现了该接口就可以调用clone方法，因为该接口中并没有任何方法。并且在Object类中，clone方法是受保护的。

# 1 如何实现类的clone属性

1. 如果实现Cloneable接口是要对某个类起作用，那么类和它的所有超类都必须遵守一个协议：
   创建和返回该对象的一个拷贝，这个”拷贝”的精确含义是，对于任意对象x，表达式x.clone() != x 为true，x.clone().getClass() == x.getClass() 为true。通常情况下，表达式 x.clone().equals(x) 为true。
   但是上述协议并不是绝对要求遵守，只是在通常情况下，最好遵守此协议。

2. 在确定为一个类实现clone属性时，一定要确保其超类具有良好的clone行为。



一个实现clone属性的示例 

```
public class Person implements Cloneable {

    @Override
    public Person clone() throws CloneNotSupportedException {
        return (Person) super.clone();
    }
}
```

上述代码示例展示了实现clone属性的几个必须操作：

1. 实现Cloneable接口。
2. 覆盖clone方法，并声明为public公有，提供给外界访问。
3. 将返回值类型更改为该类的类型 (jdk1.5后支持重写方法时返回被重写方法返回值类型的子类型)。



# 2 实现clone属性时需要注意的事项

**区分浅拷贝和深拷贝**

假如我们需要为一个简单的Stack栈实现clone属性，我们先来定义一种实现方式 ：

```
public class Stack implements Cloneable {

    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INIT_CAPACITY = 16;
    public Stack(){
        elements = new Object[DEFAULT_INIT_CAPACITY];
    }
    
    /*... 其他方法*/

    @Override
    public Stack clone() throws CloneNotSupportedException {
        return (Stack) super.clone();
    }
}
```

上述代码示例中，调用clone()方法返回的Stack对象，size域是独立的，但是elements数组却是和原Stack共享的，可以理解为一种浅拷贝，当原Stack中elements数组发生变化时会影响克隆得到的Stack。



如果要实现完全拷贝，或者理解为深度拷贝，则可以这样修改：

```
@Override
public Stack clone() throws CloneNotSupportedException {
    Stack clone = (Stack) super.clone();
    clone.elements = elements.clone();
    return clone;
}
```

这样，elements数组便实现了独立 (在jdk1.5之后，在数组上调用clone返回的数组，其编译时类型与被克隆数组的类型相同，不需要强转)。



# 3 总结


所有实现了Cloneable接口的类都应该用一个公有的方法覆盖clone，并且首先调用super.clone，然后修正任何需要修正的域。