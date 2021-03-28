[TOC]

本章节主要通过场景应用来讲解java8中的CompletableFuture，以及如何使用CompletableFuture来构建异步应用。



# 1 场景假设

假设我们有一个在线商店，在用户查看商品价格时，我们希望能同时查询其他多家在线商店的价格，来为用户提供对比。

查询其他商店价格就意味要远程请求其商店的服务器（不考虑爬虫，假设其他商店都提供了查询接口），那么每家商店的查询速度也都不会是固定的，综合这些因素，都影响了在我们网站中将这些信息统计好展示给用户这一过程的快慢。

接下来，我们会一步一步分析优化这一过程，来达到将响应速度优化到最快。



## 1.1 定义商店Shop的API

```
public class Shop { 

    private Random random = new Random(); 

    // 商店名称 
    private String name; 

    public Shop(String name){ 
        this.name = name; 
    } 

    public String getName() { 
        return name; 
    }

    // 固定1s延迟，模拟每家商店的远程查询响应时间 
    public static void delay(){ 
        try { 
            Thread.sleep(1000L); 
        } catch (InterruptedException e) { 
            throw new RuntimeException(e); 
        } 
    } 

    // 获取商品价格 
    public double getPrice(String product){ 
        // 计算商品价格 
        return calculatePrice(product); 
    } 

    // 计算商品价格 
    private double calculatePrice(String product) { 
        //模拟服务器响应时间 
        delay(); 
        //通过简单的算法,根据商品名称得到价格 
        return random.nextDouble()*product.charAt(0) + product.charAt(1); 
    } 
}
```



## 1.2 定义价格查询方法

定义一个简单的同步的价格查询方法。

```
// 同步的流处理,方法接受商店集合,以及要查询的商品名称 
public static List<String> getPrices(List<Shop> shops,String product){ 
    // 将商店集合转换成流 
    return shops.stream() 
                // 对每家商店进行商品价格查询,然后将查询后的结果格式化成字符串映射到流中 
                .map(shop -> String.format("%s price is %.2f",shop.getName(),shop.getPrice(product))) 
                // 将流归约 
                .collect(Collectors.toList()); 
}
```



我们来测试下查询4家商店的响应速度 

```
@Test 
public void test(){ 
    List<Shop> shops = Arrays.asList(new Shop("shop-1"),new Shop("shop-2"),new Shop("shop-3"),new Shop("shop-4")); 
    long start = System.currentTimeMillis(); 
    List<String> prices = getPrices(shops, "myphone27s"); 
    long time = System.currentTimeMillis() - start; 
    //打印查询结果 
    System.out.println(prices); 
    //打印查询时间 
    System.out.println(time); 
} 

输出结果: 
[shop-1 price is 210.85, shop-2 price is 178.26, shop-3 price is 182.22, shop-4 price is 141.05] 
4089
```

我们看到，由于每家商店的响应延迟都是1s，查询4家商店，响应延迟就在4s了，剩下的时间是价格的生成计算，由于是本地计算，所以速度是很快的，对于整个过程，主要的影响因素还是每家商店的查询速度。



## 1.3 第一次优化：使用并行流

```
// 并行流处理 
public static List<String> getPrices2(List<Shop> shops,String product){ 
    return shops.parallelStream() 
                .map(shop -> String.format("%s price is %.2f",shop.getName(),shop.getPrice(product))) 
                .collect(Collectors.toList()); 
}
```



测试4家商店 

```
@Test 
public void test4(){ 
    List<Shop> shops = Arrays.asList(new Shop("shop-1"),new Shop("shop-2"), 
    new Shop("shop-3"),new Shop("shop-4")); 
    long start = System.currentTimeMillis(); 
    List<String> prices = getPrices2(shops, "myphone27s"); 
    long time = System.currentTimeMillis() - start; 
    System.out.println(prices); 
    System.out.println(time); 
} 
输出结果: 
[shop-1 price is 165.08, shop-2 price is 163.80, shop-3 price is 183.67, shop-4 price is 138.45] 
1092
```

可以看到，响应变成了1s，这说明每家商店的查询都在不同的线程中进行。

