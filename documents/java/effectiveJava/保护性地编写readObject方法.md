**在之前的文章中，我们通过保护性拷贝实现了这样的一个不可变类Period：**

```
//代码清单1
public class Period {

    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {
        this.start = new Date(start.getTime());
        this.end = new Date(end.getTime());
        if(start.compareTo(end)>0){
            throw new IllegalArgumentException("start can not after end");
        }
    }

    public Date getStart() {
        return new Date(start.getTime());
    }

    public Date getEnd() {
        return new Date(end.getTime());
    }

    @Override
    public String toString() {
        return start + "-" + end;
    }
    
}
```

类Period在构造器中存在约束条件：start要小于end。如果Period实现了Serializable接口，readObject方法就相当于一个构造器，如果不在该方法中验证约束条件，那么就无法保证创建出正确的Period，也就会造成潜在的安全漏洞。

readObject方法相当于一个公有的构造器，在其他构造器中存在的约束条件，在该方法中也要满足，必要时要对参数进行保护性拷贝。



**针对Period的约束条件,对Period实现序列化时进行约束条件验证:** 

```
//代码清单2
private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
    in.defaultReadObject();
    if(start.compareTo(end)>0){
        throw new IllegalArgumentException("start can not after end");
    }
}
```

代码清单2中，可以实现对Period的有效性验证，避免了攻击者通过自定义字节流来反序列化创建出无效的Period实例。但是，上述代码却无法解决攻击者改变反序列化创建出来的Period。



**攻击者对反序列化创建的Period进行修改的攻击代码:** 

```
//代码清单3
public class MutablePeriod {

    public final Period period;
    public final Date start;
    public final Date end;

    public MutablePeriod(){
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(bos);

            //字节流以一个有效的Period实例开头
            out.writeObject(new Period(new Date(),new Date()));

            byte[] ref = {0x71,0,0x7e,0,5};
            //附加一个指向Period实例中start的引用到字节流
            bos.write(ref);
            ref[4] = 4;
            //附加一个指向Period实例中end的引用到字节流
            bos.write(ref);

            ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bos.toByteArray()));
            //从字节流读取Period实例
            period = (Period) in.readObject();
            //获取start的引用
            start = (Date) in.readObject();
            //获取end的引用
            end = (Date) in.readObject();

        }catch (Exception e){
            throw new AssertionError();
        }
    }

    public static void main(String[] args) {
        MutablePeriod mp = new MutablePeriod();
        Period p = mp.period;
        Date pEnd = mp.end;     //获取Period的内部end引用

        pEnd.setYear(78);       //非法修改Period内部end值
        System.out.println(p);

        pEnd.setYear(69);       //非法修改Period内部end值
        System.out.println(p);
    }

}

输出结果:
Sun Jan 07 16:25:25 CST 2018 - Sat Jan 07 16:25:25 CST 1978
Sun Jan 07 16:25:25 CST 2018 - Tue Jan 07 16:25:25 CST 1969
```

如果攻击者创建了一个MutablePeriod实例，然后将其中的Period传递出去，放入在认为Period不可变得环境中，就会造成更大的危害，因为此时攻击者可以自由地修改Period。

代码清单3中的安全问题根源在于: 当一个对象被反序列化的时候，对于客户端不应该拥有的对象引用，没有进行保护性拷贝。



**通过下面的readObject方法可以对代码清单3的攻击进行防御:** 

```
//代码清单4
private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
    in.defaultReadObject();
    
    //进行保护性拷贝,这样在代码清单3中的攻击者拿到的start引用便不再是Period的内部start引用,无论怎样修改都不会改变Period实例
    start = new Date(start.getTime());  
    end = new Date(end.getTime());
    
    if(start.compareTo(end)>0){
        throw new IllegalArgumentException("start can not after end");
    }
}
```

注意，保护性拷贝是在有效性检查之前进行的。



**关于readObject的更多建议：**

1. 不要使用writeUnshared和readUnshared方法。
2. readObject方法不可以调用可被覆盖的方法，无论是直接调用还是间接调用都不可以。因为被覆盖的方法会在子类的状态被反序列化之前先运行，从而可能导致程序失败。
3. 对于对象引用域必须保持为私有的类，要保护性地拷贝这些域中的每个对象。
4. 对于约束条件的检查应该在保护性拷贝之后，检查失败后建议抛出InvalidObjectException异常。