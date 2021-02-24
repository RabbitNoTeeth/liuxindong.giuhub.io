[TOC]

枚举类型是指由一组固定的常量组成合法值的类型。通过int枚举模式、String枚举模式和enum的对比，来了解enum的优势。

# 1 int枚举模式

**代码示例**

使用不同的int常量来表示Apple类的各种状态 

```
public class Apple {
    public static final int NAVEL = 0;
    public static final int TEMPLE = 1;
    public static final int BLOOD = 2;
}
```



**缺点**

1. int枚举是编译时常量，被编译到使用它们的客户端中。如果与之相关联的int值发生了变化，就需要重新编译客户端。
2. 如果有其他方法的参数需要传入Apple的状态时，那么参数类型只能是int，此时就无法保证不会错误的传入4、5、6等其他非法值。



# 2 String枚举模式

**代码示例**

使用不同的String常量来表示Apple的状态 

```
public class Apple {
    public static final String COLOR_GREEN = "green";
    public static final String COLOR_RED = "red";
}
```



**缺点**

1. 可能会导致性能问题，因为它依赖于字符串的比较操作。
2. String常量的值会被硬编码到客户端代码中，如果存在书写错误，那么在编译时检测不到，运行时出现错误。
3. 如果有其他方法的参数需要传入Apple的状态时，那么参数类型只能是String，此时就无法保证不会错误的传入其他非法字符串。



# 3 enum

**代码示例**

使用enum来优化上面两个示例 

```
enum  Apple {
    NAVEL,TEMPLE,BLOOD
}

enum  AppleColor {
    GREEN,RED
}
```



**优点**

1. java的枚举本质上是int值，并不会造成额外的开销。
2. 枚举类型是真正的final。
3. 提供了编译时的类型安全，当方法需要Apple的状态最为参数时，那么参数类型就可以明确的指定为Apple，如果传入Apple内枚举常量之外的非法值，就会导致编译错误。
4. 常量值并没有被编译到客户端代码中，而是在int枚举模式之中。所以可以增加或者重新排列枚举类型中的常量，而无需重新编译它的客户端代码。
5. 允许添加任意的方法和域，并实现任意的接口。



**缺点**

与int枚举模式相比，装载和初始化枚举时会有空间和时间的成本。



# 4 代码示例

一个带有构造器和字段属性的枚举类Fruit，该枚举类的枚举常量有专门的构造方法，并且提供了方法来获取其常量的属性。

```
enum  Fruit {
    
    APPLE("red",50),
    ORANGE("orange",20);
    
    private final String color;
    private final int count;
    Fruit(String color,int count){
        this.color = color;
        this.count = count;
    }

    public String getColor() {
        return color;
    }

    public int getCount() {
        return count;
    }
}
```



# 5 使用enum枚举时的建议

1. 枚举天生是不可变的，因此所有的域都应该是final的，它们可以是公有的，但是最好将它们做成私有的，并提供公有的访问方法。
2. 与枚举常量有关联的有些行为，可能只需要用在定义了枚举的类或者包中，那么这些行为最好定义为私有的或者包级私有的。
3. 如果一个枚举类具有普遍适用性，它就应该成为一个顶层类。如果它只是被用在一个顶层类中，那么它就应该作为顶层类的成员类。
4. 枚举类型的toString方法默认返回枚举常量的名称，枚举类型有一个自动生成的方法valueOf(String)，可以将常量的名称转变为常量本身返回。如果在枚举类型中覆盖toString方法，那么考虑编写一个fromString方法，将指定的字符串变回相应的枚举。



# 6 扩展: 特定于常量的方法实现

如果我们定义了一个enum来表示计算器的四大基本运算 

```
enum  Operation {

    PLUS,MINUS,TIMES,DIVIDE;
    
    double apply(double x,double y){
        switch (this){
            case PLUS: return x+y;
            case MINUS: return x-y;
            case TIMES: return x*y;
            case DIVIDE: return x/y;
        }
        throw new AssertionError("Unknown operation");
    }
}
```

如果我们需要对上述枚举类型进行扩展，新增取模和平方等运算，那么在新增枚举变量的同时，还要在switch语句中新增更多条件，如果忘记在switch中新增，那么程序运行就会出错。

enum的特定于常量的方法实现为我们解决了上面的问题，可以在编译时期就检查在增加枚举常量的同时是否实现了apply的操作。如果新增了平方运算常量，但没有实现apply方法时，编译就会报错。

```
enum  Operation {

    PLUS {
        @Override
        double apply(double x, double y) {
            return x+y;
        }
    },
    MINUS {
        @Override
        double apply(double x, double y) {
            return x-y;
        }
    },
    TIMES {
        @Override
        double apply(double x, double y) {
            return x*y;
        }
    },
    DIVIDE {
        @Override
        double apply(double x, double y) {
            return x/y;
        }
    };

    abstract double apply(double x,double y);
}
```



**缺点**
不利于代码重用，每个常量类型都需要实现apply方法，当维护的常量很多时，代码会很冗长，同时可能存在大量的样板代码。