要注意的是，java8的并行流，其默认的线程池大小就是主机的最大支持线程数，例如我的电脑是8线程的，所以测试4家商店和8家商店的结果都是1s，因为每家商店都能单独使用一个线程，但是在测试到16家商店时，响应变成了2s。

得出结论，并行流的响应速度受到主机最大线程数的制约，当我们的服务器最高支持8线程时，而要查询的商店达到80家时，响应就在10s多，这显然还是不能忍受的。



## 1.4 第二次优化：使用CompletableFuture发起异步请求

```
public static List<String> findPrice(List<Shop> shops,String product){
        List<CompletableFuture<String>> futures = shops.stream()
                //CompletableFuture.supplyAsync是api中的静态工厂方法,Supplier为参数
                //这一行操作意思: 使用api提供的静态方法,异步查询流中每家商店的价格,并将CompletableFuture(其中包含了结果字符串)映射到流中
                .map(shop -> CompletableFuture.supplyAsync(() -> String.format("%s price is %.2f", shop.getName(), shop.getPrice(product))))
                .collect(Collectors.toList());
        //CompletableFuture的join方法与Future的get有相同的含义,获取其中的值
        return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
    }
```



测试4家商店

```
@Test
    public static void test5(){
        List<Shop> shops = Arrays.asList(new Shop("shop-1"),new Shop("shop-2"),
                new Shop("shop-3"),new Shop("shop-4"));
        long start = System.currentTimeMillis();
        List<String> prices = findPrice(shops, "myphone27s");
        long time = System.currentTimeMillis() -  start;
        System.out.println(prices);
        System.out.println(time);
    }
输出结果:
[shop-1 price is 136.14, shop-2 price is 157.53, shop-3 price is 122.85, shop-4 price is 144.65]
1082
```

可以看到，输出结果和上一种优化并没有什么差别，原因是`CompletableFuture.supplyAsync`中默认使用的线程池是和并行流相同的，都是主机的最大线程数，也就是这种优化同并行流一样，都受到主机线程数的制约。

当商店到达32家时，我的8线程主机执行时间就达到了4s+。



### 1.5 第三次优化 : 使用supplyAsync的重载版本，自定义执行器

```
public static List<String> findPrice2(List<Shop> shops,String product){
        //自定义执行器,并设置线程池大小(根据商店总数)
        Executor executor = Executors.newFixedThreadPool(Math.min(shops.size(), 100),
                r -> {
                    Thread t = new Thread(r);
                    //每个线程设置为守护线程
                    t.setDaemon(true);
                    return t;
                });
        List<CompletableFuture<String>> futures = shops.stream()
                .map(shop -> CompletableFuture.supplyAsync(() -> shop.getName()+" : "+shop.getPrice(product),executor))
                .collect(Collectors.toList());
        return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
    }
```



测试:

```
public static void main(String[] args) {
        List<Shop> shops = Arrays.asList(new Shop("shop-1"),new Shop("shop-2"),
                new Shop("shop-3"),new Shop("shop-4"),new Shop("shop-5"),new Shop("shop-6"),
                new Shop("shop-7"),new Shop("shop-8"));
        long start = System.currentTimeMillis();
        List<String> prices = findPrice2(shops, "myphone27s");
        long time = System.currentTimeMillis() -  start;
        System.out.println(prices);
        System.out.println(time);
    }
输出结果:
[shop-1 : 198.15857721741128, shop-2 : 177.8954362056788, shop-3 : 140.30169172773674, shop-4 : 217.19350811468158,
 shop-5 : 134.9327615203619, shop-6 : 212.874144997626, shop-7 : 202.47899620794664, shop-8 : 158.79112226023383]
1058
```

可以看到，8个商店的查询时间为1s，依旧用上了主机的全部线程。



但是，当我们把商店数量增加到32家时呢？请看下面的测试

