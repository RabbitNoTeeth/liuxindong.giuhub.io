float和double是为了在广泛的数值范围内提供**较为精确的快速近似计算**而设计的，它们并没有提供完全精确地结果，所以不应该被用于需要精确结果的场合。float和double尤其不适合用于货币计算，因为要让一个float或者double精确的表示0.1是不可能的。

**一个典型示例:**
假如，你的口袋里有1美元，货架上有一排糖果，价格分别为10美分、20美分、30美分...一直到1美元这十种糖果，现在让你从第一个开始购买，一直到无法继续购买，计算最后能买到几颗糖果和剩下多少钱? 

```
//代码清单1
public static void main(String[] args) {

    double total = 1.00;
    int count = 0;
    for(double price = .10;price<=total;price+=.10){
        total -= price;
        count++;
    }

    System.out.println("购买糖果的个数: " + count);
    System.out.println("剩余钱数: " + total);

}

输出结果:
购买糖果的个数: 3
剩余钱数: 0.3999999999999999
```

从输出结果中，很明显可以看到这个计算是错误的。那么如何修正这个问题呢?



**使用BigDecimal, int 或者 long 进行货币计算**
下面是使用BigDecimal来修正代码清单1中的错误: 

```
//代码清单2
public static void main(String[] args) {
    final BigDecimal TEN_CENTS = new BigDecimal("0.10");

    BigDecimal total = new BigDecimal("1.00");
    int count = 0;
    for(BigDecimal price = TEN_CENTS;price.compareTo(total)<=0;price = price.add(TEN_CENTS)){
        total = total.subtract(price);
        count++;
    }

    System.out.println("购买糖果的个数: " + count);
    System.out.println("剩余钱数: " + total);

}

输出结果:
购买糖果的个数: 4
剩余钱数: 0.00
```



使用BigDecimal有两个**缺点**：一是与基本类型相比,使用比较繁琐；二是要比基本类型慢。但是通常，BigDecimal在性能上的慢并不能影响你选择使用它。

还可以使用int或者long，到底使用两者中的哪一个，取决于数值范围，同时要自己处理小数点。通常，使用int或者long时，都以最小的单位为基本单位进行计算。如上面的示例中，最小的单位为美分，那就以美分为单位进行计算，如果需要处理小数点，在计算完毕后统一处理。

使用int来修正代码清单1中的错误: 

```
//代码清单3
public static void main(String[] args) {

    int total = 100;
    int count = 0;
    for(int price = 10;price<=total;price += 10){
        total -= price;
        count++;
    }

    System.out.println("购买糖果的个数: " + count);
    System.out.println("剩余钱数: " + total);

}

输出结果:
购买糖果的个数: 4
剩余钱数: 0
```



**小结:**

- 对于需要精确结果的计算，请不要使用float和double。
- 如果你想让系统来记录小数点，那么请使用BigDecimal，并且它允许你完全地控制舍入，每当一个操作需要舍入的时候，允许你从8中舍入模式中选择。如果你正通过法定要求的舍入行为进行业务计算，那么使用BigDecimal是非常方便的。
- 如果更加注重性能，同时不介意自己记录小数点，那么就使用int或者float。
- 如果数值位数不超过9位，可以使用int；如果不超过18位，可以使用long；如果超过了18位，必须使用BigDecimal 。