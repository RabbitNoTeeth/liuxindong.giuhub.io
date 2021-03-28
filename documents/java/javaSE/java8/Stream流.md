[TOC]



# 1 定义

从支持数据处理操作的源生成的元素序列。



# 2 流操作

1. 流只能遍历一次流。

2. 操作分为两类

   中间操作：返回值为另一个流，多个中间操作连接起来便形成了流水线式的操作。

   终端操作：从流的流水线生成结果。



# 3 使用流

包括三件事情：

1. 一个数据源（如集合）来执行一个查询。
2. 一个中间操作链，形成一条流水线。
3. 一个终端操作，生成流水线的结果。



## 3.1 筛选

`filter` 方法，接受一个谓词（一个返回boolean的函数）作为参数，返回所有符合谓词的元素的流。

示例：

```
// 筛选偶数
@Test
    public void test1(){
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,8,7,6);
        List<Integer> result = list.stream().filter(i -> i % 2 == 0).collect(Collectors.toList());
        System.out.println(result);
    }
输出：
[2, 4, 6, 8, 8, 6]
```



## 3.2 去重

`distinct` 方法，返回一个元素各异的流。

示例：

```
// 筛选偶数(去重)
@Test
    public void test2(){
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,8,7,6);
        List<Integer> result = list.stream().filter(i -> i % 2 == 0).distinct().collect(Collectors.toList());
        System.out.println(result);
    }
输出：
[2, 4, 6, 8]
```



## 3.3 截短流

`limit` 方法，返回一个不超过指定长度的流。（如果流是有序的，最多返回前n个元素；如果流是无序的，随机返回n个元素）。

示例：

```
// 取出前5个元素
@Test
    public void test3(){
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9);
        List<Integer> result = list.stream().limit(5).collect(Collectors.toList());
        System.out.println(result);
    }
输出：
[1, 2, 3, 4, 5]
```



## 3.4 跳过元素

`skip` 方法，返回一个扔掉了前n个元素的流。

示例：

```
// 取出前5个元素之后的元素
@Test
    public void test4(){
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9);
        List<Integer> result = list.stream().skip(5).collect(Collectors.toList());
        System.out.println(result);
    }
输出：
[6, 7, 8, 9]
```



## 3.5 映射

`map` 方法，接受一个函数作为参数。应用参数函数将流中每个元素映射成一个新的元素。

示例：

```
// 将Apple对象的有序流映射成color属性的字符串的有序流
@Test
    public void test5(){
        List<Apple> list = Arrays.asList(
                new Apple("red",10),
                new Apple("white",20),
                new Apple("green",30),
                new Apple("blue",40),
                new Apple("black",50)
        );
        List<String> result = list.stream().map(Apple::getColor).collect(Collectors.toList());
        System.out.println(result);
    }
输出：
[red, white, green, blue, black]
```



## 3.6 流的扁平化

`flatMap` 把一个流中的每个值都换成另一个流，然后把所有的流连接起来成为一个流。

示例：

```
@Test
    public void test6(){
        String[] words = {"hello","flatMap"};
        List<String> result = Arrays.stream(words).map(s -> s.split(""))                                        .flatMap(Arrays::stream).collect(Collectors.toList());
        System.out.println(result);
    }
输出：
[h, e, l, l, o, f, l, a, t, M, a, p]
```



## 3.7 匹配

`anyMatch`，是否至少匹配一个元素，终端操作，返回boolean。

`allMatch`，是否全部匹配，终端操作，返回boolean。

`noneMatch`，是否全部不匹配，终端操作，返回boolean。

以上三个操作都具有短路功能。



示例：

```
@Test
    public void test7(){
        List<Integer> list = Arrays.asList(1,2,3,4);
        boolean anyMatch = list.stream().anyMatch(i -> i % 2 == 0);  //是否有偶数
        System.out.println(anyMatch);
        boolean allMatch = list.stream().allMatch(i -> i % 2 == 0);  //是否全部是偶数
        System.out.println(allMatch);
        boolean noneMatch = list.stream().noneMatch(i -> i % 2 == 0); //是否全都不是偶数
        System.out.println(noneMatch);
    }
输出：
true
false
false
```



## 3.8 查找

`findAny`，返回当前流中的任意元素，具有短路功能，返回元素类型为Optional（java8未解决null值问题提供的新的容器类，若返回值不为空，通过get获取）。

`findFirst`，返回第一个元素，具有短路功能，返回类型也是Optional。



示例：

```
@Test
    public void test8(){
        List<Integer> list = Arrays.asList(1,2,3,4);
        Optional<Integer> any = list.stream().filter(i -> i % 2 == 0).findAny();  //是否有偶数，有的话返回任意一个
        System.out.println(any.get());
        Optional<Integer> first = list.stream().filter(i -> i % 2 == 0).findFirst();  //是否有偶数，有的话返回第一个
        System.out.println(first.get());
    }
输出：
2
2
```



