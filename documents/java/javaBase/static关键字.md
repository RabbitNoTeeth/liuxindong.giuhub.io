[TOC]



# 概述


在Java中，static关键字主要有四种用法：

- 修饰成员变量
- 修饰成员方法
- 静态代码块
- 静态导包

被static修饰的变量和方法，可以通过类名直接调用，不依赖类的实例；Static代码块在类加载时调用，且只调用一次；使用static导包，类方法可以直接通过方法名调用。

下面进行各个用途的详解



# 1 static修饰成员变量


被static修饰的成员变量属于该类，被所有该类的实例共享，在类初始化时jvm只为static修饰的变量分配一次内存，并且为static变量分配的内存不在java堆内存中，无法通过gc回收，所以对static变量的使用，不仅要考虑多线程带来的问题，同时也要考虑内存占用问题。

下面通过一个小示例来讲解一下static变量与非static变量的区别： 

```
public class Person {

    public static int age1 = 10;

    public int age2 = 20;


    public static void main(String[] args) {

        Person p1 = new Person();
        Person p2 = new Person();

        System.out.println("--------- 修改前 ---------");
        System.out.println("p1.age1 = " + p1.age1);
        System.out.println("p1.age2 = " + p1.age2);
        System.out.println("p2.age1 = " + p2.age1);
        System.out.println("p2.age2 = " + p2.age2);

        //更新p1
        p1.age1 = 15;
        p2.age2 = 25;

        System.out.println("--------- 修改后 ---------");
        System.out.println("p1.age1 = " + p1.age1);
        System.out.println("p1.age2 = " + p1.age2);
        System.out.println("p2.age1 = " + p2.age1);
        System.out.println("p2.age2 = " + p2.age2);

    }

}
输出结果：
--------- 修改前 ---------
p1.age1 = 10
p1.age2 = 20
p2.age1 = 10
p2.age2 = 20
--------- 修改后 ---------
p1.age1 = 15
p1.age2 = 20
p2.age1 = 15
p2.age2 = 25
```

从输出结果中可以看到，对实例p1中age1的修改，影响了p2中age1，而age2由于未被static修饰，在p1和p2之间不存在共享，所以互不影响。



# 2 static修饰成员方法

被static修饰的成员方法可以直接通过类名引用，最熟悉的就是我们常用的各种utils类了，通过定义各种静态方法，方便调用。 但是，被static修饰的方法只能调用static方法和static变量，这是由于static方法在类初次加载就准备好，而普通成员变量或者方法在类被实例化后才准备完毕。 普通方法可以调用static方法和static变量。



# 3 static静态代码块

static代码块会在类初次被加载时调用，并且只调用一次，一般用于执行类共享的初始化动作。一个类中可以存在多个static代码块，并且按照声明的顺序执行。

下面通过两个小示例来深入了解下类加载和实例化的过程：

示例1： 

```
public class Person {

    public static int age = 10;

    static{
        System.out.println("age = " + age);
        System.out.println("static静态代码块1被调用");
    }

    static{
        System.out.println("static静态代码块2被调用");
    }

    public Person(int n){
        System.out.println("Person"+n+"构造函数被调用");
    }


    public static void main(String[] args) {

        new Person(1);
        new Person(2);

    }

}

输出结果：
age = 10
static静态代码块1被调用
static静态代码块2被调用
Person1构造函数被调用
Person2构造函数被调用
```

可以看到，static变量和static代码块按照声明的顺序执行且只执行一次，并且都在构造函数进行实例化之前执行。



示例2：

```
public class App {


    public static void main(String[] args) {

        new Male();

    }

}


class Person {

    Apple apple = new Apple();

    static{
        System.out.println("父类Person：static静态代码块被执行");
    }

    public Person(){
        System.out.println("父类Person：构造函数被调用");
    }

}

class Male extends Person{

    static{
        System.out.println("子类Male：static静态代码块被执行");
    }

    public Male(){
        System.out.println("子类Male：构造函数被调用");
    }

}

class Apple{

    static{
        System.out.println("类Apple：static静态代码块被执行");
    }

    public Apple(){
        System.out.println("类Apple：构造函数被调用");
    }

}

输出结果：
父类Person：static静态代码块被执行
子类Male：static静态代码块被执行
类Apple：static静态代码块被执行
类Apple：构造函数被调用
父类Person：构造函数被调用
子类Male：构造函数被调用
```

通过上述结果，可以得出在实例化一个子类时，执行其父类static代码块 → 执行子类的static代码块 → 初始化父类成员变量 → 初始化子类成员变量 → 调用父类构造函数 → 调用子类的构造函数。



# 4 静态导包

```
import static com.dotgua.study.PrintHelper.*;

public class App{
    public static void main( String[] args ){
        print("Hello World!");
    }
}
```



# 小结


关于static关键字，要掌握类实例化时的加载顺序，同时牢记static变量会被所有类实例共享，并且无法通过gc回收，在多线程设计以及内存优化时要特别注意。 