```
public static void main(String[] args) {
        List<Shop> shops = Arrays.asList(
                new Shop("shop-1"),new Shop("shop-2"),
                new Shop("shop-3"),new Shop("shop-4"),
                new Shop("shop-5"),new Shop("shop-6"),
                new Shop("shop-7"),new Shop("shop-8"),
                new Shop("shop-1"),new Shop("shop-2"),
                new Shop("shop-3"),new Shop("shop-4"),
                new Shop("shop-5"),new Shop("shop-6"),
                new Shop("shop-7"),new Shop("shop-8"),
                new Shop("shop-1"),new Shop("shop-2"),
                new Shop("shop-3"),new Shop("shop-4"),
                new Shop("shop-5"),new Shop("shop-6"),
                new Shop("shop-7"),new Shop("shop-8"),
                new Shop("shop-1"),new Shop("shop-2"),
                new Shop("shop-3"),new Shop("shop-4"),
                new Shop("shop-5"),new Shop("shop-6"),
                new Shop("shop-7"),new Shop("shop-8")

        );
        long start = System.currentTimeMillis();
        List<String> prices = findPrice2(shops, "myphone27s");
        long time = System.currentTimeMillis() -  start;
        System.out.println(prices);
        System.out.println(time);
    }
输出结果:
[shop-1 : 224.93564924756618, shop-2 : 202.60186039616923, shop-3 : 175.0381052389681, shop-4 : 216.0871914211018...]
1070
```

惊喜的事情发生了，32家的商店查询时间依旧是1s，而不是之前并行流的4s，说明自定义执行器的线程池让我们突破了主机线程数的局限。

至此，我们实现了异步查询的最优化。



# 2 场景升级

上面的场景是我们只有其他家商品价格的远程查询请求，也就是只有一个异步任务。

但是如果我们在查询其他家价格请求的同时，需要查询最新的货币汇率，将价格转化为美元展示给客户呢？这是就是两个异步任务，又要如何优化呢？

如果使用上面的方式，那么我们就需要处理两次，两次的时间会发生累加，这显然并不是一个最好的处理方法。



## 2.1 定义新的场景api

修改Shop中的`getPrice()`方法

```
public String getPrice(String product){
        double price = calculatePrice(product);
        // 随机为商品附上一个折扣
        Discount.Code code = Discount.Code.values()[random.nextInt(Discount.Code.values().length)];
        // 修改返回结果以 " 商店名称:价格:折扣 "的字符串格式返回
        return String.format("%s:%.2f:%s",name,price,code);
    }
```



定义Quote，用于解析 `getPrice()`方法的返回结果

```
public class Quote {

    private final String shopName;

    private final double price;

    private final Discount.Code code;


    public Quote(String shopName, double price, Discount.Code code) {
        this.shopName = shopName;
        this.price = price;
        this.code = code;
    }

    // 解析getPrice()返回的字符串,将解析结果封装到Quote对象中返回
    public static Quote parse(String s){
        String[] split = s.split(":");
        String shopName = split[0];
        double price = Double.parseDouble(split[1]);
        Discount.Code code = Discount.Code.valueOf(split[2]);
        return new Quote(shopName,price,code);
    }

    public String getShopName() {
        return shopName;
    }

    public double getPrice() {
        return price;
    }

    public Discount.Code getCode() {
        return code;
    }
}
```



定义折扣服务类 Discount 

```
public class Discount {
    //折扣系数,不同级别的会员对应不同的折扣系数
    public enum Code{
        NONE(0),SILVER(5),GOLD(10),PLATINUM(15),DIAMOND(20);

        private final int percentage;

        Code(int percentage){
            this.percentage = percentage;
        }
    }

    // 根据Quote中的数据,打印每家商店商品折扣前后的价格
    public static String applyDiscount(Quote quote){
        return quote.getShopName() + " price is " + quote.getPrice()  + Discount.apply(quote.getPrice(),quote.getCode());
    }

    // 根据折扣计算折扣后的商品价格
    private static String apply(double price, Code code) {
        // 在计算折扣的过程中,我们再次模拟服务器等待,该等待过程是等待查询每家商店折扣的模拟,
        // 虽然我们之前在getPrice()方法中随机为每个商店生成了一个折扣,但是实际情景中应该是商品价格的查询和折扣的查询是分开的两个异步任务
        Shop.delay();
        return (price*(100-code.percentage))/100 + "";
    }
}
```