## 3.9 归约

`reduce` 方法。

示例：

```
@Test
    public void test9(){
        List<Integer> list = Arrays.asList(3,2,1,4,5,8,7,9);
        Integer sum = list.stream().reduce(0, (x, y) -> x + y);   //求所有数的加和
        System.out.println(sum);
        Integer max = list.stream().reduce(1,(x, y) -> x > y ? x : y);  //求最大值
        System.out.println(max);
        Integer min = list.stream().reduce(1, (x, y) -> x < y ? x : y);  //求最小值
        System.out.println(min);
    }
输出：
39
9
1
```



# 4 实战

```
    // 创建交易员
    Trader raoul = new Trader("Raoul","Cambridge");
    Trader mario = new Trader("Mario","Milan");
    Trader alan = new Trader("Alan","Cambridge");
    Trader brian = new Trader("Brian","Cambridge");

    // 创建交易信息
    List<Transaction> transactions = Arrays.asList(
      new Transaction(brian,2011,300),
            new Transaction(raoul,2012,1000),
            new Transaction(raoul,2011,400),
            new Transaction(mario,2012,710),
            new Transaction(mario,2012,700),
            new Transaction(alan,2012,950)
    );
```

1.找出2011年发生的所有交易，并按照交易额排序（升序）

2.交易员都在哪些不同的城市工作过

3.查找所有来自剑桥的交易员，并按姓名排序

4.返回所有交易员的姓名字符串，按字母顺序排序

5.有没有交易员是在米兰工作的

6.打印生活在剑桥的交易员的所有交易总额

7.所有的交易中，最高的交易额

8.所有的交易中，最低的交易额



**参考答案**

```
    // 1.找出2011年发生的所有交易，并按照交易额排序（升序）
    @Test
    public void test1(){
        transactions.stream()
                    .filter(t -> t.getYear()==2011)
                    .sorted(Comparator.comparing(Transaction::getValue))
                    .forEach(t -> System.out.println(t));
    }

    // 2.交易员都在哪些不同的城市工作过
    @Test
    public void test2(){
        transactions.stream()
                    .map(t -> t.getTrader().getCity())
                    .distinct()
                    .forEach(t -> System.out.println(t));
    }

    // 3.查找所有来自剑桥的交易员，并按姓名排序
    @Test
    public void test3(){
        transactions.stream()
                    .map(Transaction::getTrader)
                    .filter(t -> t.getCity().equals("Cambridge"))
                    .distinct()
                    .sorted(Comparator.comparing(Trader::getName))
                    .forEach(t -> System.out.println(t));
    }

    // 4.返回所有交易员的姓名字符串，按字母顺序排序
    @Test
    public void test4(){
        String reduce = transactions.stream()
                                    .map(t -> t.getTrader().getName())
                                    .distinct()
                                    .sorted()
                                    .reduce("", (s1, s2) -> s1 + s2);
        System.out.println(reduce);
    }

    // 5.有没有交易员是在米兰工作的
    @Test
    public void test5(){
        boolean milan = transactions.stream()
                                    .anyMatch(t -> t.getTrader().getCity().equals("Milan"));
        System.out.println(milan);
    }

    // 6.打印生活在剑桥的交易员的所有交易总额
    @Test
    public void test6(){
        Integer total = transactions.stream()
                                    .filter(t -> t.getTrader().getCity().equals("Cambridge"))
                                    .map(t -> t.getValue())
                                    .reduce(0, (x, y) -> x + y);
        System.out.println(total);
    }

    // 7.所有的交易中，最高的交易额
    @Test
    public void test7(){
        transactions.stream()
                    .map(t -> t.getValue())
                    .reduce(Integer::max).ifPresent(op -> System.out.println(op.intValue()));
    }

    // 8.所有的交易中，最低的交易额
    @Test
    public void test8(){
        transactions.stream()
                    .map(t -> t.getValue())
                    .reduce(Integer::min).ifPresent(op -> System.out.println(op.intValue()));
    }
```



# 5 Collector收集器

## 5.1 简介

Collector收集器会对流中元素应用一个转换函数，并将结果累积在一个数据结构中，从而产生流的最终输出。



## 5.2 API

java8中为我们提供了Collectors实用类，其中提供了很多静态工厂方法，可以很方便的创建常见的收集器的实例。



### 5.2.1 toList

参数：无

说明：将流中元素收集到一个List

返回值：`List<T>`

示例：

```
    @Test
    public void test1(){
        List<Dish> collect = menu.stream().collect(Collectors.toList());
        System.out.println(collect);
    }
```



### 5.2.2 toSet

参数：无 

说明：将流中元素收集到一个set，并去重

返回值：`Set<T>`

示例：

```
    @Test
    public void test2(){
        Set<Dish> collect = menu.stream().collect(Collectors.toSet());
        System.out.println(collect);
    }
```



### 5.2.3 toColletion

参数：Collection集合

