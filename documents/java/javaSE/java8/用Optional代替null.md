[TOC]

Optional的设计是为了解决null引用引发的问题，接下来，会以一个场景示例带大家一步一步了解Optional。



# 1 示例场景

## 1.1 建立场景

一个拥有汽车及汽车保险的人

```
// 人
public class Person {
    private Car car;
    public Car getCar() {
        return car;
    }
}
// 车
public class Car {
    private Insurance insurance;
    public Insurance getInsurance() {
        return insurance;
    }
}
// 汽车保险
public class Insurance {
    private String name;
    public String getName() {
        return name;
    }
}
```



## 1.2 需求

现在，我们要获取某个人的汽车保险名称

```
public String getCarInsuranceName(Person person){
    return person.getCar().getInsurance().getName();
}
```



## 1.3 存在的问题

在1.2中的方法，传入的参数person，这个人可能没有汽车，那么在`getCar()`时便得到了一个null值，程序继续往下执行，便会报出空指针异常。

这显然不符合我们最终的目的，我们最终只需要知道这个人的汽车保险名称，不关心其有没有汽车，即使这个人没有汽车，那最后我们希望得到的是一个汽车保险名称不存在的结果，而不是一个空指针异常。



## 1.4 传统的解决方案

### 1.4.1 深度质疑

```
public String getCarInsuranceName(Person person){
        if(person!=null){
            Car car = person.getCar();
            if(car!=null){
                Insurance insurance = car.getInsurance();
                if(insurance!=null){
                    return insurance.getName();
                }
            }
        }
        return "Unknown";
    }
```



### 1.4.2 设置多个退出点

```
public String getCarInsuranceName(Person person){
        if(person==null){
            return "Unknown";
        }
        Car car = person.getCar();
        if(car==null){
            return "Unknown";
        }
        Insurance insurance = car.getInsurance();
        if(insurance==null){
            return "Unknown";
        }
        return insurance.getName();
    }
```

上述两种解决办法，虽然都能解决问题，但是一个很简单的逻辑代码被改造的可读性很差，而且又很啰嗦。



## 1.5 Option带来的解决方案

使用Optional重新定义数据模型

```
public class Person {
    private Optional<Car> car;
    public Optional<Car> getCar() {
        return car;
    }
}
public class Car {
    private Optional<Insurance> insurance;
    public Optional<Insurance> getInsurance() {
        return insurance;
    }
}
// 保险肯定会有对应的名称，所以不用重新用Optional定义
public class Insurance {
    private String name;
    public String getName() {
        return name;
    }
}
```



解决方案

```
public String getCarInsuranceName(Optional<Person> person){
        return person.flatMap(Person::getCar)
                     .flatMap(Car::getInsurance)
                     .map(Insurance::getName)
                     .orElse("Unknown");
    }
```

详解：`flatMap()`方法用于链接Optional对象，`map()`方法的返回值为一个新的Optional对象，如果使用map链接，则产生的是嵌套的Optional，得不到最后想要的String类型。

而`flatMap()`可以将Optional对象扁平化为指定类型的Optional，第一次调用时将`Optional<Person>`扁平化成`Optional<Car>`类型，然后第二次将`Optional<Car>`扁平化成`Optional<Insurance>`类型，最后直接用map转换，取出name属性即可。

多么清爽的解决方案！



# 2 API详解

## 2.1 empty

返回一个空的Optional实例。



## 2.2 filter

如果值存在并满足提供的谓词，就返回包含该值的Optional对象；否则返回一个空的Optional对象。



## 2.3 flatMap

如果值存在，就对该值执行提供的mapping函数，返回一个Optional类型的值；否则就返回一个空的Optional对象。



## 2.4 get

如果值存在，就将值返回；否侧抛出NoSuchElementException异常。



## 2.5 ifPresent

如果值存在，执行方法调用；否则什么都不做。



## 2.6 isPresent

如果值存在返回true；否则返回false。



## 2.7 map

如果值存在，就对该值执行提供的mapping函数



## 2.8 of

将指定的值用Optional包装后返回，如果值为null，抛出空指针异常。



## 2.9 ofNullable

将指定的值用Optional包装后返回，如果值为null，返回空的Optional对象。



## 2.10 orElse

如果有值则返回，否则返回一个指定的默认值。



## 2.11 orElseGet

如果有值则返回，否则返回一个由指定的Supplier接口生成的值。



## 2.12 orElseThrow

如果有值则返回，否则返回一个由指定的Supplier接口生成的异常。