## 2.2 第四次优化：对两个不同的异步任务构造异步操作

```
public static List<String> findPrice(List<Shop2> shops,String product){
        //同样,自定义执行器
        Executor executor = Executors.newFixedThreadPool(Math.min(shops.size(), 100),
                r -> {
                    Thread t = new Thread(r);
                    t.setDaemon(true);
                    return t;
                });
        List<CompletableFuture<String>> futures = shops.stream()
                // 第一步:构造异步操作查询商品价格
                .map(shop -> CompletableFuture.supplyAsync(() -> shop.getPrice(product),executor))
                // 第二步:解析查询结果,因为此过程为本地计算,速度很快,所以直接使用同步方式
                // thenApply()方法将流中的CompletableFuture<String>转换为	                                 // CompletableFuture<Quote>
                .map(future -> future.thenApply(Quote::parse))
                // 第三步:将第一步的异步操作结果作为参数传递给新的异步操作,也就是计算折扣后的价格
                // thenCompose()方法允许你对两个异步操作进行流水线,第一个操作完成时,将其结果作为参数传                 // 递给第二个操作
                .map(future -> future.thenCompose(quote -> CompletableFuture.supplyAsync(() -> Discount.applyDiscount(quote),executor)))
                .collect(Collectors.toList());
        return futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
    }
```



测试一下,32家商店

```
@Test
    public static void test2(){
        List<Shop2> shops = Arrays.asList(
                new Shop2("shop-1"),new Shop2("shop-2"),new Shop2("shop-3"),new Shop2("shop-4"),
                new Shop2("shop-5"),new Shop2("shop-6"),new Shop2("shop-7"),new Shop2("shop-8"),
                new Shop2("shop-1"),new Shop2("shop-2"),new Shop2("shop-3"),new Shop2("shop-4"),
                new Shop2("shop-5"),new Shop2("shop-6"),new Shop2("shop-7"),new Shop2("shop-8"),
                new Shop2("shop-1"),new Shop2("shop-2"),new Shop2("shop-3"),new Shop2("shop-4"),
                new Shop2("shop-5"),new Shop2("shop-6"),new Shop2("shop-7"),new Shop2("shop-8"),
                new Shop2("shop-1"),new Shop2("shop-2"),new Shop2("shop-3"),new Shop2("shop-4"),
                new Shop2("shop-5"),new Shop2("shop-6"),new Shop2("shop-7"),new Shop2("shop-8")
        );
        long start = System.currentTimeMillis();
        System.out.println(findPrice(shops,"suannaihahaha"));
        System.out.println(System.currentTimeMillis()-start);
    }
输出结果:
[shop-1 price is 169.39 143.98149999999998, shop-2 price is 219.95 175.96, shop-3 price is 170.72 153.648, 
shop-4 price is 207.38 186.642, shop-5 price is 221.26 177.00799999999998, shop-6 price is 203.28 162.624, 
shop-7 price is 227.93 227.93, shop-8 price is 145.35 123.5475]
2086
```

可以看到，8线程的主机执行时间为2s，可以看出在第一阶段查询商品价格消耗1s，第二阶段查询折扣消耗1s。

至此，我们完成了对两个异步操作的组合，如果不是这样的解决方法，那么可以想象，整个过程的时间累加要到什么程度。



## 2.3 再次思考

其实，我们的程序仍然有制约，那就是`findPrice()`方法的返回结果为将流归约后的list集合，但是，实际应用中，每家商店的服务器反应时间是不同的，有的可能1s，有的可能5s，这时候只要有一家没有查询完成，我们的程序仍需等待最后一个完成才能顺利将流归约成list结果返回。

那么能不能实现这样一种效果：查询出一个结果，我们就返回一个结果呢？



## 2.4 第五次优化：不再等待所有查询全部完成，查询出一个，返回一个

首先，定义一个新的生成随机延迟的方法，以模拟实际情景

```
// 随机生成0.5-2.5s的延迟
public static void randomDelay(){
        int delay = 500 + random.nextInt(2000);
        try {
            Thread.sleep(delay);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
```