说明：将流中的元素收集到给定的集合中

返回值：`Collection<T>`

示例：

```
    @Test
    public void test3(){
        ArrayList<Dish> collect = menu.stream().collect(Collectors.toCollection(ArrayList::new));
        System.out.println(collect);
    }
```



### 5.2.4 counting

参数：无

说明：计算流中元素的个数

返回值：`Long`

示例：

```
    @Test
    public void test4(){
        Long collect = menu.stream().collect(Collectors.counting());
        System.out.println(collect);
    }
```



### 5.2.5 summing*

`summingInt`、`summingDouble`、`summingLong`

参数：无

说明：对流中项目的一个Integer / Double / Long属性求和

返回值：`Integer` / `Double` / `Long`

示例：

```
    @Test
    public void test5(){
        Integer collect = menu.stream().collect(Collectors.summingInt(Dish::getCalories));
        System.out.println(collect);
    }
```



### 5.2.6 averaging*

`averagingInt`、`averagingDouble`、`averagingLong`

参数：无 

说明：对流中项目的一个Integer / Double / Long属性求平均

返回值：`Double`

示例：

```
    @Test
    public void test6(){
        Double collect = menu.stream().collect(Collectors.averagingInt(Dish::getCalories));
        System.out.println(collect);
    }
```



### 5.2.7 summarizing*

`summarizingInt`、`summarizingDouble`、`summarizingLong`

参数：无 

说明：对流中项目的一个Integer/Double/Long属性进行统计，如总和、最大值、最小值、平均值

返回值：`IntSummaryStatistics` / `DoubleSummaryStatistics` / `LongSummaryStatistics`

示例：

```
    @Test
    public void test7(){
        IntSummaryStatistics collect = menu.stream().collect(Collectors.summarizingInt(Dish::getCalories));
        System.out.println(collect.getSum());
        System.out.println(collect.getAverage());
        System.out.println(collect.getMax());
        System.out.println(collect.getMin());
    }
```



### 5.2.8 maxBy、minBy

参数：Comparator

说明：根据指定比较器获取流中元素的最大/最小值

返回值：`Optional<T>`

示例：

```
    @Test
    public void test8(){
        Optional<Dish> collect = menu.stream().collect(Collectors.maxBy(Comparator.comparing(Dish::getCalories)));
        System.out.println(collect.get());
    }
```



### 5.2.9 joining

参数：可选 String，字符串连接的分隔符

说明：对流中每个元素应用 toString 方法，并将返回值连接起来

返回值：`String`

示例：

```
    @Test
    public void test9(){
        String collect = menu.stream().map(Dish::getName).collect(Collectors.joining(","));
        System.out.println(collect);
    }
```



### 5.2.10 recuding

参数a：归约操作的起始值

参数b：转换函数，应用在流中的元素上

参数c：累积方法

说明：将流中元素归约成单个值

返回值：归约操作产生的类型

示例：

```
    @Test
    public void test10(){
        Integer collect = menu.stream().collect(Collectors.reducing(0, Dish::getCalories, (x, y) -> x + y));
        System.out.println(collect);
        Optional<Dish> dishOptional = menu.stream().collect(Collectors.reducing((d1, d2) -> d1.getCalories() > d2.getCalories() ? d1 : d2));
        System.out.println(dishOptional.get());
    }
```



### 5.2.11 collectingAndThen

参数a：收集器

参数b：转换函数

说明：把收集器的结果转换成另一种类型

返回值：转换函数返回的类型

示例：

```
    @Test
    public void test11(){
        Integer collect = menu.stream().collect(Collectors.collectingAndThen(Collectors.toList(), List::size));
        System.out.println(collect);
    }
```



### 5.2.12 groupingBy

参数a：流中元素的某个属性值

说明：根据流中元素的某个属性值对流中项目分组，并将属性值作为结果Map的键

返回值：`Map<K,List<T>>`

示例：

```
    @Test
    public void test12(){
        Map<Type, List<Dish>> collect = menu.stream().collect(Collectors.groupingBy(Dish::getType));
        System.out.println(collect);
    }
```



### 5.2.13 partitioningBy

参数a：流中元素应用谓词

说明：根据流中元素的应用谓词的结果对流中项目分组，键值只有true和false两种情况

返回值：`Map<Boolean,List<T>>`

示例：

```
    @Test
    public void test13(){
        Map<Boolean, List<Dish>> collect = menu.stream().collect(Collectors.partitioningBy(Dish::isVegetarian));
        System.out.println(collect);
    }
```



### 5.2.14 mapping

参数a：转换函数

参数b：收集器

说明：把收集器的结果转换成另一种类型

返回值：转换函数返回的类型

示例：

```
    @Test
    public void test14(){
        List<String> collect = menu.stream().collect(Collectors.mapping(dish -> {
            if (dish.getCalories()>400) return "fat";
            else return "ok";
        }, Collectors.toList()));
        System.out.println(collect);
    }
```