查询商品价格时，使用新的随机延迟

```
private double calculatePrice(String product) {
        randomDelay();
        return random.nextDouble()*product.charAt(0) + product.charAt(1);
    }
```



定义新方法，新方法不再返回最后结果，而是第二个异步操作完成后的stream流

```
public static Stream<CompletableFuture<String>> findPriceStream(List<Shop2> shops, String product){
        Executor executor = Executors.newFixedThreadPool(Math.min(shops.size(), 100),
                r -> {
                    Thread t = new Thread(r);
                    t.setDaemon(true);
                    return t;
                });
        return shops.stream()
                .map(shop -> CompletableFuture.supplyAsync(() -> shop.getPrice(product),executor))
                .map(future -> future.thenApply(Quote::parse))
                .map(future -> future.thenCompose(quote -> CompletableFuture.supplyAsync(() -> Discount.applyDiscount(quote),executor)));
    }
```



测试一下8家商店

```
public static void main(String[] args) {
        List<Shop2> shops = Arrays.asList(
                new Shop2("shop-1"),new Shop2("shop-2"),new Shop2("shop-3"),new Shop2("shop-4"),
                new Shop2("shop-5"),new Shop2("shop-6"),new Shop2("shop-7"),new Shop2("shop-8")
        );
        long start = System.currentTimeMillis();
        CompletableFuture[] futures = findPriceStream(shops,"suannaihahaha")
                // thenAccept()方法用来定义如何处理CompletableFuture计算的结果,其返回的是CompletableFuture<void>
                // 这里我们将其打印,并打印出对应的执行时间
                // 实际应用中,我们可以在thenAccept()方法中来将每个商品的价格信息推送到前端,这样,
                //      用户可以实时的查看到查询出来的结果,而不用等待所有完成后才能查看
                .map(f -> f.thenAccept(s -> System.out.println(s + " ~~~ " + (System.currentTimeMillis() - start))))
                // toArray(),将流中的对象放到数组中
                .toArray(size -> new CompletableFuture[size]);
        // allOf()方法,接受一个CompletableFuture数组,并逐个返回数组重元素计算后的结果
        CompletableFuture.allOf(futures).join();
        System.out.println("All Done cost " + (System.currentTimeMillis() - start));
    }
测试结果:
shop-8 price is 127.18 101.74400000000001 ~~~ 1663
shop-4 price is 142.42 128.178 ~~~ 1962
shop-2 price is 169.85 144.3725 ~~~ 1983
shop-1 price is 186.93 177.58350000000002 ~~~ 2738
shop-3 price is 144.92 123.18199999999999 ~~~ 2786
shop-6 price is 216.78 216.78 ~~~ 3072
shop-5 price is 193.8 193.8 ~~~ 3329
shop-7 price is 160.0 160.0 ~~~ 3463
All Done cost 3463
```

可以看到，应用已将按照完成顺序逐个打印出了查询结果，在实际生产环境中，我们可以借助消息推送系统，实时的将每条信息推送到前端。这样客户就不需要等待所有查询都完成才能看到结果了。



# 3 API详解

## 3.1 supplyAsync

接受一个生产者(Supplier)作为参数，返回一个 CompletableFuture对象，该对象完成异步执行后会读取调用生产者方法的返回值。



## 3.2 thenApply

将stream流中的每个 `CompletableFuture<T>` 转换为 `CompletableFuture<R>`。



## 3.3 thenCompose

对两个异步操作进行流水线，第一个操作完成时，将其结果作为参数传递给第二个操作。



## 3.4 thenCombine

合并两个独立的CompletableFuture对象，即合并两个独立的异步操作，这两个异步操作不互相依赖，先后的完成顺序没有要求。



## 3.5 join

获取CompletableFuture中的对象。



## 3.6 thenAccept

定义如何处理CompletableFuture返回的结果，一旦CompletableFuture计算得到结果，就返回一个`CompletableFuture<Void>`。



## 3.7 allOf

接受一个CompletableFuture数组，并逐个返回数组重元素计算后的结果。